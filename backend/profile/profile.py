from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required, current_user
from flask_login.utils import encode_cookie, decode_cookie
from .. import db_person, login_manager
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash
from ..models.user import User

profile = Blueprint('profile', __name__)


@profile.route('/profile', methods=['POST'])
#@login_required
def profile_():
    if 'session' not in request.json:
        return jsonify({'message': 'No hay session', 'error': True}), 400
    session = request.json['session']
    b = decode_cookie(str(session))
    user = login_manager._user_callback(b)

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

    carer = db_person.find_one({'_id': ObjectId(user.username)})

    user_dict['patients'] = carer['patients']

    return jsonify({'message': user_dict}), 200

@profile.route('/profile/edit', methods=['PUT'])
#@login_required
def profile_edit():

    if 'session' not in request.json:
        return jsonify({'message': 'No hay session', 'error': True}), 400
    session = request.json['session']
    b = decode_cookie(str(session))
    user = login_manager._user_callback(b)

    name = request.json['name']
    phone = request.json['phone']
    email = request.json['email']
    birthdate = request.json['birthdate']
    role = request.json['role']
    gender = request.json['gender']
    document = request.json['document']
    
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
#@login_required
def update_pwd():
    if 'session' not in request.json:
        return jsonify({'message': 'No hay session', 'error': True}), 400
    session = request.json['session']
    b = decode_cookie(str(session))
    user = login_manager._user_callback(b)
    user = db_person.find_one({'_id': ObjectId(user.username) })
    
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
#@login_required
def add_role():
    #roles can be 'patient' or 'carer'
    #carer can have access to patient data
    new_role = request.json['role']
    if 'session' not in request.json:
        return jsonify({'message': 'No hay session', 'error': True}), 400
    session = request.json['session']
    b = decode_cookie(str(session))
    current_user = login_manager._user_callback(b)
    
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

#set patient if user is carer
@profile.route('/profile/set_patient', methods=['POST'])
#@login_required
def set_patient():
    patient_id = request.json['patient_id']
    
    if 'session' not in request.json:
        return jsonify({'message': 'No hay session', 'error': True}), 400
    session = request.json['session']
    b = decode_cookie(str(session))
    current_user = login_manager._user_callback(b)
    print(current_user.role)
    if 'carer' not in current_user.role:
        return jsonify({'message': 'No tienes permisos para realizar esta acción', 'error': True}), 400
    
    patient = db_person.find_one({'_id': ObjectId(patient_id)})
    
    if not patient:
        return jsonify({'message': 'El paciente no existe', 'error': True}), 400
    
    carer = db_person.find_one({'_id': ObjectId(current_user.username)})

    if 'patients' in carer:
        new_patient = [patient_id, *carer['patients']]
    else:
        new_patient = [patient_id]

    db_person.update_one({'_id': ObjectId(current_user.username)}, {'$set': {'patients': new_patient} })
            
    return jsonify({'message': 'Paciente asignado'}), 200

# get carer of patient
@profile.route('/profile/get_carer', methods=['POST'])
#@login_required
def get_carer():
    if 'session' not in request.json:
        return jsonify({'message': 'No hay session', 'error': True}), 400
    session = request.json['session']
    b = decode_cookie(str(session))
    current_user = login_manager._user_callback(b)
    
    carers = db_person.find({'patients': current_user.username})

    if not carers:
        return jsonify({'message': 'No tienes carer asignado', 'error': True}), 400
    
    carers_ = []
    for carer in carers:
        carer_dict = {
        'id': str(carer['_id']),
        'email': carer['email'],
        'name': carer['name'],
        'phone': carer['phone'],
        'birthdate': carer['birthdate'],
        'role': carer['role'],
        }
        carers_.append(carer_dict)


    return jsonify({'message': carers_}), 200