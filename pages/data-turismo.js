(() => {
  const makeIds = (prefix, from, to) => {
    const ids = [];
    for (let i = from; i <= to; i += 1) {
      ids.push(`${prefix}${String(i).padStart(2, "0")}`);
    }
    return ids;
  };

  const figures = [
    { label: "Grafico 1", page: 6 },
    { label: "Grafico 2", page: 7 },
    { label: "Grafico 3", page: 8 },
    { label: "Grafico 4", page: 9 },
    { label: "Grafico 5", page: 11 },
    { label: "Grafico 6", page: 13 },
    { label: "Grafico 7", page: 15 },
    { label: "Grafico 8", page: 16 },
    { label: "Grafico 9", page: 17 },
    { label: "Grafico 10", page: 18 },
    { label: "Grafico 11", page: 19 },
    { label: "Grafico 12", page: 20 },
    { label: "Tabla 1", page: 21 },
    { label: "Grafico 13", page: 23 },
    { label: "Tabla 2", page: 24 },
    { label: "Tabla 3", page: 25 },
    { label: "Grafico 14", page: 28 },
    { label: "Grafico 15", page: 29 },
    { label: "Grafico 16", page: 31 }
  ];

  const years = ["2015", "2017", "2019", "2021", "2023", "2025"];

  const baseMeta = {
    source: "Turismo y vivienda en Canarias (2025)",
    sourceUrl: "https://hesperides.edu.es/wp-content/uploads/2025/02/Informe-Vivienda_h_Febrero2025.pdf",
    exactness: "reconstruida visualmente"
  };

  const chartByNumber = {
    1: {
      title: "Grafico 1. Parque residencial en Canarias",
      subtitle: "Crecimiento acumulado de vivienda principal (base 2020 = 100)",
      type: "line",
      unit: "indice",
      x: ["2020", "2021", "2022", "2023"],
      series: [{ name: "Parque residencial", type: "line", data: [100, 100.2, 100.4, 100.7], color: "#2b2b2b" }],
      min: 99,
      max: 102
    },
    2: {
      title: "Grafico 2. Vivienda vacacional registrada",
      subtitle: "Crecimiento acumulado de stock turistico (base 2020 = 100)",
      type: "line",
      unit: "indice",
      x: ["2020", "2021", "2022", "2023"],
      series: [{ name: "Vivienda vacacional", type: "line", data: [100, 111, 124, 135], color: "#f3c400" }],
      min: 95,
      max: 145
    },
    3: {
      title: "Grafico 3. Oferta residencial vs oferta turistica",
      subtitle: "Variacion acumulada 2020-2023",
      unit: "%",
      x: ["Parque residencial", "Vivienda vacacional"],
      series: [{ name: "Variacion", data: [0.7, 35], color: "#7f5b00" }],
      min: 0,
      max: 40
    },
    4: {
      title: "Grafico 4. Precio de compraventa en Canarias",
      subtitle: "Indice base 2015 = 100",
      type: "line",
      unit: "indice",
      x: years,
      series: [{ name: "Indice compraventa", type: "line", data: [100, 108, 116, 128, 142, 149], color: "#2b2b2b" }],
      min: 95,
      max: 155
    },
    5: {
      title: "Grafico 5. Precio de alquiler en Canarias",
      subtitle: "Indice base 2015 = 100",
      type: "line",
      unit: "indice",
      x: years,
      series: [{ name: "Indice alquiler", type: "line", data: [100, 111, 124, 139, 155, 166], color: "#f3c400" }],
      min: 95,
      max: 172
    },
    6: {
      title: "Grafico 6. Distribucion del suelo en municipios analizados",
      subtitle: "Composicion del suelo por condicion urbanistica",
      unit: "%",
      x: ["Consolidado", "Pendiente de desarrollo", "No urbanizable"],
      series: [{ name: "Participacion", data: [33.0, 5.2, 61.8], color: "#2b2b2b" }],
      min: 0,
      max: 70
    },
    7: {
      title: "Grafico 7. Densidad urbana",
      subtitle: "Distribucion del suelo urbano por densidad",
      unit: "%",
      x: ["Baja", "Media-baja", "Media", "Alta"],
      series: [{ name: "Participacion", data: [60.3, 14.6, 9.2, 16.0], color: "#f3c400" }],
      min: 0,
      max: 65
    },
    8: {
      title: "Grafico 8. Licencias de obra nueva",
      subtitle: "Miles de viviendas licenciadas por ano",
      type: "line",
      unit: "M",
      x: ["2016", "2018", "2020", "2021", "2022", "2023", "2024"],
      series: [{ name: "Licencias (miles)", type: "line", data: [9.2, 8.7, 6.5, 7.0, 7.4, 7.6, 7.8], color: "#7f5b00" }],
      min: 5,
      max: 11
    },
    9: {
      title: "Grafico 9. Viviendas iniciadas y hogares nuevos",
      subtitle: "Brecha anual entre oferta y demanda potencial",
      unit: "M",
      x: ["2019", "2020", "2021", "2022", "2023", "2024"],
      series: [
        { name: "Viviendas iniciadas (miles)", data: [6.8, 6.5, 7.0, 7.3, 7.6, 7.9], color: "#2b2b2b" },
        { name: "Hogares netos (miles)", data: [11.2, 10.9, 11.7, 12.4, 13.1, 13.8], color: "#f3c400" }
      ],
      min: 5,
      max: 15
    },
    10: {
      title: "Grafico 10. Vivienda vacacional por islas",
      subtitle: "Peso de vivienda vacacional sobre parque residencial",
      orientation: "horizontal",
      unit: "%",
      x: ["Tenerife", "Gran Canaria", "Lanzarote", "Fuerteventura", "La Palma"],
      series: [{ name: "Peso vacacional", data: [8.5, 7.1, 14.8, 16.3, 6.4], color: "#2b2b2b" }],
      min: 0,
      max: 20
    },
    11: {
      title: "Grafico 11. Sobrecarga de alquiler por isla",
      subtitle: "Hogares arrendatarios con esfuerzo >40% renta",
      orientation: "horizontal",
      unit: "%",
      x: ["Tenerife", "Gran Canaria", "Lanzarote", "Fuerteventura", "La Palma"],
      series: [{ name: "Sobrecarga", data: [41, 38, 44, 46, 33], color: "#f3c400" }],
      min: 0,
      max: 50
    },
    12: {
      title: "Grafico 12. Correlacion turismo-precio residencial",
      subtitle: "Relacion estimada entre intensidad turistica y precio de vivienda",
      unit: "indice",
      x: ["Correlacion baja", "Correlacion media", "Correlacion alta"],
      series: [{ name: "Municipios", data: [58, 29, 13], color: "#7f5b00" }],
      min: 0,
      max: 65
    },
    13: {
      title: "Grafico 13. Deficit anual de vivienda frente a stock turistico",
      subtitle: "Comparacion de orden de magnitud",
      unit: "viviendas",
      x: ["Deficit anual", "Stock turistico"],
      series: [{ name: "Viviendas", data: [7000, 60000], color: "#2b2b2b" }],
      min: 0,
      max: 70000
    },
    14: {
      title: "Grafico 14. Escenario de restriccion turistica",
      subtitle: "Impacto estimado en oferta residencial efectiva",
      type: "line",
      unit: "indice",
      x: ["2025", "2026", "2027", "2028", "2029", "2030"],
      series: [
        { name: "Sin restriccion", type: "line", data: [100, 101, 102, 103, 104, 105], color: "#2b2b2b" },
        { name: "Restriccion fuerte", type: "line", data: [100, 100.3, 100.7, 101.0, 101.4, 101.8], color: "#f3c400" }
      ],
      min: 98,
      max: 106
    },
    15: {
      title: "Grafico 15. Escenario de reforma de oferta",
      subtitle: "Impacto potencial en nueva vivienda disponible",
      unit: "viviendas",
      x: ["Status quo", "Agilizacion licencias", "Suelo+licencias", "Paquete integral"],
      series: [{ name: "Viviendas adicionales/anio", data: [0, 2200, 4300, 6900], color: "#f3c400" }],
      min: 0,
      max: 7500
    },
    16: {
      title: "Grafico 16. Sintesis de impacto sobre precios",
      subtitle: "Variacion acumulada esperada del alquiler 2025-2030",
      unit: "%",
      x: ["Status quo", "Restriccion turistica", "Reforma de oferta"],
      series: [{ name: "Variacion acumulada", data: [29, 24, 13], color: "#7f5b00" }],
      min: 0,
      max: 35
    }
  };

  const table1 = {
    ...baseMeta,
    title: "Tabla 1. Tipologia de suelo y restricciones",
    subtitle: "Sintesis de condicionantes urbanisticos en municipios analizados",
    renderAs: "table",
    tableColumns: ["Categoria", "Peso", "Implicacion"],
    tableRows: [
      ["Suelo consolidado", "33%", "Oferta inmediata limitada"],
      ["Suelo en desarrollo", "5,2%", "Dependiente de tramitacion"],
      ["No urbanizable", "61,8%", "Sin capacidad edificatoria directa"]
    ]
  };

  const table2 = {
    ...baseMeta,
    title: "Tabla 2. Instrumentos de politica analizados",
    subtitle: "Comparacion de mecanismos y horizonte de impacto",
    renderAs: "table",
    tableColumns: ["Instrumento", "Horizonte", "Riesgo"],
    tableRows: [
      ["Restriccion vacacional", "Corto plazo", "Desplazamiento de actividad"],
      ["Aceleracion de licencias", "Medio plazo", "Cuello de botella administrativo"],
      ["Movilizacion de suelo", "Medio-largo", "Ritmo de ejecucion"],
      ["Paquete integral", "Largo plazo", "Coordinacion multinivel"]
    ]
  };

  const table3 = {
    ...baseMeta,
    title: "Tabla 3. Marco de escenarios",
    subtitle: "Supuestos utilizados en proyecciones de cierre",
    renderAs: "table",
    tableColumns: ["Variable", "Escenario base", "Escenario reforma"],
    tableRows: [
      ["Nuevas viviendas/año", "7.900", "14.800"],
      ["Crecimiento alquiler", "4,3%", "2,1%"],
      ["Peso vacacional", "Estable", "Estable"],
      ["Plazo medio de licencia", "18 meses", "9 meses"]
    ]
  };

  const charts = Object.fromEntries(
    figures.map((fig, index) => {
      const id = `f${String(index + 1).padStart(2, "0")}`;

      if (fig.label === "Tabla 1") return [id, table1];
      if (fig.label === "Tabla 2") return [id, table2];
      if (fig.label === "Tabla 3") return [id, table3];

      const n = Number(fig.label.replace(/[^0-9]/g, ""));
      return [id, { ...baseMeta, ...chartByNumber[n] }];
    })
  );

  window.REPORT_DATA = {
    meta: {
      title: "Turismo y vivienda en Canarias",
      lead:
        "Version interactiva del informe con series reconstruidas visualmente sobre tension residencial, turismo y restricciones de oferta.",
      reportUrl: "https://hesperides.edu.es/informes/turismo-vivienda-canarias/",
      pdfUrl: "https://hesperides.edu.es/wp-content/uploads/2025/02/Informe-Vivienda_h_Febrero2025.pdf",
      caveat:
        "Las cifras de esta version se estiman visualmente desde el informe original para habilitar lectura interactiva completa."
    },
    metrics: [
      { kpi: "16", label: "Graficos interactivos" },
      { kpi: "3", label: "Tablas interactivas" },
      { kpi: "+35%", label: "Crecimiento vacacional 2020-2023" },
      { kpi: "0,7%", label: "Crecimiento parque residencial 2020-2023" }
    ],
    chapters: [
      {
        id: "bloque-1",
        title: "1. Diagnostico inicial",
        summary: [
          "Bloque de apertura con dinamica de precios, oferta y tension entre uso residencial y turistico.",
          "Se muestra que la restriccion de oferta estructural tiene un peso determinante."
        ],
        charts: makeIds("f", 1, 7)
      },
      {
        id: "bloque-2",
        title: "2. Evidencia empírica y marco",
        summary: [
          "Bloque central con indicadores por isla, correlaciones y tablas metodologicas.",
          "Incluye instrumentos de politica evaluados en el informe."
        ],
        charts: makeIds("f", 8, 13)
      },
      {
        id: "bloque-3",
        title: "3. Escenarios de cierre",
        summary: [
          "Bloque final con escenarios de politica y su impacto esperado en oferta y precios.",
          "Se comparan restricciones de uso turistico frente a reformas de oferta residencial."
        ],
        charts: makeIds("f", 14, 19)
      }
    ],
    charts,
    text: {
      sourcePath: "extracted_text/turismo_vivienda_canarias.txt",
      ranges: [
        {
          chapterId: "bloque-1",
          start: "Resumen ejecutivo",
          end: "Segunda parte"
        },
        {
          chapterId: "bloque-2",
          start: "Segunda parte",
          end: "Tercera parte"
        },
        {
          chapterId: "bloque-3",
          start: "Tercera parte"
        }
      ]
    },
    playgroundIntro:
      "Simuladores para comparar restriccion turistica y reforma de oferta residencial en su impacto sobre alquiler y tension habitacional.",
    playgrounds: [
      {
        id: "restriccion-vs-oferta",
        title: "Simulador de restriccion turistica vs reforma de oferta",
        description:
          "Contrasta el efecto de restringir vivienda vacacional frente a acelerar licencias y activar suelo para aliviar la tension residencial.",
        methodology:
          "Base: Graficos 14, 15 y 16. Se aplica un modelo simplificado donde la restriccion reduce parcialmente crecimiento de alquiler y la oferta adicional actua con mayor efecto estructural.",
        methodologyShort:
          "Combinacion de dos palancas (restriccion y oferta) sobre crecimiento de alquiler, deficit anual e indice de oferta efectiva.",
        controls: [
          {
            id: "restriccion_turistica",
            label: "Intensidad de restriccion turistica",
            type: "range",
            min: 0,
            max: 100,
            step: 1,
            value: 60,
            display: (value, h) => `${h.formatInt(value)} / 100`
          },
          {
            id: "aceleracion_licencias",
            label: "Aceleracion de licencias",
            type: "range",
            min: 0,
            max: 100,
            step: 1,
            value: 45,
            display: (value, h) => `${h.formatInt(value)} / 100`
          },
          {
            id: "activacion_suelo",
            label: "Activacion adicional de suelo",
            type: "range",
            min: 0,
            max: 100,
            step: 1,
            value: 40,
            display: (value, h) => `${h.formatInt(value)} / 100`
          },
          {
            id: "horizonte",
            label: "Horizonte de impacto",
            type: "range",
            min: 2,
            max: 8,
            step: 1,
            value: 5,
            display: (value, h) => `${h.formatInt(value)} anos`
          }
        ],
        compute: (state, h) => {
          const horizonFactor = state.horizonte / 5;
          const efectoRestriccion = state.restriccion_turistica * 0.05;
          const efectoOferta = state.aceleracion_licencias * 0.07 + state.activacion_suelo * 0.08;

          const variacionAlquiler2030 = h.clamp(29 - efectoRestriccion - efectoOferta * horizonFactor, 8, 32);
          const ofertaExtra = (state.aceleracion_licencias * 35 + state.activacion_suelo * 34) * horizonFactor;
          const deficitAnual = h.clamp(7000 - ofertaExtra * 0.12 + state.restriccion_turistica * 18, 1500, 12000);
          const indiceOferta2030 = h.clamp(105 - state.restriccion_turistica * 0.03 - efectoOferta * 0.05, 95, 107);

          const senal = h.clamp(((32 - variacionAlquiler2030) / 24) * 100, 0, 100);
          const color = variacionAlquiler2030 < 18 ? "var(--status-good)" : variacionAlquiler2030 < 24 ? "var(--status-warn)" : "var(--status-bad)";

          const narrativa =
            variacionAlquiler2030 < 18
              ? "La estrategia combinada logra una desaceleracion intensa del alquiler con mejora de oferta efectiva."
              : variacionAlquiler2030 < 24
                ? "Hay desaceleracion moderada: la tension mejora, pero sigue presente en municipios de mayor demanda."
                : "Predomina una correccion limitada; la oferta adicional no compensa del todo la presion de demanda.";

          return {
            kpis: [
              { value: `${h.formatNumber(variacionAlquiler2030, 1)}%`, desc: "Variacion acumulada del alquiler a 2030", color },
              { value: `${h.formatInt(Math.round(deficitAnual))}`, desc: "Deficit anual estimado de vivienda" },
              { value: `${h.formatNumber(indiceOferta2030, 1)}`, desc: "Indice de oferta efectiva (2030)" },
              { value: `${h.formatInt(Math.round(ofertaExtra))}`, desc: "Oferta adicional potencial acumulada" }
            ],
            thermometer: {
              value: senal,
              color,
              ariaLabel: "Alivio estimado de tension en alquiler"
            },
            narrative: narrativa,
            note:
              "La conversion de palancas a oferta extra es orientativa y busca mantener coherencia de orden de magnitud con los escenarios del informe."
          };
        }
      },
      {
        id: "riesgo-insular",
        title: "Simulador de riesgo de tension por isla",
        description:
          "Estima sobrecarga y presion de precios en una isla tipo segun peso vacacional, dinamica de rentas y ritmo de nueva oferta.",
        methodology:
          "Base: Graficos 10, 11 y 12. Se construye un indice sintentico de riesgo combinando peso vacacional, brecha alquiler-renta y oferta nueva por 1.000 habitantes.",
        methodologyShort:
          "Indice sintetico de riesgo local con tres canales: intensidad vacacional, brecha de renta y oferta nueva relativa.",
        controls: [
          {
            id: "peso_vacacional",
            label: "Peso de vivienda vacacional en la isla",
            type: "range",
            min: 4,
            max: 20,
            step: 0.1,
            value: 10,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "crec_alquiler",
            label: "Crecimiento anual del alquiler",
            type: "range",
            min: 0,
            max: 10,
            step: 0.1,
            value: 4.3,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "crec_renta",
            label: "Crecimiento anual de renta salarial",
            type: "range",
            min: 0,
            max: 6,
            step: 0.1,
            value: 1.8,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "oferta_nueva",
            label: "Nueva oferta por 1.000 habitantes",
            type: "range",
            min: 0.5,
            max: 6,
            step: 0.1,
            value: 2,
            display: (value, h) => `${h.formatNumber(value)}`
          }
        ],
        compute: (state, h) => {
          const brechaRenta = state.crec_alquiler - state.crec_renta;
          const sobrecarga = h.clamp(
            30 + state.peso_vacacional * 0.9 + brechaRenta * 2.6 - state.oferta_nueva * 2.8,
            18,
            60
          );
          const presionPrecios = h.clamp(
            100 + state.peso_vacacional * 1.5 + brechaRenta * 4 - state.oferta_nueva * 3.5,
            85,
            155
          );
          const riesgo = h.clamp(
            ((sobrecarga - 18) / 42) * 60 + ((presionPrecios - 85) / 70) * 40,
            0,
            100
          );
          const deficitLocal = h.clamp(7000 + (sobrecarga - 41) * 110 - (state.oferta_nueva - 2) * 350, 3000, 12000);
          const color = riesgo < 40 ? "var(--status-good)" : riesgo < 65 ? "var(--status-warn)" : "var(--status-bad)";

          const narrativa =
            riesgo < 40
              ? "El escenario local sugiere tension contenida y mejor equilibrio entre demanda y oferta."
              : riesgo < 65
                ? "Existe tension relevante: se recomienda reforzar oferta estable para evitar deterioro adicional."
                : "La configuracion es de riesgo alto para accesibilidad, con fuerte presion sobre precios y sobrecarga.";

          return {
            kpis: [
              { value: `${h.formatNumber(sobrecarga, 1)}%`, desc: "Sobrecarga estimada en hogares arrendatarios" },
              { value: `${h.formatNumber(presionPrecios, 1)}`, desc: "Indice de presion de precios (100 = neutral)" },
              { value: `${h.formatNumber(riesgo, 1)}`, desc: "Indice sintetico de riesgo insular", color },
              { value: `${h.formatInt(Math.round(deficitLocal))}`, desc: "Deficit anual local de referencia" }
            ],
            thermometer: {
              value: riesgo,
              color,
              ariaLabel: "Riesgo de tension residencial insular"
            },
            narrative: narrativa,
            note:
              "El simulador describe una isla tipo y no sustituye un modelo municipal detallado con microdatos."
          };
        }
      }
    ],
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/wp-content/uploads/2025/02/Informe-Vivienda_h_Febrero2025.pdf"
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/turismo-vivienda-canarias/"
      },
      "Nota metodologica: reconstruccion visual de series para esta iteracion interactiva (sin ingestar datasets oficiales)."
    ]
  };
})();
