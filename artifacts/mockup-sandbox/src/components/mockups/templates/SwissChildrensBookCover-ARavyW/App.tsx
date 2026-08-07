import { useState } from 'react';

const COLS = 12;
const ROWS = 5;
const PRELIT = [3, 16, 27, 38, 41, 55];

const TONES = {
  bg: '#15151C',
  ivory: '#EFE8D8',
  amber: '#F2A33C',
  vermilion: '#FF4B26',
  dim: '#55556A',
  faint: '#34343F',
  star: '#3B3B4C',
};

export default function App() {
  const [lit, setLit] = useState(() => new Set(PRELIT));
  const [hoverWord, setHoverWord] = useState(null);
  const total = COLS * ROWS;
  const allLit = lit.size === total;

  const lightStar = (i) => {
    setLit((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  };

  return (
    <div
      className="app-root"
      style={{
        minHeight: '100vh',
        background: TONES.bg,
        color: TONES.ivory,
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;800&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            * { box-sizing: border-box; }
            ::selection { background: ${TONES.amber}; color: ${TONES.bg}; }
            .app-root { font-feature-settings: "ss01", "tnum"; }
            .star {
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: default;
              transition: transform 320ms cubic-bezier(.2,.9,.3,1.4), color 320ms ease, opacity 320ms ease;
              user-select: none;
              line-height: 1;
            }
            .star:hover { transform: scale(1.45) rotate(22deg); }
            .meta { font-weight: 300; letter-spacing: 0.08em; text-transform: uppercase; font-size: 10px; }
            .meta-strong { font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; font-size: 10px; }
            .vert {
              writing-mode: vertical-rl;
              transform: rotate(180deg);
            }
            .title-word { transition: color 280ms ease, opacity 280ms ease; cursor: default; }
            .barcode-bar { transition: opacity 240ms ease, background 240ms ease; }
            .barcode:hover .barcode-bar { background: ${TONES.amber}; }
            .corner { position: absolute; width: 14px; height: 14px; }
            .footer-link { transition: color 240ms ease; cursor: default; }
            .footer-link:hover { color: ${TONES.amber}; }
          `,
        }}
      />

      {/* press-proof margins */}
      <div className="meta" style={{ position: 'absolute', top: 28, left: 32, color: TONES.dim }}>
        Astra Atelier — Press proof
      </div>
      <div className="meta" style={{ position: 'absolute', top: 28, right: 32, color: TONES.dim }}>
        Cover · 170 × 240 mm
      </div>
      <div className="meta" style={{ position: 'absolute', bottom: 28, left: 32, color: TONES.dim }}>
        One ground · three text tones
      </div>
      <div className="meta" style={{ position: 'absolute', bottom: 28, right: 32, color: TONES.dim }}>
        Sheet 1 / 1
      </div>

      {/* left vertical annotation */}
      <div
        className="meta vert"
        style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%) rotate(180deg)', color: TONES.dim }}
      >
        Holiday edition — Winter 2025 · The Magician archetype
      </div>
      {/* right vertical annotation: star counter */}
      <div
        className="meta vert"
        style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%) rotate(180deg)', color: allLit ? TONES.amber : TONES.dim, transition: 'color 400ms ease' }}
      >
        {allLit ? 'Every star is lit — happy holidays' : `Pass your cursor over the field — stars lit ${String(lit.size).padStart(2, '0')} / ${total}`}
      </div>

      {/* THE COVER */}
      <div
        style={{
          position: 'relative',
          height: 'min(88vh, 760px)',
          aspectRatio: '17 / 24',
          border: `1px solid ${TONES.faint}`,
          display: 'grid',
          gridTemplateRows: 'auto auto 1fr auto auto',
          padding: '0',
        }}
      >
        {/* crop marks */}
        <div className="corner" style={{ top: -22, left: -22, borderRight: `1px solid ${TONES.dim}`, borderBottom: `1px solid ${TONES.dim}` }} />
        <div className="corner" style={{ top: -22, right: -22, borderLeft: `1px solid ${TONES.dim}`, borderBottom: `1px solid ${TONES.dim}` }} />
        <div className="corner" style={{ bottom: -22, left: -22, borderRight: `1px solid ${TONES.dim}`, borderTop: `1px solid ${TONES.dim}` }} />
        <div className="corner" style={{ bottom: -22, right: -22, borderLeft: `1px solid ${TONES.dim}`, borderTop: `1px solid ${TONES.dim}` }} />

        {/* masthead row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            padding: '20px 24px 16px',
            gap: 12,
            alignItems: 'baseline',
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.02em' }}>Astra Atelier</div>
          <div className="meta" style={{ color: TONES.dim }}>Children's education</div>
          <div className="meta" style={{ color: TONES.dim }}>Winter ✶ 2025</div>
          <div className="meta-strong" style={{ color: TONES.amber, textAlign: 'right' }}>№ 12</div>
        </div>

        <div style={{ height: 1, background: TONES.faint, margin: '0 24px' }} />

        {/* center: star field + title */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '22px 24px 18px' }}>
          {/* star field */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              rowGap: 14,
            }}
          >
            {Array.from({ length: total }, (_, i) => {
              const isLit = lit.has(i);
              return (
                <span
                  key={i}
                  className="star"
                  onMouseEnter={() => lightStar(i)}
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: isLit ? TONES.amber : TONES.star,
                    opacity: isLit ? 1 : 0.85,
                  }}
                >
                  ✶
                </span>
              );
            })}
          </div>

          {/* title block */}
          <div style={{ marginTop: 28 }}>
            <div className="meta" style={{ color: TONES.dim, marginBottom: 14 }}>
              A holiday greeting, set in one voice and three weights
            </div>
            <h1
              style={{
                margin: 0,
                fontWeight: 800,
                fontSize: 'clamp(48px, 11.5vh, 104px)',
                lineHeight: 0.94,
                letterSpacing: '-0.035em',
              }}
            >
              <span
                className="title-word"
                onMouseEnter={() => setHoverWord('wonder')}
                onMouseLeave={() => setHoverWord(null)}
                style={{ color: hoverWord === 'wonder' ? TONES.amber : TONES.ivory }}
              >
                Wonder
              </span>
              <br />
              <span style={{ color: TONES.ivory }}>to&nbsp;</span>
              <span
                className="title-word"
                onMouseEnter={() => setHoverWord('all')}
                onMouseLeave={() => setHoverWord(null)}
                style={{ color: hoverWord === 'all' ? TONES.ivory : TONES.vermilion }}
              >
                all.
              </span>
            </h1>
            <p
              style={{
                margin: '18px 0 0',
                fontWeight: 300,
                fontSize: 'clamp(15px, 2.4vh, 20px)',
                lineHeight: 1.4,
                color: TONES.ivory,
                maxWidth: '24ch',
              }}
            >
              and to every small mind,
              <br />
              a bright and turning year.
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: TONES.faint, margin: '0 24px' }} />

        {/* footer row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: 12,
            padding: '16px 24px 20px',
            alignItems: 'end',
          }}
        >
          <div className="meta footer-link" style={{ color: TONES.dim, lineHeight: 1.7 }}>
            From the teachers, tinkerers &<br />
            resident magicians of Astra Atelier
          </div>
          <div className="meta" style={{ color: TONES.dim, lineHeight: 1.7 }}>
            Edition of 2,500
            <br />
            <span style={{ color: TONES.amber, fontWeight: 500 }}>Vol. XII</span>
          </div>
          {/* barcode strip */}
          <div style={{ justifySelf: 'end', textAlign: 'right' }}>
            <div className="barcode" style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 26, justifyContent: 'flex-end' }}>
              {[2, 1, 3, 1, 2, 1, 1, 4, 1, 2, 1, 3, 1, 1, 2, 1, 3, 1].map((w, i) => (
                <div
                  key={i}
                  className="barcode-bar"
                  style={{ width: w, height: '100%', background: TONES.ivory, opacity: 0.85 }}
                />
              ))}
            </div>
            <div className="meta" style={{ color: TONES.dim, marginTop: 6 }}>978 · 3 · 2025 · 12</div>
          </div>
        </div>
      </div>
    </div>
  );
}