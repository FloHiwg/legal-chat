from flask import Blueprint, request, jsonify
from app.services.chat_service import ChatService

chat_bp = Blueprint('chat', __name__)
chat_service = ChatService()

@chat_bp.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400

        result = chat_service.process_message(user_message)
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/history', methods=['GET'])
def get_history():
    return jsonify(chat_service.get_history())

@chat_bp.route('/clear', methods=['POST'])
def clear_history():
    return jsonify(chat_service.clear_history()) 