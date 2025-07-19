from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class UsersCart(Base):
    __tablename__ = "users_cart"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Integer, nullable=False)

    product = relationship("Product")
