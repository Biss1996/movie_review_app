from models import db, User, TokenBlocklist, Review, Movie
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity


review_bp = Blueprint("review_bp", __name__)

# Create a new review
@review_bp.route('/reviews', methods=['POST'])
@jwt_required()
def create_review():
    data = request.get_json()

    user_id = get_jwt_identity()
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
    
    new_review = Review(user_id=get_jwt_identity(), movie_id=movie_id, message=message)  # Include message
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


# ROUTE FOR APPROVING A REVIEW BY ADMIN
@review_bp.route('/reviews/<int:id>/approve', methods=['PATCH'])
@jwt_required()
def approve_dissapprove_review(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if not current_user.is_admin:
        return jsonify({"error": "You are not authorized to approve/disapprove reviews"}), 403

    review = Review.query.get(id)
    if not review:
        return jsonify({"error": "Review not found"}), 404

    data = request.get_json()
    is_approved = data.get('is_approved', review.is_approved)

    if is_approved:
        review.is_approved = True
        db.session.commit()
        return jsonify({"success": "Review approved!"}), 200
    else:
        review.is_approved = False
        db.session.commit()
        return jsonify({"success": "Review dissapproved!"}), 200



# Delete a review
@review_bp.route('/reviews/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_review(id):
    current_user_id= get_jwt_identity()
    review = Review.query.get(id)
    
    if not review:
        return jsonify({"message": "Review not found"}), 404
    if review.user.id != current_user_id:
        return jsonify({"error": "Not authorized"}), 401
    
    db.session.delete(review)
    db.session.commit()

    return jsonify({"success": "Review deleted successfully"}), 200



