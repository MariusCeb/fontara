import React from 'react'
import { TypographySettings } from '../../../types'
import { PreviewTheme } from '../../../store/typographyStore'
import { getStyleMap, getScaledSizes } from '../../../utils/typography'

const PALETTE = {
  light: {
    bg: '#ffffff', dark: '#0d0d0d', mid: '#555555', muted: '#999999',
    faint: '#f7f7f7', border: '#ebebeb', rule: '#e4e4e4',
    labelBg: '#f2f2f2', labelText: '#888888',
    divider: '#eeeeee',
    mono: '#777777',
  },
  dark: {
    bg: '#0c0c0c', dark: '#f0f0f0', mid: '#999999', muted: '#555555',
    faint: '#141414', border: 'rgba(255,255,255,0.07)', rule: 'rgba(255,255,255,0.06)',
    labelBg: 'rgba(255,255,255,0.06)', labelText: '#666666',
    divider: 'rgba(255,255,255,0.05)',
    mono: '#555555',
  },
}

const SCALE_SAMPLES: { level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'; label: string; text: string }[] = [
  { level: 'h1', label: 'H1', text: 'The quick brown fox' },
  { level: 'h2', label: 'H2', text: 'Designing with intent' },
  { level: 'h3', label: 'H3', text: 'Typography as voice' },
  { level: 'h4', label: 'H4', text: 'Reading between lines' },
  { level: 'h5', label: 'H5', text: 'Why does this font cost $600' },
]

const MONO: React.CSSProperties = {
  fontFamily: 'ui-monospace, "SF Mono", "Cascadia Code", "Fira Code", monospace',
  fontSize: 10,
  letterSpacing: '0.04em',
  lineHeight: 1,
}

