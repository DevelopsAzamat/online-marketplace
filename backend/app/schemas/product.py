# app/schemas/product.py
from typing import Optional
from pydantic import BaseModel

class ProductOut(BaseModel):
    id: int
    title: str
    price: float
    image: str
    description: Optional[str] = None  # ← ЭТО нужно
    category: Optional[str] = None
    
    class Config:
        from_attributes = True

class ProductCreate(BaseModel):
    title: str
    price: float
    image: str
    description: str
    category: str

class ProductResponse(BaseModel):
    id: int
    title: str
    price: float
    image: str
    description: str
    category: str