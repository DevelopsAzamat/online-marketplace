from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user import User
from app.dependencies.admin import admin_required
from app.schemas.user import UserOut

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/users", response_model=list[UserOut])
def get_all_users(db: Session = Depends(get_db), current_user: User = Depends(admin_required)):
    return db.query(User).all()

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(admin_required)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {"detail": "User not found"}
    db.delete(user)
    db.commit()
    return {"detail": "User deleted"}
