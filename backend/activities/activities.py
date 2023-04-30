from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .. import db_person, db_medicine, db_treatment
from bson.objectid import ObjectId
import datetime

activities = Blueprint('activities', __name__)


#get activities of the day
@activities.route('/activities', methods=['POST'])
@login_required
def activities_get():

    day = request.json['date'] # AAAA-MM-DD
    user = current_user

    # retrieve activites from treatment, nutrition, and medicine and check the day
    if user.role == 'carer':
        patient = request.json['patient']
        treatment_patient = db_person.find_one({'_id': ObjectId(patient)})['treatment']
    
        # list medicines for the day
        medicines = db_medicine.find({'treatment_id': ObjectId(treatment_patient)})
        medicines_list = []
        for medicine in medicines:
            total_activities = generate_activities(medicine['start_date'], medicine['frequency'], medicine['quantity'])
            filtered_activities = filter_activities(total_activities, day)
            medicines_list.append(*filtered_activities)

        return jsonify({"message": medicines_list}), 200

    
def generate_activities(start_date,frequency,quantity):
    dates = []
    start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')
    # frequency is in hours
    for i in range(quantity):
        dates.append(start_date + datetime.timedelta(hours=frequency*i))
    return dates

def filter_activities(activities_dates, day):
    day = datetime.datetime.strptime(day, '%Y-%m-%d')
    filtered_activities = []
    for activity in activities_dates:

        if activity.day == day.day and activity.month == day.month and activity.year == day.year:
            filtered_activities.append(activity)
    return filtered_activities


