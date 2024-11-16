from flask import Flask, request, jsonify, render_template
from models.chatbot import get_response  # Import chatbot logic

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')  # Main UI for chatbot

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    bot_response = get_response(user_message)
    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)
 