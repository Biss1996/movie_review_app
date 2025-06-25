from flask import Flask, request, jsonify, Blueprint
from models import db, User, Movie
from flask_jwt_extended import jwt_required, get_jwt_identity


movie_bp = Blueprint("movie_bp", __name__)

# Helper to update average rating
def update_average_rating(movie):
    ratings = [r.value for r in movie.ratings]
    movie.avg_rating = round(sum(ratings) / len(ratings), 2) if ratings else 0.0
    db.session.commit()

# Create a new movie
@movie_bp.route('/movies', methods=['POST'])
@jwt_required()
def create_movie():
    data = request.get_json()

    title = data.get('title')
    description = data.get('description')
    tags = data.get('tags')
    user_id = get_jwt_identity() 

    if not title or not description or not tags:
        return jsonify({"error": "Title, description, and tags are required"}), 400

    title_exists = Movie.query.filter_by(title=title).first()
    if title_exists:
        return jsonify({"error": "A movie with this title already exists"}), 400
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    new_movie = Movie(title=title, description=description, tags=tags, user_id=get_jwt_identity(), avg_rating=0.0)
    db.session.add(new_movie)
    db.session.commit()

    return jsonify({"success": "Movie created successfully"}), 201

# Fetch all movies
@movie_bp.route('/movies', methods=['GET'])
def get_movies():
    movies = Movie.query.all()
    if not movies:
        return jsonify({"error": "No movies found"}), 404
    
    movies_list = []

    for movie in movies:
        ratings = [r.value for r in movie.ratings]
        avg_rating = round(sum(ratings) / len(ratings), 2) if ratings else None

        movie_data = {
            "id": movie.id,
            "title": movie.title,
            "description": movie.description,
            "average_rating": avg_rating,
            "tags": movie.tags,
            "created_at": movie.created_at,
            "user": {
                "id": movie.user.id,
                "username": movie.user.username,
                "email": movie.user.email
            },
             # fetch movie ratings
            "ratings": avg_rating
       
        }
        movies_list.append(movie_data)

    return jsonify(movies_list), 200

# Fetch a single movie by id
@movie_bp.route('/movies/<int:id>', methods=['GET'])
def get_movie(id):
    movie = Movie.query.get(id)
    if not movie:
        return jsonify({"error": "Movie not found"}), 404

    ratings = [r.value for r in movie.ratings]
    avg_rating = round(sum(ratings) / len(ratings), 2) if ratings else None

    return jsonify({
        "id": movie.id,
        "title": movie.title,
        "description": movie.description,
        "average_rating": avg_rating,
        "tags": movie.tags,
        "created_at": movie.created_at,
        "user": {
            "id": movie.user.id,
            "username": movie.user.username,
            "email": movie.user.email
        },
    
        "reviews": [
            {
                "id": review.id,
                "message": review.message,
                "created_at": review.created_at,
                "is_approved": review.is_approved,

                "user": {
                    "id": review.user.id,
                    "username": review.user.username
                }
            }
            for review in movie.reviews
        ]
    }), 200

# Update a movie
@movie_bp.route('/movies/<int:id>', methods=['PATCH'])
@jwt_required()
def update_movie(id):
    current_user_id = get_jwt_identity()
    movie = Movie.query.get(id)
    if not movie:
        return jsonify({"error": "Movie not found"}), 404
    if movie.user.id != current_user_id:
        return jsonify({"error": "You are not authorized to update this movie"}), 403
    
    data = request.get_json()
    title = data.get('title', movie.title)
    description = data.get('description', movie.description)
    tags = data.get('tags', movie.tags)

    movie.title = title
    movie.description = description
    movie.tags = tags

    db.session.commit()
    return jsonify({"success": "Movie updated successfully"}), 200

# Delete a movie
@movie_bp.route('/movies/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_movie(id):
    current_user_id =get_jwt_identity()
    movie = Movie.query.get(id)
    if not movie:
        return jsonify({"message": "Movie not found"}), 404
    if movie.user.id != current_user_id:
        return jsonify({"error": "You are not authorized to delete this movie"}), 403

    db.session.delete(movie)
    db.session.commit()
    return jsonify({"success": "Movie deleted successfully"}), 200
