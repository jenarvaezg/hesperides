(() => {
  const statusEl = document.getElementById("catalog-status");
  const metricsEl = document.getElementById("catalog-metrics");
  const gridEl = document.getElementById("reports-grid");

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

  const renderMetrics = (reports) => {
    const dates = reports
      .map((report) => report.publishedAt)
      .filter(Boolean)
      .map((date) => new Date(`${date}T00:00:00`))
      .filter((date) => !Number.isNaN(date.getTime()))
      .sort((a, b) => b - a);

    const latestYear = dates.length ? String(dates[0].getFullYear()) : "-";
    const earliestYear = dates.length ? String(dates[dates.length - 1].getFullYear()) : "-";

    metricsEl.innerHTML = "";
    metricsEl.appendChild(createMetric(String(reports.length), "Informes interactivos"));
    metricsEl.appendChild(createMetric(latestYear, "Ultima publicacion"));
    metricsEl.appendChild(createMetric(`${earliestYear}-${latestYear}`, "Cobertura del catalogo"));
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

    const meta = document.createElement("p");
    meta.className = "report-meta";
    meta.textContent = `ID: ${report.id}`;

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

    card.appendChild(date);
    card.appendChild(title);
    card.appendChild(subtitle);
    card.appendChild(meta);
    card.appendChild(actions);

    return card;
  };

  const renderCards = (reports) => {
    gridEl.innerHTML = "";

    reports.forEach((report) => {
      gridEl.appendChild(buildCard(report));
    });
  };

  const compareByDateDesc = (a, b) => {
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

      reports.sort(compareByDateDesc);
      renderMetrics(reports);
      renderCards(reports);

      statusEl.textContent = `${reports.length} informes`; 
    } catch (error) {
      metricsEl.innerHTML = "";
      gridEl.innerHTML =
        '<article class="report-card"><h3>Error cargando el catalogo</h3><p class="report-subtitle">No se pudo leer <code>reports/manifest.json</code>. Revisa la ruta y vuelve a cargar.</p></article>';
      statusEl.textContent = "Error";
      console.error(error);
    }
  }

  loadCatalog();
})();
