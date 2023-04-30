from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from.. import db_person, db_nutrition, db_treatment
from bson.objectid import ObjectId

nutrition = Blueprint('nutrition', __name__)

#crear nueva nutricion
@nutrition.route('/nutrition', methods=['POST'])
@login_required
def nutrition_post():
    recommandations = request.json['recommandations']
    id = request.json['treatment_id']
    temps_consommation = request.json['temps_consommation']
    name = request.json['name']
    breakfast = request.json['breakfast']
    lunch = request.json['lunch']
    dinner = request.json['dinner']

    return jsonify({'message': 'Nutricion agregada'}), 200

#obtener nutricion de un tratamiento dado por id
@nutrition.route('/<id>/nutrition', methods=['GET'])
#@login_required
def nutrition_get(id):
    nutritions = db_treatment.find_one({'_id': ObjectId(id)})
    nutritions_list = []
    for nutrition in nutritions['nutritions']:
        nutritions_list.append(str(nutrition))
    return jsonify(nutritions_list), 200

