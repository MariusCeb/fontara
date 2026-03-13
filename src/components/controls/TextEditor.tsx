import React from 'react'
import { CustomText } from '../../types'

interface Props {
  value: CustomText
  onChange: (t: Partial<CustomText>) => void
}

const T = {
  text2: 'rgba(255,255,255,0.45)',
  text3: 'rgba(255,255,255,0.22)',
  border: 'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.12)',
  surface2: '#18181d',
}

function Field({ label, value, placeholder, onChange, multiline }: {
  label: string
  value: string
  placeholder: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  const base: React.CSSProperties = {
    width: '100%',
    background: T.surface2,
    border: `1px solid ${T.border}`,
    borderRadius: 7,
    padding: '8px 10px',
    color: 'rgba(255,255,255,0.88)',
    fontSize: 12,
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    resize: 'none',
    lineHeight: 1.55,
    transition: 'border-color 0.15s',
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <span style={{
        display: 'block', fontSize: 11, color: T.text2,
        fontWeight: 500, marginBottom: 5,
      }}>
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={base}
          onFocus={e => (e.target.style.borderColor = T.borderHover)}
          onBlur={e => (e.target.style.borderColor = T.border)}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...base, height: 32 }}
          onFocus={e => (e.target.style.borderColor = T.borderHover)}
          onBlur={e => (e.target.style.borderColor = T.border)}
        />
      )}
    </div>
  )
}

export function TextEditor({ value, onChange }: Props) {
  const hasCustom = value.heading.trim() || value.body.trim()

  return (
    <div>
      <Field
        label="Headline"
        value={value.heading}
        placeholder="Your own headline…"
        onChange={v => onChange({ heading: v })}
      />
      <Field
        label="Body text"
        value={value.body}
        placeholder="Your own body paragraph…"
        onChange={v => onChange({ body: v })}
        multiline
      />
      {hasCustom && (
        <button
          onClick={() => onChange({ heading: '', body: '' })}
          style={{
            fontSize: 10, color: T.text3, background: 'transparent',
            border: 'none', cursor: 'pointer', padding: 0,
            textDecoration: 'underline', textDecorationColor: T.text3,
          }}
        >
          Reset to default text
        </button>
      )}
    </div>
  )
}
