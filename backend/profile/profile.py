from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .. import db
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash
from ..models.user import User

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

@profile.route('/profile/edit', methods=['PUT'])
@login_required
def profile_edit():
    name = request.json['name']
    phone = request.json['phone']
    email = request.json['email']
    birthdate = request.json['birthdate']
    role = request.json['role']
    gender = request.json['gender']
    user = current_user
    
    if user.email != email:
        exist_email = db.find_one({'email': email})
        if exist_email:
            return jsonify({'message': 'El correo ya existe'}), 400
    # regiter user in mongodb
    updated_user = {
        '$set': {
            "email": email,
            "name": name,
            "phone": phone,
            "birthdate": birthdate,
            "role": role,
            "gender": gender
        }
    }
    
    db.update_one({'_id': ObjectId(user.username)}, updated_user)
    
    return jsonify({'message': 'Usuario actualizado'})

# path for update password
@profile.route('/profile/password', methods=['PUT'])
@login_required
def update_pwd():
    user = db.find_one({'_id': ObjectId(current_user.username) })
    
    pwd = request.json['current_password']
    new_pwd = request.json['new_password']
    

    if not User.validate_login(user["password"], pwd):
        return jsonify({'message': 'Por favor revisa tus credenciales'}), 400
    
    updated_pwd = {
        "$set": {
            "password": generate_password_hash(new_pwd, method='sha256')
        }
    }
    
    db.update_one({'_id': ObjectId(current_user.username) }, updated_pwd)
    
    return jsonify({'message': 'Contraseña actualizada'})
    