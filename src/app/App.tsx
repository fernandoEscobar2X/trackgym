import { TodayCard } from './components/TodayCard';
import { Calendar } from './components/Calendar';
import { RoutineCards } from './components/RoutineCards';
import {
  getDayInfo,
  getDaysUntilGoal,
  getProgressPercentage,
  getNextWorkout,
} from '../lib/cycle';

export default function App() {
  const today        = new Date();
  const dayInfo      = getDayInfo(today);
  const daysUntilGoal = getDaysUntilGoal();
  const progress     = getProgressPercentage();
  const nextWorkout  = dayInfo.type === 'rest' ? getNextWorkout() : null;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
        <TodayCard
          dayInfo={dayInfo}
          daysUntilGoal={daysUntilGoal}
          progress={progress}
          nextWorkout={nextWorkout}
        />
      </div>

      {/* Calendar */}
      <div className="max-w-4xl mx-auto px-6 py-20 border-t border-neutral-900">
        <Calendar />
      </div>

      {/* Routines */}
      <div className="max-w-4xl mx-auto px-6 py-20 pb-32 border-t border-neutral-900">
        <RoutineCards />
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-neutral-600">
          <span>Split Tracker</span>
          <span>17 mar — 25 jun 2026</span>
        </div>
      </div>
    </div>
  );
}
