(() => {
  const report = window.REPORT_DATA;
  if (!report) {
    return;
  }

  const chartInstances = [];

  function getRepoBasePath() {
    const path = window.location.pathname || "/";
    const marker = "/hesperides/";
    const markerIndex = path.indexOf(marker);

    if (markerIndex >= 0) {
      return path.slice(0, markerIndex + marker.length);
    }

    return "/";
  }

  function getCatalogHomeHref() {
    const base = getRepoBasePath().replace(/\/+$/, "/");
    return `${base}index.html`;
  }

  function resolveAssetUrl(rawUrl) {
    const value = String(rawUrl || "").trim();
    if (!value) return value;
    if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;
    if (value.startsWith("/")) return value;

    const normalized = value.replace(/\\/g, "/");
    const assetsIndex = normalized.indexOf("assets/");
    if (assetsIndex >= 0) {
      const base = getRepoBasePath().replace(/\/+$/, "/");
      const assetPath = normalized.slice(assetsIndex).replace(/^\/+/, "");
      return `${base}${assetPath}`;
    }

    return value;
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

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

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

  function renderInlineTable(chart, host) {
    const columns = chart.tableColumns || ["#", "Categoria", "Valor"];
    const rows = Array.isArray(chart.tableRows)
      ? chart.tableRows
      : (chart.x || []).map((label, index) => {
          const values = (chart.series && chart.series[0] && chart.series[0].data) || [];
          const value = values[index];
          return [String(index + 1), label, value === undefined ? "-" : String(value)];
        });

    const wrapper = document.createElement("div");
    wrapper.className = "chart-table-wrapper";

    const table = document.createElement("table");
    table.className = "chart-inline-table";

    const thead = document.createElement("thead");
    const headTr = document.createElement("tr");
    columns.forEach((label) => {
      const th = document.createElement("th");
      th.textContent = label;
      headTr.appendChild(th);
    });
    thead.appendChild(headTr);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    rows.forEach((row, index) => {
      const tr = document.createElement("tr");
      if (index === 0) tr.classList.add("top-row");
      row.forEach((cell) => {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrapper.appendChild(table);
    host.appendChild(wrapper);
  }

  function getReportUrl() {
    return report.meta && report.meta.reportUrl ? report.meta.reportUrl : window.location.href;
  }

  function downloadCanvasWithMetaFromImage(image, chart) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const padding = 42;
    const textWidth = image.width - padding * 2;

    const titleFont = '700 44px "Fraunces", serif';
    const subtitleFont = '400 28px "IBM Plex Sans", sans-serif';
    const sourceFont = '400 22px "IBM Plex Sans", sans-serif';

    ctx.font = titleFont;
    const titleLines = wrapLines(ctx, chart.title || "", textWidth);
    ctx.font = subtitleFont;
    const subtitleLines = wrapLines(ctx, chart.subtitle || "", textWidth);
    ctx.font = sourceFont;
    const sourceText = `Fuente: ${chart.source || "Informe original"} · Informe: ${getReportUrl()}`;
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
    link.download = `${slugify(chart.title || "grafico")}.png`;
    link.click();
  }

  function downloadChartWithMeta(instance, chart) {
    const chartDataUrl = instance.getDataURL({
      pixelRatio: 2,
      backgroundColor: "#fffdf8",
      excludeComponents: ["toolbox"]
    });

    const image = new Image();
    image.onload = () => downloadCanvasWithMetaFromImage(image, chart);

    image.src = chartDataUrl;
  }

  function downloadFigureWithMeta(chart) {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => downloadCanvasWithMetaFromImage(image, chart);
    image.src = resolveAssetUrl(chart.imageUrl);
  }

  function downloadTableWithMeta(chart) {
    const columns = chart.tableColumns || ["#", "Categoria", "Valor"];
    const rows = Array.isArray(chart.tableRows)
      ? chart.tableRows
      : (chart.x || []).map((label, index) => {
          const values = (chart.series && chart.series[0] && chart.series[0].data) || [];
          const value = values[index];
          return [String(index + 1), label, value === undefined ? "-" : String(value)];
        });

    const padding = 42;
    const cellPaddingX = 14;
    const cellPaddingY = 10;
    const lineHeight = 24;
    const maxColWidth = 420;
    const minColWidth = 180;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const titleFont = '700 44px "Fraunces", serif';
    const subtitleFont = '400 28px "IBM Plex Sans", sans-serif';
    const sourceFont = '400 22px "IBM Plex Sans", sans-serif';
    const headCellFont = '700 22px "IBM Plex Sans", sans-serif';
    const bodyCellFont = '400 21px "IBM Plex Sans", sans-serif';

    ctx.font = headCellFont;
    const colWidths = columns.map((col, colIndex) => {
      let width = Math.max(minColWidth, Math.min(maxColWidth, ctx.measureText(String(col)).width + cellPaddingX * 2));
      ctx.font = bodyCellFont;
      rows.forEach((row) => {
        const value = String(row[colIndex] ?? "");
        const measured = Math.min(maxColWidth, ctx.measureText(value).width + cellPaddingX * 2);
        width = Math.max(width, measured);
      });
      ctx.font = headCellFont;
      return width;
    });

    const tableWidth = colWidths.reduce((acc, width) => acc + width, 0);
    const contentWidth = Math.max(1120, tableWidth + padding * 2);
    const tableLeft = Math.round((contentWidth - tableWidth) / 2);

    ctx.font = titleFont;
    const titleLines = wrapLines(ctx, chart.title || "", contentWidth - padding * 2);
    ctx.font = subtitleFont;
    const subtitleLines = wrapLines(ctx, chart.subtitle || "", contentWidth - padding * 2);
    ctx.font = sourceFont;
    const sourceLines = wrapLines(
      ctx,
      `Fuente: ${chart.source || "Informe original"} · Informe: ${getReportUrl()}`,
      contentWidth - padding * 2
    );

    const headerRowHeight = lineHeight + cellPaddingY * 2;
    const bodyRowHeights = rows.map((row) => {
      let maxLines = 1;
      row.forEach((cell, colIndex) => {
        ctx.font = bodyCellFont;
        const wrapped = wrapLines(ctx, String(cell ?? ""), colWidths[colIndex] - cellPaddingX * 2);
        maxLines = Math.max(maxLines, wrapped.length || 1);
      });
      return maxLines * lineHeight + cellPaddingY * 2;
    });

    const tableHeight = headerRowHeight + bodyRowHeights.reduce((acc, value) => acc + value, 0);
    const titleLineHeight = 52;
    const subtitleLineHeight = 36;
    const sourceLineHeight = 28;
    const topContentHeight =
      padding + titleLines.length * titleLineHeight + 8 + subtitleLines.length * subtitleLineHeight + 30;
    const bottomContentHeight = 18 + sourceLines.length * sourceLineHeight + 24;

    canvas.width = contentWidth;
    canvas.height = topContentHeight + tableHeight + bottomContentHeight;

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

    let tableTop = topContentHeight;
    let x = tableLeft;
    ctx.fillStyle = "rgba(243, 196, 0, 0.16)";
    ctx.fillRect(tableLeft, tableTop, tableWidth, headerRowHeight);
    ctx.strokeStyle = "rgba(182, 173, 154, 0.8)";
    ctx.lineWidth = 1;
    ctx.strokeRect(tableLeft, tableTop, tableWidth, tableHeight);

    ctx.font = headCellFont;
    ctx.fillStyle = "#2a2417";
    columns.forEach((col, colIndex) => {
      const colWidth = colWidths[colIndex];
      ctx.fillText(String(col), x + cellPaddingX, tableTop + cellPaddingY);
      x += colWidth;
      if (colIndex < columns.length - 1) {
        ctx.beginPath();
        ctx.moveTo(x, tableTop);
        ctx.lineTo(x, tableTop + tableHeight);
        ctx.stroke();
      }
    });

    let cursorY = tableTop + headerRowHeight;
    rows.forEach((row, rowIndex) => {
      const rowHeight = bodyRowHeights[rowIndex];
      if (rowIndex === 0) {
        ctx.fillStyle = "rgba(243, 196, 0, 0.1)";
        ctx.fillRect(tableLeft, cursorY, tableWidth, rowHeight);
      }

      ctx.fillStyle = "#2d2d2d";
      ctx.font = bodyCellFont;
      let cursorX = tableLeft;
      row.forEach((cell, colIndex) => {
        const colWidth = colWidths[colIndex];
        const wrapped = wrapLines(ctx, String(cell ?? ""), colWidth - cellPaddingX * 2);
        wrapped.forEach((line, lineIndex) => {
          ctx.fillText(line, cursorX + cellPaddingX, cursorY + cellPaddingY + lineIndex * lineHeight);
        });
        cursorX += colWidth;
      });

      cursorY += rowHeight;
      if (rowIndex < rows.length - 1) {
        ctx.beginPath();
        ctx.moveTo(tableLeft, cursorY);
        ctx.lineTo(tableLeft + tableWidth, cursorY);
        ctx.stroke();
      }
    });

    y = topContentHeight + tableHeight + 12;
    ctx.fillStyle = "#565656";
    ctx.font = sourceFont;
    sourceLines.forEach((line) => {
      ctx.fillText(line, padding, y);
      y += sourceLineHeight;
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${slugify(chart.title || "tabla")}.png`;
    link.click();
  }

  function buildChartOption(chart) {
    const xLabels = (chart.x || []).map((label) => wrapCategoryLabel(label));
    const isHorizontal = chart.orientation === "horizontal";
    const defaultType = chart.type === "line" ? "line" : "bar";
    const tickFormatter = axisFormatter(chart.unit);
    const tooltipFormatter = valueFormatter(chart.unit);
    const anyLineSeries = (chart.series || []).some((serie) => (serie.type || defaultType) === "line");
    const colors = (chart.series || []).map((serie) => serie.color).filter(Boolean);

    const baseSeries = (chart.series || []).map((serie) => {
      const serieType = serie.type || defaultType;
      const isLine = serieType === "line";
      const base = {
        name: serie.name,
        type: serieType,
        data: serie.data,
        emphasis: { focus: "series" },
        stack: serie.stack || chart.stack || undefined,
        yAxisIndex: Number.isInteger(serie.yAxisIndex) ? serie.yAxisIndex : 0,
        barMaxWidth: serie.barMaxWidth || chart.barMaxWidth || 28,
        smooth: isLine ? (serie.smooth !== undefined ? Boolean(serie.smooth) : true) : false,
        symbol: isLine ? serie.symbol || "circle" : serie.symbol || "none",
        symbolSize: isLine ? (serie.symbolSize || 6) : serie.symbolSize || 0
      };

      if (serie.color) {
        base.itemStyle = {
          ...(base.itemStyle || {}),
          color: serie.color
        };
        if (isLine) {
          base.lineStyle = {
            color: serie.color
          };
        }
      }

      if (!isLine) {
        base.itemStyle = {
          ...(base.itemStyle || {}),
          borderRadius: isHorizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]
        };
      }

      if (serie.areaStyle) {
        if (typeof serie.areaStyle === "object") {
          base.areaStyle = serie.areaStyle;
        } else if (typeof serie.areaStyle === "number") {
          base.areaStyle = { opacity: serie.areaStyle };
        } else {
          base.areaStyle = { opacity: 0.18 };
        }
      }

      return base;
    });

    const yAxisOption = Array.isArray(chart.yAxis)
      ? chart.yAxis.map((axis) => ({
          type: "value",
          min: axis.min,
          max: axis.max,
          position: axis.position || "left",
          axisLabel: {
            color: "#5b5545",
            formatter: axisFormatter(axis.unit || chart.unit)
          },
          splitLine: {
            show: axis.position !== "right",
            lineStyle: { color: "rgba(104, 90, 52, 0.15)" }
          }
        }))
      : null;

    const option = {
      animationDuration: 400,
      color: colors.length ? colors : undefined,
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
          type: anyLineSeries ? "cross" : "shadow"
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
        top: 0,
        itemSize: 14,
        feature: {
          myDownload: {
            show: true,
            title: "Descargar",
            icon:
              "path://M512 128c17.7 0 32 14.3 32 32v256h96L384 704 128 416h96V160c0-17.7 14.3-32 32-32h256zM128 768h512v64H128v-64z",
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
      yAxis: yAxisOption || (isHorizontal
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
          }),
      series: baseSeries
    };

    if (chart.dataZoom) {
      option.dataZoom = chart.dataZoom;
    } else if ((chart.x || []).length > 10 && !isHorizontal) {
      option.dataZoom = [{ type: "inside" }];
    }

    return option;
  }

  function renderChart(chart, host) {
    const canvas = document.createElement("div");
    canvas.className = "chart-canvas";
    host.appendChild(canvas);

    const instance = echarts.init(canvas, null, { renderer: "canvas" });
    const option = buildChartOption(chart);
    if (option.toolbox && option.toolbox.feature && option.toolbox.feature.myDownload) {
      option.toolbox.feature.myDownload.onclick = () => downloadChartWithMeta(instance, chart);
    }
    instance.setOption(option);

    chartInstances.push(instance);
  }

  function renderFigureImage(chart, host) {
    const shell = document.createElement("div");
    shell.className = "chart-figure-shell";

    const image = document.createElement("img");
    image.className = "chart-figure-image";
    image.loading = "lazy";
    image.alt = chart.title;
    image.src = resolveAssetUrl(chart.imageUrl);
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
            <div class="chart-head-actions">
              <span class="chart-badge ${badgeClass}">${chart.exactness || ""}</span>
            </div>
          </header>
        `;

        if (chart.renderAs === "table" || chart.renderAs === "figure-image") {
          const actions = card.querySelector(".chart-head-actions");
          if (actions) {
            const downloadButton = document.createElement("button");
            downloadButton.type = "button";
            downloadButton.className = "chart-download-btn";
            downloadButton.textContent = "Descargar PNG";
            downloadButton.addEventListener("click", () => {
              if (chart.renderAs === "table") {
                downloadTableWithMeta(chart);
              } else {
                downloadFigureWithMeta(chart);
              }
            });
            actions.appendChild(downloadButton);
          }
        }

        if (chart.renderAs === "figure-image") {
          renderFigureImage(chart, card);
        } else if (chart.renderAs === "table") {
          renderInlineTable(chart, card);
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

  function getDefaultPlaygroundIntro() {
    return "Modelos simplificados para experimentar con los supuestos del informe y observar su impacto en sostenibilidad, oferta o accesibilidad.";
  }

  function renderPlaygrounds() {
    const definitions = Array.isArray(report.playgrounds) ? report.playgrounds : [];
    if (!definitions.length) return;

    const sourcesSection = document.querySelector(".sources-section");
    if (!sourcesSection || !sourcesSection.parentNode) return;

    let section = document.getElementById("playground");
    if (!section) {
      section = document.createElement("section");
      section.id = "playground";
      section.className = "playground-section";
      sourcesSection.parentNode.insertBefore(section, sourcesSection);
    }

    section.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = report.playgroundTitle || "Playgrounds";
    section.appendChild(title);

    const intro = document.createElement("p");
    intro.className = "playground-intro";
    intro.textContent = report.playgroundIntro || getDefaultPlaygroundIntro();
    section.appendChild(intro);

    const grid = document.createElement("div");
    grid.className = "playgrounds-grid";
    section.appendChild(grid);

    const helpers = { formatNumber, formatInt, clamp };

    definitions.forEach((definition, index) => {
      const card = document.createElement("article");
      card.className = "play-card";
      grid.appendChild(card);

      const titleRow = document.createElement("div");
      titleRow.className = "play-title-row";
      card.appendChild(titleRow);

      const h3 = document.createElement("h3");
      h3.textContent = definition.title || `Simulador ${index + 1}`;
      titleRow.appendChild(h3);

      if (definition.methodology) {
        const infoTip = document.createElement("button");
        infoTip.type = "button";
        infoTip.className = "info-tip";
        infoTip.setAttribute("aria-label", `Metodologia de ${definition.title || `simulador ${index + 1}`}`);
        infoTip.setAttribute("data-tip", definition.methodology);
        infoTip.textContent = "?";
        titleRow.appendChild(infoTip);
      }

      if (definition.description) {
        const description = document.createElement("p");
        description.textContent = definition.description;
        card.appendChild(description);
      }

      if (definition.methodologyShort) {
        const method = document.createElement("p");
        method.className = "play-method";
        method.textContent = `Metodologia: ${definition.methodologyShort}`;
        card.appendChild(method);
      }

      const controlsHost = document.createElement("div");
      controlsHost.className = "control-grid";
      card.appendChild(controlsHost);

      const controlBindings = [];
      (definition.controls || []).forEach((control) => {
        const label = document.createElement("label");
        label.textContent = control.label || control.id;

        const input = document.createElement("input");
        input.type = control.type || "range";
        if (control.min !== undefined) input.min = String(control.min);
        if (control.max !== undefined) input.max = String(control.max);
        if (control.step !== undefined) input.step = String(control.step);
        if (control.value !== undefined) input.value = String(control.value);
        if (input.type === "number") {
          input.inputMode = "decimal";
        }

        const output = control.showOutput === false ? null : document.createElement("output");
        if (output) output.htmlFor = control.id;

        label.appendChild(input);
        if (output) label.appendChild(output);
        controlsHost.appendChild(label);

        controlBindings.push({ control, input, output });
      });

      const resultBox = document.createElement("div");
      resultBox.className = "results";
      card.appendChild(resultBox);

      const update = () => {
        const state = {};
        controlBindings.forEach(({ control, input }) => {
          state[control.id] = Number(input.value);
        });

        controlBindings.forEach(({ control, output }) => {
          if (!output) return;
          if (typeof control.display === "function") {
            output.textContent = control.display(state[control.id], helpers, state);
          } else if (control.type === "number") {
            output.textContent = String(state[control.id]);
          } else {
            output.textContent = `${formatNumber(state[control.id])}`;
          }
        });

        try {
          const payload = typeof definition.compute === "function" ? definition.compute(state, helpers) : null;
          if (!payload) {
            resultBox.innerHTML =
              '<p style="margin:0; font-size:0.84rem; color:#4c4639;">Ajusta los controles para ver resultados.</p>';
            return;
          }

          const kpis = Array.isArray(payload.kpis) ? payload.kpis : [];
          const kpiMarkup = kpis
            .map((item) => {
              const value =
                typeof item.value === "number"
                  ? formatNumber(item.value, item.decimals !== undefined ? item.decimals : 1)
                  : String(item.value ?? "-");
              const style = item.color ? ` style="color:${item.color};"` : "";
              return `
                <div class="kpi-box">
                  <span class="value"${style}>${value}</span>
                  <span class="desc">${item.desc || ""}</span>
                </div>
              `;
            })
            .join("");

          const hasThermometer =
            payload.thermometer &&
            typeof payload.thermometer === "object" &&
            Number.isFinite(Number(payload.thermometer.value));

          const thermometerMarkup = hasThermometer
            ? `
              <div class="thermometer" aria-label="${payload.thermometer.ariaLabel || "Indicador sintetico"}">
                <div style="width:${clamp(Number(payload.thermometer.value), 0, 100).toFixed(0)}%; background:${payload.thermometer.color || "#f3c400"};"></div>
              </div>
            `
            : "";

          const narrativeMarkup = payload.narrative
            ? `<p style="margin:0.55rem 0 0; font-size:0.84rem; color:#4c4639;">${payload.narrative}</p>`
            : "";
          const noteMarkup = payload.note
            ? `<p style="margin:0.35rem 0 0; font-size:0.78rem; color:#5e584b;">${payload.note}</p>`
            : "";

          resultBox.innerHTML = `
            <div class="kpi-row">${kpiMarkup}</div>
            ${thermometerMarkup}
            ${narrativeMarkup}
            ${noteMarkup}
          `;
        } catch (error) {
          resultBox.innerHTML =
            '<p style="margin:0; font-size:0.84rem; color:#7a2017;">No se pudo calcular este simulador con los valores actuales.</p>';
          console.error("Playground computation error:", error);
        }
      };

      controlBindings.forEach(({ input }) => {
        input.addEventListener("input", update);
        input.addEventListener("change", update);
      });

      update();
    });
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
    if (pdfLink && !document.querySelector(".hero .home-link")) {
      const homeLink = document.createElement("a");
      homeLink.className = "pdf-link home-link";
      homeLink.href = getCatalogHomeHref();
      homeLink.textContent = "Volver a Informes";
      pdfLink.insertAdjacentElement("afterend", homeLink);
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
    renderPlaygrounds();
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
