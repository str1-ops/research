"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Report, { type SectionKey } from "./Report";
import type { ResearchReport, ResearchRequest } from "@/lib/types";

const STORAGE_KEY = "strictons-research-projects-v1";

type SavedProject = {
  id: string;
  savedAt: string;
  report: ResearchReport;
};

const loadingSteps = [
  "Reading the hotel positioning and offer",
  "Researching the surrounding destination",
  "Separating facts from strategic inference",
  "Testing partner categories for conflict",
  "Building the guide architecture and flatplan",
];

function normaliseUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : "https://" + trimmed;
}

export default function ResearchApp() {
  const [form, setForm] = useState<ResearchRequest>({
    hotelName: "",
    website: "",
    location: "",
    notes: "",
    depth: "standard",
  });
  const [report, setReport] = useState<ResearchReport | null>(null);
  const [active, setActive] = useState<SectionKey>("overview");
  const [loading, setLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<SavedProject[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showAllForPrint, setShowAllForPrint] = useState(false);

  useEffect(() => {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value) setSaved(JSON.parse(value));
    } catch {}
  }, []);

  useEffect(() => {
    if (!loading) return;
    const timer = window.setInterval(() => {
      setLoadingIndex((current) => (current + 1) % loadingSteps.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    const afterPrint = () => setShowAllForPrint(false);
    window.addEventListener("afterprint", afterPrint);
    return () => window.removeEventListener("afterprint", afterPrint);
  }, []);

  const canSubmit = useMemo(
    () => Boolean(form.hotelName.trim() && form.website.trim() && form.location.trim()),
    [form],
  );

  function persist(next: SavedProject[]) {
    setSaved(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next.slice(0, 10)));
    } catch {}
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    setLoadingIndex(0);
    setError("");

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: normaliseUrl(form.website) }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to create the research brief.");

      const nextReport = payload.report as ResearchReport;
      setReport(nextReport);
      setActive("overview");
      const project: SavedProject = {
        id: String(Date.now()) + "-" + nextReport.meta.hotelName,
        savedAt: new Date().toISOString(),
        report: nextReport,
      };
      persist([project, ...saved.filter((item) => item.report.meta.website !== nextReport.meta.website)].slice(0, 10));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong while researching the hotel.");
    } finally {
      setLoading(false);
    }
  }

  function openProject(project: SavedProject) {
    setReport(project.report);
    setActive("overview");
    setShowHistory(false);
  }

  function removeProject(id: string) {
    persist(saved.filter((item) => item.id !== id));
  }

  function exportJson() {
    if (!report) return;
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = report.meta.hotelName.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-research.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function printBrief() {
    setShowAllForPrint(true);
    window.setTimeout(() => window.print(), 120);
  }

  return (
    <main className="app-shell">
      <header className="topbar no-print">
        <button className="wordmark" onClick={() => setReport(null)} aria-label="Strictons Research home">
          <span className="wordmark-mark">S</span>
          <span><strong>STRICTONS</strong><small>RESEARCH</small></span>
        </button>
        <div className="top-actions">
          {report && <button className="text-button" onClick={() => setReport(null)}>New research</button>}
          {saved.length > 0 && <button className="text-button" onClick={() => setShowHistory(true)}>Saved briefs <span className="count">{saved.length}</span></button>}
          {report && <button className="outline-button" onClick={exportJson}>Export JSON</button>}
          {report && <button className="primary-button compact" onClick={printBrief}>Export PDF</button>}
        </div>
      </header>

      {!report ? (
        <div className="research-home">
          <section className="intro-panel">
            <div className="intro-copy">
              <p className="eyebrow">Hotel intelligence · Guide strategy</p>
              <h1>Understand the hotel before designing the guide.</h1>
              <p className="intro-deck">
                Research a property, its brand, guests, in-house offer and neighbourhood — then turn that evidence into a commercially compatible Strictons guide blueprint.
              </p>
            </div>
            <div className="method-strip">
              <div><span>01</span><p>Brand</p></div>
              <div><span>02</span><p>Guest</p></div>
              <div><span>03</span><p>Hotel</p></div>
              <div><span>04</span><p>Place</p></div>
              <div><span>05</span><p>Guide</p></div>
            </div>
          </section>

          <section className="research-form-wrap">
            <form onSubmit={submit} className="research-form">
              <div className="form-heading">
                <div><p className="eyebrow">New research brief</p><h2>Start with the property</h2></div>
                <span className="status-pill"><span className="dot" /> Live web research</span>
              </div>
              <label>
                <span>Hotel name</span>
                <input value={form.hotelName} onChange={(e) => setForm({ ...form, hotelName: e.target.value })} placeholder="e.g. The Beachcomber Hotel & Resort" autoFocus />
              </label>
              <div className="form-grid">
                <label>
                  <span>Official website</span>
                  <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://hotel.com" inputMode="url" />
                </label>
                <label>
                  <span>Location</span>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Toukley, NSW, Australia" />
                </label>
              </div>
              <label>
                <span>Context for the researcher <em>optional</em></span>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Known priorities, relationship context, categories the hotel has flagged, planned renovations…" rows={4} />
              </label>
              <div className="depth-picker">
                <button type="button" className={form.depth === "standard" ? "selected" : ""} onClick={() => setForm({ ...form, depth: "standard" })}>
                  <span>Standard</span><small>Balanced research depth and speed</small>
                </button>
                <button type="button" className={form.depth === "deep" ? "selected" : ""} onClick={() => setForm({ ...form, depth: "deep" })}>
                  <span>Deep</span><small>More searching and deeper strategic synthesis</small>
                </button>
              </div>
              {error && <div className="error-box">{error}</div>}
              <button className="primary-button submit-button" disabled={!canSubmit || loading}>
                {loading ? "Researching property…" : "Build research brief"}<span>→</span>
              </button>
            </form>

            <aside className="output-preview">
              <p className="eyebrow">One brief, eight lenses</p>
              <div className="preview-list">
                {["Strategic positioning", "Brand & visual direction", "Guest missions", "In-house offer audit", "Neighbourhood logic", "Partner category matrix", "Guide architecture", "16-page flatplan"].map((item, index) => (
                  <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>
                ))}
              </div>
              <p className="preview-note">Observed facts, strategic inferences and recommendations are labelled separately throughout the brief.</p>
            </aside>
          </section>
        </div>
      ) : (
        <Report report={report} active={active} onActiveChange={setActive} showAll={showAllForPrint} />
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="loading-card">
            <div className="research-orbit"><span /><i /></div>
            <p className="eyebrow">Research in progress</p>
            <h2>{loadingSteps[loadingIndex]}</h2>
            <p>Strictons is searching live sources and building an evidence-led brief. Deep research can take a few minutes.</p>
            <div className="progress-line"><span style={{ width: String(18 + loadingIndex * 18) + "%" }} /></div>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="modal-backdrop" onMouseDown={() => setShowHistory(false)}>
          <section className="history-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-head"><div><p className="eyebrow">Local workspace</p><h2>Saved research briefs</h2></div><button onClick={() => setShowHistory(false)}>×</button></div>
            <div className="history-list">
              {saved.map((project) => (
                <article key={project.id}>
                  <button className="history-open" onClick={() => openProject(project)}><strong>{project.report.meta.hotelName}</strong><span>{project.report.meta.location}</span><small>{new Date(project.savedAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</small></button>
                  <button className="delete-button" onClick={() => removeProject(project.id)} aria-label={"Delete " + project.report.meta.hotelName}>×</button>
                </article>
              ))}
            </div>
            <p className="modal-note">Saved briefs are stored in this browser only. Export JSON for a portable project file.</p>
          </section>
        </div>
      )}
    </main>
  );
}
