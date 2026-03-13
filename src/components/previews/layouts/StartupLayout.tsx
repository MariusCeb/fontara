import React, { useState, useEffect, useRef } from 'react'
import { TypographySettings, CustomText } from '../../../types'
import { PreviewTheme } from '../../../store/typographyStore'
import { getStyleMap } from '../../../utils/typography'

interface Props { settings: TypographySettings; customText?: CustomText; theme?: PreviewTheme; onTextChange?: (t: Partial<CustomText>) => void }

const PALETTE = {
  light: {
    bg:      '#ffffff',
    dark:    '#09090b',
    mid:     '#52525b',
    muted:   '#a1a1aa',
    faint:   '#f4f4f5',
    border:  '#e4e4e7',
    accent:  '#6d5af5',
    accentL: '#f5f3ff',
    accentM: '#ede9fe',
    navBg:   'rgba(255,255,255,0.9)',
    codeBg:  '#f8f7ff',
    footerBg:'#09090b',
    footerT: '#ffffff',
    footerS: 'rgba(255,255,255,0.3)',
  },
  dark: {
    bg:      '#09090b',
    dark:    '#f0f0f5',
    mid:     '#a1a1aa',
    muted:   '#71717a',
    faint:   '#111115',
    border:  'rgba(255,255,255,0.08)',
    accent:  '#7c6af7',
    accentL: 'rgba(124,106,247,0.08)',
    accentM: 'rgba(124,106,247,0.16)',
    navBg:   'rgba(9,9,11,0.85)',
    codeBg:  '#0f0f14',
    footerBg:'#060608',
    footerT: '#f0f0f5',
    footerS: 'rgba(240,240,245,0.25)',
  },
}

const btn = (variant: 'primary' | 'outline', C: typeof PALETTE['light'], extra?: React.CSSProperties): React.CSSProperties => ({
  padding: '11px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
  fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em',
  ...(variant === 'primary'
    ? { background: C.accent, color: '#fff' }
    : { background: 'transparent', color: C.dark, border: `1.5px solid ${C.border}` }),
  ...extra,
})

