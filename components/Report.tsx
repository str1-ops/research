"use client";

import type { ResearchReport } from "@/lib/types";

type SectionKey =
  | "overview"
  | "brand"
  | "guests"
  | "hotel"
  | "neighbourhood"
  | "commercial"
  | "flatplan"
  | "sources";

const sectionLabels: Array<[SectionKey, string]> = [
  ["overview", "Overview"],
  ["brand", "Brand"],
  ["guests", "Guests"],
  ["hotel", "Hotel offer"],
  ["neighbourhood", "Neighbourhood"],
  ["commercial", "Commercial mix"],
  ["flatplan", "Guide plan"],
  ["sources", "Sources"],
];

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <span className={"badge badge-" + tone}>{children}</span>;
}

function SourceRefs({ ids, report }: { ids: string[]; report: ResearchReport }) {
  if (!ids?.length) return null;
  return (
    <span className="source-refs">
      {ids.map((id) => {
        const source = report.sources.find((item) => item.id === id);
        return source ? (
          <a key={id} href={source.url} target="_blank" rel="noreferrer" title={source.title}>
            {id}
          </a>
        ) : (
          <span key={id}>{id}</span>
        );
      })}
    </span>
  );
}

function Confidence({ basis, confidence }: { basis: string; confidence: string }) {
  const tone = basis === "OBSERVED" ? "green" : basis === "RECOMMENDED" ? "blue" : "amber";
  return (
    <span className="evidence-line">
      <Badge tone={tone}>{basis}</Badge>
      <span>{confidence.toLowerCase()} confidence</span>
    </span>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="clean-list">
      {items.map((item, index) => (
        <li key={item + "-" + index}>{item}</li>
      ))}
    </ul>
  );
}

