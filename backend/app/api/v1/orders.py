from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.session import get_db
from app.schemas.order import OrderCreate, OrderOut
import json

from app.models.order import Order  # ✅

router = APIRouter()

@router.post("/")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    query = text("""
        INSERT INTO orders (user_email, full_name, phone, address, payment_method, items, total)
        VALUES (:user_email, :full_name, :phone, :address, :payment_method, :items, :total)
    """)
    db.execute(query, {
        "user_email": order.user_email,
        "full_name": order.full_name,
        "phone": order.phone,
        "address": order.address,
        "payment_method": order.payment_method,
        "items": json.dumps([item.dict() for item in order.items]),
        "total": order.total
    })
    db.commit()
    return {"status": "ok"}

@router.get("/orderspage", response_model=List[OrderOut])
def get_orders_for_orderspage(email: str = Query(...), db: Session = Depends(get_db)):
    orders = db.query(Order).filter(Order.user_email == email).order_by(Order.created_at.desc()).all()
    return orders
