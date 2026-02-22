(() => {
  const makeIds = (prefix, from, to) => {
    const ids = [];
    for (let i = from; i <= to; i += 1) {
      ids.push(`${prefix}${String(i).padStart(2, "0")}`);
    }
    return ids;
  };

  const figures = [
    { label: "Grafico 1", page: 5 },
    { label: "Grafico 2", page: 6 },
    { label: "Grafico 3", page: 7 },
    { label: "Grafico 4", page: 8 },
    { label: "Grafico 5", page: 9 },
    { label: "Grafico 6", page: 9 },
    { label: "Grafico 7", page: 11 },
    { label: "Grafico 8", page: 11 },
    { label: "Grafico 9", page: 12 },
    { label: "Grafico 10", page: 13 },
    { label: "Grafico 11", page: 13 },
    { label: "Grafico 12", page: 14 },
    { label: "Grafico 13", page: 15 },
    { label: "Grafico 14", page: 16 },
    { label: "Grafico 15", page: 18 },
    { label: "Grafico 16", page: 19 },
    { label: "Grafico 17", page: 20 },
    { label: "Grafico 18", page: 20 },
    { label: "Grafico 19", page: 21 },
    { label: "Grafico 20", page: 22 },
    { label: "Grafico 21", page: 23 },
    { label: "Grafico 22", page: 24 },
    { label: "Grafico 23", page: 25 },
    { label: "Grafico 24", page: 25 },
    { label: "Grafico 25", page: 30 },
    { label: "Tabla 1", page: 34 },
    { label: "Grafico 26", page: 36 },
    { label: "Grafico 27", page: 37 },
    { label: "Grafico 28", page: 38 },
    { label: "Grafico 29", page: 39 },
    { label: "Grafico 30", page: 40 }
  ];

  const years = ["2013", "2015", "2017", "2019", "2021", "2023", "2025"];
  const ccaa = ["Madrid", "Cataluna", "Baleares", "Pais Vasco", "Andalucia", "C. Valenciana"];

  const baseMeta = {
    source: "Radiografia del mercado de la vivienda en Espana (2025)",
    sourceUrl: "https://hesperides.edu.es/documentos_pdf/radiografia-mercado-vivienda-espana.pdf",
    exactness: "reconstruida visualmente"
  };

  const chartByNumber = {
    1: {
      title: "Grafico 1. Precio de compraventa (indice)",
      subtitle: "Evolucion del precio de vivienda en Espana (base 2013 = 100)",
      type: "line",
      unit: "indice",
      x: years,
      series: [{ name: "Indice de precio", type: "line", data: [100, 106, 114, 123, 136, 148, 153], color: "#f3c400" }],
      min: 95,
      max: 160
    },
    2: {
      title: "Grafico 2. Precio del alquiler (indice)",
      subtitle: "Evolucion agregada del mercado de alquiler",
      type: "line",
      unit: "indice",
      x: years,
      series: [{ name: "Indice de alquiler", type: "line", data: [100, 108, 118, 127, 141, 154, 162], color: "#2b2b2b" }],
      min: 95,
      max: 170
    },
    3: {
      title: "Grafico 3. Brecha precio vivienda vs IPC",
      subtitle: "Comparacion de crecimiento acumulado",
      unit: "%",
      x: ["Vivienda", "IPC"],
      series: [{ name: "Variacion acumulada", data: [53.0, 28.2], color: "#7f5b00" }],
      min: 0,
      max: 60
    },
    4: {
      title: "Grafico 4. Esfuerzo de compra por hogar joven",
      subtitle: "Anios de renta disponibles para adquirir vivienda",
      type: "line",
      unit: "indice",
      x: years,
      series: [{ name: "Anios de renta", type: "line", data: [5.8, 6.1, 6.5, 7.0, 7.7, 8.3, 8.6], color: "#f3c400" }],
      min: 5,
      max: 9
    },
    5: {
      title: "Grafico 5. Tipo hipotecario medio",
      subtitle: "Interes medio de nuevas hipotecas",
      type: "line",
      unit: "%",
      x: ["2015", "2017", "2019", "2021", "2023", "2024", "2025"],
      series: [{ name: "Tipo medio", type: "line", data: [2.1, 1.8, 1.6, 1.5, 3.5, 3.7, 3.2], color: "#2b2b2b" }],
      min: 1,
      max: 4
    },
    6: {
      title: "Grafico 6. Cuota hipotecaria sobre renta",
      subtitle: "Hogares compradores primer acceso",
      unit: "%",
      x: ["2019", "2021", "2023", "2025"],
      series: [{ name: "Cuota / renta", data: [30, 32, 37, 39], color: "#f3c400" }],
      min: 20,
      max: 45
    },
    7: {
      title: "Grafico 7. Vivienda iniciada por 1.000 habitantes",
      subtitle: "Intensidad constructiva anual",
      type: "line",
      unit: "indice",
      x: ["2007", "2010", "2013", "2016", "2019", "2022", "2024"],
      series: [{ name: "Inicios por 1.000 hab.", type: "line", data: [19.7, 2.4, 0.4, 1.0, 1.8, 2.2, 2.7], color: "#7f5b00" }],
      min: 0,
      max: 21
    },
    8: {
      title: "Grafico 8. Visados de obra nueva",
      subtitle: "Miles de unidades visadas",
      type: "line",
      unit: "M",
      x: ["2013", "2015", "2017", "2019", "2021", "2023", "2024"],
      series: [{ name: "Miles de visados", type: "line", data: [34, 49, 64, 84, 109, 123, 128], color: "#2b2b2b" }],
      min: 20,
      max: 140
    },
    9: {
      title: "Grafico 9. Produccion de vivienda vs hogares netos",
      subtitle: "Diferencia anual entre oferta nueva y demanda de hogares",
      type: "line",
      unit: "M",
      x: ["2015", "2017", "2019", "2021", "2023", "2024"],
      series: [
        { name: "Viviendas terminadas (miles)", type: "line", data: [46, 58, 72, 89, 103, 108], color: "#f3c400" },
        { name: "Hogares netos (miles)", type: "line", data: [95, 102, 110, 132, 148, 151], color: "#2b2b2b" }
      ],
      min: 40,
      max: 170
    },
    10: {
      title: "Grafico 10. Deficit habitacional acumulado",
      subtitle: "Estimacion de viviendas faltantes",
      unit: "viviendas",
      x: ["Deficit acumulado"],
      series: [{ name: "Viviendas", data: [423000], color: "#7f5b00" }],
      min: 0,
      max: 500000
    },
    11: {
      title: "Grafico 11. Suelo finalista disponible",
      subtitle: "Meses de absorcion en mercados tensionados",
      unit: "indice",
      x: ccaa,
      series: [{ name: "Meses de cobertura", data: [14, 11, 8, 10, 16, 13], color: "#2b2b2b" }],
      min: 0,
      max: 18
    },
    12: {
      title: "Grafico 12. Plazos de tramitacion urbanistica",
      subtitle: "Tiempo medio estimado para nueva oferta (anos)",
      unit: "indice",
      x: ["Planeamiento", "Gestion", "Licencia", "Obra"],
      series: [{ name: "Anios", data: [5.5, 2.0, 1.1, 2.0], color: "#f3c400" }],
      min: 0,
      max: 6
    },
    13: {
      title: "Grafico 13. Hogares en alquiler",
      subtitle: "Peso del arrendamiento sobre vivienda principal",
      type: "line",
      unit: "%",
      x: ["2007", "2011", "2015", "2019", "2023", "2025"],
      series: [{ name: "Hogares en alquiler", type: "line", data: [13.3, 14.2, 15.6, 17.0, 18.2, 18.7], color: "#f3c400" }],
      min: 10,
      max: 20
    },
    14: {
      title: "Grafico 14. Alquiler social sobre vivienda principal",
      subtitle: "Comparacion internacional de parque social",
      orientation: "horizontal",
      unit: "%",
      x: ["Paises Bajos", "Austria", "Francia", "Alemania", "Espana"],
      series: [{ name: "Peso de alquiler social", data: [29.5, 24.0, 16.8, 9.5, 1.5], color: "#2b2b2b" }],
      min: 0,
      max: 35
    },
    15: {
      title: "Grafico 15. Sobrecarga de coste en inquilinos",
      subtitle: "Inquilinos que dedican mas del 40% de su renta a vivienda",
      unit: "%",
      x: ["Espana", "UE media", "Alemania", "Francia", "Italia"],
      series: [{ name: "Sobrecarga", data: [39.4, 27.6, 21.2, 24.3, 32.1], color: "#f3c400" }],
      min: 0,
      max: 45
    },
    16: {
      title: "Grafico 16. Evolucion de la renta de alquiler media",
      subtitle: "EUR/m2 por mes en zonas urbanas",
      type: "line",
      unit: "euros",
      x: ["2013", "2015", "2017", "2019", "2021", "2023", "2025"],
      series: [{ name: "Renta media EUR/m2", type: "line", data: [7.1, 7.8, 8.9, 10.5, 11.8, 12.9, 13.7], color: "#2b2b2b" }],
      min: 6,
      max: 15
    },
    17: {
      title: "Grafico 17. Oferta de alquiler anunciada",
      subtitle: "Indice de viviendas disponibles (base 2019 = 100)",
      type: "line",
      unit: "indice",
      x: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
      series: [{ name: "Oferta anunciada", type: "line", data: [100, 96, 90, 82, 74, 69, 66], color: "#7f5b00" }],
      min: 60,
      max: 105
    },
    18: {
      title: "Grafico 18. Duracion media de anuncios",
      subtitle: "Dias en mercado de una vivienda en alquiler",
      unit: "indice",
      x: ["2019", "2021", "2023", "2025"],
      series: [{ name: "Dias", data: [48, 34, 22, 18], color: "#f3c400" }],
      min: 0,
      max: 55
    },
    19: {
      title: "Grafico 19. Precio de compra por comunidad",
      subtitle: "Variacion acumulada 2013-2025",
      orientation: "horizontal",
      unit: "%",
      x: ccaa,
      series: [{ name: "Variacion", data: [48, 52, 67, 44, 41, 46], color: "#2b2b2b" }],
      min: 0,
      max: 75
    },
    20: {
      title: "Grafico 20. Precio de alquiler por comunidad",
      subtitle: "Variacion acumulada 2015-2025",
      orientation: "horizontal",
      unit: "%",
      x: ccaa,
      series: [{ name: "Variacion", data: [62, 72, 81, 58, 49, 57], color: "#f3c400" }],
      min: 0,
      max: 90
    },
    21: {
      title: "Grafico 21. Esfuerzo de alquiler por comunidad",
      subtitle: "Renta destinada a vivienda en mercado arrendatario",
      unit: "%",
      x: ccaa,
      series: [{ name: "Esfuerzo", data: [43, 46, 51, 37, 34, 39], color: "#7f5b00" }],
      min: 20,
      max: 55
    },
    22: {
      title: "Grafico 22. Precio de suelo urbano",
      subtitle: "Indice base 2013 = 100",
      type: "line",
      unit: "indice",
      x: years,
      series: [{ name: "Indice de suelo", type: "line", data: [100, 98, 101, 109, 121, 136, 147], color: "#2b2b2b" }],
      min: 90,
      max: 155
    },
    23: {
      title: "Grafico 23. Coste de construccion residencial",
      subtitle: "Indice de coste de ejecucion material",
      type: "line",
      unit: "indice",
      x: ["2015", "2017", "2019", "2021", "2023", "2024", "2025"],
      series: [{ name: "Coste construccion", type: "line", data: [100, 104, 109, 118, 136, 142, 145], color: "#f3c400" }],
      min: 95,
      max: 150
    },
    24: {
      title: "Grafico 24. Margen promotor estimado",
      subtitle: "Margen neto sobre coste total por ciclo",
      unit: "%",
      x: ["2015", "2017", "2019", "2021", "2023", "2025"],
      series: [{ name: "Margen neto", data: [13, 14, 12, 10, 8, 7], color: "#2b2b2b" }],
      min: 0,
      max: 18
    },
    25: {
      title: "Grafico 25. Escenarios de politica de oferta",
      subtitle: "Impacto en viviendas anuales disponibles",
      unit: "viviendas",
      x: ["Status quo", "Agilizacion licencias", "Suelo + licencias", "Paquete integral"],
      series: [{ name: "Viviendas adicionales/anio", data: [0, 25000, 47000, 72000], color: "#f3c400" }],
      min: 0,
      max: 80000
    },
    26: {
      title: "Grafico 26. Evolucion esperada del precio (escenarios)",
      subtitle: "Trayectorias de indice de precio de compraventa",
      type: "line",
      unit: "indice",
      x: ["2025", "2027", "2029", "2031", "2033", "2035"],
      series: [
        { name: "Status quo", type: "line", data: [153, 162, 171, 181, 191, 203], color: "#2b2b2b" },
        { name: "Reforma de oferta", type: "line", data: [153, 158, 163, 168, 173, 178], color: "#f3c400" }
      ],
      min: 145,
      max: 210
    },
    27: {
      title: "Grafico 27. Evolucion esperada del alquiler (escenarios)",
      subtitle: "Indice de alquiler proyectado",
      type: "line",
      unit: "indice",
      x: ["2025", "2027", "2029", "2031", "2033", "2035"],
      series: [
        { name: "Status quo", type: "line", data: [162, 174, 186, 197, 209, 223], color: "#2b2b2b" },
        { name: "Reforma de oferta", type: "line", data: [162, 168, 174, 180, 186, 193], color: "#f3c400" }
      ],
      min: 150,
      max: 230
    },
    28: {
      title: "Grafico 28. Sobrecarga de coste en 2035",
      subtitle: "Comparacion entre escenario base y reforma",
      unit: "%",
      x: ["Status quo", "Reforma de oferta"],
      series: [{ name: "Inquilinos >40% renta", data: [45, 31], color: "#7f5b00" }],
      min: 0,
      max: 50
    },
    29: {
      title: "Grafico 29. Deficit habitacional proyectado",
      subtitle: "Acumulacion de deficit de viviendas hasta 2035",
      unit: "viviendas",
      x: ["2025", "2027", "2029", "2031", "2033", "2035"],
      series: [
        { name: "Status quo", data: [423000, 470000, 519000, 568000, 618000, 671000], color: "#2b2b2b" },
        { name: "Reforma de oferta", data: [423000, 439000, 451000, 459000, 463000, 466000], color: "#f3c400" }
      ],
      min: 350000,
      max: 700000
    },
    30: {
      title: "Grafico 30. Sintesis final de impacto",
      subtitle: "Reduccion estimada de tensiones de acceso bajo reforma integral",
      orientation: "horizontal",
      unit: "%",
      x: ["Menor crecimiento precio compra", "Menor crecimiento alquiler", "Menor sobrecarga", "Menor deficit habitacional"],
      series: [{ name: "Mejora relativa", data: [12, 23, 31, 30], color: "#f3c400" }],
      min: 0,
      max: 40
    }
  };

  const table1 = {
    ...baseMeta,
    title: "Tabla 1. Medidas de politica de vivienda evaluadas",
    subtitle: "Resumen comparado de instrumentos y efecto esperado",
    renderAs: "table",
    tableColumns: ["Instrumento", "Canal principal", "Riesgo"],
    tableRows: [
      ["Control general de alquiler", "Contencion nominal a corto plazo", "Reduccion de oferta formal"],
      ["Aceleracion de licencias", "Mayor flujo de vivienda nueva", "Capacidad administrativa"],
      ["Activacion de suelo", "Aumento de stock edificable", "Plazos de transformacion"],
      ["Incentivos al alquiler estable", "Aumento de oferta profesional", "Coste fiscal"]
    ]
  };

  const charts = Object.fromEntries(
    figures.map((fig, index) => {
      const id = `f${String(index + 1).padStart(2, "0")}`;
      if (fig.label === "Tabla 1") {
        return [id, table1];
      }
      const n = Number(fig.label.replace(/[^0-9]/g, ""));
      return [id, { ...baseMeta, ...chartByNumber[n] }];
    })
  );

  window.REPORT_DATA = {
    meta: {
      title: "Radiografia del mercado de la vivienda en Espana",
      lead:
        "Version interactiva del informe con series reconstruidas visualmente para explicar tensiones de precios, oferta y accesibilidad.",
      reportUrl: "https://hesperides.edu.es/informes/radiografia-mercado-vivienda-espana",
      pdfUrl: "https://hesperides.edu.es/documentos_pdf/radiografia-mercado-vivienda-espana.pdf",
      caveat:
        "Los datos se han estimado visualmente a partir de los graficos del informe original para esta iteracion interactiva."
    },
    metrics: [
      { kpi: "30", label: "Graficos interactivos" },
      { kpi: "1", label: "Tabla interactiva" },
      { kpi: "423k", label: "Deficit habitacional base" },
      { kpi: "39,4%", label: "Sobrecarga en inquilinos" }
    ],
    chapters: [
      { id: "resumen-ejecutivo", title: "Resumen ejecutivo", charts: [] },
      { id: "introduccion", title: "Introducción: Una radiografía (breve)", charts: [] },
      { id: "sec-11", title: "1.1 La situación en el segmento de la compraventa", charts: makeIds("f", 1, 3) },
      { id: "sec-12", title: "1.2. La situación del mercado del alquiler", charts: makeIds("f", 4, 6) },
      { id: "sec-13", title: "1.3. El coste de pagar el alquiler", charts: makeIds("f", 7, 8) },
      { id: "sec-14", title: "1.4. Los jóvenes, los más perjudicados", charts: makeIds("f", 9, 10) },
      { id: "sec-15", title: "1.5. El precio de los alquileres: una subida sin freno", charts: makeIds("f", 11, 13) },
      { id: "sec-21", title: "2.1. La heterogeneidad regional", charts: makeIds("f", 14, 16) },
      { id: "sec-22", title: "2.2. El impulso demográfico hace crecer la demanda", charts: makeIds("f", 17, 18) },
      {
        id: "sec-23",
        title: "2.3. El problema por el lado de la oferta: sin suelo y con costes crecientes",
        charts: makeIds("f", 19, 21)
      },
      { id: "sec-24", title: "2.4. Oferta y demanda influyen en el precio", charts: makeIds("f", 22, 24) },
      { id: "sec-31", title: "3.1. La evidencia sobre la regulación de los alquileres", charts: makeIds("f", 25, 28) },
      { id: "sec-32", title: "3.2. El impacto del alquiler vacacional en los precios de la vivienda", charts: makeIds("f", 29, 31) },
      { id: "conclusiones", title: "Conclusiones y recomendaciones de política económica", charts: [] },
      { id: "bibliografia", title: "Bibliografía", charts: [] }
    ],
    charts,
    text: {
      sourcePath: "extracted_text/radiografia_mercado_vivienda_espana.txt",
      ranges: [
        {
          chapterId: "resumen-ejecutivo",
          start: "Resumen ejecutivo",
          end: "Introducción: Una radiografía (breve)"
        },
        {
          chapterId: "introduccion",
          start: "Introducción: Una radiografía (breve)",
          end: "1.1 La situación en el segmento de la compraventa"
        },
        {
          chapterId: "sec-11",
          start: "1.1 La situación en el segmento de la compraventa",
          end: "1.2. La situación del mercado del alquiler"
        },
        {
          chapterId: "sec-12",
          start: "1.2. La situación del mercado del alquiler",
          end: "1.3. El coste de pagar el alquiler"
        },
        {
          chapterId: "sec-13",
          start: "1.3. El coste de pagar el alquiler",
          end: "1.4. Los jóvenes, los más perjudicados"
        },
        {
          chapterId: "sec-14",
          start: "1.4. Los jóvenes, los más perjudicados",
          end: "1.5. El precio de los alquileres: una subida sin freno"
        },
        {
          chapterId: "sec-15",
          start: "1.5. El precio de los alquileres: una subida sin freno",
          end: "2.1. La heterogeneidad regional"
        },
        {
          chapterId: "sec-21",
          start: "2.1. La heterogeneidad regional",
          end: "2.2. El impulso demográfico hace crecer la demanda"
        },
        {
          chapterId: "sec-22",
          start: "2.2. El impulso demográfico hace crecer la demanda",
          end: "2.3. El problema por el lado de la oferta: sin suelo y con cos"
        },
        {
          chapterId: "sec-23",
          start: "2.3. El problema por el lado de la oferta: sin suelo y con cos",
          end: "2.4. Oferta y demanda influyen en el precio"
        },
        {
          chapterId: "sec-24",
          start: "2.4. Oferta y demanda influyen en el precio",
          end: "3.1. La evidencia sobre la regulación de los alquileres"
        },
        {
          chapterId: "sec-31",
          start: "3.1. La evidencia sobre la regulación de los alquileres",
          end: "3.2. El impacto del alquiler vacacional en los precios de la"
        },
        {
          chapterId: "sec-32",
          start: "3.2. El impacto del alquiler vacacional en los precios de la",
          end: "Conclusiones y recomendaciones de"
        },
        {
          chapterId: "conclusiones",
          start: "Conclusiones y recomendaciones de",
          end: "Bibliografía"
        },
        {
          chapterId: "bibliografia",
          start: "Bibliografía"
        }
      ]
    },
    playgroundIntro:
      "Simuladores de accesibilidad y oferta para probar de forma interactiva los mecanismos que explican precios, alquiler y deficit habitacional.",
    playgrounds: [
      {
        id: "accesibilidad-compra",
        title: "Simulador de accesibilidad de compra",
        description:
          "Calcula cuota hipotecaria, esfuerzo de pago y senal de incentivo de oferta segun precio, financiacion y renta del hogar comprador.",
        methodology:
          "Base: Graficos 4, 5, 6 y 24. Se usa una hipoteca de amortizacion francesa sobre el valor neto financiado y se compara la cuota con la renta mensual del hogar.",
        methodologyShort:
          "Hipoteca francesa simplificada + esfuerzo cuota/renta para aproximar accesibilidad y senal de oferta.",
        controls: [
          {
            id: "precio_m2",
            label: "Precio de compraventa",
            type: "range",
            min: 1800,
            max: 5000,
            step: 10,
            value: 3200,
            display: (value, h) => `${h.formatInt(value)} EUR/m2`
          },
          {
            id: "superficie",
            label: "Superficie de la vivienda",
            type: "range",
            min: 50,
            max: 120,
            step: 1,
            value: 80,
            display: (value, h) => `${h.formatInt(value)} m2`
          },
          {
            id: "entrada",
            label: "Entrada inicial",
            type: "range",
            min: 10,
            max: 40,
            step: 1,
            value: 20,
            display: (value, h) => `${h.formatInt(value)}%`
          },
          {
            id: "tipo",
            label: "Tipo hipotecario",
            type: "range",
            min: 1,
            max: 7,
            step: 0.1,
            value: 3.2,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "plazo",
            label: "Plazo del prestamo",
            type: "range",
            min: 15,
            max: 35,
            step: 1,
            value: 30,
            display: (value, h) => `${h.formatInt(value)} anos`
          },
          {
            id: "renta_mensual",
            label: "Renta neta mensual del hogar",
            type: "range",
            min: 1400,
            max: 5000,
            step: 50,
            value: 2500,
            display: (value, h) => `${h.formatInt(value)} EUR/mes`
          }
        ],
        compute: (state, h) => {
          const precioTotal = state.precio_m2 * state.superficie;
          const principal = precioTotal * (1 - state.entrada / 100);
          const monthlyRate = state.tipo / 100 / 12;
          const n = state.plazo * 12;
          const cuota =
            monthlyRate <= 0
              ? principal / n
              : (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

          const esfuerzo = (cuota / state.renta_mensual) * 100;
          const margenPromotor = h.clamp(7 + (state.precio_m2 - 3200) / 220 - (state.tipo - 3.2) * 1.1, -2, 18);
          const iniciosTeoricos = h.clamp(2.7 + (margenPromotor - 7) * 0.12 - (esfuerzo - 39) * 0.03, 0.5, 6);
          const senal = h.clamp(((50 - esfuerzo) / 30) * 100, 0, 100);
          const color = esfuerzo < 30 ? "var(--status-good)" : esfuerzo < 40 ? "var(--status-warn)" : "var(--status-bad)";

          const narrativa =
            esfuerzo < 30
              ? "El esfuerzo hipotecario se mantiene en rango saludable para primer acceso."
              : esfuerzo < 40
                ? "La accesibilidad es fragil: pequenos cambios de tipo o precio tensionan rapidamente la demanda."
                : "El esfuerzo de compra es elevado y limita el acceso de hogares de entrada.";

          return {
            kpis: [
              { value: `${h.formatInt(Math.round(precioTotal))} EUR`, desc: "Precio total de la vivienda" },
              { value: `${h.formatInt(Math.round(cuota))} EUR/mes`, desc: "Cuota hipotecaria estimada" },
              { value: `${h.formatNumber(esfuerzo, 2)}%`, desc: "Cuota sobre renta mensual del hogar", color },
              { value: `${h.formatNumber(margenPromotor, 2)}%`, desc: "Margen promotor estimado" },
              { value: `${h.formatNumber(iniciosTeoricos, 2)} / 1.000`, desc: "Inicios teoricos de vivienda" }
            ],
            thermometer: {
              value: senal,
              color,
              ariaLabel: "Indice de accesibilidad de compra"
            },
            narrative: narrativa,
            note:
              "No incorpora fiscalidad, gastos de cierre ni heterogeneidad territorial; sirve para comparar sensibilidad entre supuestos."
          };
        }
      },
      {
        id: "oferta-deficit",
        title: "Simulador de oferta y deficit 2035",
        description:
          "Relaciona nueva oferta anual, plazos de maduracion y formacion de hogares con el deficit acumulado y la tension del alquiler.",
        methodology:
          "Base: Graficos 25, 27, 28 y 29. Se parte del deficit 2035 en status quo y se aplica una reduccion proporcional a oferta adicional efectiva ajustada por maduracion.",
        methodologyShort:
          "Reduccion del deficit proyectado por oferta efectiva anual ajustada por plazos y sensibilidad de precios.",
        controls: [
          {
            id: "viviendas_adicionales",
            label: "Oferta adicional anual por reformas",
            type: "range",
            min: 0,
            max: 80000,
            step: 1000,
            value: 47000,
            display: (value, h) => `${h.formatInt(value)} viviendas/ano`
          },
          {
            id: "maduracion",
            label: "Anos de maduracion de la oferta",
            type: "range",
            min: 2,
            max: 10,
            step: 1,
            value: 5,
            display: (value, h) => `${h.formatInt(value)} anos`
          },
          {
            id: "hogares_nuevos",
            label: "Nuevos hogares anuales",
            type: "range",
            min: 90000,
            max: 180000,
            step: 1000,
            value: 130000,
            display: (value, h) => `${h.formatInt(value)} hogares/ano`
          },
          {
            id: "elasticidad_precio",
            label: "Elasticidad precio respecto al deficit",
            type: "range",
            min: 0.1,
            max: 1,
            step: 0.05,
            value: 0.45,
            display: (value, h) => h.formatNumber(value, 2)
          }
        ],
        compute: (state, h) => {
          const maturityFactor = h.clamp((11 - state.maduracion) / 6, 0.35, 1.5);
          const deficit2035 = h.clamp(
            671000 - state.viviendas_adicionales * 4.35 * maturityFactor + (state.hogares_nuevos - 130000) * 2.4,
            350000,
            900000
          );

          const reduccion = 671000 - deficit2035;
          const alquiler2035 = h.clamp(
            223 - (reduccion / 12000) * (0.8 + state.elasticidad_precio),
            170,
            240
          );
          const sobrecarga2035 = h.clamp(
            45 - (reduccion / 16000) * (0.7 + state.elasticidad_precio),
            20,
            55
          );
          const impactoRelativo = h.clamp((reduccion / 671000) * 100, -20, 55);
          const senal = h.clamp(((55 - sobrecarga2035) / 35) * 100, 0, 100);
          const color = sobrecarga2035 < 33 ? "var(--status-good)" : sobrecarga2035 < 40 ? "var(--status-warn)" : "var(--status-bad)";

          const narrativa =
            sobrecarga2035 < 33
              ? "La reforma de oferta reduce de forma visible tension de alquiler y deficit acumulado."
              : sobrecarga2035 < 40
                ? "La mejora existe, pero todavia persiste un mercado tensionado en zonas de mayor demanda."
                : "Con estos supuestos, el ajuste de oferta no basta para contener la sobrecarga de costes.";

          return {
            kpis: [
              { value: `${h.formatInt(Math.round(deficit2035))}`, desc: "Deficit habitacional proyectado en 2035" },
              { value: `${h.formatNumber(alquiler2035, 1)}`, desc: "Indice de alquiler proyectado (2035)" },
              { value: `${h.formatNumber(sobrecarga2035, 1)}%`, desc: "Sobrecarga de alquiler proyectada", color },
              { value: `${h.formatNumber(impactoRelativo, 1)}%`, desc: "Reduccion relativa del deficit vs status quo" }
            ],
            thermometer: {
              value: senal,
              color,
              ariaLabel: "Senal de alivio del mercado de alquiler"
            },
            narrative: narrativa,
            note:
              "La traduccion de oferta a precios es simplificada: sirve para comparar ordenes de magnitud entre escenarios de politica."
          };
        }
      }
    ],
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/documentos_pdf/radiografia-mercado-vivienda-espana.pdf"
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/radiografia-mercado-vivienda-espana"
      },
      "Nota metodologica: series reconstruidas visualmente para habilitar navegacion interactiva grafico a grafico."
    ]
  };
})();
