import { useMemo, useState } from 'react';

type Chapter = {
  id: string;
  number: string;
  label: string;
  title: string;
  line: string;
  accent: string;
  position: { x: number; y: number };
};

const chapters: Chapter[] = [
  {
    id: 'notice',
    number: '01',
    label: 'notice',
    title: 'Look closer.',
    line: 'The ordinary has a second side.',
    accent: '#e4a227',
    position: { x: 12, y: 62 },
  },
  {
    id: 'ask',
    number: '02',
    label: 'ask',
    title: 'Ask why.',
    line: 'A good question leaves the door ajar.',
    accent: '#e54b32',
    position: { x: 36, y: 27 },
  },
  {
    id: 'make',
    number: '03',
    label: 'make',
    title: 'Make a mark.',
    line: 'Ideas become real when hands join in.',
    accent: '#2f6f8f',
    position: { x: 66, y: 69 },
  },
  {
    id: 'share',
    number: '04',
    label: 'share',
    title: 'Pass it on.',
    line: 'Wonder grows when it travels.',
    accent: '#8d6b98',
    position: { x: 88, y: 35 },
  },
];

const routePoints = chapters.map((chapter) => `${chapter.position.x},${chapter.position.y}`).join(' ');

export default function WonderRouteFieldGuide() {
  const [activeId, setActiveId] = useState('notice');
  const activeChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === activeId) ?? chapters[0],
    [activeId],
  );
  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeId);

  return (
    <main
      className="wonder-route"
      style={{
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#dce3e6',
        color: '#17264e',
        fontFamily: '"DM Sans", "Trebuchet MS", sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap"
      />
      <style>
        {`
          * { box-sizing: border-box; }
          .wonder-route { font-feature-settings: "ss01", "tnum"; }
          .wonder-route::before {
            content: "";
            position: fixed;
            inset: 0;
            pointer-events: none;
            opacity: .22;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.14'/%3E%3C/svg%3E");
            mix-blend-mode: multiply;
          }
          .route-button {
            appearance: none;
            border: 0;
            background: transparent;
            color: inherit;
            cursor: pointer;
            font: inherit;
            text-align: left;
          }
          .route-button:focus-visible {
            outline: 2px solid #e54b32;
            outline-offset: 4px;
          }
          .chapter-tab { transition: transform 220ms ease, color 220ms ease, background 220ms ease; }
          .chapter-tab:hover { transform: translateX(4px); }
          .route-node { transition: transform 300ms cubic-bezier(.2,.8,.2,1), fill 240ms ease; transform-box: fill-box; transform-origin: center; }
          .route-node:hover { transform: scale(1.18); }
          .route-path { transition: stroke-dashoffset 500ms ease; }
          .reset-button { transition: color 180ms ease, background 180ms ease; }
          .reset-button:hover { color: #f6f0df !important; background: #17264e !important; }
          @media (max-width: 700px) {
            .wonder-route { align-items: flex-start !important; padding: 56px 18px 70px; }
            .outer-note { display: none !important; }
            .cover-shell { width: min(100%, 480px) !important; height: auto !important; min-height: 680px; }
            .cover-header { grid-template-columns: 1fr auto !important; }
            .header-detail { display: none !important; }
            .cover-body { grid-template-columns: 1fr !important; gap: 26px !important; }
            .route-panel { min-height: 230px !important; }
            .cover-title { font-size: clamp(62px, 18vw, 96px) !important; }
            .bottom-row { grid-template-columns: 1fr auto !important; }
            .bottom-copy { display: none !important; }
          }
        `}
      </style>

      <div
        className="outer-note"
        style={{
          position: 'absolute',
          top: 28,
          left: 34,
          color: '#667486',
          fontFamily: '"Space Mono", monospace',
          fontSize: 9,
          lineHeight: 1.65,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
        }}
      >
        Astra Atelier /<br />
        A field guide for growing minds
      </div>
      <div
        className="outer-note"
        style={{
          position: 'absolute',
          top: 28,
          right: 34,
          color: '#667486',
          fontFamily: '"Space Mono", monospace',
          fontSize: 9,
          lineHeight: 1.65,
          letterSpacing: '.1em',
          textAlign: 'right',
          textTransform: 'uppercase',
        }}
      >
        Series 12 /<br />
        Read by moving
      </div>
      <div
        className="outer-note"
        style={{
          position: 'absolute',
          bottom: 30,
          left: 34,
          color: '#667486',
          fontFamily: '"Space Mono", monospace',
          fontSize: 9,
          letterSpacing: '.1em',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          textTransform: 'uppercase',
        }}
      >
        Cover study / 04
      </div>
      <div
        className="outer-note"
        style={{
          position: 'absolute',
          bottom: 30,
          right: 34,
          color: '#667486',
          fontFamily: '"Space Mono", monospace',
          fontSize: 9,
          letterSpacing: '.1em',
          writingMode: 'vertical-rl',
          textTransform: 'uppercase',
        }}
      >
        Winter / 2025
      </div>

      <section
        className="cover-shell"
        style={{
          width: 'min(84vw, 560px)',
          height: 'min(88vh, 760px)',
          aspectRatio: '17 / 24',
          background: '#f6f0df',
          border: '1px solid #17264e',
          position: 'relative',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          boxShadow: '10px 12px 0 rgba(23, 38, 78, .10)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 18,
            height: 18,
            top: -1,
            left: -1,
            borderTop: '1px solid #e54b32',
            borderLeft: '1px solid #e54b32',
            transform: 'translate(-9px, -9px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 18,
            height: 18,
            bottom: -1,
            right: -1,
            borderBottom: '1px solid #e54b32',
            borderRight: '1px solid #e54b32',
            transform: 'translate(9px, 9px)',
          }}
        />

        <header
          className="cover-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 1fr 1fr auto',
            gap: 13,
            alignItems: 'baseline',
            padding: '21px 25px 17px',
            borderBottom: '1px solid rgba(23, 38, 78, .28)',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '-.02em' }}>Astra Atelier</div>
          <div className="header-detail" style={{ color: '#667486', fontFamily: '"Space Mono", monospace', fontSize: 8, letterSpacing: '.04em', textTransform: 'uppercase' }}>Children&apos;s imprint</div>
          <div className="header-detail" style={{ color: '#667486', fontFamily: '"Space Mono", monospace', fontSize: 8, letterSpacing: '.04em', textTransform: 'uppercase' }}>Map / 01—04</div>
          <div style={{ color: '#e54b32', fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700 }}>12</div>
        </header>

        <div
          className="cover-body"
          style={{
            padding: '29px 25px 24px',
            display: 'grid',
            gridTemplateColumns: '1.04fr .96fr',
            gap: 19,
            minHeight: 0,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
            <div>
              <div style={{ color: '#e54b32', fontFamily: '"Space Mono", monospace', fontSize: 9, letterSpacing: '.09em', lineHeight: 1.45, textTransform: 'uppercase' }}>
                A moving picture book
              </div>
              <h1
                className="cover-title"
                style={{
                  color: '#17264e',
                  fontSize: 'clamp(54px, 10vh, 93px)',
                  lineHeight: '.84',
                  letterSpacing: '-.075em',
                  margin: '18px 0 0',
                  fontWeight: 700,
                }}
              >
                Wonder
                <br />
                <span style={{ color: '#e54b32' }}>to</span>
                <br />
                all.
              </h1>
              <p style={{ color: '#17264e', fontSize: 15, lineHeight: 1.28, margin: '23px 0 0', maxWidth: '18ch' }}>
                Four small turns for a bright and curious year.
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(23, 38, 78, .28)', paddingTop: 15, marginTop: 24 }}>
              <div style={{ color: '#667486', fontFamily: '"Space Mono", monospace', fontSize: 8, letterSpacing: '.07em', textTransform: 'uppercase' }}>
                Current direction
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 9 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: activeChapter.accent, display: 'block' }} />
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-.03em' }}>{activeChapter.title}</span>
              </div>
              <p style={{ color: '#667486', fontSize: 12, lineHeight: 1.4, margin: '5px 0 0', maxWidth: '24ch' }}>{activeChapter.line}</p>
            </div>
          </div>

          <div className="route-panel" style={{ display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 280 }}>
            <div style={{ color: '#667486', fontFamily: '"Space Mono", monospace', fontSize: 8, letterSpacing: '.08em', lineHeight: 1.5, textTransform: 'uppercase', marginBottom: 11 }}>
              Select a direction
            </div>
            <div
              style={{
                background: '#d5e0e5',
                border: '1px solid #17264e',
                position: 'relative',
                flex: '1 1 auto',
                minHeight: 220,
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, opacity: .42, backgroundImage: 'linear-gradient(rgba(23,38,78,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(23,38,78,.14) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
              <div style={{ position: 'absolute', top: 10, left: 11, color: '#667486', fontFamily: '"Space Mono", monospace', fontSize: 8 }}>N 45° 31&apos; / E 73° 34&apos;</div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: '25px 11px 12px', width: 'calc(100% - 22px)', height: 'calc(100% - 37px)', overflow: 'visible' }} aria-label="A four-stop route map">
                <polyline
                  className="route-path"
                  points={routePoints}
                  fill="none"
                  stroke="#17264e"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                  strokeDashoffset={-activeIndex * 1.4}
                />
                {chapters.map((chapter, index) => {
                  const isActive = activeId === chapter.id;
                  return (
                    <g key={chapter.id} className="route-node" onClick={() => setActiveId(chapter.id)} style={{ cursor: 'pointer' }}>
                      <circle cx={chapter.position.x} cy={chapter.position.y} r={isActive ? 7 : 5} fill={isActive ? chapter.accent : '#f6f0df'} stroke="#17264e" strokeWidth="1.2" />
                      <text x={chapter.position.x} y={chapter.position.y + 1.6} textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="5" fontWeight="700" fill={isActive ? '#f6f0df' : '#17264e'}>{index + 1}</text>
                    </g>
                  );
                })}
              </svg>
              <div style={{ position: 'absolute', right: 10, bottom: 8, color: '#667486', fontFamily: '"Space Mono", monospace', fontSize: 8 }}>north is a question</div>
            </div>

            <nav aria-label="Story directions" style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 13 }}>
              {chapters.map((chapter) => {
                const isActive = chapter.id === activeId;
                return (
                  <button
                    className="route-button chapter-tab"
                    key={chapter.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveId(chapter.id)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '25px 1fr auto',
                      gap: 7,
                      alignItems: 'center',
                      padding: '5px 6px',
                      color: isActive ? '#17264e' : '#667486',
                      background: isActive ? '#e4a227' : 'transparent',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: 9,
                      letterSpacing: '.02em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{chapter.number}</span>
                    <span style={{ fontWeight: isActive ? 700 : 400 }}>{chapter.label}</span>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: chapter.accent, display: 'block' }} />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <footer
          className="bottom-row"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr auto',
            gap: 14,
            alignItems: 'end',
            borderTop: '1px solid rgba(23, 38, 78, .28)',
            padding: '15px 25px 19px',
          }}
        >
          <div className="bottom-copy" style={{ color: '#667486', fontFamily: '"Space Mono", monospace', fontSize: 8, lineHeight: 1.7, letterSpacing: '.03em', textTransform: 'uppercase' }}>
            From the teachers, tinkerers &<br />
            resident magicians of Astra Atelier
          </div>
          <div style={{ color: '#667486', fontFamily: '"Space Mono", monospace', fontSize: 8, lineHeight: 1.7, letterSpacing: '.03em', textTransform: 'uppercase' }}>
            Edition of 2,500<br />
            <span style={{ color: '#e54b32' }}>Vol. XII / 2025</span>
          </div>
          <button
            type="button"
            className="route-button reset-button"
            onClick={() => setActiveId('notice')}
            style={{ border: '1px solid #17264e', color: '#17264e', padding: '8px 9px', fontFamily: '"Space Mono", monospace', fontSize: 8, letterSpacing: '.05em', textTransform: 'uppercase' }}
          >
            Begin again
          </button>
        </footer>
      </section>
    </main>
  );
}