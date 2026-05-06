/**
 * nominaConfig.js — Configuración Normativa Laboral Colombia 2026
 * ================================================================
 * FUENTES LEGALES:
 *   • Decreto 2613 del 30-dic-2025  (SMMLV 2026)
 *   • Decreto 2614 del 30-dic-2025  (Auxilio de Transporte 2026)
 *   • Ley 2101 de 2021              (Reducción gradual jornada laboral)
 *   • Ley 2381 de 2024              (Reforma Laboral — recargos dominicales progresivos)
 *   • CST Arts. 127, 133, 161, 168, 179, 186, 249, 268, 306
 *   • Ley 100 de 1993               (Sistema de Seguridad Social)
 *   • Ministerio del Trabajo        (Tabla verificada hora ordinaria 2026)
 *
 * VERIFICACIÓN HORA ORDINARIA:
 *   44h/sem × 5 = 220h/mes  →  $1.750.905 / 220 = $7.959  ✓
 *   42h/sem × 5 = 210h/mes  →  $1.750.905 / 210 = $8.338  ✓ (desde 15-jul-2026)
 *
 * TABLA DE RECARGOS — Mayo 2026 (HO = $7.959):
 *   Hora Ordinaria              factor 1.00  →  $7.959
 *   Recargo Nocturno (+35%)     factor 1.35  → $10.744
 *   Hora Extra Diurna (+25%)    factor 1.25  →  $9.948
 *   Hora Extra Nocturna (+75%)  factor 1.75  → $13.928
 *   Dominical/Festivo (+80%)    factor 1.80  → $14.326
 *   HED Dominical (+105%)       factor 2.05  → $16.315
 *   HEN Dominical (+155%)       factor 2.55  → $20.295
 *
 * EJEMPLO TURNO CRUCE MEDIANOCHE (sáb→dom, Mayo 2026):
 *   Sáb 22:00 → Dom 06:00  (8 horas totales)
 *   - 2h sábado nocturno (22:00–00:00): HO × 1.35 = $10.744/h → $21.488
 *   - 6h domingo nocturno (00:00–06:00): HO × (1+0.80+0.35) = HO × 2.15 = $17.111/h → $102.666
 *   Total: $124.154 ✓
 */

const NOMINA_CONFIG = {

  // ─── VALORES MONETARIOS 2026 ──────────────────────────────────
  SMMLV: 1_750_905,                    // Decreto 2613/2025
  AUXILIO_TRANSPORTE: 249_095,         // Decreto 2614/2025
  UMBRAL_AUXILIO_SMMLV: 2,             // Aplica si salario <= 2 × SMMLV

  // ─── JORNADA LABORAL (Ley 2101 de 2021) ──────────────────────
  JORNADA: {
    HORAS_ANTES:    44,          // Vigente: 01-ene-2026 al 14-jul-2026
    HORAS_DESPUES:  42,          // Vigente: 15-jul-2026 en adelante
    FECHA_CAMBIO:   '2026-07-15',

    // Divisor hora ordinaria = horas_semanales × 5
    // Verificado contra tabla oficial Ministerio del Trabajo 2026
    HORAS_MES_44:   220,         // 44h × 5 = 220 h/mes  → HO = $7.959
    HORAS_MES_42:   210,         // 42h × 5 = 210 h/mes  → HO = $8.338
  },

  // ─── SEMANAS ESTÁNDAR POR MES (promedio contable) ─────────────
  SEMANAS_POR_MES: 4.333,              // Utilizado por módulo horario fijo

  // ─── FRANJA HORARIA (CST Art.160 — Ley 2381/2024) ────────────
  // Nocturno: 19:00 h (7 p.m.) a 06:00 h (6 a.m.)
  FRANJAS: {
    DIURNO_INICIO_H:   6,
    DIURNO_FIN_H:     19,
    NOCTURNO_INICIO_H:19,
    NOCTURNO_FIN_H:    6,
  },

  // ─── RECARGOS SALARIALES (CST Arts. 168 y 179) ───────────────
  RECARGOS: {
    EXTRA_DIURNO:     0.25,      // +25%  → HO × 1.25
    EXTRA_NOCTURNO:   0.75,      // +75%  → HO × 1.75
    NOCTURNO_ORD:     0.35,      // +35%  → HO × 1.35 (factor total)

    // Dominical progresivo — Ley 2381/2024
    DOMINICAL_BASE:   0.80,      // Recargo vigente (hasta 30-jun-2026)

    // Escala automática por fecha
    DOMINICAL_FECHAS: [
      { desde: '2024-04-01', hasta: '2026-06-30', recargo: 0.80 },
      { desde: '2026-07-01', hasta: '2027-06-30', recargo: 0.90 },
      { desde: '2027-07-01', hasta: null,          recargo: 1.00 },
    ],
  },

  // ─── SEGURIDAD SOCIAL ─────────────────────────────────────────
  APORTES_EMPLEADO: {
    SALUD:            0.04,      // 4%   — Ley 100/1993 Art.204
    PENSION:          0.04,      // 4%   — Ley 100/1993 Art.20
  },

  APORTES_EMPLEADOR: {
    SALUD:            0.085,     // 8.5%
    PENSION:          0.12,      // 12%
    ARL_CLASE_I:      0.00522,
    ARL_CLASE_II:     0.01044,
    ARL_CLASE_III:    0.02436,
    ARL_CLASE_IV:     0.04350,
    ARL_CLASE_V:      0.06960,
    SENA:             0.02,
    ICBF:             0.03,
    CAJA_COMPENSACION:0.04,
  },

  ARL_DEFAULT: 'ARL_CLASE_I',

  // ─── FONDO DE SOLIDARIDAD PENSIONAL (Ley 100 Art.27) ─────────
  SOLIDARIDAD: [
    { desde:  4, hasta: 16, tasa: 0.010 },
    { desde: 16, hasta: 17, tasa: 0.012 },
    { desde: 17, hasta: 18, tasa: 0.014 },
    { desde: 18, hasta: 19, tasa: 0.016 },
    { desde: 19, hasta: 20, tasa: 0.018 },
    { desde: 20, hasta: Infinity, tasa: 0.020 },
  ],

  // ─── PRESTACIONES SOCIALES ────────────────────────────────────
  PRESTACIONES: {
    PRIMA:            1/12,      // CST Art.306
    CESANTIAS:        1/12,      // CST Art.249
    INT_CESANTIAS:    0.12/12,   // CST Art.268 — 1%/mes sobre cesantías
    VACACIONES:       15/360,    // CST Art.186
  },

  // ─── FESTIVOS COLOMBIA 2026 (Ley 51/1983) ─────────────────────
  FESTIVOS_2026: new Set([
    '2026-01-01','2026-01-12','2026-03-23','2026-04-02','2026-04-03',
    '2026-05-01','2026-05-18','2026-06-08','2026-06-15','2026-06-29',
    '2026-07-20','2026-08-07','2026-08-17','2026-10-12','2026-11-02',
    '2026-11-16','2026-12-08','2026-12-25',
  ]),

  // ─── CICLOS DE PAGO ───────────────────────────────────────────
  CICLOS_PAGO: {
    QUINCENA_15_30: { corte1: 15, corte2: 30, label: 'Quincena 15 y 30' },
    QUINCENA_5_20:  { corte1:  5, corte2: 20, label: 'Quincena 5 y 20'  },
  },
};

// Exportación dual: ES Module y variable global (HTML standalone)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NOMINA_CONFIG;
} else {
  window.NOMINA_CONFIG = NOMINA_CONFIG;
}