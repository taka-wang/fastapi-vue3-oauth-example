from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from app.config import GOOGLE_OAUTH_CALLBACK_URL, SECRET
from app.db import User, create_db_and_tables
from app.schemas import UserCreate, UserRead, UserUpdate
from app.users import (
    auth_backend,
    current_active_user,
    fastapi_users,
    google_oauth_client,
)

@asynccontextmanager
async def lifespan(FastAPI):
    logger.info("server startup")
    # Not needed if you setup a migration system like Alembic
    await create_db_and_tables()
    yield
    logger.info("server shutdown")

app = FastAPI(lifespan=lifespan)

# CORS settings to allow all origins (replace '*' with specific origins if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_oauth_router(
        google_oauth_client,
        auth_backend,
        SECRET,
        GOOGLE_OAUTH_CALLBACK_URL,
    ),
    prefix="/auth/google",
    tags=["auth"],
)

# example authenticated route
@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}
