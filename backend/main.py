import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from services.data_service import seed_database_if_empty
from routes.predict import router as predict_router
from routes.analytics import router as analytics_router
from routes.dataset import router as dataset_router
from routes.models import router as models_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite database schema
    Base.metadata.create_all(bind=engine)
    # Seed initial AGMARKNET dataset if SQLite table is empty
    seed_database_if_empty()
    yield

app = FastAPI(
    title="Agricultural Market Price Prediction System",
    description="REST API for agricultural market commodity price forecasting using ML algorithms (Random Forest, XGBoost, LightGBM, SARIMA).",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routers
app.include_router(predict_router)
app.include_router(analytics_router)
app.include_router(dataset_router)
app.include_router(models_router)

@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": "Agricultural Market Price Prediction System API",
        "database": "SQLite (SQLAlchemy)",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
