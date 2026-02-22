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
    { label: "Grafico 30", page: 40 },
  ];

  const years = ["2007", "2009", "2011", "2013", "2014", "2016", "2018", "2020", "2022", "2023"];
  const ccaa = [
    "Canarias",
    "Madrid",
    "Andalucia",
    "Cataluna",
    "C. Valenciana",
    "Murcia",
    "Aragon",
    "Baleares",
    "Galicia",
    "Pais Vasco",
    "Castilla y Leon",
    "Extremadura",
    "Castilla-La Mancha",
    "Asturias",
    "La Rioja",
    "Navarra",
    "Cantabria",
  ];

  const baseMeta = {
    source: "Radiografia del mercado de la vivienda en Espana (2025)",
    sourceUrl:
      "https://hesperides.edu.es/documentos_pdf/radiografia-mercado-vivienda-espana.pdf",
    exactness: "reconstruida visualmente",
  };

  const chartByNumber = {
    1: {
      title: "Grafico 1. La vivienda vuelve a ser un lujo en Espana",
      subtitle: "Porcentaje de encuestados sobre derechos garantizados",
      orientation: "horizontal",
      unit: "%",
      x: [
        "Acceso a vivienda digna",
        "Vivir en medioambiente",
        "Inclusion y autonomia",
        "Derechos consumidores",
        "Acceso a cultura",
        "Proteccion infancia",
        "Proteccion salud",
        "Educacion publica",
      ],
      stack: "g1",
      barBorderRadius: false,
      series: [
        { name: "Garantizados para todas", data: [16, 29, 38, 50, 55, 55, 62, 64], color: "#5a4100" },
        { name: "Solo para algunas", data: [69, 59, 53, 39, 42, 39, 34, 29], color: "#b08a10" },
        { name: "No garantizados", data: [14, 10, 8, 8, 3, 7, 4, 7], color: "#f3c400" },
      ],
      min: 0,
      max: 100,
      height: 420,
    },
    2: {
      title: "Grafico 2. Los precios de la vivienda se han disparado en la ultima decada",
      subtitle: "Evolucion del precio de la vivienda en terminos nominales y reales",
      type: "line",
      unit: "indice",
      x: years,
      showLegend: true,
      series: [
        { name: "Nominal", type: "line", data: [100, 92, 84, 65, 65, 71, 80, 85, 90, 98.5], color: "#f3c400", smooth: false },
        { name: "Real", type: "line", data: [100, 90, 76, 57, 57, 62, 68, 73, 73.5, 72.8], color: "#7f5b00", smooth: false },
      ],
      min: 55,
      max: 102,
      height: 360,
    },
    3: {
      title: "Grafico 3. Desaparece la vivienda nueva en Espana",
      subtitle: "Evolucion de transacciones inmobiliarias por tipo de vivienda",
      type: "line",
      unit: "M",
      x: ["2006", "2008", "2010", "2012", "2014", "2016", "2018", "2020", "2021", "2022", "2023"],
      showLegend: true,
      series: [
        { name: "Total", type: "line", data: [900, 830, 470, 500, 360, 310, 420, 520, 600, 580, 638.6], color: "#f3c400", smooth: false },
        { name: "Segunda mano", type: "line", data: [550, 430, 230, 220, 250, 240, 300, 350, 520, 510, 578.3], color: "#7f5b00", smooth: false },
        { name: "Nueva", type: "line", data: [420, 430, 240, 180, 130, 60, 55, 55, 60, 65, 60.3], color: "#2b2b2b", smooth: false },
      ],
      min: 0,
      max: 950,
      height: 370,
    },
    4: {
      title: "Grafico 4. La vivienda es cada vez mas inaccesible en Espana",
      subtitle: "Evolucion del indice de accesibilidad a la vivienda",
      type: "line",
      unit: "%",
      x: ["2014T1", "2015T2", "2016T3", "2017T2", "2018T4", "2019T4", "2020T2", "2021T2", "2022T2", "2023T3"],
      zeroLine: true,
      showLegend: false,
      series: [
        {
          name: "Zona positiva",
          type: "line",
          data: [-2.0, 10.2, 12.4, 8.5, 2.0, 0.6, null, 2.0, null, null],
          color: "rgba(243,196,0,0.01)",
          areaStyle: { color: "rgba(243, 196, 0, 0.15)" },
          smooth: false,
          symbol: "none",
          lineStyle: { opacity: 0 },
          excludeFromLegend: true,
          tooltip: { show: false },
        },
        {
          name: "Zona negativa",
          type: "line",
          data: [null, null, null, null, null, null, -9.7, null, -15.0, -32.2],
          color: "rgba(243,196,0,0.01)",
          areaStyle: { color: "rgba(214, 109, 109, 0.20)" },
          smooth: false,
          symbol: "none",
          lineStyle: { opacity: 0 },
          excludeFromLegend: true,
          tooltip: { show: false },
        },
        { name: "Indice accesibilidad", type: "line", data: [-2.0, 10.2, 12.4, 8.5, 2.0, 0.6, -9.7, 2.0, -15.0, -32.2], color: "#f3c400", smooth: false },
      ],
      min: -34,
      max: 15,
      height: 360,
    },
    5: {
      title: "Grafico 5. El alquiler gana terreno en Espana",
      subtitle: "Evolucion del tipo de tenencia de vivienda",
      type: "line",
      unit: "%",
      x: ["2004", "2006", "2008", "2010", "2012", "2014", "2016", "2018", "2020", "2022"],
      showLegend: true,
      series: [
        { name: "Propiedad", type: "line", data: [79.3, 79.8, 79.0, 78.5, 77.9, 77.0, 76.5, 76.0, 75.5, 75.1], color: "#f3c400", smooth: false },
        { name: "Alquiler mercado", type: "line", data: [10.0, 11.0, 12.2, 13.0, 14.0, 14.8, 15.2, 15.4, 15.2, 15.4], color: "#7f5b00", smooth: false },
        { name: "Alquiler inferior mercado", type: "line", data: [6.3, 6.1, 5.9, 5.7, 5.5, 5.5, 5.6, 5.8, 5.9, 6.1], color: "#b08a10", smooth: false },
        { name: "Cesion", type: "line", data: [3.1, 3.0, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.4, 2.3], color: "#2b2b2b", smooth: false },
      ],
      min: 0,
      max: 82,
      height: 360,
    },
    6: {
      title: "Grafico 6. Los jovenes lideran el auge del alquiler en Espana",
      subtitle: "Tenencia en alquiler a precio de mercado por edad",
      type: "line",
      unit: "%",
      x: ["2004", "2006", "2008", "2010", "2012", "2014", "2016", "2018", "2020", "2022"],
      showLegend: true,
      series: [
        { name: "Total", type: "line", data: [37.0, 25.0, 33.0, 36.0, 40.0, 38.0, 47.0, 44.0, 48.0, 48.7], color: "#b08a10", smooth: false },
        { name: "De 16 a 29 anos", type: "line", data: [9.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 13.5, 13.4], color: "#f3c400", smooth: false },
        { name: "De 30 a 44 anos", type: "line", data: [15.0, 16.0, 17.0, 20.0, 22.0, 25.0, 28.0, 27.0, 28.5, 29.6], color: "#7f5b00", smooth: false },
        { name: "De 45 a 64 anos", type: "line", data: [5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.5], color: "#d6a900", smooth: false },
        { name: "65 y mas anos", type: "line", data: [0.4, 0.3, 0.2, 0.5, 0.8, 1.5, 2.0, 2.5, 3.8, 4.9], color: "#2b2b2b", smooth: false },
      ],
      min: 0,
      max: 50,
      height: 360,
    },
    7: {
      title: "Grafico 7. Los hogares espanoles deben hacer el mayor esfuerzo para pagar alquiler",
      subtitle: "Hogares que destinan mas del 40% de la renta a vivienda",
      unit: "%",
      x: ["Espana", "Italia", "Francia", "UE-27", "Alemania"],
      barBorderRadius: false,
      series: [
        { name: "Hogares que alquilan", data: [39.4, 25.9, 21.8, 20.8, 13.7], color: "#7f5b00" },
        { name: "Hogares sin hipoteca", data: [3.2, 2.1, 0.6, 4.3, 12.9], color: "#f3c400" },
      ],
      min: 0,
      max: 45,
      height: 360,
    },
    8: {
      title: "Grafico 8. Los hogares espanoles soportan un mayor esfuerzo para pagar alquiler",
      subtitle: "Renta mediana que se destina al gasto en vivienda de alquiler",
      type: "line",
      unit: "%",
      x: ["<20", "20-40", "40-60", "60-80", "80-90", ">90"],
      showLegend: true,
      series: [
        { name: "Alemania", type: "line", data: [32, 21, 17, 13, 11, 8], color: "#7f5b00", smooth: false },
        { name: "Italia", type: "line", data: [27, 18, 14, 11, 9, 7], color: "#b08a10", smooth: false },
        { name: "Francia", type: "line", data: [24, 16, 13, 10, 8, 6.5], color: "#2b2b2b", smooth: false },
        { name: "Espana", type: "line", data: [43, 24, 18, 15, 13.5, 11], color: "#f3c400", smooth: false },
        { name: "UE-27", type: "line", data: [22, 15, 12, 9, 8, 7], color: "#d6a900", smooth: false },
      ],
      min: 0,
      max: 45,
      height: 360,
    },
    9: {
      title: "Grafico 9. Alquiler y pobreza: un vinculo preocupante",
      subtitle: "Pobreza o exclusion social en hogares de alquiler (UE, 2022)",
      unit: "%",
      x: [
        "Grecia", "Espana", "Bulgaria", "Lituania", "Portugal", "Rumania", "Italia", "Letonia", "Chipre",
        "Francia", "Croacia", "Irlanda", "Estonia", "UE-27", "Polonia", "Austria", "Suecia", "Hungria",
        "Alemania", "Paises Bajos", "Chequia", "Finlandia", "Eslovaquia", "Dinamarca", "Malta"
      ],
      xLabelRotate: 64,
      xLabelFontSize: 9,
      noWrapLabels: true,
      showLegend: false,
      series: [
        {
          name: "Pobreza en alquiler",
          data: [44.8, 43.0, 40.5, 38.0, 36.5, 35.0, 33.0, 32.5, 32.2, 31.5, 31.0, 30.8, 30.2, 29.7, 29.2, 28.8, 27.6, 26.9, 25.5, 24.1, 22.9, 21.8, 20.0, 18.2, 15.0],
          itemStyle: {
            color: (params) => ((["Espana", "UE-27"].includes(params.name) ? (params.name === "Espana" ? "#f3c400" : "#b08a10") : "#f8e8a6")),
          },
        },
      ],
      min: 0,
      max: 48,
      height: 430,
    },
    10: {
      title: "Grafico 10. Jovenes espanoles: atrapados en casa de sus padres",
      subtitle: "Poblacion de 18-34 anos que vive con sus padres",
      type: "line",
      unit: "%",
      x: ["2004", "2006", "2008", "2010", "2012", "2014", "2016", "2018", "2020", "2022", "2023"],
      showLegend: false,
      series: [{ name: "Espana", type: "line", data: [51.4, 55.8, 55.0, 52.0, 53.8, 55.0, 58.0, 61.2, 64.0, 65.6, 65.4], color: "#f3c400", smooth: false }],
      min: 50,
      max: 66.5,
      height: 360,
    },
    11: {
      title: "Grafico 11. Los jovenes lo tienen mas dificil para independizarse en Espana",
      subtitle: "Jovenes de 18-34 anos que viven con sus padres en la UE",
      unit: "%",
      x: [
        "Croacia", "Eslovaquia", "Grecia", "Bulgaria", "Portugal", "Espana", "Italia", "Polonia", "Rumania",
        "Eslovenia", "Irlanda", "Belgica", "Francia", "Austria", "Alemania", "Paises Bajos", "Suecia", "Dinamarca",
        "Finlandia", "Luxemburgo", "Malta", "Chequia", "Estonia", "Lituania", "Letonia"
      ],
      xLabelRotate: 64,
      xLabelFontSize: 9,
      noWrapLabels: true,
      showLegend: false,
      series: [
        {
          name: "Porcentaje",
          data: [76, 74, 72, 71, 68, 65.6, 63, 60, 58, 56, 54, 53, 50, 48, 46, 44, 41, 39, 36, 33, 30, 26, 23, 20, 17],
          itemStyle: { color: (params) => (params.name === "Espana" ? "#f3c400" : "#f8e8a6") },
        },
      ],
      min: 0,
      max: 80,
      height: 430,
    },
    12: {
      title: "Grafico 12. Los jovenes cada vez se independizan mas tarde",
      subtitle: "Evolucion de la edad media de emancipacion en Espana",
      type: "line",
      unit: "indice",
      x: ["2000", "2002", "2004", "2006", "2008", "2010", "2012", "2014", "2016", "2018", "2020", "2022", "2023"],
      showLegend: false,
      series: [{ name: "Edad media", type: "line", data: [29.4, 29.2, 28.9, 28.6, 28.4, 28.4, 28.6, 29.0, 29.3, 29.5, 29.6, 30.2, 30.6], color: "#f3c400", smooth: false }],
      min: 28.2,
      max: 30.8,
      yAxisDecimals: 1,
      axisDecimals: 1,
      height: 360,
    },
    13: {
      title: "Grafico 13. Los jovenes espanoles tardan mas en emanciparse que en otros paises de la UE",
      subtitle: "Edad media de emancipacion en paises de la Union Europea (2023)",
      unit: "indice",
      x: ["Croacia", "Eslovaquia", "Grecia", "Espana", "Italia", "Portugal", "Bulgaria", "Rumania", "Polonia", "Francia", "Alemania", "Belgica", "Austria", "Irlanda", "P. Bajos", "Suecia", "Dinamarca", "Finlandia", "Luxemburgo", "Malta", "Chequia", "Estonia", "Lituania", "Letonia"],
      xLabelRotate: 64,
      xLabelFontSize: 9,
      noWrapLabels: true,
      showLegend: false,
      series: [{ name: "Edad", data: [31.0, 30.8, 30.7, 30.6, 29.8, 29.5, 29.2, 28.9, 28.6, 28.4, 27.8, 27.3, 27.0, 26.8, 26.5, 25.9, 25.4, 25.0, 24.4, 24.0, 23.8, 23.0, 22.4, 21.8], itemStyle: { color: (params) => (params.name === "Espana" ? "#f3c400" : "#f8e8a6") } }],
      min: 0,
      max: 32,
      height: 430,
    },
    14: {
      title: "Grafico 14. El precio del alquiler en Espana ha aumentado sin freno desde 2015",
      subtitle: "Variacion de precios de alquiler segun distintos indicadores",
      unit: "%",
      x: ["Precio medio alquiler", "IPC alquileres", "IPVA"],
      barBorderRadius: false,
      zeroLine: true,
      series: [
        { name: "2011-2014", data: [-7.5, -0.3, -5.0], color: "#7f5b00" },
        { name: "2015-2022", data: [24.5, 6.4, 16.0], color: "#f3c400" },
      ],
      min: -10,
      max: 30,
      height: 340,
    },
    15: {
      title: "Grafico 15. Los nuevos hogares crecen por encima del numero de viviendas terminadas",
      subtitle: "Evolucion de la creacion neta de hogares y de las viviendas terminadas",
      type: "line",
      unit: "M",
      x: ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
      series: [
        { name: "Creacion neta de hogares", type: "line", data: [90, 50, 60, 68, 65, 92, 130, 110, 170, 270], color: "#f3c400", smooth: false },
        { name: "Viviendas terminadas", type: "line", data: [70, 54, 52, 47, 55, 63, 78, 90, 95, 97], color: "#7f5b00", smooth: false },
      ],
      min: 40,
      max: 285,
      height: 360,
    },
    16: {
      title: "Grafico 16. Los hogares unipersonales se disparan en Espana ejerciendo presion",
      subtitle: "Evolucion del numero de hogares unipersonales",
      type: "line",
      unit: "M",
      x: ["2014", "2016", "2018", "2020", "2022", "2024", "2028", "2032", "2036"],
      showLegend: true,
      series: [
        { name: "Observado", type: "line", data: [4412, 4620, 4780, 5030, 5400, 5520, null, null, null], color: "#f3c400", smooth: false },
        { name: "Estimacion", type: "line", data: [null, null, null, null, null, 5520, 6260, 7000, 7799], color: "#7f5b00", smooth: false, lineStyle: { type: "dotted" } },
      ],
      min: 4300,
      max: 7900,
      height: 360,
    },
    17: {
      title: "Grafico 17. Las cuatro CCAA con mayor deficit habitacional",
      subtitle: "Deficit de vivienda (2022-2025) por comunidades autonomas",
      unit: "viviendas",
      x: ["Canarias", "Madrid", "Andalucia", "Cataluna", "Murcia", "C. Valenciana", "Pais Vasco", "Aragon", "Galicia", "Extremadura", "Asturias", "Castilla-La Mancha", "Navarra", "La Rioja", "Cantabria", "Castilla y Leon", "Baleares"],
      xLabelRotate: 64,
      xLabelFontSize: 9,
      noWrapLabels: true,
      showLegend: false,
      series: [{ name: "Deficit 2022-2025", data: [82000, 67000, 62000, 62000, 20000, 16000, 15000, 14000, 10000, 8000, 7000, 6500, 4000, 3000, 2500, 2200, 1800], color: "#f3c400" }],
      min: 0,
      max: 86000,
      height: 400,
    },
    18: {
      title: "Grafico 18. El deficit de vivienda afecta mas a unas comunidades que a otras",
      subtitle: "Deficit de vivienda (2024-2025) por comunidades autonomas",
      unit: "viviendas",
      x: ["Canarias", "Madrid", "Andalucia", "Cataluna", "Murcia", "C. Valenciana", "Pais Vasco", "Aragon", "Galicia", "Extremadura", "Asturias", "Castilla-La Mancha", "Navarra", "La Rioja", "Cantabria", "Castilla y Leon", "Baleares"],
      xLabelRotate: 64,
      xLabelFontSize: 9,
      noWrapLabels: true,
      showLegend: false,
      series: [{ name: "Deficit 2024-2025", data: [61000, 54000, 45000, 37000, 19000, 16000, 12000, 10000, 9000, 8500, 5000, 4500, 3000, 2600, 2200, 2000, 1500], color: "#f3c400" }],
      min: 0,
      max: 65000,
      height: 400,
    },
    19: {
      title: "Grafico 19. Espana crece demograficamente por la poblacion extranjera",
      subtitle: "Evolucion de la poblacion por nacionalidad (enero-2022 = 100)",
      type: "line",
      unit: "indice",
      x: ["ene22", "abr22", "jul22", "oct22", "ene23", "abr23", "jul23", "oct23", "ene24", "abr24", "jul24", "oct24"],
      showLegend: false,
      series: [
        { name: "Extranjera", type: "line", data: [100.0, 102.5, 105.1, 108.1, 111.0, 114.0, 116.0, 117.1, 118.2, 119.5, 120.6, 121.7], color: "#7f5b00", smooth: false },
        { name: "Espanola", type: "line", data: [100.0, 100.2, 100.2, 100.2, 100.3, 100.4, 100.5, 100.6, 100.6, 100.7, 100.8, 100.8], color: "#f3c400", smooth: false },
      ],
      min: 99,
      max: 123,
      height: 360,
    },
    20: {
      title: "Grafico 20. El crecimiento urbano se mueve a la periferia",
      subtitle: "Aportacion al crecimiento por nacionalidad y lugar de residencia",
      unit: "indice",
      x: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],
      stack: "g20",
      barBorderRadius: false,
      showLegend: true,
      series: [
        { name: "Espana centro urbano", data: [0.1, 0.2, 0.3, 0.6, 0.7, 0.8, 0.8, 0.8], color: "#6c5400" },
        { name: "Espana periferia urbana", data: [0.2, 0.4, 0.8, 1.1, 1.4, 1.6, 1.8, 2.0], color: "#9b7700" },
        { name: "Espana fuera urbana", data: [0.1, -0.2, -0.4, -0.6, -0.8, -1.1, -1.4, -1.7], color: "#2b2b2b" },
        { name: "Extranjera centro urbano", data: [0.0, 0.1, 0.2, 0.5, 1.0, 1.2, 1.6, 2.7], color: "#f3c400" },
        { name: "Extranjera periferia urbana", data: [0.1, 0.2, 0.2, 0.4, 0.8, 1.0, 1.3, 1.8], color: "#d6a900" },
        { name: "Extranjera fuera urbana", data: [0.0, 0.0, 0.1, 0.2, 0.4, 0.4, 0.4, 0.5], color: "#f8e8a6" },
      ],
      min: -2.2,
      max: 5.2,
      height: 390,
    },
    21: {
      title: "Grafico 21. A mayor crecimiento de la poblacion, mas aumentan los alquileres",
      subtitle: "Relacion entre crecimiento de poblacion y precios de alquiler",
      coordinate: "xy",
      unit: "%",
      xLabel: "Crecimiento de la poblacion",
      yLabel: "Crecimiento en el precio del alquiler",
      xMin: -20,
      xMax: 40,
      min: -15,
      max: 40,
      showLegend: false,
      series: [
        {
          name: "Municipios",
          type: "scatter",
          symbolSize: 5,
          data: [
            [-12, 4], [-10, 7], [-9, 6], [-8, 9], [-7, 10], [-6, 8], [-5, 12], [-4, 9], [-3, 11], [-2, 10],
            [-1, 13], [0, 15], [1, 12], [2, 14], [3, 16], [4, 18], [5, 17], [6, 14], [7, 19], [8, 16],
            [9, 18], [10, 21], [11, 14], [12, 17], [13, 15], [14, 22], [15, 18], [16, 20], [18, 16], [20, 24],
            [22, 18], [24, 29], [28, 23], [32, 25], [35, 24], [5, -12], [18, 4]
          ],
          color: "#f3c400",
        },
        { name: "Tendencia", type: "line", data: [[-20, 5], [40, 29]], color: "#7f5b00", symbol: "none", smooth: false },
      ],
      height: 380,
    },
    22: {
      title: "Grafico 22. Sin suelo no hay vivienda asequible",
      subtitle: "Relacion entre suelo urbano disponible y construccion de vivienda",
      coordinate: "xy",
      unit: "indice",
      xLabel: "Suelo urbano disponible",
      yLabel: "Viviendas construidas por hectarea",
      xMin: 22,
      xMax: 46,
      min: 0,
      max: 5,
      showLegend: false,
      series: [
        {
          name: "Provincias",
          type: "scatter",
          symbolSize: 6,
          data: [
            [24, 2.2], [25, 3.8], [26, 2.3], [27, 1.9], [28, 2.3], [29, 1.0], [29, 1.5], [30, 3.2], [30, 1.8],
            [31, 1.2], [31, 1.0], [32, 2.2], [32, 1.5], [33, 3.3], [33, 1.2], [34, 1.6], [34, 1.0], [35, 2.0],
            [35, 4.5], [36, 1.2], [36, 1.7], [37, 2.9], [37, 1.4], [38, 1.9], [39, 1.1], [39, 1.0], [40, 0.8], [40, 0.7], [41, 1.1], [42, 0.9], [43, 0.4], [44, 0.5], [45, 0.9]
          ],
          color: "#f3c400",
        },
        { name: "Tendencia", type: "line", data: [[22, 2.9], [46, 0.3]], color: "#7f5b00", symbol: "none", smooth: false },
      ],
      height: 380,
    },
    23: {
      title: "Grafico 23. Construccion en Espana: falta mano de obra mientras suben costes de materiales",
      subtitle: "Evolucion de costes de materiales y mano de obra (2020=100)",
      type: "line",
      unit: "indice",
      x: ["ene20", "abr20", "jul20", "oct20", "ene21", "abr21", "jul21", "oct21", "ene22", "abr22", "jul22", "oct22", "ene23"],
      showLegend: true,
      series: [
        { name: "Materiales", type: "line", data: [100, 101, 103, 106, 109, 116, 123, 130, 136, 137, 138, 139, 140], color: "#7f5b00", smooth: false },
        { name: "Mano de obra", type: "line", data: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112], color: "#f3c400", smooth: false },
      ],
      min: 98,
      max: 142,
      height: 360,
    },
    24: {
      title: "Grafico 24. La construccion es el sector con mas vacantes laborales en Espana",
      subtitle: "Evolucion de vacantes por sector (2020T1=100)",
      type: "line",
      unit: "indice",
      x: ["2020T1", "2020T3", "2021T1", "2021T3", "2022T1", "2022T3", "2023T1", "2023T3", "2024T1", "2024T3"],
      showLegend: true,
      series: [
        { name: "Construccion", type: "line", data: [100, 260, 340, 350, 300, 260, 200, 410, 310, 450], color: "#7f5b00", smooth: false },
        { name: "Servicios", type: "line", data: [100, 90, 120, 120, 145, 150, 150, 155, 145, 150], color: "#f3c400", smooth: false },
        { name: "Industria", type: "line", data: [100, 70, 85, 80, 110, 95, 120, 105, 120, 110], color: "#d6a900", smooth: false },
      ],
      min: 50,
      max: 470,
      height: 370,
    },
    25: {
      title: "Grafico 25. Los expertos estan en contra de regular el precio de los alquileres",
      subtitle: "Opinion de expertos sobre aplicar limites al precio del alquiler",
      unit: "%",
      x: ["Totalmente en desacuerdo", "En desacuerdo", "Incierto", "De acuerdo", "Totalmente de acuerdo"],
      showLegend: false,
      barBorderRadius: false,
      series: [{ name: "Porcentaje", data: [52, 43, 4, 1, 0], color: "#f3c400" }],
      min: 0,
      max: 60,
      height: 340,
    },
    26: {
      title: "Grafico 26. El 70% del parque inmobiliario en Espana se destina a la vivienda principal",
      subtitle: "Distribucion del parque inmobiliario segun tipo de vivienda (2021)",
      type: "pie",
      unit: "%",
      donut: true,
      showLegend: false,
      series: [
        {
          name: "Parque inmobiliario",
          label: { show: true, position: "inside", formatter: "{b}\n{d}%" },
          data: [
            { name: "Vivienda principal", value: 69.4, itemStyle: { color: "#f3c400" } },
            { name: "Vivienda secundaria", value: 16.0, itemStyle: { color: "#7f5b00" } },
            { name: "Vivienda vacia", value: 14.6, itemStyle: { color: "#b08a10" } },
          ],
        },
      ],
      height: 420,
    },
    27: {
      title: "Grafico 27. Tres de cada cuatro hogares espanoles viven en una casa en propiedad",
      subtitle: "Distribucion de viviendas principales por tipo de tenencia (2021)",
      type: "pie",
      unit: "%",
      donut: true,
      showLegend: false,
      series: [
        {
          name: "Tenencia",
          label: { show: true, position: "inside", formatter: "{b}\n{d}%" },
          data: [
            { name: "En propiedad", value: 75.5, itemStyle: { color: "#f3c400" } },
            { name: "En alquiler", value: 16.1, itemStyle: { color: "#7f5b00" } },
            { name: "Otro regimen de tenencia", value: 8.4, itemStyle: { color: "#b08a10" } },
          ],
        },
      ],
      height: 420,
    },
    28: {
      title: "Grafico 28. Las viviendas secundarias se ubican en los municipios pequenos",
      subtitle: "Porcentaje de viviendas secundarias segun tamano del municipio",
      unit: "%",
      x: ["Municipios grandes", "Area metropolitana", "Municipios medianos", "Municipios pequenos"],
      showLegend: false,
      series: [{ name: "Vivienda secundaria", data: [9.2, 10.9, 16.8, 19.2], color: "#f3c400" }],
      min: 0,
      max: 21,
      height: 340,
    },
    29: {
      title: "Grafico 29. El alquiler turistico es mayor en ciudades costeras y minimo en grandes urbes",
      subtitle: "Vivienda turistica sobre alquiler en centros urbanos y periferias",
      unit: "%",
      x: ["Vitoria", "Sevilla", "Malaga", "Valladolid", "Madrid", "Cordoba", "Palma", "Bilbao", "Coruna", "Valencia", "Oviedo", "Burgos", "Vigo", "Alicante", "Santander", "Cadiz", "Gijon", "Las Palmas", "Barcelona", "Murcia"],
      xLabelRotate: 64,
      xLabelFontSize: 9,
      noWrapLabels: true,
      showLegend: true,
      barBorderRadius: false,
      series: [
        { name: "Centro area urbana", data: [2, 1, 3, 1, 2, 2, 4, 5, 3, 4, 2, 3, 5, 7, 8, 9, 10, 12, 22, 63], color: "#7f5b00" },
        { name: "Periferia area urbana", data: [5, 3, 24, 3, 4, 5, 6, 4, 7, 10, 3, 4, 27, 7, 28, 10, 24, 7, 52, 55], color: "#f3c400" },
      ],
      min: 0,
      max: 68,
      height: 430,
    },
    30: {
      title: "Grafico 30. Barcelona y el fracaso de la restriccion de vivienda turistica",
      subtitle: "Precio del alquiler y viviendas turisticas (agosto-2020=100)",
      type: "line",
      unit: "indice",
      x: ["2020", "2021", "2022", "2023", "2024"],
      showLegend: false,
      series: [
        { name: "Precio m2", type: "line", data: [100, 92, 100, 120, 137.6], color: "#7f5b00", smooth: false },
        { name: "Vivienda turistica", type: "line", data: [100, 85, 70, 45, 57], color: "#f3c400", smooth: false },
      ],
      min: 40,
      max: 142,
      height: 360,
    },
  };

  const table1 = {
    ...baseMeta,
    title: "Tabla 1. La evidencia sugiere que regular los precios de los alquileres no es una buena idea",
    subtitle: "Resumen del efecto de la regulacion de alquileres segun evidencia empirica",
    renderAs: "table",
    tableColumns: ["Tipo de efecto", "Efecto descrito"],
    tableRows: [
      [
        "Precios",
        "La regulacion de alquileres tiende a reducir los precios regulados pero aumenta los precios en viviendas no reguladas por presion de demanda.",
      ],
      [
        "Movilidad",
        "La movilidad residencial disminuye de forma significativa porque los inquilinos tienden a mantenerse en viviendas reguladas.",
      ],
      [
        "Oferta",
        "Reduce la oferta en alquiler: propietarios cambian el uso del inmueble o retiran vivienda del mercado.",
      ],
      [
        "Calidad",
        "La calidad de las viviendas reguladas suele deteriorarse por menor incentivo a mantenimiento y mejoras.",
      ],
    ],
    tableHighlightFirstRow: false,
  };

  const charts = Object.fromEntries(
    figures.map((fig, index) => {
      const id = `f${String(index + 1).padStart(2, "0")}`;
      if (fig.label === "Tabla 1") {
        return [id, table1];
      }
      const n = Number(fig.label.replace(/[^0-9]/g, ""));
      return [id, { ...baseMeta, ...chartByNumber[n] }];
    }),
  );

  window.REPORT_DATA = {
    meta: {
      title: "Radiografia del mercado de la vivienda en Espana",
      lead: "Version interactiva del informe con series reconstruidas visualmente para explicar tensiones de precios, oferta y accesibilidad.",
      reportUrl:
        "https://hesperides.edu.es/informes/radiografia-mercado-vivienda-espana",
      pdfUrl:
        "https://hesperides.edu.es/documentos_pdf/radiografia-mercado-vivienda-espana.pdf",
      caveat:
        "Los datos se han estimado visualmente a partir de los graficos del informe original para esta iteracion interactiva.",
      keyFinding: {
        kpi: "8,3 anos",
        text: "De salario integro para ahorrar la entrada de un piso medio",
      },
      contentBadge: "30 graficos · 1 tabla",
    },
    metrics: [
      { kpi: "423.000", label: "Deficit habitacional estimado" },
      { kpi: "39,4%", label: "Hogares inquilinos con sobrecarga" },
      { kpi: "+53%", label: "Precio vivienda vs +28% IPC (2013–2025)" },
      { kpi: "8,3 anos", label: "Salario para ahorrar entrada de un piso" },
    ],
    chapters: [
      { id: "resumen-ejecutivo", title: "Resumen ejecutivo", charts: [] },
      {
        id: "primera-parte",
        title:
          "Primera parte: Introducción: Una radiografía (breve) del mercado de la vivienda",
        charts: makeIds("f", 1, 14),
      },
      {
        id: "segunda-parte",
        title: "Segunda parte: Determinantes del aumento de los precios",
        charts: makeIds("f", 15, 24),
      },
      {
        id: "tercera-parte",
        title:
          "Tercera parte: Los chivos expiatorios: regulación de los precios del alquiler",
        charts: makeIds("f", 25, 31),
      },
      {
        id: "cuarta-parte",
        title:
          "Cuarta parte: Conclusiones y recomendaciones de política económica",
        charts: [],
      },
      { id: "bibliografia", title: "Bibliografía", charts: [] },
    ],
    charts,
    text: {
      sourcePath: "extracted_text/radiografia_mercado_vivienda_espana.txt",
      ranges: [
        {
          chapterId: "resumen-ejecutivo",
          start: "Resumen ejecutivo",
          end: "Primera parte",
        },
        {
          chapterId: "primera-parte",
          start: "Primera parte",
          end: "Segunda parte",
        },
        {
          chapterId: "segunda-parte",
          start: "Segunda parte",
          end: "Tercera parte",
        },
        {
          chapterId: "tercera-parte",
          start: "Tercera parte",
          end: "Cuarta parte",
        },
        {
          chapterId: "cuarta-parte",
          start: "Cuarta parte",
          end: "Bibliografía",
        },
        {
          chapterId: "bibliografia",
          start: "Bibliografía",
        },
      ],
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
            display: (value, h) => `${h.formatInt(value)} EUR/m2`,
          },
          {
            id: "superficie",
            label: "Superficie de la vivienda",
            type: "range",
            min: 50,
            max: 120,
            step: 1,
            value: 80,
            display: (value, h) => `${h.formatInt(value)} m2`,
          },
          {
            id: "entrada",
            label: "Entrada inicial",
            type: "range",
            min: 10,
            max: 40,
            step: 1,
            value: 20,
            display: (value, h) => `${h.formatInt(value)}%`,
          },
          {
            id: "tipo",
            label: "Tipo hipotecario",
            type: "range",
            min: 1,
            max: 7,
            step: 0.1,
            value: 3.2,
            display: (value, h) => `${h.formatNumber(value)}%`,
          },
          {
            id: "plazo",
            label: "Plazo del prestamo",
            type: "range",
            min: 15,
            max: 35,
            step: 1,
            value: 30,
            display: (value, h) => `${h.formatInt(value)} anos`,
          },
          {
            id: "renta_mensual",
            label: "Renta neta mensual del hogar",
            type: "range",
            min: 1400,
            max: 5000,
            step: 50,
            value: 2500,
            display: (value, h) => `${h.formatInt(value)} EUR/mes`,
          },
        ],
        compute: (state, h) => {
          const precioTotal = state.precio_m2 * state.superficie;
          const principal = precioTotal * (1 - state.entrada / 100);
          const monthlyRate = state.tipo / 100 / 12;
          const n = state.plazo * 12;
          const cuota =
            monthlyRate <= 0
              ? principal / n
              : (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
                (Math.pow(1 + monthlyRate, n) - 1);

          const esfuerzo = (cuota / state.renta_mensual) * 100;
          const margenPromotor = h.clamp(
            7 + (state.precio_m2 - 3200) / 220 - (state.tipo - 3.2) * 1.1,
            -2,
            18,
          );
          const iniciosTeoricos = h.clamp(
            2.7 + (margenPromotor - 7) * 0.12 - (esfuerzo - 39) * 0.03,
            0.5,
            6,
          );
          const senal = h.clamp(((50 - esfuerzo) / 30) * 100, 0, 100);
          const color =
            esfuerzo < 30
              ? "var(--status-good)"
              : esfuerzo < 40
                ? "var(--status-warn)"
                : "var(--status-bad)";

          const narrativa =
            esfuerzo < 30
              ? "El esfuerzo hipotecario se mantiene en rango saludable para primer acceso."
              : esfuerzo < 40
                ? "La accesibilidad es fragil: pequenos cambios de tipo o precio tensionan rapidamente la demanda."
                : "El esfuerzo de compra es elevado y limita el acceso de hogares de entrada.";

          return {
            kpis: [
              {
                value: `${h.formatInt(Math.round(precioTotal))} EUR`,
                desc: "Precio total de la vivienda",
              },
              {
                value: `${h.formatInt(Math.round(cuota))} EUR/mes`,
                desc: "Cuota hipotecaria estimada",
              },
              {
                value: `${h.formatNumber(esfuerzo, 2)}%`,
                desc: "Cuota sobre renta mensual del hogar",
                color,
              },
              {
                value: `${h.formatNumber(margenPromotor, 2)}%`,
                desc: "Margen promotor estimado",
              },
              {
                value: `${h.formatNumber(iniciosTeoricos, 2)} / 1.000`,
                desc: "Inicios teoricos de vivienda",
              },
            ],
            thermometer: {
              value: senal,
              color,
              ariaLabel: "Indice de accesibilidad de compra",
            },
            narrative: narrativa,
            note: "No incorpora fiscalidad, gastos de cierre ni heterogeneidad territorial; sirve para comparar sensibilidad entre supuestos.",
          };
        },
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
            display: (value, h) => `${h.formatInt(value)} viviendas/ano`,
          },
          {
            id: "maduracion",
            label: "Anos de maduracion de la oferta",
            type: "range",
            min: 2,
            max: 10,
            step: 1,
            value: 5,
            display: (value, h) => `${h.formatInt(value)} anos`,
          },
          {
            id: "hogares_nuevos",
            label: "Nuevos hogares anuales",
            type: "range",
            min: 90000,
            max: 180000,
            step: 1000,
            value: 130000,
            display: (value, h) => `${h.formatInt(value)} hogares/ano`,
          },
          {
            id: "elasticidad_precio",
            label: "Elasticidad precio respecto al deficit",
            type: "range",
            min: 0.1,
            max: 1,
            step: 0.05,
            value: 0.45,
            display: (value, h) => h.formatNumber(value, 2),
          },
        ],
        compute: (state, h) => {
          const maturityFactor = h.clamp(
            (11 - state.maduracion) / 6,
            0.35,
            1.5,
          );
          const deficit2035 = h.clamp(
            671000 -
              state.viviendas_adicionales * 4.35 * maturityFactor +
              (state.hogares_nuevos - 130000) * 2.4,
            350000,
            900000,
          );

          const reduccion = 671000 - deficit2035;
          const alquiler2035 = h.clamp(
            223 - (reduccion / 12000) * (0.8 + state.elasticidad_precio),
            170,
            240,
          );
          const sobrecarga2035 = h.clamp(
            45 - (reduccion / 16000) * (0.7 + state.elasticidad_precio),
            20,
            55,
          );
          const impactoRelativo = h.clamp((reduccion / 671000) * 100, -20, 55);
          const senal = h.clamp(((55 - sobrecarga2035) / 35) * 100, 0, 100);
          const color =
            sobrecarga2035 < 33
              ? "var(--status-good)"
              : sobrecarga2035 < 40
                ? "var(--status-warn)"
                : "var(--status-bad)";

          const narrativa =
            sobrecarga2035 < 33
              ? "La reforma de oferta reduce de forma visible tension de alquiler y deficit acumulado."
              : sobrecarga2035 < 40
                ? "La mejora existe, pero todavia persiste un mercado tensionado en zonas de mayor demanda."
                : "Con estos supuestos, el ajuste de oferta no basta para contener la sobrecarga de costes.";

          return {
            kpis: [
              {
                value: `${h.formatInt(Math.round(deficit2035))}`,
                desc: "Deficit habitacional proyectado en 2035",
              },
              {
                value: `${h.formatNumber(alquiler2035, 1)}`,
                desc: "Indice de alquiler proyectado (2035)",
              },
              {
                value: `${h.formatNumber(sobrecarga2035, 1)}%`,
                desc: "Sobrecarga de alquiler proyectada",
                color,
              },
              {
                value: `${h.formatNumber(impactoRelativo, 1)}%`,
                desc: "Reduccion relativa del deficit vs status quo",
              },
            ],
            thermometer: {
              value: senal,
              color,
              ariaLabel: "Senal de alivio del mercado de alquiler",
            },
            narrative: narrativa,
            note: "La traduccion de oferta a precios es simplificada: sirve para comparar ordenes de magnitud entre escenarios de politica.",
          };
        },
      },
    ],
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/documentos_pdf/radiografia-mercado-vivienda-espana.pdf",
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/radiografia-mercado-vivienda-espana",
      },
      "Nota metodologica: series reconstruidas visualmente para habilitar navegacion interactiva grafico a grafico.",
    ],
  };
})();
