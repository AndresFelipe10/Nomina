/**
 * nominaConfig.js — Configuración Normativa Laboral Colombia 2026
 * ================================================================
 * FUENTES LEGALES:
 *   • Decreto 2613 del 30-dic-2025 (SMMLV 2026)
 *   • Decreto 2614 del 30-dic-2025 (Auxilio de Transporte 2026)
 *   • Ley 2101 de 2021 (Reducción gradual jornada laboral)
 *   • Código Sustantivo del Trabajo — CST
 *   • Ley 100 de 1993 (Sistema de Seguridad Social)
 *   • Ley 2381 de 2024 (Reforma Laboral — recargos dominicales)
 *
 * NOTA: Edita este archivo cuando la ley cambie. El motor de
 *       cálculo leerá estos valores de forma dinámica.
 */

const NOMINA_CONFIG = {

  // ─── VALORES MONETARIOS 2026 ──────────────────────────────────
  SMMLV: 1_750_905,                    // Decreto 2613/2025
  AUXILIO_TRANSPORTE: 249_095,         // Decreto 2614/2025
  UMBRAL_AUXILIO_SMMLV: 2,             // Aplica si salario <= 2×SMMLV

  // ─── JORNADA LABORAL (Ley 2101 de 2021) ──────────────────────
  // Reducción gradual aprobada — calendario de vigencias:
  //   2023: 47h → 46h, 2024: 46h → 44h, 2026-1: 44h, 2026-2: 42h
  JORNADA: {
    HORAS_ANTES:  44,                  // Vigente: 01-ene-2026 al 14-jul-2026
    HORAS_DESPUES: 42,                 // Vigente: 15-jul-2026 en adelante
    FECHA_CAMBIO: '2026-07-15',        // ISO — incluido en nueva jornada
  },

  // Factor de semanas promedio por mes (estándar contable colombiano)
  SEMANAS_POR_MES: 4.333,

  // ─── FRANJA HORARIA (CST Art.160 — modificado Ley 2381/2024) ─
  // Recargo nocturno inicia a las 19:00h (7:00 PM) y termina 06:00h
  FRANJAS: {
    DIURNO_INICIO_H:   6,              // 06:00 AM — hora del día
    DIURNO_FIN_H:     19,              // 07:00 PM — inicia nocturno
    NOCTURNO_INICIO_H:19,              // 07:00 PM
    NOCTURNO_FIN_H:    6,              // 06:00 AM
  },

  // ─── RECARGOS SALARIALES ──────────────────────────────────────
  // Base de cálculo: valor de la hora ordinaria
  RECARGOS: {
    // CST Art.168 — sobre la hora ordinaria
    EXTRA_DIURNO:     0.25,            // +25% → factor total: 1.25×HO
    EXTRA_NOCTURNO:   0.75,            // +75% → factor total: 1.75×HO
    NOCTURNO_ORD:     0.35,            // +35% → solo el recargo (no se paga la ordinaria aparte)

    // Ley 2381 de 2024 (Reforma Laboral) — recargo dominical/festivo
    // IMPORTANTE: Reforma 2026 ajusta a 100% el recargo base (antes 75%)
    DOMINICAL_BASE:   1.00,            // +100% → factor total: 2.00×HO
    // Si además es hora extra dominical:
    EXTRA_DOMINICAL:  1.25,            // +125% sobre HO (dominical + extra diurno)
  },

  // ─── COTIZACIONES SEGURIDAD SOCIAL ───────────────────────────
  APORTES_EMPLEADO: {
    SALUD:            0.04,            // Ley 100/1993 Art.204
    PENSION:          0.04,            // Ley 100/1993 Art.20
  },

  APORTES_EMPLEADOR: {
    SALUD:            0.085,           // 8.5% — Ley 100/1993
    PENSION:          0.12,            // 12%  — Ley 100/1993
    ARL_CLASE_I:      0.00522,         // Riesgo mínimo — Decreto 1607/2002
    ARL_CLASE_II:     0.01044,         // Riesgo bajo
    ARL_CLASE_III:    0.02436,         // Riesgo medio
    ARL_CLASE_IV:     0.04350,         // Riesgo alto
    ARL_CLASE_V:      0.06960,         // Riesgo máximo
    SENA:             0.02,            // 2% — Ley 119/1994
    ICBF:             0.03,            // 3% — Decreto 341/1995
    CAJA_COMPENSACION:0.04,            // 4% — Ley 21/1982
  },

  // ARL por defecto para el calculador
  ARL_DEFAULT: 'ARL_CLASE_I',

  // ─── FONDO DE SOLIDARIDAD PENSIONAL ──────────────────────────
  // Ley 100 Art.27 — escala progresiva sobre SMMLV
  SOLIDARIDAD: [
    { desde: 4,  hasta: 16, tasa: 0.01 },   // 1% cuando salario entre 4 y 16 SMMLV
    { desde: 16, hasta: 17, tasa: 0.012 },
    { desde: 17, hasta: 18, tasa: 0.014 },
    { desde: 18, hasta: 19, tasa: 0.016 },
    { desde: 19, hasta: 20, tasa: 0.018 },
    { desde: 20, hasta: Infinity, tasa: 0.02 }, // 2% desde 20 SMMLV
  ],

  // ─── PRESTACIONES SOCIALES (Provisión mensual) ───────────────
  PRESTACIONES: {
    PRIMA:            1/12,            // CST Art.306 — 1 salario/año ÷ 12
    CESANTIAS:        1/12,            // CST Art.249 — 1 salario/año ÷ 12
    INT_CESANTIAS:    0.12/12,         // CST Art.268 — 12%/año = 1%/mes s/cesantías
    VACACIONES:       15/360,          // CST Art.186 — 15 días hábiles / 360 días
  },

  // ─── FESTIVOS COLOMBIA 2026 ───────────────────────────────────
  // Ley 51 de 1983 — festivos trasladables al lunes siguiente
  FESTIVOS_2026: [
    '2026-01-01', // Año Nuevo
    '2026-01-12', // Reyes Magos (trasladado)
    '2026-03-23', // San José (trasladado)
    '2026-04-02', // Jueves Santo
    '2026-04-03', // Viernes Santo
    '2026-05-01', // Día del Trabajo
    '2026-05-18', // Ascensión del Señor (trasladado)
    '2026-06-08', // Corpus Christi (trasladado)
    '2026-06-15', // Sagrado Corazón (trasladado)
    '2026-06-29', // San Pedro y San Pablo (trasladado)
    '2026-07-20', // Independencia de Colombia
    '2026-08-07', // Batalla de Boyacá
    '2026-08-17', // Asunción de la Virgen (trasladado)
    '2026-10-12', // Día de la Raza (trasladado)
    '2026-11-02', // Todos los Santos (trasladado)
    '2026-11-16', // Independencia de Cartagena (trasladado)
    '2026-12-08', // Inmaculada Concepción
    '2026-12-25', // Navidad
  ],

  // ─── CICLOS DE PAGO ───────────────────────────────────────────
  CICLOS_PAGO: {
    QUINCENA_15_30: { corte1: 15, corte2: 30, label: 'Quincena 15 y 30' },
    QUINCENA_5_20:  { corte1:  5, corte2: 20, label: 'Quincena 5 y 20' },
  },

};

// Exportación dual: funciona como módulo ES y como variable global (HTML standalone)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NOMINA_CONFIG;
} else {
  window.NOMINA_CONFIG = NOMINA_CONFIG;
}