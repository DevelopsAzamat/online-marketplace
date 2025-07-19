from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base
from app.models.product import Product

class Wishlist(Base):
    __tablename__ = "wishlist"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))

    product = relationship("Product")
