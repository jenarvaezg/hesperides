(() => {
  const report = window.REPORT_DATA;
  const chartInstances = [];
  const REPORT_URL =
    "https://hesperides.edu.es/pages/informe-crr-sobre-la-paradoja-inmobiliaria-y-su-impacto-en-el-mercado.html";

  function getCatalogHomeHref() {
    const path = window.location.pathname || "/";
    const marker = "/hesperides/";
    const markerIndex = path.indexOf(marker);

    if (markerIndex >= 0) {
      return `${path.slice(0, markerIndex + marker.length)}index.html`;
    }

    return "/index.html";
  }

  const formatNumber = (value, decimals = 1) =>
    new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);

  const formatInt = (value) =>
    new Intl.NumberFormat("es-ES", {
      maximumFractionDigits: 0
    }).format(value);

  function slugify(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 96);
  }

  function wrapLines(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let current = "";

    words.forEach((word) => {
      const testLine = current ? `${current} ${word}` : word;
      if (ctx.measureText(testLine).width <= maxWidth) {
        current = testLine;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    });

    if (current) lines.push(current);
    return lines;
  }

  function wrapCategoryLabel(label, maxLineLength = 14) {
    const words = String(label).split(" ");
    const lines = [];
    let line = "";

    words.forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (candidate.length <= maxLineLength) {
        line = candidate;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    });

    if (line) lines.push(line);
    return lines.join("\n");
  }

  function formatChartValue(value, chart, compact = false) {
    if (value === undefined || value === null || Number.isNaN(value)) return "-";
    if (chart.unit === "%") return `${compact ? formatNumber(value, 0) : formatNumber(value)}%`;
    if (chart.unit === "€/m²") return `${formatInt(value)}€`;
    if (chart.unit === "percentil") return formatNumber(value, 1);
    return chart.unit ? `${formatNumber(value)} ${chart.unit}` : formatNumber(value);
  }

  function getAxisUnitProfile(chart) {
    const unit = String(chart.unit || "").toLowerCase();

    if (unit === "%" || unit.includes("% del pib") || unit.includes("% del empleo")) {
      return { suffix: "%", decimals: 0, integerOnly: true };
    }

    if (unit === "€/m²") {
      return { suffix: "€", decimals: 0, integerOnly: true };
    }

    if (unit === "índice" || unit === "saldo" || unit === "percentil") {
      return { suffix: "", decimals: 0, integerOnly: true };
    }

    if (unit === "viviendas / 1.000 hab." || unit === "€/hora") {
      return { suffix: "", decimals: 0, integerOnly: true };
    }

    return { suffix: "", decimals: 0, integerOnly: false };
  }

  function formatAxisTick(value, chart) {
    if (value === undefined || value === null || Number.isNaN(value)) return "-";
    const normalized = Math.abs(value) < 1e-9 ? 0 : value;
    const profile = getAxisUnitProfile(chart);
    const text = profile.integerOnly
      ? formatNumber(normalized, 0)
      : formatNumber(normalized, profile.decimals);
    return `${text}${profile.suffix}`;
  }

  function downloadChartWithMeta(instance, chart) {
    const chartDataUrl = instance.getDataURL({
      pixelRatio: 2,
      backgroundColor: "#fffdf8",
      excludeComponents: ["toolbox"]
    });

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const padding = 42;
      const textWidth = image.width - padding * 2;

      const titleFont = '700 44px "Fraunces", serif';
      const subtitleFont = '400 28px "IBM Plex Sans", sans-serif';
      const sourceFont = '400 22px "IBM Plex Sans", sans-serif';

      ctx.font = titleFont;
      const titleLines = wrapLines(ctx, chart.title, textWidth);
      ctx.font = subtitleFont;
      const subtitleLines = wrapLines(ctx, chart.subtitle, textWidth);
      ctx.font = sourceFont;
      const sourceLines = wrapLines(ctx, `Fuente: ${chart.source} · Informe: ${REPORT_URL}`, textWidth);

      const titleLineHeight = 52;
      const subtitleLineHeight = 36;
      const sourceLineHeight = 28;
      const topContentHeight =
        padding +
        titleLines.length * titleLineHeight +
        8 +
        subtitleLines.length * subtitleLineHeight +
        26;
      const bottomContentHeight = 18 + sourceLines.length * sourceLineHeight + 24;

      canvas.width = image.width;
      canvas.height = image.height + topContentHeight + bottomContentHeight;

      ctx.fillStyle = "#fffdf8";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#f3c400";
      ctx.fillRect(0, 0, canvas.width, 12);
      ctx.textBaseline = "top";

      let y = padding + 8;
      ctx.fillStyle = "#171717";
      ctx.font = titleFont;
      titleLines.forEach((line) => {
        ctx.fillText(line, padding, y);
        y += titleLineHeight;
      });

      y += 2;
      ctx.fillStyle = "#404040";
      ctx.font = subtitleFont;
      subtitleLines.forEach((line) => {
        ctx.fillText(line, padding, y);
        y += subtitleLineHeight;
      });

      ctx.drawImage(image, 0, topContentHeight);

      y = topContentHeight + image.height + 12;
      ctx.fillStyle = "#565656";
      ctx.font = sourceFont;
      sourceLines.forEach((line) => {
        ctx.fillText(line, padding, y);
        y += sourceLineHeight;
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${slugify(chart.title)}.png`;
      link.click();
    };
    image.src = chartDataUrl;
  }

  function initHero() {
    const heroMetrics = document.getElementById("hero-metrics");
    const caveat = document.getElementById("data-caveat");
    const pdfLink = document.querySelector(".hero .pdf-link");

    const topHousing = report.charts.g2.series[0].data[8];
    const ipc = report.charts.g2.series[0].data[18];
    const netProfit = report.charts.g6.series[1].data.at(-1);
    const blocked = report.charts.g10.series[0].data.reduce((a, b) => a + b, 0) / report.charts.g10.series[0].data.length;

    const metrics = [
      {
        kpi: `+${formatNumber(topHousing)}%`,
        label: "Precio vivienda España (2020-2025)"
      },
      {
        kpi: `+${formatNumber(ipc)}%`,
        label: "IPC acumulado (2020-2025)"
      },
      {
        kpi: `${formatNumber(netProfit)}%`,
        label: "Rentabilidad neta construcción (último dato)"
      },
      {
        kpi: `${formatNumber(blocked)}%`,
        label: "Vivienda pendiente media en planeamiento (CCAA)"
      }
    ];

    heroMetrics.innerHTML = metrics
      .map(
        (item) => `
          <article class="metric">
            <span class="kpi">${item.kpi}</span>
            <span class="label">${item.label}</span>
          </article>
        `
      )
      .join("");

    caveat.textContent = report.meta.caveat;

    if (pdfLink && !document.querySelector(".hero .home-link")) {
      const homeLink = document.createElement("a");
      homeLink.className = "pdf-link home-link";
      homeLink.href = getCatalogHomeHref();
      homeLink.textContent = "Volver a Informes";
      pdfLink.insertAdjacentElement("afterend", homeLink);
    }
  }

  function createNav() {
    const nav = document.getElementById("chapter-nav");
    nav.innerHTML = report.sections
      .map((section) => `<a href="#${section.id}" data-target="${section.id}">${section.title}</a>`)
      .join("");

    const links = [...nav.querySelectorAll("a")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const activeLink = links.find((link) => link.dataset.target === entry.target.id);
          if (activeLink && entry.isIntersecting) {
            links.forEach((link) => link.classList.remove("active"));
            activeLink.classList.add("active");
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    report.sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
  }

  function chartBadge(exactness) {
    const normalized = exactness.includes("exact") ? "exacta" : "reconstruida";
    return `<span class="chart-badge ${normalized}">${exactness}</span>`;
  }

  function renderChartTableMarkup(chart) {
    const columns = chart.tableColumns || ["#", "Categoría", "Valor"];
    const values = chart.series[0]?.data || [];

    const rows = chart.x
      .map((label, index) => ({
        rank: index + 1,
        label,
        value: values[index]
      }))
      .map(
        (row, index) => `
          <tr class="${index === 0 ? "top-row" : ""}">
            <td>${row.rank}</td>
            <td>${row.label}</td>
            <td>${formatChartValue(row.value, chart)}</td>
          </tr>
        `
      )
      .join("");

    return `
      <div class="chart-table-wrapper" aria-label="${chart.title}">
        <table class="chart-inline-table">
          <thead>
            <tr>
              <th>${columns[0]}</th>
              <th>${columns[1]}</th>
              <th>${columns[2]}</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }

  function chartBodyMarkup(chart, chartElId) {
    if (chart.renderAs === "table") {
      return renderChartTableMarkup(chart);
    }

    const extraClass = chart.renderAs === "small-multiples" ? " chart-canvas--multiples" : "";
    return `<div id="${chartElId}" class="chart-canvas${extraClass}" aria-label="${chart.title}"></div>`;
  }

  function renderSections() {
    const content = document.getElementById("report-sections");

    content.innerHTML = report.sections
      .map((section) => {
        const chartCards = section.chartIds
          .map((chartId) => {
            const chart = report.charts[chartId];
            const chartElId = `chart-${chart.id}`;
            return `
              <article class="chart-card">
                <header class="chart-head">
                  <div>
                    <p class="chart-title">${chart.title}</p>
                    <p class="chart-subtitle">${chart.subtitle}</p>
                  </div>
                  ${chartBadge(chart.exactness)}
                </header>
                ${chartBodyMarkup(chart, chartElId)}
                <footer class="chart-meta">
                  Fuente: ${chart.source} · Informe:
                  <a href="${REPORT_URL}" target="_blank" rel="noopener noreferrer">hesperides.edu.es</a>
                </footer>
              </article>
            `;
          })
          .join("");

        return `
          <article class="chapter" id="${section.id}">
            <h2>${section.title}</h2>
            <p class="chapter-summary">${section.summary}</p>
            ${chartCards}
          </article>
        `;
      })
      .join("");

    renderAllCharts();
  }

  function makeSeries(chart, isHorizontalBar) {
    return chart.series.map((serie) => {
      const base = {
        name: serie.name,
        type: serie.type,
        data: serie.data,
        smooth: serie.type === "line" ? 0.15 : false,
        symbol: serie.type === "line" ? "circle" : "none",
        symbolSize: serie.type === "line" ? 6 : 0,
        itemStyle: {
          color:
            serie.type === "bar" && chart.highlights
              ? (params) => {
                  const category = chart.x[params.dataIndex];
                  if (chart.highlights.includes(category)) {
                    if (category === "IPC") return "#2b2b2b";
                    return "#d5a500";
                  }
                  return serie.color;
                }
              : serie.color
        },
        lineStyle: {
          width: serie.type === "line" ? 2.4 : 0,
          color: serie.color
        },
        barMaxWidth: serie.type === "bar" ? (isHorizontalBar ? 18 : 44) : undefined
      };

      if (serie.type === "line") {
        base.areaStyle = serie.areaStyle
          ? {
              color: `${serie.color}26`
            }
          : undefined;
      }

      return base;
    });
  }

  function renderSmallMultiplesChart(chart, elementId) {
    const host = document.getElementById(elementId);
    if (!host) return;

    host.innerHTML = "";

    const allValues = chart.series.flatMap((serie) => serie.data);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const yPadding = Math.max(2, (maxValue - minValue) * 0.1);
    const axisPreset = chart.smallMultiplesAxis || {};
    const yMin = axisPreset.yMin ?? Math.floor((minValue - yPadding) / 5) * 5;
    const yMax = axisPreset.yMax ?? Math.ceil((maxValue + yPadding) / 5) * 5;
    const yInterval = axisPreset.yInterval ?? null;
    const tickIndices = new Set(
      Array.isArray(axisPreset.xTickIndices) ? axisPreset.xTickIndices : [0, Math.floor((chart.x.length - 1) / 2), chart.x.length - 1]
    );
    const labelMap = axisPreset.xLabelMap || {};

    const panels = chart.series.map(() => {
      const panel = document.createElement("div");
      panel.className = "mini-chart-canvas";
      host.appendChild(panel);
      return panel;
    });

    const createdInstances = [];

    chart.series.forEach((serie, serieIndex) => {
      const instance = echarts.init(panels[serieIndex], null, { renderer: "canvas" });
      chartInstances.push(instance);
      createdInstances.push(instance);

      instance.setOption({
        animationDuration: 650,
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(23, 23, 23, 0.92)",
          borderColor: "#f3c400",
          borderWidth: 1,
          textStyle: {
            color: "#f9f9f9"
          },
          valueFormatter: (value) => formatChartValue(value, chart)
        },
        title: {
          text: serie.name,
          left: 8,
          top: 4,
          textStyle: {
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "IBM Plex Sans",
            color: "#2c2a24"
          }
        },
        grid: {
          left: 44,
          right: 10,
          top: 34,
          bottom: 36
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: chart.x,
          axisLabel: {
            color: "#4f4f4f",
            fontSize: 10,
            interval: 0,
            formatter: (value, index) => {
              if (!tickIndices.has(index)) return "";
              return labelMap[value] || value;
            }
          },
          axisLine: {
            lineStyle: {
              color: "#8f8574"
            }
          }
        },
        yAxis: {
          type: "value",
          min: yMin,
          max: yMax,
          interval: yInterval === null ? undefined : yInterval,
          minInterval: getAxisUnitProfile(chart).integerOnly ? 1 : 0,
          axisLabel: {
            color: "#4f4f4f",
            fontSize: 10,
            hideOverlap: true,
            formatter: (value) => formatAxisTick(value, chart)
          },
          splitLine: {
            lineStyle: {
              color: "rgba(137, 128, 106, 0.25)"
            }
          }
        },
        series: [
          {
            name: serie.name,
            type: "line",
            data: serie.data,
            smooth: 0.15,
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              color: serie.color,
              width: 2.2
            },
            itemStyle: {
              color: serie.color
            }
          }
        ]
      });
    });

    requestAnimationFrame(() => {
      createdInstances.forEach((instance) => instance.resize());
    });
  }

  function renderChart(chart, elementId) {
    if (chart.renderAs === "table") return;
    if (chart.renderAs === "small-multiples") {
      renderSmallMultiplesChart(chart, elementId);
      return;
    }

    const element = document.getElementById(elementId);
    if (!element) return;

    const instance = echarts.init(element, null, { renderer: "canvas" });
    chartInstances.push(instance);

    const isHorizontalBar =
      chart.orientation === "horizontal" && chart.series.length > 0 && chart.series.every((serie) => serie.type === "bar");

    const multipleSeries = chart.series.length > 1;
    const categoryLength = chart.x.length;
    const manyPoints = categoryLength > 12;
    const hasLongLabels = chart.x.some((label) => label.length > 12);
    const xLabelRotate = hasLongLabels && !isHorizontalBar ? 40 : 0;
    const useSliderZoom = manyPoints && !hasLongLabels && !isHorizontalBar;

    const option = {
      animationDuration: 750,
      animationEasing: "cubicOut",
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(23, 23, 23, 0.92)",
        borderColor: "#f3c400",
        borderWidth: 1,
        textStyle: {
          color: "#f9f9f9"
        },
        valueFormatter: (value) => formatChartValue(value, chart)
      },
      legend: {
        show: multipleSeries,
        top: 0,
        textStyle: {
          fontFamily: "IBM Plex Sans"
        }
      },
      grid: isHorizontalBar
        ? {
            left: hasLongLabels ? 152 : 126,
            right: 18,
            top: multipleSeries ? 46 : 24,
            bottom: 28
          }
        : {
            left: 52,
            right: 16,
            top: multipleSeries ? 46 : 28,
            bottom: useSliderZoom ? 82 : hasLongLabels ? 90 : 48
          },
      xAxis: isHorizontalBar
        ? {
            type: "value",
            minInterval: getAxisUnitProfile(chart).integerOnly ? 1 : 0,
            axisLabel: {
              color: "#4f4f4f",
              hideOverlap: true,
              formatter: (value) => formatAxisTick(value, chart)
            },
            splitLine: {
              lineStyle: {
                color: "rgba(137, 128, 106, 0.25)"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#8f8574"
              }
            }
          }
        : {
            type: "category",
            boundaryGap: chart.series.some((serie) => serie.type === "bar"),
            data: chart.x,
            axisLabel: {
              rotate: xLabelRotate,
              margin: hasLongLabels ? 18 : 10,
              color: "#4f4f4f",
              fontSize: 11,
              hideOverlap: true
            },
            axisLine: {
              lineStyle: {
                color: "#8f8574"
              }
            }
          },
      yAxis: isHorizontalBar
        ? {
            type: "category",
            data: chart.x,
            axisLabel: {
              color: "#4f4f4f",
              fontSize: 11,
              interval: 0,
              formatter: (value) => wrapCategoryLabel(value, 14)
            },
            axisLine: {
              lineStyle: {
                color: "#8f8574"
              }
            }
          }
        : {
            type: "value",
            minInterval: getAxisUnitProfile(chart).integerOnly ? 1 : 0,
            axisLabel: {
              color: "#4f4f4f",
              hideOverlap: true,
              formatter: (value) => formatAxisTick(value, chart)
            },
            splitLine: {
              lineStyle: {
                color: "rgba(137, 128, 106, 0.25)",
                type: "solid"
              }
            }
          },
      dataZoom: useSliderZoom
        ? [
            {
              type: "inside",
              moveOnMouseMove: true
            },
            {
              type: "slider",
              height: 14,
              bottom: 24,
              borderColor: "#ccb98f",
              brushSelect: false,
              fillerColor: "rgba(243, 196, 0, 0.15)",
              handleStyle: {
                color: "#f3c400"
              }
            }
          ]
        : [],
      toolbox: {
        right: 0,
        top: 0,
        itemSize: 14,
        feature: {
          myDownload: {
            show: true,
            title: "Descargar",
            icon: "path://M512 128c17.7 0 32 14.3 32 32v256h96L384 704 128 416h96V160c0-17.7 14.3-32 32-32h256zM128 768h512v64H128v-64z",
            onclick: () => {
              downloadChartWithMeta(instance, chart);
            }
          }
        }
      },
      series: makeSeries(chart, isHorizontalBar)
    };

    if (chart.zeroLine && option.series.length > 0) {
      option.series[0].markLine = {
        symbol: "none",
        lineStyle: {
          color: "#7c7468",
          type: "dashed"
        },
        data: [isHorizontalBar ? { xAxis: 0 } : { yAxis: 0 }]
      };
    }

    if (!isHorizontalBar && chart.eventLines && chart.eventLines.length > 0) {
      option.series[0].markLine = {
        ...(option.series[0].markLine || {}),
        symbol: "none",
        lineStyle: {
          color: "#7c7468",
          type: "dashed"
        },
        label: {
          formatter: (params) => params.name,
          color: "#524a3b",
          fontSize: 10,
          backgroundColor: "rgba(255,255,255,0.7)",
          padding: [2, 4]
        },
        data: chart.eventLines.map((event) => ({
          name: event.label,
          xAxis: event.x
        }))
      };
    }

    instance.setOption(option);
  }

  function renderAllCharts() {
    Object.values(report.charts).forEach((chart) => {
      renderChart(chart, `chart-${chart.id}`);
    });
  }

  function renderTables() {
    const grid = document.getElementById("tables-grid");

    const tableCards = Object.values(report.tables)
      .map((table) => {
        const headers = table.columns.map((header) => `<th>${header}</th>`).join("");
        const rows = table.rows
          .map(
            (row) => `
              <tr>
                ${row.map((cell) => `<td>${cell}</td>`).join("")}
              </tr>
            `
          )
          .join("");

        return `
          <article class="table-card">
            <h3>${table.title}</h3>
            <table>
              <thead>
                <tr>${headers}</tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
            <p class="table-source">Fuente: ${table.source}</p>
          </article>
        `;
      })
      .join("");

    grid.innerHTML = tableCards;
  }

  function renderSources() {
    const sourceList = document.getElementById("sources-list");
    const sources = Object.values(report.charts).map(
      (chart) => `${chart.title}: ${chart.source} · Informe: ${REPORT_URL}`
    );

    sourceList.innerHTML = sources.map((source) => `<li>${source}</li>`).join("");
  }

  function setupProfitPlayground() {
    const ids = ["price-growth", "inflation", "build-cost", "finance-rate", "delay-years", "base-price"];
    const inputs = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));

    const outputs = {
      growth: document.getElementById("price-growth-value"),
      inflation: document.getElementById("inflation-value"),
      buildCost: document.getElementById("build-cost-value"),
      finance: document.getElementById("finance-rate-value"),
      delay: document.getElementById("delay-years-value")
    };

    const resultBox = document.getElementById("profit-results");

    function update() {
      const growth = Number(inputs["price-growth"].value);
      const inflation = Number(inputs["inflation"].value);
      const buildCost = Number(inputs["build-cost"].value);
      const financeRate = Number(inputs["finance-rate"].value);
      const delayYears = Number(inputs["delay-years"].value);
      const basePrice = Number(inputs["base-price"].value || 2500);

      outputs.growth.textContent = `${formatNumber(growth)}%`;
      outputs.inflation.textContent = `${formatNumber(inflation)}%`;
      outputs.buildCost.textContent = `${formatInt(buildCost)} €/m²`;
      outputs.finance.textContent = `${formatNumber(financeRate)}% anual`;
      outputs.delay.textContent = `${formatNumber(delayYears)} años`;

      const landCost = basePrice * 0.22;
      const softCost = buildCost * 0.2;
      const productionCost = buildCost + landCost + softCost;
      const salePrice = basePrice * (1 + growth / 100);
      const financeCost = productionCost * (financeRate / 100) * (delayYears / 2);
      const netProfitPerM2 = salePrice - productionCost - financeCost;
      const netMargin = (netProfitPerM2 / productionCost) * 100;
      const realPriceGap = growth - inflation;
      const expectedStarts = Math.max(0.4, Math.min(20, 2.7 + netMargin * 0.55));

      const signal = Math.max(0, Math.min(100, ((netMargin + 10) / 25) * 100));
      const signalColor = netMargin >= 4 ? "#1f8f45" : netMargin >= 0 ? "#d19800" : "#b23b1d";
      const diagnosis =
        netMargin >= 4
          ? "Incentivo positivo para iniciar obra nueva."
          : netMargin >= 0
            ? "Incentivo débil: riesgo alto ante retrasos o sobrecostes."
            : "Sin incentivo económico neto para ampliar oferta.";

      resultBox.innerHTML = `
        <div class="kpi-row">
          <div class="kpi-box">
            <span class="value">${formatNumber(netMargin)}%</span>
            <span class="desc">Margen neto estimado</span>
          </div>
          <div class="kpi-box">
            <span class="value">${formatInt(Math.round(netProfitPerM2))} €/m²</span>
            <span class="desc">Resultado neto por m²</span>
          </div>
          <div class="kpi-box">
            <span class="value">${formatNumber(realPriceGap)} p.p.</span>
            <span class="desc">Precio vivienda menos IPC</span>
          </div>
          <div class="kpi-box">
            <span class="value">${formatNumber(expectedStarts)} / 1.000</span>
            <span class="desc">Inicios teóricos de vivienda</span>
          </div>
        </div>
        <div class="thermometer" aria-label="Señal de incentivo de oferta">
          <div style="width:${formatNumber(signal, 0)}%; background:${signalColor};"></div>
        </div>
        <p style="margin:0.55rem 0 0; font-size:0.84rem; color:#4c4639;">${diagnosis}</p>
      `;
    }

    Object.values(inputs).forEach((input) => {
      input.addEventListener("input", update);
      input.addEventListener("change", update);
    });

    update();
  }

  function setupSupplyPlayground() {
    const ids = ["blocked-now", "blocked-target", "maturity-years", "population-millions"];
    const inputs = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));

    const outputs = {
      now: document.getElementById("blocked-now-value"),
      target: document.getElementById("blocked-target-value"),
      maturity: document.getElementById("maturity-years-value"),
      population: document.getElementById("population-millions-value")
    };

    const resultBox = document.getElementById("supply-results");

    function update() {
      const blockedNow = Number(inputs["blocked-now"].value);
      const blockedTarget = Number(inputs["blocked-target"].value);
      const maturityYears = Number(inputs["maturity-years"].value);
      const populationMillions = Number(inputs["population-millions"].value);

      outputs.now.textContent = `${formatNumber(blockedNow)}%`;
      outputs.target.textContent = `${formatNumber(blockedTarget)}%`;
      outputs.maturity.textContent = `${formatNumber(maturityYears)} años`;
      outputs.population.textContent = `${formatNumber(populationMillions)} millones`;

      const totalPotential = 9_500_000;
      const executableNow = totalPotential * (1 - blockedNow / 100);
      const executableTarget = totalPotential * (1 - blockedTarget / 100);
      const deltaUnits = executableTarget - executableNow;
      const annualImpact = deltaUnits / maturityYears;

      const baselineStartsPer1000 = 2.7;
      const baselineAnnualStarts = (populationMillions * 1_000_000 * baselineStartsPer1000) / 1000;
      const impactVsBaseline = (annualImpact / baselineAnnualStarts) * 100;

      const color = deltaUnits >= 0 ? "#1f8f45" : "#b23b1d";
      const narrative =
        deltaUnits >= 0
          ? "Reducción del bloqueo: aumenta la bolsa potencial de suelo ejecutable."
          : "Mayor bloqueo: se contrae la oferta potencial y se retrasa el ajuste de precios.";

      resultBox.innerHTML = `
        <div class="kpi-row">
          <div class="kpi-box">
            <span class="value" style="color:${color};">${formatInt(Math.round(deltaUnits))}</span>
            <span class="desc">Viviendas potenciales adicionales</span>
          </div>
          <div class="kpi-box">
            <span class="value">${formatInt(Math.round(annualImpact))}/año</span>
            <span class="desc">Ritmo anual durante maduración</span>
          </div>
          <div class="kpi-box">
            <span class="value">${formatInt(Math.round(executableNow))}</span>
            <span class="desc">Viviendas ejecutables hoy</span>
          </div>
          <div class="kpi-box">
            <span class="value">${formatNumber(impactVsBaseline)}%</span>
            <span class="desc">Impacto anual vs inicios actuales</span>
          </div>
        </div>
        <div class="thermometer" aria-label="Magnitud de desbloqueo">
          <div style="width:${Math.min(100, Math.abs(impactVsBaseline)).toFixed(0)}%; background:${color};"></div>
        </div>
        <p style="margin:0.55rem 0 0; font-size:0.84rem; color:#4c4639;">${narrative}</p>
      `;
    }

    Object.values(inputs).forEach((input) => {
      input.addEventListener("input", update);
      input.addEventListener("change", update);
    });

    update();
  }

  function attachResize() {
    window.addEventListener("resize", () => {
      chartInstances.forEach((instance) => instance.resize());
    });
  }

  function init() {
    initHero();
    renderSections();
    renderTables();
    renderSources();
    createNav();
    setupProfitPlayground();
    setupSupplyPlayground();
    attachResize();
  }

  init();
})();
