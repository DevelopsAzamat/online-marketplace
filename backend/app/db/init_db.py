from app.db.session import engine
from app.models import product

from app.models.base_class import Base  # если у тебя Base тут

print("Создаём таблицы...")
Base.metadata.create_all(bind=engine)
print("Готово.")
