(() => {
  window.REPORT_DATA = {
    meta: {
      title: "Las Reformas de la Seguridad Social en Espana",
      lead:
        "Replica interactiva del informe con visualizaciones reconstruidas visualmente para mantener lectura comparativa y trazabilidad metodologica.",
      reportUrl: "https://hesperides.edu.es/informes/reformas-seguridad-social-espana",
      pdfUrl: "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf",
      caveat:
        "Las series numericas se han estimado visualmente a partir de los graficos del informe original."
    },
    metrics: [
      { kpi: "12,6%", label: "Gasto en pensiones sobre PIB (actual)" },
      { kpi: "1977", label: "Inicio de la serie historica" },
      { kpi: "5", label: "Grandes rondas de reforma" },
      { kpi: "100%", label: "Visualizaciones interactivas" }
    ],
    chapters: [
      {
        id: "reformas-cronologia",
        title: "1. Cronologia de reformas",
        summary: [
          "La tabla resume los hitos normativos que reconfiguraron edad, periodo de calculo y ajustes del sistema.",
          "El objetivo fue contener un gasto estructuralmente creciente bajo envejecimiento demografico."
        ],
        charts: ["r01"]
      },
      {
        id: "reformas-tendencias",
        title: "2. Tendencias estructurales",
        summary: [
          "Las tres visualizaciones recogen la evolucion del gasto, la dependencia pensionista-cotizante y la brecha entre pension media y salarios.",
          "Los datos son reconstrucciones visuales coherentes con las magnitudes y mensajes del informe."
        ],
        charts: ["r02", "r03", "r04"]
      }
    ],
    charts: {
      r01: {
        title: "Tabla 1. Principales reformas del sistema de pensiones",
        subtitle: "Resumen cronologico de medidas y efecto esperado sobre sostenibilidad",
        source: "Las Reformas de la Seguridad Social en Espana (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf",
        exactness: "reconstruida visualmente",
        renderAs: "table",
        tableColumns: ["Reforma", "Medidas principales", "Efecto esperado"],
        tableRows: [
          ["1985", "Endurecimiento de acceso y ampliacion de anos exigidos", "Moderacion inicial del crecimiento"],
          ["1997", "Pacto de Toledo y separacion de fuentes", "Mayor disciplina contable"],
          ["2011", "Retraso progresivo de jubilacion y mayor periodo de calculo", "Reduccion del gasto futuro"],
          ["2013", "Indice de revalorizacion y factor de sostenibilidad", "Contencion del gasto efectivo"],
          ["2021-2023", "Mecanismo de Equidad e incremento de ingresos contributivos", "Sostenibilidad apoyada en ingresos"]
        ]
      },
      r02: {
        title: "Grafico 1. Gasto en pensiones sobre PIB (1977-2024)",
        subtitle: "Evolucion estimada del desembolso agregado de pensiones en Espana",
        source: "Las Reformas de la Seguridad Social en Espana (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "%",
        x: ["1977", "1980", "1985", "1990", "1995", "2000", "2005", "2010", "2015", "2020", "2024"],
        series: [
          {
            name: "Gasto en pensiones / PIB",
            type: "line",
            data: [0.9, 1.8, 4.0, 7.0, 8.2, 8.4, 8.0, 10.8, 11.8, 12.1, 12.6],
            color: "#f3c400",
            areaStyle: 0.16
          }
        ],
        min: 0,
        max: 14
      },
      r03: {
        title: "Grafico 2. Pensionistas por cada 100 cotizantes",
        subtitle: "Presion demografica y contributiva del sistema (serie estimada)",
        source: "Las Reformas de la Seguridad Social en Espana (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "indice",
        x: ["1980", "1985", "1990", "1995", "2000", "2005", "2010", "2015", "2020", "2024"],
        series: [
          {
            name: "Pensionistas/100 cotizantes",
            type: "line",
            data: [33, 35, 37, 39, 41, 43, 45, 47, 49, 51],
            color: "#7f5b00",
            areaStyle: 0.1
          }
        ],
        min: 30,
        max: 55
      },
      r04: {
        title: "Grafico 3. Pension media real frente a salario medio real",
        subtitle: "Indice base 2000 = 100 (estimacion visual de la divergencia)",
        source: "Las Reformas de la Seguridad Social en Espana (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "indice",
        x: ["2000", "2005", "2010", "2015", "2020", "2024"],
        series: [
          {
            name: "Pension media real",
            type: "line",
            data: [100, 112, 128, 144, 158, 163],
            color: "#f3c400"
          },
          {
            name: "Salario medio real",
            type: "line",
            data: [100, 104, 108, 110, 112, 113],
            color: "#2b2b2b"
          }
        ],
        min: 95,
        max: 170
      }
    },
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf"
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/reformas-seguridad-social-espana"
      },
      "Nota metodologica: series reconstruidas visualmente a partir de las figuras del documento original."
    ]
  };
})();
