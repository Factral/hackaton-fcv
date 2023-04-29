# auth.py

from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from . import db
from .user import User

auth = Blueprint('auth', __name__)
#login

@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/login', methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    user = db.find_one({'email': email})

    if not user or not User.validate_login(user['password'], password):
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login'))


    user_obj = User(str(user["_id"]))
    print(user_obj.username)

    login_user(user_obj, remember=remember)

    return redirect(url_for('main.profile'))

# signup

@auth.route('/signup')
def signup():
    return render_template('signup.html')

@auth.route('/signup', methods=['POST'])
def signup_post():

    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')

    # check if user already exists
    user = db.find_one({'email': email})

    if user: 
        flash('Email address already exists')
        return redirect(url_for('auth.signup'))

    # regiter user in mongodb
    new_user = {
        'email': email,
        'name': name,
        'password': generate_password_hash(password, method='sha256')
    }

    db.insert_one(new_user)

    return redirect(url_for('auth.login'))

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))