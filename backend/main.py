# main.py

from flask import Blueprint, jsonify
from flask_login import login_required, current_user


main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({'message': 'Helpter API'})

@main.route('/profile')
@login_required
def profile():
    user = current_user
    user_dict = {
        'id': user.username,
        'email': user.email,
        'name': user.name,
    }

    return jsonify(user_dict)