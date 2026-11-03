from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class MarketRecordBase(BaseModel):
    state: str
    district: str
    market: str
    commodity: str
    variety: Optional[str] = "Common"
    arrival_date: str
    min_price: float
    max_price: float
    modal_price: float
    arrivals: Optional[float] = 0.0

class MarketRecordCreate(MarketRecordBase):
    pass

class MarketRecordOut(MarketRecordBase):
    id: int

    class Config:
        from_attributes = True

class PredictionRequest(BaseModel):
    crop: str = Field(..., example="Tomato")
    state: str = Field("Tamil Nadu", example="Tamil Nadu")
    district: str = Field(..., example="Dindigul")
    market: str = Field(..., example="Oddanchatram")
    prediction_date: str = Field(..., example="2026-12-15")
    algorithm: Optional[str] = Field("Random Forest Regressor", example="Random Forest Regressor")

class HistoricalPoint(BaseModel):
    date: str
    actual: float

class TrajectoryPoint(BaseModel):
    date: str
    predicted: float

class PredictionResponse(BaseModel):
    crop: str
    state: str
    district: str
    market: str
    prediction_date: str
    algorithm: str
    predicted_price: float
    historical_average: float
    confidence_min: float
    confidence_max: float
    price_trend: str
    percentage_change: float
    seasonal_impact: str
    historical_points: List[HistoricalPoint]
    forecast_trajectory: List[TrajectoryPoint]
    recommendation: str

class MarketComparisonRequest(BaseModel):
    crop: str = Field(..., example="Onion (Small)")
    target_date: str = Field(..., example="2026-12-01")
    state: Optional[str] = "Tamil Nadu"

class MarketComparisonItemOut(BaseModel):
    market: str
    district: str
    latest_actual_price: float
    predicted_price: float
    difference: float
    percentage_diff: float
    is_highest: bool
    recommendation_text: str

class MarketComparisonResponse(BaseModel):
    crop: str
    target_date: str
    comparisons: List[MarketComparisonItemOut]
    best_market: Optional[str]

class DashboardStatsResponse(BaseModel):
    total_crops: int
    total_markets: int
    total_records: int
    latest_market_price: float
    latest_crop: str
    latest_market: str
    latest_date: str
    average_predicted_price: float
    best_ml_model: str
    best_r2_score: float

class ModelMetricOut(BaseModel):
    algorithm: str
    mae: float
    mse: float
    rmse: float
    r2_score: float
    training_time_sec: float
    best_hyperparameters: Dict[str, Any]
    feature_importance: List[Dict[str, Any]]

class FarmerRecommendationOut(BaseModel):
    id: str
    type: str
    commodity: str
    title: str
    message: str
    priority: str
    potential_gain_per_quintal: Optional[float] = None
    suggested_action: str
