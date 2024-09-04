from flask import Flask, request, render_template, jsonify
import joblib

app = Flask(__name__)

# Load the model
model = joblib.load('phishing_email_classifier.joblib')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    email_text = request.form['email_text']
    prediction = model.predict([email_text])[0]
    result = "Phishing" if prediction == "Phishing Email" else "Safe"
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)