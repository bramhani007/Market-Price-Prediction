import datetime
from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class CropInformation(Base):
    __tablename__ = "crop_information"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    crop_name = Column(String(100), unique=True, index=True, nullable=False)
    variety_types = Column(String(255), nullable=True)
    season = Column(String(50), nullable=True) # Kharif, Rabi, Zaid
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    records = relationship("AgriculturalMarketRecord", back_populates="crop_rel")

class MarketInformation(Base):
    __tablename__ = "market_information"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    market_name = Column(String(100), unique=True, index=True, nullable=False)
    district = Column(String(100), index=True, nullable=False)
    state = Column(String(100), default="Tamil Nadu", nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    records = relationship("AgriculturalMarketRecord", back_populates="market_rel")

class AgriculturalMarketRecord(Base):
    __tablename__ = "agricultural_market_records"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    state = Column(String(100), nullable=False, default="Tamil Nadu")
    district = Column(String(100), nullable=False)
    market = Column(String(100), nullable=False)
    commodity = Column(String(100), nullable=False)
    variety = Column(String(100), default="Common")
    arrival_date = Column(String(20), nullable=False, index=True) # YYYY-MM-DD
    min_price = Column(Float, nullable=False)
    max_price = Column(Float, nullable=False)
    modal_price = Column(Float, nullable=False) # Target
    arrivals = Column(Float, default=0.0) # Tonnes
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    crop_id = Column(Integer, ForeignKey("crop_information.id"), nullable=True)
    market_id = Column(Integer, ForeignKey("market_information.id"), nullable=True)

    crop_rel = relationship("CropInformation", back_populates="records")
    market_rel = relationship("MarketInformation", back_populates="records")

class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    crop = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    market = Column(String(100), nullable=False)
    prediction_date = Column(String(20), nullable=False)
    algorithm = Column(String(50), nullable=False)
    predicted_price = Column(Float, nullable=False)
    historical_avg = Column(Float, nullable=False)
    price_trend = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ModelPerformance(Base):
    __tablename__ = "model_performance"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    algorithm = Column(String(100), unique=True, nullable=False)
    mae = Column(Float, nullable=False)
    mse = Column(Float, nullable=False)
    rmse = Column(Float, nullable=False)
    r2_score = Column(Float, nullable=False)
    training_time_sec = Column(Float, nullable=False)
    hyperparameters = Column(Text, nullable=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
