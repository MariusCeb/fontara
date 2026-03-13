import React, { useState, useEffect, useRef } from 'react'
import { TypographySettings, CustomText } from '../../../types'
import { PreviewTheme } from '../../../store/typographyStore'
import { getStyleMap } from '../../../utils/typography'

interface Props { settings: TypographySettings; customText?: CustomText; theme?: PreviewTheme; onTextChange?: (t: Partial<CustomText>) => void }

const PALETTE = {
  light: {
    bg: '#fafafa', dark: '#111111', mid: '#555555', muted: '#888888',
    faint: '#f0f0f0', border: '#e5e5e5', rule: '#e0e0e0',
    accent: '#111111', navBg: 'rgba(250,250,250,0.92)',
    blockquoteBg: '#f4f4f4', blockquoteBorder: '#d0d0d0',
  },
  dark: {
    bg: '#0f0f0f', dark: '#efefef', mid: '#aaaaaa', muted: '#666666',
    faint: '#1a1a1a', border: 'rgba(255,255,255,0.08)', rule: 'rgba(255,255,255,0.07)',
    accent: '#efefef', navBg: 'rgba(15,15,15,0.92)',
    blockquoteBg: 'rgba(255,255,255,0.03)', blockquoteBorder: 'rgba(255,255,255,0.15)',
  },
}

