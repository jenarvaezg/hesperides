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
          areaStyle: { color: "rgba(243, 196, 0, 0.18)" },
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
      xLabelInterval: (index) => index % 5 === 0 || index === 35,
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
      smallMultiplesColumns: 4,
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
      xLabelInterval: (index) => index % 2 === 0 || index === 21,
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
      title: "Grafico 5. La esperanza de vida a los 65 anos se dispara en Espana",
      subtitle: "Esperanza de vida adicional a los 65 anos (1975-2023)",
      source: "INE",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "anos",
      showLegend: false,
      xLabelInterval: (index) => index % 3 === 0 || index === 26,
      x: [
        "1975", "1977", "1979", "1981", "1983", "1985", "1987", "1989", "1991", "1993",
        "1995", "1997", "1999", "2001", "2003", "2005", "2007", "2009", "2011", "2013",
        "2015", "2017", "2019", "2020", "2021", "2022", "2023"
      ],
      series: [
        {
          name: "Esperanza de vida a los 65",
          type: "line",
          data: [15.2, 15.5, 15.9, 16.2, 16.7, 16.8, 17.2, 17.4, 17.5, 17.9, 18.1, 18.3, 18.4, 18.9, 19.1, 19.0, 19.7, 20.0, 20.3, 20.7, 20.9, 21.2, 21.0, 20.4, 21.1, 21.1, 21.7],
          color: "#f3c400",
          smooth: false,
          symbolSize: 5
        }
      ],
      min: 15,
      max: 22.4
    },
    f08: {
      title: "Grafico 6. El bono demografico en Espana tuvo lugar entre los anos 1985 y 2015",
      subtitle: "Tasa de dependencia en Espana (1960-2024)",
      source: "Eurostat",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "%",
      showLegend: false,
      xLabelInterval: (index) => index % 2 === 0 || index === 32,
      x: [
        "1960", "1962", "1964", "1966", "1968", "1970", "1972", "1974", "1976", "1978",
        "1980", "1982", "1984", "1986", "1988", "1990", "1992", "1994", "1996", "1998",
        "2000", "2002", "2004", "2006", "2008", "2010", "2012", "2014", "2016", "2018",
        "2020", "2022", "2024"
      ],
      series: [
        {
          name: "Tasa de dependencia",
          type: "line",
          data: [55.5, 55.8, 56.2, 56.8, 57.5, 58.5, 59.4, 60.0, 60.2, 60.3, 59.6, 58.0, 56.5, 54.8, 53.2, 51.6, 50.3, 49.0, 47.8, 46.8, 46.1, 45.8, 45.6, 45.8, 46.0, 45.7, 45.2, 45.4, 46.8, 49.0, 50.4, 51.3, 51.1],
          color: "#f3c400",
          smooth: false,
          symbolSize: 5
        }
      ],
      markAreas: [{ from: "1984", to: "2014" }],
      eventLines: [
        { x: "1984", label: "Inicio bono demografico" },
        { x: "2014", label: "Fin bono demografico" }
      ],
      min: 44,
      max: 61
    },
    f09: {
      title: "Grafico 7. El crecimiento economico fue alto en Espana en el periodo del bono demografico",
      subtitle: "PIB per capita en Espana (1960-2023)",
      source: "Banco Mundial",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "euros",
      showLegend: false,
      xLabelInterval: 1,
      x: [
        "1960", "1963", "1966", "1969", "1972", "1975", "1978", "1981", "1984", "1987",
        "1990", "1993", "1996", "1999", "2002", "2005", "2008", "2011", "2014", "2017",
        "2020", "2023"
      ],
      series: [
        {
          name: "PIB per capita",
          type: "line",
          data: [6000, 8200, 10000, 12000, 14500, 15000, 14800, 15100, 16000, 19000, 20500, 22000, 24000, 25500, 26500, 27000, 26000, 25000, 26500, 27500, 24500, 28000],
          color: "#7f5b00",
          smooth: true,
          symbolSize: 4
        }
      ],
      markAreas: [{ from: "1984", to: "2014" }],
      eventLines: [
        { x: "1984", label: "Inicio bono demografico" },
        { x: "2014", label: "Fin bono demografico" }
      ],
      min: 5000,
      max: 30000
    },
    f10: {
      title: "Grafico 8. La productividad laboral se estanco en Espana en el periodo del bono demografico",
      subtitle: "PIB por hora trabajada en Espana (1950-2019)",
      source: "El dia D de las pensiones ha llegado (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "indice",
      showLegend: false,
      xLabelInterval: 1,
      x: [
        "1950", "1953", "1956", "1959", "1962", "1965", "1968", "1971", "1974", "1977",
        "1980", "1983", "1986", "1989", "1992", "1995", "1998", "2001", "2004", "2007",
        "2010", "2013", "2016", "2019"
      ],
      series: [
        {
          name: "PIB por hora trabajada",
          type: "line",
          data: [5.2, 6.3, 7.0, 8.9, 13.0, 17.0, 21.0, 25.0, 29.0, 33.0, 37.0, 40.0, 41.0, 42.0, 43.8, 44.1, 44.0, 44.1, 44.3, 44.6, 45.3, 46.5, 47.2, 47.8],
          color: "#7f5b00",
          smooth: true,
          symbolSize: 4
        }
      ],
      markAreas: [{ from: "1983", to: "2013" }],
      eventLines: [
        { x: "1983", label: "Inicio bono demografico" },
        { x: "2013", label: "Fin bono demografico" }
      ],
      min: 4,
      max: 52
    },
    f11: {
      title: "Grafico 9. Espana tiene comparativamente pocos pensionistas",
      subtitle: "Porcentaje de la poblacion con una pension de vejez/supervivencia y de incapacidad en Europa",
      source: "Eurostat",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      coordinate: "xy",
      xLabel: "Incapacidad",
      yLabel: "Vejez y supervivencia",
      xAxisName: "Incapacidad",
      yAxisName: "Vejez y supervivencia",
      xAxisNameGap: 34,
      yAxisNameGap: 58,
      xUnit: "%",
      yUnit: "%",
      xMin: 0.5,
      xMax: 8.2,
      min: 15,
      max: 40,
      showLegend: false,
      height: 560,
      series: [
        {
          name: "Paises europeos",
          type: "scatter",
          color: "#f3c400",
          symbolSize: (value) => Math.max(6, Math.sqrt(value[2] || 8) * 1.8),
          data: [
            { name: "Turquia", value: [1.0, 17.0, 84] },
            { name: "Rumania", value: [1.1, 24.5, 19] },
            { name: "Austria", value: [2.0, 30.5, 9] },
            { name: "Alemania", value: [2.7, 31.5, 83] },
            { name: "Italia", value: [2.9, 29.5, 59] },
            { name: "Francia", value: [4.0, 29.5, 65] },
            { name: "Eslovaquia", value: [5.0, 31.5, 5] },
            { name: "Dinamarca", value: [4.5, 24.0, 6] },
            { name: "Noruega", value: [7.2, 21.0, 5] },
            { name: "Estonia", value: [7.8, 24.0, 1] },
            { name: "Belgica", value: [7.5, 22.5, 11] },
            { name: "Suiza", value: [3.0, 38.5, 8] },
            { name: "Paises Bajos", value: [2.8, 28.0, 17] },
            { name: "Lituania", value: [5.4, 25.0, 3] },
            { name: "Letonia", value: [5.6, 25.0, 2] },
            { name: "Portugal", value: [3.7, 27.5, 10] },
            { name: "Grecia", value: [2.5, 27.0, 10] },
            { name: "Finlandia", value: [3.5, 30.0, 5] },
            { name: "Polonia", value: [3.9, 30.0, 37] },
            { name: "Eslovenia", value: [0.9, 34.5, 2] }
          ]
        },
        {
          name: "Espana",
          type: "scatter",
          color: "#6b4a00",
          symbolSize: 18,
          label: {
            show: true,
            formatter: "{b}",
            position: "right",
            color: "#2b2b2b",
            fontSize: 11,
            fontWeight: 700
          },
          data: [{ name: "Espana", value: [2.3, 21.5, 48] }]
        }
      ]
    },
    f12: {
      title: "Grafico 10. El saldo contributivo presenta un deficit creciente",
      subtitle: "Evolucion de los gastos e ingresos contributivos, en miles de millones de euros de 2021",
      source: "de la Fuente (2025)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "miles de millones",
      showLegend: false,
      xLabelInterval: (index) => index % 2 === 0 || index === 19,
      x: [
        "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014",
        "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
      ],
      series: [
        {
          name: "base-diferencia",
          type: "line",
          stack: "brecha-contributiva",
          data: [106.0, 109.0, 113.0, 118.0, 123.0, 127.0, 129.0, 127.0, 124.0, 119.0, 119.0, 119.0, 120.0, 122.0, 126.0, 133.0, 127.0, 136.0, 138.0, 146.4],
          color: "rgba(0,0,0,0)",
          symbol: "none",
          lineStyle: { opacity: 0 },
          areaStyle: { opacity: 0 },
          tooltip: { show: false }
        },
        {
          name: "Diferencia gastos-ingresos",
          type: "line",
          stack: "brecha-contributiva",
          data: [7.8, 5.0, 3.0, 3.0, 4.0, 2.0, 4.0, 10.0, 19.0, 30.0, 34.0, 39.0, 42.0, 45.0, 50.0, 52.0, 61.0, 48.0, 53.0, 52.9],
          color: "rgba(0,0,0,0)",
          symbol: "none",
          lineStyle: { opacity: 0 },
          areaStyle: { color: "rgba(243, 196, 0, 0.18)" },
          tooltip: { show: false }
        },
        {
          name: "Gastos",
          type: "line",
          data: [106.0, 109.0, 113.0, 118.0, 123.0, 129.0, 133.0, 137.0, 143.0, 149.0, 153.0, 158.0, 162.0, 167.0, 176.0, 185.0, 188.0, 184.0, 191.0, 199.3],
          color: "#6b4a00",
          symbolSize: 4
        },
        {
          name: "Ingresos",
          type: "line",
          data: [113.8, 114.0, 116.0, 121.0, 127.0, 127.0, 129.0, 127.0, 124.0, 119.0, 119.0, 119.0, 120.0, 122.0, 126.0, 133.0, 127.0, 136.0, 138.0, 146.4],
          color: "#f3c400",
          symbolSize: 4
        }
      ],
      min: 100,
      max: 205
    },
    f13: {
      title: "Grafico 11. Espana gasta mas que Europa en pensiones",
      subtitle: "Gasto sobre PIB en pensiones (ano 2022)",
      source: "Eurostat",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      orientation: "horizontal",
      unit: "%",
      noWrapLabels: true,
      yAxisInverse: true,
      showLegend: false,
      height: 980,
      gridLeft: 165,
      yLabelFontSize: 11,
      x: [
        "Italia", "Francia", "Grecia", "Austria", "Portugal", "Finlandia", "Espana", "Belgica", "Alemania", "Holanda",
        "Suiza", "Dinamarca", "Suecia", "Islandia", "Polonia", "Eslovenia", "Luxemburgo", "Croacia", "Republica Checa", "Bulgaria",
        "Rumania", "Letonia", "Noruega", "Eslovaquia", "Chipre", "Estonia", "Lituania", "Hungria", "Malta", "Irlanda"
      ],
      series: [
        {
          name: "Gasto sobre PIB",
          data: [
            { value: 15.5, itemStyle: { color: "#f3c400" } },
            { value: 14.7, itemStyle: { color: "#f3c400" } },
            { value: 14.3, itemStyle: { color: "#f3c400" } },
            { value: 14.2, itemStyle: { color: "#f3c400" } },
            { value: 13.4, itemStyle: { color: "#f3c400" } },
            { value: 13.0, itemStyle: { color: "#f3c400" } },
            { value: 13.0, itemStyle: { color: "#d62020" } },
            { value: 12.6, itemStyle: { color: "#f3c400" } },
            { value: 11.6, itemStyle: { color: "#f3c400" } },
            { value: 11.1, itemStyle: { color: "#f3c400" } },
            { value: 11.0, itemStyle: { color: "#f3c400" } },
            { value: 10.9, itemStyle: { color: "#f3c400" } },
            { value: 10.7, itemStyle: { color: "#f3c400" } },
            { value: 10.3, itemStyle: { color: "#f3c400" } },
            { value: 10.1, itemStyle: { color: "#f3c400" } },
            { value: 10.0, itemStyle: { color: "#f3c400" } },
            { value: 9.7, itemStyle: { color: "#f3c400" } },
            { value: 8.9, itemStyle: { color: "#f3c400" } },
            { value: 8.6, itemStyle: { color: "#f3c400" } },
            { value: 8.4, itemStyle: { color: "#f3c400" } },
            { value: 8.4, itemStyle: { color: "#f3c400" } },
            { value: 8.2, itemStyle: { color: "#f3c400" } },
            { value: 8.0, itemStyle: { color: "#f3c400" } },
            { value: 8.0, itemStyle: { color: "#f3c400" } },
            { value: 7.9, itemStyle: { color: "#f3c400" } },
            { value: 7.3, itemStyle: { color: "#f3c400" } },
            { value: 6.8, itemStyle: { color: "#f3c400" } },
            { value: 6.7, itemStyle: { color: "#f3c400" } },
            { value: 5.6, itemStyle: { color: "#f3c400" } },
            { value: 3.8, itemStyle: { color: "#f3c400" } }
          ],
          barMaxWidth: 18
        }
      ],
      eventLines: [{ x: 12.3, label: "UE (27)" }],
      min: 0,
      max: 16
    },
    f14: {
      title: "Grafico 12. El sistema de pensiones de Espana es de los mas generosos de Europa",
      subtitle: "Tasa de reemplazo en Espana (ano 2024)",
      source: "Eurostat",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      orientation: "horizontal",
      unit: "%",
      noWrapLabels: true,
      yAxisInverse: true,
      showLegend: false,
      height: 930,
      gridLeft: 165,
      yLabelFontSize: 11,
      x: [
        "Grecia", "Espana", "Italia", "Luxemburgo", "Hungria", "Eslovaquia", "Francia", "Portugal", "Polonia", "Suecia",
        "Holanda", "Republica Checa", "Austria", "Noruega", "Finlandia", "Estonia", "Alemania", "Belgica", "Dinamarca", "Rumania",
        "Malta", "Bulgaria", "Letonia", "Eslovenia", "Chipre", "Irlanda", "Lituania", "Croacia"
      ],
      series: [
        {
          name: "Tasa de reemplazo",
          data: [
            { value: 84, itemStyle: { color: "#f3c400" } },
            { value: 81, itemStyle: { color: "#d62020" } },
            { value: 79, itemStyle: { color: "#f3c400" } },
            { value: 78, itemStyle: { color: "#f3c400" } },
            { value: 77, itemStyle: { color: "#f3c400" } },
            { value: 77, itemStyle: { color: "#f3c400" } },
            { value: 61, itemStyle: { color: "#f3c400" } },
            { value: 61, itemStyle: { color: "#f3c400" } },
            { value: 60, itemStyle: { color: "#f3c400" } },
            { value: 59, itemStyle: { color: "#f3c400" } },
            { value: 57, itemStyle: { color: "#f3c400" } },
            { value: 56, itemStyle: { color: "#f3c400" } },
            { value: 55, itemStyle: { color: "#f3c400" } },
            { value: 55, itemStyle: { color: "#f3c400" } },
            { value: 53, itemStyle: { color: "#f3c400" } },
            { value: 50, itemStyle: { color: "#f3c400" } },
            { value: 49, itemStyle: { color: "#f3c400" } },
            { value: 48, itemStyle: { color: "#f3c400" } },
            { value: 47, itemStyle: { color: "#f3c400" } },
            { value: 46, itemStyle: { color: "#f3c400" } },
            { value: 45, itemStyle: { color: "#f3c400" } },
            { value: 44, itemStyle: { color: "#f3c400" } },
            { value: 44, itemStyle: { color: "#f3c400" } },
            { value: 43, itemStyle: { color: "#f3c400" } },
            { value: 41, itemStyle: { color: "#f3c400" } },
            { value: 40, itemStyle: { color: "#f3c400" } },
            { value: 38, itemStyle: { color: "#f3c400" } },
            { value: 35, itemStyle: { color: "#f3c400" } }
          ],
          barMaxWidth: 18
        }
      ],
      eventLines: [{ x: 60, label: "UE (27)" }],
      min: 0,
      max: 85
    },
    f15: {
      title: "Grafico 13. Espana soporta mayores impuestos al trabajo que Europa y la OCDE",
      subtitle: "Cuña fiscal al trabajo en Espana, Union Europea y OCDE (2000-2024)",
      source: "INE y Seguridad Social",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "%",
      showLegend: true,
      xLabelInterval: (index) => index % 2 === 0 || index === 24,
      x: [
        "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
        "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",
        "2020", "2021", "2022", "2023", "2024"
      ],
      series: [
        {
          name: "Espana",
          type: "line",
          data: [
            37.2, 37.5, 37.9, 37.1, 37.4, 37.6, 37.8, 37.0, 36.2, 36.6,
            38.5, 39.2, 39.3, 39.4, 38.0, 37.8, 37.7, 37.8, 37.9, 37.2,
            36.9, 37.8, 38.2, 39.0, 39.5
          ],
          color: "#f3c400",
          smooth: true,
          symbolSize: 5
        },
        {
          name: "Union Europea",
          type: "line",
          data: [
            41.2, 40.6, 40.1, 39.7, 39.2, 39.1, 38.8, 38.2, 37.8, 37.2,
            38.1, 38.8, 39.2, 39.1, 38.9, 38.4, 38.0, 37.8, 37.7, 37.6,
            37.4, 37.2, 37.3, 37.5, 37.6
          ],
          color: "#9b7700",
          lineStyle: { type: "dashed", width: 2 },
          symbol: "none",
          smooth: true
        },
        {
          name: "OCDE",
          type: "line",
          data: [
            33.8, 33.5, 33.3, 33.1, 32.9, 32.8, 32.6, 32.4, 32.0, 31.7,
            31.9, 32.1, 32.2, 32.0, 31.8, 31.7, 31.6, 31.5, 31.3, 31.2,
            30.9, 31.1, 31.2, 31.3, 31.3
          ],
          color: "#6b4a00",
          lineStyle: { type: "dashed", width: 2 },
          symbol: "none",
          smooth: true
        }
      ],
      min: 30,
      max: 42
    },
    f16: {
      title: "Grafico 14. Espana cuenta con 2,3 trabajadores por cada pensionista",
      subtitle: "Ratio trabajadores/pensionistas en Espana (1976-2025)",
      source: "Estadisticas historicas de Espana (BBVA) e INE",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      unit: "ratio",
      xLabelInterval: (index) => index % 5 === 0 || index === 49,
      x: [
        "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985",
        "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995",
        "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005",
        "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015",
        "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"
      ],
      series: [
        {
          name: "Ratio",
          data: [
            { value: 3.52, itemStyle: { color: "#e0b100" } },
            3.3, 3.1, 2.95,
            { value: 2.8, itemStyle: { color: "#e0b100" } },
            2.65, 2.5, 2.35, 2.25, 2.18,
            2.12, 2.08, 2.06, 2.08,
            2.1, 2.11, 2.12, 2.08,
            { value: 1.82, itemStyle: { color: "#e0b100" } },
            1.83, 1.84, 1.86, 1.9, 1.95,
            { value: 2.05, itemStyle: { color: "#e0b100" } },
            2.12, 2.2, 2.28, 2.38, 2.46,
            { value: 2.53, itemStyle: { color: "#e0b100" } },
            2.47, 2.35, 2.24, 2.14, 2.06, 2.0,
            { value: 1.96, itemStyle: { color: "#e0b100" } },
            2.02, 2.08, 2.12, 2.15, 2.16, 2.18, 2.21, 2.24, 2.27, 2.29, 2.3,
            { value: 2.31, itemStyle: { color: "#e0b100" } }
          ],
          color: "#f3c400",
          barMaxWidth: 10
        }
      ],
      min: 0,
      max: 3.7
    },
    f17: {
      title: "Grafico 15. La sostenibilidad del sistema de pensiones se ve perjudicada por un mercado de trabajo disfuncional",
      subtitle: "Tasa de desempleo en Espana (1964-2025)",
      source: "Estadisticas historicas de Espana (BBVA) e INE",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "%",
      showLegend: false,
      xLabelInterval: (index) => index % 3 === 0 || index === 31,
      x: [
        "1964", "1966", "1968", "1970", "1972", "1974", "1976", "1978", "1980", "1982",
        "1984", "1986", "1988", "1990", "1992", "1994", "1996", "1998", "2000", "2002",
        "2004", "2006", "2008", "2010", "2012", "2014", "2016", "2018", "2020", "2022",
        "2024", "2025"
      ],
      series: [
        {
          name: "Tasa de desempleo",
          type: "line",
          data: [1.3, 1.0, 0.8, 0.7, 1.0, 2.0, 3.0, 5.0, 8.0, 12.0, 16.0, 21.1, 19.0, 16.1, 20.0, 23.8, 22.0, 19.0, 15.0, 12.5, 11.0, 10.0, 8.3, 8.7, 18.0, 22.0, 25.8, 21.0, 16.0, 13.0, 14.5, 11.4],
          color: "#f3c400",
          areaStyle: 0.16,
          smooth: true,
          symbolSize: 4
        }
      ],
      min: 0,
      max: 26
    },
    f18: {
      title: "Grafico 16. La proporcion de personas trabajando en Espana es de las mas bajas de Europa",
      subtitle: "Porcentaje de poblacion empleada sobre la poblacion de 20 a 64 anos (ano 2024)",
      source: "Eurostat",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "bar",
      unit: "%",
      noWrapLabels: true,
      xLabelRotate: 90,
      xLabelFontSize: 8,
      gridBottom: 190,
      height: 620,
      showLegend: true,
      x: [
        "Islandia", "Paises Bajos", "Suecia", "Chequia", "Estonia", "Suiza", "Dinamarca", "Hungria", "Alemania", "Irlanda",
        "Portugal", "Polonia", "Eslovenia", "Eslovaquia", "Austria", "Lituania", "Finlandia", "Francia", "Belgica", "Croacia",
        "Grecia", "Espana", "Rumania", "Italia"
      ],
      series: [
        {
          name: "Paises europeos",
          data: [
            { value: 85.5, itemStyle: { color: "#f3c400" } },
            { value: 82.3, itemStyle: { color: "#f3c400" } },
            { value: 82.1, itemStyle: { color: "#f3c400" } },
            { value: 81.7, itemStyle: { color: "#f3c400" } },
            { value: 81.5, itemStyle: { color: "#f3c400" } },
            { value: 81.3, itemStyle: { color: "#f3c400" } },
            { value: 81.1, itemStyle: { color: "#f3c400" } },
            { value: 80.8, itemStyle: { color: "#f3c400" } },
            { value: 80.2, itemStyle: { color: "#f3c400" } },
            { value: 79.7, itemStyle: { color: "#f3c400" } },
            { value: 79.1, itemStyle: { color: "#f3c400" } },
            { value: 78.7, itemStyle: { color: "#f3c400" } },
            { value: 78.4, itemStyle: { color: "#f3c400" } },
            { value: 78.2, itemStyle: { color: "#f3c400" } },
            { value: 78.0, itemStyle: { color: "#f3c400" } },
            { value: 77.6, itemStyle: { color: "#f3c400" } },
            { value: 76.9, itemStyle: { color: "#f3c400" } },
            { value: 76.2, itemStyle: { color: "#f3c400" } },
            { value: 75.5, itemStyle: { color: "#f3c400" } },
            { value: 74.9, itemStyle: { color: "#f3c400" } },
            { value: 73.0, itemStyle: { color: "#f3c400" } },
            null,
            { value: 70.5, itemStyle: { color: "#f3c400" } },
            { value: 67.6, itemStyle: { color: "#f3c400" } }
          ],
          barMaxWidth: 18
        },
        {
          name: "Espana",
          data: [
            null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null,
            null, { value: 72.0, itemStyle: { color: "#2b2b2b" } }, null, null
          ],
          barMaxWidth: 18
        },
        {
          name: "Promedio Union Europea",
          type: "line",
          data: new Array(24).fill(72),
          color: "#8c8c8c",
          lineStyle: { type: "dashed", width: 1.8 },
          symbol: "none",
          tooltip: { show: false }
        }
      ],
      min: 0,
      max: 90
    },
    f19: {
      title: "Grafico 17. Las pensiones se disparan en Espana mientras los salarios se estancan",
      subtitle: "Crecimiento acumulado de salarios y pensiones (2008-2023)",
      source: "INE y Seguridad Social",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      type: "line",
      unit: "%",
      showLegend: false,
      xLabelInterval: (index) => index % 2 === 0 || index === 15,
      x: [
        "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015",
        "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"
      ],
      series: [
        {
          name: "base-diferencia",
          type: "line",
          excludeFromLegend: true,
          stack: "brecha-salarial",
          data: [0.0, 0.5, -1.2, -2.5, -5.4, -5.0, -4.2, -4.0, -5.0, -4.1, -3.8, -3.5, -1.9, 1.8, -3.2, -2.3],
          color: "rgba(0,0,0,0)",
          symbol: "none",
          lineStyle: { opacity: 0 },
          areaStyle: { opacity: 0 },
          tooltip: { show: false }
        },
        {
          name: "diferencia-pension-salario",
          type: "line",
          excludeFromLegend: true,
          stack: "brecha-salarial",
          data: [0.0, 1.6, 5.7, 7.5, 11.7, 13.7, 16.4, 18.8, 20.6, 20.8, 21.3, 22.3, 24.5, 24.4, 24.2, 30.9],
          color: "rgba(0,0,0,0)",
          symbol: "none",
          lineStyle: { opacity: 0 },
          areaStyle: { color: "rgba(243, 196, 0, 0.20)" },
          tooltip: { show: false }
        },
        {
          name: "Pension media",
          type: "line",
          data: [0.0, 2.1, 4.5, 5.0, 6.3, 8.7, 12.2, 14.8, 15.6, 16.7, 17.5, 18.8, 22.6, 26.2, 21.0, 28.6],
          color: "#f3c400",
          smooth: true,
          symbolSize: 5
        },
        {
          name: "Salario medio",
          type: "line",
          data: [0.0, 0.5, -1.2, -2.5, -5.4, -5.0, -4.2, -4.0, -5.0, -4.1, -3.8, -3.5, -1.9, 1.8, -3.2, -2.3],
          color: "#6b4a00",
          smooth: true,
          symbolSize: 5
        }
      ],
      zeroLine: true,
      min: -8,
      max: 32
    },
    f20: {
      title: "Grafico 18. Redistribucion hacia el grupo de jubilados",
      subtitle: "Ingreso antes y despues de la redistribucion del Estado (ano 2022)",
      source: "Observatorio impuestos y transferencias (Jon Gonzalez)",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      renderAs: "small-multiples",
      smallMultiplesType: "bar",
      smallMultiplesColumns: 2,
      unit: "euros",
      x: ["17-30", "30-40", "40-50", "50-65", "65-85", ">85"],
      smallMultiplesAxis: {
        yMin: 0,
        yMax: 34000,
        yInterval: 5000,
        xTickIndices: [0, 1, 2, 3, 4, 5]
      },
      series: [
        {
          name: "Ingreso antes redistribucion",
          color: "#f3c400",
          data: [25298, 30750, 30971, 32685, 12462, 5973]
        },
        {
          name: "Ingreso despues redistribucion",
          color: "#6b4a00",
          data: [20405, 23327, 24781, 27018, 28569, 22025]
        }
      ]
    },
    f21: {
      title: "Tabla 3. Espana: porcentaje de personas por grupo etario que no pueden permitirse...",
      subtitle: "Privacion material por grupo de edad",
      source: "INE",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "exacta del informe",
      renderAs: "table",
      tableHighlightFirstRow: false,
      tableColumns: ["", "> 65 anos", "18 a 64 anos", "< 18 anos"],
      tableRows: [
        ["Comer carne, pollo o pescado cada dos dias", "4,5%", "6,3%", "6,9%"],
        ["Mantener vivienda a temperatura adecuada", "14,2%", "18,5%", "17,9%"],
        ["Cambiar muebles estropeados", "20,7%", "28,7%", "32,2%"],
        ["Afrontar gastos imprevistos", "27,4%", "36,9%", "41,9%"],
        ["Ir de vacaciones una vez al ano", "31,0%", "33,5%", "35,6%"]
      ],
      tableCellClasses: {
        "2:2": "cell-soft-highlight",
        "2:3": "cell-soft-highlight",
        "3:2": "cell-strong-highlight",
        "3:3": "cell-strong-highlight"
      }
    },
    f22: {
      title: "Grafico 19. Sistema de pensiones en Espana: 40 anos de recortes",
      subtitle: "Tasa de reemplazo (1985 vs 2025) segun anos cotizados y revalorizacion anual",
      source: "Elaboracion propia",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      renderAs: "small-multiples",
      smallMultiplesType: "bar",
      smallMultiplesColumns: 1,
      unit: "%",
      x: ["1%", "2%", "3%", "1%", "2%", "3%"],
      smallMultiplesAxis: {
        yMin: 45,
        yMax: 100,
        yInterval: 10,
        xTickIndices: [0, 1, 2, 3, 4, 5],
        xLabelMap: {
          "1%": "Reval. 1%",
          "2%": "Reval. 2%",
          "3%": "Reval. 3%"
        }
      },
      series: [
        {
          name: "35 anos (1985) vs 37 anos (2025)",
          data: [
            { value: 97.5, itemStyle: { color: "#f3c400" } },
            { value: 95.2, itemStyle: { color: "#f3c400" } },
            { value: 69.6, itemStyle: { color: "#f3c400" } },
            { value: 89.0, itemStyle: { color: "#6b4a00" } },
            { value: 79.7, itemStyle: { color: "#6b4a00" } },
            { value: 60.7, itemStyle: { color: "#6b4a00" } }
          ],
          color: "#f3c400"
        },
        {
          name: "30 anos cotizados (1985 vs 2025)",
          data: [
            { value: 89.6, itemStyle: { color: "#f3c400" } },
            { value: 89.1, itemStyle: { color: "#f3c400" } },
            { value: 85.6, itemStyle: { color: "#f3c400" } },
            { value: 74.9, itemStyle: { color: "#6b4a00" } },
            { value: 67.1, itemStyle: { color: "#6b4a00" } },
            { value: 60.4, itemStyle: { color: "#6b4a00" } }
          ],
          color: "#f3c400"
        },
        {
          name: "25 anos cotizados (1985 vs 2025)",
          data: [
            { value: 79.6, itemStyle: { color: "#f3c400" } },
            { value: 79.2, itemStyle: { color: "#f3c400" } },
            { value: 78.8, itemStyle: { color: "#f3c400" } },
            { value: 64.8, itemStyle: { color: "#6b4a00" } },
            { value: 58.0, itemStyle: { color: "#6b4a00" } },
            { value: 52.2, itemStyle: { color: "#6b4a00" } }
          ],
          color: "#f3c400"
        }
      ]
    },
    f23: {
      title: "Grafico 20. La rentabilidad de la inversion en la Seguridad Social se desploma",
      subtitle: "Rentabilidad (TIR) de la inversion en el sistema de pensiones en Espana (1985 vs 2025)",
      source: "Elaboracion propia",
      sourceUrl: "https://hesperides.edu.es/documentos_pdf/Informe_dia_D_pensiones.pdf",
      exactness: "reconstruida visualmente",
      renderAs: "small-multiples",
      smallMultiplesType: "bar",
      smallMultiplesColumns: 1,
      unit: "%",
      x: ["1%", "2%", "3%", "1%", "2%", "3%"],
      smallMultiplesAxis: {
        yMin: 1.5,
        yMax: 5.5,
        yInterval: 0.5,
        xTickIndices: [0, 1, 2, 3, 4, 5],
        xLabelMap: {
          "1%": "Reval. 1%",
          "2%": "Reval. 2%",
          "3%": "Reval. 3%"
        }
      },
      series: [
        {
          name: "35 anos (1985) vs 37 anos (2025)",
          data: [
            { value: 2.9, itemStyle: { color: "#f3c400" } },
            { value: 3.2, itemStyle: { color: "#f3c400" } },
            { value: 2.5, itemStyle: { color: "#f3c400" } },
            { value: 2.1, itemStyle: { color: "#6b4a00" } },
            { value: 2.3, itemStyle: { color: "#6b4a00" } },
            { value: 2.0, itemStyle: { color: "#6b4a00" } }
          ],
          color: "#f3c400"
        },
        {
          name: "30 anos cotizados (1985 vs 2025)",
          data: [
            { value: 3.3, itemStyle: { color: "#f3c400" } },
            { value: 4.0, itemStyle: { color: "#f3c400" } },
            { value: 3.8, itemStyle: { color: "#f3c400" } },
            { value: 2.4, itemStyle: { color: "#6b4a00" } },
            { value: 2.6, itemStyle: { color: "#6b4a00" } },
            { value: 2.7, itemStyle: { color: "#6b4a00" } }
          ],
          color: "#f3c400"
        },
        {
          name: "25 anos cotizados (1985 vs 2025)",
          data: [
            { value: 3.9, itemStyle: { color: "#f3c400" } },
            { value: 4.5, itemStyle: { color: "#f3c400" } },
            { value: 5.1, itemStyle: { color: "#f3c400" } },
            { value: 2.7, itemStyle: { color: "#6b4a00" } },
            { value: 2.8, itemStyle: { color: "#6b4a00" } },
            { value: 2.9, itemStyle: { color: "#6b4a00" } }
          ],
          color: "#f3c400"
        }
      ]
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
        charts: makeIds("f", 9, 10)
      },
      {
        id: "sec-3",
        title: "3. El desajuste en el sistema de pensiones ocurre antes de tiempo",
        charts: makeIds("f", 11, 18)
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
