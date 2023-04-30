from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .. import db_person, db_appointment
from bson.objectid import ObjectId
from datetime import datetime, time, timedelta
from apscheduler.schedulers.background import BackgroundScheduler, BlockingScheduler
from datetime import datetime
from flask_mail import Message, Mail



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
    
    
    user = current_user
    carer = {}
    carers = db_person.find({'patients': user.username})
    if carers:
        carers_ = []
        for carer in carers:
            carer_dict = {
            'id': str(carer['_id']),
            'email': carer['email'],
            'name': carer['name'],
            'phone': carer['phone'],
            }
            carers_.append(carer_dict)
        carer = carers_[0]
        
    recipients = [user.email, carer['email']] if carer else [user.email]
    
    message = "El paciente "+user.name+" tiene una cita médica de "+name+" programada para el día " + date + " a las " + time + " con el profesional " + professional + " en la dirección " + address + "."
    mail = Mail()
    msg = Message('Cita médica',
                        sender="noreply@gmail.com",
                        recipients=recipients,
                        body=message)
    mail.send(msg)
    
    
    def send_whatsapp(message,phone):
        from datetime import datetime
        import pywhatkit as pwk
        current_time = datetime.now()
        current_hour = current_time.hour
        current_minute = current_time.minute + 1
        pwk.sendwhatmsg('+57 '+phone,message,current_hour,current_minute,20,True,2)
            
        
        
    scheduler1 = BackgroundScheduler()
    scheduler1.add_job(send_whatsapp, 'date', run_date=datetime.now(),args=[message,user.phone])
    scheduler1.start()
        
        
    

    
    def job(emails,phone):
        from flask import Flask
        from flask_mail import Message, Mail
        from datetime import datetime
        import pywhatkit as pwk
        app = Flask(__name__)
        app.config['MAIL_SERVER']='sandbox.smtp.mailtrap.io'
        app.config['MAIL_PORT'] = 2525
        app.config['MAIL_USERNAME'] = '394719e4247eba'
        app.config['MAIL_PASSWORD'] = '0e1df819bdbc13'
        app.config['MAIL_USE_TLS'] = True
        app.config['MAIL_USE_SSL'] = False
        
        
        
        mailer = Mail(app)
        
        msg = "En 30 minutos tienes una cita médica de "+ name +" programada en la dirección " + address + "."
        message = Message('Recordatorio de cita médica',
                        sender="noreply@gmail.com",
                        recipients=emails,
                        body=msg)
        mailer = Mail(app)
        with app.app_context():
            mailer.send(message)
        current_time = datetime.now()
        current_hour = current_time.hour
        current_minute = current_time.minute + 1
        pwk.sendwhatmsg('+57 '+phone,msg,current_hour,current_minute,20,True,2)
    
        
    scheduler = BackgroundScheduler()
    scheduler.add_job(job, 'date', run_date=datetime(year, month, day, hour, minute, second), args=[recipients,user.phone])
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