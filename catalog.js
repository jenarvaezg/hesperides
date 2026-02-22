(() => {
  const statusEl = document.getElementById("catalog-status");
  const metricsEl = document.getElementById("catalog-metrics");
  const centerOrder = [
    "paradoja-inmobiliaria-2026",
    "sistemas-pensiones-comparados-2025",
    "insostenibilidad-seguridad-social-2025",
    "informe-dia-d-pensiones-2025",
    "reformas-seguridad-social-2025",
    "radiografia-vivienda-espana-2025",
    "turismo-vivienda-canarias-2025"
  ];

  const REPORT_HIGHLIGHTS = {
    "paradoja-inmobiliaria-2026": {
      highlight: "El margen neto del promotor ha caido al -0,1%",
      content: "18 graficos",
    },
    "sistemas-pensiones-comparados-2025": {
      highlight: "Espana: 13,2% del PIB en pensiones, el mayor de la UE",
      content: "32 graficos",
    },
    "insostenibilidad-seguridad-social-2025": {
      highlight: "El Fondo de Reserva cayo un 89%: de 72.900M a 8.100M EUR",
      content: "15 graficos",
    },
    "informe-dia-d-pensiones-2025": {
      highlight: "La tasa de fertilidad (1,12) es la mitad del reemplazo",
      content: "20 graficos",
    },
    "reformas-seguridad-social-2025": {
      highlight: "5 grandes reformas desde 1985, ninguna freno el gasto",
      content: "3 graficos",
    },
    "radiografia-vivienda-espana-2025": {
      highlight: "8,3 anos de salario para ahorrar la entrada de un piso",
      content: "30 graficos",
    },
    "turismo-vivienda-canarias-2025": {
      highlight: "Deficit de 7.000 viviendas frente a 60.000 plazas vacacionales",
      content: "16 graficos",
    },
  };

  const CIFRAS_DATA = [
    { cifra: "95,7%", texto: "Del suelo espanol no esta disponible para construir vivienda", reportId: "paradoja-inmobiliaria-2026" },
    { cifra: "8,3 anos", texto: "De salario integro para ahorrar la entrada de un piso", reportId: "radiografia-vivienda-espana-2025" },
    { cifra: "2,3:1", texto: "Cotizantes por cada pensionista, y la ratio sigue cayendo", reportId: "informe-dia-d-pensiones-2025" },
    { cifra: "-89%", texto: "Caida del Fondo de Reserva de la Seguridad Social desde 2011", reportId: "insostenibilidad-seguridad-social-2025" },
    { cifra: "13,2% PIB", texto: "Gasto en pensiones — el mayor esfuerzo publico de la UE", reportId: "sistemas-pensiones-comparados-2025" },
    { cifra: "+35% vs +0,7%", texto: "Vivienda vacacional vs residencial en Canarias (2020–2023)", reportId: "turismo-vivienda-canarias-2025" },
  ];

  const formatDate = (rawDate) => {
    const value = String(rawDate || "").trim();
    if (!value) return "Fecha no disponible";

    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });
  };

  const getSiteBasePath = () => {
    const { pathname } = window.location;
    const lastSegment = pathname.split("/").filter(Boolean).pop() || "";
    const hasExtension = lastSegment.includes(".");

    if (pathname.endsWith("/")) return pathname;
    if (!hasExtension) return `${pathname}/`;

    const slashIndex = pathname.lastIndexOf("/");
    return pathname.slice(0, slashIndex + 1);
  };

  const stripKnownRepoPrefix = (path, currentRepo) => {
    let normalized = String(path || "").trim().replace(/\\/g, "/");

    if (!normalized) return "/";

    normalized = normalized.replace(/^https?:\/\/[^/]+/i, "");
    if (!normalized.startsWith("/")) normalized = `/${normalized}`;

    if (currentRepo) {
      const dynamicPrefix = new RegExp(`^/${currentRepo}/`);
      normalized = normalized.replace(dynamicPrefix, "/");
    }

    normalized = normalized.replace(/^\/hesperides\//, "/");
    return normalized;
  };

  const resolveInteractiveHref = (report) => {
    const basePath = getSiteBasePath();
    const repoName = basePath.split("/").filter(Boolean)[0] || "";

    const entry = String(report.entry || "index.html");
    let manifestPath = stripKnownRepoPrefix(report.path || "/", repoName);
    if (!manifestPath.endsWith("/")) manifestPath += "/";

    const relativePath = `${manifestPath.replace(/^\/+/, "")}${entry}`.replace(/\/{2,}/g, "/");
    const baseUrl = `${window.location.origin}${basePath}`;

    return new URL(relativePath, baseUrl).pathname;
  };

  const createMetric = (kpi, label) => {
    const metric = document.createElement("article");
    metric.className = "metric-card";

    const kpiEl = document.createElement("span");
    kpiEl.className = "metric-kpi";
    kpiEl.textContent = kpi;

    const labelEl = document.createElement("span");
    labelEl.className = "metric-label";
    labelEl.textContent = label;

    metric.appendChild(kpiEl);
    metric.appendChild(labelEl);

    return metric;
  };

  const normalizeTopicText = (value) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const classifyTopic = (report) => {
    const text = normalizeTopicText(`${report.title || ""} ${report.subtitle || ""}`);
    if (/(pension|seguridad social|baby boom)/.test(text)) return "pensiones";
    if (/(vivienda|alquiler|turismo|inmobili)/.test(text)) return "vivienda";
    return "otros";
  };

  const renderMetrics = () => {
    const kpis = [
      { kpi: "1,12", label: "Hijos por mujer — la mitad del reemplazo generacional" },
      { kpi: "66.206 M", label: "Deficit basico de la Seguridad Social (EUR)" },
      { kpi: "+53%", label: "Precio vivienda vs +28% IPC (2013–2025)" },
      { kpi: "423.000", label: "Deficit habitacional estimado en Espana" },
    ];

    metricsEl.innerHTML = "";
    kpis.forEach(({ kpi, label }) => {
      metricsEl.appendChild(createMetric(kpi, label));
    });
  };

  const renderCifras = (reports) => {
    const cifrasGridEl = document.getElementById("cifras-grid");
    if (!cifrasGridEl) return;

    const reportMap = new Map(reports.map((r) => [r.id, r]));

    cifrasGridEl.innerHTML = "";
    CIFRAS_DATA.forEach(({ cifra, texto, reportId }) => {
      const report = reportMap.get(reportId);

      const card = document.createElement("a");
      card.className = "cifra-card";
      card.href = report ? resolveInteractiveHref(report) : "#";

      const cifraEl = document.createElement("span");
      cifraEl.className = "cifra-value";
      cifraEl.textContent = cifra;

      const textoEl = document.createElement("span");
      textoEl.className = "cifra-text";
      textoEl.textContent = texto;

      card.appendChild(cifraEl);
      card.appendChild(textoEl);
      cifrasGridEl.appendChild(card);
    });
  };

  const buildCard = (report) => {
    const card = document.createElement("article");
    card.className = "report-card";

    const date = document.createElement("p");
    date.className = "report-date";
    date.textContent = `Publicado: ${formatDate(report.publishedAt)}`;

    const title = document.createElement("h3");
    title.textContent = report.title || "Informe";

    const subtitle = document.createElement("p");
    subtitle.className = "report-subtitle";
    subtitle.textContent = report.subtitle || "";

    card.appendChild(date);
    card.appendChild(title);
    card.appendChild(subtitle);

    const info = REPORT_HIGHLIGHTS[report.id];
    if (info) {
      const highlight = document.createElement("p");
      highlight.className = "report-highlight";
      highlight.textContent = info.highlight;

      const badge = document.createElement("span");
      badge.className = "report-badge";
      badge.textContent = info.content;

      card.appendChild(highlight);
      card.appendChild(badge);
    }

    const actions = document.createElement("div");
    actions.className = "report-actions";

    const interactiveLink = document.createElement("a");
    interactiveLink.className = "btn btn-primary";
    interactiveLink.href = resolveInteractiveHref(report);
    interactiveLink.textContent = "Abrir interactivo";

    actions.appendChild(interactiveLink);

    if (report.reportUrl) {
      const sourceLink = document.createElement("a");
      sourceLink.className = "btn btn-secondary";
      sourceLink.href = report.reportUrl;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      sourceLink.textContent = "Fuente original";
      actions.appendChild(sourceLink);
    }

    card.appendChild(actions);

    return card;
  };

  const renderCards = (reports) => {
    const viviendaGrid = document.getElementById("reports-grid-vivienda");
    const pensionesGrid = document.getElementById("reports-grid-pensiones");

    if (viviendaGrid) viviendaGrid.innerHTML = "";
    if (pensionesGrid) pensionesGrid.innerHTML = "";

    reports.forEach((report) => {
      const topic = classifyTopic(report);
      const card = buildCard(report);

      if (topic === "vivienda" && viviendaGrid) {
        viviendaGrid.appendChild(card);
      } else if (pensionesGrid) {
        pensionesGrid.appendChild(card);
      }
    });
  };

  const compareByCenterOrder = (a, b) => {
    const aIndex = centerOrder.indexOf(a.id);
    const bIndex = centerOrder.indexOf(b.id);
    const safeA = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
    const safeB = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;

    if (safeA !== safeB) return safeA - safeB;

    const aDate = a.publishedAt || "";
    const bDate = b.publishedAt || "";
    return bDate.localeCompare(aDate);
  };

  async function loadCatalog() {
    try {
      const response = await fetch("./reports/manifest.json", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`No se pudo cargar manifest.json (${response.status})`);
      }

      const manifest = await response.json();
      const reports = Array.isArray(manifest.reports) ? manifest.reports.slice() : [];

      reports.sort(compareByCenterOrder);
      renderMetrics();
      renderCifras(reports);
      renderCards(reports);

      const dates = reports
        .map((r) => r.publishedAt)
        .filter(Boolean)
        .map((d) => new Date(`${d}T00:00:00`))
        .filter((d) => !Number.isNaN(d.getTime()))
        .sort((a, b) => b - a);

      const latestDateLabel = dates.length
        ? dates[0].toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })
        : "fecha no disponible";

      statusEl.textContent = `${reports.length} informes · ultima publicacion: ${latestDateLabel}`;
    } catch (error) {
      metricsEl.innerHTML = "";
      const viviendaGrid = document.getElementById("reports-grid-vivienda");
      if (viviendaGrid) {
        viviendaGrid.innerHTML =
          '<article class="report-card"><h3>Error cargando el catalogo</h3><p class="report-subtitle">No se pudo leer <code>reports/manifest.json</code>. Revisa la ruta y vuelve a cargar.</p></article>';
      }
      statusEl.textContent = "Error";
      console.error(error);
    }
  }

  loadCatalog();
})();
