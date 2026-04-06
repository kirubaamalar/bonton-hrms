from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt

def role_required(allowed_roles=[]):
    def wrapper(fn):

        @wraps(fn)   # ✅ VERY IMPORTANT
        def decorator(*args, **kwargs):

            verify_jwt_in_request()

            claims = get_jwt()
            user_role = claims["role"]

            if user_role not in allowed_roles:
                return {"msg": "Access denied"}, 403

            return fn(*args, **kwargs)

        return decorator
    return wrapper