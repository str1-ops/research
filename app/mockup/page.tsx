import "./mockup.css";

type Business = {
  name: string;
  type: string;
  note: string;
  image: string;
};

const familyBusinesses: Business[] = [
  {
    name: "Coast Discovery Aquarium",
    type: "Rainy-day family outing",
    note: "An easy indoor fallback for younger children and uncertain weather.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Pelican Mini Golf",
    type: "Family activity",
    note: "Low-effort fun when you want a simple hour or two away from the hotel.",
    image: "https://images.unsplash.com/photo-1591491653056-83f12758208a?auto=format&fit=crop&w=1000&q=85",
  },
];

const localFinds: Business[] = [
  {
    name: "Drift Coffee Window",
    type: "Coffee + bakery",
    note: "Morning coffee, pastries and beach snacks before a short coastal drive.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Sand & Salt Home",
    type: "Coastal homewares",
    note: "Light, beachy interiors and gift-friendly finds with a local feel.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Harbour Makers Studio",
    type: "Local makers",
    note: "Ceramics, candles and small-batch pieces for a simple souvenir stop.",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Lakeside Picnic Pantry",
    type: "Picnic provisions",
    note: "Cheeses, crackers and easy grazing supplies for a lake or beach afternoon.",
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1000&q=85",
  },
];

const activeBusinesses: Business[] = [
  {
    name: "Headland Surf School",
    type: "Surf lessons",
    note: "Beginner-friendly morning sessions with equipment supplied.",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Bluewater Kayak Hire",
    type: "Kayak + SUP",
    note: "Simple water hire for couples, families and light-adventure guests.",
    image: "https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Toukley Fairways",
    type: "Golf",
    note: "Relaxed morning tee times suited to couples, wedding groups and offsites.",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1000&q=85",
  },
];

const zones = [
  ["01", "The Beachie + Budgewoi Lake", "On-property / immediate lakefront"],
  ["02", "Toukley, Canton Beach + Noraville", "Short local drive"],
  ["03", "Norah Head + Soldiers Beach", "Short-drive coast zone"],
  ["04", "Budgewoi + Lake Munmorah", "Quieter lake + beach extension"],
  ["05", "The Entrance + Wyong", "Family day-trip + transport connector"],
];

function PageNumber({ number }: { number: number }) {
  return <span className="mock-page-number">{String(number).padStart(2, "0")}</span>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mock-eyebrow">{children}</p>;
}

function SectionHeading({
  kicker,
  title,
  aside,
}: {
  kicker: string;
  title: string;
  aside?: string;
}) {
  return (
    <header className="section-heading">
      <div>
        <Eyebrow>{kicker}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {aside ? <p className="heading-aside">{aside}</p> : null}
    </header>
  );
}

function FauxQr({ label }: { label: string }) {
  return (
    <div className="faux-qr-wrap">
      <div className="faux-qr" aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i /><i /><i />
      </div>
      <span>{label}</span>
    </div>
  );
}

function BusinessCard({ business, number }: { business: Business; number?: string }) {
  return (
    <article className="business-card">
      <div className="business-image" style={{ backgroundImage: `url("${business.image}")` }}>
        {number ? <span className="business-number">{number}</span> : null}
      </div>
      <div className="business-copy">
        <p className="business-type">{business.type}</p>
        <h3>{business.name}</h3>
        <p>{business.note}</p>
      </div>
    </article>
  );
}

