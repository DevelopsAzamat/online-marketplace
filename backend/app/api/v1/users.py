from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate
from app.db.session import get_db
from app.models.user import User
from app.core.security import get_password_hash

router = APIRouter()
