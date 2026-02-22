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
      { id: "resumen-ejecutivo", title: "Resumen ejecutivo", charts: [] },
      {
        id: "sec-1",
        title: "1. Introducción: las cuentas públicas no cuadran en España",
        charts: ["i01", "i02", "i03"]
      },
      {
        id: "sec-2",
        title: "2. Introducción: las cuentas públicas no cuadran en España",
        charts: ["i04", "i05"]
      },
      {
        id: "sec-3",
        title: "3. La situación financiera de la Seguridad Social",
        charts: ["i06", "i07", "i08", "i09", "i10"]
      },
      {
        id: "sec-4",
        title: "4. La (inexistente) “hucha” de las pensiones y la complicada situación patrimonial de la Seguridad Social",
        charts: ["i11", "i12", "i13", "i14"]
      },
      {
        id: "sec-5",
        title: "5. La Seguridad Social es el elefante en la habitación de las cuentas públicas españolas",
        charts: ["i15", "i16"]
      },
      {
        id: "conclusion",
        title: "Conclusión: España necesita una reforma urgente en su sistema de pensiones",
        charts: []
      },
      { id: "sec-6", title: "6. Agradecimiento", charts: [] },
      { id: "referencias", title: "Referencias", charts: [] }
    ],
    charts: {
      i01: {
        title: "Grafico 1. Las cuentas publicas en Espana no cuadran",
        subtitle: "Empleos, recursos y saldo de las AAPP, 2024",
        source: "IGAE",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "exacta del grafico",
        renderAs: "table",
        tableHighlightFirstRow: false,
        tableColumns: ["", "Millones de euros", "Porcentaje PIB"],
        tableRows: [
          ["Ingresos", "672 659", "42,3%"],
          ["Gastos", "722 846", "45,4%"],
          ["Capacidad/necesidad financiacion", "-50 187", "-3,2%"]
        ],
        tableCellClasses: {
          "0:1": "cell-strong-highlight",
          "1:1": "cell-strong-highlight"
        }
      },
      i02: {
        title: "Grafico 2. La irresponsabilidad fiscal espanola inicia en el ano 2008 y sigue viva en 2025",
        subtitle: "Gasto e ingreso de las Administraciones Publicas espanolas (1995-2024)",
        source: "IGAE",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "% del PIB",
        showLegend: false,
        xLabelInterval: (index) => index % 5 === 0 || index === 29,
        x: [
          "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004",
          "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014",
          "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
        ],
        series: [
          {
            name: "base-entre-lineas",
            type: "line",
            data: [
              36.8, 36.5, 37.1, 37.9, 38.2, 37.5, 37.5, 38.0, 37.5, 38.2,
              38.0, 37.9, 38.8, 36.3, 34.5, 35.8, 35.7, 37.2, 38.2, 38.5,
              37.9, 37.4, 37.5, 38.5, 38.5, 41.0, 42.3, 41.3, 41.4, 42.0
            ],
            stack: "brecha-fiscal",
            color: "rgba(0,0,0,0)",
            symbol: "none",
            lineStyle: { opacity: 0 },
            areaStyle: { opacity: 0 },
            tooltip: { show: false }
          },
          {
            name: "brecha-fiscal",
            type: "line",
            data: [
              6.8, 5.9, 3.9, 2.6, 1.2, 1.1, 0.5, 0.2, 0.4, 0.0,
              0.0, 0.0, 0.0, 4.5, 11.1, 9.6, 9.8, 11.6, 7.5, 6.1,
              5.3, 4.2, 3.0, 2.5, 3.0, 9.9, 6.8, 4.6, 3.6, 3.1
            ],
            stack: "brecha-fiscal",
            color: "rgba(0,0,0,0)",
            symbol: "none",
            lineStyle: { opacity: 0 },
            areaStyle: { color: "rgba(243, 196, 0, 0.18)" },
            tooltip: { show: false }
          },
          {
            name: "Gasto publico",
            type: "line",
            data: [
              43.6, 42.4, 41.0, 40.5, 39.4, 38.6, 38.0, 38.2, 37.9, 38.2,
              38.0, 37.9, 38.8, 40.8, 45.6, 45.4, 45.5, 48.8, 45.7, 44.6,
              43.2, 41.6, 40.5, 41.0, 41.5, 50.9, 49.1, 45.9, 45.0, 45.1
            ],
            color: "#f3c400",
            symbolSize: 5
          },
          {
            name: "Ingreso publico",
            type: "line",
            data: [
              36.8, 36.5, 37.1, 37.9, 38.2, 37.5, 37.5, 38.0, 37.5, 38.2,
              39.2, 40.0, 40.6, 36.3, 34.5, 35.8, 35.7, 37.2, 38.2, 38.5,
              37.9, 37.4, 37.5, 38.5, 38.5, 41.0, 42.3, 41.3, 41.4, 42.0
            ],
            color: "#6b4a00",
            symbolSize: 5
          }
        ],
        eventLines: [
          { x: "2008", label: "Ano 2008" }
        ],
        min: 32,
        max: 51
      },
      i03: {
        title: "Tabla 1. Espana destina 2 de cada 3 euros de gasto publico a gasto social, sanidad y educacion",
        subtitle: "Clasificacion funcional del gasto, 2023",
        source: "IGAE",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "exacta del informe",
        renderAs: "table",
        tableHighlightFirstRow: false,
        tableColumns: ["Clasificacion gasto", "Millones de euros", "Porcentaje gasto total"],
        tableRows: [
          ["Vivienda", "7 643", "1,1%"],
          ["Defensa", "13 987", "2,1%"],
          ["Proteccion medio ambiente", "14 640", "2,2%"],
          ["Ocio, cultura y religion", "18 729", "2,8%"],
          ["Orden publico y seguridad", "27 443", "4,0%"],
          ["Educacion", "63 040", "9,3%"],
          ["Asuntos economicos", "74 958", "11,0%"],
          ["Servicios pub. generales", "84 784", "12,5%"],
          ["Salud", "98 624", "14,5%"],
          ["Proteccion Social", "277 104", "40,7%"],
          ["Total", "680 952", "100,0%"]
        ],
        tableCellClasses: {
          "9:1": "cell-soft-highlight",
          "10:1": "cell-strong-highlight"
        }
      },
      i04: {
        title: "Grafico 3. Espana: un Estado con gasto descentralizado e ingreso centralizado",
        subtitle: "Ingresos y gastos netos de transferencias por niveles de administracion, en porcentaje del total",
        source: "IGAE",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "%",
        x: ["Administracion Central", "Comunidades Autonomas", "Corporaciones Locales", "Seguridad Social"],
        series: [
          { name: "Ingreso (porcentaje sobre el total)", data: [43.0, 18.4, 8.8, 29.8], color: "#6b4a00" },
          { name: "Gasto (porcentaje sobre el total)", data: [22.6, 32.6, 11.2, 33.7], color: "#f3c400" }
        ],
        min: 0,
        max: 50
      },
      i05: {
        title: "Grafico 4. La Seguridad Social gestiona 1 de cada 3 euros de dinero publico",
        subtitle: "Ingresos no financieros por nivel de administracion netos de gasto en transferencias entre administraciones, como porcentaje del total",
        source: "IGAE",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        renderAs: "small-multiples",
        smallMultiplesType: "bar",
        smallMultiplesColumns: 2,
        unit: "%",
        x: [
          "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004",
          "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014",
          "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
        ],
        smallMultiplesAxis: {
          yMin: 0,
          yMax: 40,
          yInterval: 10,
          xTickIndices: [0, 29]
        },
        series: [
          {
            name: "Seguridad Social",
            color: "#6b4a00",
            data: [34, 33, 32, 32, 31, 30, 29, 29, 28, 28, 27, 27, 35, 34, 33, 33, 32, 31, 30, 30, 29, 29, 30, 31, 35, 34, 33, 32, 32, 32]
          },
          {
            name: "Comunidades Autonomas",
            color: "#f3c400",
            data: [22, 23, 23, 24, 25, 26, 27, 29, 30, 31, 31, 32, 34, 36, 38, 32, 28, 31, 30, 31, 30, 31, 32, 33, 35, 36, 34, 30, 31, 32]
          },
          {
            name: "Administracion Central",
            color: "#f3c400",
            data: [24, 25, 25, 24, 23, 22, 21, 21, 20, 21, 21, 22, 10, 12, 14, 15, 17, 16, 17, 17, 18, 18, 18, 17, 7, 16, 16, 16, 15, 15]
          },
          {
            name: "Corporaciones Locales",
            color: "#f3c400",
            data: [10, 10, 10, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 12, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10]
          }
        ]
      },
      i06: {
        title: "Grafico 5. La Administracion Central apenas tiene recursos de libre disposicion para incrementar el gasto",
        subtitle: "Gasto en operaciones no financieras de la Administracion General del Estado en 2023",
        source: "Garcia (2024) y Ministerio de Hacienda",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "M€",
        showLegend: false,
        xLabelRotate: 90,
        xLabelFontSize: 10,
        x: [
          "Gasto no financiero",
          "Intereses",
          "Aportacion UE",
          "Prestaciones SS",
          "Transferencias otras administraciones",
          "Resto politicas"
        ],
        series: [
          {
            name: "offset-waterfall",
            stack: "waterfall-g5",
            data: [
              0,
              186927,
              168884,
              112295,
              50787,
              0
            ],
            barMaxWidth: 48,
            itemStyle: { color: "rgba(0,0,0,0)" },
            tooltip: { show: false }
          },
          {
            name: "Millones de euros",
            stack: "waterfall-g5",
            barMaxWidth: 48,
            data: [
              { value: 218202, itemStyle: { color: "#f3c400" } },
              { value: 31275, itemStyle: { color: "#6b4a00" }, label: { color: "#ffffff" } },
              { value: 18043, itemStyle: { color: "#6b4a00" }, label: { color: "#ffffff" } },
              { value: 56589, itemStyle: { color: "#6b4a00" }, label: { color: "#ffffff" } },
              { value: 61508, itemStyle: { color: "#6b4a00" }, label: { color: "#ffffff" } },
              { value: 50787, itemStyle: { color: "#f3c400" } }
            ],
            label: {
              show: true,
              position: "inside",
              formatter: (params) => Number(params.value).toLocaleString("es-ES"),
              color: "#2b2b2b",
              fontSize: 10,
              fontWeight: 700
            }
          }
        ],
        min: 0,
        max: 230000
      },
      i07: {
        title: "Grafico 6. Las cotizaciones sociales solo cubren 7 de cada 10 euros del gasto en pensiones",
        subtitle: "Cuentas del Sistema de Seguridad Social en Espana en 2024",
        source: "de la Fuente (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "M€",
        showLegend: false,
        x: ["Cotizaciones y clases pasivas", "Otros ingresos", "Transferencias del Estado", "Total gasto"],
        series: [
          {
            name: "offset-waterfall",
            stack: "waterfall-g6",
            barMaxWidth: 62,
            data: [0, 174250, 176046, 0],
            itemStyle: { color: "rgba(0,0,0,0)" },
            tooltip: { show: false }
          },
          {
            name: "Millones de euros",
            stack: "waterfall-g6",
            barMaxWidth: 62,
            data: [
              { value: 174250, itemStyle: { color: "#f3c400" } },
              { value: 1796, itemStyle: { color: "#f3c400" } },
              { value: 54005, itemStyle: { color: "#f3c400" } },
              { value: 242253, itemStyle: { color: "#6b4a00" }, label: { color: "#ffffff" } }
            ],
            label: {
              show: true,
              position: "inside",
              formatter: (params) => Number(params.value).toLocaleString("es-ES"),
              color: "#2b2b2b",
              fontSize: 10,
              fontWeight: 700
            }
          }
        ],
        min: 0,
        max: 250000
      },
      i08: {
        title: "Grafico 7. La Seguridad Social acumula 15 anos de desequilibrio financiero estructural",
        subtitle: "Evolucion del saldo presupuestario y basico de la Seguridad Social, en porcentaje del PIB",
        source: "de la Fuente (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "% del PIB",
        x: [
          "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014",
          "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
        ],
        series: [
          {
            name: "Saldo presupuestario",
            type: "line",
            data: [0.6, 0.7, 0.7, 0.8, 0.3, -0.2, -0.6, -0.9, -1.2, -1.5, -1.7, -1.9, -1.8, -1.6, -1.5, -1.3, -1.0, -0.7, -0.9, -0.8],
            color: "#f3c400",
            symbolSize: 4
          },
          {
            name: "Saldo basico",
            type: "line",
            data: [0.1, 0.3, 0.7, 0.7, 0.2, -0.5, -1.0, -1.7, -2.8, -3.0, -3.3, -3.5, -3.4, -3.4, -3.4, -5.0, -4.6, -4.0, -4.1, -4.2],
            color: "#6b4a00",
            symbolSize: 4
          }
        ],
        zeroLine: true,
        min: -5.5,
        max: 1
      },
      i09: {
        title: "Grafico 8. El saldo contributivo de la Seguridad Social presenta un deficit creciente",
        subtitle: "Evolucion de los gastos e ingresos contributivos, en miles de millones de euros de 2021",
        source: "de la Fuente (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "miles de millones",
        showLegend: true,
        x: [
          "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014",
          "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
        ],
        series: [
          {
            name: "base-diferencia",
            type: "line",
            excludeFromLegend: true,
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
            excludeFromLegend: true,
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
      i10: {
        title: "Grafico 9. Las cotizaciones unicamente cubren 3 de cada 4 euros de las prestaciones contributivas",
        subtitle: "Evolucion del saldo contributivo de la Seguridad Social",
        source: "de la Fuente (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        renderAs: "small-multiples",
        unit: "%",
        smallMultiplesColumns: 2,
        x: [
          "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014",
          "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
        ],
        smallMultiplesAxis: {
          xTickIndices: [0, 19]
        },
        series: [
          {
            name: "en % del PIB",
            color: "#f3c400",
            splitAreaByZero: true,
            positiveAreaColor: "rgba(166, 166, 166, 0.30)",
            negativeAreaColor: "rgba(243, 196, 0, 0.24)",
            min: -6,
            max: 2.5,
            interval: 2.5,
            data: [0.8, 0.9, 1.0, 0.4, -0.3, -1.1, -2.8, -3.5, -3.7, -3.7, -3.7, -3.6, -3.0, -2.3, -2.7, -5.3, -4.2, -4.2, -4.0, -3.8]
          },
          {
            name: "en % de los gastos contributivos",
            color: "#6b4a00",
            splitAreaByZero: true,
            positiveAreaColor: "rgba(166, 166, 166, 0.30)",
            negativeAreaColor: "rgba(243, 196, 0, 0.24)",
            min: -32,
            max: 16,
            interval: 16,
            data: [5.0, 6.0, 7.0, 2.0, -5.0, -11.0, -18.0, -24.0, -26.0, -27.0, -27.0, -27.0, -27.0, -26.0, -21.0, -29.0, -31.0, -26.0, -27.0, -26.5]
          }
        ]
      },
      i11: {
        title: "Grafico 10. La Seguridad Social solo es viable en cuatro CCAA",
        subtitle: "Saldo del sistema contributivo por Comunidades Autonomas en 2023",
        source: "Seguridad Social y Garcia (2023)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        orientation: "horizontal",
        yAxisInverse: true,
        noWrapLabels: true,
        height: 720,
        gridLeft: 118,
        gridRight: 12,
        yLabelFontSize: 12,
        unit: "M€",
        x: [
          "Madrid",
          "Baleares",
          "Ceuta",
          "Melilla",
          "La Rioja",
          "Canarias",
          "Murcia",
          "Navarra",
          "Castilla-La Mancha",
          "Cantabria",
          "Extremadura",
          "Aragon",
          "Asturias",
          "Valencia",
          "Castilla y Leon",
          "Cataluna",
          "Galicia",
          "Pais Vasco",
          "Andalucia"
        ],
        series: [
          {
            name: "Saldo contributivo",
            data: [
              { value: 1353, label: { show: true, position: "insideRight", formatter: "1 353", color: "#2b2b2b", fontWeight: 700 } },
              { value: 884, label: { show: true, position: "insideRight", formatter: "884", color: "#2b2b2b", fontWeight: 700 } },
              { value: 13, label: { show: true, position: "right", formatter: "13", color: "#2b2b2b", fontWeight: 700 } },
              { value: 12, label: { show: true, position: "right", formatter: "12", color: "#2b2b2b", fontWeight: 700 } },
              { value: -228, label: { show: true, position: "insideLeft", formatter: "-228", color: "#2b2b2b", fontWeight: 700 } },
              { value: -291, label: { show: true, position: "insideLeft", formatter: "-291", color: "#2b2b2b", fontWeight: 700 } },
              { value: -358, label: { show: true, position: "insideLeft", formatter: "-358", color: "#2b2b2b", fontWeight: 700 } },
              { value: -444, label: { show: true, position: "insideLeft", formatter: "-444", color: "#2b2b2b", fontWeight: 700 } },
              { value: -799, label: { show: true, position: "insideLeft", formatter: "-799", color: "#2b2b2b", fontWeight: 700 } },
              { value: -967, label: { show: true, position: "insideLeft", formatter: "-967", color: "#2b2b2b", fontWeight: 700 } },
              { value: -1143, label: { show: true, position: "insideLeft", formatter: "-1 143", color: "#2b2b2b", fontWeight: 700 } },
              { value: -1398, label: { show: true, position: "insideLeft", formatter: "-1 398", color: "#2b2b2b", fontWeight: 700 } },
              { value: -2422, label: { show: true, position: "insideLeft", formatter: "-2 422", color: "#2b2b2b", fontWeight: 700 } },
              { value: -3259, label: { show: true, position: "insideLeft", formatter: "-3 259", color: "#2b2b2b", fontWeight: 700 } },
              { value: -3914, label: { show: true, position: "insideLeft", formatter: "-3 914", color: "#2b2b2b", fontWeight: 700 } },
              { value: -4149, label: { show: true, position: "insideLeft", formatter: "-4 149", color: "#2b2b2b", fontWeight: 700 } },
              { value: -4417, label: { show: true, position: "insideLeft", formatter: "-4 417", color: "#2b2b2b", fontWeight: 700 } },
              { value: -4478, label: { show: true, position: "insideLeft", formatter: "-4 478", color: "#2b2b2b", fontWeight: 700 } },
              { value: -5487, label: { show: true, position: "insideLeft", formatter: "-5 487", color: "#2b2b2b", fontWeight: 700 } }
            ],
            color: "#f3c400",
            barMaxWidth: 20
          }
        ],
        min: -5800,
        max: 1600
      },
      i12: {
        title: "Grafico 11. La hucha de las pensiones aparentemente crece",
        subtitle: "Evolucion del Fondo de Reserva de la Seguridad Social",
        source: "Seguridad Social",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "miles de millones",
        x: [
          "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015",
          "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
        ],
        series: [
          {
            name: "Fondo de reserva",
            data: [32.4, 41.1, 50.7, 61.9, 64.9, 70.3, 72.9, 68.7, 58.4, 45.3, 35.2, 16.2, 9.7, 5.3, 2.2, 2.2, 2.1, 5.0, 8.1],
            color: "#f3c400"
          }
        ],
        min: 0,
        max: 80
      },
      i13: {
        title: "Grafico 12. La hucha de las pensiones es una trampa contable",
        subtitle: "Evolucion de la deuda neta de la Seguridad Social",
        source: "Banco de Espana y Seguridad Social",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "miles de millones",
        barBorderRadius: [0, 0, 0, 0],
        xLabelInterval: 1,
        x: [
          "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014",
          "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
        ],
        series: [
          {
            name: "Prestamos del Estado",
            stack: "deuda-negativa",
            data: [-20, -20, -20, -20, -20, -20, -20, -20, -20, -20, -20, -20, -20, -20, -20, -20, -20, -20, -20, -20],
            color: "#6b4a00"
          },
          {
            name: "Deuda acumulada",
            stack: "deuda-negativa",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -20, -40, -52, -100, -90, -88, -93, -100],
            color: "#9b7700"
          },
          {
            name: "Fondo de Reserva",
            stack: "activos-positivos",
            data: [35, 42, 50, 60, 63, 68, 72, 70, 66, 58, 45, 38, 20, 12, 8, 6, 5, 8, 10, 12],
            color: "#f3c400"
          }
        ],
        zeroLine: true,
        min: -130,
        max: 80
      },
      i14: {
        title: "Grafico 13. El Fondo de Reserva tiene una de las rentabilidades mas bajas entre los fondos soberanos",
        subtitle: "Tasa de retorno real de los fondos de reserva publicos en los paises de la OCDE (2023)",
        source: "OCDE",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "%",
        xLabelRotate: 65,
        xLabelInterval: 0,
        xLabelFontSize: 9,
        height: 620,
        gridBottom: 250,
        labelWrapLength: 12,
        x: [
          "Japon",
          "Canada",
          "Corea",
          "Grecia",
          "Portugal",
          "Luxemburgo",
          "Nueva Zelanda",
          "Lituania",
          "Eslovenia",
          "Promedio OCDE",
          "Chequia",
          "Mexico",
          "Belgica",
          "Finlandia",
          "Reino Unido",
          "Canada (QPP, RRQ/CPP)",
          "Alemania",
          "EEUU",
          "Estonia",
          "Italia",
          "Francia",
          "Polonia",
          "Noruega",
          "Espana",
          "Suecia AP-fondos"
        ],
        series: [
          {
            name: "Rentabilidad real",
            data: [
              19.5,
              11.9,
              10.3,
              10.1,
              7.6,
              6.3,
              6.1,
              6.1,
              5.8,
              5.3,
              5.0,
              5.0,
              4.9,
              4.5,
              4.0,
              3.8,
              3.5,
              3.3,
              3.2,
              3.1,
              2.8,
              2.0,
              1.4,
              { value: -0.9, itemStyle: { color: "#6b4a00" } },
              -1.3
            ],
            color: "#f3c400"
          }
        ],
        min: -2,
        max: 21
      },
      i15: {
        title: "Grafico 14. El patrimonio neto de la Seguridad Social esta en numeros rojos desde 2016",
        subtitle: "Evolucion del patrimonio neto de la Seguridad Social (2005-2024)",
        source: "Seguridad Social",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "miles de millones",
        x: [
          "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014",
          "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
        ],
        series: [
          {
            name: "Patrimonio neto",
            data: [
              { value: 12, itemStyle: { color: "#f3c400" } },
              { value: 21, itemStyle: { color: "#f3c400" } },
              { value: 32, itemStyle: { color: "#f3c400" } },
              { value: 43, itemStyle: { color: "#f3c400" } },
              { value: 46, itemStyle: { color: "#f3c400" } },
              { value: 52, itemStyle: { color: "#f3c400" } },
              { value: 54, itemStyle: { color: "#f3c400" } },
              { value: 50, itemStyle: { color: "#f3c400" } },
              { value: 40, itemStyle: { color: "#f3c400" } },
              { value: 27, itemStyle: { color: "#f3c400" } },
              { value: 17, itemStyle: { color: "#f3c400" } },
              { value: -2, itemStyle: { color: "#6b4a00" } },
              { value: -19, itemStyle: { color: "#6b4a00" } },
              { value: -38, itemStyle: { color: "#6b4a00" } },
              { value: -55, itemStyle: { color: "#6b4a00" } },
              { value: -85, itemStyle: { color: "#6b4a00" } },
              { value: -95, itemStyle: { color: "#6b4a00" } },
              { value: -99, itemStyle: { color: "#6b4a00" } },
              { value: -99, itemStyle: { color: "#6b4a00" } },
              { value: -102, itemStyle: { color: "#6b4a00" } }
            ]
          }
        ],
        zeroLine: true,
        min: -110,
        max: 60
      },
      i16: {
        title: "Grafico 15. Espana tiene el peor saldo fiscal de Europa y el mayor aumento previsto del gasto en pensiones",
        subtitle: "Saldo fiscal entre 2013 y 2022 y cambio previsto en el gasto en pensiones entre 2022 y 2045",
        source: "Eurostat y Comision Europea",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        coordinate: "xy",
        xLabel: "Saldo fiscal promedio 2013-2022",
        yLabel: "Cambio de gasto en pensiones 2022-2045",
        xAxisName: "Saldo fiscal medio 2013-2022 (% PIB)",
        yAxisName: "Cambio previsto gasto pensiones 2022-2045 (% PIB)",
        xAxisNameGap: 42,
        yAxisNameGap: 70,
        xUnit: "% del PIB",
        yUnit: "% del PIB",
        xMin: -0.8,
        xMax: 4.7,
        min: -5.8,
        max: 1.8,
        series: [
          {
            name: "UE (sin Espana)",
            type: "scatter",
            color: "#f3c400",
            symbolSize: 8,
            data: [
              { name: "Suecia", value: [-0.5, -0.1] },
              { name: "Francia", value: [-0.5, -4.8] },
              { name: "Grecia", value: [-0.5, -4.2] },
              { name: "Estonia", value: [-0.2, -1.2] },
              { name: "Alemania", value: [0.3, -2.2] },
              { name: "Austria", value: [0.4, -2.6] },
              { name: "Romania", value: [0.4, -0.2] },
              { name: "Italia", value: [0.8, -4.3] },
              { name: "Paises Bajos", value: [1.3, -1.4] },
              { name: "Portugal", value: [1.4, -0.6] },
              { name: "Belgica", value: [1.7, -1.6] },
              { name: "Letonia", value: [1.9, -3.1] },
              { name: "Dinamarca", value: [2.1, -3.9] },
              { name: "Finlandia", value: [2.3, -3.6] },
              { name: "Luxemburgo", value: [2.5, 1.0] },
              { name: "Polonia", value: [2.6, -1.9] },
              { name: "Chequia", value: [2.7, -2.5] },
              { name: "Lituania", value: [3.0, -1.2] },
              { name: "Eslovenia", value: [3.1, -3.0] }
            ]
          },
          {
            name: "Espana",
            type: "scatter",
            color: "#2b2b2b",
            symbolSize: 11,
            label: {
              show: true,
              formatter: "{b}",
              position: "right",
              color: "#2b2b2b",
              fontSize: 11,
              fontWeight: 700
            },
            data: [{ name: "Espana", value: [4.0, -4.5] }]
          }
        ],
        eventLinesX: [{ x: 0.6, label: "promedio saldo", color: "#d67f7f" }],
        eventLinesY: [{ y: -2.4, label: "promedio cambio gasto", color: "#d67f7f" }]
      }
    },
    text: {
      sourcePath: "extracted_text/la_insostenibilidad_de_la_seguridad_social.txt",
      ranges: [
        {
          chapterId: "resumen-ejecutivo",
          start: "Resumen ejecutivo",
          end: "1. Introducción: las cuentas públicas no cuadran en España"
        },
        {
          chapterId: "sec-1",
          start: "1. Introducción: las cuentas públicas no cuadran en España",
          end: "2. Introducción: las cuentas públicas no cuadran en España"
        },
        {
          chapterId: "sec-2",
          start: "2. Introducción: las cuentas públicas no cuadran en España",
          end: "3. La situación financiera de la Seguridad Social"
        },
        {
          chapterId: "sec-3",
          start: "3. La situación financiera de la Seguridad Social",
          end: "4. La (inexistente) “hucha” de las pensiones y la complicada"
        },
        {
          chapterId: "sec-4",
          start: "4. La (inexistente) “hucha” de las pensiones y la complicada",
          end: "5. La Seguridad Social es el elefante en la habitación de las"
        },
        {
          chapterId: "sec-5",
          start: "5. La Seguridad Social es el elefante en la habitación de las",
          end: "Conclusión: España necesita una reforma urgente en su sistema de pensiones"
        },
        {
          chapterId: "conclusion",
          start: "Conclusión: España necesita una reforma urgente en su sistema de pensiones",
          end: "6. Agradecimiento"
        },
        {
          chapterId: "sec-6",
          start: "6. Agradecimiento",
          end: "Referencias"
        },
        {
          chapterId: "referencias",
          start: "Referencias"
        }
      ]
    },
    playgroundIntro:
      "Simuladores para tension financiera y uso del Fondo de Reserva con los mismos ordenes de magnitud del informe.",
    playgrounds: [
      {
        id: "balance-contributivo",
        title: "Simulador de balance contributivo",
        description:
          "Proyecta cotizaciones, gasto y transferencias para estimar saldo contributivo y deficit relativo en el horizonte elegido.",
        methodology:
          "Base: Graficos 5, 6, 7 y 8. Se proyectan cotizaciones y gasto con crecimiento compuesto anual y se incorpora una transferencia estatal exogena para obtener saldo final.",
        methodologyShort:
          "Proyeccion compuesta de ingresos y gasto con transferencia exogena para estimar saldo y deficit relativo.",
        controls: [
          {
            id: "crecimiento_cotizaciones",
            label: "Crecimiento anual de cotizaciones",
            type: "range",
            min: 0,
            max: 6,
            step: 0.1,
            value: 2.8,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "crecimiento_gasto",
            label: "Crecimiento anual del gasto contributivo",
            type: "range",
            min: 1,
            max: 7,
            step: 0.1,
            value: 4.2,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "transferencias_estado",
            label: "Transferencias del Estado (M EUR / ano)",
            type: "range",
            min: 30000,
            max: 70000,
            step: 500,
            value: 54000,
            display: (value, h) => `${h.formatInt(value)} M EUR`
          },
          {
            id: "horizonte",
            label: "Horizonte de proyeccion",
            type: "range",
            min: 1,
            max: 12,
            step: 1,
            value: 6,
            display: (value, h) => `${h.formatInt(value)} anos`
          }
        ],
        compute: (state, h) => {
          const years = Math.max(1, Math.round(state.horizonte));
          const baseCot = 174250;
          const baseGasto = 242253;
          const pibRef = 1742263;

          const cotizaciones = baseCot * Math.pow(1 + state.crecimiento_cotizaciones / 100, years);
          const gasto = baseGasto * Math.pow(1 + state.crecimiento_gasto / 100, years);
          const saldo = cotizaciones + state.transferencias_estado - gasto;

          const deficitPIB = (-saldo / pibRef) * 100;
          const deficitGasto = (-saldo / gasto) * 100;
          const ajusteAnual = saldo < 0 ? -saldo / years : 0;
          const senal = h.clamp(50 + saldo / 2000, 0, 100);
          const color = saldo >= 0 ? "var(--status-good)" : saldo > -25000 ? "var(--status-warn)" : "var(--status-bad)";

          const narrativa =
            saldo >= 0
              ? "El escenario entra en equilibrio contributivo en el horizonte seleccionado."
              : saldo > -25000
                ? "El desequilibrio se reduce, pero sigue siendo relevante en terminos macrofiscales."
                : "La brecha permanece alta y requeriria ajustes permanentes de ingresos, gasto o ambas.";

          return {
            kpis: [
              { value: `${h.formatInt(Math.round(saldo))} M EUR`, desc: "Saldo contributivo proyectado", color },
              { value: `${h.formatNumber(deficitPIB, 2)}% PIB`, desc: "Deficit relativo sobre PIB" },
              { value: `${h.formatNumber(deficitGasto, 2)}%`, desc: "Deficit sobre gasto contributivo" },
              { value: `${h.formatInt(Math.round(ajusteAnual))} M EUR`, desc: "Ajuste anual medio necesario" }
            ],
            thermometer: {
              value: senal,
              color,
              ariaLabel: "Senal de equilibrio contributivo"
            },
            narrative: narrativa,
            note:
              "El modelo mantiene PIB de referencia constante para lectura comparativa rapida, por lo que no sustituye una senda macro completa."
          };
        }
      },
      {
        id: "fondo-reserva",
        title: "Simulador de Fondo de Reserva",
        description:
          "Evalua como evolucionaria la hucha bajo distintos ritmos de aportacion, retiradas y rentabilidad financiera anual.",
        methodology:
          "Base: Graficos 10, 11, 13 y 14. Se simula un stock inicial de 9.300 M EUR con dinamica anual: saldo(t+1)=saldo(t)*(1+r)+aportaciones-retiros.",
        methodologyShort:
          "Simulacion de stock anual con rendimiento compuesto y flujos netos de caja sobre un saldo inicial de 9.300 M EUR.",
        controls: [
          {
            id: "aportacion_anual",
            label: "Aportacion anual al fondo",
            type: "range",
            min: 0,
            max: 12000,
            step: 250,
            value: 3500,
            display: (value, h) => `${h.formatInt(value)} M EUR`
          },
          {
            id: "rentabilidad",
            label: "Rentabilidad financiera anual",
            type: "range",
            min: 0,
            max: 8,
            step: 0.1,
            value: 2.2,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "retiro_anual",
            label: "Retiro anual para cubrir deficit",
            type: "range",
            min: 0,
            max: 15000,
            step: 250,
            value: 5000,
            display: (value, h) => `${h.formatInt(value)} M EUR`
          },
          {
            id: "horizonte",
            label: "Horizonte de simulacion",
            type: "range",
            min: 1,
            max: 15,
            step: 1,
            value: 8,
            display: (value, h) => `${h.formatInt(value)} anos`
          }
        ],
        compute: (state, h) => {
          const years = Math.max(1, Math.round(state.horizonte));
          const monthlyPensions = 13000;
          let fondo = 9300;

          for (let year = 0; year < years; year += 1) {
            fondo = Math.max(0, fondo * (1 + state.rentabilidad / 100) + state.aportacion_anual - state.retiro_anual);
          }

          let agotamiento = null;
          let sim = 9300;
          for (let year = 1; year <= 35; year += 1) {
            sim = Math.max(0, sim * (1 + state.rentabilidad / 100) + state.aportacion_anual - state.retiro_anual);
            if (sim <= 0.0001) {
              agotamiento = year;
              break;
            }
          }

          const mesesCobertura = fondo / monthlyPensions;
          const diasCobertura = mesesCobertura * 30;
          const senal = h.clamp((mesesCobertura / 12) * 100, 0, 100);
          const color = mesesCobertura >= 12 ? "var(--status-good)" : mesesCobertura >= 6 ? "var(--status-warn)" : "var(--status-bad)";

          const narrativa =
            mesesCobertura >= 12
              ? "La reserva recupera capacidad de cobertura por encima de una anualidad completa."
              : mesesCobertura >= 6
                ? "Se mantiene una cobertura intermedia: util como colchon, pero insuficiente ante shocks largos."
                : "La capacidad de cobertura sigue reducida y vulnerable a retiradas persistentes.";

          return {
            kpis: [
              { value: `${h.formatInt(Math.round(fondo))} M EUR`, desc: "Fondo estimado al final del horizonte", color },
              { value: `${h.formatNumber(mesesCobertura, 2)} meses`, desc: "Cobertura sobre una mensualidad de pensiones" },
              { value: `${h.formatInt(Math.round(diasCobertura))} dias`, desc: "Cobertura equivalente en dias" },
              {
                value: agotamiento ? `${agotamiento} anos` : "Sin agotamiento <35 anos",
                desc: "Momento estimado de agotamiento del fondo"
              }
            ],
            thermometer: {
              value: senal,
              color,
              ariaLabel: "Robustez temporal del Fondo de Reserva"
            },
            narrative: narrativa,
            note:
              "No incluye cambios de ciclo ni nuevas reglas institucionales; la simulacion solo ilustra sensibilidad a flujos y rentabilidad."
          };
        }
      }
    ],
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
