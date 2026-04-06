from flask import Blueprint
from app.utils.decorators import role_required

user_bp = Blueprint("user", __name__)

# 🔹 Admin only
@user_bp.route("/admin-data", methods=["GET"])
@role_required(["Admin", "Super Admin"])
def admin_data():
    return {"msg": "Admin access granted"}

# 🔹 Manager only
@user_bp.route("/manager-data", methods=["GET"])
@role_required(["Manager"])
def manager_data():
    return {"msg": "Manager access granted"}

# 🔹 Employee only
@user_bp.route("/employee-data", methods=["GET"])
@role_required(["Employee"])
def employee_data():
    return {"msg": "Employee access granted"}