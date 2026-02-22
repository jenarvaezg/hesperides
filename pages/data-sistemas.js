(() => {
  const makeIds = (prefix, from, to) => {
    const ids = [];
    for (let i = from; i <= to; i += 1) {
      ids.push(`${prefix}${String(i).padStart(2, "0")}`);
    }
    return ids;
  };
  const makeYearRange = (from, to, step = 1) => {
    const years = [];
    for (let year = from; year <= to; year += step) {
      years.push(String(year));
    }
    return years;
  };
  const interpolateSeries = (xValues, anchors) => {
    const points = anchors
      .map(([x, y]) => [Number(x), Number(y)])
      .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y))
      .sort((a, b) => a[0] - b[0]);

    if (!points.length) return xValues.map(() => 0);
    if (points.length === 1) return xValues.map(() => points[0][1]);

    return xValues.map((label) => {
      const x = Number(label);
      if (!Number.isFinite(x)) return points[0][1];
      if (x <= points[0][0]) return points[0][1];
      if (x >= points[points.length - 1][0]) return points[points.length - 1][1];

      for (let index = 0; index < points.length - 1; index += 1) {
        const [x0, y0] = points[index];
        const [x1, y1] = points[index + 1];
        if (x < x0 || x > x1) continue;
        if (x1 === x0) return y1;
        const ratio = (x - x0) / (x1 - x0);
        return Number((y0 + (y1 - y0) * ratio).toFixed(2));
      }

      return points[points.length - 1][1];
    });
  };

  const figures = [
    { label: "Grafica 1", page: 7 },
    { label: "Grafica 2", page: 8 },
    { label: "Grafica 3", page: 10 },
    { label: "Grafica 4", page: 11 },
    { label: "Grafica 5", page: 13 },
    { label: "Grafica 6", page: 15 },
    { label: "Grafica 7", page: 16 },
    { label: "Grafica 8", page: 17 },
    { label: "Grafica 9", page: 20 },
    { label: "Grafica 10", page: 21 },
    { label: "Grafica 11", page: 22 },
    { label: "Grafica 12", page: 24 },
    { label: "Grafica 13", page: 26 },
    { label: "Grafica 14", page: 27 },
    { label: "Grafica 15", page: 28 },
    { label: "Grafica 16", page: 29 },
    { label: "Grafica 17", page: 30 },
    { label: "Grafica 18", page: 31 },
    { label: "Grafica 19", page: 33 },
    { label: "Grafica 20", page: 36 },
    { label: "Grafica 21", page: 37 },
    { label: "Grafica 22", page: 38 },
    { label: "Grafica 23", page: 39 },
    { label: "Grafica 24", page: 40 },
    { label: "Tabla 1", page: 41 },
    { label: "Grafica 25", page: 42 },
    { label: "Grafica 26", page: 44 },
    { label: "Grafica 27", page: 45 },
    { label: "Grafica 28", page: 46 },
    { label: "Grafica 29", page: 48 },
    { label: "Grafica 30", page: 49 },
    { label: "Grafica 31", page: 51 },
    { label: "Grafica 32", page: 52 },
    { label: "Tabla 2", page: 55 }
  ];

  const countries = ["Espana", "Alemania", "Suecia", "Chile"];
  const years = ["2005", "2010", "2015", "2020", "2025", "2030", "2035"];
  const years1981To2021 = makeYearRange(1981, 2021);
  const years1980To2024 = makeYearRange(1980, 2024);
  const years1980To2023 = makeYearRange(1980, 2023);
  const years2004To2024 = makeYearRange(2004, 2024);
  const yearsProjection2023To2070 = [...makeYearRange(2023, 2069, 2), "2070"];

  const swedenProjection = [
    7.4, 7.6, 7.3, 7.2, 7.2, 7.2, 7.1, 7.0, 6.8, 6.8, 6.7, 6.7, 6.7, 6.7, 6.7, 6.8, 6.7,
    6.8, 6.9, 7.0, 7.1, 7.2, 7.2, 7.2, 7.2
  ];
  const spainProjection = [
    13.1, 13.4, 13.5, 13.7, 13.9, 14.2, 14.6, 15.0, 15.4, 15.8, 16.0, 16.2, 16.5, 16.7,
    16.9, 17.0, 17.0, 16.9, 16.8, 16.8, 16.7, 16.6, 16.6, 16.6, 16.7
  ];

  const baseMeta = {
    source: "Sistemas de pensiones comparados (2025)",
    sourceUrl: "https://hesperides.edu.es/documentos_pdf/Sistemas_de_pensiones_comparados.pdf",
    exactness: "reconstruida visualmente"
  };

  const chartByNumber = {
    1: {
      title: "Grafica 1. Suecia estabiliza el gasto en pensiones mientras en Espana se dispara",
      subtitle: "Gasto en pensiones publicas en Espana y Suecia, en porcentaje de PIB",
      type: "line",
      unit: "%",
      x: years1981To2021,
      eventLines: [{ x: "2003", label: "Inicio nuevo sistema (2003)" }],
      series: [
        {
          name: "Espana",
          type: "line",
          data: [
            6.2, 6.3, 6.5, 6.8, 7.1, 7.4, 7.3, 7.2, 7.2, 7.9, 8.0, 8.8, 8.8, 8.9, 9.1, 9.0,
            8.7, 8.6, 8.3, 8.1, 8.0, 8.1, 8.0, 8.0, 7.9, 8.1, 8.4, 9.8, 10.5, 11.2, 11.8, 11.5,
            11.5, 11.3, 11.6, 12.5, 13.2, 12.9, 12.6, 12.4, 12.7
          ],
          color: "#f3c400"
        },
        {
          name: "Suecia",
          type: "line",
          data: [
            6.5, 6.6, 6.5, 6.6, 6.7, 6.8, 6.8, 6.8, 6.8, 6.8, 7.0, 8.1, 7.9, 7.6, 7.6, 7.4,
            7.2, 7.1, 6.9, 6.7, 6.5, 6.6, 6.7, 6.6, 6.4, 6.2, 6.8, 7.7, 7.3, 7.2, 7.8, 8.0,
            7.8, 7.8, 7.8, 7.8, 7.8, 7.5, 7.9, 7.5, 7.5
          ],
          color: "#7f5b00"
        }
      ],
      min: 5,
      max: 13.5
    },
    2: {
      title: "Grafica 2. Se espera que el modelo sueco mantenga estable el gasto en pensiones",
      subtitle: "Gasto en pensiones publicas previsto en Espana y Suecia, en porcentaje de PIB",
      type: "line",
      unit: "%",
      x: yearsProjection2023To2070,
      series: [
        {
          name: "Suecia",
          type: "line",
          data: swedenProjection,
          color: "#7f5b00",
          stack: "g2-fill"
        },
        {
          name: "Brecha Espana-Suecia",
          type: "line",
          data: spainProjection.map((value, index) => Number((value - swedenProjection[index]).toFixed(2))),
          color: "rgba(243,196,0,0.01)",
          stack: "g2-fill",
          symbol: "none",
          lineStyle: { opacity: 0 },
          areaStyle: { color: "rgba(243, 196, 0, 0.14)" },
          excludeFromLegend: true,
          tooltip: { show: false }
        },
        {
          name: "Espana",
          type: "line",
          data: spainProjection,
          color: "#f3c400"
        }
      ],
      min: 6,
      max: 17.2
    },
    3: {
      title: "Grafica 3. Suecia realizo su reforma del sistema de pensiones con una poblacion envejecida",
      subtitle: "Evolucion de la ratio de dependencia de los mayores en Espana y Suecia",
      type: "line",
      unit: "%",
      x: years1980To2024,
      eventLines: [{ x: "1992", label: "Inicio diseno reforma sueca (1992)" }],
      series: [
        {
          name: "Suecia",
          type: "line",
          data: [
            25.3, 25.5, 25.8, 26.0, 26.3, 26.8, 27.2, 27.5, 27.7, 27.8, 27.8, 27.7, 27.7, 27.6,
            27.5, 27.4, 27.4, 27.3, 27.2, 26.9, 26.8, 26.6, 26.5, 26.5, 26.6, 27.0, 27.5, 28.3,
            29.5, 30.8, 31.6, 32.0, 32.1, 32.2, 32.3, 32.4, 32.5, 32.6, 32.8, 32.9, 33.0, 33.1,
            33.1, 33.1, 33.1
          ],
          color: "#7f5b00"
        },
        {
          name: "Espana",
          type: "line",
          data: [
            17.6, 17.8, 17.9, 18.1, 18.3, 18.5, 19.0, 19.5, 20.2, 20.8, 21.3, 21.8, 22.5, 23.1,
            23.8, 24.4, 25.0, 24.8, 24.2, 24.5, 24.3, 24.0, 24.2, 24.6, 25.4, 26.0, 27.2, 28.1,
            28.7, 29.2, 29.6, 29.8, 30.1, 30.3, 30.5, 30.6, 30.7, 30.8, 30.8, 30.8, 30.8, 30.8,
            30.8, 30.8, 30.8
          ],
          color: "#f3c400"
        }
      ],
      min: 17,
      max: 33.5
    },
    4: {
      title: "Grafica 4. El modelo sueco controla la deuda publica, el modelo espanol la dispara",
      subtitle: "Evolucion de la deuda publica en Espana y Suecia, en porcentaje de PIB",
      type: "line",
      unit: "%",
      x: years1980To2023,
      eventLines: [{ x: "1992", label: "Inicio diseno reforma sueca (1992)" }],
      series: [
        {
          name: "Espana",
          type: "line",
          data: [
            16.1, 18.0, 20.5, 23.0, 26.0, 29.0, 31.0, 31.0, 30.0, 29.0, 30.0, 32.0, 40.0, 45.0,
            47.0, 47.0, 46.0, 45.0, 43.0, 41.0, 39.0, 37.0, 35.0, 33.0, 31.0, 30.0, 32.0, 36.0,
            42.0, 50.0, 65.0, 85.0, 92.0, 95.0, 94.0, 93.0, 92.0, 91.0, 90.0, 89.0, 88.0, 106.0,
            103.0, 105.0
          ],
          color: "#f3c400"
        },
        {
          name: "Suecia",
          type: "line",
          data: [
            39.8, 44.0, 48.0, 50.0, 50.0, 50.0, 47.0, 44.0, 43.0, 42.0, 44.0, 51.0, 54.0, 55.0,
            55.0, 54.0, 52.0, 51.0, 49.0, 48.0, 49.0, 48.0, 47.0, 46.0, 45.0, 43.0, 42.0, 42.0,
            43.0, 44.0, 45.0, 45.0, 44.0, 43.0, 43.0, 42.0, 41.0, 40.0, 41.0, 42.0, 40.0, 39.0,
            38.0, 36.4
          ],
          color: "#7f5b00"
        }
      ],
      min: 15,
      max: 110
    },
    5: {
      title: "Grafica 5. Los jubilados en Suecia dependen menos de las transferencias del Estado que en Espana",
      subtitle: "Fuente de ingresos de las personas de mas de 65 anos, en porcentaje del ingreso bruto equivalente total",
      unit: "%",
      x: ["Transferencias Estado", "Planes privados y capital", "Ingreso trabajo"],
      barBorderRadius: false,
      series: [
        {
          name: "Suecia",
          data: [51.6, 31.4, 17.0],
          color: "#7f5b00",
          label: { show: true, position: "insideTop", formatter: ({ value }) => `${String(value).replace(".", ",")}%` }
        },
        {
          name: "Espana",
          data: [71.9, 8.6, 19.5],
          color: "#f3c400",
          label: { show: true, position: "insideTop", formatter: ({ value }) => `${String(value).replace(".", ",")}%` }
        }
      ],
      min: 0,
      max: 75
    },
    6: {
      title: "Grafica 6. Los activos del sistema de pensiones de Suecia son superiores a sus obligaciones",
      subtitle: "Evolucion del indice de equilibrio del sistema de pensiones sueco",
      type: "line",
      unit: "indice",
      showLegend: false,
      x: years2004To2024,
      series: [
        {
          name: "Indice de equilibrio",
          type: "line",
          data: [1.00, 1.00, 1.01, 0.99, 0.96, 0.95, 1.01, 1.02, 0.98, 1.01, 1.05, 1.02, 1.04, 1.03, 1.05, 1.08, 1.08, 1.12, 1.13, 1.12, 1.17],
          color: "#f3c400",
          areaStyle: { color: "rgba(243, 196, 0, 0.16)" }
        },
        {
          name: "Umbral 1.0",
          type: "line",
          data: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
          color: "#2b2b2b",
          smooth: false,
          symbol: "none",
          lineStyle: { type: "dashed", width: 1.8 },
          excludeFromLegend: true,
          tooltip: { show: false }
        }
      ],
      min: 0.95,
      max: 1.18
    },
    7: {
      title: "Grafica 7. Espana ofrece pensiones mas generosas para rentas bajas y medias, Suecia para las altas",
      subtitle: "Tasa de sustitucion neta para diferentes porcentajes de salario medio (ano 2022)",
      unit: "%",
      barBorderRadius: false,
      x: ["Espana", "Suecia", "OCDE"],
      series: [
        {
          name: "50% salario medio",
          data: [86.4, 66.5, 72.9],
          color: "#5a4100",
          label: { show: true, position: "insideTop", formatter: ({ value }) => `${String(value).replace(".", ",")}%` }
        },
        {
          name: "100% salario medio",
          data: [86.5, 65.3, 61.0],
          color: "#9f7a15",
          label: { show: true, position: "insideTop", formatter: ({ value }) => `${String(value).replace(".", ",")}%` }
        },
        {
          name: "200% salario medio",
          data: [57.6, 82.9, 52.4],
          color: "#f3c400",
          label: { show: true, position: "insideTop", formatter: ({ value }) => `${String(value).replace(".", ",")}%` }
        }
      ],
      min: 0,
      max: 90
    },
    8: {
      title: "Grafica 8. La pobreza en la vejez es mas elevada en Espana que en Suecia pese a tener pensiones mas generosas",
      subtitle: "Porcentaje de poblacion por cohortes de edad con renta disponible inferior al 50% de la mediana nacional (ano 2022)",
      unit: "%",
      barBorderRadius: false,
      x: ["Mas de 65 anos", "Entre 66 y 75 anos", "Mas de 76 anos"],
      series: [
        {
          name: "Espana",
          data: [13.1, 11.5, 15.1],
          color: "#7f5b00",
          label: { show: true, position: "insideTop", formatter: ({ value }) => `${String(value).replace(".", ",")}%` }
        },
        {
          name: "Suecia",
          data: [9.4, 7.1, 12.1],
          color: "#f3c400",
          label: { show: true, position: "insideTop", formatter: ({ value }) => `${String(value).replace(".", ",")}%` }
        }
      ],
      min: 0,
      max: 16
    },
    9: {
      title: "Grafica 9. El esfuerzo fiscal del sistema chileno de pensiones es reducido",
      subtitle: "Gasto en pensiones publicas, en porcentaje del PIB",
      type: "line",
      unit: "%",
      x: years1980To2023,
      series: [
        {
          name: "Chile",
          type: "line",
          smooth: false,
          data: interpolateSeries(years1980To2023, [
            [1980, 10.8], [1981, 9.5], [1983, 8.2], [1986, 8.0], [1990, 7.0], [1995, 6.7], [1998, 7.2],
            [2000, 4.9], [2003, 4.3], [2006, 3.4], [2008, 3.1], [2011, 3.6], [2014, 3.1], [2018, 2.9],
            [2020, 2.9], [2023, 3.7]
          ]),
          color: "#2b2b2b"
        },
        {
          name: "OCDE",
          type: "line",
          smooth: false,
          data: interpolateSeries(years1980To2023, [
            [1980, 5.7], [1985, 6.1], [1990, 6.2], [1994, 6.5], [1998, 6.6], [2005, 6.8], [2010, 6.7],
            [2012, 7.6], [2016, 8.0], [2019, 7.9], [2021, 7.9], [2022, 8.4], [2023, 8.0]
          ]),
          color: "#d5a700"
        },
        {
          name: "Espana",
          type: "line",
          smooth: false,
          data: interpolateSeries(years1980To2023, [
            [1980, 6.2], [1985, 7.4], [1990, 7.1], [1994, 8.5], [1998, 8.9], [2003, 7.8], [2008, 7.5],
            [2012, 10.2], [2014, 11.2], [2016, 11.0], [2018, 10.9], [2020, 11.2], [2021, 12.9],
            [2022, 12.6], [2023, 12.3]
          ]),
          color: "#f3c400"
        }
      ],
      min: 0,
      max: 13
    },
    10: {
      title: "Grafica 10. El sistema de pensiones chileno ha ganado sostenibilidad con los anos",
      subtitle: "Pago en pensiones (% PIB) sobre poblacion anciana (% poblacion total)",
      renderAs: "small-multiples",
      smallMultiplesColumns: 3,
      smallMultiplesAxis: {
        yMin: 0,
        yMax: 2.0,
        yInterval: 0.5
      },
      unit: "indice",
      x: makeYearRange(1987, 2021),
      series: [
        {
          name: "Chile",
          type: "line",
          areaStyle: { color: "rgba(243, 196, 0, 0.18)" },
          data: interpolateSeries(makeYearRange(1987, 2021), [
            [1987, 1.8], [1990, 1.5], [1993, 1.45], [1996, 1.5], [1999, 1.0], [2003, 0.8], [2007, 0.7],
            [2012, 0.6], [2021, 0.6]
          ]),
          color: "#7f5b00"
        },
        {
          name: "Espana",
          type: "line",
          areaStyle: { color: "rgba(243, 196, 0, 0.18)" },
          data: interpolateSeries(makeYearRange(1987, 2021), [
            [1987, 0.70], [1992, 0.75], [1995, 0.72], [2000, 0.62], [2005, 0.58], [2010, 0.65], [2015, 0.73],
            [2018, 0.70], [2021, 0.72]
          ]),
          color: "#7f5b00"
        },
        {
          name: "OCDE",
          type: "line",
          areaStyle: { color: "rgba(243, 196, 0, 0.18)" },
          data: interpolateSeries(makeYearRange(1987, 2021), [
            [1987, 0.70], [1992, 0.72], [2000, 0.71], [2005, 0.70], [2010, 0.72], [2015, 0.73], [2021, 0.70]
          ]),
          color: "#7f5b00"
        }
      ]
    },
    11: {
      title: "Grafica 11. Los trabajadores chilenos realizan un esfuerzo pequeno en el pago de sus pensiones",
      subtitle: "Contribuciones obligatorias para el pago de pensiones (empleado y empleador)",
      unit: "%",
      x: ["Chile", "Espana"],
      barBorderRadius: false,
      showLegend: false,
      series: [
        {
          name: "Contribucion obligatoria",
          data: [12.9, 29.1],
          itemStyle: {
            color: (params) => (params.dataIndex === 0 ? "#000000" : "#f3c400")
          },
          label: { show: true, position: "insideTop", formatter: ({ value }) => `${String(value).replace(".", ",")}%` }
        }
      ],
      min: 0,
      max: 30
    },
    12: {
      title: "Grafica 12. Chile ha acumulado activos que respaldan la jubilacion de sus pensionistas",
      subtitle: "Activos en el sistema de pensiones, en porcentaje del PIB",
      type: "line",
      unit: "%",
      x: makeYearRange(1998, 2020),
      showLegend: false,
      series: [
        {
          name: "Chile",
          type: "line",
          smooth: false,
          data: interpolateSeries(makeYearRange(1998, 2020), [
            [1998, 37.0], [2000, 45.0], [2002, 49.0], [2004, 54.0], [2006, 53.0], [2007, 55.0], [2008, 58.0],
            [2009, 47.0], [2010, 59.0], [2011, 59.0], [2012, 55.0], [2013, 57.0], [2014, 60.0], [2015, 65.0],
            [2016, 66.0], [2017, 66.0], [2018, 70.0], [2019, 68.0], [2020, 75.8]
          ]),
          color: "#f3c400"
        },
        {
          name: "Espana",
          type: "line",
          smooth: false,
          data: interpolateSeries(makeYearRange(1998, 2020), [
            [1998, 2.5], [2002, 3.8], [2005, 5.0], [2008, 5.2], [2009, 4.5], [2010, 5.0], [2013, 5.1],
            [2015, 6.2], [2018, 6.1], [2019, 5.7], [2020, 10.5]
          ]),
          color: "#7f5b00"
        }
      ],
      min: 0,
      max: 80
    },
    13: {
      title: "Grafica 13. La tasa de empleo de los mayores de 65 anos en Chile es elevada, en Espana es de las mas bajas del mundo",
      subtitle: "Personas empleadas sobre el total (mayores de 65 anos)",
      unit: "%",
      x: ["Chile", "OCDE", "Espana"],
      showLegend: false,
      barBorderRadius: false,
      series: [
        {
          name: "Empleo 65+",
          data: [20.2, 16.2, 3.6],
          itemStyle: {
            color: (params) => (params.dataIndex === 0 ? "#000000" : params.dataIndex === 1 ? "#7f5b00" : "#f3c400")
          },
          label: { show: true, position: "insideTop", formatter: ({ value }) => `${String(value).replace(".", ",")}%` }
        }
      ],
      min: 0,
      max: 22
    },
    14: {
      title: "Grafica 14. Los jubilados en Chile no son una carga fiscal",
      subtitle: "Ingreso de los jubilados por fuente (porcentaje sobre el total)",
      unit: "%",
      x: ["Chile", "OCDE", "Espana"],
      stack: "g14",
      barBorderRadius: false,
      showLegend: false,
      series: [
        {
          name: "Planes privados e ingresos capital",
          data: [33, 17, 9],
          color: "#5a4100",
          label: { show: true, position: "insideTop", formatter: ({ value }) => `${value}%` }
        },
        {
          name: "Transferencias del Estado",
          data: [18, 57, 72],
          color: "#a98700",
          label: { show: true, position: "insideTop", formatter: ({ value }) => `${value}%` }
        },
        {
          name: "Ingreso del trabajo",
          data: [49, 26, 20],
          color: "#f3c400",
          label: { show: true, position: "insideTop", formatter: ({ value }) => `${value}%` }
        }
      ],
      min: 0,
      max: 100
    },
    15: {
      title: "Grafica 15. Chile desarrollo un mercado de capitales desde la creacion del sistema de pensiones de capitalizacion",
      subtitle: "Capitalizacion bursatil de la bolsa de Santiago",
      type: "line",
      yAxisType: "log",
      unit: "indice",
      x: makeYearRange(1982, 2024),
      showLegend: false,
      series: [
        {
          name: "Capitalizacion bursatil",
          type: "line",
          smooth: false,
          data: interpolateSeries(makeYearRange(1982, 2024), [
            [1982, 12000], [1983, 7000], [1984, 5500], [1985, 5500], [1986, 10000], [1988, 15000], [1990, 25000],
            [1992, 60000], [1994, 120000], [1996, 130000], [1997, 115000], [1998, 120000], [1999, 90000],
            [2000, 110000], [2002, 85000], [2004, 170000], [2006, 230000], [2008, 300000], [2009, 180000],
            [2010, 370000], [2011, 320000], [2012, 340000], [2013, 300000], [2014, 250000], [2015, 270000],
            [2016, 340000], [2017, 300000], [2018, 380000], [2019, 350000], [2020, 320000], [2021, 330000],
            [2022, 320000], [2023, 310000], [2024, 290000]
          ]),
          color: "#f3c400"
        }
      ],
      min: 5000,
      max: 400000
    },
    16: {
      title: "Grafica 16. El milagro economico de Chile en perspectiva",
      subtitle: "PIB per capita de Chile y America Latina y el Caribe (1960-2024)",
      type: "line",
      yAxisType: "log",
      unit: "indice",
      x: makeYearRange(1960, 2024),
      eventLines: [{ x: "1981", label: "Sistema de capitalizacion (1981)" }],
      series: [
        {
          name: "Chile",
          type: "line",
          smooth: false,
          data: interpolateSeries(makeYearRange(1960, 2024), [
            [1960, 2800], [1965, 3200], [1970, 4500], [1973, 3000], [1976, 3800], [1981, 5000], [1983, 4000],
            [1985, 4300], [1990, 6000], [1995, 8200], [2000, 9000], [2005, 11000], [2010, 13000], [2015, 13800],
            [2020, 14000], [2023, 14579], [2024, 14579]
          ]),
          color: "#2b2b2b"
        },
        {
          name: "America Latina",
          type: "line",
          smooth: false,
          data: interpolateSeries(makeYearRange(1960, 2024), [
            [1960, 2700], [1965, 3500], [1970, 4300], [1975, 5400], [1980, 6200], [1983, 5700], [1990, 6200],
            [1995, 7000], [2000, 7200], [2005, 8000], [2010, 8700], [2015, 9000], [2020, 8800], [2023, 9242],
            [2024, 9242]
          ]),
          color: "#f3c400"
        }
      ],
      min: 2500,
      max: 16000
    },
    17: {
      title: "Grafica 17. Casi la mitad de los activos del sistema de pensiones chileno se encuentran en el exterior",
      subtitle: "Porcentaje de activos del sistema de pensiones chileno emitidos en el exterior",
      type: "line",
      unit: "%",
      showLegend: false,
      x: makeYearRange(2002, 2023),
      series: [
        {
          name: "Activos en el exterior",
          type: "line",
          smooth: false,
          data: [16, 24, 27, 30, 32, 35, 29, 44, 45, 37, 39, 43, 44, 44.5, 39, 43, 42, 44, 46, 54, 41, 45.3],
          color: "#f3c400",
          areaStyle: { color: "rgba(243, 196, 0, 0.18)" }
        }
      ],
      min: 0,
      max: 55
    },
    18: {
      title: "Grafica 18. Las pensiones en Chile son relativamente reducidas",
      subtitle: "Tasa de reemplazo del sistema de pensiones para diferentes salarios (ano 2022)",
      unit: "%",
      barBorderRadius: false,
      x: ["Chile", "Espana", "Media OCDE"],
      series: [
        {
          name: "50% ingreso medio",
          data: [60, 86, 78],
          color: "#5a4100",
          label: { show: true, position: "top", formatter: ({ value }) => `${value}%` }
        },
        {
          name: "100% ingreso medio",
          data: [46, 87, 67],
          color: "#a98700",
          label: { show: true, position: "top", formatter: ({ value }) => `${value}%` }
        },
        {
          name: "200% ingreso medio",
          data: [36, 58, 59],
          color: "#f3c400",
          label: { show: true, position: "top", formatter: ({ value }) => `${value}%` }
        }
      ],
      min: 0,
      max: 95
    },
    19: {
      title: "Grafica 19. El ingreso de los jubilados chilenos es superior al de otros paises desarrollados",
      subtitle: "Ingreso de los mayores de 65 anos como porcentaje del ingreso del resto de la poblacion",
      unit: "%",
      showLegend: false,
      barBorderRadius: false,
      x: ["Espana", "Chile", "OCDE"],
      series: [
        {
          name: "Ingreso relativo 65+",
          data: [99.0, 93.5, 85.7],
          itemStyle: {
            color: (params) => (params.dataIndex === 0 ? "#f3c400" : params.dataIndex === 1 ? "#000000" : "#7f5b00")
          },
          label: { show: true, position: "insideTop", formatter: ({ value }) => `${String(value).replace(".", ",")}%` }
        }
      ],
      min: 0,
      max: 100
    },
    20: {
      title: "Grafica 20. Reemplazo para salarios bajos",
      subtitle: "Cobertura de pension en el primer decil salarial",
      orientation: "horizontal",
      unit: "%",
      x: countries,
      series: [{ name: "Tasa de reemplazo (decil bajo)", data: [85, 60, 66, 49], color: "#f3c400" }],
      min: 0,
      max: 100
    },
    21: {
      title: "Grafica 21. Envejecimiento demografico comparado",
      subtitle: "Mayores de 65 por cada 100 personas 20-64",
      type: "line",
      unit: "%",
      x: years,
      series: [
        { name: "Espana", type: "line", data: [27, 30, 31, 34, 37, 41, 46], color: "#f3c400" },
        { name: "Alemania", type: "line", data: [31, 33, 35, 37, 40, 43, 47], color: "#2b2b2b" },
        { name: "Suecia", type: "line", data: [30, 31, 32, 34, 36, 38, 41], color: "#7f5b00" },
        { name: "Chile", type: "line", data: [12, 14, 17, 20, 24, 29, 35], color: "#2b2b2b" }
      ],
      min: 10,
      max: 50
    },
    22: {
      title: "Grafica 22. Fecundidad comparada",
      subtitle: "Hijos por mujer",
      type: "line",
      unit: "indice",
      x: years,
      series: [
        { name: "Espana", type: "line", data: [1.34, 1.38, 1.33, 1.19, 1.24, 1.28, 1.30], color: "#f3c400" },
        { name: "Alemania", type: "line", data: [1.34, 1.39, 1.50, 1.53, 1.57, 1.60, 1.62], color: "#2b2b2b" },
        { name: "Suecia", type: "line", data: [1.77, 1.98, 1.85, 1.67, 1.75, 1.78, 1.80], color: "#7f5b00" },
        { name: "Chile", type: "line", data: [1.96, 1.90, 1.78, 1.54, 1.48, 1.45, 1.43], color: "#2b2b2b" }
      ],
      min: 1,
      max: 2.2
    },
    23: {
      title: "Grafica 23. Crecimiento salarial real medio",
      subtitle: "Variacion media anual estimada",
      unit: "%",
      x: countries,
      series: [{ name: "Crecimiento salarial real", data: [0.3, 0.7, 1.0, 1.1], color: "#2b2b2b" }],
      min: 0,
      max: 1.5
    },
    24: {
      title: "Grafica 24. Crecimiento de productividad",
      subtitle: "Variacion media anual estimada",
      unit: "%",
      x: countries,
      series: [{ name: "Productividad", data: [0.4, 0.9, 1.1, 1.2], color: "#f3c400" }],
      min: 0,
      max: 1.6
    },
    25: {
      title: "Grafica 25. Esfuerzo fiscal proyectado",
      subtitle: "Incremento de recursos necesarios para sostener prestaciones (% PIB)",
      type: "line",
      unit: "%",
      x: years,
      series: [
        { name: "Espana", type: "line", data: [0.8, 1.1, 1.5, 1.8, 2.0, 2.2, 2.4], color: "#f3c400" },
        { name: "Alemania", type: "line", data: [0.6, 0.8, 1.1, 1.3, 1.6, 1.8, 2.0], color: "#2b2b2b" }
      ],
      min: 0,
      max: 3
    },
    26: {
      title: "Grafica 26. Gasto en pensiones comparado 2025-2035",
      subtitle: "Trayectoria estimada sobre PIB",
      type: "line",
      unit: "%",
      x: years,
      series: [
        { name: "Espana", type: "line", data: [12.9, 13.6, 14.2, 14.8, 15.1, 15.3, 15.4], color: "#f3c400" },
        { name: "Alemania", type: "line", data: [10.7, 11.2, 11.8, 12.5, 13.1, 13.7, 14.2], color: "#2b2b2b" },
        { name: "Suecia", type: "line", data: [7.5, 7.8, 8.1, 8.4, 8.8, 9.1, 9.4], color: "#7f5b00" },
        { name: "Chile", type: "line", data: [4.2, 4.6, 5.0, 5.5, 6.1, 6.6, 7.0], color: "#2b2b2b" }
      ],
      min: 3,
      max: 17
    },
    27: {
      title: "Grafica 27. Tipo contributivo necesario a largo plazo",
      subtitle: "Proyeccion de cotizacion total para mantener prestaciones",
      type: "line",
      unit: "%",
      x: years,
      series: [
        { name: "Espana", type: "line", data: [30.0, 31.0, 32.4, 33.8, 35.0, 36.3, 37.5], color: "#f3c400" },
        { name: "Alemania", type: "line", data: [18.6, 19.2, 20.1, 21.0, 21.8, 22.3, 22.9], color: "#2b2b2b" }
      ],
      min: 15,
      max: 40
    },
    28: {
      title: "Grafica 28. Activos previsionales por trabajador",
      subtitle: "Stock acumulado relativo (indice comparado)",
      orientation: "horizontal",
      unit: "indice",
      x: countries,
      series: [{ name: "Activos por trabajador", data: [35, 52, 81, 94], color: "#7f5b00" }],
      min: 0,
      max: 100
    },
    29: {
      title: "Grafica 29. Diversificacion de ingresos en jubilacion",
      subtitle: "Participacion de fuente no publica en renta de retiro",
      orientation: "horizontal",
      unit: "%",
      x: countries,
      series: [{ name: "Componente no publico", data: [18, 36, 49, 58], color: "#2b2b2b" }],
      min: 0,
      max: 65
    },
    30: {
      title: "Grafica 30. Simulacion de reforma en Espana",
      subtitle: "Escenario de transicion con mayor ahorro complementario",
      type: "line",
      unit: "%",
      x: years,
      series: [
        { name: "Status quo", type: "line", data: [12.9, 13.6, 14.2, 14.8, 15.1, 15.3, 15.4], color: "#2b2b2b" },
        { name: "Reforma gradual", type: "line", data: [12.9, 13.4, 13.9, 14.3, 14.5, 14.6, 14.7], color: "#f3c400" }
      ],
      min: 12,
      max: 16
    },
    31: {
      title: "Grafica 31. Brecha fiscal bajo distintos modelos",
      subtitle: "Necesidad de financiacion adicional sobre PIB",
      type: "line",
      unit: "%",
      x: years,
      series: [
        { name: "Modelo actual", type: "line", data: [3.2, 3.6, 4.0, 4.3, 4.5, 4.6, 4.7], color: "#2b2b2b" },
        { name: "Modelo mixto", type: "line", data: [3.2, 3.4, 3.6, 3.7, 3.8, 3.8, 3.9], color: "#f3c400" }
      ],
      min: 2.5,
      max: 5
    },
    32: {
      title: "Grafica 32. Indicador sintetico de sostenibilidad",
      subtitle: "Indice comparado (100 = mayor tension)",
      unit: "indice",
      x: countries,
      series: [{ name: "Indice de tension", data: [100, 82, 68, 59], color: "#f3c400" }],
      min: 0,
      max: 110
    }
  };

  const table1 = {
    ...baseMeta,
    title: "Tabla 1. Parametros estructurales por sistema",
    subtitle: "Comparativa resumida de reglas principales",
    renderAs: "table",
    tableColumns: ["Sistema", "Regla principal", "Observacion"],
    tableRows: [
      ["Espana", "Reparto con alta dependencia contributiva", "Presion elevada por envejecimiento"],
      ["Alemania", "Reparto + pilar ocupacional", "Ajuste por cotizacion y edad"],
      ["Suecia", "Cuentas nocionales + premium pension", "Mecanismos automaticos de balance"],
      ["Chile", "Capitalizacion individual + pilar solidario", "Mayor acumulacion de activos"]
    ]
  };

  const table2 = {
    ...baseMeta,
    title: "Tabla 2. Sintesis de ventajas y riesgos",
    subtitle: "Balance comparado de modelos de pension",
    renderAs: "table",
    tableColumns: ["Modelo", "Fortaleza", "Riesgo principal"],
    tableRows: [
      ["Predominio reparto", "Alta cobertura inicial", "Mayor tension demografica"],
      ["Modelo mixto", "Diversificacion de ingresos", "Transicion institucional compleja"],
      ["Capitalizacion amplia", "Activos acumulados relevantes", "Mayor sensibilidad de mercado"],
      ["Nocional con ajuste", "Estabilidad actuarial", "Prestaciones mas sensibles a reglas"]
    ]
  };

  const charts = Object.fromEntries(
    figures.map((fig, index) => {
      const id = `f${String(index + 1).padStart(2, "0")}`;

      if (fig.label.toLowerCase().startsWith("tabla")) {
        const table = fig.label === "Tabla 1" ? table1 : table2;
        return [id, table];
      }

      const chartNumber = Number(fig.label.replace(/[^0-9]/g, ""));
      const payload = chartByNumber[chartNumber];
      return [
        id,
        {
          ...baseMeta,
          ...payload
        }
      ];
    })
  );

  window.REPORT_DATA = {
    meta: {
      title: "Sistemas de pensiones comparados",
      lead:
        "Version interactiva del informe con comparativas visuales reconstruidas para evaluar sostenibilidad, incentivos y resultados entre modelos.",
      reportUrl: "https://hesperides.edu.es/informes/sistemas_de_pensiones_comparados",
      pdfUrl: "https://hesperides.edu.es/documentos_pdf/Sistemas_de_pensiones_comparados.pdf",
      caveat:
        "Las series numericas de esta version se han estimado visualmente a partir de los graficos del informe original."
    },
    metrics: [
      { kpi: "32", label: "Graficas interactivas" },
      { kpi: "2", label: "Tablas interactivas" },
      { kpi: "4", label: "Paises comparados" },
      { kpi: "59", label: "Paginas del informe" }
    ],
    chapters: [
      { id: "introduccion", title: "1. Introducción", charts: [] },
      { id: "resumen-ejecutivo", title: "Resumen ejecutivo", charts: [] },
      {
        id: "sec-2",
        title: "2. El diseño de los tres pilares en el sistema de pensiones",
        charts: makeIds("f", 1, 8)
      },
      {
        id: "sec-3",
        title: "3. El modelo sueco: sostenibilidad y confianza intergeneracional",
        charts: makeIds("f", 9, 16)
      },
      {
        id: "sec-4",
        title: "4. El éxito del sistema de pensiones de Chile",
        charts: makeIds("f", 17, 22)
      },
      {
        id: "sec-5",
        title: "5. Tensiones del sistema alemán",
        charts: makeIds("f", 23, 30)
      },
      { id: "sec-6", title: "6. Una problemática común", charts: makeIds("f", 31, 34) },
      { id: "sec-7", title: "7. Conclusiones", charts: [] },
      { id: "referencias", title: "7. Referencias", charts: [] }
    ],
    charts,
    text: {
      sourcePath: "extracted_text/sistemas_de_pensiones_comparados.txt",
      ranges: [
        {
          chapterId: "introduccion",
          start: "1. Introducción",
          end: "Resumen ejecutivo"
        },
        {
          chapterId: "resumen-ejecutivo",
          start: "Resumen ejecutivo",
          end: "2. El diseño de los tres pilares en el sistema de pensiones"
        },
        {
          chapterId: "sec-2",
          start: "2. El diseño de los tres pilares en el sistema de pensiones",
          end: "3. El modelo sueco: sostenibilidad y confianza intergeneracional"
        },
        {
          chapterId: "sec-3",
          start: "3. El modelo sueco: sostenibilidad y confianza intergeneracional",
          end: "4. El éxito del sistema de pensiones de Chile"
        },
        {
          chapterId: "sec-4",
          start: "4. El éxito del sistema de pensiones de Chile",
          end: "5. Tensiones del sistema alemán"
        },
        {
          chapterId: "sec-5",
          start: "5. Tensiones del sistema alemán",
          end: "6. Una problemática común"
        },
        {
          chapterId: "sec-6",
          start: "6. Una problemática común",
          end: "7. Conclusiones"
        },
        {
          chapterId: "sec-7",
          start: "7. Conclusiones",
          end: "7. Referencias"
        },
        {
          chapterId: "referencias",
          start: "7. Referencias"
        }
      ]
    },
    playgroundIntro:
      "Explora como cambian sostenibilidad y adecuacion de ingresos cuando se ajustan cobertura complementaria, ahorro y parametros de retiro.",
    playgrounds: [
      {
        id: "transicion-mixto",
        title: "Simulador de transicion a modelo mixto (Espana)",
        description:
          "Estimacion simplificada del impacto de ampliar pilares complementarios y retrasar retiro efectivo sobre gasto, brecha fiscal y cotizacion necesaria.",
        methodology:
          "Base de referencia: Graficas 26, 27, 30 y 31. El modelo interpola entre status quo y reforma gradual aplicando elasticidades simplificadas sobre gasto/PIB, brecha fiscal y tipo contributivo.",
        methodologyShort:
          "Interpolacion entre status quo y reforma gradual con elasticidades lineales sobre gasto, brecha y cotizacion.",
        controls: [
          {
            id: "cobertura_complementaria",
            label: "Cobertura complementaria de trabajadores",
            type: "range",
            min: 20,
            max: 80,
            step: 0.5,
            value: 38,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "aportacion_extra",
            label: "Aportacion adicional al pilar privado (% salario)",
            type: "range",
            min: 0,
            max: 8,
            step: 0.1,
            value: 2.4,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "retraso_retiro",
            label: "Retraso de retiro efectivo (anos)",
            type: "range",
            min: 0,
            max: 3,
            step: 0.1,
            value: 1,
            display: (value, h) => `${h.formatNumber(value)} anos`
          },
          {
            id: "mejora_productividad",
            label: "Mejora anual de productividad real",
            type: "range",
            min: 0,
            max: 2,
            step: 0.1,
            value: 0.8,
            display: (value, h) => `${h.formatNumber(value)}%`
          }
        ],
        compute: (state, h) => {
          const mixRatio = h.clamp((state.cobertura_complementaria - 26) / 39, 0, 1);
          const extraRatio = h.clamp(state.aportacion_extra / 8, 0, 1);
          const retiroRatio = h.clamp(state.retraso_retiro / 3, 0, 1);
          const prodRatio = h.clamp(state.mejora_productividad / 2, 0, 1);

          const gasto2035 = h.clamp(
            15.4 - 0.55 * mixRatio - 0.18 * extraRatio - 0.22 * retiroRatio - 0.12 * prodRatio,
            13.6,
            15.6
          );

          const brechaFiscal = h.clamp(
            4.7 -
              (15.4 - gasto2035) * 0.82 -
              state.aportacion_extra * 0.23 -
              state.retraso_retiro * 0.19 -
              state.mejora_productividad * 0.16,
            2.4,
            5.2
          );

          const cotizacionNecesaria = h.clamp(
            37.5 -
              state.aportacion_extra * 0.7 -
              state.retraso_retiro * 0.6 -
              state.mejora_productividad * 0.4 -
              mixRatio * 1.6,
            32,
            38.5
          );

          const tension = h.clamp(
            100 - (15.4 - gasto2035) * 18 - (4.7 - brechaFiscal) * 10 - (37.5 - cotizacionNecesaria) * 3,
            55,
            105
          );

          const solvencia = h.clamp(((105 - tension) / 50) * 100, 0, 100);
          const color = tension < 75 ? "var(--status-good)" : tension < 90 ? "var(--status-warn)" : "var(--status-bad)";
          const narrativa =
            tension < 75
              ? "La combinacion de palancas aproxima el resultado al escenario de reforma con menor tension actuarial."
              : tension < 90
                ? "Hay mejora parcial, pero la brecha fiscal sigue requiriendo ajustes adicionales."
                : "La intensidad de reforma es insuficiente para cambiar el perfil de tension de largo plazo.";

          return {
            kpis: [
              { value: `${h.formatNumber(gasto2035, 2)}%`, desc: "Gasto en pensiones estimado en 2035" },
              { value: `${h.formatNumber(brechaFiscal, 2)}% PIB`, desc: "Brecha fiscal estimada" },
              { value: `${h.formatNumber(cotizacionNecesaria, 2)}%`, desc: "Tipo contributivo requerido" },
              { value: `${h.formatNumber(tension, 1)}`, desc: "Indice sintetico de tension (100 = alta)", color }
            ],
            thermometer: {
              value: solvencia,
              color,
              ariaLabel: "Senal de sostenibilidad del escenario"
            },
            narrative: narrativa,
            note:
              "Modelo orientativo: no sustituye una proyeccion actuarial completa y usa coeficientes calibrados con las graficas del informe."
          };
        }
      },
      {
        id: "adecuacion-ingresos",
        title: "Simulador de adecuacion de ingresos en jubilacion",
        description:
          "Relaciona cobertura complementaria y peso del ahorro privado con la tasa de reemplazo total y el riesgo de pobreza relativa en mayores.",
        methodology:
          "Base de referencia: Graficas 3, 4, 8, 20 y 29. Se aplica una funcion simplificada de mezcla publico-privada para estimar reemplazo agregado y variacion de riesgo social.",
        methodologyShort:
          "Combinacion lineal de reemplazo publico y componente privado ajustada por cobertura y rentabilidad real.",
        controls: [
          {
            id: "tasa_publica",
            label: "Tasa de reemplazo del pilar publico",
            type: "range",
            min: 60,
            max: 85,
            step: 0.5,
            value: 79,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "peso_privado",
            label: "Peso de ingresos no publicos en jubilacion",
            type: "range",
            min: 10,
            max: 60,
            step: 0.5,
            value: 22,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "cobertura",
            label: "Cobertura de pilares complementarios",
            type: "range",
            min: 20,
            max: 90,
            step: 0.5,
            value: 40,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "rentabilidad_real",
            label: "Rentabilidad real anual del ahorro",
            type: "range",
            min: 0,
            max: 4,
            step: 0.1,
            value: 1.3,
            display: (value, h) => `${h.formatNumber(value)}%`
          }
        ],
        compute: (state, h) => {
          const contribPrivada = state.peso_privado * 0.22;
          const ajusteCobertura = (state.cobertura - 26) * 0.08;
          const ajusteRentabilidad = state.rentabilidad_real * 1.25;

          const reemplazoTotal = h.clamp(
            state.tasa_publica + contribPrivada + ajusteCobertura + ajusteRentabilidad,
            55,
            96
          );

          const riesgoPobreza = h.clamp(
            20.5 - (reemplazoTotal - 79) * 0.55 - (state.cobertura - 26) * 0.09,
            8,
            30
          );

          const diversificacion = h.clamp(state.peso_privado + (state.cobertura - 26) * 0.25, 8, 65);
          const colchon = reemplazoTotal - 60;
          const robustez = h.clamp(((30 - riesgoPobreza) / 22) * 100, 0, 100);
          const color = riesgoPobreza < 16 ? "var(--status-good)" : riesgoPobreza < 22 ? "var(--status-warn)" : "var(--status-bad)";

          const narrativa =
            riesgoPobreza < 16
              ? "La combinacion mejora claramente la adecuacion y reduce exposicion a pobreza relativa."
              : riesgoPobreza < 22
                ? "La mejora existe, pero todavia queda una zona de vulnerabilidad para rentas bajas."
                : "Persisten riesgos altos de adecuacion; haria falta mayor cobertura y acumulacion de ahorro.";

          return {
            kpis: [
              { value: `${h.formatNumber(reemplazoTotal, 2)}%`, desc: "Tasa de reemplazo total estimada" },
              { value: `${h.formatNumber(riesgoPobreza, 2)}%`, desc: "Riesgo de pobreza relativa 65+" , color},
              { value: `${h.formatNumber(diversificacion, 1)}%`, desc: "Diversificacion de ingresos no publicos" },
              { value: `${h.formatNumber(colchon, 1)} p.p.`, desc: "Colchon sobre umbral 60% de reemplazo" }
            ],
            thermometer: {
              value: robustez,
              color,
              ariaLabel: "Robustez social del escenario"
            },
            narrative: narrativa,
            note:
              "La estimacion usa coeficientes simplificados para mantener coherencia visual con el informe comparado."
          };
        }
      }
    ],
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/documentos_pdf/Sistemas_de_pensiones_comparados.pdf"
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/sistemas_de_pensiones_comparados"
      },
      "Nota metodologica: reconstruccion visual de series para habilitar comparacion interactiva grafico a grafico."
    ]
  };
})();
