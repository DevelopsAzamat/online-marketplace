from fastapi import APIRouter
from app.api.v1.products import router as products_router
from app.api.v1.users import router as users_router
from app.api.v1.orders import router as orders_router
from app.api.v1.wishlists import router as wishlist_router
from app.api.v1.carts import router as cart_router
from app.api.v1.admin import router as admin_users_router
from app.api.auth import router as auth_router

router = APIRouter()

router.include_router(products_router, prefix="/products", tags=["Products"])
router.include_router(users_router, prefix="/users", tags=["Users"])
router.include_router(orders_router, prefix="/orders", tags=["Orders"])
router.include_router(auth_router, prefix="/auth", tags=["Auth"])
router.include_router(wishlist_router)
router.include_router(cart_router)
router.include_router(admin_users_router)

__all__ = ["router"]
