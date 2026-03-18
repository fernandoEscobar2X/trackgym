'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { ROUTINES } from '../../lib/data';

const ROUTINE_ORDER = ['amplitud', 'push', 'arms', 'chestback'] as const;

export function RoutineCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (key: string) =>
    setExpanded((prev) => (prev === key ? null : key));

  return (
    <section className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold tracking-tight text-white mb-2">
          Rutinas
        </h2>
        <p className="text-sm text-neutral-500">
          Las 4 rutinas del ciclo de 8 días
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {ROUTINE_ORDER.map((key, index) => {
          const routine    = ROUTINES[key];
          const isExpanded = expanded === key;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="border border-neutral-800 rounded-2xl overflow-hidden"
            >
              {/* Collapsed header — always visible */}
              <button
                onClick={() => toggle(key)}
                className="w-full p-6 flex items-center justify-between hover:bg-neutral-900/50 transition-colors duration-200"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-4 text-left">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: routine.color }}
                  />
                  <div>
                    <h3
                      className="text-2xl font-bold tracking-tight"
                      style={{ color: routine.color }}
                    >
                      {routine.name}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
                      {routine.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-neutral-600">
                      <span>{routine.duration}</span>
                      <span>·</span>
                      <span>{routine.totalSets} sets</span>
                    </div>
                  </div>
                </div>

                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown size={20} className="text-neutral-500" />
                </motion.span>
              </button>

              {/* Expanded content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-neutral-800 pt-6 space-y-5">
                      {/* Warning banner for chest/back */}
                      {routine.warning && (
                        <p className="text-sm text-yellow-500/80">
                          {routine.warning}
                        </p>
                      )}

                      {/* Exercise list */}
                      {routine.exercises.map((exercise, i) => (
                        <motion.div
                          key={exercise.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="space-y-1"
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="text-white font-medium">
                              {exercise.name}
                            </span>
                            <span className="text-sm font-bold text-neutral-400 tabular-nums whitespace-nowrap">
                              {exercise.sets}
                            </span>
                          </div>
                          {exercise.current && (
                            <p className="text-sm text-neutral-600">
                              {exercise.current}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
