'use client';

import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { getDayInfo, getSpecialEvent } from '../../lib/cycle';

interface DayDetailProps {
  date: Date;
  onClose: () => void;
}

export function DayDetail({ date, onClose }: DayDetailProps) {
  const dayInfo = getDayInfo(date);
  const specialEvent = getSpecialEvent(date);
  const isRest = dayInfo.type === 'rest';

  const dateLabel = date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg mx-4 mb-4 sm:mb-0 bg-black border border-neutral-800 rounded-3xl overflow-hidden"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors"
        >
          <X size={18} className="text-white" />
        </button>

        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <p className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
              {dateLabel}
            </p>
            <h2
              className="text-6xl font-bold tracking-tighter"
              style={{ color: dayInfo.color }}
            >
              {dayInfo.name}
            </h2>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: dayInfo.color }}
              />
              <span className="text-sm text-neutral-500">
                Día {dayInfo.cycleDay + 1}/8
              </span>
            </div>
          </div>

          {/* Special event banner */}
          {specialEvent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl"
              style={{
                backgroundColor: specialEvent.color + '10',
                border: `1px solid ${specialEvent.color}40`,
              }}
            >
              <p
                className="text-xs font-bold tracking-widest uppercase mb-2"
                style={{ color: specialEvent.color }}
              >
                {specialEvent.badge}
              </p>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {specialEvent.message}
              </p>
            </motion.div>
          )}

          {/* Content */}
          <div className="border-t border-neutral-800 pt-6">
            {isRest ? (
              <p className="text-neutral-400">
                Recuperación activa — come bien, duerme bien
              </p>
            ) : (
              <div className="space-y-5">
                {dayInfo.exercises.map((exercise, i) => (
                  <motion.div
                    key={exercise.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="space-y-1"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-white font-medium">
                        {exercise.name}
                      </span>
                      <span
                        className="text-sm font-bold tabular-nums whitespace-nowrap text-neutral-400"
                      >
                        {exercise.sets}
                      </span>
                    </div>
                    {exercise.current && (
                      <p className="text-sm text-neutral-500">
                        {exercise.current}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
