import React, { useState } from 'react'
import { ChevronDown, ChevronRight, X } from 'lucide-react'
import { TypographySettings, AppMode, LayoutType, CustomText, SavedPairing } from '../../types'
import { FontPicker } from '../controls/FontPicker'
import { TypographyControls } from '../controls/TypographyControls'
import { PairingPresets } from '../controls/PairingPresets'
import { LayoutPicker } from '../controls/LayoutPicker'
import { TextEditor } from '../controls/TextEditor'

interface Props {
  mode: AppMode
  activePanel: 0 | 1
  settings: [TypographySettings, TypographySettings]
  activeLayout: LayoutType
  customText: CustomText
  savedPairings: SavedPairing[]
  isDrawer?: boolean
  drawerOpen?: boolean
  onClose?: () => void
  onPanelChange: (p: 0 | 1) => void
  onSettingsChange: (idx: 0 | 1, updates: Partial<TypographySettings>) => void
  onLayoutChange: (l: LayoutType) => void
  onCustomTextChange: (t: Partial<CustomText>) => void
  onSavePairing: (idx: 0 | 1) => void
  onDeleteSavedPairing: (id: string) => void
}

const T = {
  text1: 'rgba(255,255,255,0.82)',
  text2: 'rgba(255,255,255,0.4)',
  text3: 'rgba(255,255,255,0.2)',
  border: 'rgba(255,255,255,0.07)',
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: T.text3, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: T.border }} />
    </div>
  )
}

function Section({ label, children, collapsible = false, defaultOpen = true, noPadBottom }: {
  label: string; children: React.ReactNode
  collapsible?: boolean; defaultOpen?: boolean; noPadBottom?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ padding: `16px 16px ${noPadBottom ? 4 : 20}px` }}>
      {collapsible ? (
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
            background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: open ? 12 : 0,
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 600, color: T.text3, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {label}
          </span>
          <div style={{ flex: 1, height: 1, background: T.border }} />
          {open
            ? <ChevronDown size={11} strokeWidth={2} color={T.text3} style={{ flexShrink: 0 }} />
            : <ChevronRight size={11} strokeWidth={2} color={T.text3} style={{ flexShrink: 0 }} />}
        </button>
      ) : (
        <SectionLabel>{label}</SectionLabel>
      )}
      {open && children}
    </div>
  )
}

export function Sidebar({
  mode, activePanel, settings, activeLayout, customText, savedPairings,
  isDrawer = false, drawerOpen = true, onClose,
  onPanelChange, onSettingsChange, onLayoutChange,
  onCustomTextChange, onSavePairing, onDeleteSavedPairing,
}: Props) {
  const panelIndex = mode === 'compare' ? activePanel : 0
  const current = settings[panelIndex]

  const drawerStyle: React.CSSProperties = isDrawer ? {
    position: 'fixed',
    top: 44,
    left: 0,
    height: 'calc(100vh - 44px)',
    zIndex: 100,
    transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: drawerOpen ? '4px 0 24px rgba(0,0,0,0.5)' : 'none',
  } : {}

  return (
    <aside style={{
      width: 256, flexShrink: 0,
      background: '#0a0a0a',
      borderRight: `1px solid ${T.border}`,
      overflowY: 'auto', overflowX: 'hidden',
      display: 'flex', flexDirection: 'column',
      ...drawerStyle,
    }}>

      {/* Drawer header with close button */}
      {isDrawer && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: T.text2, letterSpacing: '0.04em' }}>Controls</span>
          <button onClick={onClose} style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: T.text3, borderRadius: 5 }}>
            <X size={14} strokeWidth={1.75} />
          </button>
        </div>
      )}

      {/* Compare panel switcher */}
      {mode === 'compare' && (
        <div style={{ padding: '10px 12px', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', gap: 2, padding: 2, background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, borderRadius: 7 }}>
            {([0, 1] as const).map(i => {
              const isActive = activePanel === i
              const s = settings[i]
              return (
                <button key={i} onClick={() => onPanelChange(i)} style={{
                  flex: 1, padding: '6px 8px', borderRadius: 5, border: 'none',
                  background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                  transition: 'all 0.12s', textAlign: 'left', cursor: 'pointer',
                }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: isActive ? T.text1 : T.text3, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>
                    Option {['A', 'B'][i]}
                  </p>
                  <p style={{ fontSize: 10, color: isActive ? T.text2 : T.text3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {s.headingFont.split(' ')[0]} + {s.bodyFont.split(' ')[0]}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Pairings */}
      <Section label="Pairings" noPadBottom>
        <PairingPresets
          currentHeading={current.headingFont}
          currentBody={current.bodyFont}
          savedPairings={savedPairings}
          onApply={p => onSettingsChange(panelIndex, p)}
          onSave={() => onSavePairing(panelIndex)}
          onDelete={onDeleteSavedPairing}
        />
      </Section>

      <div style={{ height: 1, background: T.border, margin: '0 16px' }} />

      {/* Typefaces */}
      <Section label="Typefaces">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FontPicker label="Heading" value={current.headingFont} onChange={v => onSettingsChange(panelIndex, { headingFont: v })} />
          <FontPicker label="Body"    value={current.bodyFont}    onChange={v => onSettingsChange(panelIndex, { bodyFont: v })} suggestionsFor={current.headingFont} />
        </div>
      </Section>

      <div style={{ height: 1, background: T.border, margin: '0 16px' }} />

      {/* Typography controls */}
      <Section label="Typography">
        <TypographyControls settings={current} onChange={u => onSettingsChange(panelIndex, u)} />
      </Section>

      <div style={{ height: 1, background: T.border, margin: '0 16px' }} />

      {/* Custom text */}
      <Section label="Preview text" collapsible defaultOpen={true}>
        <TextEditor value={customText} onChange={onCustomTextChange} />
      </Section>

      <div style={{ height: 1, background: T.border, margin: '0 16px' }} />

      {/* Layout */}
      <Section label="Layout">
        <LayoutPicker value={activeLayout} onChange={onLayoutChange} />
      </Section>

      <div style={{ flex: 1 }} />

      <div style={{ padding: '12px 16px', borderTop: `1px solid ${T.border}`, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center' }}>
        <p style={{ fontSize: 10, color: T.text3, letterSpacing: '0.02em' }}>
          175+ fonts via Google Fonts
        </p>
        <p style={{ fontSize: 10, color: T.text3, letterSpacing: '0.02em' }}>
          made by{' '}
          <a href="https://mariusceb.github.io/" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
            Marius Ceban
          </a>
        </p>
      </div>
    </aside>
  )
}
