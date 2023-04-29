from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .. import db_person, db_appointment
from bson.objectid import ObjectId

appointment = Blueprint('appointment', __name__)

@appointment.route('/appointment', methods=['POST'])
@login_required
def appointment_post():
    name = request.json['name']
    date = request.json['date']
    time = request.json['time']
    address = request.json['address']
    description = request.json['description']
    professional = request.json['professional']
    user = current_user

    new_appointment = {
        'user_id': ObjectId(user.username),
        'name': name,
        'date': date,
        'time': time,
        'professional': professional,
        'description': description,
        'address': address,
        'status': 'active'
    }

    db_appointment.insert_one(new_appointment)

    return jsonify({'message': 'Cita agregada'}), 200


@appointment.route('/appointments_by_user/<id>', methods=['GET'])
@login_required
def appointments_by_user(id):
    appointments = db_appointment.find({'user_id': ObjectId(id)})
    appointments_list = []
    for appointment in appointments:
        appointment['_id'] = str(appointment['_id'])
        appointment['user_id'] = str(appointment['user_id'])
        appointments_list.append(appointment)
    return jsonify(appointments_list), 200

@appointment.route('/appointment/<id>', methods=['PUT'])
@login_required
def appointment_put(id):
    name = request.json['name']
    date = request.json['date']
    time = request.json['time']
    address = request.json['address']
    description = request.json['description']
    professional = request.json['professional']
    user = current_user
    
    updated_appointment = {
        '$set': {
            'name': name,
            'date': date,
            'time': time,
            'professional': professional,
            'description': description,
            'address': address,
            'status': 'active'
        }
    }
    
    db_appointment.update_one({'_id': ObjectId(id)}, updated_appointment)
    
    return jsonify({'message': 'Cita actualizada'}), 200


            


    
    

