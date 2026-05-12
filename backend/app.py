from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json
# Importing the correct streaming function name
from api.gemini_service import generate_optimized_resume_stream, generate_interview_qa, edit_resume_with_ai

app = Flask(__name__)
CORS(app)

@app.route('/api/optimize', methods=['POST'])
def optimize_resume():
    data = request.json
    api_key = data.get('apiKey')
    base_resume = data.get('baseResume')
    job_description = data.get('jobDescription')

    if not api_key or not base_resume or not job_description:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        def generate():
            response = generate_optimized_resume_stream(api_key, base_resume, job_description)
            for chunk in response:
                if chunk.text:
                    yield chunk.text
        
        return Response(generate(), mimetype='text/plain')
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/generate-interview', methods=['POST'])
def generate_interview():
    data = request.json
    api_key = data.get('apiKey')
    resume_data = data.get('resumeData')
    job_description = data.get('jobDescription')

    if not api_key or not resume_data or not job_description:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        qa_json_string = generate_interview_qa(api_key, resume_data, job_description)
        qa_data = json.loads(qa_json_string)
        return jsonify(qa_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/chat-edit', methods=['POST'])
def chat_edit():
    data = request.json
    api_key = data.get('apiKey')
    resume_data = data.get('resumeData')
    user_prompt = data.get('prompt')

    if not api_key or not resume_data or not user_prompt:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        updated_json_string = edit_resume_with_ai(api_key, resume_data, user_prompt)
        updated_data = json.loads(updated_json_string)
        return jsonify(updated_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)