export default function BeachcomberGuideMockup() {
  return (
    <main className="mockup-shell">
      <header className="mockup-toolbar">
        <div>
          <Eyebrow>Strictons · Concept mockup</Eyebrow>
          <h1>The Beachcomber — 16pp Pocket Guide</h1>
          <p>
            Content-led mockup using the research strategy, Beachcomber brand direction,
            stock photography and fictional local businesses.
          </p>
        </div>
        <div className="toolbar-meta">
          <span>101.5 × 185mm</span>
          <span>16 pages</span>
          <span>Saddle stitch</span>
        </div>
      </header>

      <section className="guide-grid" aria-label="Sixteen page Beachcomber guide mockup">
        <article className="guide-page cover-page">
          <div className="cover-photo" />
          <div className="cover-shade" />
          <div className="cover-content">
            <p className="cover-small">HOTEL & RESORT · TOUKLEY</p>
            <div className="cover-mark">
              <span className="cover-arc">⌒</span>
              <strong>BEACHCOMBER</strong>
              <span>YOUR POCKET GUIDE</span>
            </div>
            <div className="cover-bottom">
              <p>Stay lakeside.</p>
              <p>Drift coastward.</p>
            </div>
          </div>
          <PageNumber number={1} />
        </article>

        <article className="guide-page">
          <SectionHeading
            kicker="01 · Welcome"
            title="Start with The Beachie."
            aside="A small guide to the hotel, the lake and the best easy outings nearby."
          />
          <div className="welcome-letter">
            <p>
              Welcome to The Beachcomber Hotel & Resort. Think of this guide as your
              short-list rather than a directory: what to enjoy here first, then where to
              head when you feel like exploring.
            </p>
            <p>
              Keep the lake as your base, make one confident local outing, then come back
              for the pool, a drink, dinner or whatever is happening tonight.
            </p>
          </div>
          <div className="three-cues">
            <div><span>01</span><strong>EAT</strong><small>Start on-property</small></div>
            <div><span>02</span><strong>EXPLORE</strong><small>Short drives only</small></div>
            <div><span>03</span><strong>CELEBRATE</strong><small>Stay a little longer</small></div>
          </div>
          <div className="welcome-footer">
            <p>Menus, schedules and offers change seasonally.</p>
            <FauxQr label="hotel guide" />
          </div>
          <PageNumber number={2} />
        </article>

        <article className="guide-page">
          <SectionHeading
            kicker="02 · Your stay"
            title="Your Beachie stay"
            aside="Lake views, poolside downtime and everything you need close by."
          />
          <div className="room-collage">
            <div className="room-photo room-one" />
            <div className="room-photo room-two" />
            <div className="room-photo room-three" />
          </div>
          <div className="stay-grid">
            <div>
              <p className="mini-label">Stay</p>
              <h3>Waterview, poolside & urban rooms</h3>
              <p>83 rooms with a mix of lake-facing, poolside/garden and urban room categories.</p>
            </div>
            <div>
              <p className="mini-label">Resort</p>
              <h3>Pool, spa pool, cabanas & lakefront time</h3>
              <p>Build the day around what is already here before planning anything further afield.</p>
            </div>
          </div>
          <div className="quick-info">
            <span>Reception</span><span>Parking</span><span>Wi-Fi</span><span>Check-in / out</span>
          </div>
          <div className="small-cta">
            <span>Book direct or extend your stay</span><FauxQr label="stay" />
          </div>
          <PageNumber number={3} />
        </article>

        <article className="guide-page">
          <SectionHeading kicker="03 · Eat + drink" title="Eat at The Beachie" aside="Keep the first meal easy." />
          <div className="large-photo bistro-photo">
            <span className="photo-caption">BISTRO AT THE BEACHIE</span>
          </div>
          <div className="feature-copy">
            <h3>Bistro at The Beachie</h3>
            <p>
              Relaxed, elevated pub-style dining with share plates, tacos, burgers, grill
              favourites, salads, pizzas, desserts and Little Nippers meals.
            </p>
          </div>
          <div className="best-for">
            <span>FAMILIES</span><span>LUNCH</span><span>EASY DINNER</span><span>GROUPS</span>
          </div>
          <div className="small-cta">
            <span>See the current menu and book a table</span><FauxQr label="menu" />
          </div>
          <PageNumber number={4} />
        </article>

        <article className="guide-page">
          <SectionHeading kicker="04 · Morning to sunset" title="Breakfast + drinks by the lake" />
          <div className="split-feature">
            <div className="split-photo breakfast-photo" />
            <div className="split-copy">
              <p className="mini-label">Morning</p>
              <h3>Pelicans & waterfront breakfast</h3>
              <p>Keep breakfast close, relaxed and water-facing. Scan for current service details.</p>
            </div>
          </div>
          <div className="split-feature reversed">
            <div className="split-copy dark-block">
              <p className="mini-label light-label">Golden hour</p>
              <h3>Sunset drinks</h3>
              <p>Cocktails, margaritas, spritzes, wine and an easy move into dinner.</p>
            </div>
            <div className="split-photo drinks-photo" />
          </div>
          <div className="offer-row">
            <div><small>SEASONAL</small><strong>Sunset Spritz Hour</strong><span>Scan for today&apos;s offer</span></div>
            <div><small>WEEKLY</small><strong>Kids Eat Free</strong><span>Selected nights · verify current schedule</span></div>
          </div>
          <PageNumber number={5} />
        </article>

        <article className="guide-page">
          <SectionHeading kicker="05 · What’s on" title="What’s On by the Lake" aside="Keep print evergreen. Let the QR stay current." />
          <div className="whats-on-hero live-photo" />
          <div className="event-list">
            {[
              ["FRI + SUN", "Live soloists"],
              ["SAT", "Saturday Sessions"],
              ["WEEKLY", "Pool comp + live sport"],
              ["SCHOOL HOLIDAYS", "Family programming"],
              ["SEASONAL", "Special events"],
            ].map(([when, event]) => (
              <div key={event}><span>{when}</span><strong>{event}</strong></div>
            ))}
          </div>
          <div className="full-cta">
            <div><Eyebrow>Tonight at The Beachie</Eyebrow><p>See current times, artists, specials and event details.</p></div>
            <FauxQr label="what's on" />
          </div>
          <PageNumber number={6} />
        </article>

        <article className="guide-page lifestyle-page">
          <SectionHeading kicker="06 · Resort rhythm" title="Poolside, patio & sunset rituals" />
          <div className="pool-photo large-lifestyle" />
          <div className="ritual-grid">
            <div><span>01</span><h3>Slow afternoon</h3><p>Pool, cabana, something cold, nowhere to rush.</p></div>
            <div><span>02</span><h3>Golden hour</h3><p>Find the lake, order a drink and let dinner come later.</p></div>
            <div><span>03</span><h3>Gather here</h3><p>Patio, cabanas and poolside moments are part of the stay.</p></div>
          </div>
          <p className="fine-print">Pool and cabana access rules should be confirmed with the hotel before final artwork.</p>
          <PageNumber number={7} />
        </article>

        <article className="guide-page map-page">
          <SectionHeading kicker="07 · Local map" title="Lake, village, coast" aside="Five simple zones, not a directory." />
          <div className="illustrated-map">
            <div className="lake lake-a" />
            <div className="lake lake-b" />
            <div className="coast-line" />
            <div className="road road-a" />
            <div className="road road-b" />
            <span className="pin hotel-pin">B</span>
            <span className="pin pin-1">1</span>
            <span className="pin pin-2">2</span>
            <span className="pin pin-3">3</span>
            <span className="pin pin-4">4</span>
            <span className="pin pin-5">5</span>
            <span className="map-label hotel-label">THE BEACHIE</span>
            <span className="map-label norah-label">NORAH HEAD</span>
            <span className="map-label entrance-label">THE ENTRANCE</span>
            <span className="map-label wyong-label">WYONG</span>
          </div>
          <div className="map-key">
            <span><i className="key-hotel" /> hotel base</span>
            <span><i /> travel zone</span>
          </div>
          <PageNumber number={8} />
        </article>

        <article className="guide-page map-page">
          <SectionHeading kicker="08 · Travel zones" title="Choose by time, not by distance" />
          <div className="zone-stack">
            {zones.map(([n, title, desc]) => (
              <div className="zone-row" key={n}>
                <span>{n}</span>
                <div><h3>{title}</h3><p>{desc}</p></div>
              </div>
            ))}
          </div>
          <blockquote>
            One easy outing. Then back to the lake for lunch, drinks, dinner or tonight&apos;s entertainment.
          </blockquote>
          <div className="drive-bands">
            <span>5–10 MIN</span><span>10–20 MIN</span><span>20–35 MIN</span>
          </div>
          <PageNumber number={9} />
        </article>

        <article className="guide-page">
          <SectionHeading kicker="09 · Half-day idea" title="Norah Head morning" aside="The strongest scenic outing from the hotel." />
          <div className="large-photo lighthouse-photo" />
          <div className="route-list">
            <div><span>01</span><strong>Norah Head Lighthouse</strong><p>Start with ocean views and the headland.</p></div>
            <div><span>02</span><strong>Soldiers Beach</strong><p>Slow down for a beach walk or swim when conditions suit.</p></div>
            <div><span>03</span><strong>Wyrrabalong coast</strong><p>Walk a section of the coastal track, then turn back.</p></div>
            <div className="return-stop"><span>04</span><strong>Return to The Beachie</strong><p>Lunch, pool time or sunset drinks by the lake.</p></div>
          </div>
          <div className="micro-business">
            <div className="micro-photo coffee-photo" />
            <div><p className="mini-label">Mock local stop</p><h3>Headland Coffee Kiosk</h3><p>Quick takeaway coffee on the way back from the coast.</p></div>
          </div>
          <PageNumber number={10} />
        </article>

        <article className="guide-page">
          <SectionHeading kicker="10 · Family" title="With kids / easy outings" aside="Fast decisions by weather and energy level." />
          <div className="family-switch">
            <div className="sunny"><Eyebrow>Sunny</Eyebrow><h3>Beach + lake + pool</h3><p>Keep the day simple and spend the evening back at the hotel.</p></div>
            <div className="rainy"><Eyebrow>Rainy</Eyebrow><h3>Indoor fallback</h3><p>Use one low-friction outing, then return for food or family programming.</p></div>
          </div>
          <div className="business-list-two">
            {familyBusinesses.map((business, index) => <BusinessCard business={business} number={String(index + 1).padStart(2, "0")} key={business.name} />)}
          </div>
          <div className="small-note">Hotel first: on-property kids cues, current What&apos;s On and pool access should appear before external ideas.</div>
          <PageNumber number={11} />
        </article>

        <article className="guide-page">
          <SectionHeading kicker="11 · Local finds" title="Small stops worth leaving the lake for" aside="Low-conflict local businesses, tightly curated." />
          <div className="business-grid-four">
            {localFinds.map((business, index) => <BusinessCard business={business} number={String(index + 3).padStart(2, "0")} key={business.name} />)}
          </div>
          <div className="editorial-note">Coffee, makers, homewares and picnic supplies add local flavour without trying to replace the hotel&apos;s core dining offer.</div>
          <PageNumber number={12} />
        </article>

        <article className="guide-page">
          <SectionHeading kicker="12 · Active mornings" title="Golf, surf, water & walks" aside="Come back hungry." />
          <div className="business-list-three">
            {activeBusinesses.map((business, index) => <BusinessCard business={business} number={String(index + 7).padStart(2, "0")} key={business.name} />)}
          </div>
          <div className="activity-footer">
            <span>GOOD FOR</span>
            <strong>Couples · Wedding groups · Corporate offsites · Active families</strong>
          </div>
          <PageNumber number={13} />
        </article>

        <article className="guide-page celebrate-page">
          <SectionHeading kicker="13 · Celebrate here" title="Your next reason to come back" aside="Existing guests can become future event bookers." />
          <div className="celebrate-collage">
            <div className="celebrate-photo wedding-photo" />
            <div className="celebrate-photo room-event-photo" />
            <div className="celebrate-photo table-photo" />
          </div>
          <div className="celebrate-copy">
            <div><p className="mini-label">Weddings</p><h3>By the lake</h3><p>Foreshore Room, Lake View Room, courtyard, cabanas and waterfront moments.</p></div>
            <div><p className="mini-label">Corporate + social</p><h3>Meet, gather, celebrate</h3><p>Retreats, workshops, birthdays, engagements and group occasions.</p></div>
          </div>
          <div className="full-cta">
            <div><Eyebrow>Plan the next one</Eyebrow><p>Explore weddings, corporate events and celebrations.</p></div>
            <FauxQr label="events" />
          </div>
          <PageNumber number={14} />
        </article>

        <article className="guide-page">
          <SectionHeading kicker="14 · Good to know" title="The useful back-pocket page" />
          <div className="info-cards">
            <div><span>01</span><h3>Reception</h3><p>Contact, check-in/out, Wi-Fi, parking and hotel help.</p></div>
            <div><span>02</span><h3>Getting around</h3><p>Wyong rail connection, local transfers and drive-time logic.</p></div>
            <div><span>03</span><h3>Weather-proof</h3><p>Pool, food, local browsing and easy rainy-day family options.</p></div>
            <div><span>04</span><h3>Always current</h3><p>Menus, What&apos;s On, table bookings and seasonal offers via QR.</p></div>
          </div>
          <div className="qr-ribbon">
            <FauxQr label="menus" /><FauxQr label="what's on" /><FauxQr label="hotel" />
          </div>
          <div className="responsible-note">Final artwork should only include practical details confirmed by the hotel before print.</div>
          <PageNumber number={15} />
        </article>

        <article className="guide-page back-cover-page">
          <div className="back-photo" />
          <div className="back-shade" />
          <div className="back-content">
            <p className="cover-small">RETURN TO THE BEACHIE</p>
            <h2>Book direct.<br />Stay longer.<br />Celebrate lakeside.</h2>
            <p className="back-tagline">End on hotel conversion — not another advertiser.</p>
            <div className="back-qr-grid">
              <FauxQr label="book direct" />
              <FauxQr label="what's on" />
              <FauxQr label="events" />
            </div>
            <div className="back-wordmark">BEACHCOMBER <span>HOTEL & RESORT · TOUKLEY</span></div>
          </div>
          <PageNumber number={16} />
        </article>
      </section>

      <footer className="mockup-footer">
        <p>Concept only · Stock photography · Fictional local businesses · Beachcomber content adapted from the Strictons research brief.</p>
      </footer>
    </main>
  );
}
