from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: EmailStr
    password: str  # ОБЯЗАТЕЛЬНО


class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    is_admin: bool
    
    class Config:
        from_attributes = True


class ChangePasswordRequest(BaseModel):
    email: EmailStr
    old_password: str
    new_password: str
