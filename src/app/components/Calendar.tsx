'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getDayInfo,
  getSpecialEvent,
  isBeforePlan,
  isAfterPlan,
  PLAN_START,
  PLAN_END,
} from '../../lib/cycle';
import { DayDetail } from './DayDetail';

// Semana empieza en lunes (estándar ES/MX)
const WEEKDAY_HEADERS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const MONTHS = [
  new Date(2026, 2, 1), // Marzo
  new Date(2026, 3, 1), // Abril
  new Date(2026, 4, 1), // Mayo
  new Date(2026, 5, 1), // Junio
];

function getMonthDays(monthDate: Date): (Date | null)[] {
  const year  = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const first = new Date(year, month, 1);
  const last  = new Date(year, month + 1, 0);

  // getDay(): 0=Dom, 1=Lun... — convertir a lunes=0
  const startOffset = (first.getDay() + 6) % 7;

  const days: (Date | null)[] = Array(startOffset).fill(null);
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const today = new Date();

  const handleDayClick = (date: Date) => {
    if (!isBeforePlan(date) && !isAfterPlan(date)) {
      setSelectedDate(date);
    }
  };

  return (
    <section className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold tracking-tight text-white mb-2">
          Calendario
        </h2>
        <p className="text-sm text-neutral-500">17 marzo — 25 junio 2026</p>
      </div>

      {/* Months */}
      <div className="space-y-16">
        {MONTHS.map((monthDate, monthIndex) => {
          const days = getMonthDays(monthDate);
          const monthName = monthDate.toLocaleDateString('es-ES', { month: 'long' });

          return (
            <motion.div
              key={monthDate.toISOString()}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: monthIndex * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Month name */}
              <h3 className="text-2xl font-bold text-white capitalize mb-6">
                {monthName}
              </h3>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-2 mb-3">
                {WEEKDAY_HEADERS.map((d) => (
                  <p
                    key={d}
                    className="text-center text-xs font-bold text-neutral-600 uppercase tracking-wide"
                  >
                    {d}
                  </p>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((date, i) => {
                  if (!date) {
                    return <div key={`empty-${i}`} />;
                  }

                  const outOfRange = isBeforePlan(date) || isAfterPlan(date);
                  const dayInfo     = getDayInfo(date);
                  const isToday     = isSameDay(date, today);
                  const isGoal      = isSameDay(date, PLAN_END);
                  const specialEvt  = getSpecialEvent(date);
                  const isWorkout   = dayInfo.type !== 'rest';

                  let bgColor = '#141414'; // descanso
                  if (outOfRange)  bgColor = '#0a0a0a';
                  else if (isWorkout) bgColor = dayInfo.color + '20';

                  return (
                    <motion.button
                      key={date.toISOString()}
                      onClick={() => handleDayClick(date)}
                      disabled={outOfRange}
                      whileTap={!outOfRange ? { scale: 0.9 } : undefined}
                      whileHover={!outOfRange ? { scale: 1.05 } : undefined}
                      transition={{ duration: 0.15 }}
                      aria-label={
                        outOfRange
                          ? undefined
                          : `${date.toLocaleDateString('es-ES')} — ${dayInfo.name}`
                      }
                      className="relative aspect-square rounded-lg flex items-center justify-center transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                      style={{
                        backgroundColor: bgColor,
                        opacity: outOfRange ? 0.2 : 1,
                        cursor: outOfRange ? 'not-allowed' : 'pointer',
                        outline: isToday
                          ? '2px solid #ffffff'
                          : isGoal
                          ? '2px solid #f87171'
                          : 'none',
                      }}
                    >
                      <span
                        className="text-sm font-bold"
                        style={{
                          color: outOfRange
                            ? '#262626'
                            : isToday || isGoal
                            ? '#ffffff'
                            : '#a3a3a3',
                        }}
                      >
                        {date.getDate()}
                      </span>

                      {/* Special event dot */}
                      {specialEvt && !outOfRange && (
                        <span
                          className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: specialEvt.color }}
                        />
                      )}

                      {/* Today dot */}
                      {isToday && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                      )}

                      {/* Goal dot */}
                      {isGoal && !isToday && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
        {[
          { color: '#4db8ff', label: 'Amplitud' },
          { color: '#c084fc', label: 'Push' },
          { color: '#f87171', label: 'Arms' },
          { color: '#4ade80', label: 'Chest/Back' },
          { color: '#888888', label: 'Descanso' },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-sm"
              style={{ backgroundColor: color + '40', outline: `1px solid ${color}40` }}
            />
            {label}
          </span>
        ))}
      </div>

      {/* Day detail modal */}
      <AnimatePresence>
        {selectedDate && (
          <DayDetail
            date={selectedDate}
            onClose={() => setSelectedDate(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
