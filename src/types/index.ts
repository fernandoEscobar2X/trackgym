export type DayType = 'amplitud' | 'push' | 'arms' | 'chestback' | 'rest';

export interface Exercise {
  name: string;
  sets: string;
  current?: string;
  note?: string;
  group?: string;
}

export interface Routine {
  type: DayType;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  duration: string;
  totalSets: number;
  exercises: Exercise[];
  warning?: string;
}

export interface DayInfo {
  type: DayType;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  exercises: Exercise[];
  cycleDay: number; // 0-7
}

export interface SpecialEvent {
  date: Date;
  badge: string;
  color: string;
  message: string;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