export default function Report({
  report,
  active,
  onActiveChange,
  showAll = false,
}: {
  report: ResearchReport;
  active: SectionKey;
  onActiveChange: (key: SectionKey) => void;
  showAll?: boolean;
}) {
  return (
    <div className="report-shell">
      <aside className="report-nav no-print">
        <p className="eyebrow">Research brief</p>
        <h2>{report.meta.hotelName}</h2>
        <p className="nav-location">{report.meta.location}</p>
        <nav>
          {sectionLabels.map(([key, label]) => (
            <button key={key} className={active === key ? "active" : ""} onClick={() => onActiveChange(key)}>
              <span>{label}</span>
              <span aria-hidden>↗</span>
            </button>
          ))}
        </nav>
        <div className="nav-footnote">
          <span className="dot" />
          Evidence-led recommendations
        </div>
      </aside>

      <article className="report-content">
        <header className="report-hero print-section">
          <div>
            <p className="eyebrow">Strictons · Guide intelligence</p>
            <h1>{report.meta.hotelName}</h1>
            <p className="hero-deck">{report.executiveSummary.recommendedAngle}</p>
          </div>
          <div className="hero-meta">
            <div><span>Location</span><strong>{report.meta.location}</strong></div>
            <div><span>Website</span><a href={report.meta.website} target="_blank" rel="noreferrer">Open site ↗</a></div>
            <div><span>Sources</span><strong>{report.sources.length} researched</strong></div>
          </div>
        </header>

        {(showAll || active === "overview") && (
          <section className="report-section print-section">
            <div className="section-heading">
              <p className="eyebrow">01 · Strategic overview</p>
              <h2>What the guide should do</h2>
            </div>
            <div className="feature-grid">
              <div className="feature-card feature-card-large">
                <span className="card-index">Positioning</span>
                <p className="feature-quote">{report.executiveSummary.positioning}</p>
              </div>
              <div className="feature-card">
                <span className="card-index">Opportunity</span>
                <p>{report.executiveSummary.opportunity}</p>
              </div>
              <div className="feature-card">
                <span className="card-index">Research read</span>
                <p>{report.meta.researchSummary}</p>
              </div>
            </div>
            <div className="principles-block">
              <h3>Working principles</h3>
              <div className="numbered-principles">
                {report.executiveSummary.keyPrinciples.map((item, index) => (
                  <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>
                ))}
              </div>
            </div>
            {report.unresolvedQuestions.length > 0 && (
              <div className="questions-box">
                <p className="eyebrow">Verify with hotel</p>
                <h3>Open questions before design</h3>
                <List items={report.unresolvedQuestions} />
              </div>
            )}
          </section>
        )}

        {(showAll || active === "brand") && (
          <section className="report-section print-section">
            <div className="section-heading split-heading">
              <div><p className="eyebrow">02 · Brand interpretation</p><h2>A visual system, not a copy</h2></div>
              <p>{report.brand.essence}</p>
            </div>
            <div className="brand-direction">
              <div>
                <p className="eyebrow">Tone</p>
                <div className="tag-row">{report.brand.tone.map((tone) => <Badge key={tone}>{tone}</Badge>)}</div>
              </div>
              <div>
                <p className="eyebrow">Translation to guide</p>
                <p>{report.brand.visualDirection}</p>
              </div>
            </div>
            <h3 className="subhead">Colour direction</h3>
            <div className="palette-grid">
              {report.brand.colors.map((color) => (
                <div className="palette-card" key={color.name + "-" + color.hex}>
                  <div className="swatch" style={{ background: /^#[0-9A-F]{6}$/i.test(color.hex) ? color.hex : "#d8d4cb" }} />
                  <div className="palette-copy">
                    <div className="palette-title"><strong>{color.name}</strong><code>{color.hex}</code></div>
                    <p>{color.usage}</p>
                    <div className="item-footer"><Confidence basis={color.basis} confidence={color.confidence} /><SourceRefs ids={color.evidenceIds} report={report} /></div>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="subhead">Typography</h3>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Role</th><th>Family / direction</th><th>Treatment</th><th>Evidence</th></tr></thead>
                <tbody>{report.brand.typography.map((font, index) => (
                  <tr key={font.role + "-" + index}><td>{font.role}</td><td><strong>{font.family}</strong></td><td>{font.style}</td><td><Confidence basis={font.basis} confidence={font.confidence} /><SourceRefs ids={font.evidenceIds} report={report} /></td></tr>
                ))}</tbody>
              </table>
            </div>
            <div className="two-col editorial-columns">
              <div><p className="eyebrow">Photography</p><List items={report.brand.photography} /></div>
              <div><p className="eyebrow">Design guardrails</p><h3>Do</h3><List items={report.brand.designDos} /><h3 className="with-space">Avoid</h3><List items={report.brand.designDonts} /></div>
            </div>
          </section>
        )}

        {(showAll || active === "guests") && (
          <section className="report-section print-section">
            <div className="section-heading"><p className="eyebrow">03 · Guest missions</p><h2>Who the guide is serving</h2></div>
            <div className="profile-grid">
              {report.guestProfiles.map((profile, index) => (
                <article className="profile-card" key={profile.name}>
                  <div className="profile-top"><span className="profile-no">0{index + 1}</span><Badge tone={profile.importance === "HIGH" ? "blue" : "neutral"}>{profile.importance}</Badge></div>
                  <h3>{profile.name}</h3><p>{profile.description}</p>
                  <div className="profile-detail"><span>Needs during stay</span><List items={profile.needs} /></div>
                  <div className="profile-detail"><span>Guide implication</span><List items={profile.guideImplications} /></div>
                  <div className="item-footer"><Confidence basis={profile.basis} confidence={profile.confidence} /><SourceRefs ids={profile.evidenceIds} report={report} /></div>
                </article>
              ))}
            </div>
          </section>
        )}

        {(showAll || active === "hotel") && (
          <section className="report-section print-section">
            <div className="section-heading split-heading"><div><p className="eyebrow">04 · Hotel offer</p><h2>Protect what the property already does well</h2></div><p>Every in-house offering informs both editorial prominence and external-partner conflict.</p></div>
            <div className="offering-list">
              {report.hotelOfferings.map((offer, index) => (
                <article className="offering-row" key={offer.name + "-" + index}>
                  <div className="offering-num">{String(index + 1).padStart(2, "0")}</div>
                  <div className="offering-main"><div className="row-heading"><div><span>{offer.category}</span><h3>{offer.name}</h3></div><Badge tone={offer.commercialPriority === "HIGH" ? "blue" : "neutral"}>{offer.commercialPriority} priority</Badge></div><p>{offer.summary}</p></div>
                  <div className="offering-side"><span>Guide treatment</span><p>{offer.guideTreatment}</p><span>Conflict implication</span><p>{offer.conflictImplication}</p><div className="item-footer"><Confidence basis={offer.basis} confidence={offer.confidence} /><SourceRefs ids={offer.evidenceIds} report={report} /></div></div>
                </article>
              ))}
            </div>
          </section>
        )}

        {(showAll || active === "neighbourhood") && (
          <section className="report-section print-section">
            <div className="section-heading"><p className="eyebrow">05 · Neighbourhood</p><h2>How far a guest should reasonably travel</h2><p className="section-intro">{report.neighbourhood.character}</p></div>
            <div className="travel-logic"><span>Travel logic</span><p>{report.neighbourhood.travelLogic}</p></div>
            <div className="zone-stack">
              {report.neighbourhood.zones.map((zone, index) => (
                <article className="zone-card" key={zone.name + "-" + index}>
                  <div className="zone-marker">{index + 1}</div><div><div className="row-heading"><h3>{zone.name}</h3><Badge>{zone.distance}</Badge></div><p>{zone.role}</p><div className="opportunity-row">{zone.opportunities.map((item) => <span key={item}>{item}</span>)}</div><SourceRefs ids={zone.evidenceIds} report={report} /></div>
                </article>
              ))}
            </div>
            <div className="two-col editorial-columns"><div><p className="eyebrow">Destination strengths</p><List items={report.neighbourhood.strengths} /></div><div><p className="eyebrow">Gaps / watch-outs</p><List items={report.neighbourhood.gaps} /></div></div>
          </section>
        )}

        {(showAll || active === "commercial") && (
          <section className="report-section print-section">
            <div className="section-heading split-heading"><div><p className="eyebrow">06 · Commercial mix</p><h2>What Strictons should pursue — and avoid</h2></div><p>The matrix favours useful complements to the hotel rather than duplicating its own revenue lines.</p></div>
            <div className="strategy-legend"><Badge tone="green">PURSUE</Badge><span>Actively prospect</span><Badge tone="amber">SELECTIVE</Badge><span>Use judgement</span><Badge tone="red">AVOID</Badge><span>Likely conflict</span></div>
            <div className="strategy-list">
              {report.categoryStrategy.map((item, index) => (
                <article className="strategy-row" key={item.category + "-" + index}>
                  <div className="strategy-rank">{String(index + 1).padStart(2, "0")}</div>
                  <div className="strategy-name"><Badge tone={item.status === "PURSUE" ? "green" : item.status === "AVOID" ? "red" : "amber"}>{item.status}</Badge><h3>{item.category}</h3><span>{item.priority} priority · target {item.targetCount}</span></div>
                  <div><span className="mini-label">Why it belongs</span><p>{item.rationale}</p><span className="mini-label">Guest value</span><p>{item.guestValue}</p></div>
                  <div className="conflict-cell"><span className="mini-label">Conflict read</span><p>{item.conflictNote}</p></div>
                </article>
              ))}
            </div>
          </section>
        )}

        {(showAll || active === "flatplan") && (
          <section className="report-section print-section">
            <div className="section-heading"><p className="eyebrow">07 · Guide architecture</p><h2>From research to a physical guide</h2></div>
            <div className="guide-structure">
              {report.guideStructure.map((section) => (
                <article key={String(section.order) + "-" + section.title}><span>{String(section.order).padStart(2, "0")}</span><div><h3>{section.title}</h3><p>{section.purpose}</p><div className="opportunity-row">{section.include.map((item) => <span key={item}>{item}</span>)}</div><small>{section.commercialRole}</small></div></article>
              ))}
            </div>
            <h3 className="subhead">Proposed flatplan</h3>
            <div className="flatplan-grid">
              {report.flatplan.map((page, index) => (
                <article className="flatplan-card" key={page.pages + "-" + index}><div className="flatplan-top"><span>{page.pages}</span><Badge>{page.layout}</Badge></div><h3>{page.title}</h3><List items={page.content} /><p className="flatplan-rationale">{page.rationale}</p></article>
              ))}
            </div>
          </section>
        )}

        {(showAll || active === "sources") && (
          <section className="report-section print-section">
            <div className="section-heading"><p className="eyebrow">08 · Research sources</p><h2>Evidence behind the brief</h2></div>
            <div className="source-list">
              {report.sources.map((source) => (
                <article key={source.id}><span>{source.id}</span><div><h3>{source.title}</h3><p>{source.publisher}</p><small>{source.whyUsed}</small></div><a href={source.url} target="_blank" rel="noreferrer">Open ↗</a></article>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}

export type { SectionKey };
