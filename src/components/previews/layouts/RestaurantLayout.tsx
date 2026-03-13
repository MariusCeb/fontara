import React, { useState, useEffect, useRef } from 'react'
import { TypographySettings, CustomText } from '../../../types'
import { PreviewTheme } from '../../../store/typographyStore'
import { getStyleMap } from '../../../utils/typography'

interface Props { settings: TypographySettings; customText?: CustomText; theme?: PreviewTheme; onTextChange?: (t: Partial<CustomText>) => void }

const PALETTE = {
  dark: {
    bg:      '#0c0a07',
    surface: '#141009',
    light:   '#f5ede0',
    cream:   '#ede0cc',
    gold:    '#c8a96e',
    muted:   'rgba(237,224,204,0.45)',
    border:  'rgba(200,169,110,0.15)',
    rule:    'rgba(237,224,204,0.1)',
    navBg:   'rgba(12,10,7,0.9)',
    plateBorder: (op: number) => `rgba(200,169,110,${op})`,
    imgBg:   'linear-gradient(145deg, #1e1509, #2a1e0a)',
    imgGlow: 'radial-gradient(circle at 30% 70%, rgba(200,169,110,0.12), transparent 60%)',
    btnAlt:  'rgba(237,224,204,0.2)',
  },
  light: {
    bg:      '#faf7f2',
    surface: '#f0e8da',
    light:   '#1a0f05',
    cream:   '#2a1a0a',
    gold:    '#9b6b1a',
    muted:   'rgba(26,15,5,0.5)',
    border:  'rgba(155,107,26,0.2)',
    rule:    'rgba(26,15,5,0.1)',
    navBg:   'rgba(250,247,242,0.92)',
    plateBorder: (op: number) => `rgba(155,107,26,${op})`,
    imgBg:   'linear-gradient(145deg, #e8d8c0, #d4be9a)',
    imgGlow: 'radial-gradient(circle at 30% 70%, rgba(155,107,26,0.15), transparent 60%)',
    btnAlt:  'rgba(26,15,5,0.15)',
  },
}

