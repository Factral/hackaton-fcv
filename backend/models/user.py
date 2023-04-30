from werkzeug.security import check_password_hash


class User():

    def __init__(self, username, email, name, phone, birthdate, role, gender, document):
        self.username = username
        self.email = email
        self.name = name
        self.phone = phone
        self.birthdate = birthdate
        self.role = role
        self.gender = gender
        self.document = document
        
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.username
    

    @staticmethod
    def validate_login(password_hash, password):
        return check_password_hash(password_hash, password)