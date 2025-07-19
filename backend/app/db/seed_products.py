from app.db.session import SessionLocal
from app.models.product import Product

def seed_products():
    db = SessionLocal()

    products = [
        Product(title="iPhone 15", price=999.99, image="https://via.placeholder.com/150"),
        Product(title="Samsung Galaxy S24", price=899.99, image="https://via.placeholder.com/150"),
        Product(title="Xiaomi Mi 13", price=599.99, image="https://via.placeholder.com/150"),
    ]

    db.add_all(products)
    db.commit()
    db.close()
    print("✅ Продукты добавлены")

if __name__ == "__main__":
    seed_products()
        