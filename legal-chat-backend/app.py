from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from app.routes.chat_routes import chat_bp

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes

    # Register blueprints
    app.register_blueprint(chat_bp, url_prefix='/api')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000) 