export function StartupLayout({ settings, customText, theme = 'light', onTextChange }: Props) {
  const s = getStyleMap(settings)
  const C = PALETTE[theme]
  const heroHeading = customText?.heading || 'Build and ship\nwithout limits'
  const heroBody    = customText?.body    || "The platform that lets your team design, preview, and deploy in one continuous flow. No context switching. No config hell."

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

  return (
    <div ref={rootRef} style={{ background: C.bg, color: C.dark, minHeight: '100%' }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: 1160, margin: '0 auto', padding: '0 24px', height: 56,
      }}>
        <span style={{ ...s.h5, fontWeight: 800, letterSpacing: '-0.04em', color: C.dark }}>velox</span>

        {narrow ? (
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={bar} /><span style={bar} /><span style={{ ...bar, width: 12 }} />
          </button>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 28 }}>
              {['Features', 'Pricing', 'Changelog', 'Docs'].map(n => (
                <span key={n} style={{ ...s.small, color: C.mid }}>{n}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ ...s.small, color: C.mid }}>Sign in</span>
              <button style={btn('primary', C, { padding: '7px 18px', fontSize: 13 })}>Get started free</button>
            </div>
          </>
        )}
      </nav>

      {/* Mobile menu */}
      {narrow && menuOpen && (
        <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}`, padding: '8px 24px 16px' }}>
          {['Features', 'Pricing', 'Changelog', 'Docs', 'Sign in'].map(n => (
            <div key={n} style={{ ...s.small, color: C.mid, padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>{n}</div>
          ))}
          <div style={{ paddingTop: 14 }}>
            <button style={btn('primary', C, { width: '100%', textAlign: 'center' })}>Get started free</button>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{
        background: `radial-gradient(ellipse 80% 60% at 50% -20%, ${C.accentM} 0%, transparent 70%)`,
        borderBottom: `1px solid ${C.border}`,
        padding: '88px 40px 80px', textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: C.accentM, borderRadius: 100, padding: '5px 14px', marginBottom: 32,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.accent, display: 'block', flexShrink: 0 }} />
          <span style={{ ...s.label, color: C.accent, letterSpacing: '0.06em' }}>Announcing Velox 2.0 →</span>
        </div>

        {onTextChange && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 16, marginTop: -8, fontSize: 10, color: C.muted, border: `1px dashed ${C.border}`, borderRadius: 20, padding: '3px 11px' }}>
            <span>✏</span><span>click heading or text below to edit</span>
          </div>
        )}

        <h1
          contentEditable={!!onTextChange}
          suppressContentEditableWarning
          onBlur={onTextChange ? e => onTextChange({ heading: e.currentTarget.innerText }) : undefined}
          style={{ ...s.h1, color: C.dark, maxWidth: 800, margin: '0 auto 24px', lineHeight: 1.08, whiteSpace: 'pre-line', outline: 'none', cursor: onTextChange ? 'text' : 'default', borderBottom: onTextChange ? `1.5px dashed ${C.border}` : 'none', paddingBottom: onTextChange ? 4 : 0 }}
        >
          {heroHeading}
        </h1>
        <p
          contentEditable={!!onTextChange}
          suppressContentEditableWarning
          onBlur={onTextChange ? e => onTextChange({ body: e.currentTarget.innerText }) : undefined}
          style={{ ...s.body, color: C.mid, maxWidth: 520, margin: '0 auto 40px', lineHeight: settings.lineHeight, fontSize: `${settings.baseFontSize * 1.1}px`, outline: 'none', cursor: onTextChange ? 'text' : 'default', borderBottom: onTextChange ? `1.5px dashed ${C.border}` : 'none', paddingBottom: onTextChange ? 4 : 0 }}
        >
          {heroBody}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={btn('primary', C, { fontSize: 15, padding: '13px 28px' })}>Start for free</button>
          <button style={btn('outline', C, { fontSize: 15, padding: '13px 28px' })}>View demo ↗</button>
        </div>

        {/* Mock UI */}
        <div style={{
          maxWidth: 860, margin: '64px auto 0', borderRadius: 14, overflow: 'hidden',
          border: `1px solid ${C.border}`,
          boxShadow: theme === 'light'
            ? '0 1px 1px rgba(0,0,0,0.02), 0 12px 24px rgba(0,0,0,0.04), 0 32px 64px rgba(109,90,245,0.06)'
            : '0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.6)',
          background: C.codeBg,
        }}>
          <div style={{ height: 36, background: C.faint, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px' }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
            <div style={{ flex: 1, maxWidth: 300, height: 18, background: C.border, borderRadius: 4, margin: '0 auto' }} />
          </div>
          <div style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,180px) 1fr', gap: 20, height: 240, overflow: 'hidden' }}>
            <div>
              {[70,85,60,90,50].map((w, i) => (
                <div key={i} style={{ height: 8, borderRadius: 4, marginBottom: 10, background: `rgba(109,90,245,${i === 0 ? 0.3 : 0.1})`, width: `${w}%` }} />
              ))}
            </div>
            <div style={{ background: C.bg, borderRadius: 10, border: `1px solid ${C.border}`, padding: 20 }}>
              <div style={{ display: 'flex', gap: 20, height: '100%' }}>
                {[0.15, 0.08, 0.12].map((op, i) => (
                  <div key={i} style={{ flex: i === 1 ? 2 : 1, background: `rgba(109,90,245,${op})`, borderRadius: 8 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGOS ── */}
      <section style={{ padding: '40px', borderBottom: `1px solid ${C.border}` }}>
        <p style={{ ...s.label, color: C.muted, textAlign: 'center', marginBottom: 24 }}>Trusted by teams at</p>
        <div style={{ display: 'flex', gap: 48, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {['Stripe','Vercel','Linear','Notion','Figma','Loom'].map(n => (
            <span key={n} style={{ ...s.h5, color: C.muted, fontWeight: 800, letterSpacing: '-0.03em', opacity: 0.6 }}>{n}</span>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '96px 40px', maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ ...s.label, color: C.accent, letterSpacing: '0.08em', marginBottom: 14 }}>Features</p>
          <h2 style={{ ...s.h2, color: C.dark, marginBottom: 16, lineHeight: 1.1 }}>Everything your team needs</h2>
          <p style={{ ...s.body, color: C.mid, maxWidth: 480, margin: '0 auto' }}>From design handoff to production deploy — all in one connected platform.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 20 }}>
          {[
            { title: 'Zero-config deploys',    desc: 'Push to git and your app is live in seconds.' },
            { title: 'Real-time collaboration', desc: 'Live cursors, inline comments, no context switching.' },
            { title: 'Instant preview URLs',    desc: 'Every branch gets a shareable URL before merging.' },
            { title: 'Edge-native performance', desc: '50ms from every user on earth. Global CDN.' },
            { title: 'Observability built in',  desc: 'Core Web Vitals, errors, logs — no agents needed.' },
            { title: 'Team-first security',     desc: 'SSO, RBAC, audit logs, SOC 2 Type II compliant.' },
          ].map(({ title, desc }) => (
            <div key={title} style={{ padding: '24px', borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: C.accentM, marginBottom: 16 }} />
              <h4 style={{ ...s.h4, color: C.dark, marginBottom: 8 }}>{title}</h4>
              <p style={{ ...s.small, color: C.mid, lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section style={{ background: C.faint, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '80px 40px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginBottom: 28 }}>
            {Array(5).fill(0).map((_, i) => <span key={i} style={{ color: '#f59e0b', fontSize: 16 }}>★</span>)}
          </div>
          <blockquote style={{ ...s.h3, color: C.dark, lineHeight: 1.4, fontStyle: 'italic', marginBottom: 36 }}>
            "Velox shaved two weeks off our release cycle. We ship features we used to think were too risky."
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.accentM, display: 'flex', alignItems: 'center', justifyContent: 'center', ...s.small, fontWeight: 700, color: C.accent }}>MK</div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ ...s.body, fontWeight: 600, color: C.dark }}>Marcus Kim</p>
              <p style={{ ...s.small, color: C.muted }}>VP Engineering, Beacon</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: '96px 40px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ ...s.label, color: C.accent, letterSpacing: '0.08em', marginBottom: 14 }}>Pricing</p>
          <h2 style={{ ...s.h2, color: C.dark }}>Simple, honest pricing</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 20, alignItems: 'start' }}>
          {[
            { tier: 'Hobby', price: '$0',  features: ['3 projects','100 deploys/mo','Shared CDN'], featured: false },
            { tier: 'Pro',   price: '$19', features: ['Unlimited projects','10k deploys/mo','Priority edge','Analytics','Custom domains'], featured: true },
            { tier: 'Team',  price: '$49', features: ['Everything in Pro','10 seats','SSO','Audit logs','SLA'], featured: false },
          ].map(({ tier, price, features, featured }) => (
            <div key={tier} style={{
              borderRadius: 14, padding: '28px',
              border: featured ? 'none' : `1px solid ${C.border}`,
              background: featured ? C.accent : C.bg,
              color: featured ? '#fff' : C.dark,
              boxShadow: featured ? '0 8px 32px rgba(109,90,245,0.25)' : 'none',
            }}>
              <p style={{ ...s.label, color: featured ? 'rgba(255,255,255,0.6)' : C.muted, marginBottom: 10 }}>{tier}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
                <span style={{ ...s.h2, lineHeight: 1 }}>{price}</span>
                <span style={{ ...s.small, color: featured ? 'rgba(255,255,255,0.55)' : C.muted }}>/month</span>
              </div>
              <div style={{ height: 1, background: featured ? 'rgba(255,255,255,0.15)' : C.border, margin: '20px 0' }} />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
                {features.map(f => (
                  <li key={f} style={{ ...s.small, display: 'flex', gap: 8, color: featured ? 'rgba(255,255,255,0.85)' : C.mid }}>
                    <span style={{ color: featured ? '#c4b5fd' : '#10b981', flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button style={{ width: '100%', padding: '11px', borderRadius: 8, border: 'none', cursor: 'pointer', ...s.small, fontWeight: 700, background: featured ? '#fff' : C.accent, color: featured ? C.accent : '#fff' }}>
                Get started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: C.footerBg, padding: '88px 40px', textAlign: 'center' }}>
        <h2 style={{ ...s.h2, color: C.footerT, marginBottom: 16 }}>Ready to move faster?</h2>
        <p style={{ ...s.body, color: C.footerS, maxWidth: 400, margin: '0 auto 36px' }}>Join 18,000 teams shipping confidently with Velox.</p>
        <button style={btn('primary', C, { fontSize: 15, padding: '13px 32px' })}>Start building — it's free</button>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.footerBg, borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)'}`, padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ ...s.h5, color: C.footerT, fontWeight: 800, letterSpacing: '-0.04em' }}>velox</span>
        <span style={{ ...s.small, color: C.footerS }}>© 2024 Velox Inc.</span>
      </footer>
    </div>
  )
}
