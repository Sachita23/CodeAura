from flask import Flask, jsonify, request
import os
from groq import Groq

app = Flask(__name__)

# Initialize Groq client
groq_client = Groq(api_key=os.getenv("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"))

@app.route("/chat", methods=["POST"])
def chat():
    prompt = request.json.get("prompt")
    response = groq_client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "You are a coding assistant that provides hints, not direct answers."},
            {"role": "user", "content": prompt}
        ]
    )
    return jsonify({"response": response.choices[0].message.content})

if __name__ == "__main__":
    app.run(debug=True)
