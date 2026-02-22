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
      {
        id: "bloque-1",
        title: "1. Cuentas publicas y contexto",
        summary: [
          "El informe arranca con la fotografia de ingresos y gastos publicos, y su evolucion desde la crisis financiera.",
          "Se introduce tambien el reparto funcional del gasto para ubicar el peso de proteccion social y pensiones."
        ],
        charts: ["i01", "i02", "i03", "i04", "i05"]
      },
      {
        id: "bloque-2",
        title: "2. Brecha financiera de la Seguridad Social",
        summary: [
          "Se representa la estructura de financiacion del sistema y la persistencia de saldos negativos durante mas de una decada.",
          "Las curvas muestran la dependencia creciente respecto de transferencias estatales."
        ],
        charts: ["i06", "i07", "i08", "i09"]
      },
      {
        id: "bloque-3",
        title: "3. Desigualdad territorial del saldo contributivo",
        summary: [
          "El desequilibrio no se distribuye de forma homogenea entre territorios.",
          "Solo unos pocos territorios mantienen superavit contributivo y el resto presenta saldos deficitarios relevantes."
        ],
        charts: ["i10"]
      },
      {
        id: "bloque-4",
        title: "4. Fondo de reserva y cierre patrimonial",
        summary: [
          "El tramo final analiza la hucha de pensiones, su rentabilidad relativa y su insuficiencia frente al gasto corriente.",
          "El mensaje central es que el problema exige reformas estructurales y no ajustes contables puntuales."
        ],
        charts: ["i11", "i12", "i13", "i14", "i15", "i16"]
      }
    ],
    charts: {
      i01: {
        title: "Grafico 1. Ingresos, gastos y deficit publico (2024)",
        subtitle: "Administraciones publicas de Espana (millones de euros)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "M€",
        x: ["Ingresos", "Gastos", "Deficit"],
        series: [
          {
            name: "Millones de euros",
            data: [672659, 722846, 50187],
            color: "#f3c400"
          }
        ]
      },
      i02: {
        title: "Grafico 2. Deficit publico de Espana (% del PIB)",
        subtitle: "Serie estimada de saldo presupuestario del conjunto de administraciones",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "%",
        x: ["2000", "2004", "2008", "2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
        series: [
          {
            name: "Deficit / superavit",
            type: "line",
            data: [0.8, 0.2, -4.4, -9.9, -10.5, -6.0, -4.3, -2.5, -10.1, -4.8, -3.2],
            color: "#7f5b00",
            areaStyle: 0.12
          }
        ],
        min: -12,
        max: 2
      },
      i03: {
        title: "Tabla 1. Estructura funcional del gasto publico",
        subtitle: "Distribucion aproximada del gasto por funciones (2023)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        renderAs: "table",
        tableColumns: ["Funcion", "Peso estimado", "Comentario"],
        tableRows: [
          ["Proteccion social", "42%", "Incluye pensiones y transferencias sociales"],
          ["Sanidad", "15%", "Segundo bloque de gasto funcional"],
          ["Educacion", "12%", "Tercer componente de mayor volumen"],
          ["Resto de funciones", "31%", "Defensa, servicios generales y otras politicas"]
        ]
      },
      i04: {
        title: "Grafico 3. Ingresos y gastos por nivel administrativo",
        subtitle: "Centralizacion de ingresos y descentralizacion del gasto (%)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "%",
        x: ["Adm. Central", "Seguridad Social", "CCAA", "Corporaciones locales"],
        series: [
          {
            name: "Peso en ingresos",
            data: [43.0, 29.8, 18.4, 8.8],
            color: "#f3c400"
          },
          {
            name: "Peso en gasto",
            data: [22.6, 33.7, 32.6, 11.2],
            color: "#2b2b2b"
          }
        ],
        min: 0,
        max: 50
      },
      i05: {
        title: "Grafico 4. Recursos netos disponibles por administracion",
        subtitle: "Estimacion relativa de capacidad de gasto libre (%)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "%",
        orientation: "horizontal",
        x: ["Adm. Central", "Seguridad Social", "CCAA", "Corporaciones locales"],
        series: [
          {
            name: "Recursos netos",
            data: [24, 35, 32, 9],
            color: "#7f5b00"
          }
        ],
        min: 0,
        max: 40
      },
      i06: {
        title: "Grafico 5. Composicion financiera de la Seguridad Social (2024)",
        subtitle: "Ingresos corrientes frente a gasto total del sistema (M€)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "M€",
        x: ["Cotizaciones", "Transferencias del Estado", "Otros ingresos", "Gasto total"],
        series: [
          {
            name: "Millones de euros",
            data: [174250, 54005, 17600, 242253],
            color: "#f3c400"
          }
        ]
      },
      i07: {
        title: "Grafico 6. Saldos basico y presupuestario (% PIB)",
        subtitle: "Evolucion 2010-2024 del desequilibrio financiero de la Seguridad Social",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "%",
        x: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
        series: [
          {
            name: "Saldo basico",
            type: "line",
            data: [0.1, -0.2, -0.5, -0.7, -0.9, -1.1, -1.2, -1.1, -1.0, -1.1, -1.3, -1.2, -1.0, -0.9, -0.8],
            color: "#2b2b2b"
          },
          {
            name: "Saldo presupuestario",
            type: "line",
            data: [-0.8, -1.2, -1.8, -2.3, -2.8, -3.2, -3.5, -3.7, -3.9, -4.0, -4.5, -4.4, -4.3, -4.2, -4.2],
            color: "#f3c400"
          }
        ],
        min: -5,
        max: 1
      },
      i08: {
        title: "Grafico 7. Saldo basico en millones de euros",
        subtitle: "Agujero acumulado de la Seguridad Social (serie estimada)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "M€",
        x: ["2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
        series: [
          {
            name: "Saldo basico",
            type: "line",
            data: [-8000, -14000, -23000, -31000, -39000, -52000, -61000, -66206],
            color: "#7f5b00",
            areaStyle: 0.14
          }
        ],
        min: -70000,
        max: 0
      },
      i09: {
        title: "Grafico 8. Deficit contributivo en terminos relativos",
        subtitle: "Magnitud del desequilibrio frente al PIB y al gasto contributivo (2024)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "%",
        x: ["Deficit / PIB", "Deficit / gasto contributivo"],
        series: [
          {
            name: "Porcentaje",
            data: [3.8, 26.6],
            color: "#f3c400"
          }
        ],
        min: 0,
        max: 30
      },
      i10: {
        title: "Grafico 9. Saldo contributivo por comunidad autonoma (2023)",
        subtitle: "Solo cuatro territorios muestran superavit en el esquema contributivo (M€)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        orientation: "horizontal",
        unit: "M€",
        x: [
          "Andalucia",
          "Pais Vasco",
          "Galicia",
          "Cataluna",
          "Castilla y Leon",
          "C. Valenciana",
          "Aragon",
          "Murcia",
          "Canarias",
          "Asturias",
          "Madrid",
          "Baleares",
          "Ceuta",
          "Melilla"
        ],
        series: [
          {
            name: "Saldo contributivo",
            data: [-5480, -4480, -4420, -4100, -3900, -2600, -1800, -1450, -1200, -980, 1350, 884, 120, 95],
            color: "#2b2b2b"
          }
        ],
        min: -6000,
        max: 1600
      },
      i11: {
        title: "Grafico 10. Evolucion del Fondo de Reserva",
        subtitle: "Stock de la hucha de pensiones (M€) 2000-2024",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "M€",
        x: ["2000", "2003", "2006", "2009", "2011", "2013", "2015", "2017", "2019", "2021", "2023", "2024"],
        series: [
          {
            name: "Fondo de reserva",
            type: "line",
            data: [600, 12000, 35000, 58000, 66815, 54000, 32000, 8000, 2150, 5200, 8600, 9300],
            color: "#f3c400",
            areaStyle: 0.18
          }
        ],
        min: 0,
        max: 70000
      },
      i12: {
        title: "Grafico 11. Retiros del Fondo de Reserva",
        subtitle: "Extracciones anuales para cubrir tensiones de caja (M€)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "M€",
        x: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
        series: [
          {
            name: "Retiros",
            data: [7000, 11000, 15000, 12500, 19000, 9000, 3000, 0, 0, 0, 0, 0, 0],
            color: "#7f5b00"
          }
        ],
        min: 0,
        max: 20000
      },
      i13: {
        title: "Grafico 12. Rentabilidad comparada de fondos soberanos/publicos",
        subtitle: "Comparacion anual media estimada (%)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "%",
        x: ["Noruega", "Canada", "Suecia", "Dinamarca", "Espana"],
        series: [
          {
            name: "Rentabilidad media",
            data: [6.8, 6.1, 5.4, 4.9, 1.2],
            color: "#f3c400"
          }
        ],
        min: 0,
        max: 8
      },
      i14: {
        title: "Grafico 13. Tamano del fondo frente al gasto mensual",
        subtitle: "Fondo de reserva actual frente a una mensualidad de pensiones (M€)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "M€",
        x: ["Fondo de reserva", "Gasto mensual pensiones"],
        series: [
          {
            name: "Millones de euros",
            data: [9300, 13000],
            color: "#2b2b2b"
          }
        ],
        min: 0,
        max: 15000
      },
      i15: {
        title: "Grafico 14. Cobertura temporal del fondo",
        subtitle: "Dias de deficit anual que podria cubrir el fondo actual",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        unit: "dias",
        x: ["Cobertura estimada"],
        series: [
          {
            name: "Dias",
            data: [52],
            color: "#7f5b00"
          }
        ],
        min: 0,
        max: 70
      },
      i16: {
        title: "Grafico 15. Patrimonio neto de la Seguridad Social",
        subtitle: "Evolucion estimada del patrimonio neto (M€)",
        source: "La (in)sostenibilidad de la Seguridad Social (2025)",
        sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
        exactness: "reconstruida visualmente",
        type: "line",
        unit: "M€",
        x: ["2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
        series: [
          {
            name: "Patrimonio neto",
            type: "line",
            data: [-12000, -25000, -41000, -56000, -72000, -86000, -96000, -102000],
            color: "#2b2b2b",
            areaStyle: 0.14
          }
        ],
        min: -110000,
        max: 0
      }
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
          const color = saldo >= 0 ? "#1f8f45" : saldo > -25000 ? "#d19800" : "#b23b1d";

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
          const color = mesesCobertura >= 12 ? "#1f8f45" : mesesCobertura >= 6 ? "#d19800" : "#b23b1d";

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