export function TypeScaleLayout({ settings, theme = 'light' }: { settings: TypographySettings; theme?: PreviewTheme }) {
  const s = getStyleMap(settings)
  const sz = getScaledSizes(settings)
  const C = PALETTE[theme]

  const sizeMap: Record<string, number> = {
    h1: sz.h1, h2: sz.h2, h3: sz.h3, h4: sz.h4, h5: sz.h5,
    body: sz.base, small: sz.small, label: sz.xs,
  }

  const headingFontDisplay = settings.headingFont
  const bodyFontDisplay    = settings.bodyFont

  return (
    <div style={{ background: C.bg, color: C.dark, minHeight: '100%' }}>

      {/* ── HEADER ── */}
      <div style={{
        borderBottom: `1px solid ${C.rule}`,
        padding: '32px 48px 28px',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: 20, flexWrap: 'wrap',
      }}>
        <div>
          <p style={{ ...MONO, color: C.muted, marginBottom: 8 }}>TYPE SPECIMEN</p>
          <h1 style={{ ...s.h4, color: C.dark, margin: 0 }}>Scale & Specimen</h1>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <p style={{ ...MONO, color: C.muted, marginBottom: 4 }}>BASE SIZE</p>
            <p style={{ ...MONO, color: C.dark, fontSize: 13 }}>{settings.baseFontSize}px</p>
          </div>
          <div>
            <p style={{ ...MONO, color: C.muted, marginBottom: 4 }}>SCALE RATIO</p>
            <p style={{ ...MONO, color: C.dark, fontSize: 13 }}>{settings.scaleRatio}×</p>
          </div>
          <div>
            <p style={{ ...MONO, color: C.muted, marginBottom: 4 }}>LINE HEIGHT</p>
            <p style={{ ...MONO, color: C.dark, fontSize: 13 }}>{settings.lineHeight}</p>
          </div>
        </div>
      </div>

      {/* ── TYPE SCALE ── */}
      <section style={{ padding: '0 48px 0' }}>
        <div style={{ paddingTop: 8 }}>
          {SCALE_SAMPLES.map(({ level, label, text }, i) => {
            const px = sizeMap[level]
            return (
              <div
                key={level}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 1fr',
                  gap: 0,
                  borderBottom: `1px solid ${C.divider}`,
                  minHeight: 72,
                  alignItems: 'center',
                  paddingTop: i === 0 ? 28 : 20,
                  paddingBottom: 20,
                }}
              >
                {/* Labels column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingRight: 20, paddingTop: 4, alignSelf: 'flex-start' }}>
                  <span style={{
                    ...MONO,
                    color: C.bg,
                    background: C.dark,
                    display: 'inline-block',
                    padding: '2px 7px',
                    borderRadius: 3,
                    alignSelf: 'flex-start',
                    opacity: 0.85,
                  }}>
                    {label}
                  </span>
                  <span style={{ ...MONO, color: C.muted, display: 'block' }}>
                    {px.toFixed(1)}px
                  </span>
                  <span style={{ ...MONO, color: C.muted, display: 'block', fontSize: 9, opacity: 0.8 }}>
                    {(px / settings.baseFontSize).toFixed(2)}×
                  </span>
                </div>

                {/* Specimen column */}
                <div style={{ overflow: 'hidden' }}>
                  <span style={{
                    ...s[level],
                    color: C.dark,
                    lineHeight: 1.1,
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {text}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── BODY TEXT SECTION ── */}
      <section style={{
        padding: '48px 48px 0',
        borderTop: `1px solid ${C.rule}`,
        marginTop: 36,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 0, marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 2, paddingRight: 20, alignSelf: 'flex-start' }}>
            <span style={{ ...MONO, color: C.bg, background: C.dark, display: 'inline-block', padding: '2px 7px', borderRadius: 3, alignSelf: 'flex-start', opacity: 0.85 }}>
              Body
            </span>
            <span style={{ ...MONO, color: C.muted, display: 'block' }}>{sz.base.toFixed(1)}px</span>
          </div>
          <div style={{ maxWidth: 640 }}>
            <p style={{ ...s.body, color: C.mid, lineHeight: settings.lineHeight, marginBottom: 16 }}>
              The relationship between a heading typeface and a body typeface is one of the most consequential decisions in typographic design. They must coexist without fighting — different enough to signal hierarchy, similar enough to feel intentional. Contrast in weight, width, or construction is usually preferable to contrast in historical period alone.
            </p>
            <p style={{ ...s.body, color: C.mid, lineHeight: settings.lineHeight, marginBottom: 0 }}>
              At body sizes, the priority shifts entirely to sustained readability: generous x-height, open apertures, and well-considered spacing. Readers don't choose typefaces consciously, but they feel the difference immediately — in fatigue, in comprehension, in whether they want to keep reading at all.
            </p>
          </div>
        </div>
      </section>

      {/* ── SMALL & LABEL ── */}
      <section style={{ padding: '0 48px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 0, borderTop: `1px solid ${C.divider}`, paddingTop: 24, marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingRight: 20, paddingTop: 2, alignSelf: 'flex-start' }}>
            <span style={{ ...MONO, color: C.muted, background: C.labelBg, display: 'inline-block', padding: '2px 7px', borderRadius: 3, alignSelf: 'flex-start' }}>
              Small
            </span>
            <span style={{ ...MONO, color: C.muted, display: 'block' }}>{sz.small.toFixed(1)}px</span>
          </div>
          <div>
            <p style={{ ...s.small, color: C.mid, lineHeight: settings.lineHeight, margin: 0 }}>
              Supporting text, captions, metadata. At this size, x-height and open letterforms become critical to legibility. The same typeface may behave very differently at small sizes — details that charm at display scales can become visual noise below 13px.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 0, borderTop: `1px solid ${C.divider}`, paddingTop: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingRight: 20, paddingTop: 2, alignSelf: 'flex-start' }}>
            <span style={{ ...MONO, color: C.muted, background: C.labelBg, display: 'inline-block', padding: '2px 7px', borderRadius: 3, alignSelf: 'flex-start' }}>
              Label
            </span>
            <span style={{ ...MONO, color: C.muted, display: 'block' }}>{sz.xs.toFixed(1)}px</span>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ ...s.label, color: C.mid }}>SECTION HEADER</span>
            <span style={{ ...s.label, color: C.muted }}>Navigation Item</span>
            <span style={{ ...s.label, color: C.dark, background: C.faint, padding: '3px 10px', borderRadius: 4, border: `1px solid ${C.border}` }}>Tag Label</span>
            <span style={{ ...s.label, color: C.muted }}>12 Mar 2026</span>
          </div>
        </div>
      </section>

      {/* ── FONT COMPARISON ── */}
      <section style={{
        borderTop: `1px solid ${C.rule}`,
        padding: '40px 48px 48px',
        background: C.faint,
      }}>
        <p style={{ ...MONO, color: C.muted, marginBottom: 28 }}>FONT PAIRING</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 1 }}>

          {/* Heading font specimen */}
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '28px 28px 24px', overflow: 'hidden' }}>
            <p style={{ ...MONO, color: C.muted, marginBottom: 20 }}>HEADING FONT</p>
            <p style={{
              fontFamily: s.h1.fontFamily,
              fontWeight: s.h1.fontWeight,
              fontSize: `${sz.h2.toFixed(1)}px`,
              color: C.dark,
              lineHeight: 1.1,
              letterSpacing: `${settings.headingLetterSpacing}em`,
              margin: '0 0 16px 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {headingFontDisplay}
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
              {['Aa Bb Cc', 'Dd Ee Ff', '0 1 2 3'].map(g => (
                <span key={g} style={{
                  fontFamily: s.h1.fontFamily,
                  fontWeight: s.h1.fontWeight,
                  fontSize: `${sz.base}px`,
                  color: C.mid,
                  letterSpacing: `${settings.headingLetterSpacing}em`,
                }}>
                  {g}
                </span>
              ))}
            </div>
            <p style={{ ...MONO, color: C.muted, marginBottom: 0 }}>
              Weight {settings.headingWeight} · {settings.headingLetterSpacing >= 0 ? '+' : ''}{settings.headingLetterSpacing}em tracking
            </p>
          </div>

          {/* Body font specimen */}
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '28px 28px 24px', overflow: 'hidden' }}>
            <p style={{ ...MONO, color: C.muted, marginBottom: 20 }}>BODY FONT</p>
            <p style={{
              fontFamily: s.body.fontFamily,
              fontWeight: s.body.fontWeight,
              fontSize: `${sz.h2.toFixed(1)}px`,
              color: C.dark,
              lineHeight: 1.1,
              letterSpacing: `${settings.letterSpacing}em`,
              margin: '0 0 16px 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {bodyFontDisplay}
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
              {['Aa Bb Cc', 'Dd Ee Ff', '0 1 2 3'].map(g => (
                <span key={g} style={{
                  fontFamily: s.body.fontFamily,
                  fontWeight: s.body.fontWeight,
                  fontSize: `${sz.base}px`,
                  color: C.mid,
                  letterSpacing: `${settings.letterSpacing}em`,
                }}>
                  {g}
                </span>
              ))}
            </div>
            <p style={{ ...MONO, color: C.muted, marginBottom: 0 }}>
              Weight {settings.bodyWeight} · {settings.letterSpacing >= 0 ? '+' : ''}{settings.letterSpacing}em tracking · {settings.lineHeight} leading
            </p>
          </div>
        </div>

        {/* Pairing preview */}
        <div style={{
          marginTop: 20, padding: '28px 32px',
          background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8,
        }}>
          <p style={{ ...MONO, color: C.muted, marginBottom: 20 }}>IN USE TOGETHER</p>
          <div style={{ display: 'flex', gap: 40, alignItems: 'baseline', flexWrap: 'wrap' }}>
            <div>
              <p style={{ ...s.h3, color: C.dark, marginBottom: 8 }}>The art of the letter</p>
              <p style={{ ...s.body, color: C.mid, lineHeight: settings.lineHeight, maxWidth: 420, margin: 0 }}>
                Good typography is measured not by the typeface alone but by the relationship between all its parts — scale, space, weight, and rhythm working together as a single voice.
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ ...s.h2, color: C.dark, lineHeight: 1 }}>Ag</span>
                <span style={{ ...s.h4, color: C.mid, lineHeight: 1, fontFamily: s.body.fontFamily, fontWeight: s.body.fontWeight }}>Ag</span>
              </div>
              <p style={{ ...MONO, color: C.muted, fontSize: 9 }}>Heading / Body</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
