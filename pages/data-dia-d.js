(() => {
  const makeIds = (prefix, from, to) => {
    const ids = [];
    for (let i = from; i <= to; i += 1) {
      ids.push(`${prefix}${String(i).padStart(2, "0")}`);
    }
    return ids;
  };

  const charts = {
    f01: {
      title: "Tabla 1. Impacto de una generacion muy numerosa en la tasa de dependencia de un pais",
      subtitle: "Fases vitales de la nueva generacion y su transicion demografica",
      source: "El dia D de las pensiones ha llegado (2025) · Elaboracion propia",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "exacta del informe",
      renderAs: "table",
      tableHighlightFirstRow: false,
      tableColumns: ["Fases vitales nueva generacion", "Fases transicion demografica"],
      tableRows: [
        ["Nacimiento", "Inicio transicion demografica"],
        ["< 15 anos", "Alta dependencia por poblacion joven"],
        ["Entre 15 y 64 anos", "Baja dependencia (bono demografico)"],
        ["> 65 anos", "Alta dependencia poblacion anciana"],
        ["Fallecimiento", "Transicion demografica completa"]
      ]
    },
    f02: {
      title: "Grafico 1. La natalidad espanola no alcanza el umbral de reemplazo generacional desde 1980",
      subtitle: "Tasa de fertilidad vs. tasa de reemplazo en Espana (1975-2023)",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "hijos por mujer",
      x: ["1975", "1978", "1980", "1983", "1985", "1990", "1995", "2000", "2005", "2010", "2015", "2020", "2023"],
      series: [
        {
          name: "Tasa de fertilidad",
          type: "line",
          data: [2.77, 2.5, 2.1, 1.8, 1.6, 1.35, 1.19, 1.18, 1.27, 1.45, 1.32, 1.24, 1.12],
          color: "#f3c400",
          symbolSize: 5
        },
        {
          name: "Tasa reemplazo",
          type: "line",
          data: [2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1],
          color: "#7f5b00",
          lineStyle: {
            type: "dashed",
            width: 1.8
          },
          symbol: "none"
        }
      ],
      min: 0,
      max: 3
    },
    f03: {
      title: "Grafico 2. La emigracion de espanoles se frena en los anos 80s y se invierte en los anos 90s",
      subtitle: "Saldo neto emigracion de espanoles (salidas menos retornos)",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      unit: "miles",
      x: [
        "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973", "1974",
        "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984",
        "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994",
        "1995", "1996", "1997", "1998", "1999", "2000"
      ],
      series: [
        {
          name: "Saldo neto",
          data: [
            { value: -60, itemStyle: { color: "#f3c400" } },
            { value: -30, itemStyle: { color: "#f3c400" } },
            { value: -30, itemStyle: { color: "#f3c400" } },
            { value: -70, itemStyle: { color: "#f3c400" } },
            { value: -115, itemStyle: { color: "#f3c400" } },
            { value: -135, itemStyle: { color: "#f3c400" } },
            { value: -118, itemStyle: { color: "#f3c400" } },
            { value: -130, itemStyle: { color: "#f3c400" } },
            { value: -86, itemStyle: { color: "#f3c400" } },
            { value: -66, itemStyle: { color: "#f3c400" } },
            { value: -9, itemStyle: { color: "#f3c400" } },
            { value: -42, itemStyle: { color: "#f3c400" } },
            { value: -35, itemStyle: { color: "#f3c400" } },
            { value: -57, itemStyle: { color: "#f3c400" } },
            { value: -85, itemStyle: { color: "#f3c400" } },
            { value: -92, itemStyle: { color: "#f3c400" } },
            { value: -95, itemStyle: { color: "#f3c400" } },
            { value: -95, itemStyle: { color: "#f3c400" } },
            { value: -88, itemStyle: { color: "#f3c400" } },
            { value: -78, itemStyle: { color: "#f3c400" } },
            { value: -68, itemStyle: { color: "#f3c400" } },
            { value: -61, itemStyle: { color: "#f3c400" } },
            { value: -53, itemStyle: { color: "#f3c400" } },
            { value: -41, itemStyle: { color: "#f3c400" } },
            { value: -30, itemStyle: { color: "#f3c400" } },
            { value: -11, itemStyle: { color: "#f3c400" } },
            { value: -10, itemStyle: { color: "#f3c400" } },
            { value: 11, itemStyle: { color: "#6b4a00" } },
            { value: 20, itemStyle: { color: "#6b4a00" } },
            { value: 19, itemStyle: { color: "#6b4a00" } },
            { value: 18, itemStyle: { color: "#6b4a00" } },
            { value: 20, itemStyle: { color: "#6b4a00" } },
            { value: 22, itemStyle: { color: "#6b4a00" } },
            { value: 27, itemStyle: { color: "#6b4a00" } },
            { value: 32, itemStyle: { color: "#6b4a00" } },
            { value: 35, itemStyle: { color: "#6b4a00" } }
          ],
          barMaxWidth: 12
        }
      ],
      zeroLine: true,
      min: -150,
      max: 50
    },
    f04: {
      title: "Grafico 3. Las nuevas generaciones de espanoles son mucho menos numerosas que las anteriores",
      subtitle: "Personas (millones) por generacion a lo largo de su ciclo vital",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      renderAs: "small-multiples",
      smallMultiplesType: "bar",
      unit: "millones",
      x: ["Nacidos", "5-14 anos", "15-24 anos", "25-34 anos", "35-44 anos", "45-54 anos", "55-64 anos", "65-74 anos", "75+ anos"],
      smallMultiplesAxis: {
        yMin: 0,
        yMax: 8,
        yInterval: 1,
        xTickIndices: [0, 8]
      },
      series: [
        {
          name: "Nacidos 1936-1945",
          color: "#f3c400",
          data: [5.6, 5.0, 4.7, 4.3, 4.1, null, null, null, null]
        },
        {
          name: "Nacidos 1946-1955",
          color: "#f3c400",
          data: [5.8, 5.3, 4.9, 5.1, null, null, null, null, null]
        },
        {
          name: "Nacidos 1956-1965",
          color: "#f3c400",
          data: [6.5, 6.2, 6.3, 6.8, 6.4, null, null, null, null]
        },
        {
          name: "Nacidos 1966-1975",
          color: "#f3c400",
          data: [6.7, 6.6, 6.4, 7.3, null, null, null, null, null]
        },
        {
          name: "Nacidos 1976-1985",
          color: "#2b2b2b",
          data: [5.6, 5.6, 7.3, null, null, null, null, null, null]
        },
        {
          name: "Nacidos 1986-1995",
          color: "#2b2b2b",
          data: [4.0, 4.7, 5.0, 5.3, null, null, null, null, null]
        },
        {
          name: "Nacidos 1996-2005",
          color: "#2b2b2b",
          data: [4.1, 4.4, 4.8, null, null, null, null, null, null]
        },
        {
          name: "Nacidos 2006-2015",
          color: "#2b2b2b",
          data: [4.8, 4.8, null, null, null, null, null, null, null]
        }
      ],
      min: 0,
      max: 8
    },
    f05: {
      title: "Grafico 4. El gran reto demografico espanol: 3,25 personas en edad laboral por cada anciano",
      subtitle: "Ratio de personas entre 15 y 64 anos sobre personas mayores de 65 anos en Espana (1962-2024)",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      unit: "ratio",
      x: [
        "1962", "1965", "1968", "1971", "1974", "1977", "1980", "1983", "1986", "1989", "1992",
        "1995", "1998", "2001", "2004", "2007", "2010", "2013", "2016", "2019", "2022", "2024"
      ],
      series: [
        {
          name: "Ratio 15-64 / 65+",
          data: [
            { value: 7.69, itemStyle: { color: "#f3c400" } },
            7.2,
            6.8,
            6.5,
            6.3,
            6.1,
            { value: 5.68, itemStyle: { color: "#e0b100" } },
            5.6,
            5.5,
            5.4,
            { value: 4.95, itemStyle: { color: "#e0b100" } },
            4.8,
            4.6,
            { value: 4.15, itemStyle: { color: "#e0b100" } },
            4.07,
            3.9,
            3.7,
            3.5,
            { value: 3.39, itemStyle: { color: "#e0b100" } },
            { value: 3.25, itemStyle: { color: "#e0b100" } },
            3.28,
            3.25
          ],
          color: "#f3c400"
        }
      ],
      min: 0,
      max: 8
    },
    f06: {
      title: "Tabla 2. La Seguridad Social nacio en el ano 1967 y provoco que las personas se jubilaran antes",
      subtitle: "Edad de entrada y salida de la vida activa en 1960 y 1970 en Espana (anos)",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "exacta del informe",
      renderAs: "table",
      tableHighlightFirstRow: false,
      tableColumns: ["", "1960", "1970"],
      tableRows: [
        ["Edad entrada vida activa", "16,7", "18,0"],
        ["Edad salida vida activa", "72,6", "66,4"],
        ["Duracion vida activa", "55,9", "48,4"]
      ],
      tableCellClasses: {
        "1:1": "cell-strong-highlight",
        "1:2": "cell-strong-highlight",
        "2:1": "cell-soft-highlight",
        "2:2": "cell-soft-highlight"
      }
    },
    f07: {
      title: "Grafico 5. Gasto en pensiones contributivas",
      subtitle: "Porcentaje del PIB",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "%",
      x: ["2000", "2005", "2010", "2015", "2020", "2024"],
      series: [
        {
          name: "Gasto contributivo / PIB",
          type: "line",
          data: [7.2, 7.6, 9.0, 10.4, 11.5, 12.2],
          color: "#2b2b2b",
          areaStyle: 0.14
        }
      ],
      min: 6,
      max: 13
    },
    f08: {
      title: "Grafico 6. Numero total de pensionistas",
      subtitle: "Millones de perceptores",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "M",
      x: ["2000", "2005", "2010", "2015", "2020", "2024"],
      series: [
        {
          name: "Pensionistas",
          type: "line",
          data: [7.4, 7.8, 8.3, 8.9, 9.7, 10.2],
          color: "#f3c400"
        }
      ],
      min: 7,
      max: 10.5
    },
    f09: {
      title: "Grafico 7. Cotizantes por pensionista",
      subtitle: "Relacion de equilibrio del sistema",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "indice",
      x: ["2000", "2005", "2010", "2015", "2020", "2024"],
      series: [
        {
          name: "Ratio cotizantes/pensionista",
          type: "line",
          data: [2.45, 2.5, 2.35, 2.24, 2.16, 2.1],
          color: "#7f5b00"
        }
      ],
      min: 1.9,
      max: 2.6
    },
    f10: {
      title: "Grafico 8. Altas de jubilacion anual",
      subtitle: "Miles de nuevas jubilaciones",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      unit: "M",
      x: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
      series: [
        {
          name: "Altas de jubilacion (miles)",
          data: [280, 292, 301, 315, 334, 358, 381],
          color: "#f3c400"
        }
      ],
      min: 240,
      max: 420
    },
    f11: {
      title: "Grafico 9. Edad efectiva vs edad legal",
      subtitle: "Comparacion media de salida del mercado laboral",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "indice",
      x: ["2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
      series: [
        {
          name: "Edad legal",
          type: "line",
          data: [65.0, 65.1, 65.3, 65.5, 65.7, 65.9, 66.3, 66.6],
          color: "#2b2b2b"
        },
        {
          name: "Edad efectiva",
          type: "line",
          data: [63.2, 63.3, 63.5, 63.7, 63.9, 64.1, 64.5, 64.9],
          color: "#f3c400"
        }
      ],
      min: 62,
      max: 67
    },
    f12: {
      title: "Grafico 10. Pension media de jubilacion (real)",
      subtitle: "Indice base 2010 = 100",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "indice",
      x: ["2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
      series: [
        {
          name: "Pension media real",
          type: "line",
          data: [100, 103, 107, 111, 116, 121, 127, 133],
          color: "#7f5b00"
        }
      ],
      min: 95,
      max: 140
    },
    f13: {
      title: "Grafico 11. Salario medio real",
      subtitle: "Indice base 2010 = 100",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "indice",
      x: ["2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
      series: [
        {
          name: "Salario medio real",
          type: "line",
          data: [100, 100.8, 101.5, 102.2, 103.1, 102.8, 103.6, 104.1],
          color: "#2b2b2b"
        }
      ],
      min: 96,
      max: 108
    },
    f14: {
      title: "Grafico 12. Brecha pension-salario",
      subtitle: "Diferencia de indices reales entre pension media y salario medio",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      unit: "indice",
      x: ["2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
      series: [
        {
          name: "Pension media",
          data: [100, 103, 107, 111, 116, 121, 127, 133],
          color: "#f3c400"
        },
        {
          name: "Salario medio",
          data: [100, 101, 102, 102, 103, 103, 104, 104],
          color: "#2b2b2b"
        }
      ],
      min: 96,
      max: 136
    },
    f15: {
      title: "Grafico 13. Deficit contributivo",
      subtitle: "Saldo anual del sistema contributivo (M€)",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "M€",
      x: ["2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
      series: [
        {
          name: "Saldo contributivo",
          type: "line",
          data: [-9000, -15500, -23000, -29000, -36000, -45000, -56000, -64000],
          color: "#7f5b00",
          areaStyle: 0.14
        }
      ],
      min: -70000,
      max: 0
    },
    f16: {
      title: "Grafico 14. Transferencias del Estado a la Seguridad Social",
      subtitle: "Flujo de apoyo presupuestario anual (M€)",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      unit: "M€",
      x: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
      series: [
        {
          name: "Transferencias",
          data: [12000, 15000, 18000, 22000, 32000, 39000, 47000, 52000, 54000],
          color: "#f3c400"
        }
      ],
      min: 0,
      max: 60000
    },
    f17: {
      title: "Grafico 15. Deuda asociada al sistema",
      subtitle: "Evolucion del pasivo financiero vinculado a Seguridad Social (M€)",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "M€",
      x: ["2012", "2014", "2016", "2018", "2020", "2022", "2024"],
      series: [
        {
          name: "Deuda acumulada",
          type: "line",
          data: [18000, 28000, 42000, 56000, 74000, 92000, 108000],
          color: "#2b2b2b",
          areaStyle: 0.12
        }
      ],
      min: 0,
      max: 115000
    },
    f18: {
      title: "Grafico 16. Comparacion europea del gasto en pensiones",
      subtitle: "Porcentaje del PIB en economias comparables",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      orientation: "horizontal",
      unit: "%",
      x: ["Irlanda", "Alemania", "Espana", "Italia", "Francia"],
      series: [
        {
          name: "Gasto en pensiones / PIB",
          data: [5.2, 10.7, 12.2, 15.4, 14.8],
          color: "#7f5b00"
        }
      ],
      min: 0,
      max: 16
    },
    f19: {
      title: "Grafico 17. Escenario base de gasto 2025-2050",
      subtitle: "Trayectoria prevista de gasto en pensiones (% PIB)",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "%",
      x: ["2025", "2030", "2035", "2040", "2045", "2050"],
      series: [
        {
          name: "Escenario base",
          type: "line",
          data: [12.3, 13.0, 13.8, 14.4, 14.7, 14.9],
          color: "#f3c400"
        }
      ],
      min: 11,
      max: 16
    },
    f20: {
      title: "Grafico 18. Escenario de estres 2025-2050",
      subtitle: "Impacto de menor empleo y menor productividad (% PIB)",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "%",
      x: ["2025", "2030", "2035", "2040", "2045", "2050"],
      series: [
        {
          name: "Escenario estres",
          type: "line",
          data: [12.5, 13.6, 14.8, 15.7, 16.3, 16.9],
          color: "#2b2b2b"
        }
      ],
      min: 11,
      max: 18
    },
    f21: {
      title: "Tabla 3. Supuestos de simulacion",
      subtitle: "Hipotesis economicas y demograficas empleadas",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      renderAs: "table",
      tableColumns: ["Variable", "Escenario base", "Escenario estres"],
      tableRows: [
        ["Crecimiento PIB real", "1,6%", "1,0%"],
        ["Crecimiento salario real", "0,9%", "0,4%"],
        ["Tasa de empleo", "74%", "70%"],
        ["Fecundidad", "1,3", "1,2"]
      ]
    },
    f22: {
      title: "Grafico 19. Brecha de financiacion proyectada",
      subtitle: "Ingresos contributivos menos gasto contributivo (% PIB)",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "%",
      x: ["2025", "2030", "2035", "2040", "2045", "2050"],
      series: [
        {
          name: "Brecha escenario base",
          type: "line",
          data: [-3.1, -3.4, -3.9, -4.2, -4.4, -4.5],
          color: "#f3c400"
        },
        {
          name: "Brecha escenario estres",
          type: "line",
          data: [-3.3, -3.9, -4.6, -5.2, -5.8, -6.1],
          color: "#2b2b2b"
        }
      ],
      min: -7,
      max: -2
    },
    f23: {
      title: "Grafico 20. Ajuste anual requerido para equilibrio",
      subtitle: "Magnitud de correccion necesaria segun escenario (% PIB)",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      unit: "%",
      x: ["2025", "2030", "2035", "2040", "2045", "2050"],
      series: [
        {
          name: "Base",
          data: [0.6, 0.7, 0.8, 0.9, 1.0, 1.0],
          color: "#f3c400"
        },
        {
          name: "Estres",
          data: [0.7, 0.9, 1.1, 1.3, 1.4, 1.5],
          color: "#2b2b2b"
        }
      ],
      min: 0,
      max: 1.8
    }
  };

  window.REPORT_DATA = {
    meta: {
      title: "El dia D de las pensiones ha llegado",
      lead:
        "Version interactiva del informe con graficos y tablas reconstruidos visualmente para explorar la transicion demografica y su impacto fiscal.",
      reportUrl: "https://hesperides.edu.es/informes/informe_dia_d_pensiones",
      pdfUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      caveat:
        "Las series se estiman visualmente a partir de los graficos del informe original en esta version interactiva."
    },
    metrics: [
      { kpi: "20", label: "Graficos interactivos" },
      { kpi: "3", label: "Tablas interactivas" },
      { kpi: "38", label: "Paginas del informe" },
      { kpi: "2025-2050", label: "Horizonte principal de escenarios" }
    ],
    chapters: [
      { id: "introduccion", title: "Introducción", charts: [] },
      { id: "resumen-ejecutivo", title: "Resumen ejecutivo", charts: [] },
      {
        id: "sec-1",
        title: "1. Los problemas demográficos de España: un país sin jóvenes",
        charts: makeIds("f", 1, 8)
      },
      {
        id: "sec-2",
        title: "2. Economía, pensiones y demografía: España hace aguas",
        charts: makeIds("f", 9, 14)
      },
      {
        id: "sec-3",
        title: "3. El desajuste en el sistema de pensiones ocurre antes de tiempo",
        charts: makeIds("f", 15, 18)
      },
      { id: "sec-4", title: "4. La amarga guerra intergeneracional en España", charts: makeIds("f", 19, 23) },
      { id: "sec-5", title: "5 Conclusión", charts: [] },
      { id: "sec-6", title: "6 Agradecimiento", charts: [] }
    ],
    charts,
    text: {
      sourcePath: "extracted_text/informe_dia_d_pensiones.txt",
      ranges: [
        {
          chapterId: "introduccion",
          start: "Introducción",
          end: "Resumen ejecutivo"
        },
        {
          chapterId: "resumen-ejecutivo",
          start: "Resumen ejecutivo",
          end: "1. Los problemas demográficos de España: un país sin"
        },
        {
          chapterId: "sec-1",
          start: "1. Los problemas demográficos de España: un país sin",
          end: "2. Economía, pensiones y demografía: España hace aguas"
        },
        {
          chapterId: "sec-2",
          start: "2. Economía, pensiones y demografía: España hace aguas",
          end: "3. El desajuste en el sistema de pensiones ocurre antes de"
        },
        {
          chapterId: "sec-3",
          start: "3. El desajuste en el sistema de pensiones ocurre antes de",
          end: "4. La amarga guerra intergeneracional en España"
        },
        {
          chapterId: "sec-4",
          start: "4. La amarga guerra intergeneracional en España",
          end: "5 Conclusión"
        },
        {
          chapterId: "sec-5",
          start: "5 Conclusión",
          end: "6 Agradecimiento"
        },
        {
          chapterId: "sec-6",
          start: "6 Agradecimiento"
        }
      ]
    },
    playgroundIntro:
      "Simuladores para estresar supuestos demograficos y ensayar combinaciones de ajuste sobre la brecha de financiacion hasta 2050.",
    playgrounds: [
      {
        id: "presion-demografica",
        title: "Simulador de presion demografica 2025-2050",
        description:
          "Combina fecundidad, empleo, edad efectiva de retiro y productividad para estimar su impacto agregado sobre gasto y equilibrio del sistema.",
        methodology:
          "Base: Graficos 3, 7, 17, 18 y 19. Se calibra una funcion simplificada que desplaza el escenario base 2050 (14,9% PIB) en funcion de variaciones demograficas y laborales.",
        methodologyShort:
          "Desplazamiento del escenario base 2050 con elasticidades simplificadas para fecundidad, empleo, retiro y productividad.",
        controls: [
          {
            id: "fecundidad",
            label: "Fecundidad media",
            type: "range",
            min: 1,
            max: 1.8,
            step: 0.01,
            value: 1.3,
            display: (value, h) => `${h.formatNumber(value, 2)} hijos/mujer`
          },
          {
            id: "tasa_empleo",
            label: "Tasa de empleo agregada",
            type: "range",
            min: 68,
            max: 78,
            step: 0.1,
            value: 74,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "edad_efectiva",
            label: "Edad efectiva de retiro",
            type: "range",
            min: 63.5,
            max: 66.5,
            step: 0.1,
            value: 64.9,
            display: (value, h) => `${h.formatNumber(value)} anos`
          },
          {
            id: "productividad",
            label: "Crecimiento real de productividad",
            type: "range",
            min: 0.2,
            max: 1.8,
            step: 0.1,
            value: 0.9,
            display: (value, h) => `${h.formatNumber(value)}% anual`
          }
        ],
        compute: (state, h) => {
          const gasto2050 = h.clamp(
            14.9 +
              (1.3 - state.fecundidad) * 2.4 +
              (74 - state.tasa_empleo) * 0.12 +
              (64.9 - state.edad_efectiva) * 0.55 +
              (0.9 - state.productividad) * 0.9,
            12.5,
            18.5
          );

          const ratioCotizantes = h.clamp(
            2.1 - (gasto2050 - 12.2) * 0.09 + (state.tasa_empleo - 74) * 0.01 + (state.edad_efectiva - 64.9) * 0.04,
            1.3,
            2.4
          );

          const brecha2050 = h.clamp(-4.5 - (gasto2050 - 14.9) * 0.65, -7.2, -2.5);
          const presion = gasto2050 - 14.9;
          const senal = h.clamp(((ratioCotizantes - 1.3) / 1.1) * 100, 0, 100);
          const color = ratioCotizantes > 1.95 ? "var(--status-good)" : ratioCotizantes > 1.7 ? "var(--status-warn)" : "var(--status-bad)";

          const narrativa =
            ratioCotizantes > 1.95
              ? "El escenario conserva una relacion laboral relativamente robusta y contiene la desviacion del gasto."
              : ratioCotizantes > 1.7
                ? "Se modera la presion, pero la brecha de financiacion permanece estructural."
                : "La combinacion de supuestos amplifica la tension demografica y acelera el desequilibrio.";

          return {
            kpis: [
              { value: `${h.formatNumber(gasto2050, 2)}% PIB`, desc: "Gasto en pensiones estimado en 2050" },
              { value: `${h.formatNumber(ratioCotizantes, 2)}`, desc: "Cotizantes por pensionista (proxy)", color },
              { value: `${h.formatNumber(brecha2050, 2)}% PIB`, desc: "Brecha de financiacion estimada en 2050" },
              { value: `${h.formatNumber(presion, 2)} p.p.`, desc: "Desviacion frente al escenario base 2050" }
            ],
            thermometer: {
              value: senal,
              color,
              ariaLabel: "Robustez demografico-laboral del escenario"
            },
            narrative: narrativa,
            note:
              "La relacion cotizantes/pensionista se usa como aproximacion de equilibrio y no como proyeccion demografica completa."
          };
        }
      },
      {
        id: "mix-ajuste",
        title: "Simulador de mix de ajuste fiscal",
        description:
          "Permite repartir el esfuerzo entre ingresos, edad de retiro, revalorizacion real y mejora de empleo para medir la brecha residual.",
        methodology:
          "Base: Graficos 19 y 20. Se parte de una brecha estructural del 4,5% PIB en 2050 y se asignan impactos simplificados por palanca para estimar ajuste pendiente.",
        methodologyShort:
          "Descomposicion lineal de una brecha base del 4,5% PIB en funcion de cuatro palancas de politica.",
        controls: [
          {
            id: "ingresos_extra",
            label: "Ingresos adicionales estructurales",
            type: "range",
            min: 0,
            max: 3,
            step: 0.1,
            value: 1,
            display: (value, h) => `${h.formatNumber(value)}% PIB`
          },
          {
            id: "retraso_jubilacion",
            label: "Retraso adicional de edad efectiva",
            type: "range",
            min: 0,
            max: 3,
            step: 0.1,
            value: 1,
            display: (value, h) => `${h.formatNumber(value)} anos`
          },
          {
            id: "ajuste_revalorizacion",
            label: "Menor revalorizacion real anual",
            type: "range",
            min: 0,
            max: 1.5,
            step: 0.1,
            value: 0.4,
            display: (value, h) => `${h.formatNumber(value)} p.p.`
          },
          {
            id: "mejora_empleo",
            label: "Mejora de tasa de empleo",
            type: "range",
            min: 0,
            max: 4,
            step: 0.1,
            value: 1.2,
            display: (value, h) => `${h.formatNumber(value)} p.p.`
          }
        ],
        compute: (state, h) => {
          const brechaBase = 4.5;
          const impacto =
            state.ingresos_extra +
            state.retraso_jubilacion * 0.35 +
            state.ajuste_revalorizacion * 0.8 +
            state.mejora_empleo * 0.22;

          const brechaResidualMagnitud = brechaBase - impacto;
          const brechaResidual = h.clamp(-brechaResidualMagnitud, -6.5, 1.0);
          const ajustePendiente = Math.max(0, 1.0 - Math.min(1, impacto / brechaBase));
          const gastoAjustado = h.clamp(14.9 - state.retraso_jubilacion * 0.25 - state.ajuste_revalorizacion * 0.4, 12.5, 15.2);
          const transferenciasEquivalentes = Math.max(0, (-brechaResidual * 1742263) / 100);
          const senal = h.clamp((impacto / brechaBase) * 100, 0, 100);
          const color = brechaResidual >= -1.0 ? "var(--status-good)" : brechaResidual >= -2.5 ? "var(--status-warn)" : "var(--status-bad)";

          const narrativa =
            brechaResidual >= -1.0
              ? "El paquete de medidas casi cierra la brecha estructural del sistema."
              : brechaResidual >= -2.5
                ? "La correccion es apreciable, pero todavia queda una brecha relevante por cubrir."
                : "El mix actual reduce tension, aunque insuficiente para estabilizar la senda de largo plazo.";

          return {
            kpis: [
              { value: `${h.formatNumber(brechaResidual, 2)}% PIB`, desc: "Brecha residual estimada en 2050", color },
              { value: `${h.formatNumber(impacto, 2)} p.p.`, desc: "Impacto agregado de las palancas" },
              { value: `${h.formatNumber(gastoAjustado, 2)}% PIB`, desc: "Gasto 2050 tras ajustes de parametros" },
              {
                value: `${h.formatInt(Math.round(transferenciasEquivalentes))} M EUR`,
                desc: "Transferencia equivalente para cubrir brecha residual"
              }
            ],
            thermometer: {
              value: senal,
              color,
              ariaLabel: "Cobertura de la brecha estructural"
            },
            narrative: narrativa,
            note:
              "La conversion a millones usa PIB de referencia constante para facilitar comparabilidad entre escenarios."
          };
        }
      }
    ],
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf"
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/informe_dia_d_pensiones"
      },
      "Nota metodologica: reconstruccion visual de datos para habilitar interactividad grafico a grafico."
    ]
  };
})();
