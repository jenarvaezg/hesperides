(() => {
  const makeIds = (prefix, from, to) => {
    const ids = [];
    for (let i = from; i <= to; i += 1) {
      ids.push(`${prefix}${String(i).padStart(2, "0")}`);
    }
    return ids;
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

  const baseMeta = {
    source: "Sistemas de pensiones comparados (2025)",
    sourceUrl: "https://hesperides.edu.es/documentos_pdf/Sistemas_de_pensiones_comparados.pdf",
    exactness: "reconstruida visualmente"
  };

  const chartByNumber = {
    1: {
      title: "Grafica 1. Cotizacion obligatoria para pension",
      subtitle: "Porcentaje del salario destinado al pilar principal",
      unit: "%",
      x: countries,
      series: [{ name: "Cotizacion obligatoria", data: [30.0, 18.6, 16.0, 10.0], color: "#f3c400" }]
    },
    2: {
      title: "Grafica 2. Dependencia de transferencias en renta 65+",
      subtitle: "Participacion de transferencias publicas en ingresos de mayores",
      unit: "%",
      x: countries,
      series: [{ name: "Transferencias sobre renta 65+", data: [71.9, 60.5, 51.6, 38.4], color: "#2b2b2b" }]
    },
    3: {
      title: "Grafica 3. Tasa de reemplazo estimada",
      subtitle: "Pension inicial sobre ultimo salario",
      unit: "%",
      x: countries,
      series: [{ name: "Tasa de reemplazo", data: [79, 52, 55, 42], color: "#7f5b00" }]
    },
    4: {
      title: "Grafica 4. Riesgo de pobreza en mayores",
      subtitle: "Poblacion 65+ bajo umbral relativo",
      unit: "%",
      x: countries,
      series: [{ name: "Riesgo de pobreza 65+", data: [20.5, 18.2, 15.1, 24.8], color: "#f3c400" }]
    },
    5: {
      title: "Grafica 5. Edad legal de jubilacion",
      subtitle: "Edad estatutaria de acceso ordinario",
      unit: "indice",
      x: countries,
      series: [{ name: "Edad legal", data: [66.7, 67.0, 65.0, 65.0], color: "#2b2b2b" }],
      min: 60,
      max: 68
    },
    6: {
      title: "Grafica 6. Edad efectiva de retiro",
      subtitle: "Salida efectiva media del mercado laboral",
      unit: "indice",
      x: countries,
      series: [{ name: "Edad efectiva", data: [64.9, 64.2, 65.4, 66.1], color: "#7f5b00" }],
      min: 60,
      max: 68
    },
    7: {
      title: "Grafica 7. Anos esperados en jubilacion",
      subtitle: "Esperanza de vida restante al jubilarse",
      unit: "indice",
      x: countries,
      series: [{ name: "Anos en jubilacion", data: [22.5, 20.8, 22.1, 21.4], color: "#f3c400" }],
      min: 15,
      max: 25
    },
    8: {
      title: "Grafica 8. Cobertura de pilares complementarios",
      subtitle: "Porcentaje de trabajadores con segundo/tercer pilar activo",
      unit: "%",
      x: countries,
      series: [{ name: "Cobertura complementaria", data: [26, 58, 89, 74], color: "#2b2b2b" }]
    },
    9: {
      title: "Grafica 9. Gasto en pensiones de Espana",
      subtitle: "Trayectoria de gasto sobre PIB",
      type: "line",
      unit: "%",
      x: years,
      series: [{ name: "Espana", type: "line", data: [8.3, 10.2, 11.0, 12.3, 12.9, 13.6, 14.2], color: "#f3c400" }],
      min: 7,
      max: 15
    },
    10: {
      title: "Grafica 10. Cotizacion total en Alemania",
      subtitle: "Evolucion y proyeccion del tipo contributivo",
      type: "line",
      unit: "%",
      x: years,
      series: [{ name: "Alemania", type: "line", data: [19.5, 19.0, 18.7, 18.6, 19.2, 20.5, 22.3], color: "#2b2b2b" }],
      min: 17,
      max: 24
    },
    11: {
      title: "Grafica 11. Balance automatico del sistema sueco",
      subtitle: "Indice de ajuste actuarial del pilar nocional",
      type: "line",
      unit: "indice",
      x: years,
      series: [{ name: "Indice de balance", type: "line", data: [101, 99, 100, 102, 101, 100, 99], color: "#7f5b00" }],
      min: 96,
      max: 104
    },
    12: {
      title: "Grafica 12. Activos de fondos de pensiones en Chile",
      subtitle: "Activos acumulados sobre PIB",
      type: "line",
      unit: "%",
      x: years,
      series: [{ name: "Fondos AFP / PIB", type: "line", data: [55, 62, 69, 78, 75, 73, 72], color: "#f3c400", areaStyle: 0.12 }],
      min: 45,
      max: 85
    },
    13: {
      title: "Grafica 13. Espana: pension publica y ahorro privado",
      subtitle: "Composicion de ingresos en jubilacion",
      type: "line",
      unit: "%",
      x: years,
      series: [
        { name: "Pilar publico", type: "line", data: [86, 85, 84, 83, 82, 81, 80], color: "#f3c400" },
        { name: "Pilares privados", type: "line", data: [14, 15, 16, 17, 18, 19, 20], color: "#2b2b2b" }
      ],
      min: 0,
      max: 100
    },
    14: {
      title: "Grafica 14. Alemania: mezcla de financiacion",
      subtitle: "Peso relativo de reparto y ahorro ocupacional/privado",
      type: "line",
      unit: "%",
      x: years,
      series: [
        { name: "Reparto", type: "line", data: [74, 72, 70, 68, 66, 64, 62], color: "#2b2b2b" },
        { name: "Capitalizacion", type: "line", data: [26, 28, 30, 32, 34, 36, 38], color: "#f3c400" }
      ],
      min: 0,
      max: 100
    },
    15: {
      title: "Grafica 15. Suecia: pension de ingresos y premium",
      subtitle: "Desglose interno del modelo sueco",
      type: "line",
      unit: "%",
      x: years,
      series: [
        { name: "Ingreso nocional", type: "line", data: [84, 83, 82, 81, 80, 79, 78], color: "#2b2b2b" },
        { name: "Premium pension", type: "line", data: [16, 17, 18, 19, 20, 21, 22], color: "#f3c400" }
      ],
      min: 0,
      max: 100
    },
    16: {
      title: "Grafica 16. Chile: ahorro obligatorio y voluntario",
      subtitle: "Participacion relativa por tipo de cuenta",
      type: "line",
      unit: "%",
      x: years,
      series: [
        { name: "Obligatorio", type: "line", data: [88, 87, 86, 84, 83, 82, 81], color: "#2b2b2b" },
        { name: "Voluntario", type: "line", data: [12, 13, 14, 16, 17, 18, 19], color: "#f3c400" }
      ],
      min: 0,
      max: 100
    },
    17: {
      title: "Grafica 17. Empleo de 55-64 anos",
      subtitle: "Participacion laboral en tramo previo a jubilacion",
      orientation: "horizontal",
      unit: "%",
      x: countries,
      series: [{ name: "Tasa de empleo 55-64", data: [58, 73, 78, 67], color: "#f3c400" }],
      min: 0,
      max: 85
    },
    18: {
      title: "Grafica 18. Empleo de 65-69 anos",
      subtitle: "Continuidad laboral tras edad ordinaria",
      orientation: "horizontal",
      unit: "%",
      x: countries,
      series: [{ name: "Tasa de empleo 65-69", data: [9, 19, 24, 28], color: "#2b2b2b" }],
      min: 0,
      max: 35
    },
    19: {
      title: "Grafica 19. Pobreza relativa en mayores",
      subtitle: "Comparativa internacional 65+",
      orientation: "horizontal",
      unit: "%",
      x: countries,
      series: [{ name: "Riesgo de pobreza", data: [20.5, 18.2, 15.1, 24.8], color: "#7f5b00" }],
      min: 0,
      max: 30
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
