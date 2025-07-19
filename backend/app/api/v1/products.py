from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.product import Product
from app.schemas.product import ProductOut, ProductCreate, ProductResponse

router = APIRouter(
    tags=["Products"]
)

@router.get("/", response_model=list[ProductOut])
def get_products(
    db: Session = Depends(get_db),
    search: str = Query("", alias="search"),
    category: str = Query("", alias="category"),
    sort: str = Query("default", alias="sort")
):
    query = db.query(Product)

    if search:
        query = query.filter(Product.title.ilike(f"%{search}%"))

    if category and category.lower() != "все":
        query = query.filter(Product.category == category)

    if sort == "asc":
        query = query.order_by(Product.price.asc())
    elif sort == "desc":
        query = query.order_by(Product.price.desc())

    return query.all()

@router.post("/", response_model=ProductOut, status_code=201)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    new_product = Product(**product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.put("/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, updated_data: ProductCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Продукт не найден")
    for field, value in updated_data.dict().items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return

__all__ = ["router"]
