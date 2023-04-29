from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .. import db_person, db_medicine
from bson.objectid import ObjectId

medicine = Blueprint('medicine', __name__)


