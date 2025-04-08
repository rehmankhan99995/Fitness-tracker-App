import React from 'react';
import { Activity, DailyGoals } from '../types/activity';
import { Footprints, Flame } from 'lucide-react';

interface DailyProgressProps {
  todayActivities: Activity[];
  goals: DailyGoals;
}

export default function DailyProgress({ todayActivities, goals }: DailyProgressProps) {
  const totalSteps = todayActivities.reduce((sum, activity) => sum + activity.steps, 0);
  const totalCalories = todayActivities.reduce((sum, activity) => sum + activity.calories, 0);

  const stepsProgress = Math.min((totalSteps / goals.steps) * 100, 100);
  const caloriesProgress = Math.min((totalCalories / goals.calories) * 100, 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Today's Progress</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Footprints className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Steps</span>
            </div>
            <span className="text-sm text-gray-600">
              {totalSteps.toLocaleString()} / {goals.steps.toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${stepsProgress}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-medium">Calories</span>
            </div>
            <span className="text-sm text-gray-600">
              {totalCalories.toLocaleString()} / {goals.calories.toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-500"
              style={{ width: `${caloriesProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}