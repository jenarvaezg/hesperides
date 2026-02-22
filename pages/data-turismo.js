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
    { label: "Grafico 16", page: 31 },
  ];

  const years = ["2021", "2022", "2023", "2024"];

  const baseMeta = {
    source: "Turismo y vivienda en Canarias (2025)",
    sourceUrl:
      "https://hesperides.edu.es/wp-content/uploads/2025/02/Informe-Vivienda_h_Febrero2025.pdf",
    exactness: "reconstruida visualmente",
  };

  const chartByNumber = {
    1: {
      title: "Grafico 1. El precio de la vivienda crece en Canarias por encima del resto de Espana",
      subtitle: "Precio vivienda por comunidades autonomas (dic-2020=100)",
      type: "line",
      unit: "indice",
      x: years,
      showLegend: true,
      series: [
        { name: "Canarias", type: "line", data: [100, 107, 115, 130], color: "#f3c400", smooth: false },
        { name: "Espana", type: "line", data: [100, 106, 112, 127], color: "#000000", smooth: false },
        { name: "Baleares", type: "line", data: [100, 108, 114, 129], color: "#b7b7b7", smooth: false },
        { name: "Cataluna", type: "line", data: [100, 105, 111, 126], color: "#d0d0d0", smooth: false },
        { name: "Madrid", type: "line", data: [100, 106, 112, 124], color: "#c8c8c8", smooth: false },
        { name: "Extremadura", type: "line", data: [100, 104, 110, 122], color: "#dddddd", smooth: false },
        { name: "Castilla LM", type: "line", data: [99, 103, 108, 120], color: "#e5e5e5", smooth: false },
      ],
      min: 98,
      max: 132,
      height: 380,
    },
    2: {
      title: "Grafico 2. En Canarias los precios crecen por encima de la media y del IPC",
      subtitle: "Cambio en el precio de la vivienda (dic-2020 a sept-2024)",
      orientation: "horizontal",
      yAxisInverse: true,
      unit: "%",
      x: [
        "Andalucia", "Cantabria", "Navarra", "Canarias", "Baleares", "Aragon", "Valencia",
        "Espana", "Galicia", "Murcia", "Rioja", "Cataluna", "Madrid", "Asturias",
        "Pais Vasco", "Castilla y Leon", "Extremadura", "Castilla La Mancha", "IPC",
      ],
      barBorderRadius: false,
      highlights: ["Canarias", "Espana", "IPC"],
      series: [
        {
          name: "Variacion",
          data: [34.6, 34.5, 33.5, 32.5, 29.8, 29.1, 28.5, 27.8, 26.0, 26.0, 25.9, 25.5, 25.3, 25.2, 25.0, 23.0, 19.5, 18.7, 17.9],
          color: "#d3d3d3",
        },
      ],
      min: 0,
      max: 36,
      height: 520,
    },
    3: {
      title: "Grafico 3. Canarias es la tercera CCAA con menor incremento en stock de vivienda",
      subtitle: "Viviendas nuevas sobre stock total (2020-2023)",
      coordinate: "xy-category-y",
      unit: "%",
      xUnit: "%",
      xLabel: "Incremento sobre stock",
      xMin: 0.4,
      xMax: 2.4,
      yAxisInverse: true,
      x: [
        "Navarra", "Madrid", "Baleares", "Pais Vasco", "La Rioja", "Andalucia", "Espana",
        "Asturias", "Cantabria", "Cataluna", "Castilla-La Mancha", "Aragon", "Valencia",
        "Murcia", "Extremadura", "Canarias", "Castilla y Leon", "Galicia",
      ],
      showLegend: false,
      series: [
        {
          name: "Incremento stock",
          type: "scatter",
          symbolSize: 10,
          data: [
            [2.3, "Navarra"], [2.0, "Madrid"], [1.4, "Baleares"], [1.3, "Pais Vasco"], [1.2, "La Rioja"],
            [1.1, "Andalucia"], [1.1, "Espana"], [1.0, "Asturias"], [1.0, "Cantabria"], [1.0, "Cataluna"],
            [0.9, "Castilla-La Mancha"], [0.9, "Aragon"], [0.8, "Valencia"], [0.8, "Murcia"], [0.8, "Extremadura"],
            [0.7, "Canarias"], [0.7, "Castilla y Leon"], [0.5, "Galicia"],
          ],
          color: "#d6a900",
          label: { show: true, position: "right", formatter: ({ value }) => `+${String(value[0]).replace(".", ",")}%` },
        },
      ],
      height: 500,
    },
    4: {
      title: "Grafico 4. Suelo consolidado y apto para edificar en Las Palmas de Gran Canaria",
      subtitle: "Composicion aproximada del suelo segun condicion urbanistica",
      type: "pie",
      unit: "%",
      donut: true,
      showLegend: true,
      legendTop: 6,
      legendFontSize: 11,
      series: [
        {
          name: "Suelo",
          label: { show: true, position: "inside", formatter: "{b}\n{d}%" },
          data: [
            { name: "Consolidado apto", value: 33, itemStyle: { color: "#f3c400" } },
            { name: "Consolidado no disponible", value: 52, itemStyle: { color: "#7f5b00" } },
            { name: "No consolidado / no apto", value: 15, itemStyle: { color: "#b08a10" } },
          ],
        },
      ],
      height: 430,
    },
    5: {
      title: "Grafico 5. Canarias esta muy lejos de ser la region europea con mayor densidad",
      subtitle: "Densidad poblacional por regiones en la Union Europea",
      unit: "indice",
      x: [
        "Guyane", "Azores", "Alentejo", "Extremadura", "Castilla-La Mancha", "Galicia", "Andalucia", "Valencia",
        "Bavaria", "Hessen", "Lombardia", "Cataluna", "Madrid", "Canarias", "Baleares", "Andalucia C",
        "Sicilia", "Provence", "Norte", "Bruxelles", "Ile-de-France", "Lazio", "Berlin", "Attiki", "Ceuta"
      ],
      xLabelRotate: 68,
      xLabelFontSize: 8,
      noWrapLabels: true,
      showLegend: false,
      series: [
        {
          name: "Hab/km2",
          data: [6, 18, 28, 40, 54, 70, 84, 95, 110, 130, 150, 175, 210, 301, 420, 520, 600, 700, 820, 1000, 1200, 1700, 2600, 4300, 6000],
          itemStyle: { color: (params) => (params.name === "Canarias" ? "#f3c400" : "#f8e8a6") },
        },
      ],
      min: 0,
      max: 6200,
      height: 430,
    },
    6: {
      title: "Grafico 6. La densidad urbana en Las Palmas de Gran Canaria es muy baja",
      subtitle: "Viviendas por hectarea en Las Palmas de Gran Canaria",
      type: "pie",
      unit: "%",
      showLegend: true,
      legendTop: 6,
      legendFontSize: 11,
      series: [
        {
          name: "Densidad urbana",
          label: { show: true, position: "inside", formatter: "{b}\n{d}%" },
          data: [
            { name: "Baja (<40)", value: 60.3, itemStyle: { color: "#f3c400" } },
            { name: "Media-baja (40-60)", value: 14.6, itemStyle: { color: "#7f5b00" } },
            { name: "Media (60-80)", value: 9.2, itemStyle: { color: "#b08a10" } },
            { name: "Alta (>80)", value: 16.0, itemStyle: { color: "#5a4100" } },
          ],
        },
      ],
      height: 420,
    },
    7: {
      title: "Grafico 7. Canarias presenta desbalance entre hogares y viviendas terminadas",
      subtitle: "Crecimiento de stock de hogares y de vivienda entre 2021 y 2023",
      orientation: "horizontal",
      yAxisInverse: true,
      unit: "%",
      x: [
        "Valencia", "Murcia", "Madrid", "Cataluna", "Andalucia", "Espana", "Canarias", "Castilla-La Mancha", "Navarra",
        "Aragon", "Baleares", "La Rioja", "Cantabria", "Castilla y Leon", "Galicia", "Pais Vasco", "Extremadura", "Asturias",
      ],
      barBorderRadius: false,
      series: [
        { name: "Incremento hogares", data: [4.1, 3.7, 3.6, 3.4, 3.1, 3.0, 3.0, 3.0, 3.0, 2.9, 2.8, 2.3, 2.1, 1.9, 1.9, 1.7, 1.5, 1.0], color: "#7f5b00" },
        { name: "Incremento vivienda terminada", data: [0.8, 0.8, 2.0, 0.9, 1.1, 1.0, 0.7, 1.0, 2.3, 0.9, 1.3, 1.2, 0.7, 0.7, 0.4, 1.2, 0.7, 0.8], color: "#f3c400" },
      ],
      min: 0,
      max: 4.5,
      yAxisDecimals: 1,
      axisDecimals: 1,
      height: 520,
    },
    8: {
      title: "Grafico 8. Canarias tiene el mayor deficit habitacional de Espana",
      subtitle: "Viviendas construidas por hogar creado (2021-2023)",
      coordinate: "xy-category-y",
      unit: "indice",
      xLabel: "Viviendas por hogar creado",
      xMin: 0.3,
      xMax: 1.3,
      yAxisInverse: true,
      x: [
        "Asturias", "Navarra", "La Rioja", "Pais Vasco", "Extremadura", "Baleares", "Castilla y Leon", "Madrid", "Castilla-La Mancha",
        "Cantabria", "Andalucia", "Espana", "Aragon", "Galicia", "Cataluna", "Murcia", "Valencia", "Canarias",
      ],
      showLegend: false,
      series: [
        {
          name: "Ratio",
          type: "scatter",
          symbolSize: 10,
          data: [
            [1.25, "Asturias"], [0.96, "Navarra"], [0.84, "La Rioja"], [0.83, "Pais Vasco"], [0.75, "Extremadura"],
            [0.67, "Baleares"], [0.66, "Castilla y Leon"], [0.62, "Madrid"], [0.59, "Castilla-La Mancha"], [0.55, "Cantabria"],
            [0.50, "Andalucia"], [0.49, "Espana"], [0.49, "Aragon"], [0.37, "Galicia"], [0.34, "Cataluna"],
            [0.33, "Murcia"], [0.32, "Valencia"], [0.31, "Canarias"],
          ],
          color: "#d6a900",
          label: { show: true, position: "right", formatter: ({ value }) => String(value[0]).replace(".", ",") },
        },
      ],
      height: 500,
    },
    9: {
      title: "Grafico 9. En Canarias historicamente se construye por debajo de las necesidades",
      subtitle: "Nueva vivienda por hogar creado (1981-2023)",
      type: "line",
      unit: "indice",
      x: ["1981-1990", "1991-2000", "2001-2010", "2011-2020", "2021-2023"],
      showLegend: false,
      series: [
        { name: "Espana", type: "line", data: [1.6, 1.2, 1.4, 1.2, 0.5], color: "#2b2b2b", smooth: false },
        { name: "Canarias", type: "line", data: [1.6, 0.9, 1.0, 0.3, 0.3], color: "#f3c400", smooth: false },
        {
          name: "Linea deficit",
          type: "line",
          data: [1.0, 1.0, 1.0, 1.0, 1.0],
          color: "#d26d6d",
          symbol: "none",
          smooth: false,
          lineStyle: { type: "dashed" },
          excludeFromLegend: true,
          tooltip: { show: false },
        },
      ],
      min: 0,
      max: 1.7,
      yAxisDecimals: 1,
      axisDecimals: 1,
      height: 360,
    },
    10: {
      title: "Grafico 10. El boom de la vivienda turistica en Canarias",
      subtitle: "Vivienda turistica en Canarias entre 2020 y 2024",
      type: "line",
      unit: "viviendas",
      x: ["2021", "2022", "2023", "2024"],
      showLegend: true,
      series: [
        { name: "Canarias", type: "line", data: [37791, 39327, 40935, 51286], color: "#2b2b2b", smooth: false },
        { name: "Las Palmas", type: "line", data: [20272, 21097, 22209, 27127], color: "#f3c400", smooth: false },
        { name: "Santa Cruz Tenerife", type: "line", data: [17519, 18230, 18726, 24069], color: "#2f7bc4", smooth: false },
      ],
      min: 15000,
      max: 54000,
      height: 360,
    },
    11: {
      title: "Grafico 11. Canarias es la CCAA con mayor cantidad de vivienda turistica",
      subtitle: "Apartamentos turisticos en Espana por CCAA (% sobre total viviendas)",
      coordinate: "xy-category-y",
      unit: "%",
      xUnit: "%",
      xLabel: "Porcentaje sobre el total de viviendas",
      xMin: 0,
      xMax: 5,
      yAxisInverse: true,
      x: [
        "Canarias", "Baleares", "Cantabria", "Valencia", "Andalucia", "Espana", "Cataluna", "Asturias", "Galicia",
        "Murcia", "Madrid", "La Rioja", "Aragon", "Castilla y Leon", "Navarra", "Pais Vasco", "Castilla La Mancha", "Extremadura",
      ],
      showLegend: false,
      series: [
        {
          name: "Vivienda turistica",
          type: "scatter",
          symbolSize: 10,
          data: [
            [4.7, "Canarias"], [3.7, "Baleares"], [2.0, "Cantabria"], [2.0, "Valencia"], [1.8, "Andalucia"], [1.4, "Espana"],
            [1.4, "Cataluna"], [1.1, "Asturias"], [1.1, "Galicia"], [1.0, "Murcia"], [0.7, "Madrid"], [0.7, "La Rioja"],
            [0.6, "Aragon"], [0.5, "Castilla y Leon"], [0.5, "Navarra"], [0.5, "Pais Vasco"], [0.4, "Castilla La Mancha"], [0.3, "Extremadura"],
          ],
          color: "#d6a900",
          label: { show: true, position: "right", formatter: ({ value }) => `${String(value[0]).replace(".", ",")}%` },
        },
      ],
      height: 500,
    },
    12: {
      title: "Grafico 12. Relacion debil entre vivienda turistica y crecimiento del precio",
      subtitle: "Crecimiento vivienda turistica y precios por municipio (2020-2024)",
      coordinate: "xy",
      unit: "%",
      xLabel: "Crecimiento precio vivienda",
      yLabel: "Crecimiento vivienda turistica",
      xMin: -10,
      xMax: 100,
      min: -2,
      max: 12,
      showLegend: false,
      series: [
        {
          name: "Municipios",
          type: "scatter",
          symbolSize: (value) => Math.max(6, Math.sqrt(value[2]) * 0.9),
          data: [
            { name: "Las Palmas GC", value: [17.7, 0.43, 380] },
            { name: "Santa Cruz Tenerife", value: [32.7, 0.29, 209] },
            { name: "La Laguna", value: [39.5, 0.21, 160] },
            { name: "Telde", value: [18.5, 0.30, 103] },
            { name: "Arona", value: [48.2, 1.21, 87] },
            { name: "Santa Lucia Tirajana", value: [22.4, -0.11, 78] },
            { name: "Arrecife", value: [28.0, 0.67, 68] },
            { name: "Granadilla Abona", value: [49.2, 1.02, 57] },
            { name: "San Bartolome Tirajana", value: [31.9, 1.14, 54] },
            { name: "Adeje", value: [60.3, 2.18, 51] },
            { name: "Pto. del Rosario", value: [37.0, 1.6, 41] },
            { name: "Yaiza", value: [53.0, 4.4, 17] },
            { name: "Tias", value: [35.0, 2.8, 21] },
            { name: "Oliva", value: [44.0, 5.2, 30] },
            { name: "Mogan", value: [23.0, 0.5, 22] },
            { name: "Agulo", value: [80.0, 1.0, 1] },
          ],
          color: "#d6a900",
        },
      ],
      height: 400,
    },
    13: {
      title: "Grafico 13. El sector de la construccion canario puede atender el deficit habitacional",
      subtitle: "Viviendas terminadas en Canarias (1991-2023)",
      unit: "viviendas",
      x: [
        "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006",
        "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"
      ],
      xLabelRotate: 64,
      xLabelFontSize: 8,
      noWrapLabels: true,
      showLegend: false,
      series: [
        { name: "Viviendas terminadas", data: [7600, 8200, 6100, 7000, 10800, 13000, 14600, 19000, 25000, 28000, 29000, 27000, 26000, 26000, 25900, 27500, 26000, 30000, 18500, 13000, 7900, 2500, 1500, 1000, 900, 700, 1600, 3000, 3500, 2500, 3900, 3500, 3200], color: "#d6a900" },
        {
          name: "Deficit anual de referencia",
          type: "line",
          data: [7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000],
          color: "#7f5b00",
          symbol: "none",
          smooth: false,
          lineStyle: { type: "dashed" },
          excludeFromLegend: true,
          tooltip: { show: false },
        },
      ],
      min: 0,
      max: 32000,
      height: 390,
    },
    14: {
      title: "Grafico 14. Los desahucios en Canarias han caido en picado",
      subtitle: "Desahucios en Canarias (2013-2023)",
      unit: "viviendas",
      x: ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
      showLegend: false,
      series: [{ name: "Desahucios", data: [4331, 4298, 4391, 3690, 3524, 3808, 3333, 1779, 2763, 2445, 1782], color: "#d6a900" }],
      min: 0,
      max: 4700,
      height: 360,
    },
    15: {
      title: "Grafico 15. El mercado hipotecario no explica la caida de los desahucios",
      subtitle: "Ejecuciones hipotecarias en Canarias (2014-2023)",
      unit: "viviendas",
      x: ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
      showLegend: false,
      series: [{ name: "Ejecuciones hipotecarias", data: [4888, 3021, 2012, 1349, 1404, 639, 597, 910, 616, 490], color: "#d6a900" }],
      min: 0,
      max: 5200,
      height: 360,
    },
    16: {
      title: "Grafico 16. La economia colaborativa se impone en el sector turistico en Canarias",
      subtitle: "Plazas turisticas ofertadas en Canarias (2022-2024)",
      type: "line",
      unit: "viviendas",
      x: ["ene22", "abr22", "jul22", "oct22", "ene23", "abr23", "jul23", "oct23", "ene24", "abr24", "jul24", "oct24"],
      showLegend: false,
      series: [
        { name: "Vivienda vacacional y apartamentos", type: "line", data: [240000, 250000, 260000, 275000, 280000, 270000, 280000, 290000, 288000, 300000, 305000, 320000], color: "#7f5b00", smooth: false, areaStyle: { color: "rgba(243,196,0,0.14)" } },
        { name: "Hotel tradicional", type: "line", data: [245000, 248000, 250000, 252000, 248000, 250000, 255000, 257000, 252000, 250000, 253000, 256000], color: "#f3c400", smooth: false },
      ],
      min: 200000,
      max: 325000,
      height: 370,
    },
  };

  const table1 = {
    ...baseMeta,
    title: "Tabla 1. El turismo no explica el crecimiento del precio de la vivienda en Canarias",
    subtitle: "Relacion entre precios de vivienda y aumento de vivienda turistica (2020-2024)",
    renderAs: "table",
    tableColumns: ["#", "Municipio", "Aumento precio vivienda", "Nueva vivienda turistica"],
    tableRows: [
      ["1", "Las Palmas de Gran Canaria", "17,7%", "0,43%"],
      ["2", "Santa Cruz de Tenerife", "32,7%", "0,29%"],
      ["3", "San Cristobal de La Laguna", "39,5%", "0,21%"],
      ["4", "Telde", "18,5%", "0,30%"],
      ["5", "Arona", "48,2%", "1,21%"],
      ["6", "Santa Lucia de Tirajana", "22,4%", "-0,11%"],
      ["7", "Arrecife", "28,0%", "0,67%"],
      ["8", "Granadilla de Abona", "49,2%", "1,02%"],
      ["9", "San Bartolome de Tirajana", "31,9%", "1,14%"],
      ["10", "Adeje", "60,3%", "2,18%"],
    ],
    tableHighlightFirstRow: false,
  };

  const table2 = {
    ...baseMeta,
    title: "Tabla 2. Los municipios de Canarias mas poblados suelen tener poca vivienda turistica",
    subtitle: "Proporcion de vivienda turistica sobre el parque de vivienda total",
    renderAs: "table",
    tableColumns: ["#", "Municipio", "Poblacion", "% viviendas turisticas"],
    tableRows: [
      ["1", "Las Palmas de Gran Canaria", "380 436", "1,66%"],
      ["2", "Santa Cruz de Tenerife", "209 194", "1,10%"],
      ["3", "San Cristobal de La Laguna", "160 582", "1,01%"],
      ["4", "Telde", "102 867", "1,07%"],
      ["5", "Arona", "86 624", "8,26%"],
      ["6", "Santa Lucia de Tirajana", "77 098", "1,06%"],
      ["7", "Arrecife", "68 169", "2,40%"],
      ["8", "Granadilla de Abona", "57 143", "5,65%"],
      ["9", "San Bartolome de Tirajana", "54 116", "11,82%"],
      ["10", "Adeje", "50 549", "15,73%"],
    ],
    tableHighlightFirstRow: false,
  };

  const table3 = {
    ...baseMeta,
    title: "Tabla 3. Los municipios con mas vivienda turistica suelen tener poblacion reducida",
    subtitle: "Poblacion de los municipios con mayor porcentaje de vivienda turistica",
    renderAs: "table",
    tableColumns: ["#", "Municipio", "% viviendas turisticas", "Poblacion"],
    tableRows: [
      ["1", "Yaiza", "24,1%", "17 040"],
      ["2", "La Oliva", "23,7%", "29 693"],
      ["3", "Teguise", "16,7%", "22 703"],
      ["4", "Adeje", "15,7%", "50 549"],
      ["5", "Haria", "15,6%", "5 263"],
      ["6", "Tijarafe", "13,3%", "2 507"],
      ["7", "Antigua", "13,0%", "12 972"],
      ["8", "Tinajo", "12,7%", "6 434"],
      ["9", "Tias", "12,6%", "20 628"],
      ["10", "Hermigua", "12,2%", "1 775"],
    ],
    tableHighlightFirstRow: false,
  };

  const charts = Object.fromEntries(
    figures.map((fig, index) => {
      const id = `f${String(index + 1).padStart(2, "0")}`;

      if (fig.label === "Tabla 1") return [id, table1];
      if (fig.label === "Tabla 2") return [id, table2];
      if (fig.label === "Tabla 3") return [id, table3];

      const n = Number(fig.label.replace(/[^0-9]/g, ""));
      return [id, { ...baseMeta, ...chartByNumber[n] }];
    }),
  );

  window.REPORT_DATA = {
    meta: {
      title: "Turismo y vivienda en Canarias",
      lead: "Version interactiva del informe con series reconstruidas visualmente sobre tension residencial, turismo y restricciones de oferta.",
      reportUrl:
        "https://hesperides.edu.es/informes/turismo-vivienda-canarias/",
      pdfUrl:
        "https://hesperides.edu.es/wp-content/uploads/2025/02/Informe-Vivienda_h_Febrero2025.pdf",
      caveat:
        "Las cifras de esta version se estiman visualmente desde el informe original para habilitar lectura interactiva completa.",
      keyFinding: {
        kpi: "60.000 vs 7.000",
        text: "Plazas vacacionales frente al deficit de viviendas en Canarias",
      },
      contentBadge: "16 graficos · 3 tablas",
    },
    metrics: [
      { kpi: "+35%", label: "Crecimiento vivienda vacacional (2020–2023)" },
      { kpi: "+0,7%", label: "Crecimiento parque residencial (2020–2023)" },
      { kpi: "60.000", label: "Plazas de alquiler vacacional activas" },
      { kpi: "7.000", label: "Deficit estimado de viviendas" },
    ],
    chapters: [
      { id: "resumen-ejecutivo", title: "Resumen ejecutivo", charts: [] },
      { id: "primera-parte", title: "Primera parte: Introducción", charts: [] },
      {
        id: "segunda-parte",
        title: "Segunda parte: El espíritu de la Ley de vivienda vacacional",
        charts: [],
      },
      {
        id: "tercera-parte",
        title: "Tercera parte: Omisiones del Proyecto de Ley",
        charts: makeIds("f", 1, 16),
      },
      {
        id: "cuarta-parte",
        title: "Cuarta parte: Seguridad jurídica y fragmentación del mercado",
        charts: makeIds("f", 17, 19),
      },
    ],
    charts,
    text: {
      sourcePath: "extracted_text/turismo_vivienda_canarias.txt",
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
        },
      ],
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
            display: (value, h) => `${h.formatInt(value)} / 100`,
          },
          {
            id: "aceleracion_licencias",
            label: "Aceleracion de licencias",
            type: "range",
            min: 0,
            max: 100,
            step: 1,
            value: 45,
            display: (value, h) => `${h.formatInt(value)} / 100`,
          },
          {
            id: "activacion_suelo",
            label: "Activacion adicional de suelo",
            type: "range",
            min: 0,
            max: 100,
            step: 1,
            value: 40,
            display: (value, h) => `${h.formatInt(value)} / 100`,
          },
          {
            id: "horizonte",
            label: "Horizonte de impacto",
            type: "range",
            min: 2,
            max: 8,
            step: 1,
            value: 5,
            display: (value, h) => `${h.formatInt(value)} anos`,
          },
        ],
        compute: (state, h) => {
          const horizonFactor = state.horizonte / 5;
          const efectoRestriccion = state.restriccion_turistica * 0.05;
          const efectoOferta =
            state.aceleracion_licencias * 0.07 + state.activacion_suelo * 0.08;

          const variacionAlquiler2030 = h.clamp(
            29 - efectoRestriccion - efectoOferta * horizonFactor,
            8,
            32,
          );
          const ofertaExtra =
            (state.aceleracion_licencias * 35 + state.activacion_suelo * 34) *
            horizonFactor;
          const deficitAnual = h.clamp(
            7000 - ofertaExtra * 0.12 + state.restriccion_turistica * 18,
            1500,
            12000,
          );
          const indiceOferta2030 = h.clamp(
            105 - state.restriccion_turistica * 0.03 - efectoOferta * 0.05,
            95,
            107,
          );

          const senal = h.clamp(
            ((32 - variacionAlquiler2030) / 24) * 100,
            0,
            100,
          );
          const color =
            variacionAlquiler2030 < 18
              ? "var(--status-good)"
              : variacionAlquiler2030 < 24
                ? "var(--status-warn)"
                : "var(--status-bad)";

          const narrativa =
            variacionAlquiler2030 < 18
              ? "La estrategia combinada logra una desaceleracion intensa del alquiler con mejora de oferta efectiva."
              : variacionAlquiler2030 < 24
                ? "Hay desaceleracion moderada: la tension mejora, pero sigue presente en municipios de mayor demanda."
                : "Predomina una correccion limitada; la oferta adicional no compensa del todo la presion de demanda.";

          return {
            kpis: [
              {
                value: `${h.formatNumber(variacionAlquiler2030, 1)}%`,
                desc: "Variacion acumulada del alquiler a 2030",
                color,
              },
              {
                value: `${h.formatInt(Math.round(deficitAnual))}`,
                desc: "Deficit anual estimado de vivienda",
              },
              {
                value: `${h.formatNumber(indiceOferta2030, 1)}`,
                desc: "Indice de oferta efectiva (2030)",
              },
              {
                value: `${h.formatInt(Math.round(ofertaExtra))}`,
                desc: "Oferta adicional potencial acumulada",
              },
            ],
            thermometer: {
              value: senal,
              color,
              ariaLabel: "Alivio estimado de tension en alquiler",
            },
            narrative: narrativa,
            note: "La conversion de palancas a oferta extra es orientativa y busca mantener coherencia de orden de magnitud con los escenarios del informe.",
          };
        },
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
            display: (value, h) => `${h.formatNumber(value)}%`,
          },
          {
            id: "crec_alquiler",
            label: "Crecimiento anual del alquiler",
            type: "range",
            min: 0,
            max: 10,
            step: 0.1,
            value: 4.3,
            display: (value, h) => `${h.formatNumber(value)}%`,
          },
          {
            id: "crec_renta",
            label: "Crecimiento anual de renta salarial",
            type: "range",
            min: 0,
            max: 6,
            step: 0.1,
            value: 1.8,
            display: (value, h) => `${h.formatNumber(value)}%`,
          },
          {
            id: "oferta_nueva",
            label: "Nueva oferta por 1.000 habitantes",
            type: "range",
            min: 0.5,
            max: 6,
            step: 0.1,
            value: 2,
            display: (value, h) => `${h.formatNumber(value)}`,
          },
        ],
        compute: (state, h) => {
          const brechaRenta = state.crec_alquiler - state.crec_renta;
          const sobrecarga = h.clamp(
            30 +
              state.peso_vacacional * 0.9 +
              brechaRenta * 2.6 -
              state.oferta_nueva * 2.8,
            18,
            60,
          );
          const presionPrecios = h.clamp(
            100 +
              state.peso_vacacional * 1.5 +
              brechaRenta * 4 -
              state.oferta_nueva * 3.5,
            85,
            155,
          );
          const riesgo = h.clamp(
            ((sobrecarga - 18) / 42) * 60 + ((presionPrecios - 85) / 70) * 40,
            0,
            100,
          );
          const deficitLocal = h.clamp(
            7000 + (sobrecarga - 41) * 110 - (state.oferta_nueva - 2) * 350,
            3000,
            12000,
          );
          const color =
            riesgo < 40
              ? "var(--status-good)"
              : riesgo < 65
                ? "var(--status-warn)"
                : "var(--status-bad)";

          const narrativa =
            riesgo < 40
              ? "El escenario local sugiere tension contenida y mejor equilibrio entre demanda y oferta."
              : riesgo < 65
                ? "Existe tension relevante: se recomienda reforzar oferta estable para evitar deterioro adicional."
                : "La configuracion es de riesgo alto para accesibilidad, con fuerte presion sobre precios y sobrecarga.";

          return {
            kpis: [
              {
                value: `${h.formatNumber(sobrecarga, 1)}%`,
                desc: "Sobrecarga estimada en hogares arrendatarios",
              },
              {
                value: `${h.formatNumber(presionPrecios, 1)}`,
                desc: "Indice de presion de precios (100 = neutral)",
              },
              {
                value: `${h.formatNumber(riesgo, 1)}`,
                desc: "Indice sintetico de riesgo insular",
                color,
              },
              {
                value: `${h.formatInt(Math.round(deficitLocal))}`,
                desc: "Deficit anual local de referencia",
              },
            ],
            thermometer: {
              value: riesgo,
              color,
              ariaLabel: "Riesgo de tension residencial insular",
            },
            narrative: narrativa,
            note: "El simulador describe una isla tipo y no sustituye un modelo municipal detallado con microdatos.",
          };
        },
      },
    ],
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/wp-content/uploads/2025/02/Informe-Vivienda_h_Febrero2025.pdf",
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/turismo-vivienda-canarias/",
      },
      "Nota metodologica: reconstruccion visual de series para esta iteracion interactiva (sin ingestar datasets oficiales).",
    ],
  };
})();
