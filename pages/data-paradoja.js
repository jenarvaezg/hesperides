(() => {
  const legacy = {
  meta: {
    title: "La paradoja inmobiliaria en España",
    subtitle:
      "Versión interactiva del informe del Centro Ruth Richardson (enero 2026)",
    pdfTitle: "Informe CRR sobre la Paradoja Inmobiliaria y su Impacto en el Mercado.pdf",
    caveat:
      "Cuando el informe no publica tabla numérica, las series se reconstruyen visualmente a partir de los gráficos del PDF."
  },
  sections: [
    {
      id: "s1",
      title: "1. La principal preocupación",
      summary:
        "La vivienda pasa a ser el principal problema percibido por los españoles, por delante de inmigración y empleo.",
      chartIds: ["g1"]
    },
    {
      id: "s2",
      title: "2. El precio de la vivienda se dispara",
      summary:
        "Desde 2020, compra y alquiler suben con más fuerza que el IPC, con heterogeneidad territorial.",
      chartIds: ["g2", "g3"]
    },
    {
      id: "s3",
      title: "3. Precio, rentabilidad y oferta",
      summary:
        "Suben precios, pero no la oferta: visados e inversión siguen bajos y la rentabilidad neta de construcción permanece débil.",
      chartIds: ["g4", "g5", "g6", "g7"]
    },
    {
      id: "s4",
      title: "4. Suelo, burocracia y bloqueo",
      summary:
        "La escasez de suelo edificable y los tiempos administrativos largos frenan la respuesta de oferta.",
      chartIds: ["g8", "g9", "g10"]
    },
    {
      id: "s5",
      title: "5. Regulación del producto vivienda",
      summary:
        "Los costes reales de construir suben con cambios regulatorios y exigencias energéticas, desplazando el producto a segmentos más caros.",
      chartIds: ["g11", "g12"]
    },
    {
      id: "s6",
      title: "6. Dinámicas internas del sector",
      summary:
        "Productividad estancada, atomización empresarial, escasez laboral y coste de materiales tensionan los márgenes.",
      chartIds: ["g13", "g14", "g15", "g16", "g17", "g18"]
    }
  ],
  tables: {
    t1: {
      title: "Tabla 1. Tipos de uso de suelo en España",
      columns: ["Clase", "Definición", "Categorías y estado"],
      rows: [
        [
          "Suelo urbano",
          "Terreno que forma parte de la ciudad y cuenta con servicios básicos.",
          "Consolidado (listo para edificar) y no consolidado (requiere urbanización)."
        ],
        [
          "Suelo urbanizable",
          "Suelo de transición cuyo desarrollo prevé el planeamiento.",
          "Sectorizado (con hoja de ruta) y no sectorizado (reserva a largo plazo)."
        ],
        [
          "Suelo no urbanizable",
          "Terreno protegido y preservado del desarrollo urbano.",
          "Común o de especial protección (paisajística, ambiental, agrícola, cultural)."
        ]
      ],
      source: "Tabla CRR, basada en clasificación urbanística española"
    },
    t2: {
      title: "Tabla 2. Proceso de desarrollo urbanístico y tiempos",
      columns: ["Proceso", "Duración orientativa"],
      rows: [
        ["1. Plan General de Ordenación Urbana (PGOU)", "5 a 8 años"],
        ["2. Plan parcial", "Redacción: 6 meses; aprobación: 1 a 2 años"],
        [
          "3. Proyecto de urbanización y reparcelación",
          "Redacción: 6 meses; aprobación: 3 a 9 meses"
        ],
        ["4. Ejecución de urbanización", "1 a 2 años"],
        ["5. Proyecto y licencia de edificación", "Redacción: 3 meses; aprobación: 6 a 12 meses"],
        ["6. Licencia de primera ocupación", "3 a 9 meses"]
      ],
      source:
        "Tabla CRR, estimaciones con expertos del sector (incluye referencia a BBVA Research)"
    }
  },
  charts: {
    g1: {
      id: "g1",
      title: "Gráfico 1. La vivienda es el principal problema de los españoles",
      subtitle: "Problemas de los españoles (CIS, octubre 2025)",
      renderAs: "table",
      tableColumns: ["#", "Problema", "Porcentaje"],
      unit: "%",
      exactness: "exacta del gráfico",
      source: "CIS",
      x: [
        "Vivienda",
        "Inmigración",
        "Calidad trabajo",
        "Desempleo",
        "Crisis económica",
        "Gobierno",
        "Problemas políticos",
        "Sanidad",
        "Políticos (personas)",
        "Juventud",
        "Corrupción"
      ],
      series: [
        {
          name: "Porcentaje",
          type: "bar",
          data: [37.1, 20.5, 18.3, 16.9, 15.7, 14.3, 13.7, 13.4, 13.2, 12.7, 12.6],
          color: "#f3c400"
        }
      ]
    },
    g2: {
      id: "g2",
      title: "Gráfico 2. Crisis habitacional en España",
      subtitle: "Cambio en el precio de la vivienda (dic-2020 a jun-2025) e IPC",
      orientation: "horizontal",
      unit: "%",
      exactness: "exacta del gráfico",
      source: "INE (IPV e IPC)",
      x: [
        "Andalucía",
        "Canarias",
        "Cantabria",
        "Navarra",
        "Murcia",
        "Baleares",
        "Aragón",
        "Valencia",
        "España",
        "La Rioja",
        "Asturias",
        "Madrid",
        "Galicia",
        "País Vasco",
        "Castilla y León",
        "Cataluña",
        "Extremadura",
        "Castilla-La Mancha",
        "IPC"
      ],
      series: [
        {
          name: "Variación",
          type: "bar",
          data: [49.7, 46.7, 46.6, 45.3, 44.6, 44.5, 44.3, 43.2, 42.2, 41.8, 41.6, 40.7, 40.0, 39.5, 38.5, 37.6, 31.3, 30.9, 21.2],
          color: "#f3c400"
        }
      ],
      highlights: ["España", "IPC"]
    },
    g3: {
      id: "g3",
      title: "Gráfico 3. El precio del alquiler se dispara",
      subtitle: "Índice de alquiler (agosto 2020 = 100)",
      renderAs: "small-multiples",
      smallMultiplesAxis: {
        yMin: 80,
        yMax: 140,
        yInterval: 20,
        xTickIndices: [0, 9],
        xLabelMap: {
          "2020-08": "ago\n2020",
          "2025-05": "may\n2025"
        }
      },
      unit: "índice",
      exactness: "reconstruida visualmente",
      source: "INE (medición de viviendas turísticas y capacidad)",
      x: ["2020-08", "2021-02", "2021-08", "2022-02", "2022-08", "2023-02", "2023-08", "2024-02", "2024-08", "2025-05"],
      series: [
        {
          name: "España",
          type: "line",
          data: [96, 93, 92, 94, 98, 101, 107, 112, 117, 130],
          color: "#f3c400"
        },
        {
          name: "Barcelona",
          type: "line",
          data: [96, 91, 90, 93, 98, 104, 110, 120, 128, 138],
          color: "#7f5b00"
        },
        {
          name: "Madrid",
          type: "line",
          data: [96, 91, 90, 89, 96, 97, 103, 111, 123, 133],
          color: "#2b2b2b"
        }
      ]
    },
    g4: {
      id: "g4",
      title: "Gráfico 4. Vivienda nueva iniciada por cada 1.000 personas",
      subtitle: "La señal de precio no se traduce en más inicios",
      unit: "viviendas / 1.000 hab.",
      exactness: "reconstruida visualmente",
      source: "MIVAU (visados), INE (censo), Eurostat (población)",
      x: [
        "1992",
        "1993",
        "1994",
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024"
      ],
      series: [
        {
          name: "Vivienda iniciada",
          type: "line",
          data: [5.2, 5.1, 6.3, 7.1, 6.8, 7.9, 10.2, 11.7, 12.8, 12.4, 12.1, 12.8, 14.7, 15.6, 16.0, 19.7, 14.0, 5.0, 2.4, 1.8, 1.4, 1.0, 0.4, 0.4, 0.6, 1.0, 1.3, 1.6, 1.8, 1.5, 1.8, 2.0, 2.7],
          color: "#7f5b00",
          areaStyle: true
        }
      ]
    },
    g5: {
      id: "g5",
      title: "Gráfico 5. Inversión en construcción y vivienda sobre PIB",
      subtitle: "Años 1995-2025",
      unit: "% del PIB",
      exactness: "reconstruida visualmente",
      source: "INE (Contabilidad Nacional Trimestral)",
      x: [
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025"
      ],
      series: [
        {
          name: "Construcción",
          type: "line",
          data: [14.5, 14.0, 13.8, 14.6, 15.8, 16.4, 17.0, 17.8, 18.5, 19.3, 20.2, 21.2, 20.4, 18.8, 16.0, 14.5, 13.0, 11.5, 10.0, 9.0, 9.2, 9.0, 9.3, 10.0, 11.2, 11.0, 10.8, 10.6, 10.9, 10.7, 10.9],
          color: "#f3c400",
          areaStyle: true
        },
        {
          name: "Vivienda",
          type: "line",
          data: [6.0, 6.5, 6.2, 6.8, 7.4, 8.0, 8.7, 9.1, 9.8, 10.5, 11.2, 12.4, 11.5, 8.8, 7.0, 5.8, 4.9, 4.3, 3.8, 3.9, 4.2, 4.5, 4.9, 5.3, 5.8, 6.0, 5.7, 5.4, 5.6, 5.5, 5.6],
          color: "#7f5b00",
          areaStyle: true
        }
      ]
    },
    g6: {
      id: "g6",
      title: "Gráfico 6. Rentabilidad neta: construcción vs economía",
      subtitle: "Rentabilidad del activo menos coste de financiación",
      unit: "%",
      exactness: "reconstruida visualmente",
      source: "Banco de España (Central de balances, agregados sectoriales)",
      x: [
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024"
      ],
      series: [
        {
          name: "Actividades económicas",
          type: "line",
          data: [-1.5, -0.8, 1.1, 3.0, 3.4, 2.4, 2.3, 3.0, 3.0, 3.4, 3.5, 3.5, 2.6, 1.2, 0.8, 1.1, 0.2, -0.2, 0.2, 0.7, 1.4, 2.1, 2.6, 2.9, 3.3, 1.7, 2.0, 2.6, 2.5, 2.7],
          color: "#f3c400"
        },
        {
          name: "Construcción",
          type: "line",
          data: [-3.0, -3.0, -1.0, 1.5, 3.2, 3.7, 4.3, 4.6, 4.4, 4.3, 4.1, 4.2, 1.2, -2.1, -2.1, -3.6, -5.2, -6.2, -5.8, -3.6, -3.2, -2.8, -2.3, -1.1, -0.3, -0.3, -0.3, 0.2, -0.2, -0.1],
          color: "#2b2b2b"
        }
      ],
      zeroLine: true
    },
    g7: {
      id: "g7",
      title: "Gráfico 7. Percentil de rentabilidad de construcción",
      subtitle: "Posición de construcción entre 78 actividades CNAE",
      unit: "percentil",
      exactness: "reconstruida visualmente",
      source: "Banco de España (Central de balances)",
      x: [
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024"
      ],
      series: [
        {
          name: "Percentil",
          type: "line",
          data: [31, 22, 22, 27, 41, 53, 69, 67, 70, 63, 63, 61, 41, 30, 31, 8, 5, 4, 3, 3, 3, 3, 3, 1, 3, 25, 14, 12, 8, 12.8],
          color: "#7f5b00",
          areaStyle: true
        }
      ]
    },
    g8: {
      id: "g8",
      title: "Gráfico 8. Escasez artificial de suelo edificable",
      subtitle: "Porcentaje del suelo según posibilidad de construir vivienda",
      unit: "%",
      exactness: "exacta del gráfico",
      source: "Sistema de Información Urbana (MIVAU)",
      x: [
        "No se puede construir",
        "Disponible a corto plazo",
        "Se puede construir a medio plazo",
        "Se puede construir a largo plazo"
      ],
      series: [
        {
          name: "Porcentaje del suelo",
          type: "bar",
          data: [95.7, 2.1, 1.3, 0.9],
          color: "#f3c400"
        }
      ]
    },
    g9: {
      id: "g9",
      title: "Gráfico 9. Urbanismo obsoleto",
      subtitle: "Distribución de planes generales por año de firma",
      unit: "%",
      exactness: "exacta del gráfico",
      source: "Sistema de Información Urbana (MIVAU)",
      x: ["Antes de 2010", "Antes de 2007", "Antes de 1998", "Antes de 1992", "Antes de 1977"],
      series: [
        {
          name: "Distribución",
          type: "bar",
          data: [30.9, 30.1, 15.8, 20.6, 2.5],
          color: "#f3c400"
        }
      ]
    },
    g10: {
      id: "g10",
      title: "Gráfico 10. Viviendas pendientes en planeamiento",
      subtitle: "Porcentaje de viviendas pendientes en planes generales",
      unit: "%",
      exactness: "exacta del gráfico",
      source: "Sistema de Información Urbana (MIVAU)",
      x: [
        "Castilla y León",
        "Cantabria",
        "Murcia",
        "Asturias",
        "Extremadura",
        "Castilla-La Mancha",
        "Galicia",
        "Cataluña",
        "Aragón",
        "Canarias",
        "Andalucía",
        "La Rioja",
        "Valencia",
        "Navarra",
        "País Vasco",
        "Baleares",
        "Madrid"
      ],
      series: [
        {
          name: "Pendientes",
          type: "bar",
          data: [87.4, 86.5, 83.2, 80.4, 79.6, 78.9, 78.4, 73.7, 71.9, 71.8, 70.3, 69.4, 64.7, 64.3, 58.8, 57.0, 56.9],
          color: "#f3c400"
        }
      ]
    },
    g11: {
      id: "g11",
      title: "Gráfico 11. Coste real de la construcción",
      subtitle: "Euros constantes de 2024 por m² (2000-2024)",
      unit: "€/m²",
      exactness: "reconstruida visualmente",
      source: "ITeC, Sociedad de Tasación, INE, Banco Mundial",
      x: [
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024"
      ],
      series: [
        {
          name: "Coste real",
          type: "line",
          data: [900, 905, 898, 892, 897, 878, 900, 940, 957, 1065, 1075, 1090, 1110, 1118, 1125, 1135, 1130, 1130, 1128, 1124, 1119, 1135, 1210, 1290, 1323],
          color: "#f3c400"
        }
      ],
      eventLines: [
        {
          x: "2006",
          label: "CTE 2006"
        },
        {
          x: "2020",
          label: "Revisión CTE 2020"
        }
      ]
    },
    g12: {
      id: "g12",
      title: "Gráfico 12. Coste y eficiencia energética",
      subtitle: "Índice (2018 T2 = 100): consumo y emisiones en obra nueva",
      renderAs: "small-multiples",
      smallMultiplesAxis: {
        yMin: 40,
        yMax: 105,
        yInterval: 10,
        xTickIndices: [0, 3, 6, 9, 12],
        xLabelMap: {
          "2018T2": "2018 T2",
          "2019T4": "2019 T4",
          "2021T2": "2021 T2",
          "2022T4": "2022 T4",
          "2024T2": "2024 T2"
        }
      },
      unit: "índice",
      exactness: "reconstruida visualmente",
      source: "Sociedad de Tasación (ST informe de tendencias)",
      x: [
        "2018T2",
        "2018T4",
        "2019T2",
        "2019T4",
        "2020T2",
        "2020T4",
        "2021T2",
        "2021T4",
        "2022T2",
        "2022T4",
        "2023T2",
        "2023T4",
        "2024T2"
      ],
      series: [
        {
          name: "Consumo energético",
          type: "line",
          data: [100, 84, 97, 79, 99, 80, 80, 76, 71, 72, 53, 49, 55],
          color: "#f3c400"
        },
        {
          name: "Emisiones CO2",
          type: "line",
          data: [98, 80, 80, 95, 78, 102, 83, 78, 70, 65, 67, 50, 52],
          color: "#2b2b2b"
        }
      ]
    },
    g13: {
      id: "g13",
      title: "Gráfico 13. Productividad estancada en construcción",
      subtitle: "Evolución del PIB por hora trabajada (euros constantes 2021)",
      unit: "€/hora",
      exactness: "reconstruida visualmente",
      source: "Contabilidad Nacional Anual de España",
      x: [
        "1994",
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024"
      ],
      series: [
        {
          name: "Economía española",
          type: "line",
          data: [32.28, 32.6, 32.7, 32.6, 32.5, 32.4, 32.5, 32.5, 32.5, 32.6, 32.7, 32.9, 33.3, 33.4, 34.0, 35.2, 35.6, 36.0, 36.5, 36.8, 37.2, 37.3, 37.5, 37.7, 37.9, 37.9, 37.9, 38.0, 37.9, 38.2, 38.44],
          color: "#7f5b00"
        },
        {
          name: "Sector construcción",
          type: "line",
          data: [29.28, 29.0, 27.0, 26.5, 25.8, 25.0, 24.8, 25.0, 25.1, 25.1, 25.2, 25.3, 25.6, 24.8, 28.0, 32.0, 31.0, 30.5, 32.0, 31.1, 31.4, 30.8, 31.2, 31.0, 29.8, 29.5, 29.3, 27.2, 27.5, 27.0, 26.24],
          color: "#f3c400"
        }
      ]
    },
    g14: {
      id: "g14",
      title: "Gráfico 14. Dominio de microempresas en construcción",
      subtitle: "Distribución de trabajadores por tamaño de empresa (oct-2025)",
      unit: "%",
      exactness: "exacta del gráfico",
      source: "Empresas inscritas en la Seguridad Social (MITES)",
      x: ["1 a 9", "10 a 49", "50 a 250", "Más de 250"],
      series: [
        {
          name: "Total economía",
          type: "bar",
          data: [84.3, 13.1, 2.1, 0.5],
          color: "#7f5b00"
        },
        {
          name: "Construcción",
          type: "bar",
          data: [84.4, 14.1, 1.4, 0.1],
          color: "#f3c400"
        }
      ]
    },
    g15: {
      id: "g15",
      title: "Gráfico 15. Peso del empleo en construcción",
      subtitle: "Evolución del peso de ocupados del sector sobre el total",
      unit: "% del empleo",
      exactness: "reconstruida visualmente",
      source: "EPA (INE)",
      x: [
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024"
      ],
      series: [
        {
          name: "Peso construcción",
          type: "line",
          data: [9.3, 9.8, 9.4, 10.1, 10.8, 11.2, 11.6, 11.9, 12.0, 12.4, 12.3, 12.8, 13.2, 12.8, 10.5, 9.4, 8.0, 6.6, 5.8, 5.56, 5.9, 6.1, 6.0, 6.3, 6.2, 6.5, 6.4, 6.7, 6.96],
          color: "#f3c400",
          areaStyle: true
        }
      ]
    },
    g16: {
      id: "g16",
      title: "Gráfico 16. Escasez de mano de obra y materiales",
      subtitle: "Indicadores de restricción empresarial (Eurostat)",
      unit: "saldo",
      exactness: "reconstruida visualmente",
      source: "Encuesta de consumidores y empresas (Eurostat)",
      x: [
        "2020Q1",
        "2020Q2",
        "2020Q3",
        "2020Q4",
        "2021Q1",
        "2021Q2",
        "2021Q3",
        "2021Q4",
        "2022Q1",
        "2022Q2",
        "2022Q3",
        "2022Q4",
        "2023Q1",
        "2023Q2",
        "2023Q3",
        "2023Q4",
        "2024Q1",
        "2024Q2",
        "2024Q3",
        "2024Q4",
        "2025Q1"
      ],
      series: [
        {
          name: "Escasez mano de obra",
          type: "line",
          data: [5.3, 2.0, 10.0, 4.0, 6.0, 5.0, 8.0, 7.0, 6.0, 12.0, 8.0, 9.0, 7.0, 11.0, 8.0, 13.0, 12.0, 6.0, 12.0, 7.0, 20.8],
          color: "#f3c400"
        },
        {
          name: "Escasez materiales",
          type: "line",
          data: [0.0, 0.0, 3.0, 1.0, 2.0, 0.0, 0.0, 0.0, 0.0, 3.0, 5.0, 4.0, 4.0, 6.0, 4.0, 5.0, 4.0, 4.0, 4.5, 0.0, 2.6],
          color: "#7f5b00"
        }
      ]
    },
    g17: {
      id: "g17",
      title: "Gráfico 17. Componentes del coste laboral real",
      subtitle: "Índice real (2008 = 100)",
      unit: "índice",
      exactness: "reconstruida visualmente",
      source: "INE (Encuesta anual del coste laboral)",
      x: [
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024"
      ],
      series: [
        {
          name: "Cotizaciones obligatorias",
          type: "line",
          data: [100.0, 103.0, 105.5, 107.0, 108.3, 109.5, 113.0, 113.0, 112.0, 111.2, 111.7, 112.4, 109.8, 112.5, 110.0, 110.3, 111.5],
          color: "#7f5b00"
        },
        {
          name: "Sueldos y salarios",
          type: "line",
          data: [100.0, 105.0, 107.0, 109.8, 111.0, 111.1, 111.8, 111.0, 109.0, 106.6, 106.7, 107.0, 105.0, 105.0, 105.5, 103.0, 100.8],
          color: "#f3c400"
        }
      ]
    },
    g18: {
      id: "g18",
      title: "Gráfico 18. Precio de materiales de construcción",
      subtitle: "Índice enero 2021 = 100",
      unit: "índice",
      exactness: "reconstruida visualmente",
      source: "INE",
      x: [
        "2021Q1",
        "2021Q2",
        "2021Q3",
        "2021Q4",
        "2022Q1",
        "2022Q2",
        "2022Q3",
        "2022Q4",
        "2023Q1",
        "2023Q2",
        "2023Q3",
        "2023Q4",
        "2024Q1",
        "2024Q2",
        "2024Q3",
        "2024Q4"
      ],
      series: [
        {
          name: "Materiales bituminosos",
          type: "line",
          data: [100, 110, 115, 125, 140, 135, 180, 172, 145, 150, 140, 155, 172, 140, 145, 146.6],
          color: "#7f5b00"
        },
        {
          name: "Cemento",
          type: "line",
          data: [100, 102, 104, 106, 110, 112, 120, 123, 124, 125, 140, 142, 141, 142, 143, 143.2],
          color: "#2b2b2b"
        },
        {
          name: "Aluminio",
          type: "line",
          data: [100, 108, 120, 136, 142, 156, 172, 162, 150, 145, 141, 138, 132, 130, 138, 140.9],
          color: "#f3c400"
        },
        {
          name: "Madera",
          type: "line",
          data: [100, 105, 108, 110, 112, 118, 121, 123, 124, 124, 125, 125, 126, 125, 125, 124.7],
          color: "#907b3b"
        }
      ]
    }
  }
};

  const reportUrl = "https://hesperides.edu.es/pages/informe-crr-sobre-la-paradoja-inmobiliaria-y-su-impacto-en-el-mercado.html";
  const pdfUrl = "https://hesperides.edu.es/pages/informe-crr-sobre-la-paradoja-inmobiliaria-y-su-impacto-en-el-mercado.html";

  const topHousing = legacy.charts?.g2?.series?.[0]?.data?.[8] ?? 0;
  const ipc = legacy.charts?.g2?.series?.[0]?.data?.[18] ?? 0;
  const netProfit = legacy.charts?.g6?.series?.[1]?.data?.at(-1) ?? 0;
  const blockedSeries = legacy.charts?.g10?.series?.[0]?.data || [];
  const blockedAverage = blockedSeries.length
    ? blockedSeries.reduce((acc, value) => acc + value, 0) / blockedSeries.length
    : 0;

  const chartsBySectionId = Object.fromEntries(
    (legacy.sections || []).map((section) => [section.id, Array.isArray(section.chartIds) ? [...section.chartIds] : []])
  );

  const chapters = [
    { id: "resumen-ejecutivo", title: "Resumen ejecutivo", charts: [] },
    { id: "introduccion", title: "1. Introducción", charts: [] },
    { id: "s1", title: "1. La principal preocupación", charts: chartsBySectionId.s1 || [] },
    { id: "s2", title: "2. El precio de la vivienda se dispara", charts: chartsBySectionId.s2 || [] },
    { id: "s3", title: "3. Precio, rentabilidad y oferta de vivienda", charts: chartsBySectionId.s3 || [] },
    {
      id: "s4",
      title: "4. La escasez artificial del suelo y edificabilidad disponible",
      charts: chartsBySectionId.s4 || []
    },
    { id: "s5", title: "5. Regulación del producto vivienda", charts: chartsBySectionId.s5 || [] },
    { id: "s6", title: "6. Dinámicas internas del sector", charts: chartsBySectionId.s6 || [] },
    { id: "conclusiones", title: "7. Conclusiones", charts: [] }
  ];

  const charts = {};
  Object.entries(legacy.charts || {}).forEach(([id, chart]) => {
    charts[id] = {
      ...chart,
      sourceUrl: chart.sourceUrl || reportUrl
    };
  });

  Object.entries(legacy.tables || {}).forEach(([id, table]) => {
    charts[id] = {
      id,
      title: table.title,
      subtitle: table.source,
      renderAs: "table",
      tableColumns: table.columns,
      tableRows: table.rows,
      exactness: "exacta del informe",
      source: table.source,
      sourceUrl: reportUrl
    };
  });

  const sueloChapter = chapters.find((chapter) => chapter.id === "s4");
  if (sueloChapter) {
    sueloChapter.charts.push("t1", "t2");
  }

  window.REPORT_DATA = {
    meta: {
      title: "La paradoja inmobiliaria, en formato interactivo",
      lead:
        "Una lectura vertical del informe, con todos los graficos navegables y dos playgrounds para experimentar con rentabilidad, suelo desbloqueado y plazos regulatorios.",
      reportUrl,
      pdfUrl,
      caveat:
        legacy.meta?.caveat ||
        "Cuando el informe no publica tabla numerica, las series se reconstruyen visualmente a partir de los graficos del PDF."
    },
    metrics: [
      {
        kpi: `+${new Intl.NumberFormat("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(topHousing)}%`,
        label: "Precio vivienda Espana (2020-2025)"
      },
      {
        kpi: `+${new Intl.NumberFormat("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(ipc)}%`,
        label: "IPC acumulado (2020-2025)"
      },
      {
        kpi: `${new Intl.NumberFormat("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(netProfit)}%`,
        label: "Rentabilidad neta construccion (ultimo dato)"
      },
      {
        kpi: `${new Intl.NumberFormat("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(blockedAverage)}%`,
        label: "Vivienda pendiente media en planeamiento (CCAA)"
      }
    ],
    chapters,
    charts,
    text: {
      sourcePath: "informe.txt",
      ranges: [
        {
          chapterId: "resumen-ejecutivo",
          start: "Resumen ejecutivo",
          end: "1. Introducción"
        },
        {
          chapterId: "introduccion",
          start: "1. Introducción",
          end: "1. La principal preocupación"
        },
        {
          chapterId: "s1",
          start: "1. La principal preocupación",
          end: "2. El precio de la vivienda se dispara"
        },
        {
          chapterId: "s2",
          start: "2. El precio de la vivienda se dispara",
          end: "3. Precio, rentabilidad y oferta de vivienda"
        },
        {
          chapterId: "s3",
          start: "3. Precio, rentabilidad y oferta de vivienda",
          end: "4. La escasez artificial del suelo y edificabilidad disponible"
        },
        {
          chapterId: "s4",
          start: "4. La escasez artificial del suelo y edificabilidad disponible",
          end: "5. Regulación del producto"
        },
        {
          chapterId: "s5",
          start: "5. Regulación del producto vivienda",
          end: "6. Dinámicas internas"
        },
        {
          chapterId: "s6",
          start: "6. Dinámicas internas",
          end: "7. Conclusiones"
        },
        {
          chapterId: "conclusiones",
          start: "7. Conclusiones"
        }
      ]
    },
    playgroundTitle: "Playgrounds",
    playgroundIntro:
      "Explora el mecanismo de la paradoja: como cambian los incentivos cuando varian precios, costes, tipos de interes y bloqueo administrativo.",
    playgrounds: [
      {
        id: "rentabilidad-promotor",
        title: "Simulador de rentabilidad del promotor",
        description:
          "Modelo simplificado para estimar margen neto por m² considerando coste de construccion, financiacion y tiempo de tramitacion.",
        methodology:
          "Margen neto (%) = [(Precio venta - Coste produccion - Coste financiero) / Coste produccion] × 100. Coste produccion = construccion + suelo (22% del precio base) + costes blandos (20% de construccion). Coste financiero = coste produccion × tipo × (anos/2).",
        methodologyShort:
          "margen neto (%) = [(precio de venta - coste de produccion - coste financiero) / coste de produccion] × 100.",
        controls: [
          {
            id: "price_growth",
            label: "Crecimiento precio vivienda desde 2020",
            type: "range",
            min: 20,
            max: 60,
            step: 0.1,
            value: 42.2,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "inflation",
            label: "Inflacion acumulada (IPC)",
            type: "range",
            min: 10,
            max: 30,
            step: 0.1,
            value: 21.2,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "build_cost",
            label: "Coste de construccion actual (EUR/m²)",
            type: "range",
            min: 900,
            max: 1700,
            step: 1,
            value: 1323,
            display: (value, h) => `${h.formatInt(value)} EUR/m²`
          },
          {
            id: "finance_rate",
            label: "Coste de financiacion anual",
            type: "range",
            min: 1,
            max: 10,
            step: 0.1,
            value: 4.5,
            display: (value, h) => `${h.formatNumber(value)}% anual`
          },
          {
            id: "delay_years",
            label: "Tiempo total de gestion previa (anos)",
            type: "range",
            min: 2,
            max: 15,
            step: 0.5,
            value: 10,
            display: (value, h) => `${h.formatNumber(value)} anos`
          },
          {
            id: "base_price",
            label: "Precio base inicial (EUR/m²)",
            type: "number",
            min: 1000,
            max: 5000,
            step: 50,
            value: 2500,
            showOutput: false
          }
        ],
        compute: (state, h) => {
          const growth = state.price_growth;
          const inflation = state.inflation;
          const buildCost = state.build_cost;
          const financeRate = state.finance_rate;
          const delayYears = state.delay_years;
          const basePrice = state.base_price || 2500;

          const landCost = basePrice * 0.22;
          const softCost = buildCost * 0.2;
          const productionCost = buildCost + landCost + softCost;
          const salePrice = basePrice * (1 + growth / 100);
          const financeCost = productionCost * (financeRate / 100) * (delayYears / 2);
          const netProfitPerM2 = salePrice - productionCost - financeCost;
          const netMargin = (netProfitPerM2 / productionCost) * 100;
          const realPriceGap = growth - inflation;
          const expectedStarts = h.clamp(2.7 + netMargin * 0.55, 0.4, 20);

          const signal = h.clamp(((netMargin + 10) / 25) * 100, 0, 100);
          const signalColor =
            netMargin >= 4 ? "var(--status-good)" : netMargin >= 0 ? "var(--status-warn)" : "var(--status-bad)";
          const diagnosis =
            netMargin >= 4
              ? "Incentivo positivo para iniciar obra nueva."
              : netMargin >= 0
                ? "Incentivo debil: riesgo alto ante retrasos o sobrecostes."
                : "Sin incentivo economico neto para ampliar oferta.";

          return {
            kpis: [
              { value: `${h.formatNumber(netMargin)}%`, desc: "Margen neto estimado" },
              { value: `${h.formatInt(Math.round(netProfitPerM2))} EUR/m²`, desc: "Resultado neto por m²" },
              { value: `${h.formatNumber(realPriceGap)} p.p.`, desc: "Precio vivienda menos IPC" },
              { value: `${h.formatNumber(expectedStarts)} / 1.000`, desc: "Inicios teoricos de vivienda" }
            ],
            thermometer: {
              value: signal,
              color: signalColor,
              ariaLabel: "Senal de incentivo de oferta"
            },
            narrative: diagnosis
          };
        }
      },
      {
        id: "desbloqueo-oferta",
        title: "Simulador de desbloqueo de oferta",
        description:
          "Que pasa si baja el porcentaje de vivienda bloqueada en planeamiento? Usa como base 9,5 millones de viviendas potenciales del informe.",
        methodology:
          "Viviendas ejecutables = 9,5 M × (1 - bloqueo). Viviendas adicionales = ejecutables objetivo - ejecutables actuales. Impacto anual = adicionales / anos de maduracion. Impacto relativo (%) = impacto anual / inicios base (2,7 por 1.000 hab.).",
        methodologyShort:
          "viviendas ejecutables = 9,5 M × (1 - bloqueo); impacto anual = viviendas adicionales / anos de maduracion.",
        controls: [
          {
            id: "blocked_now",
            label: "Vivienda bloqueada hoy",
            type: "range",
            min: 50,
            max: 85,
            step: 0.1,
            value: 72.9,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "blocked_target",
            label: "Bloqueo objetivo tras reformas",
            type: "range",
            min: 30,
            max: 80,
            step: 0.1,
            value: 60,
            display: (value, h) => `${h.formatNumber(value)}%`
          },
          {
            id: "maturity_years",
            label: "Anos de maduracion hasta impacto real",
            type: "range",
            min: 4,
            max: 15,
            step: 0.5,
            value: 10,
            display: (value, h) => `${h.formatNumber(value)} anos`
          },
          {
            id: "population_millions",
            label: "Poblacion de referencia (millones)",
            type: "range",
            min: 40,
            max: 55,
            step: 0.1,
            value: 48.5,
            display: (value, h) => `${h.formatNumber(value)} millones`
          }
        ],
        compute: (state, h) => {
          const totalPotential = 9_500_000;
          const executableNow = totalPotential * (1 - state.blocked_now / 100);
          const executableTarget = totalPotential * (1 - state.blocked_target / 100);
          const deltaUnits = executableTarget - executableNow;
          const annualImpact = deltaUnits / state.maturity_years;

          const baselineStartsPer1000 = 2.7;
          const baselineAnnualStarts = (state.population_millions * 1_000_000 * baselineStartsPer1000) / 1000;
          const impactVsBaseline = (annualImpact / baselineAnnualStarts) * 100;

          const color = deltaUnits >= 0 ? "var(--status-good)" : "var(--status-bad)";
          const narrative =
            deltaUnits >= 0
              ? "Reduccion del bloqueo: aumenta la bolsa potencial de suelo ejecutable."
              : "Mayor bloqueo: se contrae la oferta potencial y se retrasa el ajuste de precios.";

          return {
            kpis: [
              {
                value: h.formatInt(Math.round(deltaUnits)),
                desc: "Viviendas potenciales adicionales",
                color
              },
              { value: `${h.formatInt(Math.round(annualImpact))}/ano`, desc: "Ritmo anual durante maduracion" },
              { value: h.formatInt(Math.round(executableNow)), desc: "Viviendas ejecutables hoy" },
              { value: `${h.formatNumber(impactVsBaseline)}%`, desc: "Impacto anual vs inicios actuales" }
            ],
            thermometer: {
              value: Math.min(100, Math.abs(impactVsBaseline)),
              color,
              ariaLabel: "Magnitud de desbloqueo"
            },
            narrative
          };
        }
      }
    ],
    sources: [
      {
        name: "Pagina del informe",
        url: reportUrl
      },
      "Este sitio reproduce de forma interactiva el contenido del informe original. Donde no hay tabla publica de datos en el documento, las series se digitalizan visualmente para permitir exploracion interactiva."
    ]
  };
})();
