# app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

db = SQLAlchemy()
jwt = JWTManager()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    CORS(app, origins=["http://localhost:5173", "https://*.vercel.app"], supports_credentials=True)

    # Register routes
    from app.routes.auth import auth_bp
    from app.routes.user import user_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(user_bp, url_prefix="/api/user")

    return app