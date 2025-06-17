from models import db, User, Review,Movie
from flask import Blueprint, request, jsonify

review_bp = Blueprint("review_bp", __name__)

# Create a new review
@review_bp.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()

    user_id = data.get('user_id')
    movie_id = data.get('movie_id')
    message = data.get('message') 

    if not user_id or not movie_id:
        return jsonify({"error": "user_id, and movie_id are required"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    movie = Movie.query.get(movie_id)
    if not movie:
        return jsonify({"error": "Movie not found"}), 404
    
    new_review = Review(user_id=user_id, movie_id=movie_id, message=message)  # Include message
    db.session.add(new_review)
    db.session.commit()
    
    return jsonify({"success": "Review created successfully"}), 201


# Fetch all reviews for a movie
@review_bp.route('/movie/<int:movie_id>/reviews', methods=['GET'])
def get_reviews_for_movie(movie_id):
    reviews = Review.query.filter_by(movie_id=movie_id).all()
    
    if not reviews:
        return jsonify({"message": "No reviews found for this movie"}), 404

    return jsonify([{
        "id": review.id,
        "message": review.message,
        "created_at": review.created_at,
        "is_hidden": review.is_hidden,
        "movie_id": review.movie_id,
        "user": {
            "id": review.user.id,
            "username": review.user.username,
            "email": review.user.email
        },
    } for review in reviews]), 200


# update a review
@review_bp.route('/reviews/<int:id>', methods=['PATCH'])
def update_review(id):
    review = Review.query.get(id)
    
    if not review:
        return jsonify({"message": "Review not found"}), 404

    data = request.get_json()
    message = data.get('message', review.message)

    review.message = message
    db.session.commit()

    return jsonify({"success": "Review updated successfully"}), 200


# Delete an review
@review_bp.route('/reviews/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get(id)
    
    if not review:
        return jsonify({"message": "Review not found"}), 404

    db.session.delete(review)
    db.session.commit()

    return jsonify({"success": "Review deleted successfully"}), 200



