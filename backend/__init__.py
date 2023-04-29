# init.py
from flask import Flask
from flask_login import LoginManager 
import pymongo
from .user import User
from bson.objectid import ObjectId

client = pymongo.MongoClient("mongodb+srv://RamiroS1:yAYmiebZ9YcpJ0P8@cluster0.f3kcdqq.mongodb.net/testyAYmiebZ9YcpJ0P8")
db = client.get_database('Teemos')
db = db.Persona

def create_app():
    app = Flask(__name__)
    app.debug = True
    app.config['SECRET_KEY'] = '9OLWxND4o83j4K4iuopO'

    login_manager = LoginManager()
    login_manager.init_app(app)


    @login_manager.user_loader
    def load_user(user_id):
        user = db.find_one({'_id': ObjectId(user_id)})
        return User(str(user["_id"]), user["email"], user["name"])

    from .auth.auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    from .profile.profile import profile as profile_blueprint
    app.register_blueprint(profile_blueprint)

    return app