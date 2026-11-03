from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import AgriculturalMarketRecord
import pandas as pd
from services.ml_service import train_and_evaluate_models
from schemas import ModelMetricOut

router = APIRouter(prefix="/api/models", tags=["Model Performance"])

@router.get("/performance", response_model=list[ModelMetricOut])
def get_model_performance(db: Session = Depends(get_db)):
    records = db.query(AgriculturalMarketRecord).all()
    if not records:
        return []
    
    df = pd.DataFrame([{
        "commodity": r.commodity,
        "market": r.market,
        "arrival_date": r.arrival_date,
        "modal_price": r.modal_price,
        "arrivals": r.arrivals
    } for r in records])

    return train_and_evaluate_models(df)
