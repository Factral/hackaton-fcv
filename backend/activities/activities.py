from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .. import db_person, db_medicine, db_treatment
from bson.objectid import ObjectId

activities = Blueprint('activities', __name__)


#get activities of the day
@activities.route('/activities', methods=['POST'])
@login_required
def activities_get():

    day = request.json['day'] # AAAA-MM-DD
    user = current_user

    if 'patient' not in user.role:
        return jsonify({'message': 'No tienes permisos para realizar esta acción', 'error': True}), 400
    
    # retrieve activites from treatment, nutrition, and medicine and check the day
