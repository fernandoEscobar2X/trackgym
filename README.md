# Split Tracker 2026

Plan de definición personal — 17 marzo al 25 junio 2026.

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS v4
- Motion (Framer Motion)
- Lucide React

## Desarrollo local

```bash
npm install
npm run dev
```

## Deploy a Vercel

1. Sube este proyecto a un repo en GitHub
2. Ve a [vercel.com](https://vercel.com) → New Project
3. Importa el repo
4. Vercel detecta Vite automáticamente — no necesitas configurar nada
5. Click en Deploy

El `vercel.json` ya incluye el rewrite para SPA routing.

## Estructura

```
src/
├── app/
│   ├── App.tsx              # Layout principal
│   ├── main.tsx             # Entry point
│   └── components/
│       ├── TodayCard.tsx    # Hero — qué toca hoy
│       ├── Calendar.tsx     # Calendario 4 meses
│       ├── DayDetail.tsx    # Modal al seleccionar día
│       └── RoutineCards.tsx # Rutinas expandibles
├── lib/
│   ├── cycle.ts             # Lógica del ciclo de 8 días
│   └── data.ts              # Dataset de rutinas y cargas
├── types/
│   └── index.ts             # TypeScript types
└── styles/
    └── index.css            # Global styles + Tailwind
```

## Cambios respecto al prototipo

- Calendario empieza en lunes (estándar ES/MX) — fix del bug de domingo
- `Reverse Curl Barra` agregado a rutina Arms
- `bgColor` y `borderColor` correctos por tipo de día (design system)
- `TodayCard` envuelto en card con fondo tintado del color del día
- Lógica de fechas con normalización correcta (evita bugs de timezone)
- `getSessionCounts` para contar sesiones completadas
- `noUnusedLocals` y `strict: true` en TypeScript
- PWA manifest incluido
- `vercel.json` para SPA routing

## Para actualizar cargas

Edita `src/lib/data.ts` — campo `current` de cada ejercicio.
