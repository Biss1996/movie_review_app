from flask import request, jsonify, Blueprint
from models import db, User, Movie, Rating
from flask_jwt_extended import jwt_required, get_jwt_identity


rating_bp = Blueprint("rating_bp", __name__)

# Helper function to update average rating
def update_average_rating(movie):
    ratings = [r.value for r in movie.ratings]
    movie.avg_rating = round(sum(ratings) / len(ratings), 2) if ratings else 0.0

# POST - Create one-time rating
@rating_bp.route('/movie/rating', methods=['POST'])
@jwt_required()
def create_movie_rating():
    data = request.get_json()

    user_id = get_jwt_identity()
    movie_id = data.get('movie_id')
    value = data.get('value')

    if not user_id or not movie_id or value is None:
        return jsonify({"error": "User ID, movie ID, and value are required"}), 400

    if not (1 <= value <= 5):
        return jsonify({"error": "Rating must be between 1 and 5"}), 400

    user = User.query.get(user_id)
    movie = Movie.query.get(movie_id)

    if not user or not movie:
        return jsonify({"error": "User or Movie not found"}), 404

    existing = Rating.query.filter_by(user_id=get_jwt_identity(), movie_id=movie_id).first()
    if existing:
        return jsonify({"error": "You have already rated this movie"}), 400

    new_rating = Rating(user_id=get_jwt_identity(), movie_id=movie_id, value=value)
    db.session.add(new_rating)
    update_average_rating(movie)
    db.session.commit()

    

    return jsonify({"success": "Rating submitted"}), 201

# PATCH - Update existing rating
@rating_bp.route('/movie/rating', methods=['PATCH'])
@jwt_required()
def update_movie_rating():
    data = request.get_json()

    user_id = get_jwt_identity()
    movie_id = data.get('movie_id')
    value = data.get('value')

    if not user_id or not movie_id or value is None:
        return jsonify({"error": "User ID, movie ID, and value are required"}), 400

    if not (1 <= value <= 5):
        return jsonify({"error": "Rating must be between 1 and 5"}), 400

    rating = Rating.query.filter_by(user_id=get_jwt_identity(), movie_id=movie_id).first()
    if not rating:
        return jsonify({"error": "No rating found to update"}), 404

    rating.value = value
    update_average_rating(rating.movie)
    db.session.commit()

    

    return jsonify({"success": "Rating updated"}), 200

# GET - Fetch average rating
@rating_bp.route('/movie/<int:movie_id>/ratings', methods=['GET'])
def get_ratings_for_movie(movie_id):   
    ratings = Rating.query.filter_by(movie_id=movie_id).all()
    if not ratings:
        return jsonify({"average_rating": None, "count": 0}), 200

    values = [r.value for r in ratings]
    avg_rating = round(sum(values) / len(values), 2)
    
    return jsonify({"average_rating": avg_rating, "count": len(values)}), 200


