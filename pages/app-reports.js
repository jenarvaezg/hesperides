(() => {
  const report = window.REPORT_DATA;
  if (!report) {
    return;
  }

  const chartInstances = [];
  let chapterObserver = null;
  const VIEW_MODE_STORAGE_KEY = "hesperides-report-view-mode";
  const VIEW_MODE_MIXED = "mixed";
  const VIEW_MODE_CHARTS = "charts";
  let currentViewMode = VIEW_MODE_MIXED;
  let liveTextBlocksByChapter = {};
  let liveTextFootnotesByChapter = {};
  let liveTextGlobalFootnotes = {};
  let viewToggleButton = null;

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

  function resolveTextSourceUrl(rawPath) {
    const value = String(rawPath || "").trim();
    if (!value) return value;
    if (/^(https?:)?\/\//i.test(value)) return value;
    if (value.startsWith("/")) return value;
    const base = getRepoBasePath().replace(/\/+$/, "/");
    return `${base}${value.replace(/^\/+/, "")}`;
  }

  function readViewModePreference() {
    try {
      const saved = window.localStorage.getItem(VIEW_MODE_STORAGE_KEY);
      if (saved === VIEW_MODE_MIXED || saved === VIEW_MODE_CHARTS) {
        return saved;
      }
    } catch (error) {
      // Ignore storage access errors.
    }
    return VIEW_MODE_MIXED;
  }

  function saveViewModePreference(mode) {
    try {
      window.localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
    } catch (error) {
      // Ignore storage access errors.
    }
  }

  function normalizeLookup(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function isHeadingLikeLine(line) {
    const headingPattern =
      /^(?:[0-9]+(?:\.[0-9]+)*[.)-]?\s+.+|resumen ejecutivo|introduccion|introducción|primera parte|segunda parte|tercera parte|conclusiones?|agradecimiento|referencias?|bibliografia|bibliografía)$/i;
    return headingPattern.test(String(line || "").trim());
  }

  function isPotentialFootnoteDefinitionLine(line) {
    const trimmed = String(line || "").trim();
    if (!trimmed) return null;

    const match = trimmed.match(/^([1-9]\d?)\s+(.+)$/);
    if (!match) return null;
    if (trimmed.startsWith(`${match[1]}.`)) return null;

    const number = Number(match[1]);
    if (!Number.isFinite(number) || number < 1 || number > 40) return null;

    const content = match[2].trim();
    if (!content || content.length < 10) return null;

    const normalized = normalizeLookup(content);
    const strongSignals =
      /(?:https?:\/\/|www\.|disponible en|ver |para mas informacion|para más informacion|para más información|enlace|doi|ley)/i;

    if (!strongSignals.test(normalized) && content.length < 46) return null;
    if (isHeadingLikeLine(content)) return null;

    return { number, content };
  }

  function collectFootnoteDefinitionsFromLines(lines) {
    const definitions = {};
    const consumedIndices = new Set();

    for (let index = 0; index < lines.length; index += 1) {
      const candidate = isPotentialFootnoteDefinitionLine(lines[index]);
      if (!candidate) continue;

      const parts = [candidate.content];
      consumedIndices.add(index);

      for (let lookahead = index + 1; lookahead < lines.length; lookahead += 1) {
        const nextLine = String(lines[lookahead] || "").trim();
        if (!nextLine) {
          consumedIndices.add(lookahead);
          index = lookahead;
          break;
        }
        if (isHeadingLikeLine(nextLine)) break;
        if (isPotentialFootnoteDefinitionLine(nextLine)) break;
        if (/^(grafico|gráfico|tabla)\s+[0-9]{1,3}$/i.test(nextLine)) break;

        parts.push(nextLine);
        consumedIndices.add(lookahead);
        index = lookahead;
      }

      definitions[candidate.number] = parts.join(" ").replace(/\s+/g, " ").trim();
    }

    return { definitions, consumedIndices };
  }

  function cleanSourceTextLines(rawText) {
    const withoutCarriage = String(rawText || "").replace(/\r/g, "").replace(/\f/g, "\n");
    const lines = withoutCarriage.split("\n").map((line) => line.replace(/\s+/g, " ").trim());

    const skipLinePatterns = [
      /^centro$/i,
      /^ruth richardson$/i,
      /^hesperides\.edu\.es$/i,
      /^\d+$/,
      /^las reformas de la seguridad social en espana: un desequilibrio permanente$/i
    ];

    const filtered = lines.filter((line) => !skipLinePatterns.some((pattern) => pattern.test(line)));
    const merged = [];

    for (let index = 0; index < filtered.length; index += 1) {
      let line = filtered[index];

      while (line && line.endsWith("-") && index + 1 < filtered.length && filtered[index + 1]) {
        line = `${line.slice(0, -1)}${filtered[index + 1]}`;
        index += 1;
      }

      merged.push(line);
    }

    const compacted = [];
    merged.forEach((line) => {
      if (!line) {
        if (compacted.length && compacted[compacted.length - 1] !== "") {
          compacted.push("");
        }
        return;
      }
      compacted.push(line);
    });

    return compacted;
  }

  function findLineIndexByMarker(lines, marker, fromIndex = 0) {
    const target = normalizeLookup(marker);
    if (!target) return -1;

    for (let index = fromIndex; index < lines.length; index += 1) {
      if (normalizeLookup(lines[index]).includes(target)) {
        return index;
      }
    }

    return -1;
  }

  function linesToTextBlocks(lines) {
    const blocks = [];
    let currentParagraph = [];
    const headingPattern =
      /^(?:[0-9]+(?:\.[0-9]+)*[.)-]?\s+.+|resumen ejecutivo|introduccion|introducción|primera parte|segunda parte|tercera parte|conclusiones?|agradecimiento|referencias?)$/i;
    const bulletPattern = /^[•*-]\s*/;

    const flushParagraph = () => {
      if (!currentParagraph.length) return;
      blocks.push({
        type: "paragraph",
        text: currentParagraph.join(" ")
      });
      currentParagraph = [];
    };

    lines.forEach((line) => {
      if (!line) {
        flushParagraph();
        return;
      }

      if (headingPattern.test(line)) {
        flushParagraph();
        const numberMatch = line.match(/^\s*([0-9]+(?:\.[0-9]+)*)[.)-]?\s+/);
        const headingLevel = numberMatch ? Math.min(4, numberMatch[1].split(".").length + 1) : 2;
        blocks.push({
          type: "heading",
          text: line,
          level: headingLevel
        });
        return;
      }

      if (bulletPattern.test(line)) {
        flushParagraph();
        blocks.push({
          type: "bullet",
          text: line.replace(bulletPattern, "")
        });
        return;
      }

      currentParagraph.push(line);
    });

    flushParagraph();
    return blocks;
  }

  function stripNumericHeadingPrefix(text) {
    return String(text || "")
      .replace(/^\s*[0-9]+(?:\.[0-9]+)*[.)-]?\s+/, "")
      .trim();
  }

  function registerFootnoteReference(number, context) {
    const value = Number(number);
    if (!Number.isFinite(value) || value < 1 || value > 40) return null;

    if (!context.seen.has(value)) {
      context.seen.add(value);
      context.order.push(value);
    }

    return value;
  }

  function renderInlineFootnoteReferences(text, footnoteContext) {
    const rawText = String(text || "");
    const pattern =
      /(\b\d{4})([1-9]\d?)\.(?=\s|$|[,:;!?])|([A-Za-zÁÉÍÓÚÜÑáéíóúüñ)\]])([1-9]\d?)\.(?=\s|$|[,:;!?])|(^|\s)([1-9]\d?)\.(?=\s|$|[,:;!?])/g;

    const shouldIgnoreByContext = (matchStartIndex) => {
      const leftContext = normalizeLookup(rawText.slice(Math.max(0, matchStartIndex - 40), matchStartIndex));
      return /\b(grafico|grafica|tabla|figura|seccion|capitulo|pagina|ano|punto)\s*$/.test(leftContext);
    };

    let html = "";
    let cursor = 0;
    let match;

    while ((match = pattern.exec(rawText)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      html += escapeHtml(rawText.slice(cursor, start));

      let prefix = "";
      let refNumber = null;

      if (match[1] && match[2]) {
        prefix = match[1];
        refNumber = match[2];
      } else if (match[3] && match[4]) {
        prefix = match[3];
        refNumber = match[4];
      } else {
        if (shouldIgnoreByContext(start)) {
          html += escapeHtml(match[0]);
          cursor = end;
          continue;
        }
        prefix = match[5] || "";
        refNumber = match[6];
      }

      html += escapeHtml(prefix);
      const resolved = registerFootnoteReference(refNumber, footnoteContext);
      if (resolved) {
        html += `<sup class="footnote-ref">[${resolved}]</sup>`;
      } else {
        html += escapeHtml(match[0]);
      }

      cursor = end;
    }

    html += escapeHtml(rawText.slice(cursor));
    return html;
  }

  function createChapterFootnoteContext(chapterId) {
    return {
      definitions: {
        ...(liveTextGlobalFootnotes || {}),
        ...(liveTextFootnotesByChapter[chapterId] || {})
      },
      seen: new Set(),
      order: []
    };
  }

  function renderChapterFootnotes(footnoteContext, chapterContainer) {
    if (!footnoteContext || !Array.isArray(footnoteContext.order) || !footnoteContext.order.length) return;

    const wrapper = document.createElement("section");
    wrapper.className = "chapter-footnotes";

    const title = document.createElement("h3");
    title.textContent = "Notas al pie";
    wrapper.appendChild(title);

    const list = document.createElement("ol");
    footnoteContext.order.forEach((number) => {
      const item = document.createElement("li");
      const text =
        footnoteContext.definitions[number] ||
        "Nota del informe original: contenido de nota no disponible en la extracción textual.";

      item.innerHTML = `<span class="footnote-label">[${number}]</span> ${escapeHtml(text)}`;
      list.appendChild(item);
    });

    wrapper.appendChild(list);
    chapterContainer.appendChild(wrapper);
  }

  function extractChartReference(text) {
    const normalized = normalizeLookup(text);
    const match = normalized.match(/^(grafico|grafica|tabla)\s*([0-9]{1,3})\b/);
    if (!match) return null;

    return {
      kind: match[1].startsWith("tabla") ? "tabla" : "grafico",
      number: Number(match[2])
    };
  }

  function getChartReferenceFromTitle(title) {
    const normalized = normalizeLookup(title);
    const match = normalized.match(/(grafico|grafica|tabla)\s*([0-9]{1,3})\b/);
    if (!match) return null;

    return {
      kind: match[1].startsWith("tabla") ? "tabla" : "grafico",
      number: Number(match[2])
    };
  }

  function buildChartReferenceKey(reference) {
    if (!reference || !Number.isFinite(reference.number)) return null;
    return `${reference.kind}-${reference.number}`;
  }

  function cleanChapterTextBlocks(blocks, chapterTitle) {
    if (!Array.isArray(blocks) || !blocks.length) return [];

    const chapterComparable = normalizeLookup(stripNumericHeadingPrefix(chapterTitle));
    let removedDuplicateHeading = false;

    return blocks.filter((block) => {
      if (!block || !block.text) return false;

      if (!removedDuplicateHeading && block.type === "heading") {
        const headingComparable = normalizeLookup(stripNumericHeadingPrefix(block.text));
        if (headingComparable && headingComparable === chapterComparable) {
          removedDuplicateHeading = true;
          return false;
        }
      }

      return true;
    });
  }

  function buildChapterNarrativePlan(chapterId, chapterTitle, chapterChartIds) {
    const blocks = liveTextBlocksByChapter[chapterId];
    const empty = { beforeByChart: {}, tailBlocks: [] };
    if (!Array.isArray(blocks) || !blocks.length) return empty;

    const chartQueuesByReference = {};
    const orderedChartIds = Array.isArray(chapterChartIds) ? chapterChartIds : [];

    orderedChartIds.forEach((chartKey) => {
      const chart = report.charts && report.charts[chartKey];
      if (!chart || !chart.title) return;

      const reference = getChartReferenceFromTitle(chart.title);
      const referenceKey = buildChartReferenceKey(reference);
      if (!referenceKey) return;

      if (!chartQueuesByReference[referenceKey]) {
        chartQueuesByReference[referenceKey] = [];
      }
      chartQueuesByReference[referenceKey].push(chartKey);
    });

    const beforeByChart = {};
    const unmatchedBlocks = [];
    let pending = [];
    let hasMatchedMarker = false;

    const assignPendingToReference = (referenceKey) => {
      const cleaned = cleanChapterTextBlocks(pending, chapterTitle);
      pending = [];
      if (!cleaned.length) return;

      const queue = chartQueuesByReference[referenceKey];
      if (queue && queue.length) {
        const chartKey = queue.shift();
        beforeByChart[chartKey] = [...(beforeByChart[chartKey] || []), ...cleaned];
        hasMatchedMarker = true;
        return;
      }

      unmatchedBlocks.push(...cleaned);
    };

    blocks.forEach((block) => {
      if (!block || !block.text) return;

      const marker = extractChartReference(block.text);
      if (marker) {
        const markerKey = buildChartReferenceKey(marker);
        if (markerKey) {
          assignPendingToReference(markerKey);
          return;
        }
      }

      pending.push(block);
    });

    const trailing = cleanChapterTextBlocks(pending, chapterTitle);

    if (!hasMatchedMarker && trailing.length && orderedChartIds.length) {
      const firstChartKey = orderedChartIds[0];
      beforeByChart[firstChartKey] = [...(beforeByChart[firstChartKey] || []), ...trailing];
      return {
        beforeByChart,
        tailBlocks: unmatchedBlocks
      };
    }

    return {
      beforeByChart,
      tailBlocks: [...unmatchedBlocks, ...trailing]
    };
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

  function getAxisUnitProfile(chart) {
    const unit = String(chart.unit || "").toLowerCase();

    if (unit === "%" || unit.includes("% del pib") || unit.includes("% del empleo")) {
      return { suffix: "%", decimals: 0, integerOnly: true };
    }

    if (unit.includes("€/m²") || unit.includes("eur/m²") || unit.includes("euros")) {
      return { suffix: "", decimals: 0, integerOnly: true };
    }

    if (unit === "indice" || unit === "índice" || unit === "saldo" || unit === "percentil") {
      return { suffix: "", decimals: 0, integerOnly: true };
    }

    if (unit.includes("viviendas")) {
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
    const topRowIndex = Number.isInteger(chart.tableTopRowIndex)
      ? chart.tableTopRowIndex
      : chart.tableHighlightFirstRow === false
        ? -1
        : 0;

    rows.forEach((row, index) => {
      const tr = document.createElement("tr");
      if (index === topRowIndex) tr.classList.add("top-row");

      if (chart.tableRowClasses && chart.tableRowClasses[index]) {
        String(chart.tableRowClasses[index])
          .split(/\s+/)
          .filter(Boolean)
          .forEach((className) => tr.classList.add(className));
      }

      row.forEach((cell, cellIndex) => {
        const td = document.createElement("td");
        td.textContent = cell;

        const cellClassKeyA = `${index}:${cellIndex}`;
        const cellClassKeyB = `${index},${cellIndex}`;
        const cellClassName =
          chart.tableCellClasses && (chart.tableCellClasses[cellClassKeyA] || chart.tableCellClasses[cellClassKeyB]);
        if (cellClassName) {
          String(cellClassName)
            .split(/\s+/)
            .filter(Boolean)
            .forEach((className) => td.classList.add(className));
        }

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
    const wrapLength =
      Number.isFinite(chart.labelWrapLength) && chart.labelWrapLength > 0 ? chart.labelWrapLength : 14;
    const xLabels = (chart.x || []).map((label) =>
      chart.noWrapLabels ? String(label) : wrapCategoryLabel(label, wrapLength)
    );
    const isHorizontal = chart.orientation === "horizontal";
    const isXY = chart.coordinate === "xy";
    const defaultType = isXY ? "scatter" : chart.type === "line" ? "line" : "bar";
    const tickFormatter = axisFormatter(chart.unit);
    const xTickFormatter = axisFormatter(chart.xUnit || chart.unit);
    const yTickFormatter = axisFormatter(chart.yUnit || chart.unit);
    const tooltipFormatter = valueFormatter(chart.unit);
    const xTooltipFormatter = valueFormatter(chart.xUnit || chart.unit);
    const yTooltipFormatter = valueFormatter(chart.yUnit || chart.unit);
    const anyLineSeries = (chart.series || []).some((serie) => (serie.type || defaultType) === "line");
    const colors = (chart.series || []).map((serie) => serie.color).filter(Boolean);

    const baseSeries = (chart.series || []).map((serie) => {
      const serieType = serie.type || defaultType;
      const isLine = serieType === "line";
      const isScatter = serieType === "scatter";
      const highlightCategories = Array.isArray(chart.highlights) ? chart.highlights : [];
      const highlightedColor =
        !isLine && !isScatter && highlightCategories.length
          ? (params) => {
              const category = (chart.x || [])[params.dataIndex];
              if (highlightCategories.includes(category)) {
                if (category === "IPC") return "#2b2b2b";
                return "#d6a900";
              }
              return serie.color || "#f3c400";
            }
          : serie.color;
      const base = {
        name: serie.name,
        type: serieType,
        data: serie.data,
        emphasis: { focus: "series" },
        stack: serie.stack || chart.stack || undefined,
        yAxisIndex: Number.isInteger(serie.yAxisIndex) ? serie.yAxisIndex : 0,
        barMaxWidth: serie.barMaxWidth || chart.barMaxWidth || 28,
        smooth: isLine ? (serie.smooth !== undefined ? Boolean(serie.smooth) : true) : false,
        symbol: isLine || isScatter ? serie.symbol || "circle" : serie.symbol || "none",
        symbolSize: isLine || isScatter ? (serie.symbolSize || 6) : serie.symbolSize || 0,
        label: serie.label,
        lineStyle: serie.lineStyle,
        itemStyle: serie.itemStyle,
        tooltip: serie.tooltip
      };

      if (highlightedColor) {
        base.itemStyle = {
          ...(base.itemStyle || {}),
          color: highlightedColor
        };
        if (isLine) {
          base.lineStyle = {
            ...(base.lineStyle || {}),
            color: serie.color
          };
        }
      }

      if (!isLine && !isScatter) {
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
            color: "#4f4f4f",
            formatter: axisFormatter(axis.unit || chart.unit)
          },
          axisLine: {
            lineStyle: {
              color: "#8f8574"
            }
          },
          splitLine: {
            show: axis.position !== "right",
            lineStyle: { color: "rgba(137, 128, 106, 0.25)" }
          }
        }))
      : null;

    const option = {
      animationDuration: 400,
      color: colors.length ? colors : undefined,
      grid: {
        left: chart.gridLeft ?? (isHorizontal ? 130 : 56),
        right: chart.gridRight ?? 26,
        top: chart.gridTop ?? 28,
        bottom: chart.gridBottom ?? (xLabels.length > 8 && !isHorizontal && !isXY ? 92 : 58),
        containLabel: true
      },
      tooltip: {
        trigger: isXY ? "item" : "axis",
        backgroundColor: "rgba(23, 23, 23, 0.92)",
        borderColor: "#f3c400",
        borderWidth: 1,
        textStyle: {
          color: "#f9f9f9"
        },
        axisPointer: {
          type: isXY || anyLineSeries ? "cross" : "shadow"
        },
        formatter: (params) => {
          if (isXY) {
            const item = Array.isArray(params) ? params[0] : params;
            const point = Array.isArray(item.value)
              ? item.value
              : Array.isArray(item.data && item.data.value)
                ? item.data.value
                : [item.value, null];
            const label = item.data && item.data.name ? item.data.name : item.seriesName;
            return [
              `<strong>${escapeHtml(label || "")}</strong>`,
              `${escapeHtml(chart.xLabel || "X")}: ${xTooltipFormatter(point[0])}`,
              `${escapeHtml(chart.yLabel || "Y")}: ${yTooltipFormatter(point[1])}`
            ].join("<br>");
          }
          const items = Array.isArray(params) ? params : [params];
          const lines = [`<strong>${items[0].axisValueLabel}</strong>`];
          items.forEach((item) => {
            lines.push(`${item.marker} ${item.seriesName}: ${tooltipFormatter(item.value)}`);
          });
          return lines.join("<br>");
        }
      },
      legend: {
        show: typeof chart.showLegend === "boolean" ? chart.showLegend : (chart.series || []).length > 1,
        top: 0,
        left: "left",
        textStyle: {
          color: "#3f3a2f",
          fontFamily: "IBM Plex Sans"
        }
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
      xAxis: isXY
        ? {
            type: "value",
            min: chart.xMin,
            max: chart.xMax,
            name: chart.xAxisName || chart.xLabel || undefined,
            nameLocation: "middle",
            nameGap: chart.xAxisNameGap || 34,
            nameTextStyle: {
              color: "#4f4f4f",
              fontSize: 11,
              fontWeight: 600
            },
            axisLabel: {
              color: "#4f4f4f",
              formatter: xTickFormatter
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
        : isHorizontal
          ? {
              type: "value",
              axisLabel: {
                color: "#4f4f4f",
                formatter: tickFormatter
              },
              axisLine: {
                lineStyle: {
                  color: "#8f8574"
                }
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(137, 128, 106, 0.25)"
                }
              },
              min: chart.min,
              max: chart.max
            }
          : {
              type: "category",
              data: xLabels,
              axisLabel: {
                color: "#4f4f4f",
                interval: chart.xLabelInterval === undefined ? 0 : chart.xLabelInterval,
                rotate: chart.xLabelRotate || 0,
                fontSize: chart.xLabelFontSize || 11,
                hideOverlap: true,
                lineHeight: 14
              },
              axisLine: {
                lineStyle: {
                  color: "#8f8574"
                }
              },
              axisTick: { alignWithLabel: true }
            },
      yAxis: yAxisOption || (isXY
        ? {
            type: "value",
            min: chart.min,
            max: chart.max,
            name: chart.yAxisName || chart.yLabel || undefined,
            nameLocation: "middle",
            nameGap: chart.yAxisNameGap || 52,
            nameRotate: 90,
            nameTextStyle: {
              color: "#4f4f4f",
              fontSize: 11,
              fontWeight: 600
            },
            axisLabel: {
              color: "#4f4f4f",
              formatter: yTickFormatter
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
        : isHorizontal
          ? {
              type: "category",
              data: xLabels,
              inverse: Boolean(chart.yAxisInverse),
              axisLabel: {
                color: "#4f4f4f",
                interval: 0,
                fontSize: chart.yLabelFontSize || 11,
                hideOverlap: true,
                lineHeight: 14
              },
              axisLine: {
                lineStyle: {
                  color: "#8f8574"
                }
              }
            }
          : {
              type: "value",
              axisLabel: {
                color: "#4f4f4f",
                formatter: tickFormatter
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
              },
              min: chart.min,
              max: chart.max
            }),
      series: baseSeries
    };

    if (chart.dataZoom) {
      option.dataZoom = chart.dataZoom;
    } else if ((chart.x || []).length > 10 && !isHorizontal && !isXY) {
      option.dataZoom = [{ type: "inside" }];
    }

    if (Array.isArray(chart.markAreas) && chart.markAreas.length > 0 && baseSeries.length > 0) {
      baseSeries[0].markArea = {
        silent: true,
        itemStyle: {
          color: "rgba(243, 196, 0, 0.14)"
        },
        data: chart.markAreas.map((area) => {
          if (isXY) {
            return [{ xAxis: area.from }, { xAxis: area.to }];
          }
          return [{ xAxis: area.from }, { xAxis: area.to }];
        })
      };
    }

    if (chart.zeroLine && baseSeries.length > 0) {
      baseSeries[0].markLine = {
        symbol: "none",
        lineStyle: {
          color: "#7c7468",
          type: "dashed"
        },
        data: [isHorizontal ? { xAxis: 0 } : { yAxis: 0 }]
      };
    }

    if (
      isXY &&
      baseSeries.length > 0 &&
      ((Array.isArray(chart.eventLinesX) && chart.eventLinesX.length > 0) ||
        (Array.isArray(chart.eventLinesY) && chart.eventLinesY.length > 0))
    ) {
      const xLines = (chart.eventLinesX || []).map((eventLine) => ({
        name: eventLine.label,
        xAxis: eventLine.x,
        lineStyle: {
          color: eventLine.color || "#d26d6d",
          type: "dashed"
        }
      }));
      const yLines = (chart.eventLinesY || []).map((eventLine) => ({
        name: eventLine.label,
        yAxis: eventLine.y,
        lineStyle: {
          color: eventLine.color || "#d26d6d",
          type: "dashed"
        }
      }));

      baseSeries[0].markLine = {
        ...(baseSeries[0].markLine || {}),
        symbol: "none",
        label: {
          formatter: (params) => params.name,
          color: "#6e4f4f",
          fontSize: 10,
          backgroundColor: "rgba(255,255,255,0.78)",
          padding: [2, 4]
        },
        data: [...xLines, ...yLines]
      };
    } else if (Array.isArray(chart.eventLines) && chart.eventLines.length > 0 && baseSeries.length > 0) {
      baseSeries[0].markLine = {
        ...(baseSeries[0].markLine || {}),
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
        data: chart.eventLines.map((eventLine) => ({
          name: eventLine.label,
          xAxis: eventLine.x
        }))
      };
    }

    return option;
  }

  function renderSmallMultiplesChart(chart, host) {
    const container = document.createElement("div");
    container.className = "chart-canvas chart-canvas--multiples";
    if (Number.isInteger(chart.smallMultiplesColumns) && chart.smallMultiplesColumns > 0) {
      container.style.gridTemplateColumns = `repeat(${chart.smallMultiplesColumns}, minmax(0, 1fr))`;
    }
    host.appendChild(container);

    const allValues = (chart.series || []).flatMap((serie) => serie.data || []);
    if (!allValues.length) return;

    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const yPadding = Math.max(2, (maxValue - minValue) * 0.1);
    const axisPreset = chart.smallMultiplesAxis || {};
    const yMin = axisPreset.yMin ?? Math.floor((minValue - yPadding) / 5) * 5;
    const yMax = axisPreset.yMax ?? Math.ceil((maxValue + yPadding) / 5) * 5;
    const yInterval = axisPreset.yInterval ?? null;
    const tickIndices = new Set(
      Array.isArray(axisPreset.xTickIndices)
        ? axisPreset.xTickIndices
        : [0, Math.floor(((chart.x || []).length - 1) / 2), (chart.x || []).length - 1]
    );
    const labelMap = axisPreset.xLabelMap || {};

    (chart.series || []).forEach((serie) => {
      const serieType = chart.smallMultiplesType || serie.type || "line";
      const isBar = serieType === "bar";
      const panelMin = typeof serie.min === "number" ? serie.min : yMin;
      const panelMax = typeof serie.max === "number" ? serie.max : yMax;
      const panelInterval = typeof serie.interval === "number" ? serie.interval : yInterval;
      const panel = document.createElement("div");
      panel.className = "mini-chart-canvas";
      container.appendChild(panel);

      const instance = echarts.init(panel, null, { renderer: "canvas" });
      chartInstances.push(instance);

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
          valueFormatter: (value) => formatAxisTick(value, chart)
        },
        title: {
          text: serie.name,
          left: 8,
          top: 4,
          textStyle: {
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "IBM Plex Sans",
            color: "#3f3a2f"
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
          boundaryGap: isBar,
          data: chart.x,
          axisLabel: {
            color: "#4f4f4f",
            fontSize: 10,
            interval: 0,
            hideOverlap: true,
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
          min: panelMin,
          max: panelMax,
          interval: panelInterval === null ? undefined : panelInterval,
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
          ...(isBar
            ? [
                {
                  name: serie.name,
                  type: "bar",
                  data: serie.data,
                  barMaxWidth: 14,
                  itemStyle: {
                    color: serie.color,
                    borderRadius: [4, 4, 0, 0]
                  }
                }
              ]
            : serie.splitAreaByZero
              ? [
                  {
                    type: "line",
                    data: (serie.data || []).map((value) => (value > 0 ? value : null)),
                    smooth: 0.15,
                    symbol: "none",
                    lineStyle: { opacity: 0 },
                    areaStyle: { color: serie.positiveAreaColor || "rgba(170,170,170,0.32)" },
                    stack: `split-${serie.name}`
                  },
                  {
                    type: "line",
                    data: (serie.data || []).map((value) => (value < 0 ? value : null)),
                    smooth: 0.15,
                    symbol: "none",
                    lineStyle: { opacity: 0 },
                    areaStyle: { color: serie.negativeAreaColor || "rgba(243,196,0,0.25)" },
                    stack: `split-${serie.name}`
                  },
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
              : [
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
                ])
        ]
      });
    });
  }

  function renderChart(chart, host) {
    if (chart.renderAs === "small-multiples") {
      renderSmallMultiplesChart(chart, host);
      return;
    }

    const canvas = document.createElement("div");
    canvas.className = "chart-canvas";
    if (Number.isFinite(chart.height) && chart.height > 120) {
      canvas.style.height = `${chart.height}px`;
    }
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

  function getViewToggleLabel() {
    return currentViewMode === VIEW_MODE_MIXED ? "Mostrar solo graficas" : "Mostrar graficas + texto";
  }

  function syncViewModeUI() {
    document.body.classList.toggle("view-mode-charts", currentViewMode === VIEW_MODE_CHARTS);
    if (viewToggleButton) {
      viewToggleButton.textContent = getViewToggleLabel();
      viewToggleButton.setAttribute("aria-pressed", currentViewMode === VIEW_MODE_CHARTS ? "true" : "false");
    }
  }

  function toggleViewMode() {
    currentViewMode = currentViewMode === VIEW_MODE_MIXED ? VIEW_MODE_CHARTS : VIEW_MODE_MIXED;
    saveViewModePreference(currentViewMode);
    syncViewModeUI();
  }

  function renderChapterLiveText(blocks, chapterContainer, footnoteContext) {
    if (!Array.isArray(blocks) || !blocks.length) return;

    const wrapper = document.createElement("div");
    wrapper.className = "chapter-live-text";

    blocks.forEach((block) => {
      if (!block || !block.text) return;

      if (block.type === "heading") {
        const heading = document.createElement("p");
        const headingLevel = Number.isInteger(block.level) ? Math.min(Math.max(block.level, 2), 4) : 2;
        heading.className = `chapter-text-heading level-${headingLevel}`;
        heading.textContent = block.text;
        wrapper.appendChild(heading);
        return;
      }

      if (block.type === "bullet") {
        const bullet = document.createElement("p");
        bullet.className = "chapter-text-bullet";
        bullet.innerHTML = `• ${renderInlineFootnoteReferences(block.text, footnoteContext)}`;
        wrapper.appendChild(bullet);
        return;
      }

      const paragraph = document.createElement("p");
      paragraph.className = "chapter-text-paragraph";
      paragraph.innerHTML = renderInlineFootnoteReferences(block.text, footnoteContext);
      wrapper.appendChild(paragraph);
    });

    chapterContainer.appendChild(wrapper);
  }

  async function loadLiveTextContent() {
    const textConfig = report.text;
    if (!textConfig || !textConfig.sourcePath || !Array.isArray(textConfig.ranges) || !textConfig.ranges.length) {
      return;
    }

    try {
      const response = await fetch(resolveTextSourceUrl(textConfig.sourcePath), { cache: "force-cache" });
      if (!response.ok) return;

      const rawText = await response.text();
      const lines = cleanSourceTextLines(rawText);
      const chapterBlocks = {};
      const chapterFootnotes = {};
      const globalFootnoteExtraction = collectFootnoteDefinitionsFromLines(lines);
      liveTextGlobalFootnotes = globalFootnoteExtraction.definitions;
      let cursor = 0;

      textConfig.ranges.forEach((range) => {
        const chapterId = range.chapterId;
        if (!chapterId) return;

        const startIndex = range.start ? findLineIndexByMarker(lines, range.start, cursor) : cursor;
        const resolvedStart = startIndex >= 0 ? startIndex : cursor;

        let endIndex = range.end ? findLineIndexByMarker(lines, range.end, resolvedStart + 1) : lines.length;
        if (endIndex < 0 || endIndex <= resolvedStart) {
          endIndex = lines.length;
        }

        const segment = lines.slice(resolvedStart, endIndex);
        const extraction = collectFootnoteDefinitionsFromLines(segment);
        const chapterDefinitions = extraction.definitions;
        const contentLines = segment.filter((line, index) => !extraction.consumedIndices.has(index));

        chapterBlocks[chapterId] = linesToTextBlocks(contentLines);
        chapterFootnotes[chapterId] = chapterDefinitions;
        cursor = endIndex;
      });

      liveTextBlocksByChapter = chapterBlocks;
      liveTextFootnotesByChapter = chapterFootnotes;
      renderSections();
      syncViewModeUI();
    } catch (error) {
      console.error("No se pudo cargar el texto completo del informe:", error);
    }
  }

  function renderSections() {
    const chapterNav = document.getElementById("chapter-nav");
    const container = document.getElementById("report-sections");

    if (!chapterNav || !container) return;

    if (chapterObserver) {
      chapterObserver.disconnect();
      chapterObserver = null;
    }

    while (chartInstances.length) {
      const instance = chartInstances.pop();
      if (!instance) continue;
      try {
        instance.dispose();
      } catch (error) {
        // Ignore disposal issues and continue rendering.
      }
    }

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

      const chapterFootnoteContext = createChapterFootnoteContext(sectionId);
      const chapterNarrative = buildChapterNarrativePlan(sectionId, chapter.title, chapter.charts || []);

      (chapter.charts || []).forEach((chartKey) => {
        const chart = report.charts[chartKey];
        if (!chart) return;

        const narrativeBeforeChart = chapterNarrative.beforeByChart[chartKey];
        if (narrativeBeforeChart && narrativeBeforeChart.length) {
          renderChapterLiveText(narrativeBeforeChart, article, chapterFootnoteContext);
        }

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

      if (chapterNarrative.tailBlocks && chapterNarrative.tailBlocks.length) {
        renderChapterLiveText(chapterNarrative.tailBlocks, article, chapterFootnoteContext);
      }

      renderChapterFootnotes(chapterFootnoteContext, article);

      container.appendChild(article);
    });

    const links = [...chapterNav.querySelectorAll("a")];
    const sections = [...container.querySelectorAll(".chapter")];

    chapterObserver = new IntersectionObserver(
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

    sections.forEach((section) => chapterObserver.observe(section));
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
            resultBox.innerHTML = '<p class="play-result-empty">Ajusta los controles para ver resultados.</p>';
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
            ? `<p class="play-narrative">${payload.narrative}</p>`
            : "";
          const noteMarkup = payload.note
            ? `<p class="play-note">${payload.note}</p>`
            : "";

          resultBox.innerHTML = `
            <div class="kpi-row">${kpiMarkup}</div>
            ${thermometerMarkup}
            ${narrativeMarkup}
            ${noteMarkup}
          `;
        } catch (error) {
          resultBox.innerHTML =
            '<p class="play-result-error">No se pudo calcular este simulador con los valores actuales.</p>';
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
      pdfLink.className = "pdf-link";
    }

    if (pdfLink) {
      let actionRow = document.querySelector(".hero .hero-actions");
      if (!actionRow) {
        actionRow = document.createElement("div");
        actionRow.className = "hero-actions";
        pdfLink.insertAdjacentElement("afterend", actionRow);
      }

      actionRow.innerHTML = "";
      actionRow.appendChild(pdfLink);

      const homeLink = document.createElement("a");
      homeLink.className = "pdf-link home-link";
      homeLink.href = getCatalogHomeHref();
      homeLink.textContent = "Volver a Informes";
      actionRow.appendChild(homeLink);

      const hasPlaygrounds = Array.isArray(report.playgrounds) && report.playgrounds.length > 0;
      if (hasPlaygrounds) {
        const playgroundLink = document.createElement("a");
        playgroundLink.className = "pdf-link home-link";
        playgroundLink.href = "#playground";
        playgroundLink.textContent = "Ir al Playground";
        playgroundLink.addEventListener("click", (event) => {
          event.preventDefault();
          const playground = document.getElementById("playground");
          if (playground) {
            playground.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
        actionRow.appendChild(playgroundLink);
      }

      const toggleButton = document.createElement("button");
      toggleButton.type = "button";
      toggleButton.className = "pdf-link home-link hero-action-btn view-toggle-btn";
      toggleButton.addEventListener("click", toggleViewMode);
      actionRow.appendChild(toggleButton);
      viewToggleButton = toggleButton;
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

    syncViewModeUI();
  }

  function init() {
    currentViewMode = readViewModePreference();
    initHero();
    renderSections();
    renderPlaygrounds();
    renderSources();
    loadLiveTextContent();
    syncViewModeUI();

    window.addEventListener("resize", () => {
      chartInstances.forEach((instance) => instance.resize());
    });

    window.setTimeout(() => {
      chartInstances.forEach((instance) => instance.resize());
    }, 150);
  }

  init();
})();
