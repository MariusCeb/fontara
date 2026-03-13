import React, { useRef, useCallback } from 'react'
import { TypographySettings } from '../../types'
import { getFontByFamily } from '../../data/fonts'
import { getScaledSizes } from '../../utils/typography'

interface Props {
  settings: TypographySettings
  onChange: (u: Partial<TypographySettings>) => void
}

const T = {
  text2: 'rgba(255,255,255,0.45)',
  text3: 'rgba(255,255,255,0.22)',
  border: 'rgba(255,255,255,0.07)',
  surface2: '#18181d',
  accent: '#7c6af7',
}

function Row({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: T.text2, fontWeight: 500 }}>{label}</span>
        <span style={{
          fontSize: 11, fontWeight: 500, color: T.text2,
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${T.border}`,
          padding: '1px 7px', borderRadius: 4, fontVariantNumeric: 'tabular-nums',
          minWidth: 48, textAlign: 'center',
        }}>
          {value}
        </span>
      </div>
      {children}
    </div>
  )
}

interface SliderProps {
  value: number; min: number; max: number; step: number
  onChange: (v: number) => void
}

function Slider({ value, min, max, step, onChange }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const clamp = (v: number) => Math.max(min, Math.min(max, v))
  const snap  = (v: number) => Math.round(v / step) * step

  const valueFromClientX = useCallback((clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return clamp(snap(min + ratio * (max - min)))
  }, [min, max, step]) // eslint-disable-line

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    dragging.current = true
    onChange(valueFromClientX(e.clientX))
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    onChange(valueFromClientX(e.clientX))
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ position: 'relative', height: 20, cursor: 'ew-resize', userSelect: 'none', touchAction: 'none' }}
    >
      {/* Track background */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)',
        height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
      }}>
        {/* Fill */}
        <div style={{ width: `${pct}%`, height: '100%', background: T.accent }} />
      </div>
      {/* Thumb */}
      <div style={{
        position: 'absolute', top: '50%',
        left: `${pct}%`,
        transform: 'translate(-50%, -50%)',
        width: 13, height: 13, borderRadius: '50%',
        background: '#ffffff', border: `2px solid ${T.accent}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.4), 0 0 0 3px rgba(124,106,247,0.18)',
        pointerEvents: 'none',
        transition: 'box-shadow 0.15s',
      }} />
    </div>
  )
}

function Select({ value, options, onChange }: {
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', background: T.surface2,
        border: `1px solid ${T.border}`,
        borderRadius: 7, padding: '7px 10px',
        color: 'rgba(255,255,255,0.88)', fontSize: 12,
        outline: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.22)' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        paddingRight: '30px',
      }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

const WEIGHT_NAMES: Record<string, string> = {
  '100': 'Thin',      '200': 'ExtraLight', '300': 'Light',
  '400': 'Regular',   '500': 'Medium',     '600': 'SemiBold',
  '700': 'Bold',      '800': 'ExtraBold',  '900': 'Black',
}

const TYPE_SCALES = [
  { value: '1.067', label: 'Minor Second · 1.067' },
  { value: '1.125', label: 'Major Second · 1.125' },
  { value: '1.200', label: 'Minor Third · 1.200' },
  { value: '1.250', label: 'Major Third · 1.250' },
  { value: '1.333', label: 'Perfect Fourth · 1.333' },
  { value: '1.414', label: 'Augmented Fourth · 1.414' },
  { value: '1.500', label: 'Perfect Fifth · 1.500' },
  { value: '1.618', label: 'Golden Ratio · 1.618' },
]

