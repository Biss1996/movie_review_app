from flask import Flask, request, jsonify
from models import db, User, TokenBlocklist
from datetime import timedelta
from flask_migrate import Migrate
from flask_mail import Mail
from flask_jwt_extended import JWTManager
from sqlalchemy import event
from sqlalchemy.engine import Engine
from flask_cors import CORS
import sqlite3 



app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)
# flask cors
CORS(app)
from flask_cors import CORS

CORS(app, resources={r"/api/*": {"origins": "https://moviereview-taupe.vercel.app"}})

# mail configurations

app.config['MAIL_SERVER'] = 'smtp.gmail.com' 
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config["MAIL_USE_SSL"] = False
app.config['MAIL_USERNAME'] = 'bismarckkip684@gmail.com' # Replace with your actual email
app.config['MAIL_PASSWORD'] = 'iqrh njlh lltk bspa'  # Replace with your App actual password
app.config['MAIL_DEFAULT_SENDER'] = 'bismarckkip684@gmail.com'

mail = Mail(app)

# delete reviews, ratins,movies when user is deleted
@event.listens_for(Engine, "connect")
def enforce_foreign_keys(dbapi_connection, connection_record):
  if isinstance(dbapi_connection, sqlite3.Connection):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()
# JWT
app.config["JWT_SECRET_KEY"] = "rtyuytrkgfd"  
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)


# test
app.config["JWT_VERIFY_SUB"] = False

jwt = JWTManager(app)
jwt.init_app(app)

# Register Blueprints
from views import *
app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(movie_bp)
app.register_blueprint(review_bp)
app.register_blueprint(rating_bp)




if __name__ == "__main__":
    app.run(debug=True)


# Callback function to check if a JWT exists in the database blocklist
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None

