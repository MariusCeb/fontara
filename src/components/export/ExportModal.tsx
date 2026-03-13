import React, { useState } from 'react'
import { X, Copy, Check, ExternalLink } from 'lucide-react'
import { TypographySettings } from '../../types'
import { generateCSS } from '../../utils/cssExport'
import { getScaledSizes } from '../../utils/typography'

interface Props {
  settings: TypographySettings
  onClose: () => void
}

const T = {
  border: 'rgba(255,255,255,0.07)',
  border2: 'rgba(255,255,255,0.1)',
  text1: 'rgba(255,255,255,0.88)',
  text2: 'rgba(255,255,255,0.45)',
  text3: 'rgba(255,255,255,0.22)',
  surface: '#111114',
  surface2: '#18181d',
}

// Very simple syntax-coloring for CSS output
function ColoredCSS({ code }: { code: string }) {
  // Split into lines and colorize comment / property / value portions
  const lines = code.split('\n')
  return (
    <pre style={{ margin: 0, fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: 12.5, lineHeight: 1.8 }}>
      {lines.map((line, i) => {
        if (line.trim().startsWith('/*') || line.trim().startsWith('*')) {
          return <div key={i}><span style={{ color: '#6b7280' }}>{line}</span>{'\n'}</div>
        }
        if (line.trim().startsWith('@import')) {
          return <div key={i}><span style={{ color: '#a78bfa' }}>{line}</span>{'\n'}</div>
        }
        if (line.includes(':') && !line.includes('{')) {
          const colonIdx = line.indexOf(':')
          const prop = line.slice(0, colonIdx)
          const val  = line.slice(colonIdx)
          return (
            <div key={i}>
              <span style={{ color: '#7dd3fc' }}>{prop}</span>
              <span style={{ color: '#a78bfa' }}>:</span>
              <span style={{ color: '#86efac' }}>{val}</span>{'\n'}
            </div>
          )
        }
        if (line.includes('{') || line.includes('}')) {
          return <div key={i}><span style={{ color: '#e8e8f0' }}>{line}</span>{'\n'}</div>
        }
        return <div key={i}><span style={{ color: '#a1a1aa' }}>{line}</span>{'\n'}</div>
      })}
    </pre>
  )
}

export function ExportModal({ settings, onClose }: Props) {
  const [copied, setCopied] = useState(false)
  const css  = generateCSS(settings)
  const sz   = getScaledSizes(settings)

  function copy() {
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    })
  }

  const meta = [
    { l: 'Heading',   v: settings.headingFont },
    { l: 'Body',      v: settings.bodyFont     },
    { l: 'Base',      v: `${settings.baseFontSize}px` },
    { l: 'Scale',     v: `×${settings.scaleRatio}` },
    { l: 'Leading',   v: settings.lineHeight.toFixed(2) },
  ]

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32,
      }}
    >
      <div style={{
        width: '100%', maxWidth: 640, maxHeight: '82vh',
        background: '#0f0f12',
        border: `1px solid ${T.border2}`,
        borderRadius: 16,
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '15px 20px', borderBottom: `1px solid ${T.border}`, flexShrink: 0,
        }}>
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: T.text1, letterSpacing: '-0.02em' }}>
              Export CSS
            </h2>
            <p style={{ fontSize: 11, color: T.text3, marginTop: 1 }}>
              Copy-ready snippet with Google Fonts import and CSS custom properties
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'transparent', border: 'none', color: T.text3,
            padding: 6, display: 'flex', borderRadius: 6,
          }}>
            <X size={15} strokeWidth={1.75} />
          </button>
        </div>

        {/* Meta bar */}
        <div style={{
          display: 'flex', gap: 0,
          borderBottom: `1px solid ${T.border}`, flexShrink: 0,
          background: 'rgba(255,255,255,0.015)',
        }}>
          {meta.map(({ l, v }, i) => (
            <div key={l} style={{
              flex: i < 2 ? 2 : 1, padding: '10px 16px',
              borderRight: i < meta.length - 1 ? `1px solid ${T.border}` : 'none',
            }}>
              <p style={{ fontSize: 9, color: T.text3, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
                {l}
              </p>
              <p style={{ fontSize: 12, color: T.text2, fontVariantNumeric: 'tabular-nums' }}>
                {v}
              </p>
            </div>
          ))}
        </div>

        {/* Type scale preview */}
        <div style={{
          padding: '14px 20px', borderBottom: `1px solid ${T.border}`,
          flexShrink: 0, background: '#fff', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', overflowX: 'auto' }}>
            {[
              { size: sz.h1, label: 'H1' },
              { size: sz.h2, label: 'H2' },
              { size: sz.h3, label: 'H3' },
              { size: sz.h4, label: 'H4' },
              { size: sz.h5, label: 'H5' },
              { size: sz.base, label: 'P' },
              { size: sz.small, label: 'sm' },
            ].map(({ size, label }) => (
              <div key={label} style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{
                  fontFamily: `'${settings.headingFont}', serif`,
                  fontSize: `${Math.min(size, 40)}px`,
                  fontWeight: Number(settings.headingWeight),
                  color: '#09090b', lineHeight: 1,
                  marginBottom: 4,
                }}>
                  Ag
                </div>
                <p style={{ fontSize: 9, color: '#a1a1aa', textAlign: 'center' }}>
                  {label}<br />{size.toFixed(0)}px
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Code */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', background: '#0b0b0e' }}>
          <ColoredCSS code={css} />
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', gap: 8, justifyContent: 'flex-end', alignItems: 'center',
          padding: '12px 20px', borderTop: `1px solid ${T.border}`, flexShrink: 0,
          background: '#0f0f12',
        }}>
          <button onClick={onClose} style={{
            padding: '7px 16px', borderRadius: 7,
            border: `1px solid ${T.border}`,
            background: 'transparent', color: T.text2,
            fontSize: 12, fontWeight: 500,
          }}>
            Close
          </button>
          <button onClick={copy} style={{
            padding: '7px 18px', borderRadius: 7, border: 'none',
            background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(124,106,247,0.15)',
            color: copied ? '#34d399' : '#a78bfa',
            fontSize: 12, fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all 0.2s',
          }}>
            {copied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} strokeWidth={1.75} />}
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
        </div>
      </div>
    </div>
  )
}
