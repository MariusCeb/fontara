import React from 'react'
import { X, Bookmark } from 'lucide-react'
import { PAIRINGS } from '../../data/pairings'
import { PairingPreset, SavedPairing } from '../../types'
import { useFontLoader } from '../../hooks/useFontLoader'

interface Props {
  onApply: (p: Partial<PairingPreset | SavedPairing>) => void
  onSave: () => void
  onDelete: (id: string) => void
  currentHeading: string
  currentBody: string
  savedPairings: SavedPairing[]
}

const T = {
  text1: 'rgba(255,255,255,0.88)',
  text2: 'rgba(255,255,255,0.45)',
  text3: 'rgba(255,255,255,0.22)',
  border: 'rgba(255,255,255,0.07)',
  accent: '#7c6af7',
  accentDim: 'rgba(124,106,247,0.12)',
  accentText: '#a78bfa',
}

const ALL_FONTS = [...new Set(PAIRINGS.flatMap(p => [p.headingFont, p.bodyFont]))]

function PairingCard({ headingFont, headingWeight, bodyFont, bodyWeight, name, isActive, onApply, onDelete }: {
  headingFont: string; headingWeight: string
  bodyFont: string; bodyWeight: string
  name: string; isActive: boolean
  onApply: () => void
  onDelete?: () => void
}) {
  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      <button
        onClick={onApply}
        style={{
          flex: 1, display: 'flex', flexDirection: 'column', gap: 3,
          padding: onDelete ? '9px 30px 9px 10px' : '9px 10px',
          borderRadius: 7,
          border: `1px solid ${isActive ? 'rgba(124,106,247,0.3)' : 'transparent'}`,
          background: isActive ? T.accentDim : 'transparent',
          textAlign: 'left', cursor: 'pointer',
        }}
        onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}
        onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
      >
        <span style={{
          fontFamily: `'${headingFont}', serif`,
          fontSize: 16, fontWeight: Number(headingWeight),
          color: isActive ? T.accentText : T.text1,
          lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {name}
        </span>
        <span style={{
          fontFamily: `'${bodyFont}', sans-serif`,
          fontSize: 11, fontWeight: Number(bodyWeight),
          color: isActive ? 'rgba(167,139,250,0.55)' : T.text3,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {headingFont} + {bodyFont}
        </span>
      </button>

      {onDelete && (
        <button
          onClick={e => { e.stopPropagation(); onDelete() }}
          title="Remove"
          style={{
            position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: T.text3, display: 'flex', padding: 3, borderRadius: 4,
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.text3}
        >
          <X size={11} strokeWidth={2} />
        </button>
      )}
    </div>
  )
}

export function PairingPresets({ onApply, onSave, onDelete, currentHeading, currentBody, savedPairings }: Props) {
  const savedFonts = savedPairings.flatMap(p => [p.headingFont, p.bodyFont])
  useFontLoader([...ALL_FONTS, ...savedFonts])

  const isActive = (hf: string, bf: string) => hf === currentHeading && bf === currentBody
  const alreadySaved = savedPairings.some(p => p.headingFont === currentHeading && p.bodyFont === currentBody)

  return (
    <div>
      {/* Save button */}
      <button
        onClick={onSave}
        disabled={alreadySaved}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          width: '100%', padding: '7px 10px', borderRadius: 7,
          border: `1px solid ${T.border}`, background: 'transparent',
          cursor: alreadySaved ? 'default' : 'pointer', marginBottom: 8,
          opacity: alreadySaved ? 0.4 : 1, transition: 'opacity 0.15s',
        }}
        onMouseEnter={e => { if (!alreadySaved) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
      >
        <Bookmark size={12} strokeWidth={1.75} color={T.text3} />
        <span style={{ fontSize: 11, color: T.text2 }}>
          {alreadySaved ? 'Already saved' : 'Save current pairing'}
        </span>
      </button>

      {/* Saved pairings */}
      {savedPairings.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <p style={{ fontSize: 9, fontWeight: 700, color: T.text3, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '4px 10px 6px', }}>
            Saved
          </p>
          {savedPairings.map(p => (
            <PairingCard
              key={p.id}
              headingFont={p.headingFont} headingWeight={p.headingWeight}
              bodyFont={p.bodyFont}       bodyWeight={p.bodyWeight}
              name={p.name}
              isActive={isActive(p.headingFont, p.bodyFont)}
              onApply={() => onApply(p)}
              onDelete={() => onDelete(p.id)}
            />
          ))}
          <div style={{ height: 1, background: T.border, margin: '8px 4px' }} />
        </div>
      )}

      {/* Curated pairings */}
      {savedPairings.length > 0 && (
        <p style={{ fontSize: 9, fontWeight: 700, color: T.text3, letterSpacing: '0.1em',
          textTransform: 'uppercase', padding: '0 10px 6px' }}>
          Curated
        </p>
      )}
      {PAIRINGS.map(p => (
        <PairingCard
          key={p.id}
          headingFont={p.headingFont} headingWeight={p.headingWeight}
          bodyFont={p.bodyFont}       bodyWeight={p.bodyWeight}
          name={p.name}
          isActive={isActive(p.headingFont, p.bodyFont)}
          onApply={() => onApply(p)}
        />
      ))}
    </div>
  )
}
