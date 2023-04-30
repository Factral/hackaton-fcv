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

    # retrieve activites from treatment, nutrition, and medicine and check the day
    if user.role == 'carer':
        patient = request.json['patient']
        treatment_patient = db_person.find_one({'_id': ObjectId(patient)})['treatment']
    
        # list medicines for the day
        medicines = db_medicine.find({'treatment_id': ObjectId(treatment_patient)})
        medicines_list = []
        for medicine in medicines:
            if medicine['start_how'] == 'day':
                medicines_list.append(medicine)


    
