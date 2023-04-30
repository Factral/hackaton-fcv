# auth.py

from flask import Blueprint, request, jsonify, session, current_app
from flask_login.utils import encode_cookie, decode_cookie
from flask_login import user_loaded_from_cookie
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from .. import db_person, login_manager
from ..models.user import User
from bson.objectid import ObjectId

auth = Blueprint('auth', __name__)
#login

@auth.route('/login', methods=['POST'])
def login_post():
    
    email = request.json['email']
    password = request.json['password']
    
    remember = True if request.json['remember'] else False

    user = db_person.find_one({'email': email})

    if not user or not User.validate_login(user['password'], password):
        return jsonify({'message': 'Por favor revisa tus credenciales', "error" : True}), 400
    
    user_obj = User(str(user["_id"]), user["email"], user["name"], user['phone'],user["birthdate"],user["role"],user["gender"], user["document"])

    login_user(user_obj, remember=remember)
    
    user = current_user
    user_dict = {
        'id': user.username,
        'name': user.name,
        'email': user.email,
        'phone': user.phone,
        'birthdate': user.birthdate,
        'role': user.role,
        'gender': user.gender,
        'document': user.document,
        'cookie': encode_cookie(str(session["_user_id"]))
    }


    print(encode_cookie(str(session["_user_id"])))
    #print(a)
    b = decode_cookie(encode_cookie(str(session["_user_id"])))
    print(b,"a")
    user = login_manager._user_callback(b)
    print(user,"b")
    print(user.name)
    app = current_app._get_current_object()
    print(app)

    #response

    return jsonify({'message': 'Has iniciado sesión', 'user':user_dict}), 200

# signup

@auth.route('/register', methods=['POST'])
def signup_post():

    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    phone = request.json['phone']
    birthdate = request.json['birthdate']
    role =  request.json['role']
    gender = request.json['gender']
    document = request.json['document']
    # check if user already exists
    user = db_person.find_one({'email': email})
    

    if user: 
        return jsonify({'message': 'User already exists' , 'error': True}), 400
    

    # regiter user in mongodb
    new_user = {
        'email': email,
        'name': name,
        'password': generate_password_hash(password, method='sha256'),
        'phone': phone,
        'birthdate': birthdate,
        'role': role,
        'gender': gender,
        'document': document
    }

    person = db_person.insert_one(new_user)    

    return jsonify({'message': 'El usuario ha sido creado'}), 201

@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out'}), 200

