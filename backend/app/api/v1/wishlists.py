from fastapi import APIRouter, Depends, HTTPException, Query, Body
from sqlalchemy.orm import Session, joinedload
from app.db.database import get_db
from app.models.wishlist import Wishlist
from app.models.product import Product
from app.schemas.wishlist import WishlistCreate, WishlistOut

router = APIRouter(prefix="/wishlists", tags=["Wishlist"])

@router.get("/", response_model=list[WishlistOut])
def get_user_wishlist(email: str = Query(...), db: Session = Depends(get_db)):
    return (
        db.query(Wishlist)
        .options(joinedload(Wishlist.product))  # подгружаем связанные товары
        .filter(Wishlist.email == email)
        .all()
    )

@router.post("/", response_model=WishlistOut)
def add_to_wishlist(data: WishlistCreate, db: Session = Depends(get_db)):
    wishlist = Wishlist(email=data.email, product_id=data.product_id)
    db.add(wishlist)
    db.commit()
    db.refresh(wishlist)
    return wishlist

@router.delete("/", response_model=dict)
def remove_from_wishlist(
    data: dict = Body(...), db: Session = Depends(get_db)
):
    email = data.get("email")
    product_id = data.get("product_id")

    if not email or product_id is None:
        raise HTTPException(status_code=400, detail="Email и product_id обязательны")

    item = db.query(Wishlist).filter_by(email=email, product_id=product_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Товар не найден в избранном")

    db.delete(item)
    db.commit()
    return {"ok": True}
