from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from app.models.user import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(username=data["username"]).first()

    if not user or not user.check_password(data["password"]):
        return {"msg": "Invalid credentials"}, 401

    token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role.name
        }
    )

    return {
        "token": token,
        "role": user.role.name
    }