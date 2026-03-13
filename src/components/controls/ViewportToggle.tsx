import React from 'react'
import { Monitor, Tablet, Smartphone } from 'lucide-react'
import { ViewportType } from '../../types'

interface Props {
  value: ViewportType
  onChange: (v: ViewportType) => void
}

const OPTIONS: { id: ViewportType; icon: React.ReactNode; label: string }[] = [
  { id: 'desktop', icon: <Monitor size={15} />, label: 'Desktop' },
  { id: 'tablet',  icon: <Tablet size={15} />,  label: 'Tablet' },
  { id: 'mobile',  icon: <Smartphone size={15} />, label: 'Mobile' },
]

export function ViewportToggle({ value, onChange }: Props) {
  return (
    <div style={{ display: 'flex', background: '#141416', border: '1px solid #242428',
      borderRadius: 8, padding: 3, gap: 2 }}>
      {OPTIONS.map(opt => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          title={opt.label}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 5, padding: '5px 10px', borderRadius: 6, border: 'none', cursor: 'pointer',
            background: value === opt.id ? '#2a2040' : 'transparent',
            color: value === opt.id ? '#a78bfa' : '#555560',
            transition: 'all 0.15s' }}
        >
          {opt.icon}
          <span style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Inter, sans-serif',
            display: value === opt.id ? 'inline' : 'none' }}>
            {opt.label}
          </span>
        </button>
      ))}
    </div>
  )
}
