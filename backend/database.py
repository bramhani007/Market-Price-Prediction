import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Database path - supports persistent disk mount on Render (e.g., /var/data/agri_market.db) or local fallback
DB_DIR = os.getenv("PERSISTENT_DATA_DIR", os.path.dirname(os.path.abspath(__file__)))
os.makedirs(DB_DIR, exist_ok=True)
SQLITE_DB_PATH = os.path.join(DB_DIR, "agricultural_market.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{SQLITE_DB_PATH}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
