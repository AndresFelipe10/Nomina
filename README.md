# 💼 Nómina · Colombia 2026

Liquidador de nómina colombiano para empleados con horario fijo y turnos rotativos.
Funciona 100% en el navegador — sin servidor, sin base de datos.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AndrésFelipe10/nomina)

## Funcionalidades

- **Liquidación mensual** — salario proporcional, recargos, deducciones y prestaciones sociales
- **Horario fijo** — define tu horario diario y días de descanso, el sistema calcula todo
- **Turnos rotativos** — registro por fecha/hora con detección automática de recargos nocturnos y dominicales
- **Jornada dinámica** — detecta automáticamente 44h o 42h según Ley 2101 de 2021
- **Exportación PDF** — desprendible de pago profesional
- **Exportación CSV** — compatible con Excel y Google Sheets
- **Persistencia local** — los turnos se guardan en el navegador (localStorage)

## Base legal

| Norma | Concepto |
|-------|---------|
| Decreto 2613/2025 | SMMLV 2026: $1.750.905 |
| Decreto 2614/2025 | Auxilio de transporte: $249.095 |
| Ley 2101 de 2021 | Reducción jornada: 44h → 42h (desde jul-2026) |
| Ley 2381 de 2024 | Reforma laboral — recargo dominical 100% |
| CST Arts. 127, 133, 168, 179 | Recargos y proporcionales |
| Ley 100 de 1993 | Salud 4%, Pensión 4% empleado |

## Uso local

No requiere instalación. Abre `index.html` directamente en el navegador:

```bash
# Opción 1 — doble click en index.html
# Opción 2 — con cualquier servidor local
npx serve .
# o
python3 -m http.server 3000
```

## Configuración

Edita `nominaConfig.js` para actualizar valores cuando cambie la ley:

```js
SMMLV: 1_750_905,          // ← cambia aquí cada año
AUXILIO_TRANSPORTE: 249_095,
```