from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import AgriculturalMarketRecord
from services.data_service import parse_agmarknet_csv

router = APIRouter(prefix="/api/dataset", tags=["Dataset Management"])

@router.get("/summary")
def get_dataset_summary(db: Session = Depends(get_db)):
    total = db.query(AgriculturalMarketRecord).count()
    first_rec = db.query(AgriculturalMarketRecord).order_by(AgriculturalMarketRecord.arrival_date.asc()).first()
    latest_rec = db.query(AgriculturalMarketRecord).order_by(AgriculturalMarketRecord.arrival_date.desc()).first()

    return {
        "totalRecords": total,
        "earliestDate": first_rec.arrival_date if first_rec else "N/A",
        "latestDate": latest_rec.arrival_date if latest_rec else "N/A",
        "dataSource": "AGMARKNET / data.gov.in (Government of India)",
        "sampleFields": ["State", "District", "Market", "Commodity", "Variety", "Arrival Date", "Min Price", "Max Price", "Modal Price", "Arrivals"]
    }

@router.post("/upload")
async def upload_agmarknet_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported.")
    
    content = await file.read()
    try:
        text = content.decode("utf-8")
        df = parse_agmarknet_csv(text)
        inserted_count = 0
        for _, row in df.iterrows():
            rec = AgriculturalMarketRecord(
                state=str(row["state"]),
                district=str(row["district"]),
                market=str(row["market"]),
                commodity=str(row["commodity"]),
                variety=str(row["variety"]),
                arrival_date=str(row["arrival_date"]),
                min_price=float(row["min_price"]),
                max_price=float(row["max_price"]),
                modal_price=float(row["modal_price"]),
                arrivals=float(row["arrivals"])
            )
            db.add(rec)
            inserted_count += 1
        db.commit()
        return {
            "success": True,
            "message": f"Successfully parsed and ingested {inserted_count} AGMARKNET records into SQLite database.",
            "insertedRecords": inserted_count
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Validation Error: {str(e)}")
