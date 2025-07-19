from pydantic import BaseModel
from app.schemas.product import ProductOut  # импортируем

class WishlistCreate(BaseModel):
    email: str
    product_id: int

class WishlistOut(BaseModel):
    id: int
    email: str
    product: ProductOut  # ВМЕСТО product_id

    class Config:
        from_attributes = True
