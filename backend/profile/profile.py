from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .. import db_person
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
        'gender': user.gender,
        'document': user.document
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
    document = request.json['document']
    user = current_user
    
    if user.email != email:
        exist_email = db_person.find_one({'email': email})
        if exist_email:
            return jsonify({'message': 'El correo ya existe', 'error': True}), 400
    # regiter user in mongodb
    updated_user = {
        '$set': {
            "email": email,
            "name": name,
            "phone": phone,
            "birthdate": birthdate,
            "role": role,
            "gender": gender,
            "document": document
        }
    }
    
    db_person.update_one({'_id': ObjectId(user.username)}, updated_user)
    
    return jsonify({'message': 'Usuario actualizado'}), 200

# path for update password
@profile.route('/profile/password', methods=['PUT'])
@login_required
def update_pwd():
    user = db_person.find_one({'_id': ObjectId(current_user.username) })
    
    pwd = request.json['current_password']
    new_pwd = request.json['new_password']
    

    if not User.validate_login(user["password"], pwd):
        return jsonify({'message': 'Por favor revisa tus credenciales', 'error':True }), 400
    
    updated_pwd = {
        "$set": {
            "password": generate_password_hash(new_pwd, method='sha256')
        }
    }
    
    db_person.update_one({'_id': ObjectId(current_user.username) }, updated_pwd)
    
    return jsonify({'message': 'Contraseña actualizada'}), 200
    
    
    
@profile.route('/profile/add_role', methods=['POST'])
@login_required
def add_role():
    
    new_role = request.json['role']
    
    if current_user.role == new_role:
        return jsonify({'message': 'Ya tiene este rol', 'error': True}), 400
    elif isinstance(current_user.role, list):
        return jsonify({'message': 'Ya tiene los dos roles permitidos', 'error': True}), 400

    db_person.update_one(
        {'_id': ObjectId(current_user.username)},
        {'$set': {
                'role': [current_user.role,new_role] 
             }}
        )  
            
    return jsonify({'message': 'Rol actualizado'}), 200

