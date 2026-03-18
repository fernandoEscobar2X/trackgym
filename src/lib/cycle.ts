import { DayInfo, SpecialEvent } from '../types';
import { ROUTINES, CYCLE_PATTERN } from './data';

// Fechas del plan — sin hora para evitar bugs de timezone
export const PLAN_START = new Date(2026, 2, 17); // 17 marzo 2026
export const PLAN_END   = new Date(2026, 5, 25); // 25 junio 2026

const SPECIAL_EVENTS: SpecialEvent[] = [
  {
    date: new Date(2026, 4, 12),
    badge: 'CARDIO INICIA',
    color: '#fbbf24',
    message:
      'Desde hoy: caminadora inclinación 15, velocidad 3–3.2 km/h, 35–40 min post-pesas, 3×/semana. Heart rate objetivo: 119–139 lpm.',
  },
  {
    date: new Date(2026, 4, 26),
    badge: 'CARDIO 4×',
    color: '#fb923c',
    message: 'Cardio sube a 4 sesiones por semana desde hoy.',
  },
  {
    date: PLAN_END,
    badge: 'META 🎯',
    color: '#f87171',
    message: 'Día de comparación de fotos y viaje. Meta: 89–92 kg, 16–19% grasa.',
  },
];

// Normaliza una fecha a medianoche local para comparaciones seguras
function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function diffInDays(a: Date, b: Date): number {
  const na = normalizeDate(a).getTime();
  const nb = normalizeDate(b).getTime();
  return Math.floor((na - nb) / (1000 * 60 * 60 * 24));
}

export function isBeforePlan(date: Date): boolean {
  return normalizeDate(date) < normalizeDate(PLAN_START);
}

export function isAfterPlan(date: Date): boolean {
  return normalizeDate(date) > normalizeDate(PLAN_END);
}

export function isInPlan(date: Date): boolean {
  return !isBeforePlan(date) && !isAfterPlan(date);
}

export function getDayInfo(date: Date): DayInfo {
  const diff = diffInDays(date, PLAN_START);
  // Módulo correcto para negativos
  const cyclePos = ((diff % 8) + 8) % 8;
  const routineKey = CYCLE_PATTERN[cyclePos];
  const routine = ROUTINES[routineKey];

  return {
    type:        routine.type,
    name:        routine.name,
    description: routine.description,
    color:       routine.color,
    bgColor:     routine.bgColor,
    borderColor: routine.borderColor,
    exercises:   routine.exercises,
    cycleDay:    cyclePos,
  };
}

export function getSpecialEvent(date: Date): SpecialEvent | null {
  const norm = normalizeDate(date);
  return (
    SPECIAL_EVENTS.find(
      (e) => normalizeDate(e.date).getTime() === norm.getTime()
    ) ?? null
  );
}

export function getDaysUntilGoal(): number {
  const diff = diffInDays(PLAN_END, new Date());
  return Math.max(0, diff);
}

export function getProgressPercentage(): number {
  const total   = diffInDays(PLAN_END, PLAN_START);
  const elapsed = diffInDays(new Date(), PLAN_START);
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export function getNextWorkout(): { date: Date; name: string } | null {
  const today = new Date();
  for (let i = 1; i <= 8; i++) {
    const candidate = new Date(today);
    candidate.setDate(today.getDate() + i);
    if (isAfterPlan(candidate)) return null;
    const info = getDayInfo(candidate);
    if (info.type !== 'rest') {
      return { date: candidate, name: info.name };
    }
  }
  return null;
}

export function getSessionCounts(): Record<string, number> {
  const counts: Record<string, number> = {
    amplitud: 0,
    push: 0,
    arms: 0,
    chestback: 0,
  };
  const today = normalizeDate(new Date());
  const start = normalizeDate(PLAN_START);
  const cursor = new Date(start);

  while (cursor <= today && cursor <= PLAN_END) {
    const info = getDayInfo(cursor);
    if (info.type !== 'rest') counts[info.type]++;
    cursor.setDate(cursor.getDate() + 1);
  }
  return counts;
}
