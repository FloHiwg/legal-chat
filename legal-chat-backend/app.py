from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Store chat history in memory (replace with database in production)
chat_history = []

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400

        # Store the user message
        chat_history.append({
            'role': 'user',
            'content': user_message
        })

        # Here you would typically call your AI model
        # For now, we'll just echo the message
        ai_response = f"Echo: {user_message}"

        # Store the AI response
        chat_history.append({
            'role': 'assistant',
            'content': ai_response
        })

        return jsonify({
            'response': ai_response,
            'history': chat_history
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    return jsonify({'history': chat_history})

@app.route('/api/clear', methods=['POST'])
def clear_history():
    chat_history.clear()
    return jsonify({'message': 'Chat history cleared'})

if __name__ == '__main__':
    app.run(debug=True, port=5000) 