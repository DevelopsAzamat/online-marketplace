from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from app.db.database import get_db
from app.models.cart import UsersCart
from app.models.product import Product
from app.schemas.cart import CartItemCreate, CartItemOut
from app.schemas.cart import CartItemUpdate

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.get("/", response_model=list[CartItemOut])
def get_cart(email: str = Query(...), db: Session = Depends(get_db)):
    return db.query(UsersCart).options(joinedload(UsersCart.product)).filter(UsersCart.email == email).all()

@router.post("/", response_model=CartItemOut)
def add_to_cart(item: CartItemCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Товар не найден")

    existing = db.query(UsersCart).filter(
        UsersCart.email == item.email,
        UsersCart.product_id == item.product_id
    ).first()

    if existing:
        existing.quantity += item.quantity
        existing.total_price = existing.quantity * product.price
    else:
        new_item = UsersCart(
            email=item.email,
            product_id=item.product_id,
            quantity=item.quantity,
            total_price=product.price * item.quantity
        )
        db.add(new_item)

    db.commit()
    return db.query(UsersCart).options(joinedload(UsersCart.product)).filter(
        UsersCart.email == item.email,
        UsersCart.product_id == item.product_id
    ).first()
@router.put("/{product_id}", response_model=CartItemOut)
def update_cart_quantity(
    product_id: int,
    data: CartItemUpdate,
    db: Session = Depends(get_db)
):
    item = db.query(UsersCart).filter(
        UsersCart.email == data.email,
        UsersCart.product_id == product_id
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Товар не найден в корзине")

    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Товар не существует")

    item.quantity = data.quantity
    item.total_price = product.price * data.quantity
    db.commit()
    db.refresh(item)
    return item



@router.delete("/{product_id}")
def delete_from_cart(product_id: int, email: str = Query(...), db: Session = Depends(get_db)):
    item = db.query(UsersCart).filter(UsersCart.email == email, UsersCart.product_id == product_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Товар не найден в корзине")
    db.delete(item)
    db.commit()
    return {"detail": "Удалено"}

@router.delete("/")
def clear_cart(email: str = Query(...), db: Session = Depends(get_db)):
    db.query(UsersCart).filter(UsersCart.email == email).delete()
    db.commit()
    return {"detail": "Корзина очищена"}




