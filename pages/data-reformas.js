(() => {
  const makeYearRange = (from, to) => {
    const years = [];
    for (let year = from; year <= to; year += 1) {
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
      if (x >= points[points.length - 1][0])
        return points[points.length - 1][1];

      for (let index = 0; index < points.length - 1; index += 1) {
        const [x0, y0] = points[index];
        const [x1, y1] = points[index + 1];
        if (x < x0 || x > x1) continue;
        if (x0 === x1) return y1;
        const ratio = (x - x0) / (x1 - x0);
        return Number((y0 + (y1 - y0) * ratio).toFixed(2));
      }

      return points[points.length - 1][1];
    });
  };

  const years1977To2024 = makeYearRange(1977, 2024);

  window.REPORT_DATA = {
    meta: {
      title: "Las Reformas de la Seguridad Social en Espana",
      lead: "Replica interactiva del informe con visualizaciones reconstruidas visualmente para mantener lectura comparativa y trazabilidad metodologica.",
      reportUrl:
        "https://hesperides.edu.es/informes/reformas-seguridad-social-espana",
      pdfUrl:
        "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf",
      caveat:
        "Las series numericas se han estimado visualmente a partir de los graficos del informe original.",
      keyFinding: {
        kpi: "5 reformas",
        text: "Desde 1985, ninguna freno el crecimiento del gasto en pensiones",
      },
      contentBadge: "3 graficos",
    },
    metrics: [
      { kpi: "12,6%", label: "Gasto en pensiones sobre PIB (actual)" },
      { kpi: "5", label: "Grandes rondas de reforma desde 1985" },
      { kpi: "1977–2024", label: "Serie historica completa" },
      { kpi: "0", label: "Reformas que frenaron el gasto" },
    ],
    chapters: [
      { id: "resumen-ejecutivo", title: "Resumen ejecutivo", charts: [] },
      { id: "sec-1", title: "1. Introducción", charts: [] },
      { id: "sec-2", title: "2. Reforma de 1985: Endurecimiento", charts: [] },
      {
        id: "sec-3",
        title: "3. Reforma de 1997: El Pacto de Toledo",
        charts: [],
      },
      { id: "sec-4", title: "4. Reforma de 2001/2002: Incentivos", charts: [] },
      { id: "sec-5", title: "5. Reforma de 2007: Nuevos ajustes", charts: [] },
      { id: "sec-6", title: "6. Reformas de 2011 y 2013:", charts: [] },
      {
        id: "sec-7",
        title:
          "7. Reformas de 2021 y 2023: Nuevo enfoque para la sostenibilidad y la equidad intergeneracional",
        charts: [],
      },
      {
        id: "sec-8",
        title: "8. Algunos datos para concluir",
        charts: ["r01", "r02", "r03", "r04"],
      },
      { id: "bibliografia", title: "Bibliografía", charts: [] },
    ],
    charts: {
      r01: {
        title: "Tabla 1. Las reformas del sistema de pensiones",
        subtitle:
          "Principales cambios normativos en parametros de acceso, calculo y revalorizacion",
        source: "Las Reformas de la Seguridad Social en Espana (2025)",
        sourceUrl:
          "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf",
        exactness: "reconstruida visualmente",
        renderAs: "table",
        tableColumns: [
          "Reforma (ano)",
          "Edad legal jubilacion",
          "Anos calculo pension",
          "Anos cotizados - 100%",
          "Revalorizacion anual",
          "Novedad",
        ],
        tableRows: [
          [
            "Pre-1985",
            "65 anos",
            "2 anos",
            "35 anos (100%)",
            "Discrecional",
            "Sanidad financiada con cotizaciones",
          ],
          [
            "Ley 26/1985",
            "65 anos",
            "8 anos",
            "35 anos",
            "IPC (no formal)",
            "Carencia ampliada",
          ],
          [
            "Ley 24/1997",
            "65 anos",
            "15 anos",
            "35 anos",
            "IPC + ajuste",
            "Fondo de Reserva",
          ],
          [
            "Ley 35/2002",
            "65 anos (flexible >65)",
            "15 anos",
            "35 anos",
            "IPC",
            "Mayor incentivo a retiro >65",
          ],
          [
            "Ley 40/2007",
            "65 anos",
            "15 anos (dias efectivos)",
            "35 anos (efectivos)",
            "IPC",
            "Reforma parcial de acceso y retiro",
          ],
          [
            "Ley 27/2011",
            "65-67 (2027)",
            "15-25 anos (2022)",
            "35-37 anos (2027)",
            "IPC",
            "Retraso gradual de jubilacion",
          ],
          [
            "Ley 23/2013",
            "65-67",
            "25 anos",
            "37 anos",
            "IRP 0,25%-IPC+0,5",
            "Factor de sostenibilidad",
          ],
          [
            "Ley 21/2021",
            "65-67",
            "25 anos",
            "37 anos",
            "IPC",
            "Elimina IRP y factor 2013",
          ],
          [
            "RDL 2/2023",
            "65-67",
            "25 anos o 27/29 opc.",
            "37 anos",
            "IPC",
            "Cuota de solidaridad y bases maximas",
          ],
        ],
      },
      r02: {
        title: "Grafico 1. El gasto en pensiones no ha parado de crecer",
        subtitle: "Evolucion del gasto en pensiones, en porcentaje del PIB",
        source: "Las Reformas de la Seguridad Social en Espana (2025)",
        sourceUrl:
          "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "%",
        x: years1977To2024,
        series: [
          {
            name: "Gasto en pensiones / PIB",
            type: "line",
            smooth: false,
            data: interpolateSeries(years1977To2024, [
              [1977, 0.53],
              [1980, 0.9],
              [1985, 1.8],
              [1990, 2.8],
              [1995, 4.8],
              [2000, 5.4],
              [2005, 6.1],
              [2008, 6.8],
              [2010, 8.2],
              [2012, 9.1],
              [2014, 10.1],
              [2018, 10.0],
              [2020, 10.2],
              [2021, 11.0],
              [2022, 12.1],
              [2023, 11.9],
              [2024, 12.6],
            ]),
            color: "#f3c400",
          },
        ],
        min: 0,
        max: 13,
      },
      r03: {
        title:
          "Grafico 2. La presion crece: menos trabajadores por cada pensionista",
        subtitle: "Evolucion de la ratio ocupados por pension",
        source: "Las Reformas de la Seguridad Social en Espana (2025)",
        sourceUrl:
          "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "indice",
        x: years1977To2024,
        series: [
          {
            name: "Ocupados/pension jubilacion",
            type: "line",
            smooth: false,
            data: interpolateSeries(years1977To2024, [
              [1977, 6.57],
              [1980, 6.0],
              [1983, 5.3],
              [1986, 4.8],
              [1990, 5.0],
              [1995, 4.2],
              [1996, 3.4],
              [2000, 3.8],
              [2005, 4.3],
              [2008, 4.0],
              [2010, 3.5],
              [2013, 3.2],
              [2018, 3.3],
              [2020, 3.4],
              [2024, 3.3],
            ]),
            color: "#f3c400",
          },
          {
            name: "Ocupados/pension",
            type: "line",
            smooth: false,
            data: interpolateSeries(years1977To2024, [
              [1977, 3.49],
              [1980, 3.0],
              [1983, 2.5],
              [1986, 2.2],
              [1990, 2.3],
              [1995, 2.0],
              [2000, 2.2],
              [2005, 2.5],
              [2008, 2.3],
              [2010, 2.0],
              [2015, 2.1],
              [2018, 2.0],
              [2020, 2.1],
              [2024, 2.0],
            ]),
            color: "#7f5b00",
          },
        ],
        min: 0,
        max: 7,
      },
      r04: {
        title: "Grafico 3. El coste de las pensiones se ha disparado",
        subtitle: "Evolucion de la pension media",
        source: "Las Reformas de la Seguridad Social en Espana (2025)",
        sourceUrl:
          "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "euros",
        showLegend: false,
        x: years1977To2024,
        series: [
          {
            name: "Pension media jubilacion",
            type: "line",
            smooth: false,
            data: interpolateSeries(years1977To2024, [
              [1977, 53.1],
              [1980, 90],
              [1985, 180],
              [1990, 280],
              [1995, 470],
              [2000, 560],
              [2005, 730],
              [2010, 980],
              [2015, 1130],
              [2018, 1210],
              [2020, 1300],
              [2021, 1450.92],
              [2022, 1430],
              [2024, 1450],
            ]),
            color: "#f3c400",
          },
        ],
        min: 0,
        max: 1500,
      },
    },
    text: {
      sourcePath: "extracted_text/reformas_seguridad_social_espana.txt",
      ranges: [
        {
          chapterId: "resumen-ejecutivo",
          start: "Resumen ejecutivo",
          end: "1. Introducción",
        },
        {
          chapterId: "sec-1",
          start: "1. Introducción",
          end: "2. Reforma de 1985: Endurecimiento",
        },
        {
          chapterId: "sec-2",
          start: "2. Reforma de 1985: Endurecimiento",
          end: "3. Reforma de 1997: El Pacto de Toledo",
        },
        {
          chapterId: "sec-3",
          start: "3. Reforma de 1997: El Pacto de Toledo",
          end: "4. Reforma de 2001/2002: Incentivos",
        },
        {
          chapterId: "sec-4",
          start: "4. Reforma de 2001/2002: Incentivos",
          end: "5. Reforma de 2007: Nuevos ajustes",
        },
        {
          chapterId: "sec-5",
          start: "5. Reforma de 2007: Nuevos ajustes",
          end: "6. Reformas de 2011 y 2013:",
        },
        {
          chapterId: "sec-6",
          start: "6. Reformas de 2011 y 2013:",
          end: "7. Reformas de 2021 y 2023: Nuevo",
        },
        {
          chapterId: "sec-7",
          start: "7. Reformas de 2021 y 2023: Nuevo",
          end: "8. Algunos datos para concluir",
        },
        {
          chapterId: "sec-8",
          start: "8. Algunos datos para concluir",
          end: "Bibliografía",
        },
        {
          chapterId: "bibliografia",
          start: "Bibliografía",
        },
      ],
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
            display: (value, h) => `${h.formatNumber(value)} anos`,
          },
          {
            id: "empleo_senior",
            label: "Mejora del empleo senior (55-69)",
            type: "range",
            min: 0,
            max: 8,
            step: 0.1,
            value: 3,
            display: (value, h) => `${h.formatNumber(value)} p.p.`,
          },
          {
            id: "productividad",
            label: "Productividad real adicional",
            type: "range",
            min: 0,
            max: 2,
            step: 0.1,
            value: 0.8,
            display: (value, h) => `${h.formatNumber(value)}% anual`,
          },
          {
            id: "intensidad",
            label: "Intensidad global de paquete reformista",
            type: "range",
            min: 0,
            max: 100,
            step: 1,
            value: 55,
            display: (value, h) => `${h.formatInt(value)} / 100`,
          },
        ],
        compute: (state, h) => {
          const gasto2035 = h.clamp(
            14.2 -
              state.retraso_edad * 0.3 -
              state.empleo_senior * 0.05 -
              state.productividad * 0.35 -
              state.intensidad * 0.008,
            11.5,
            14.8,
          );

          const ratioPensionistas = h.clamp(
            56 -
              state.retraso_edad * 1.2 -
              state.empleo_senior * 0.45 -
              state.intensidad * 0.04,
            42,
            60,
          );

          const desviacionActual = gasto2035 - 12.6;
          const indicador = h.clamp(
            ((14.8 - gasto2035) / 3.3) * 55 +
              ((60 - ratioPensionistas) / 18) * 45,
            0,
            100,
          );
          const color =
            indicador > 65
              ? "var(--status-good)"
              : indicador > 45
                ? "var(--status-warn)"
                : "var(--status-bad)";

          const narrativa =
            indicador > 65
              ? "El paquete reformista reduce de forma clara la pendiente de gasto y la tension contributiva."
              : indicador > 45
                ? "La mejora es moderada: la inercia demografica sigue empujando el sistema."
                : "La configuracion elegida deja una senda de tension elevada para la proxima decada.";

          return {
            kpis: [
              {
                value: `${h.formatNumber(gasto2035, 2)}% PIB`,
                desc: "Gasto en pensiones estimado en 2035",
              },
              {
                value: `${h.formatNumber(ratioPensionistas, 1)}`,
                desc: "Pensionistas por cada 100 cotizantes",
              },
              {
                value: `${h.formatNumber(desviacionActual, 2)} p.p.`,
                desc: "Diferencia frente al nivel actual (12,6%)",
              },
              {
                value: `${h.formatNumber(indicador, 1)}`,
                desc: "Indicador de sostenibilidad reformista",
                color,
              },
            ],
            thermometer: {
              value: indicador,
              color,
              ariaLabel: "Indicador compuesto de sostenibilidad",
            },
            narrative: narrativa,
            note: "El horizonte 2035 se aproxima con una extrapolacion simplificada de la tendencia historica mostrada en el informe.",
          };
        },
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
            display: (value, h) => `${h.formatNumber(value)}%`,
          },
          {
            id: "crec_salarios",
            label: "Crecimiento real anual de salarios",
            type: "range",
            min: 0,
            max: 3,
            step: 0.1,
            value: 1.2,
            display: (value, h) => `${h.formatNumber(value)}%`,
          },
          {
            id: "horizonte",
            label: "Horizonte de proyeccion",
            type: "range",
            min: 3,
            max: 20,
            step: 1,
            value: 10,
            display: (value, h) => `${h.formatInt(value)} anos`,
          },
          {
            id: "empleo",
            label: "Tasa de empleo agregada",
            type: "range",
            min: 68,
            max: 78,
            step: 0.1,
            value: 73,
            display: (value, h) => `${h.formatNumber(value)}%`,
          },
        ],
        compute: (state, h) => {
          const years = Math.max(1, Math.round(state.horizonte));
          const pensionIndex =
            163 * Math.pow(1 + state.reval_pensiones / 100, years);
          const salarioIndex =
            113 * Math.pow(1 + state.crec_salarios / 100, years);
          const brecha = pensionIndex - salarioIndex;
          const ratio = pensionIndex / salarioIndex;

          const presionContributiva = h.clamp(
            51 + (ratio - 163 / 113) * 18 - (state.empleo - 73) * 0.8,
            35,
            65,
          );

          const ajusteCotizacion = h.clamp(
            (presionContributiva - 51) * 0.25 + (brecha - 50) * 0.02,
            0,
            6.5,
          );
          const senal = h.clamp(
            ((65 - presionContributiva) / 30) * 100,
            0,
            100,
          );
          const color =
            presionContributiva < 48
              ? "var(--status-good)"
              : presionContributiva < 55
                ? "var(--status-warn)"
                : "var(--status-bad)";

          const narrativa =
            presionContributiva < 48
              ? "La brecha pension-salario se contiene y reduce presion sobre cotizaciones."
              : presionContributiva < 55
                ? "La divergencia sigue creciendo, aunque en un rango gestionable con ajustes graduales."
                : "La trayectoria amplifica la tension contributiva y exigiria correcciones adicionales.";

          return {
            kpis: [
              {
                value: `${h.formatNumber(pensionIndex, 1)}`,
                desc: "Indice de pension real proyectado",
              },
              {
                value: `${h.formatNumber(salarioIndex, 1)}`,
                desc: "Indice de salario real proyectado",
              },
              {
                value: `${h.formatNumber(brecha, 1)}`,
                desc: "Brecha de indices pension-salario",
              },
              {
                value: `${h.formatNumber(presionContributiva, 1)}`,
                desc: "Pensionistas por 100 cotizantes (proxy)",
                color,
              },
              {
                value: `+${h.formatNumber(ajusteCotizacion, 2)} p.p.`,
                desc: "Ajuste potencial de cotizacion requerido",
              },
            ],
            thermometer: {
              value: senal,
              color,
              ariaLabel: "Senal de presion contributiva proyectada",
            },
            narrative: narrativa,
            note: "La proyeccion utiliza crecimiento constante para facilitar comparacion; no incorpora ciclos economicos intermedios.",
          };
        },
      },
    ],
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/documentos_pdf/Informe%20Pensiones_h_Junio2025.pdf",
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/reformas-seguridad-social-espana",
      },
      "Nota metodologica: series reconstruidas visualmente a partir de las figuras del documento original.",
    ],
  };
})();
