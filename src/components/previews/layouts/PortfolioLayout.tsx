import React, { useState, useEffect, useRef } from 'react'
import { TypographySettings, CustomText } from '../../../types'
import { PreviewTheme } from '../../../store/typographyStore'
import { getStyleMap } from '../../../utils/typography'

interface Props { settings: TypographySettings; customText?: CustomText; theme?: PreviewTheme; onTextChange?: (t: Partial<CustomText>) => void }

const PALETTE = {
  light: {
    bg:     '#ffffff',
    dark:   '#0a0a0a',
    mid:    '#52525b',
    muted:  '#a1a1aa',
    faint:  '#fafafa',
    border: '#f0f0f0',
    rule:   '#e8e8e8',
    tagBg:  '#ffffff',
    ctaBg:  '#0a0a0a',
    ctaText:'#ffffff',
    ctaSub: 'rgba(255,255,255,0.45)',
    navBg:  'rgba(255,255,255,0.9)',
  },
  dark: {
    bg:     '#09090b',
    dark:   '#f0f0f5',
    mid:    '#a1a1aa',
    muted:  '#71717a',
    faint:  '#0f0f12',
    border: 'rgba(255,255,255,0.06)',
    rule:   'rgba(255,255,255,0.09)',
    tagBg:  '#18181d',
    ctaBg:  '#060608',
    ctaText:'#f0f0f5',
    ctaSub: 'rgba(240,240,245,0.4)',
    navBg:  'rgba(9,9,11,0.85)',
  },
}

const WORK_COLORS = {
  light: ['#f0f4ff','#fff7f0','#f0fdf4','#fdf4ff'],
  dark:  ['rgba(99,102,241,0.1)','rgba(249,115,22,0.08)','rgba(16,185,129,0.08)','rgba(168,85,247,0.08)'],
}

