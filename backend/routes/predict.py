from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import pandas as pd
from datetime import datetime
from database import get_db
from models import AgriculturalMarketRecord, PredictionHistory
from schemas import (
    PredictionRequest, PredictionResponse, HistoricalPoint, TrajectoryPoint,
    MarketComparisonRequest, MarketComparisonResponse, MarketComparisonItemOut,
    FarmerRecommendationOut
)
from services.ml_service import predict_single

router = APIRouter(prefix="/api", tags=["Prediction"])

@router.post("/predict", response_model=PredictionResponse)
def predict_price(req: PredictionRequest, db: Session = Depends(get_db)):
    records = db.query(AgriculturalMarketRecord).filter(
        AgriculturalMarketRecord.commodity.ilike(req.crop)
    ).all()

    if not records:
        raise HTTPException(status_code=404, detail=f"No market data found for {req.crop}")

    df = pd.DataFrame([{
        "state": r.state,
        "district": r.district,
        "market": r.market,
        "commodity": r.commodity,
        "variety": r.variety,
        "arrival_date": r.arrival_date,
        "modal_price": r.modal_price,
        "min_price": r.min_price,
        "max_price": r.max_price,
        "arrivals": r.arrivals
    } for r in records])

    res = predict_single(req.crop, req.market, req.prediction_date, req.algorithm, df)

    # Save to PredictionHistory
    history = PredictionHistory(
        crop=req.crop,
        state=req.state,
        district=req.district,
        market=req.market,
        prediction_date=req.prediction_date,
        algorithm=req.algorithm,
        predicted_price=res["predicted_price"],
        historical_avg=res["historical_avg"],
        price_trend=res["price_trend"]
    )
    db.add(history)
    db.commit()

    # Historical points
    sub = df[df["market"].str.lower() == req.market.lower()]
    if sub.empty: sub = df
    sub = sub.sort_values("arrival_date")
    hist_points = [
        HistoricalPoint(date=str(row["arrival_date"]), actual=float(row["modal_price"]))
        for _, row in sub.iterrows()
    ]

    # Trajectory points
    latest_price = res["latest_base_price"]
    pred_val = res["predicted_price"]
    traj_points = [
        TrajectoryPoint(date=str(sub.iloc[-1]["arrival_date"]), predicted=latest_price),
        TrajectoryPoint(date=req.prediction_date, predicted=pred_val)
    ]

    recommendation = (
        f"Prices projected to rise by {res['percentage_change']}%. Consider staggered selling or holding stock."
        if res["price_trend"] == "Bullish (Upward)" else
        f"Prices projected to soften by {abs(res['percentage_change'])}%. Early market liquidation advised."
        if res["price_trend"] == "Bearish (Downward)" else
        f"Steady price trajectory expected around ₹{pred_val}/Quintal."
    )

    return PredictionResponse(
        crop=req.crop,
        state=req.state,
        district=req.district,
        market=req.market,
        prediction_date=req.prediction_date,
        algorithm=req.algorithm,
        predicted_price=res["predicted_price"],
        historical_average=res["historical_avg"],
        confidence_min=res["confidence_min"],
        confidence_max=res["confidence_max"],
        price_trend=res["price_trend"],
        percentage_change=res["percentage_change"],
        seasonal_impact=res["seasonal_impact"],
        historical_points=hist_points,
        forecast_trajectory=traj_points,
        recommendation=recommendation
    )

@router.post("/compare", response_model=MarketComparisonResponse)
def compare_crop_markets(req: MarketComparisonRequest, db: Session = Depends(get_db)):
    records = db.query(AgriculturalMarketRecord).filter(
        AgriculturalMarketRecord.commodity.ilike(req.crop)
    ).all()

    if not records:
        raise HTTPException(status_code=404, detail=f"No records found for commodity {req.crop}")

    df = pd.DataFrame([{
        "district": r.district,
        "market": r.market,
        "commodity": r.commodity,
        "arrival_date": r.arrival_date,
        "modal_price": r.modal_price
    } for r in records])

    markets = df["market"].unique()
    comparisons = []

    for m in markets:
        sub = df[df["market"] == m].sort_values("arrival_date")
        latest = sub.iloc[-1]
        actual_price = float(latest["modal_price"])
        district = str(latest["district"])
        
        # Simple projection
        pred_res = predict_single(req.crop, m, req.target_date, "Random Forest Regressor", df)
        predicted_price = pred_res["predicted_price"]
        diff = round(predicted_price - actual_price, 1)
        pct = round((diff / actual_price) * 100, 1)

        comparisons.append(MarketComparisonItemOut(
            market=m,
            district=district,
            latest_actual_price=actual_price,
            predicted_price=predicted_price,
            difference=diff,
            percentage_diff=pct,
            is_highest=False,
            recommendation_text=f"+₹{diff}/Q expected" if diff >= 0 else f"-₹{abs(diff)}/Q expected"
        ))

    comparisons.sort(key=lambda x: x.predicted_price, reverse=True)
    if comparisons:
        comparisons[0].is_highest = True
        comparisons[0].recommendation_text = "Top Recommended Market"

    return MarketComparisonResponse(
        crop=req.crop,
        target_date=req.target_date,
        comparisons=comparisons,
        best_market=comparisons[0].market if comparisons else None
    )

@router.get("/recommendations", response_model=list[FarmerRecommendationOut])
def get_farmer_recommendations():
    return [
        FarmerRecommendationOut(
            id="rec-1",
            type="market_arbitrage",
            commodity="Onion (Small)",
            title="Arbitrage Opportunity: Dindigul to Trichy Market",
            message="Trichy Gandhi Market offers ₹200-₹300 higher realization per Quintal than Dindigul APMC after accounting for ₹70 transport.",
            priority="high",
            potential_gain_per_quintal=230.0,
            suggested_action="Route small onion consignments to Tiruchirappalli for higher margins."
        ),
        FarmerRecommendationOut(
            id="rec-2",
            type="price_trend",
            commodity="Turmeric",
            title="Turmeric Upward Momentum in Erode",
            message="Finger variety turmeric trading at ₹15,900/Q with robust post-monsoon festive demand surge.",
            priority="high",
            potential_gain_per_quintal=600.0,
            suggested_action="Utilize e-NAM warehouse receipt loans rather than panic distress sales."
        ),
        FarmerRecommendationOut(
            id="rec-3",
            type="risk_warning",
            commodity="Tomato",
            title="Perishable Volume Inflow Warning in Oddanchatram",
            message="Harvest arrivals ramping up. Models forecast slight price cooling in subsequent fortnights.",
            priority="medium",
            suggested_action="Harvest and clear ready crops promptly."
        )
    ]
