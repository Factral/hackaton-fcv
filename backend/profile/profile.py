from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

profile = Blueprint('profile', __name__)


@profile.route('/profile')
@login_required
def profile_():
    user = current_user
    user_dict = {
        'id': user.username,
        'email': user.email,
        'name': user.name, 
        'phone': user.phone,
        'birthdate': user.birthdate,
        'role': user.role,
        'gender': user.gender
    }
    return jsonify(user_dict)
    