 # Movie Review App
A full-stack web application for discovering movies, reading user reviews, and sharing your thoughts with others. Built with React, Flask, SQLite, and JWT-based Authentication.

## Features
 User registration and JWT authentication

 Browse a list of movies with posters, details, and average ratings

 Add, edit, or delete your own reviews

Admin panel to manage movies, users and reviews

## Tech Stack
### Frontend:

React + React Router

Context API for auth and state management

Tailwind CSS

Toastify & SweetAlert2

### Backend:

Flask (RESTful API)

SQLAlchemy (ORM)

Flask-JWT-Extended

Flask-Migrate & Alembic

Flask-Mail for password recovery

### Database:

SQLite (dev)

PostgreSQL (production-ready)

## Installation
1. Fork and Clone the repo

git clone https://github.com/Biss1996/movie_review_app.git

cd movie_review_app

2. Backend Setup

cd backend

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

flask db upgrade\
flask run

Make sure to set environment variables in a .env file (e.g., FLASK_APP, DATABASE_URL, SECRET_KEY, JWT_SECRET_KEY, etc.)

3. Frontend Setup

cd frontend

npm install

npm run dev


FLASK_APP=app

FLASK_ENV=development


JWT_SECRET_KEY=your_secret_key

MAIL_SERVER=smtp.example.com

MAIL_PORT=587

MAIL_USERNAME=you@example.com

MAIL_PASSWORD=your_password

## Deployment
frontend: https://moviereview-taupe.vercel.app/

backend: https://movie-review-backend-5rdl.onrender.com

Database: PostgreSQL on Render 


# Licence
Copyright 2025 Bismark Bett

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


Author
Bismark Bett 

GitHub: @Biss1996
