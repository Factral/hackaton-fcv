from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .. import db_person, db_appointment
from bson.objectid import ObjectId
from datetime import datetime, time, timedelta
from apscheduler.schedulers.background import BackgroundScheduler, BlockingScheduler
from datetime import datetime
from flask_mail import Message, Mail
from pywhatkit import  *


appointment = Blueprint('appointment', __name__)

@appointment.route('/appointment', methods=['POST'])
@login_required
def appointment_post():
    name = request.json['name']
    date = request.json['date']
    time = request.json['time']
    address = request.json['address']
    description = request.json['description']
    professional = request.json['professional']
    user = current_user

    new_appointment = {
        'user_id': ObjectId(user.username),
        'name': name,
        'date': date,
        'time': time,
        'professional': professional,
        'description': description,
        'address': address,
        'status': 'active'
    }
    
    format_date = datetime.strptime(date, '%Y-%m-%d')
    year = format_date.year
    month = format_date.month
    day = format_date.day
    
    format_time = datetime.strptime(time, '%H:%M:%S')
    time_final = format_time - timedelta(minutes=30)
    hour = time_final.hour
    minute = time_final.minute
    second = time_final.second
    

    
    def job(email):
        from flask import Flask
        from flask_mail import Message, Mail
        app = Flask(__name__)
        app.config['MAIL_SERVER']='sandbox.smtp.mailtrap.io'
        app.config['MAIL_PORT'] = 2525
        app.config['MAIL_USERNAME'] = '394719e4247eba'
        app.config['MAIL_PASSWORD'] = '0e1df819bdbc13'
        app.config['MAIL_USE_TLS'] = True
        app.config['MAIL_USE_SSL'] = False
        mail = Mail(app)
        print("Job running")
        msg = Message('Cita médica',
                        sender="noreply@gmail.com",
                        recipients=[email],
                        body="Tienes una cita médica programada para el día " + date + " a las " + time + " con el profesional " + professional + " en la dirección " + address + ".")
        mail = Mail(app)
        with app.app_context():
            mail.send(msg)
        print("Job finished")
    
    user = current_user
        
    scheduler = BackgroundScheduler()
    scheduler.add_job(job, 'date', run_date=datetime(year, month, day, hour, minute, second), args=[user.email])
    scheduler.start()

    db_appointment.insert_one(new_appointment)

    return jsonify({'message': 'Cita agregada'}), 200


@appointment.route('/appointments_by_user/<id>', methods=['GET'])
@login_required
def appointments_by_user(id):
    appointments = db_appointment.find({'user_id': ObjectId(id)})
    appointments_list = []
    for appointment in appointments:
        appointment['_id'] = str(appointment['_id'])
        appointment['user_id'] = str(appointment['user_id'])
        appointments_list.append(appointment)
    return jsonify(appointments_list), 200

@appointment.route('/appointment/<id>', methods=['PUT'])
@login_required
def appointment_put(id):
    name = request.json['name']
    date = request.json['date']
    time = request.json['time']
    address = request.json['address']
    description = request.json['description']
    professional = request.json['professional']
    user = current_user
    
    if date != user.date or time != user.time  or address != user.address or professional != user.professional:
        format_date = datetime.strptime(date, '%Y-%m-%d')
        year = format_date.year
        month = format_date.month
        day = format_date.day
        
        format_time = datetime.strptime(time, '%H:%M:%S')
        time_final = format_time - timedelta(minutes=30)
        hour = time_final.hour
        minute = time_final.minute
        second = time_final.second
        
        def job(email):
            from flask import Flask
            from flask_mail import Message, Mail
            app = Flask(__name__)
            app.config['MAIL_SERVER']='sandbox.smtp.mailtrap.io'
            app.config['MAIL_PORT'] = 2525
            app.config['MAIL_USERNAME'] = '394719e4247eba'
            app.config['MAIL_PASSWORD'] = '0e1df819bdbc13'
            app.config['MAIL_USE_TLS'] = True
            app.config['MAIL_USE_SSL'] = False
            mail = Mail(app)
            msg = Message('Actualizacion de cita médica',
                            sender="noreply@gmail.com",
                            recipients=[email],
                            body="Se ha actualizado tu cita médica para el día " + date + " a las " + time + " con el profesional " + professional + " en la dirección " + address + ".")
            mail = Mail(app)
            with app.app_context():
                mail.send(msg)
        
        user = current_user
            
        scheduler = BackgroundScheduler()
        scheduler.add_job(job, 'date', run_date=datetime(year, month, day, hour, minute, second), args=[user.email])
        scheduler.start()
        
    
    updated_appointment = {
        '$set': {
            'name': name,
            'date': date,
            'time': time,
            'professional': professional,
            'description': description,
            'address': address,
            'status': 'active'
        }
    }
    
    db_appointment.update_one({'_id': ObjectId(id)}, updated_appointment)
    
    return jsonify({'message': 'Cita actualizada'}), 200


            


    
    

