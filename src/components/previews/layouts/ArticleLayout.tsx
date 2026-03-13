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

export function ArticleLayout({ settings, customText, theme = 'light', onTextChange }: Props) {
  const s = getStyleMap(settings)
  const C = PALETTE[theme]

  const heroHeading = customText?.heading || 'The Shape of Words: How Typography Became the Soul of Design'
  const heroBody    = customText?.body    || 'Typography is not the clothes a text wears — it is the voice in which it speaks. The choice of a typeface determines tone before a single word is read, setting expectations, invoking memory, and establishing trust or unease in the reader\'s mind before comprehension even begins.'

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

  const editableStyle = (base: React.CSSProperties): React.CSSProperties => ({
    ...base,
    outline: 'none',
    cursor: onTextChange ? 'text' : 'default',
    borderBottom: onTextChange ? `1.5px dashed ${C.rule}` : 'none',
    paddingBottom: onTextChange ? 4 : 0,
  })

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
          The Criterion
        </span>

        {narrow ? (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <span style={bar} /><span style={bar} /><span style={{ ...bar, width: 12 }} />
          </button>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 28 }}>
              {['Work', 'Culture', 'Tech', 'About'].map(n => (
                <span key={n} style={{ ...s.small, color: C.mid }}>{n}</span>
              ))}
            </div>
            <button style={{
              background: C.dark, color: C.bg, border: 'none',
              borderRadius: 6, padding: '6px 18px', cursor: 'pointer',
              ...s.small, fontWeight: 600,
            }}>
              Subscribe
            </button>
          </>
        )}
      </nav>

      {narrow && menuOpen && (
        <div style={{ background: C.bg, borderBottom: `1px solid ${C.rule}`, padding: '8px 28px 16px' }}>
          {['Work', 'Culture', 'Tech', 'About'].map(n => (
            <div key={n} style={{ ...s.small, color: C.mid, padding: '10px 0', borderBottom: `1px solid ${C.rule}` }}>{n}</div>
          ))}
          <div style={{ paddingTop: 14 }}>
            <button style={{ width: '100%', background: C.dark, color: C.bg, border: 'none', borderRadius: 6, padding: '10px', cursor: 'pointer', ...s.small, fontWeight: 600 }}>
              Subscribe
            </button>
          </div>
        </div>
      )}

      {/* ── ARTICLE HEADER ── */}
      <header style={{ maxWidth: 720, margin: '0 auto', padding: '64px 28px 0' }}>

        {/* Publication tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <span style={{
            ...s.label,
            color: C.bg,
            background: C.dark,
            borderRadius: 3,
            padding: '3px 10px',
            letterSpacing: '0.08em',
          }}>
            Design
          </span>
          <span style={{ ...s.label, color: C.muted }}>Long Read · 9 min</span>
        </div>

        {/* Edit hint */}
        {onTextChange && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            marginBottom: 18, fontSize: 10, color: C.muted,
            border: `1px dashed ${C.rule}`, borderRadius: 20, padding: '3px 11px',
          }}>
            <span>&#9998;</span><span>click heading or text below to edit</span>
          </div>
        )}

        {/* H1 title — editable */}
        <h1
          contentEditable={!!onTextChange}
          suppressContentEditableWarning
          onBlur={onTextChange ? e => onTextChange({ heading: e.currentTarget.innerText }) : undefined}
          style={editableStyle({
            ...s.h1,
            color: C.dark,
            lineHeight: 1.1,
            marginBottom: 28,
            whiteSpace: 'pre-line',
          })}
        >
          {heroHeading}
        </h1>

        {/* Author row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          paddingBottom: 28, borderBottom: `1px solid ${C.rule}`,
          marginBottom: 0,
        }}>
          {/* Avatar placeholder */}
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: theme === 'light'
              ? 'linear-gradient(135deg, #d8d8e0, #c0c0cc)'
              : 'linear-gradient(135deg, #2a2a30, #1e1e24)',
            flexShrink: 0, border: `1px solid ${C.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ ...s.label, color: C.muted, fontSize: 11, letterSpacing: 0 }}>ES</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ ...s.small, color: C.dark, fontWeight: 600, marginBottom: 2 }}>Elena Sørensen</p>
            <p style={{ ...s.label, color: C.muted }}>Contributing editor · March 13, 2026 · 9 min read</p>
          </div>
        </div>
      </header>

      {/* ── HERO IMAGE ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px' }}>
        <div style={{
          marginTop: 36,
          borderRadius: 10,
          overflow: 'hidden',
          border: `1px solid ${C.border}`,
          background: theme === 'light'
            ? 'linear-gradient(160deg, #e8e8ec, #d4d4da)'
            : 'linear-gradient(160deg, #1c1c22, #131318)',
          aspectRatio: '16 / 9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <span style={{ ...s.small, color: C.muted }}>Image</span>
          <div style={{
            position: 'absolute', bottom: 14, left: 14,
            background: theme === 'light' ? 'rgba(255,255,255,0.72)' : 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(8px)', borderRadius: 5,
            padding: '4px 10px',
          }}>
            <span style={{ ...s.label, color: C.mid }}>Detail from the Gutenberg Bible, 1455</span>
          </div>
        </div>
        <p style={{ ...s.label, color: C.muted, marginTop: 10, marginBottom: 0 }}>
          The 42-line Bible remains one of the most studied examples of deliberate typographic composition in history.
        </p>
      </div>

      {/* ── ARTICLE BODY ── */}
      <article style={{ maxWidth: 680, margin: '0 auto', padding: '44px 28px 80px' }}>

        {/* First paragraph — editable */}
        <p
          contentEditable={!!onTextChange}
          suppressContentEditableWarning
          onBlur={onTextChange ? e => onTextChange({ body: e.currentTarget.innerText }) : undefined}
          style={editableStyle({
            ...s.body,
            color: C.mid,
            lineHeight: settings.lineHeight,
            marginBottom: 24,
            fontSize: `${settings.baseFontSize * 1.08}px`,
          })}
        >
          {heroBody}
        </p>

        <p style={{ ...s.body, color: C.mid, lineHeight: settings.lineHeight, marginBottom: 24 }}>
          We have always read with our bodies as much as our minds. The rhythm of a well-set paragraph — the texture it makes on the page, the way the eye skips across measured leading — is a physical experience. Printers in the fifteenth century understood this intuitively, if not analytically. They knew that type had weight, that it had presence, that a badly-spaced line could make a reader pause, stumble, and lose the thread.
        </p>

        {/* H2 subheading */}
        <h2 style={{ ...s.h2, color: C.dark, marginTop: 48, marginBottom: 20, lineHeight: 1.15 }}>
          The Grammar of Negative Space
        </h2>

        <p style={{ ...s.body, color: C.mid, lineHeight: settings.lineHeight, marginBottom: 24 }}>
          Readability is not the same as legibility. A face may be perfectly legible — every letterform distinct and unambiguous — while remaining almost unreadable at length. The difference lives in the space between: between letters, between words, between lines, between paragraphs. It is the silence that gives the music its shape. Modern designers often think about type in terms of what they can see, the ink, the form, the curve of a bowl. But the masters of the craft thought equally hard about what they could not see.
        </p>

        <p style={{ ...s.body, color: C.mid, lineHeight: settings.lineHeight, marginBottom: 32 }}>
          The Swiss typographers of the mid-twentieth century codified this into a doctrine of sorts. The grid, the baseline, the modular scale — these were not aesthetic preferences but moral convictions. Emil Ruder wrote that "typography has one plain duty before it and that is to convey information in writing." But even Ruder knew that the how of conveyance was everything. The information does not flow like water through a pipe; it arrives shaped by the vessel.
        </p>

        {/* Blockquote */}
        <blockquote style={{
          margin: '36px 0',
          padding: '20px 28px',
          background: C.blockquoteBg,
          borderLeft: `3px solid ${C.blockquoteBorder}`,
          borderRadius: '0 6px 6px 0',
        }}>
          <p style={{
            ...s.h4,
            color: C.dark,
            fontStyle: 'italic',
            lineHeight: 1.5,
            fontFamily: s.h1.fontFamily,
            fontWeight: s.h1.fontWeight,
            margin: 0,
          }}>
            "A typeface is not just a tool for setting words. It is an argument about what those words deserve."
          </p>
          <p style={{ ...s.label, color: C.muted, marginTop: 14, marginBottom: 0 }}>
            — Beatrice Warde, <em>The Crystal Goblet</em>, 1932
          </p>
        </blockquote>

        <p style={{ ...s.body, color: C.mid, lineHeight: settings.lineHeight, marginBottom: 32 }}>
          Warde's famous essay — in which she argued that the ideal typography is invisible, as transparent as a crystal goblet that lets the wine speak for itself — has been debated ever since. Her critics point out that type is never truly neutral: every choice carries cultural weight, historical sediment, class associations. The typefaces we consider "invisible" are typically those that the dominant culture has simply naturalized through repetition. Helvetica feels neutral to a Western reader trained on Swiss modernism; it is anything but neutral to someone whose written tradition was formed elsewhere.
        </p>

        {/* Short bulleted list */}
        <p style={{ ...s.body, color: C.dark, fontWeight: 600, lineHeight: settings.lineHeight, marginBottom: 12 }}>
          What makes a typeface feel authoritative?
        </p>
        <ul style={{ margin: '0 0 28px 0', padding: '0 0 0 20px' }}>
          {[
            'Historical precedent — serifs with classical pedigree invoke trust by association.',
            'Optical regularity — even stroke width and consistent proportions ease the reading eye.',
            'Cultural saturation — familiarity breeds legibility, whether that is fair or not.',
            'Quality of the spacing tables — poorly-kerned type feels cheap, regardless of the letterforms.',
            'It costs $350 on a type foundry website — surely that means something.',
          ].map((item, i) => (
            <li key={i} style={{ ...s.body, color: C.mid, lineHeight: settings.lineHeight, marginBottom: 8 }}>
              {item}
            </li>
          ))}
        </ul>

        <p style={{ ...s.body, color: C.mid, lineHeight: settings.lineHeight, marginBottom: 0 }}>
          None of this is to say that beauty is irrelevant. A typeface can be rigorously functional and still carry an aesthetic charge that lifts the text, that makes a reader lean forward instead of back. The greatest type designers — Garamond, Caslon, Zapf, Carter — understood that utility and elegance are not opposites. They are different perspectives on the same underlying question: what does this mark, at this size, in this context, do to a human being?
        </p>
      </article>

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
          The Criterion
        </span>
        <span style={{ ...s.small, color: C.muted }}>© 2026 The Criterion Press</span>
      </footer>
    </div>
  )
}
