from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .. import db_person, db_medicine, db_treatment, db_nutrition, login_manager
from flask_login.utils import encode_cookie, decode_cookie
from bson.objectid import ObjectId

treatment = Blueprint('treatment', __name__)

@treatment.route('/set_treatment', methods=['POST'])
@login_required
def treatment_set():
    if 'session' not in request.json:
        return jsonify({'message': 'No hay session', 'error': True}), 400
    session = request.json['session']
    b = decode_cookie(str(session))
    user = login_manager._user_callback(b)

    if user.role == 'carer':
        patient = request.json['patient']
        if patient is None:
            return jsonify({'message': 'No se ha especificado el paciente', 'error': True}), 400
        elif patient not in user.patients:
            return jsonify({'message': 'No tienes permisos para realizar esta acción', 'error': True}), 400
        person = db_person.find_one({'_id': ObjectId(patient)})
    else:
        person = user.username
    
    db_person.update_one({'_id': ObjectId(person)}, {'$set': {'treatments': request.json['treatments']}})

    return jsonify({'message': 'Tratamiento registrado'}), 200  


@treatment.route('/treatments', methods=['POST'])
#@login_required
def treatment_get():
    if 'session' not in request.json:
        return jsonify({'message': 'No hay session', 'error': True}), 400
    session = request.json['session']
    b = decode_cookie(str(session))
    user = login_manager._user_callback(b)

    carer = db_person.find_one({'_id': ObjectId(user.username)})
    if user.role == 'carer':
        patient = request.args.get('patient')
        if patient is None:
            return jsonify({'message': 'No se ha especificado el paciente', 'error': True}), 400
        elif patient not in carer['patients']:
            return jsonify({'message': 'No tienes permisos para realizar esta acción', 'error': True}), 400
            
        person = db_person.find_one({'_id': ObjectId(patient)})
    else:        
        person = db_person.find_one({'_id': ObjectId(user.username)})

    if 'treatments' not in person:
        return jsonify([]), 200

    treatments = person['treatments']

    treatments_list = []
    for treatment in treatments:
        treatment_ = db_treatment.find_one({'_id': ObjectId(str(treatment))})
        if isinstance(treatment_['medicines'], list):
            medicines = [str(medicine) for medicine in treatment_['medicines']]
        else:
            medicines = [str(treatment_['medicines'])]

        if isinstance(treatment_['nutrition'], list):
            nutritions = [str(nutrition) for nutrition in treatment_['nutrition']]
        else:
            nutritions = [str(treatment_['nutrition'])]

        medicines_ = []
        for medicine in medicines:
            print(medicine)
            medicine_ = db_medicine.find_one({'_id': ObjectId(medicine)})
            medicines_.append({
                "name": medicine_['name'],
                "quantity": medicine_['quantity'],
                "start_date": medicine_['start_date'],
                "frequency": medicine_['frequency'],
                "start_amount": medicine_['start_amount'],
                "status": medicine_['status']
            })

        nutritions_ = []
        for nutrition in nutritions:
            nutrition_ = db_nutrition.find_one({'_id': ObjectId(nutrition)})
            nutritions_.append({
                "recommendations": nutrition_['recommendations'],
                "name": nutrition_['name'],
                "temps_consommation": nutrition_['temps_consommation'],
                "breakfast": nutrition_['breakfast'],
                "lunch": nutrition_['lunch'],
                "dinner": nutrition_['dinner']
            })

        treatments_list.append({
            "_id": treatment,
            "name": treatment_['name'],
            "medicines": medicines_,
            "nutrition": nutritions_
        })
        

    return jsonify(treatments_list), 200