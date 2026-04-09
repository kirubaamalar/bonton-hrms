import os

from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "mysql+pymysql://root:root@localhost/bonton_hrms"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # SSL required for Aiven cloud MySQL
    if "aiven" in os.getenv("DATABASE_URL", ""):
        SQLALCHEMY_ENGINE_OPTIONS = {
            "connect_args": {
                "ssl": {
                    "ssl_mode": "REQUIRED"
                }
            }
        }

    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")