from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import MetaData

metadata =  MetaData()

db = SQLAlchemy(metadata=metadata)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    email = db.Column(db.String(30), nullable=False, unique=True)
    password = db.Column(db.String(260), nullable=False, unique=False)

    is_admin = db.Column(db.Boolean, default=False)
    is_blocked = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # relationships
    movies = db.relationship('Movie', backref='user', lazy=True, cascade='all, delete-orphan', passive_deletes=True)
    reviews = db.relationship('Review', backref='user', lazy=True, cascade='all, delete-orphan', passive_deletes=True)
    ratings = db.relationship('Rating', backref='user', lazy=True, cascade='all, delete-orphan', passive_deletes=True)

# TokenBlocklist
class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)

class Movie(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False, unique=True)
    description = db.Column(db.String(200), nullable=False, unique=True)
    avg_rating = db.Column(db.Float, default=0.0)

    tags = db.Column(db.String(80), nullable=False) # horror, action, documentary
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_movies_user_id', ondelete='CASCADE'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    reviews = db.relationship('Review', backref='movie',cascade='all, delete-orphan', passive_deletes=True, lazy=True)
    ratings = db.relationship('Rating', backref='movie', cascade='all, delete-orphan', passive_deletes=True, lazy=True)


class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_reviews_user_id', ondelete='CASCADE'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id', name='fk_reviews_movie_id', ondelete='CASCADE'), nullable=False)
    message = db.Column(db.String(200), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_approved = db.Column(db.Boolean, default=False)


class Rating(db.Model):
    __tablename__ = 'ratings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_ratings_user_id', ondelete='CASCADE'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id', name='fk_ratings_movie_id', ondelete='CASCADE'), nullable=False)
    value = db.Column(db.Integer, nullable=False)  # 1 to 5
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (db.UniqueConstraint('user_id', 'movie_id', name='unique_user_movie_rating'),)

