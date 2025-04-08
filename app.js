const goals = {
    steps: 10000,
    calories: 2500
};

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function updateDailyProgress(activities) {
    const today = new Date().toISOString().split('T')[0];
    const todayActivities = activities.filter(activity => activity.date === today);
    
    const totalSteps = todayActivities.reduce((sum, activity) => sum + activity.steps, 0);
    const totalCalories = todayActivities.reduce((sum, activity) => sum + activity.calories, 0);
    
    const stepsProgress = Math.min((totalSteps / goals.steps) * 100, 100);
    const caloriesProgress = Math.min((totalCalories / goals.calories) * 100, 100);

    document.getElementById('daily-progress').innerHTML = `
        <h2 class="text-xl font-semibold text-gray-800">Today's Progress</h2>
        <div class="space-y-4">
            <div>
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center gap-2">
                        <i data-lucide="footprints" class="w-5 h-5 text-blue-600"></i>
                        <span class="font-medium">Steps</span>
                    </div>
                    <span class="text-sm text-gray-600">
                        ${totalSteps.toLocaleString()} / ${goals.steps.toLocaleString()}
                    </span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-600 transition-all duration-500"
                         style="width: ${stepsProgress}%"></div>
                </div>
            </div>

            <div>
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center gap-2">
                        <i data-lucide="flame" class="w-5 h-5 text-orange-500"></i>
                        <span class="font-medium">Calories</span>
                    </div>
                    <span class="text-sm text-gray-600">
                        ${totalCalories.toLocaleString()} / ${goals.calories.toLocaleString()}
                    </span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-orange-500 transition-all duration-500"
                         style="width: ${caloriesProgress}%"></div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function updateActivityList(activities) {
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = activities.map(activity => `
        <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="flex justify-between items-start">
                <div class="space-y-2">
                    <p class="text-sm text-gray-600">${formatDate(activity.date)}</p>
                    
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <i data-lucide="footprints" class="w-5 h-5 text-blue-600"></i>
                            <span class="font-semibold">${activity.steps.toLocaleString()} steps</span>
                        </div>
                        
                        <div class="flex items-center gap-2">
                            <i data-lucide="flame" class="w-5 h-5 text-orange-500"></i>
                            <span class="font-semibold">${activity.calories.toLocaleString()} cal</span>
                        </div>
                    </div>

                    ${activity.notes ? `<p class="text-gray-600 text-sm">${activity.notes}</p>` : ''}
                </div>

                <button onclick="deleteActivity('${activity.id}')"
                        class="text-gray-400 hover:text-red-500 transition-colors">
                    <i data-lucide="trash-2" class="w-5 h-5"></i>
                </button>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

async function loadActivities() {
    const response = await fetch('/api/activities');
    const activities = await response.json();
    updateDailyProgress(activities);
    updateActivityList(activities);
}

async function deleteActivity(id) {
    await fetch(`/api/activities/${id}`, { method: 'DELETE' });
    loadActivities();
}

document.getElementById('activity-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const activity = {
        steps: parseInt(formData.get('steps')),
        calories: parseInt(formData.get('calories')),
        notes: formData.get('notes')
    };

    await fetch('/api/activities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(activity)
    });

    e.target.reset();
    loadActivities();
});

loadActivities();