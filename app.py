from flask import Flask, request, jsonify
from models import db, User
from flask_migrate import Migrate
from flask_mail import Mail

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)

# mail configurations

app.config['MAIL_SERVER'] = 'smtp.gmail.com' 
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config["MAIL_USE_SSL"] = False
app.config['MAIL_USERNAME'] = 'bismarckkip684@gmail.com' # Replace with your actual email
app.config['MAIL_PASSWORD'] = 'iqrh njlh lltk bspa'  # Replace with your App actual password
app.config['MAIL_DEFAULT_SENDER'] = 'bismarckkip684@gmail.com'

mail = Mail(app)
# Register Blueprints
from views import *

app.register_blueprint(user_bp)
app.register_blueprint(movie_bp)
app.register_blueprint(review_bp)
app.register_blueprint(rating_bp)




if __name__ == "__main__":
    app.run(debug=True)
