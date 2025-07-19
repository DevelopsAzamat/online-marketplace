from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSONB
from app.db.base_class import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    address = Column(Text, nullable=False)
    payment_method = Column(String, nullable=False)  # 🔁 исправлено здесь
    items = Column(JSONB, nullable=False)
    total = Column(Integer, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
