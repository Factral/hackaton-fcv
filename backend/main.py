# main.py

from flask import Blueprint, render_template
from flask_login import login_required, current_user
import pymongo


main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('login.html')

@main.route('/profile')
@login_required
def profile():
    print(current_user)
    print(current_user.username)
    print(current_user.email)
    return render_template('profile.html', name=current_user.username)