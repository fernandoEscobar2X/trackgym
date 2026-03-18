'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { DayInfo, TimeRemaining } from '../../types';
import { PLAN_END } from '../../lib/cycle';
import { ROUTINES } from '../../lib/data';

interface TodayCardProps {
  dayInfo: DayInfo;
  daysUntilGoal: number;
  progress: number;
  nextWorkout: { date: Date; name: string } | null;
}

function useCountdown(target: Date): TimeRemaining {
  const calcRemaining = (): TimeRemaining => {
    const distance = target.getTime() - Date.now();
    if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  const [remaining, setRemaining] = useState<TimeRemaining>(calcRemaining);

  useEffect(() => {
    const id = setInterval(() => setRemaining(calcRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return remaining;
}

export function TodayCard({ dayInfo, daysUntilGoal, progress, nextWorkout }: TodayCardProps) {
  const isRest = dayInfo.type === 'rest';
  const countdown = useCountdown(PLAN_END);
  const routineMeta = ROUTINES[dayInfo.type];

  const pad = (n: number) => String(n).padStart(2, '0');

  const today = new Date();
  const dateLabel = today
    .toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl p-8 sm:p-12 space-y-8"
      style={{
        backgroundColor: dayInfo.bgColor,
        border: `1px solid ${dayInfo.borderColor}`,
      }}
    >
      {/* Date label */}
      <p className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
        {dateLabel}
      </p>

      {/* Hero title */}
      <div className="space-y-3">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold leading-[0.9] tracking-tighter"
          style={{
            fontSize: 'clamp(3rem, 12vw, 8rem)',
            color: dayInfo.color,
          }}
        >
          {dayInfo.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg text-neutral-400"
        >
          {dayInfo.description}
        </motion.p>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex items-center gap-6 text-sm text-neutral-500"
      >
        <span className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: dayInfo.color }}
          />
          Día {dayInfo.cycleDay + 1}/8
        </span>
        <span>{daysUntilGoal} días restantes</span>
        {!isRest && routineMeta && (
          <>
            <span>{routineMeta.duration}</span>
            <span>{routineMeta.totalSets} sets</span>
          </>
        )}
      </motion.div>

      {/* Separator */}
      <div className="border-t border-neutral-800" />

      {/* Rest day content */}
      {isRest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-4"
        >
          <p className="text-neutral-400">
            Recuperación activa — come bien, duerme bien
          </p>
          {nextWorkout && (
            <p className="text-sm text-neutral-500">
              Próximo:{' '}
              <span className="text-white font-medium">{nextWorkout.name}</span>
              {' — '}
              {nextWorkout.date.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
              })}
            </p>
          )}
        </motion.div>
      )}

      {/* Workout exercise list */}
      {!isRest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6"
        >
          {dayInfo.exercises.map((exercise, i) => (
            <motion.div
              key={exercise.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
              className="space-y-1"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-white font-medium">{exercise.name}</span>
                <span
                  className="text-sm font-bold tabular-nums whitespace-nowrap"
                  style={{ color: dayInfo.color }}
                >
                  {exercise.sets}
                </span>
              </div>
              {exercise.current && (
                <p className="text-sm text-neutral-500">{exercise.current}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="pt-4 space-y-6"
      >
        <p className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
          Countdown — 25 junio
        </p>
        <div className="grid grid-cols-4 gap-4">
          {[
            { value: countdown.days,            label: 'Días' },
            { value: countdown.hours,           label: 'Hrs' },
            { value: countdown.minutes,         label: 'Min' },
            { value: countdown.seconds,         label: 'Seg' },
          ].map(({ value, label }) => (
            <div key={label} className="space-y-2">
              <p className="text-5xl font-bold tabular-nums text-white">
                {label === 'Días' ? value : pad(value)}
              </p>
              <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">Progreso del plan</span>
          <span className="font-bold tabular-nums text-white">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-px bg-neutral-900 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="h-full rounded-full"
            style={{ backgroundColor: dayInfo.color }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
