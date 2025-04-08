from flask import Flask, render_template, request, jsonify
from datetime import datetime
from models.activity import Activity
from utils.date_utils import format_date, get_current_date

app = Flask(__name__)

# In-memory storage (replace with a database in production)
activities = []

DAILY_GOALS = {
    "steps": 10000,
    "calories": 2500
}

@app.route('/')
def index():
    return render_template('index.html', goals=DAILY_GOALS)

@app.route('/api/activities', methods=['GET'])
def get_activities():
    return jsonify(activities)

@app.route('/api/activities', methods=['POST'])
def add_activity():
    data = request.json
    activity = Activity(
        steps=data['steps'],
        calories=data['calories'],
        notes=data.get('notes', ''),
        date=get_current_date()
    )
    activities.insert(0, activity.to_dict())
    return jsonify(activity.to_dict())

@app.route('/api/activities/<activity_id>', methods=['DELETE'])
def delete_activity(activity_id):
    global activities
    activities = [a for a in activities if a['id'] != activity_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)