export function RestaurantLayout({ settings, customText, theme = 'dark', onTextChange }: Props) {
  const s = getStyleMap(settings)
  const C = PALETTE[theme]
  const heroHeading = customText?.heading || 'An evening worth\nremembering'
  const heroBody    = customText?.body    || "Modern Italian cuisine shaped by the seasons of Northern California. Chef Marco Bellini's tasting menu is an intimate exploration of place and memory."

  const [narrow, setNarrow] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setNarrow(e.contentRect.width < 560))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const bar: React.CSSProperties = { display: 'block', width: 18, height: 1.5, background: C.light, borderRadius: 1 }

  const menu: Record<string, { name: string; desc: string; price: string }[]> = {
    'To begin': [
      { name: 'The Bread',           desc: 'Warm sourdough, house-churned butter. Complimentary. Mostly.', price: '—' },
      { name: 'Burrata e Pomodori',  desc: 'Heritage tomatoes, basil oil, aged balsamic, Maldon salt', price: '18' },
      { name: 'Crudo di Tonno',      desc: 'Bluefin tuna, cucumber gelée, sesame, ponzu', price: '26' },
      { name: 'Foie Gras Torchon',   desc: 'Sauternes jelly, warm brioche, micro herbs', price: '34' },
    ],
    'From the sea': [
      { name: 'Halibut en Papillote',  desc: 'Fennel, lemon verbena, capers, white wine butter sauce', price: '54' },
      { name: "Risotto all'Aragosta", desc: 'Maine lobster, saffron, Parmigiano Reggiano 36-month', price: '62' },
    ],
    'From the land': [
      { name: 'Anatra in Due Cotture', desc: 'Duck two ways, celeriac purée, wild garlic, cherry jus', price: '52' },
      { name: 'Costata Wagyu A5',      desc: 'Japanese Wagyu sirloin, truffle pommes, bone marrow', price: '120' },
    ],
  }

  return (
    <div ref={rootRef} style={{ background: C.bg, color: C.light, minHeight: '100%' }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 60,
        borderBottom: `1px solid ${C.rule}`,
        position: 'sticky', top: 0, zIndex: 10,
        background: C.navBg, backdropFilter: 'blur(16px)',
      }}>
        <span style={{ ...s.h4, color: C.gold, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: s.h1.fontFamily, fontWeight: s.h1.fontWeight }}>
          Osteria
        </span>

        {narrow ? (
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={bar} /><span style={bar} /><span style={{ ...bar, width: 12 }} />
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {['Menu', 'Wine', 'Private Dining', 'About'].map(n => (
              <span key={n} style={{ ...s.small, color: C.muted }}>{n}</span>
            ))}
            <button style={{ border: `1px solid ${C.gold}`, background: 'transparent', borderRadius: 6, padding: '6px 16px', cursor: 'pointer', ...s.small, fontWeight: 600, color: C.gold }}>
              Reserve
            </button>
          </div>
        )}
      </nav>

      {narrow && menuOpen && (
        <div style={{ background: C.bg, borderBottom: `1px solid ${C.rule}`, padding: '8px 24px 16px' }}>
          {['Menu', 'Wine', 'Private Dining', 'About'].map(n => (
            <div key={n} style={{ ...s.small, color: C.muted, padding: '10px 0', borderBottom: `1px solid ${C.rule}` }}>{n}</div>
          ))}
          <div style={{ paddingTop: 14 }}>
            <button style={{ width: '100%', background: C.gold, color: C.bg, border: 'none', borderRadius: 6, padding: '10px', cursor: 'pointer', ...s.small, fontWeight: 700 }}>Reserve a table</button>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{
        padding: '120px 56px 96px',
        textAlign: 'center',
        background: `radial-gradient(ellipse 100% 70% at 50% 0%, ${theme === 'dark' ? 'rgba(200,169,110,0.07)' : 'rgba(155,107,26,0.06)'} 0%, transparent 60%)`,
        borderBottom: `1px solid ${C.rule}`,
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 1, height: 72, background: `linear-gradient(to bottom, transparent, ${C.gold}44)` }} />

        <p style={{ ...s.label, color: C.gold, letterSpacing: '0.22em', marginBottom: 28, textTransform: 'uppercase' }}>
          San Francisco · Est. 2019
        </p>

        {onTextChange && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 16, marginTop: -12, fontSize: 10, color: C.muted, border: `1px dashed ${C.border}`, borderRadius: 20, padding: '3px 11px' }}>
            <span>✏</span><span>click heading or text below to edit</span>
          </div>
        )}

        <h1
          contentEditable={!!onTextChange}
          suppressContentEditableWarning
          onBlur={onTextChange ? e => onTextChange({ heading: e.currentTarget.innerText }) : undefined}
          style={{ ...s.h1, color: C.light, lineHeight: 1.06, marginBottom: 24, whiteSpace: 'pre-line', outline: 'none', cursor: onTextChange ? 'text' : 'default', borderBottom: onTextChange ? `1.5px dashed ${C.border}` : 'none', paddingBottom: onTextChange ? 4 : 0 }}
        >
          {heroHeading}
        </h1>

        <div style={{ width: 56, height: 1, background: C.gold, margin: '0 auto 28px', opacity: 0.6 }} />

        <p
          contentEditable={!!onTextChange}
          suppressContentEditableWarning
          onBlur={onTextChange ? e => onTextChange({ body: e.currentTarget.innerText }) : undefined}
          style={{
            ...s.body, color: C.muted, maxWidth: 500, margin: '0 auto 48px',
            lineHeight: settings.lineHeight, fontSize: `${settings.baseFontSize * 1.05}px`,
            outline: 'none', cursor: onTextChange ? 'text' : 'default',
            borderBottom: onTextChange ? `1.5px dashed ${C.border}` : 'none', paddingBottom: onTextChange ? 4 : 0,
          }}
        >
          {heroBody}
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button style={{
            background: C.gold, color: C.bg, border: 'none', borderRadius: 7,
            padding: '13px 32px', cursor: 'pointer', ...s.body, fontWeight: 700,
          }}>
            Reserve a table
          </button>
          <button style={{
            background: 'transparent', color: C.light, border: `1px solid ${C.btnAlt}`,
            borderRadius: 7, padding: '13px 32px', cursor: 'pointer', ...s.body,
          }}>
            View menu
          </button>
        </div>

        {/* Decorative plates */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 72, alignItems: 'flex-end' }}>
          {[{ w: 110, h: 110, op: 0.25 }, { w: 160, h: 160, op: 0.35 }, { w: 110, h: 110, op: 0.25 }].map((p, i) => (
            <div key={i} style={{
              width: p.w, height: p.h, borderRadius: '50%',
              border: `1px solid ${C.plateBorder(p.op)}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `radial-gradient(circle, ${C.plateBorder(0.05)}, transparent 70%)`,
            }}>
              <div style={{ width: p.w * 0.4, height: p.h * 0.4, borderRadius: '50%',
                background: C.plateBorder(0.08), border: `1px solid ${C.plateBorder(0.15)}` }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section style={{ padding: '88px 56px', borderBottom: `1px solid ${C.rule}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 40, alignItems: 'center', maxWidth: 1040, margin: '0 auto' }}>
          <div style={{
            borderRadius: 12, height: 440,
            background: C.imgBg,
            border: `1px solid ${C.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: C.imgGlow }} />
            <span style={{ ...s.small, color: C.muted, position: 'relative' }}>Chef Marco · Portrait</span>
          </div>
          <div>
            <p style={{ ...s.label, color: C.gold, letterSpacing: '0.18em', marginBottom: 20 }}>
              Our Philosophy
            </p>
            <h2 style={{ ...s.h2, color: C.light, marginBottom: 24, lineHeight: 1.1 }}>
              Rooted in tradition,<br />alive to the present
            </h2>
            <div style={{ width: 36, height: 1, background: C.gold, marginBottom: 28, opacity: 0.6 }} />
            <p style={{ ...s.body, color: C.muted, lineHeight: settings.lineHeight, marginBottom: 20 }}>
              Chef Marco Bellini learned to cook by watching his grandmother transform simple, honest ingredients into extraordinary meals in a Florentine kitchen. He trained under Michelin-starred chefs in Lyon and Tokyo before coming home to California.
            </p>
            <p style={{ ...s.body, color: C.muted, lineHeight: settings.lineHeight }}>
              Today, his menu shifts with the seasons, the farms he visits, and the conversations he overhears at the market. It is Italian in spirit, Californian in soul.
            </p>
          </div>
        </div>
      </section>

      {/* ── MENU ── */}
      <section style={{ padding: '96px 56px', background: C.surface, borderBottom: `1px solid ${C.rule}` }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ ...s.label, color: C.gold, letterSpacing: '0.22em', marginBottom: 16 }}>
              Spring Menu · 2024
            </p>
            <h2 style={{ ...s.h2, color: C.light }}>À la carte</h2>
            <div style={{ width: 56, height: 1, background: C.gold, margin: '20px auto 0', opacity: 0.4 }} />
          </div>

          {Object.entries(menu).map(([course, items]) => (
            <div key={course} style={{ marginBottom: 52 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                <div style={{ flex: 1, height: 1, background: C.rule }} />
                <span style={{ ...s.label, color: C.gold, letterSpacing: '0.16em', whiteSpace: 'nowrap' }}>
                  {course}
                </span>
                <div style={{ flex: 1, height: 1, background: C.rule }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {items.map(({ name, desc, price }) => (
                  <div key={name} style={{ display: 'flex', gap: 16, justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ ...s.h5, color: C.light, marginBottom: 5 }}>{name}</p>
                      <p style={{ ...s.small, color: C.muted, fontStyle: 'italic', lineHeight: 1.6 }}>{desc}</p>
                    </div>
                    <span style={{ ...s.body, color: C.gold, fontWeight: 500, flexShrink: 0 }}>${price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p style={{ ...s.small, color: C.muted, textAlign: 'center', fontStyle: 'italic', opacity: 0.7 }}>
            Please inform your server of dietary requirements.
            A discretionary 12% service charge is added for parties of 6 or more.
          </p>
        </div>
      </section>

      {/* ── ACCOLADES ── */}
      <section style={{ padding: '60px 56px', borderBottom: `1px solid ${C.rule}` }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { v: '★★',  l: 'Michelin Guide',               y: '2022 – 2024' },
            { v: '#3',  l: 'SF Chronicle Best Restaurants', y: '2023' },
            { v: '97',  l: 'Eater SF Rating',               y: '2024' },
          ].map(({ v, l, y }) => (
            <div key={v} style={{ textAlign: 'center' }}>
              <p style={{ ...s.h3, color: C.gold, marginBottom: 4 }}>{v}</p>
              <p style={{ ...s.small, color: C.light, fontWeight: 600, marginBottom: 2 }}>{l}</p>
              <p style={{ ...s.label, color: C.muted }}>{y}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESERVATION ── */}
      <section style={{ padding: '96px 56px', textAlign: 'center' }}>
        <p style={{ ...s.label, color: C.gold, letterSpacing: '0.2em', marginBottom: 20 }}>Reserve</p>
        <h2 style={{ ...s.h2, color: C.light, marginBottom: 16 }}>Join us for dinner</h2>
        <p style={{ ...s.body, color: C.muted, marginBottom: 8 }}>
          Tuesday – Sunday · 6:00 pm to 10:30 pm
        </p>
        <p style={{ ...s.body, color: C.muted, marginBottom: 44 }}>
          231 Hayes Street · San Francisco, CA 94102
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button style={{
            background: C.gold, color: C.bg, border: 'none',
            borderRadius: 7, padding: '13px 32px', cursor: 'pointer',
            ...s.body, fontWeight: 700,
          }}>
            Book online
          </button>
          <button style={{
            background: 'transparent', color: C.cream,
            border: `1px solid ${C.btnAlt}`,
            borderRadius: 7, padding: '13px 32px', cursor: 'pointer', ...s.body,
          }}>
            +1 (415) 555-0192
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: '24px 56px',
        borderTop: `1px solid ${C.rule}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          ...s.h5, color: C.gold, letterSpacing: '0.2em', textTransform: 'uppercase',
          fontFamily: s.h1.fontFamily, fontWeight: s.h1.fontWeight,
        }}>Osteria</span>
        <span style={{ ...s.small, color: C.muted }}>© 2024 Osteria SF</span>
      </footer>
    </div>
  )
}
