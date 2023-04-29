from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .. import db_person, db_medicine
from bson.objectid import ObjectId

treatment = Blueprint('medicine', __name__)

@treatment.route('/<id>/medicines', methods=['GET'])
@login_required
def treatment_medicines(id):
    medicines = db_medicine.find({'treatment_id': ObjectId(id)})
    medicines_list = []
    for medicine in medicines:
        medicine['_id'] = str(medicine['_id'])
        medicines_list.append(medicine)
    return jsonify(medicines_list), 200 