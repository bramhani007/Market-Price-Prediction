import os
import pandas as pd
import numpy as np
from datetime import datetime
from sqlalchemy.orm import Session
from database import SessionLocal
from models import AgriculturalMarketRecord, CropInformation, MarketInformation

SAMPLE_CSV_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "sample_agmarknet_tamilnadu.csv")

def parse_agmarknet_csv(file_content: str):
    """
    Parses and cleans raw CSV content according to AGMARKNET / data.gov.in format
    """
    import io
    df = pd.read_csv(io.StringIO(file_content))
    
    # Normalize column names
    col_map = {}
    for col in df.columns:
        clean = col.strip().lower()
        if "state" in clean: col_map[col] = "state"
        elif "district" in clean: col_map[col] = "district"
        elif "market" in clean or "apmc" in clean: col_map[col] = "market"
        elif "commodity" in clean or "crop" in clean: col_map[col] = "commodity"
        elif "variety" in clean: col_map[col] = "variety"
        elif "date" in clean: col_map[col] = "arrival_date"
        elif "modal" in clean: col_map[col] = "modal_price"
        elif "min" in clean: col_map[col] = "min_price"
        elif "max" in clean: col_map[col] = "max_price"
        elif "arrival" in clean: col_map[col] = "arrivals"
    
    df.rename(columns=col_map, inplace=True)

    required_cols = ["commodity", "modal_price"]
    for req in required_cols:
        if req not in df.columns:
            raise ValueError(f"Missing required column: {req}")

    # Defaults
    if "state" not in df.columns: df["state"] = "Tamil Nadu"
    if "district" not in df.columns: df["district"] = "General"
    if "market" not in df.columns: df["market"] = "General Market"
    if "variety" not in df.columns: df["variety"] = "Common"
    if "arrival_date" not in df.columns: df["arrival_date"] = datetime.utcnow().strftime("%Y-%m-%d")
    if "min_price" not in df.columns: df["min_price"] = df["modal_price"] * 0.9
    if "max_price" not in df.columns: df["max_price"] = df["modal_price"] * 1.1
    if "arrivals" not in df.columns: df["arrivals"] = 30.0

    # Clean dates and prices
    df["modal_price"] = pd.to_numeric(df["modal_price"], errors="coerce")
    df = df.dropna(subset=["modal_price"])
    df = df[df["modal_price"] > 0]

    # Deduplicate
    df = df.drop_duplicates(subset=["commodity", "market", "arrival_date"])
    return df

def seed_database_if_empty():
    """
    Initializes SQLite with genuine AGMARKNET sample records on first startup
    """
    db = SessionLocal()
    try:
        count = db.query(AgriculturalMarketRecord).count()
        if count == 0 and os.path.exists(SAMPLE_CSV_PATH):
            df = pd.read_csv(SAMPLE_CSV_PATH)
            for _, row in df.iterrows():
                rec = AgriculturalMarketRecord(
                    state=str(row["State"]).strip(),
                    district=str(row["District"]).strip(),
                    market=str(row["Market"]).strip(),
                    commodity=str(row["Commodity"]).strip(),
                    variety=str(row.get("Variety", "Common")).strip(),
                    arrival_date=str(row["Arrival Date"]).strip(),
                    min_price=float(row["Min Price"]),
                    max_price=float(row["Max Price"]),
                    modal_price=float(row["Modal Price"]),
                    arrivals=float(row.get("Arrivals", 30))
                )
                db.add(rec)
            db.commit()
    finally:
        db.close()
