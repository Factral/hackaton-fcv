# auth.py

from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from . import db
from .user import User

auth = Blueprint('auth', __name__)
#login

@auth.route('/login', methods=['POST'])
def login_post():
    email = request.json['email']
    password = request.json['password']
    remember = True if request.json['remember'] else False

    user = db.find_one({'email': email})

    if not user or not User.validate_login(user['password'], password):
        return jsonify({'message': 'Por favor revisa tus credenciales'}), 400
    
    user_obj = User(str(user["_id"]), user["email"])

    login_user(user_obj, remember=remember)

    return jsonify({'message': 'Logged in'})

# signup

@auth.route('/signup', methods=['POST'])
def signup_post():

    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    # check if user already exists
    user = db.find_one({'email': email})

    if user: 
        return jsonify({'message': 'User already exists'})

    # regiter user in mongodb
    new_user = {
        'email': email,
        'name': name,
        'password': generate_password_hash(password, method='sha256')
    }

    db.insert_one(new_user)

    return jsonify({'message': 'El usuario ha sido creado'}), 201

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out'}), 200