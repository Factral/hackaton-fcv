# init.py
from flask import Flask,  jsonify
from flask_mail import Mail
from flask_login import LoginManager 
import pymongo
from .models.user import User
from bson.objectid import ObjectId
from flask_cors import CORS


client = pymongo.MongoClient("mongodb+srv://RamiroS1:yAYmiebZ9YcpJ0P8@cluster0.f3kcdqq.mongodb.net/test")
db = client.get_database('Teemos')
db_person = db.Person
db_medicine = db.Medicine
db_treatment = db.Treatment
db_appointment = db.Appointment
db_nutrition = db.Nutrition

login_manager = LoginManager()


def create_app():
    app = Flask(__name__)
    app.config['MAIL_SERVER']='sandbox.smtp.mailtrap.io'
    app.config['MAIL_PORT'] = 2525
    app.config['MAIL_USERNAME'] = '394719e4247eba'
    app.config['MAIL_PASSWORD'] = '0e1df819bdbc13'
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.debug = True
    app.config['SECRET_KEY'] = '9OLWxND4o83j4K4iuopO'
    #app.config['SESSION_COOKIE_DOMAIN'] = 'http://127.0.0.1:5000'
    CORS(app)
    Mail(app)



    login_manager.init_app(app)

    @login_manager.unauthorized_handler
    def unauth_handler():
        return jsonify(message='Authorize please to access this page', error=401), 401


    @login_manager.user_loader
    def load_user(user_id):
        user = db_person.find_one({'_id': ObjectId(user_id)})
        if user is None:
            return None
        return User(str(user["_id"]), user["email"], user["name"], user["phone"], user["birthdate"], user['role'], user["gender"], user["document"])

    from .auth.auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    from .profile.profile import profile as profile_blueprint
    app.register_blueprint(profile_blueprint)
    
    from .medicine.medicine import medicine as medicine_blueprint
    app.register_blueprint(medicine_blueprint)
    
    from .appointment.appointment import appointment as appointment_blueprint
    app.register_blueprint(appointment_blueprint)

    from .treatment.treatment import treatment as treatment_blueprint
    app.register_blueprint(treatment_blueprint)

    from .activities.activities import activities as activities_blueprint
    app.register_blueprint(activities_blueprint)

    @app.after_request
    def middleware_for_response(response):
        # Allowing the credentials in the response.
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

    return app