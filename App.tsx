 import React, { useState } from 'react';
 import { Activity, DailyGoals } from './types/activity';
 import { getCurrentDate } from './utils/dateUtils';
 import ActivityForm from './components/ActivityForm';
 import ActivityList from './components/ActivityList';
 import DailyProgress from './components/DailyProgress';
 import Background from './components/Background';
 import { Activity as ActivityIcon } from 'lucide-react';

 function App() {
   const [activities, setActivities] = useState<Activity[]>([]);
  
   const goals: DailyGoals = {
     steps: 10000,
     calories: 2500
   };

   const handleAddActivity = (newActivity: Omit<Activity, 'id' | 'date'>) => {
     const activity: Activity = {
       ...newActivity,
      id: crypto.randomUUID(),
       date: getCurrentDate()
    };
     setActivities([activity, ...activities]);
   };

   const handleDeleteActivity = (id: string) => {
     setActivities(activities.filter(activity => activity.id !== id));
   };

   const todayActivities = activities.filter(
     activity => activity.date === getCurrentDate()
   );

   return (
     <div className="min-h-screen">
       <Background />
       <div className="max-w-4xl mx-auto px-4 py-8">
         <header className="mb-8">
           <div className="flex items-center gap-3 mb-2">
             <ActivityIcon className="w-8 h-8 text-blue-600" />
             <h1 className="text-3xl font-bold text-white">Fitness Tracker</h1>
           </div>
           <p className="text-gray-200">Track your daily activities and reach your fitness goals</p>
         </header>

         <div className="grid gap-8 md:grid-cols-2">
           <div className="space-y-8">
             <DailyProgress
               todayActivities={todayActivities}
               goals={goals}
             />
             <ActivityForm onSubmit={handleAddActivity} />
           </div>

           <div className="space-y-4">
             <h2 className="text-xl font-semibold text-white">Activity History</h2>
             <ActivityList
               activities={activities}
               onDelete={handleDeleteActivity}
             />
           </div>
         </div>
       </div>
     </div>
   );
 }

 export default App;