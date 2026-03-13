import React from 'react'
import { LayoutType } from '../../types'

interface Props {
  value: LayoutType
  onChange: (l: LayoutType) => void
}

const LAYOUTS: { id: LayoutType; label: string; desc: string }[] = [
  { id: 'startup',    label: 'Startup',    desc: 'SaaS landing page'   },
  { id: 'portfolio',  label: 'Portfolio',  desc: 'Designer / creative' },
  { id: 'restaurant', label: 'Restaurant', desc: 'Premium dining'      },
  { id: 'article',    label: 'Article',    desc: 'Editorial / blog'    },
  { id: 'ecommerce',  label: 'E-commerce', desc: 'Product page'        },
  { id: 'dashboard',  label: 'Dashboard',  desc: 'SaaS analytics'      },
  { id: 'typescale',  label: 'Type Scale', desc: 'Specimen view'       },
]

const T = {
  text1: 'rgba(255,255,255,0.82)',
  text3: 'rgba(255,255,255,0.2)',
  border: 'rgba(255,255,255,0.07)',
  activeBg: 'rgba(255,255,255,0.07)',
  activeBorder: 'rgba(255,255,255,0.15)',
}

export function LayoutPicker({ value, onChange }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {LAYOUTS.map(l => {
        const active = value === l.id
        return (
          <button
            key={l.id}
            onClick={() => onChange(l.id)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '9px 10px', borderRadius: 7,
              border: `1px solid ${active ? T.activeBorder : 'transparent'}`,
              background: active ? T.activeBg : 'transparent',
              textAlign: 'left', transition: 'all 0.12s', cursor: 'pointer',
            }}
            onMouseEnter={e => {
              if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
            }}
            onMouseLeave={e => {
              if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'
            }}
          >
            <span style={{
              fontSize: 12, fontWeight: active ? 500 : 400,
              color: T.text1,
            }}>
              {l.label}
            </span>
            <span style={{ fontSize: 10, color: T.text3 }}>
              {l.desc}
            </span>
          </button>
        )
      })}
    </div>
  )
}
