from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .. import db_person, db_medicine, db_treatment
from bson.objectid import ObjectId

treatment = Blueprint('treatment', __name__)

@treatment.route('/set_treatment', methods=['POST'])
@login_required
def treatment_set():
    user = current_user

    if 'patient' not in user.role:
        return jsonify({'message': 'No tienes permisos para realizar esta acción', 'error': True}), 400
    
    db_person.update_one({'_id': ObjectId(user.username)}, {'$set': {'treatments': request.json['treatments']}})

    return jsonify({'message': 'Tratamiento registrado'}), 200  


@treatment.route('/treatments', methods=['GET'])
@login_required
def treatment_get():
    user = current_user
    treatments = db_person.find_one({'_id': ObjectId(user.username)})['treatments']
    treatments_list = []
    for treatment in treatments:
        treatment_ = db_treatment.find_one({'_id': ObjectId(treatment)})

        if isinstance(treatment_['medicines'], list):
            medicines = [str(medicine) for medicine in treatment_['medicines']]
        else:
            medicines = str(treatment_['medicines'])

        if isinstance(treatment_['nutrition'], list):
            nutrition = [str(nutrition) for nutrition in treatment_['nutrition']]
        else:
            nutrition = str(treatment_['nutrition'])

        treatments_list.append({
            "_id": treatment,
            "name": treatment_['name'],
            "medicines": medicines,
            "nutrition": nutrition
        })
        

    return jsonify(treatments_list), 200