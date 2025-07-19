from pydantic import BaseModel
from app.schemas.product import ProductOut  # создадим ниже
from typing import Optional

class CartItemCreate(BaseModel):
    email: str
    product_id: int
    quantity: int

class CartItemOut(BaseModel):
    id: int
    email: str
    product_id: int
    quantity: int
    total_price: int
    product: Optional[ProductOut]

    class Config:
        from_attributes = True

class CartItemUpdate(BaseModel):
    email: str
    quantity: int
