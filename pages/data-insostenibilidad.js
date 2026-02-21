(() => {
  window.REPORT_DATA = {
    meta: {
      title: "La (in)sostenibilidad de la Seguridad Social",
      lead:
        "Version interactiva del informe con series reconstruidas visualmente para explorar la magnitud del desequilibrio fiscal y contributivo.",
      reportUrl: "https://hesperides.edu.es/informes/insostenibilidad_seguridad_social",
      pdfUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
      caveat:
        "Las cifras se han estimado visualmente a partir de los graficos del informe original, manteniendo su narrativa y orden de lectura."
    },
    metrics: [
      { kpi: "50.187", label: "Deficit publico 2024 (M€)" },
      { kpi: "66.206", label: "Saldo basico negativo SS (M€)" },
      { kpi: "3,8%", label: "Deficit contributivo sobre PIB" },
      { kpi: "26,6%", label: "Deficit sobre gasto contributivo" }
    ],
    chapters: [
      {
        id: "bloque-1",
        title: "1. Cuentas publicas y contexto",
        summary: [
          "El informe arranca con la fotografia de ingresos y gastos publicos, y su evolucion desde la crisis financiera.",
          "Se introduce tambien el reparto funcional del gasto para ubicar el peso de proteccion social y pensiones."
        ],
        charts: ["i01", "i02", "i03", "i04", "i05"]
      },
      {
        id: "bloque-2",
        title: "2. Brecha financiera de la Seguridad Social",
        summary: [
          "Se representa la estructura de financiacion del sistema y la persistencia de saldos negativos durante mas de una decada.",
          "Las curvas muestran la dependencia creciente respecto de transferencias estatales."
        ],
        charts: ["i06", "i07", "i08", "i09"]
      },
      {
        id: "bloque-3",
        title: "3. Desigualdad territorial del saldo contributivo",
        summary: [
          "El desequilibrio no se distribuye de forma homogenea entre territorios.",
          "Solo unos pocos territorios mantienen superavit contributivo y el resto presenta saldos deficitarios relevantes."
        ],
        charts: ["i10"]
      },
      {
        id: "bloque-4",
        title: "4. Fondo de reserva y cierre patrimonial",
        summary: [
          "El tramo final analiza la hucha de pensiones, su rentabilidad relativa y su insuficiencia frente al gasto corriente.",
          "El mensaje central es que el problema exige reformas estructurales y no ajustes contables puntuales."
        ],
        charts: ["i11", "i12", "i13", "i14", "i15", "i16"]
      }
    ],
    charts: {
      i01: {
        title: "Grafico 1. Ingresos, gastos y deficit publico (2024)",
        subtitle: "Administraciones publicas de Espana (millones de euros)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "M€",
        x: ["Ingresos", "Gastos", "Deficit"],
        series: [
          {
            name: "Millones de euros",
            data: [672659, 722846, 50187],
            color: "#f3c400"
          }
        ]
      },
      i02: {
        title: "Grafico 2. Deficit publico de Espana (% del PIB)",
        subtitle: "Serie estimada de saldo presupuestario del conjunto de administraciones",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "%",
        x: ["2000", "2004", "2008", "2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
        series: [
          {
            name: "Deficit / superavit",
            type: "line",
            data: [0.8, 0.2, -4.4, -9.9, -10.5, -6.0, -4.3, -2.5, -10.1, -4.8, -3.2],
            color: "#7f5b00",
            areaStyle: 0.12
          }
        ],
        min: -12,
        max: 2
      },
      i03: {
        title: "Tabla 1. Estructura funcional del gasto publico",
        subtitle: "Distribucion aproximada del gasto por funciones (2023)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        renderAs: "table",
        tableColumns: ["Funcion", "Peso estimado", "Comentario"],
        tableRows: [
          ["Proteccion social", "42%", "Incluye pensiones y transferencias sociales"],
          ["Sanidad", "15%", "Segundo bloque de gasto funcional"],
          ["Educacion", "12%", "Tercer componente de mayor volumen"],
          ["Resto de funciones", "31%", "Defensa, servicios generales y otras politicas"]
        ]
      },
      i04: {
        title: "Grafico 3. Ingresos y gastos por nivel administrativo",
        subtitle: "Centralizacion de ingresos y descentralizacion del gasto (%)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "%",
        x: ["Adm. Central", "Seguridad Social", "CCAA", "Corporaciones locales"],
        series: [
          {
            name: "Peso en ingresos",
            data: [43.0, 29.8, 18.4, 8.8],
            color: "#f3c400"
          },
          {
            name: "Peso en gasto",
            data: [22.6, 33.7, 32.6, 11.2],
            color: "#2b2b2b"
          }
        ],
        min: 0,
        max: 50
      },
      i05: {
        title: "Grafico 4. Recursos netos disponibles por administracion",
        subtitle: "Estimacion relativa de capacidad de gasto libre (%)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "%",
        orientation: "horizontal",
        x: ["Adm. Central", "Seguridad Social", "CCAA", "Corporaciones locales"],
        series: [
          {
            name: "Recursos netos",
            data: [24, 35, 32, 9],
            color: "#7f5b00"
          }
        ],
        min: 0,
        max: 40
      },
      i06: {
        title: "Grafico 5. Composicion financiera de la Seguridad Social (2024)",
        subtitle: "Ingresos corrientes frente a gasto total del sistema (M€)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "M€",
        x: ["Cotizaciones", "Transferencias del Estado", "Otros ingresos", "Gasto total"],
        series: [
          {
            name: "Millones de euros",
            data: [174250, 54005, 17600, 242253],
            color: "#f3c400"
          }
        ]
      },
      i07: {
        title: "Grafico 6. Saldos basico y presupuestario (% PIB)",
        subtitle: "Evolucion 2010-2024 del desequilibrio financiero de la Seguridad Social",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "%",
        x: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
        series: [
          {
            name: "Saldo basico",
            type: "line",
            data: [0.1, -0.2, -0.5, -0.7, -0.9, -1.1, -1.2, -1.1, -1.0, -1.1, -1.3, -1.2, -1.0, -0.9, -0.8],
            color: "#2b2b2b"
          },
          {
            name: "Saldo presupuestario",
            type: "line",
            data: [-0.8, -1.2, -1.8, -2.3, -2.8, -3.2, -3.5, -3.7, -3.9, -4.0, -4.5, -4.4, -4.3, -4.2, -4.2],
            color: "#f3c400"
          }
        ],
        min: -5,
        max: 1
      },
      i08: {
        title: "Grafico 7. Saldo basico en millones de euros",
        subtitle: "Agujero acumulado de la Seguridad Social (serie estimada)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "M€",
        x: ["2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
        series: [
          {
            name: "Saldo basico",
            type: "line",
            data: [-8000, -14000, -23000, -31000, -39000, -52000, -61000, -66206],
            color: "#7f5b00",
            areaStyle: 0.14
          }
        ],
        min: -70000,
        max: 0
      },
      i09: {
        title: "Grafico 8. Deficit contributivo en terminos relativos",
        subtitle: "Magnitud del desequilibrio frente al PIB y al gasto contributivo (2024)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "%",
        x: ["Deficit / PIB", "Deficit / gasto contributivo"],
        series: [
          {
            name: "Porcentaje",
            data: [3.8, 26.6],
            color: "#f3c400"
          }
        ],
        min: 0,
        max: 30
      },
      i10: {
        title: "Grafico 9. Saldo contributivo por comunidad autonoma (2023)",
        subtitle: "Solo cuatro territorios muestran superavit en el esquema contributivo (M€)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        orientation: "horizontal",
        unit: "M€",
        x: [
          "Andalucia",
          "Pais Vasco",
          "Galicia",
          "Cataluna",
          "Castilla y Leon",
          "C. Valenciana",
          "Aragon",
          "Murcia",
          "Canarias",
          "Asturias",
          "Madrid",
          "Baleares",
          "Ceuta",
          "Melilla"
        ],
        series: [
          {
            name: "Saldo contributivo",
            data: [-5480, -4480, -4420, -4100, -3900, -2600, -1800, -1450, -1200, -980, 1350, 884, 120, 95],
            color: "#2b2b2b"
          }
        ],
        min: -6000,
        max: 1600
      },
      i11: {
        title: "Grafico 10. Evolucion del Fondo de Reserva",
        subtitle: "Stock de la hucha de pensiones (M€) 2000-2024",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "M€",
        x: ["2000", "2003", "2006", "2009", "2011", "2013", "2015", "2017", "2019", "2021", "2023", "2024"],
        series: [
          {
            name: "Fondo de reserva",
            type: "line",
            data: [600, 12000, 35000, 58000, 66815, 54000, 32000, 8000, 2150, 5200, 8600, 9300],
            color: "#f3c400",
            areaStyle: 0.18
          }
        ],
        min: 0,
        max: 70000
      },
      i12: {
        title: "Grafico 11. Retiros del Fondo de Reserva",
        subtitle: "Extracciones anuales para cubrir tensiones de caja (M€)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "M€",
        x: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
        series: [
          {
            name: "Retiros",
            data: [7000, 11000, 15000, 12500, 19000, 9000, 3000, 0, 0, 0, 0, 0, 0],
            color: "#7f5b00"
          }
        ],
        min: 0,
        max: 20000
      },
      i13: {
        title: "Grafico 12. Rentabilidad comparada de fondos soberanos/publicos",
        subtitle: "Comparacion anual media estimada (%)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "%",
        x: ["Noruega", "Canada", "Suecia", "Dinamarca", "Espana"],
        series: [
          {
            name: "Rentabilidad media",
            data: [6.8, 6.1, 5.4, 4.9, 1.2],
            color: "#f3c400"
          }
        ],
        min: 0,
        max: 8
      },
      i14: {
        title: "Grafico 13. Tamano del fondo frente al gasto mensual",
        subtitle: "Fondo de reserva actual frente a una mensualidad de pensiones (M€)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "M€",
        x: ["Fondo de reserva", "Gasto mensual pensiones"],
        series: [
          {
            name: "Millones de euros",
            data: [9300, 13000],
            color: "#2b2b2b"
          }
        ],
        min: 0,
        max: 15000
      },
      i15: {
        title: "Grafico 14. Cobertura temporal del fondo",
        subtitle: "Dias de deficit anual que podria cubrir el fondo actual",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "dias",
        x: ["Cobertura estimada"],
        series: [
          {
            name: "Dias",
            data: [52],
            color: "#7f5b00"
          }
        ],
        min: 0,
        max: 70
      },
      i16: {
        title: "Grafico 15. Patrimonio neto de la Seguridad Social",
        subtitle: "Evolucion estimada del patrimonio neto (M€)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "M€",
        x: ["2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
        series: [
          {
            name: "Patrimonio neto",
            type: "line",
            data: [-12000, -25000, -41000, -56000, -72000, -86000, -96000, -102000],
            color: "#2b2b2b",
            areaStyle: 0.14
          }
        ],
        min: -110000,
        max: 0
      }
    },
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf"
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/insostenibilidad_seguridad_social"
      },
      "Nota metodologica: series reconstruidas visualmente para version interactiva (sin uso de dataset oficial en esta iteracion)."
    ]
  };
})();
