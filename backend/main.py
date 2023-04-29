# main.py

from flask import Blueprint, jsonify
from flask_login import login_required, current_user


main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify('name aplication v1.0')