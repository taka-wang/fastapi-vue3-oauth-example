from decouple import config

DATABASE_URL = config("DATABASE_URL", default="sqlite+aiosqlite:///./test.db")

GOOGLE_OAUTH_CLIENT_ID = config("GOOGLE_OAUTH_CLIENT_ID", default="")
GOOGLE_OAUTH_CLIENT_SECRET = config("GOOGLE_OAUTH_CLIENT_SECRET", default="")
GOOGLE_OAUTH_CALLBACK_URL = config("GOOGLE_OAUTH_CALLBACK_URL", default="")

SECRET = config("SECRET", default="secret")
RESET_PASSWORD_TOKEN_SECRET = config("RESET_PASSWORD_TOKEN_SEC", default="secret")
VERIFICATION_TOKEN_SECRET = config("VERIFICATION_TOKEN_SEC", default="secret")
