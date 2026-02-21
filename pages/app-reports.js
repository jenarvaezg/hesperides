(() => {
  const report = window.REPORT_DATA;
  if (!report) {
    return;
  }

  const chartInstances = [];

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
    return String(text)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 96);
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

  function wrapLines(ctx, text, maxWidth) {
    const words = String(text).split(" ");
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

  function axisFormatter(unit) {
    const normalized = String(unit || "").toLowerCase();
    if (normalized.includes("%")) {
      return (value) => `${formatNumber(value, 0)}%`;
    }
    if (normalized.includes("m") || normalized.includes("viviendas") || normalized.includes("euros")) {
      return (value) => formatInt(value);
    }
    return (value) => formatNumber(value, 0);
  }

  function valueFormatter(unit) {
    const normalized = String(unit || "").toLowerCase();
    if (normalized.includes("%")) {
      return (value) => `${formatNumber(value, 1)}%`;
    }
    if (normalized.includes("euros")) {
      return (value) => `${formatInt(value)} EUR`;
    }
    if (normalized.includes("m")) {
      return (value) => `${formatInt(value)} M`;
    }
    if (normalized.includes("viviendas")) {
      return (value) => `${formatInt(value)} viviendas`;
    }
    return (value) => formatNumber(value, 1);
  }

  function getReportUrl() {
    return report.meta && report.meta.reportUrl ? report.meta.reportUrl : window.location.href;
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
      const subtitleLines = wrapLines(ctx, chart.subtitle || "", textWidth);
      ctx.font = sourceFont;
      const sourceText = `Fuente: ${chart.source} - Informe: ${getReportUrl()}`;
      const sourceLines = wrapLines(ctx, sourceText, textWidth);

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

  function buildChartOption(chart) {
    const xLabels = (chart.x || []).map((label) => wrapCategoryLabel(label));
    const isHorizontal = chart.orientation === "horizontal";
    const asLine = chart.type === "line";
    const tickFormatter = axisFormatter(chart.unit);
    const tooltipFormatter = valueFormatter(chart.unit);

    const baseSeries = (chart.series || []).map((serie, index) => ({
      name: serie.name,
      type: asLine ? "line" : "bar",
      smooth: asLine,
      barMaxWidth: 28,
      symbol: asLine ? "circle" : "none",
      symbolSize: asLine ? 6 : 0,
      emphasis: { focus: "series" },
      data: serie.data,
      itemStyle: {
        borderRadius: asLine ? 0 : [6, 6, 0, 0]
      }
    }));

    const option = {
      animationDuration: 400,
      grid: {
        left: isHorizontal ? 130 : 56,
        right: 26,
        top: 28,
        bottom: xLabels.length > 8 && !isHorizontal ? 92 : 58,
        containLabel: true
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: asLine ? "cross" : "shadow"
        },
        formatter: (params) => {
          const items = Array.isArray(params) ? params : [params];
          const lines = [`<strong>${items[0].axisValueLabel}</strong>`];
          items.forEach((item) => {
            lines.push(`${item.marker} ${item.seriesName}: ${tooltipFormatter(item.value)}`);
          });
          return lines.join("<br>");
        }
      },
      legend: {
        show: (chart.series || []).length > 1,
        top: 0,
        left: "left"
      },
      toolbox: {
        right: 0,
        top: -4,
        feature: {
          saveAsImage: { show: false },
          customDownload: {
            show: true,
            title: "Descargar PNG",
            icon:
              "path://M512 64c-26.5 0-48 21.5-48 48v240H304c-19.4 0-29.1 23.4-15.4 37.1l208 208c8.5 8.5 22.3 8.5 30.8 0l208-208c13.7-13.7 4-37.1-15.4-37.1H560V112c0-26.5-21.5-48-48-48zm-320 576c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64h640c35.3 0 64-28.7 64-64v-32c0-35.3-28.7-64-64-64H192z",
            onclick: () => {}
          }
        }
      },
      xAxis: isHorizontal
        ? {
            type: "value",
            axisLabel: {
              color: "#5b5545",
              formatter: tickFormatter
            },
            splitLine: {
              lineStyle: {
                color: "rgba(104, 90, 52, 0.15)"
              }
            },
            min: chart.min,
            max: chart.max
          }
        : {
            type: "category",
            data: xLabels,
            axisLabel: {
              color: "#5b5545",
              interval: 0,
              fontSize: 11,
              lineHeight: 14
            },
            axisTick: { alignWithLabel: true }
          },
      yAxis: isHorizontal
        ? {
            type: "category",
            data: xLabels,
            axisLabel: {
              color: "#5b5545",
              interval: 0,
              fontSize: 11,
              lineHeight: 14
            }
          }
        : {
            type: "value",
            axisLabel: {
              color: "#5b5545",
              formatter: tickFormatter
            },
            splitLine: {
              lineStyle: {
                color: "rgba(104, 90, 52, 0.15)"
              }
            },
            min: chart.min,
            max: chart.max
          },
      series: baseSeries
    };

    if ((chart.x || []).length > 10 && !isHorizontal) {
      option.dataZoom = [{ type: "inside" }];
    }

    return option;
  }

  function renderChart(chart, host) {
    const canvas = document.createElement("div");
    canvas.className = "chart-canvas";
    host.appendChild(canvas);

    const instance = echarts.init(canvas, null, { renderer: "canvas" });
    instance.setOption(buildChartOption(chart));

    const toolboxOption = instance.getOption();
    if (toolboxOption.toolbox && toolboxOption.toolbox.length) {
      toolboxOption.toolbox[0].feature.customDownload.onclick = () => downloadChartWithMeta(instance, chart);
      instance.setOption(toolboxOption, true);
    }

    chartInstances.push(instance);
  }

  function renderFigureImage(chart, host) {
    const shell = document.createElement("div");
    shell.className = "chart-figure-shell";

    const image = document.createElement("img");
    image.className = "chart-figure-image";
    image.loading = "lazy";
    image.alt = chart.title;
    image.src = chart.imageUrl;
    shell.appendChild(image);

    host.appendChild(shell);
  }

  function renderSections() {
    const chapterNav = document.getElementById("chapter-nav");
    const container = document.getElementById("report-sections");

    if (!chapterNav || !container) return;

    chapterNav.innerHTML = "";
    container.innerHTML = "";

    report.chapters.forEach((chapter) => {
      const sectionId = chapter.id || slugify(chapter.title);

      const navLink = document.createElement("a");
      navLink.href = `#${sectionId}`;
      navLink.textContent = chapter.title;
      chapterNav.appendChild(navLink);

      const article = document.createElement("article");
      article.className = "chapter";
      article.id = sectionId;

      const title = document.createElement("h2");
      title.textContent = chapter.title;
      article.appendChild(title);

      (chapter.summary || []).forEach((paragraph) => {
        const p = document.createElement("p");
        p.className = "chapter-summary";
        p.textContent = paragraph;
        article.appendChild(p);
      });

      (chapter.charts || []).forEach((chartKey) => {
        const chart = report.charts[chartKey];
        if (!chart) return;

        const card = document.createElement("article");
        card.className = "chart-card";

        const badgeClass = String(chart.exactness || "").toLowerCase().includes("reconstruida")
          ? "reconstruida"
          : "exacta";

        card.innerHTML = `
          <header class="chart-head">
            <div>
              <p class="chart-title">${chart.title}</p>
              <p class="chart-subtitle">${chart.subtitle || ""}</p>
            </div>
            <span class="chart-badge ${badgeClass}">${chart.exactness || ""}</span>
          </header>
        `;

        if (chart.renderAs === "figure-image") {
          renderFigureImage(chart, card);
        } else {
          renderChart(chart, card);
        }

        const meta = document.createElement("p");
        meta.className = "chart-meta";
        meta.innerHTML = `Fuente: <a href="${chart.sourceUrl || getReportUrl()}" target="_blank" rel="noopener noreferrer">${chart.source}</a>`;
        card.appendChild(meta);

        article.appendChild(card);
      });

      container.appendChild(article);
    });

    const links = [...chapterNav.querySelectorAll("a")];
    const sections = [...container.querySelectorAll(".chapter")];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((link) => link.classList.remove("active"));
            const active = chapterNav.querySelector(`a[href=\"#${entry.target.id}\"]`);
            if (active) active.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function renderSources() {
    const list = document.getElementById("sources-list");
    if (!list) return;

    list.innerHTML = "";
    (report.sources || []).forEach((source) => {
      const li = document.createElement("li");
      if (typeof source === "string") {
        li.textContent = source;
      } else {
        li.innerHTML = `${source.name}: <a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.url}</a>`;
      }
      list.appendChild(li);
    });
  }

  function initHero() {
    const title = document.querySelector(".hero h1");
    const lead = document.querySelector(".hero .lead");
    const eyebrow = document.querySelector(".hero .eyebrow");
    const pdfLink = document.querySelector(".hero .pdf-link");
    const caveat = document.getElementById("data-caveat");
    const heroMetrics = document.getElementById("hero-metrics");

    document.title = `${report.meta.title} | Informe Interactivo`;

    if (eyebrow) eyebrow.textContent = report.meta.eyebrow || "Centro Ruth Richardson - Universidad de las Hesperides";
    if (title) title.textContent = report.meta.title;
    if (lead) lead.textContent = report.meta.lead;
    if (pdfLink) {
      pdfLink.href = report.meta.reportUrl || report.meta.pdfUrl;
      pdfLink.textContent = "Abrir informe original";
    }
    if (caveat) caveat.textContent = report.meta.caveat || "Datos tomados del informe original y complementados para visualizacion interactiva.";

    if (heroMetrics) {
      heroMetrics.innerHTML = (report.metrics || [])
        .map(
          (item) => `
            <article class="metric">
              <span class="kpi">${item.kpi}</span>
              <span class="label">${item.label}</span>
            </article>
          `
        )
        .join("");
    }
  }

  function init() {
    initHero();
    renderSections();
    renderSources();

    window.addEventListener("resize", () => {
      chartInstances.forEach((instance) => instance.resize());
    });

    window.setTimeout(() => {
      chartInstances.forEach((instance) => instance.resize());
    }, 150);
  }

  init();
})();
