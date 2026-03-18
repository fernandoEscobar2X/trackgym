import { Routine } from '../types';

export const ROUTINES: Record<string, Routine> = {
  amplitud: {
    type: 'amplitud',
    name: 'AMPLITUD',
    description: 'Pull — Espalda + Hombros',
    color: '#4db8ff',
    bgColor: '#4db8ff08',
    borderColor: '#4db8ff20',
    duration: '~55 min',
    totalSets: 14,
    exercises: [
      {
        name: 'Lat Pulldown Cable',
        sets: '2 sets',
        current: 'Top: 200lb ×7 / Back-off: 180lb ×9',
        group: 'Back',
        note: 'Retracción escapular, estiramiento máximo arriba',
      },
      {
        name: 'T-Bar Row',
        sets: '2 sets',
        current: 'Top: 55kg ×6 / Back-off: 45kg ×6',
        group: 'Back',
        note: 'Codo cerca del cuerpo para enfatizar dorsal',
      },
      {
        name: 'Lat Pulldown Single Arm',
        sets: '2 sets',
        current: 'Top: 190lb ×6 / Back-off: 175lb ×7',
        group: 'Back',
        note: 'Rango completo, corrige desequilibrios',
      },
      {
        name: 'Reverse Fly Máquina',
        sets: '3 sets',
        current: 'Top: 130lb ×13 / Back-off: 115lb ×10, ×7',
        group: 'Shoulders',
        note: 'Deltoides posterior — espesor de hombro de perfil',
      },
      {
        name: 'Lateral Raise Cable',
        sets: '3 sets',
        current: 'Top: 40lb ×6 / Back-off: 25lb ×13, ×11',
        group: 'Shoulders',
        note: 'Top Set en 40lb — 45lb fue demasiado agresivo',
      },
      {
        name: 'Bicep Curl Cable',
        sets: '2 sets',
        current: 'Top: 62kg ×4 / Back-off: 52kg ×6',
        group: 'Arms',
        note: 'Estímulo extra al final, trabajo principal de bíceps es en Arms',
      },
    ],
  },

  push: {
    type: 'push',
    name: 'PUSH',
    description: 'Pecho + Hombros + Tríceps',
    color: '#c084fc',
    bgColor: '#c084fc08',
    borderColor: '#c084fc20',
    duration: '~50 min',
    totalSets: 11,
    exercises: [
      {
        name: 'Chest Press Máquina',
        sets: '2 sets',
        current: 'Top: 190lb ×4 / Back-off: 161lb ×6',
        group: 'Chest',
        note: 'Agarre neutro, asiento bajo para haz clavicular',
      },
      {
        name: 'Pec Deck Máquina',
        sets: '3 sets',
        current: 'Top: 250lb ×4 / Back-off: 220lb ×5, 205lb ×4',
        group: 'Chest',
        note: 'Codos flexionados, énfasis en aducción — ejercicio principal de pecho',
      },
      {
        name: 'Shoulder Press Máquina',
        sets: '2 sets',
        current: 'Top: 80kg ×4 / Back-off: 66kg ×6',
        group: 'Shoulders',
        note: 'Mayor carga absoluta para hombros del split',
      },
      {
        name: 'Lateral Raise Máquina',
        sets: '3 sets',
        current: 'Top: 40kg ×6 / Back-off: 30kg ×9, 20kg ×11',
        group: 'Shoulders',
        note: 'Mayor resistencia en contracción máxima vs cable',
      },
      {
        name: 'Triceps Extension Cable',
        sets: '1 set',
        current: '65kg ×9',
        group: 'Arms',
        note: 'Finisher — tríceps ya trabajó secundariamente en press',
      },
    ],
  },

  arms: {
    type: 'arms',
    name: 'ARMS',
    description: 'Looksmaxing Day — Brazos + Hombros',
    color: '#f87171',
    bgColor: '#f8717108',
    borderColor: '#f8717120',
    duration: '~66 min',
    totalSets: 18,
    exercises: [
      // TRÍCEPS — primero, frescos
      {
        name: 'Triceps Extension Cable Overhead',
        sets: '2 sets',
        current: 'Top: 65kg ×10 / Back-off: 65kg ×8',
        group: 'Tríceps',
        note: 'PRIORIDAD — cabeza larga, único ejercicio que la estira completamente',
      },
      {
        name: 'Triceps Extension Barra V/W',
        sets: '2 sets',
        current: 'Top: 87kg ×4 / Back-off: 77kg ×6',
        group: 'Tríceps',
        note: 'Mayor carga absoluta de tríceps del split',
      },
      {
        name: 'Triceps Pushdown Cuffed Unilateral',
        sets: '1 set',
        current: '55kg ×10',
        group: 'Tríceps',
        note: 'Finisher unilateral — corrige compensaciones bilaterales',
      },
      // BÍCEPS
      {
        name: 'Incline Curl DB',
        sets: '1 set',
        current: '30-35lb ×6',
        group: 'Bíceps',
        note: 'Primero — estiramiento máximo en posición elongada',
      },
      {
        name: 'Preacher Curl Máquina',
        sets: '2 sets',
        current: 'Top: 101lb ×7 / Back-off: 90lb ×7',
        group: 'Bíceps',
        note: 'Ejercicio principal de bíceps — elimina impulso del hombro',
      },
      {
        name: 'Hammer Curl Cable',
        sets: '2 sets',
        current: 'Top: 65kg ×7 / Back-off: 65kg ×6',
        group: 'Bíceps',
        note: 'Ataca braquial — empuja el bíceps hacia arriba visualmente',
      },
      // HOMBROS + FINALES
      {
        name: 'Lateral Raise Cable Cuffed',
        sets: '2 sets',
        current: 'Top: 35lb ×7 / Drop: 25lb ×13',
        group: 'Shoulders',
        note: 'Tensión máxima en estiramiento — complementa variantes anteriores',
      },
      {
        name: 'Reverse Fly Máquina',
        sets: '2 sets',
        current: 'Top: 130lb ×12 / Back-off: 115lb ×9',
        group: 'Shoulders',
        note: 'Segunda sesión de deltoides posterior del ciclo',
      },
      {
        name: 'Reverse Curl Barra',
        sets: '2 sets',
        current: '60lb ×6 / 60lb ×6',
        group: 'Antebrazos',
        note: 'Braquiorradial — antebrazos desarrollados complementan el bíceps',
      },
    ],
  },

  chestback: {
    type: 'chestback',
    name: 'CHEST/BACK',
    description: 'Complemento — Volumen Extra',
    color: '#4ade80',
    bgColor: '#4ade8008',
    borderColor: '#4ade8020',
    duration: '~30 min',
    totalSets: 6,
    warning: 'Carga moderada. Sin fallo absoluto. Salir fresco.',
    exercises: [
      {
        name: 'Lat Pulldown Máquina',
        sets: '1 set',
        current: '~70% del Top Set de Amplitud',
        group: 'Back',
        note: 'Estímulo extra de frecuencia, no volumen principal',
      },
      {
        name: 'Seated Row Máquina',
        sets: '2 sets',
        current: 'Carga moderada',
        group: 'Back',
        note: 'Eje horizontal — complementa el jalón vertical de Amplitud',
      },
      {
        name: 'Pec Deck Máquina',
        sets: '2 sets',
        current: 'Carga ligera-moderada',
        group: 'Chest',
        note: 'Énfasis en estiramiento máximo — no al fallo absoluto',
      },
      {
        name: 'Chest Press Máquina',
        sets: '1 set',
        current: 'Carga moderada',
        group: 'Chest',
        note: 'Finisher — detener con 1-2 reps en reserva',
      },
    ],
  },

  rest: {
    type: 'rest',
    name: 'DESCANSO',
    description: 'Recuperación activa',
    color: '#888888',
    bgColor: '#88888808',
    borderColor: '#88888820',
    duration: '',
    totalSets: 0,
    exercises: [],
  },
};

// Ciclo de 8 días: índice 0-7
export const CYCLE_PATTERN: Array<keyof typeof ROUTINES> = [
  'amplitud',   // Día 0 — 17 marzo
  'rest',       // Día 1
  'push',       // Día 2
  'rest',       // Día 3
  'arms',       // Día 4
  'rest',       // Día 5
  'chestback',  // Día 6
  'rest',       // Día 7
];