export function TypographyControls({ settings, onChange }: Props) {
  const headingData = getFontByFamily(settings.headingFont)
  const bodyData    = getFontByFamily(settings.bodyFont)
  const sz = getScaledSizes(settings)

  const weightOptions = (weights: string[] = ['400', '700']) =>
    weights.map(w => ({ value: w, label: `${w} · ${WEIGHT_NAMES[w] ?? w}` }))

  return (
    <div>
      {/* Base size */}
      <Row label="Base size" value={`${settings.baseFontSize}px`}>
        <Slider value={settings.baseFontSize} min={12} max={21} step={1}
          onChange={v => onChange({ baseFontSize: v })} />
      </Row>

      {/* Scale */}
      <div style={{ marginBottom: 10 }}>
        <span style={{ display: 'block', fontSize: 11, color: T.text2, fontWeight: 500, marginBottom: 5 }}>
          Type scale
        </span>
        <Select
          value={String(settings.scaleRatio)}
          options={TYPE_SCALES}
          onChange={v => onChange({ scaleRatio: Number(v) })}
        />
      </div>

      {/* Scale preview strip */}
      <div style={{ marginBottom: 14, background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.border}`, borderRadius: 6, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {([
          ['H1', sz.h1], ['H2', sz.h2], ['H3', sz.h3], ['H4', sz.h4], ['H5', sz.h5],
          ['Body', sz.base], ['Small', sz.small],
        ] as [string, number][]).map(([label, size]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 9, color: T.text3, fontWeight: 600, letterSpacing: '0.06em', width: 30 }}>{label}</span>
            <span style={{ fontSize: 9, color: T.text3, fontVariantNumeric: 'tabular-nums' }}>{size.toFixed(1)}px</span>
            <div style={{
              flex: 1, height: 2, borderRadius: 1, margin: '0 8px',
              background: `rgba(255,255,255,${Math.min(0.35, size / sz.h1 * 0.35)})`,
              alignSelf: 'center',
            }} />
          </div>
        ))}
      </div>

      {/* Line height */}
      <Row label="Line height" value={settings.lineHeight.toFixed(2)}>
        <Slider value={settings.lineHeight} min={1.0} max={2.2} step={0.05}
          onChange={v => onChange({ lineHeight: v })} />
      </Row>

      {/* Body tracking */}
      <Row label="Body tracking" value={`${(settings.letterSpacing * 1000).toFixed(0)}‰`}>
        <Slider value={settings.letterSpacing} min={-0.05} max={0.15} step={0.005}
          onChange={v => onChange({ letterSpacing: v })} />
      </Row>

      {/* Heading tracking */}
      <Row label="Heading tracking" value={`${(settings.headingLetterSpacing * 1000).toFixed(0)}‰`}>
        <Slider value={settings.headingLetterSpacing} min={-0.08} max={0.1} step={0.005}
          onChange={v => onChange({ headingLetterSpacing: v })} />
      </Row>

      {/* Weights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 }}>
        <div>
          <span style={{ display: 'block', fontSize: 11, color: T.text2, fontWeight: 500, marginBottom: 5 }}>
            H. weight
          </span>
          {headingData?.variable ? (
            <Row label="" value={settings.headingWeight}>
              <Slider value={Number(settings.headingWeight)} min={100} max={900} step={1}
                onChange={v => onChange({ headingWeight: String(v) })} />
            </Row>
          ) : (
            <Select
              value={settings.headingWeight}
              options={weightOptions(headingData?.weights)}
              onChange={v => onChange({ headingWeight: v })}
            />
          )}
        </div>
        <div>
          <span style={{ display: 'block', fontSize: 11, color: T.text2, fontWeight: 500, marginBottom: 5 }}>
            B. weight
          </span>
          {bodyData?.variable ? (
            <Row label="" value={settings.bodyWeight}>
              <Slider value={Number(settings.bodyWeight)} min={100} max={900} step={1}
                onChange={v => onChange({ bodyWeight: String(v) })} />
            </Row>
          ) : (
            <Select
              value={settings.bodyWeight}
              options={weightOptions(bodyData?.weights)}
              onChange={v => onChange({ bodyWeight: v })}
            />
          )}
        </div>
      </div>
    </div>
  )
}
