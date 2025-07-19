from pydantic import BaseModel
from typing import List
from datetime import datetime

class OrderItemCreate(BaseModel):
    product_id: int
    title: str
    price: float
    quantity: int
    image: str

class OrderCreate(BaseModel):
    user_email: str
    full_name: str
    phone: str
    address: str
    payment_method: str
    total: float
    items: List[OrderItemCreate]

class OrderItemOut(BaseModel):
    product_id: int
    title: str
    price: float
    quantity: int
    image: str

    class Config:
        orm_mode = True

class OrderOut(BaseModel):
    id: int
    user_email: str
    full_name: str
    phone: str
    address: str
    payment_method: str
    total: float
    created_at: datetime
    items: List[OrderItemOut]

    class Config:
        from_attributes = True
