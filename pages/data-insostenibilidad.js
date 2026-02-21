(() => {
  const makeIds = (prefix, from, to) => {
    const ids = [];
    for (let i = from; i <= to; i += 1) {
      ids.push(`${prefix}${String(i).padStart(2, "0")}`);
    }
    return ids;
  };

  const figures = [
    { label: "Grafico 1", page: 4, file: "grafico-01-p04.png" },
    { label: "Grafico 2", page: 5, file: "grafico-02-p05.png" },
    { label: "Tabla 1", page: 6, file: "tabla-01-p06.png" },
    { label: "Grafico 3", page: 8, file: "grafico-03-p08.png" },
    { label: "Grafico 4", page: 10, file: "grafico-04-p10.png" },
    { label: "Grafico 5", page: 12, file: "grafico-05-p12.png" },
    { label: "Grafico 6", page: 14, file: "grafico-06-p14.png" },
    { label: "Grafico 7", page: 15, file: "grafico-07-p15.png" },
    { label: "Grafico 8", page: 17, file: "grafico-08-p17.png" },
    { label: "Grafico 9", page: 18, file: "grafico-09-p18.png" },
    { label: "Grafico 10", page: 19, file: "grafico-10-p19.png" },
    { label: "Grafico 11", page: 20, file: "grafico-11-p20.png" },
    { label: "Grafico 12", page: 22, file: "grafico-12-p22.png" },
    { label: "Grafico 13", page: 23, file: "grafico-13-p23.png" },
    { label: "Grafico 14", page: 24, file: "grafico-14-p24.png" },
    { label: "Grafico 15", page: 26, file: "grafico-15-p26.png" }
  ];

  const charts = Object.fromEntries(
    figures.map((fig, index) => {
      const id = `f${String(index + 1).padStart(2, "0")}`;
      return [
        id,
        {
          title: fig.label,
          subtitle: `Figura original del informe (pagina ${fig.page})`,
          source: "La (in)sostenibilidad de la Seguridad Social (2025)",
          sourceUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
          exactness: "exacta del informe",
          renderAs: "figure-image",
          imageUrl: `../assets/figures/insostenibilidad/${fig.file}`
        }
      ];
    })
  );

  window.REPORT_DATA = {
    meta: {
      title: "La (in)sostenibilidad de la Seguridad Social",
      lead: "Version interactiva del informe original, con todas sus figuras en formato visual exacto.",
      reportUrl: "https://hesperides.edu.es/informes/insostenibilidad_seguridad_social",
      pdfUrl: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf",
      caveat:
        "Las figuras se presentan como equivalentes directos del documento para respetar completamente su formato."
    },
    metrics: [
      { kpi: "15", label: "Graficos del informe" },
      { kpi: "1", label: "Tabla del informe" },
      { kpi: "31", label: "Paginas del PDF" },
      { kpi: "100%", label: "Fidelidad visual de figuras" }
    ],
    chapters: [
      {
        id: "bloque-1",
        title: "1. Cuentas publicas y contexto fiscal",
        summary: [
          "El primer bloque integra las figuras introductorias sobre deficit agregado, estructura funcional del gasto y marco institucional.",
          "Se mantiene el diseno original de cada visual del PDF."
        ],
        charts: makeIds("f", 1, 6)
      },
      {
        id: "bloque-2",
        title: "2. Brecha contributiva",
        summary: [
          "Bloque con evidencia sobre ingresos contributivos, transferencias y desequilibrios territoriales.",
          "Las figuras aparecen en el mismo orden y formato que en el informe base."
        ],
        charts: makeIds("f", 7, 11)
      },
      {
        id: "bloque-3",
        title: "3. Fondo de reserva y riesgos",
        summary: [
          "Bloque final centrado en la hucha de pensiones, rentabilidad y cobertura del deficit.",
          "Se replica la secuencia visual del documento original."
        ],
        charts: makeIds("f", 12, 16)
      }
    ],
    charts,
    sources: [
      {
        name: "PDF original",
        url: "https://hesperides.edu.es/documentos_pdf/La_(in)sostenibilidad_de_la_Seguridad_Social.pdf"
      },
      {
        name: "Pagina del informe",
        url: "https://hesperides.edu.es/informes/insostenibilidad_seguridad_social"
      }
    ]
  };
})();
