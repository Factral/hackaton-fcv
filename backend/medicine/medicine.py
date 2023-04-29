from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .. import db_person, db_medicine, db_treatment
from bson.objectid import ObjectId

medicine = Blueprint('medicine', __name__)

@medicine.route('/medicine', methods=['POST'])
@login_required
def medicine_post():
    name = request.json['name']
    quantity = request.json['quantity']
    start_hour = request.json['start_hour']
    frequency = request.json['frequency']
    start_amount = request.json['start_amount']
    id = request.json['treatment_id']
    
    new_medicine = {
        'treatment_id': ObjectId(id),
        'name': name,
        'quantity': quantity,
        'start_hour': start_hour or None,
        'frequency': frequency,
        'start_amount': start_amount,
        'amount': start_amount if not start_hour  else start_amount - 1,
        'status': 'to_start' if not start_hour else 'in_progress'
    }
    
    db_medicine.insert_one(new_medicine)
    
    return jsonify({'message': 'Medicina agregada'}), 200

@medicine.route('/<id>/medicine', methods=['GET'])
@login_required
def medicine_get(id):
    medicines = db_treatment.find_one({'_id': ObjectId(id)})
    medicines_list = []
    for medicine in medicines['medicaments']:
        medicines_list.append(str(medicine))
    return jsonify(medicines_list), 200

@medicine.route('/medicine/started_hour/<id>', methods=['PUT'])
@login_required
def medicine_started_hour(id):
    start_hour = request.json['start_hour']
    updated_medicine = {
        '$set': {
            "start_hour": start_hour,
            "status": 'in_progress'
        }
    }
    db_medicine.update_one({'_id': ObjectId(id)}, updated_medicine)
    return jsonify({'message': 'Hora de inicio actualizada'}), 200

@medicine.route('/medicine/discount/<id>', methods=['PUT'])
@login_required
def medicine_discount(id):
    medicine = db_medicine.find_one({'_id': ObjectId(id)})
    medicine['amount'] = medicine['amount'] - 1
    if medicine['amount'] == 0:
        medicine['status'] = 'finished'
    updated_medicine = {
        '$set': {
            "amount": medicine['amount'],
            "status": medicine['status']
        }
    }
    
    db_medicine.update_one({'_id': ObjectId(id)}, updated_medicine)
    return jsonify({'message': 'Medicina descontada'}), 200

@medicine.route('/medicine/<id>', methods=['DELETE'])
@login_required
def medicine_delete(id):
    db_medicine.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Medicina eliminada'}), 200


@medicine.route('/medicine/<id>', methods=['PUT'])
@login_required
def medicine_edit(id):
    name = request.json['name']
    quantity = request.json['quantity']
    start_hour = request.json['start_hour']
    frequency = request.json['frequency']
    start_amount = request.json['start_amount']
    amount = request.json['amount']
    
    user = current_user
    
    updated_medicine = {
        '$set': {
            "name": name,
            "quantity": quantity,
            "start_hour": start_hour or None,
            "frequency": frequency,
            "start_amount": start_amount,
            "amount": amount,
            "status": 'to_start' if not start_hour else 'in_progress'
        }
    }
    
    db_medicine.update_one({'_id': ObjectId(id)}, updated_medicine)
    
    return jsonify({'message': 'Medicina actualizada'}), 200



    



    
    
    
