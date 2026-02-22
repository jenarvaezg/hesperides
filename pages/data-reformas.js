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
      { id: "resumen-ejecutivo", title: "Resumen ejecutivo", charts: [] },
      { id: "sec-1", title: "1. Introducción", charts: [] },
      { id: "sec-2", title: "2. Reforma de 1985: Endurecimiento", charts: ["r01"] },
      { id: "sec-3", title: "3. Reforma de 1997: El Pacto de Toledo", charts: [] },
      { id: "sec-4", title: "4. Reforma de 2001/2002: Incentivos", charts: [] },
      { id: "sec-5", title: "5. Reforma de 2007: Nuevos ajustes", charts: [] },
      { id: "sec-6", title: "6. Reformas de 2011 y 2013:", charts: [] },
      {
        id: "sec-7",
        title: "7. Reformas de 2021 y 2023: Nuevo enfoque para la sostenibilidad y la equidad intergeneracional",
        charts: []
      },
      { id: "sec-8", title: "8. Algunos datos para concluir", charts: ["r02", "r03", "r04"] },
      { id: "bibliografia", title: "Bibliografía", charts: [] }
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
    text: {
      sourcePath: "extracted_text/reformas_seguridad_social_espana.txt",
      ranges: [
        {
          chapterId: "resumen-ejecutivo",
          start: "Resumen ejecutivo",
          end: "1. Introducción"
        },
        {
          chapterId: "sec-1",
          start: "1. Introducción",
          end: "2. Reforma de 1985: Endurecimiento"
        },
        {
          chapterId: "sec-2",
          start: "2. Reforma de 1985: Endurecimiento",
          end: "3. Reforma de 1997: El Pacto de Toledo"
        },
        {
          chapterId: "sec-3",
          start: "3. Reforma de 1997: El Pacto de Toledo",
          end: "4. Reforma de 2001/2002: Incentivos"
        },
        {
          chapterId: "sec-4",
          start: "4. Reforma de 2001/2002: Incentivos",
          end: "5. Reforma de 2007: Nuevos ajustes"
        },
        {
          chapterId: "sec-5",
          start: "5. Reforma de 2007: Nuevos ajustes",
          end: "6. Reformas de 2011 y 2013:"
        },
        {
          chapterId: "sec-6",
          start: "6. Reformas de 2011 y 2013:",
          end: "7. Reformas de 2021 y 2023: Nuevo"
        },
        {
          chapterId: "sec-7",
          start: "7. Reformas de 2021 y 2023: Nuevo",
          end: "8. Algunos datos para concluir"
        },
        {
          chapterId: "sec-8",
          start: "8. Algunos datos para concluir",
          end: "Bibliografía"
        },
        {
          chapterId: "bibliografia",
          start: "Bibliografía"
        }
      ]
    },
    playgroundIntro:
      "Simuladores de sensibilidad sobre gasto, presion contributiva y divergencia pension-salario en el marco de reformas.",
    playgrounds: [
      {
        id: "intensidad-reforma",
        title: "Simulador de intensidad reformista",
        description:
          "Mide como cambia el gasto esperado y la presion contributiva cuando se combinan edad efectiva, empleo senior y productividad.",
        methodology:
          "Base: Graficos 1 y 2. Se proyecta un escenario tendencial a 2035 y se aplican elasticidades simplificadas por palanca de reforma para estimar gasto y ratio pensionistas/cotizantes.",
        methodologyShort:
          "Escenario tendencial 2035 corregido por elasticidades lineales de edad, empleo senior, productividad e intensidad de reforma.",
        controls: [
          {
            id: "retraso_edad",
            label: "Retraso adicional de edad efectiva",
            type: "range",
            min: 0,
            max: 3,
            step: 0.1,
            value: 1,
            display: (value, h) => `${h.formatNumber(value)} anos`
          },
          {
            id: "empleo_senior",
            label: "Mejora del empleo senior (55-69)",
            type: "range",
            min: 0,
            max: 8,
            step: 0.1,
            value: 3,
            display: (value, h) => `${h.formatNumber(value)} p.p.`
          },
          {
            id: "productividad",
            label: "Productividad real adicional",
            type: "range",
            min: 0,
            max: 2,
            step: 0.1,
            value: 0.8,
            display: (value, h) => `${h.formatNumber(value)}% anual`
          },
          {
            id: "intensidad",
            label: "Intensidad global de paquete reformista",
            type: "range",
            min: 0,
            max: 100,
            step: 1,
            value: 55,
            display: (value, h) => `${h.formatInt(value)} / 100`
          }
        ],
        compute: (state, h) => {
          const gasto2035 = h.clamp(
            14.2 - state.retraso_edad * 0.3 - state.empleo_senior * 0.05 - state.productividad * 0.35 - state.intensidad * 0.008,
            11.5,
            14.8
          );

          const ratioPensionistas = h.clamp(
            56 - state.retraso_edad * 1.2 - state.empleo_senior * 0.45 - state.intensidad * 0.04,
            42,
            60
          );

          const desviacionActual = gasto2035 - 12.6;
          const indicador = h.clamp(
            ((14.8 - gasto2035) / 3.3) * 55 + ((60 - ratioPensionistas) / 18) * 45,
            0,
            100
          );
          const color = indicador > 65 ? "var(--status-good)" : indicador > 45 ? "var(--status-warn)" : "var(--status-bad)";

          const narrativa =
            indicador > 65
              ? "El paquete reformista reduce de forma clara la pendiente de gasto y la tension contributiva."
              : indicador > 45
                ? "La mejora es moderada: la inercia demografica sigue empujando el sistema."
                : "La configuracion elegida deja una senda de tension elevada para la proxima decada.";

          return {
            kpis: [
              { value: `${h.formatNumber(gasto2035, 2)}% PIB`, desc: "Gasto en pensiones estimado en 2035" },
              { value: `${h.formatNumber(ratioPensionistas, 1)}`, desc: "Pensionistas por cada 100 cotizantes" },
              { value: `${h.formatNumber(desviacionActual, 2)} p.p.`, desc: "Diferencia frente al nivel actual (12,6%)" },
              { value: `${h.formatNumber(indicador, 1)}`, desc: "Indicador de sostenibilidad reformista", color }
            ],
            thermometer: {
              value: indicador,
              color,
              ariaLabel: "Indicador compuesto de sostenibilidad"
            },
            narrative: narrativa,
            note:
              "El horizonte 2035 se aproxima con una extrapolacion simplificada de la tendencia historica mostrada en el informe."
          };
        }
      },
      {
        id: "brecha-pension-salario",
        title: "Simulador de brecha pension-salario",
        description:
          "Proyecta indices reales de pension y salario para estimar la divergencia futura y su impacto sobre la presion contributiva.",
        methodology:
          "Base: Graficos 2 y 3. Se proyectan los indices de 2024 (pension 163, salario 113) por crecimiento compuesto y se traslada su ratio a una presion contributiva aproximada.",
        methodologyShort:
          "Proyeccion compuesta de indices reales y transformacion a presion contributiva mediante una funcion de calibracion.",
        controls: [
          {
            id: "reval_pensiones",
            label: "Revalorizacion real anual de pensiones",
            type: "range",
            min: 0,
            max: 3,
            step: 0.1,
            value: 2,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "crec_salarios",
            label: "Crecimiento real anual de salarios",
            type: "range",
            min: 0,
            max: 3,
            step: 0.1,
            value: 1.2,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "horizonte",
            label: "Horizonte de proyeccion",
            type: "range",
            min: 3,
            max: 20,
            step: 1,
            value: 10,
            display: (value, h) => `${h.formatInt(value)} anos`
          },
          {
            id: "empleo",
            label: "Tasa de empleo agregada",
            type: "range",
            min: 68,
            max: 78,
            step: 0.1,
            value: 73,
            display: (value, h) => `${h.formatNumber(value)}%`
          }
        ],
        compute: (state, h) => {
          const years = Math.max(1, Math.round(state.horizonte));
          const pensionIndex = 163 * Math.pow(1 + state.reval_pensiones / 100, years);
          const salarioIndex = 113 * Math.pow(1 + state.crec_salarios / 100, years);
          const brecha = pensionIndex - salarioIndex;
          const ratio = pensionIndex / salarioIndex;

          const presionContributiva = h.clamp(
            51 + (ratio - 163 / 113) * 18 - (state.empleo - 73) * 0.8,
            35,
            65
          );

          const ajusteCotizacion = h.clamp((presionContributiva - 51) * 0.25 + (brecha - 50) * 0.02, 0, 6.5);
          const senal = h.clamp(((65 - presionContributiva) / 30) * 100, 0, 100);
          const color = presionContributiva < 48 ? "var(--status-good)" : presionContributiva < 55 ? "var(--status-warn)" : "var(--status-bad)";

          const narrativa =
            presionContributiva < 48
              ? "La brecha pension-salario se contiene y reduce presion sobre cotizaciones."
              : presionContributiva < 55
                ? "La divergencia sigue creciendo, aunque en un rango gestionable con ajustes graduales."
                : "La trayectoria amplifica la tension contributiva y exigiria correcciones adicionales.";

          return {
            kpis: [
              { value: `${h.formatNumber(pensionIndex, 1)}`, desc: "Indice de pension real proyectado" },
              { value: `${h.formatNumber(salarioIndex, 1)}`, desc: "Indice de salario real proyectado" },
              { value: `${h.formatNumber(brecha, 1)}`, desc: "Brecha de indices pension-salario" },
              { value: `${h.formatNumber(presionContributiva, 1)}`, desc: "Pensionistas por 100 cotizantes (proxy)", color },
              { value: `+${h.formatNumber(ajusteCotizacion, 2)} p.p.`, desc: "Ajuste potencial de cotizacion requerido" }
            ],
            thermometer: {
              value: senal,
              color,
              ariaLabel: "Senal de presion contributiva proyectada"
            },
            narrative: narrativa,
            note:
              "La proyeccion utiliza crecimiento constante para facilitar comparacion; no incorpora ciclos economicos intermedios."
          };
        }
      }
    ],
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