export function PortfolioLayout({ settings, customText, theme = 'light', onTextChange }: Props) {
  const s = getStyleMap(settings)
  const C = PALETTE[theme]
  const wc = WORK_COLORS[theme]
  const heroHeading = customText?.heading || 'I design products\nthat earn trust.'
  const heroBody    = customText?.body    || 'Product designer with 8 years helping startups and established companies turn complex problems into clear, beautiful interfaces. Currently open to senior roles.'

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

  const bar: React.CSSProperties = { display: 'block', width: 18, height: 1.5, background: C.dark, borderRadius: 1 }

  const works = [
    { title: 'Meridian Design System', cat: 'Systems',     yr: '2024', color: wc[0] },
    { title: 'Finovo Mobile App',      cat: 'Product',     yr: '2024', color: wc[1] },
    { title: 'Vessel E-commerce',      cat: 'UX Research', yr: '2023', color: wc[2] },
    { title: 'Form — Brand Identity',  cat: 'Branding',    yr: '2023', color: wc[3] },
  ]

  return (
    <div ref={rootRef} style={{ background: C.bg, color: C.dark }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 56,
        borderBottom: `1px solid ${C.rule}`,
        position: 'sticky', top: 0,
        background: C.navBg, backdropFilter: 'blur(12px)', zIndex: 10,
      }}>
        <span style={{ ...s.h5, fontWeight: 700, letterSpacing: '-0.02em' }}>Alex Chen</span>

        {narrow ? (
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={bar} /><span style={bar} /><span style={{ ...bar, width: 12 }} />
          </button>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 32 }}>
              {['Work','About','Writing','Contact'].map(n => (
                <span key={n} style={{ ...s.small, color: C.mid }}>{n}</span>
              ))}
            </div>
            <button style={{ border: `1.5px solid ${C.rule}`, background: 'transparent', borderRadius: 7, padding: '6px 16px', cursor: 'pointer', ...s.small, fontWeight: 600, color: C.dark }}>
              Resume ↗
            </button>
          </>
        )}
      </nav>

      {narrow && menuOpen && (
        <div style={{ background: C.bg, borderBottom: `1px solid ${C.rule}`, padding: '8px 24px 16px' }}>
          {['Work','About','Writing','Contact'].map(n => (
            <div key={n} style={{ ...s.small, color: C.mid, padding: '10px 0', borderBottom: `1px solid ${C.rule}` }}>{n}</div>
          ))}
          <div style={{ paddingTop: 14 }}>
            <button style={{ width: '100%', background: C.dark, color: C.bg, border: 'none', borderRadius: 7, padding: '10px', cursor: 'pointer', ...s.small, fontWeight: 600 }}>Resume ↗</button>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{ padding: '96px 56px 72px' }}>
        <div style={{ maxWidth: 820 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ ...s.label, color: '#16a34a' }}>Available for projects</span>
          </div>
          {onTextChange && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 16, fontSize: 10, color: C.muted, border: `1px dashed ${C.rule}`, borderRadius: 20, padding: '3px 11px' }}>
              <span>✏</span><span>click heading or text below to edit</span>
            </div>
          )}

          <h1
            contentEditable={!!onTextChange}
            suppressContentEditableWarning
            onBlur={onTextChange ? e => onTextChange({ heading: e.currentTarget.innerText }) : undefined}
            style={{ ...s.h1, color: C.dark, lineHeight: 1.04, marginBottom: 28, whiteSpace: 'pre-line', outline: 'none', cursor: onTextChange ? 'text' : 'default', borderBottom: onTextChange ? `1.5px dashed ${C.rule}` : 'none', paddingBottom: onTextChange ? 4 : 0 }}
          >
            {heroHeading}
          </h1>
          <p
            contentEditable={!!onTextChange}
            suppressContentEditableWarning
            onBlur={onTextChange ? e => onTextChange({ body: e.currentTarget.innerText }) : undefined}
            style={{ ...s.body, color: C.mid, maxWidth: 520, lineHeight: settings.lineHeight, fontSize: `${settings.baseFontSize * 1.1}px`, marginBottom: 40, outline: 'none', cursor: onTextChange ? 'text' : 'default', borderBottom: onTextChange ? `1.5px dashed ${C.rule}` : 'none', paddingBottom: onTextChange ? 4 : 0 }}
          >
            {heroBody}
          </p>
          <div style={{ display: 'flex', gap: 14 }}>
            <button style={{ background: C.dark, color: C.bg, border: 'none', borderRadius: 8, padding: '11px 24px', cursor: 'pointer', ...s.body, fontWeight: 600 }}>
              View my work
            </button>
            <button style={{ background: 'transparent', color: C.dark, border: `1.5px solid ${C.rule}`, borderRadius: 8, padding: '11px 24px', cursor: 'pointer', ...s.body }}>
              Say hello
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: '0 56px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}` }}>
          {[{ n: '8+', l: 'Years' }, { n: '60+', l: 'Projects' }, { n: '24', l: 'Clients' }, { n: '3×', l: 'Awards' }].map(({ n, l }, i) => (
            <div key={l} style={{ flex: '1 1 80px', padding: '20px 16px', borderRight: i < 3 ? `1px solid ${C.rule}` : 'none' }}>
              <p style={{ ...s.h2, color: C.dark, marginBottom: 4, lineHeight: 1 }}>{n}</p>
              <p style={{ ...s.small, color: C.muted }}>{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORK ── */}
      <section style={{ padding: '80px 56px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
          <h2 style={{ ...s.h3, color: C.dark }}>Selected Work</h2>
          <span style={{ ...s.small, color: C.muted }}>All projects →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 20 }}>
          {works.map(({ title, cat, yr, color }) => (
            <div key={title} style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}`, cursor: 'pointer' }}>
              <div style={{ height: 220, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: 80, height: 80, borderRadius: 20, background: 'rgba(0,0,0,0.07)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
                <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 100, ...s.label, color: C.mid }}>View</div>
              </div>
              <div style={{ padding: '16px 20px', background: C.bg }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ ...s.label, color: C.muted }}>{cat}</span>
                  <span style={{ ...s.label, color: C.muted, opacity: 0.5 }}>{yr}</span>
                </div>
                <h3 style={{ ...s.h4, color: C.dark }}>{title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ background: C.faint, borderTop: `1px solid ${C.rule}`, padding: '80px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 40, alignItems: 'center' }}>
          <div style={{ borderRadius: 14, height: 440, background: theme === 'light' ? 'linear-gradient(135deg, #e8e8f0, #d4d4dc)' : 'linear-gradient(135deg, #1a1a20, #111116)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${C.rule}` }}>
            <span style={{ ...s.body, color: C.muted }}>Photo</span>
          </div>
          <div>
            <p style={{ ...s.label, color: C.muted, marginBottom: 16 }}>About</p>
            <h2 style={{ ...s.h2, color: C.dark, marginBottom: 24, lineHeight: 1.1 }}>Designing with purpose</h2>
            <div style={{ width: 32, height: 2, background: C.dark, marginBottom: 28 }} />
            <p style={{ ...s.body, color: C.mid, lineHeight: settings.lineHeight, marginBottom: 18 }}>
              I grew up believing that design has a responsibility: to make things clearer, more useful, more human. After seven years at agencies and in-house teams, that conviction only grew.
            </p>
            <p style={{ ...s.body, color: C.mid, lineHeight: settings.lineHeight, marginBottom: 32 }}>
              I work best in environments where design is treated as a first-class discipline — not decoration.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Figma','Framer','Design Systems','User Research','Accessibility'].map(tag => (
                <span key={tag} style={{ ...s.small, background: C.tagBg, border: `1px solid ${C.rule}`, borderRadius: 6, padding: '4px 12px', color: C.dark }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WRITING ── */}
      <section style={{ padding: '80px 56px' }}>
        <h2 style={{ ...s.h3, color: C.dark, marginBottom: 40 }}>Recent Writing</h2>
        {[
          { date: 'Feb 2024', title: 'The case for boring design systems', time: '5 min' },
          { date: 'Jan 2024', title: 'How I reduced design handoff friction by 60%', time: '7 min' },
          { date: 'Nov 2023', title: 'Typography is the foundation, not the finish', time: '6 min' },
          { date: 'Oct 2023', title: 'I used Comic Sans ironically. It has been six months.', time: '3 min' },
        ].map(({ date, title, time }, i) => (
          <div key={title} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '20px 0', cursor: 'pointer', borderTop: i === 0 ? `1px solid ${C.rule}` : 'none', borderBottom: `1px solid ${C.rule}` }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
              <span style={{ ...s.label, color: C.muted, minWidth: 72 }}>{date}</span>
              <span style={{ ...s.h5, color: C.dark }}>{title}</span>
            </div>
            <span style={{ ...s.small, color: C.muted, flexShrink: 0 }}>{time} read</span>
          </div>
        ))}
      </section>

      {/* ── CONTACT ── */}
      <section style={{ background: C.ctaBg, padding: '88px 56px', textAlign: 'center' }}>
        <h2 style={{ ...s.h2, color: C.ctaText, marginBottom: 12 }}>Let's make something.</h2>
        <p style={{ ...s.body, color: C.ctaSub, marginBottom: 36, maxWidth: 360, margin: '0 auto 36px' }}>
          Selectively available for the right projects and roles.
        </p>
        <a href="#" style={{ display: 'inline-block', background: theme === 'dark' ? '#f0f0f5' : '#fff', color: C.ctaBg, borderRadius: 8, padding: '12px 28px', textDecoration: 'none', ...s.body, fontWeight: 700 }}>
          hello@alexchen.design
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '20px 56px', background: C.ctaBg, borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.07)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ ...s.small, color: C.ctaSub }}>© 2024 Alex Chen</span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Twitter','LinkedIn','Read.cv'].map(l => <span key={l} style={{ ...s.small, color: C.ctaSub }}>{l}</span>)}
        </div>
      </footer>
    </div>
  )
}
