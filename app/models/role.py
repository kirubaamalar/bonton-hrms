from app import db
from app.models.base import BaseModel

class Role(BaseModel):
    __tablename__ = "roles"

    name = db.Column(db.String(50), unique=True)