export function EcommerceLayout({ settings, customText, theme = 'light', onTextChange }: Props) {
  const s = getStyleMap(settings)
  const C = PALETTE[theme]

  const heroHeading = customText?.heading || 'Soleil Renewal Serum'
  const heroBody    = customText?.body    || 'A weightless daily serum that visibly brightens, firms, and restores radiance over time. Formulated with stabilised vitamin C, bakuchiol, and cold-pressed sea buckthorn — no fragrance, no compromise.'

  const [narrow, setNarrow] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState('30ml')
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setNarrow(e.contentRect.width < 560))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const bar: React.CSSProperties = { display: 'block', width: 18, height: 1.5, background: C.dark, borderRadius: 1 }

  const editableStyle = (base: React.CSSProperties): React.CSSProperties => ({
    ...base,
    outline: 'none',
    cursor: onTextChange ? 'text' : 'default',
    borderBottom: onTextChange ? `1.5px dashed ${C.rule}` : 'none',
    paddingBottom: onTextChange ? 4 : 0,
  })

  const sizes = ['30ml', '50ml', '100ml']

  const relatedProducts = [
    { name: 'Lumière Eye Concentrate', price: '$62' },
    { name: 'Velvet Barrier Cream', price: '$74' },
    { name: 'Clarity Exfoliant Gel', price: '$48' },
  ]

  return (
    <div ref={rootRef} style={{ background: C.bg, color: C.dark }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', height: 56,
        borderBottom: `1px solid ${C.rule}`,
        position: 'sticky', top: 0,
        background: C.navBg, backdropFilter: 'blur(12px)', zIndex: 10,
      }}>
        <span style={{
          ...s.h5,
          fontFamily: s.h1.fontFamily,
          fontWeight: s.h1.fontWeight,
          letterSpacing: '-0.02em',
          color: C.dark,
        }}>
          Aether
        </span>

        {narrow ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ ...s.body, color: C.dark, fontSize: 18 }}>🛍</span>
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <span style={bar} /><span style={bar} /><span style={{ ...bar, width: 12 }} />
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 28 }}>
              {['Collections', 'About', 'Journal'].map(n => (
                <span key={n} style={{ ...s.small, color: C.mid }}>{n}</span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={C.mid} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v12a2 2 0 002 2h10a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="17" y2="6" />
                <path d="M13 10a3 3 0 01-6 0" />
              </svg>
            </div>
          </>
        )}
      </nav>

      {narrow && menuOpen && (
        <div style={{ background: C.bg, borderBottom: `1px solid ${C.rule}`, padding: '8px 28px 16px' }}>
          {['Collections', 'About', 'Journal'].map(n => (
            <div key={n} style={{ ...s.small, color: C.mid, padding: '10px 0', borderBottom: `1px solid ${C.rule}` }}>{n}</div>
          ))}
        </div>
      )}

      {/* ── PRODUCT SECTION ── */}
      <section style={{
        maxWidth: 1080,
        margin: '0 auto',
        padding: narrow ? '32px 20px' : '56px 28px',
        display: narrow ? 'block' : 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 56,
        alignItems: 'start',
      }}>

        {/* LEFT: product image */}
        <div style={{
          borderRadius: 12,
          overflow: 'hidden',
          border: `1px solid ${C.border}`,
          background: theme === 'light'
            ? 'linear-gradient(160deg, #ede8e2, #d8d1c8)'
            : 'linear-gradient(160deg, #1e1c1a, #151310)',
          aspectRatio: '3 / 4',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: narrow ? 32 : 0,
        }}>
          <span style={{ ...s.small, color: C.muted }}>Product Image</span>
        </div>

        {/* RIGHT: product info */}
        <div>
          {/* Edit hint */}
          {onTextChange && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              marginBottom: 16, fontSize: 10, color: C.muted,
              border: `1px dashed ${C.rule}`, borderRadius: 20, padding: '3px 11px',
            }}>
              <span>&#9998;</span><span>click heading or text below to edit</span>
            </div>
          )}

          {/* Category tag */}
          <p style={{ ...s.label, color: C.muted, letterSpacing: '0.1em', marginBottom: 14 }}>
            Skincare · No. 07
          </p>

          {/* Product name — editable */}
          <h1
            contentEditable={!!onTextChange}
            suppressContentEditableWarning
            onBlur={onTextChange ? e => onTextChange({ heading: e.currentTarget.innerText }) : undefined}
            style={editableStyle({
              ...s.h1,
              color: C.dark,
              lineHeight: 1.1,
              marginBottom: 16,
              whiteSpace: 'pre-line',
            })}
          >
            {heroHeading}
          </h1>

          {/* Star rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{ color: '#c8a84b', letterSpacing: 2, fontSize: 14 }}>★★★★★</span>
            <span style={{ ...s.small, color: C.muted }}>4.8 · 126 reviews</span>
          </div>

          {/* Price */}
          <p style={{
            ...s.h3,
            fontFamily: s.h1.fontFamily,
            fontWeight: s.h1.fontWeight,
            color: C.dark,
            marginBottom: 20,
          }}>
            $84
          </p>

          {/* Description — editable */}
          <p
            contentEditable={!!onTextChange}
            suppressContentEditableWarning
            onBlur={onTextChange ? e => onTextChange({ body: e.currentTarget.innerText }) : undefined}
            style={editableStyle({
              ...s.body,
              color: C.mid,
              lineHeight: settings.lineHeight,
              marginBottom: 28,
            })}
          >
            {heroBody}
          </p>

          {/* Size selector */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ ...s.label, color: C.muted, marginBottom: 10, letterSpacing: '0.06em' }}>Size</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    ...s.small,
                    padding: '7px 18px',
                    borderRadius: 40,
                    border: `1.5px solid ${selectedSize === size ? C.dark : C.border}`,
                    background: selectedSize === size ? C.dark : 'transparent',
                    color: selectedSize === size ? C.bg : C.mid,
                    cursor: 'pointer',
                    fontWeight: selectedSize === size ? 600 : 400,
                    transition: 'all 0.15s',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to bag CTA */}
          <button style={{
            width: '100%',
            background: C.dark,
            color: C.bg,
            border: 'none',
            borderRadius: 8,
            padding: '14px 0',
            cursor: 'pointer',
            ...s.body,
            fontWeight: 600,
            letterSpacing: '0.04em',
            marginBottom: 20,
          }}>
            Add to Bag
          </button>

          {/* Trust badges */}
          <p style={{ ...s.label, color: C.muted, textAlign: 'center', letterSpacing: '0.04em' }}>
            Free shipping · 30-day returns · Cruelty free
          </p>
        </div>
      </section>

      {/* ── YOU MIGHT ALSO LIKE ── */}
      <section style={{
        maxWidth: 1080,
        margin: '0 auto',
        padding: narrow ? '0 20px 56px' : '0 28px 72px',
        borderTop: `1px solid ${C.rule}`,
        paddingTop: 48,
      }}>
        <h2 style={{ ...s.h3, fontFamily: s.h1.fontFamily, fontWeight: s.h1.fontWeight, color: C.dark, marginBottom: 32 }}>
          You might also like
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: narrow ? '1fr' : 'repeat(3, 1fr)',
          gap: 24,
        }}>
          {relatedProducts.map((product, i) => (
            <div key={i} style={{ cursor: 'pointer' }}>
              <div style={{
                borderRadius: 10,
                border: `1px solid ${C.border}`,
                background: theme === 'light'
                  ? `linear-gradient(${140 + i * 15}deg, #ece8e2, #d5cec6)`
                  : `linear-gradient(${140 + i * 15}deg, #1c1a18, #131210)`,
                aspectRatio: '3 / 4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14,
              }}>
                <span style={{ ...s.label, color: C.muted }}>Image</span>
              </div>
              <p style={{ ...s.body, color: C.dark, fontWeight: 600, marginBottom: 4 }}>{product.name}</p>
              <p style={{ ...s.small, color: C.muted }}>{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: `1px solid ${C.rule}`,
        padding: '24px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: C.faint,
      }}>
        <span style={{
          ...s.h5,
          fontFamily: s.h1.fontFamily,
          fontWeight: s.h1.fontWeight,
          color: C.dark,
          letterSpacing: '-0.01em',
        }}>
          Aether
        </span>
        <span style={{ ...s.small, color: C.muted }}>© 2026 Aether Skincare Ltd.</span>
      </footer>
    </div>
  )
}
