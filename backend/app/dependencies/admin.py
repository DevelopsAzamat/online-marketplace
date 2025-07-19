# app/dependencies/admin.py

from fastapi import Depends, HTTPException, status
from app.models.user import User
from app.services.auth import get_current_user  # 🔑 это правильная зависимость

def admin_required(current_user: User = Depends(get_current_user)) -> User:
    if current_user.email != "admin@gmail.com":
        raise HTTPException(status_code=403, detail="Access forbidden: admin only")
    return current_user

