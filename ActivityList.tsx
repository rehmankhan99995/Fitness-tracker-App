import React from 'react';
import { Activity } from '../types/activity';
import { formatDate } from '../utils/dateUtils';
import { Footprints, Flame, Trash2 } from 'lucide-react';

interface ActivityListProps {
  activities: Activity[];
  onDelete: (id: string) => void;
}

export default function ActivityList({ activities, onDelete }: ActivityListProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{formatDate(new Date(activity.date))}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Footprints className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">{activity.steps.toLocaleString()} steps</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold">{activity.calories.toLocaleString()} cal</span>
                </div>
              </div>

              {activity.notes && (
                <p className="text-gray-600 text-sm">{activity.notes}</p>
              )}
            </div>

            <button
              onClick={() => onDelete(activity.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}