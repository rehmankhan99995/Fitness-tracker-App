import React, { useState } from 'react';
import { Activity } from '../types/activity';
import { Footprints, Flame } from 'lucide-react';

interface ActivityFormProps {
  onSubmit: (activity: Omit<Activity, 'id' | 'date'>) => void;
}

export default function ActivityForm({ onSubmit }: ActivityFormProps) {
  const [steps, setSteps] = useState('');
  const [calories, setCalories] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      steps: Number(steps),
      calories: Number(calories),
      notes
    });
    setSteps('');
    setCalories('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <div className="flex items-center gap-2">
            <Footprints className="w-5 h-5" />
            <span>Steps</span>
          </div>
        </label>
        <input
          type="number"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          min="0"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5" />
            <span>Calories</span>
          </div>
        </label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Activity
      </button>
    </form>
  );
}