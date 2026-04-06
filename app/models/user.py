from app import db, bcrypt
from app.models.base import BaseModel
from app.models.role import Role   # 🔥 IMPORTANT

class User(BaseModel):
    __tablename__ = "users"

    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(255))

    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"))

    role = db.relationship("Role")  # now works ✅

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)