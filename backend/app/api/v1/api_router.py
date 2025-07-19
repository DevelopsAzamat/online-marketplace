from fastapi import APIRouter
from app.api import auth
from fastapi import APIRouter
from app.api.v1 import products  # или как у тебя называется

router = APIRouter()
router.include_router(products.router, prefix="/products", tags=["products"])

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
