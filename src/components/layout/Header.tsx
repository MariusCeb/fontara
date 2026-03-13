import React, { useState } from 'react'
import { Monitor, Tablet, Smartphone, Code2, Link2, Check, Sun, Moon, Menu, X } from 'lucide-react'
import { AppMode, ViewportType } from '../../types'
import { PreviewTheme } from '../../store/typographyStore'

interface Props {
  mode: AppMode
  viewport: ViewportType
  previewTheme: PreviewTheme
  isMobile: boolean
  sidebarOpen: boolean
  onSidebarToggle: () => void
  onModeChange: (m: AppMode) => void
  onViewportChange: (v: ViewportType) => void
  onThemeChange: (t: PreviewTheme) => void
  onExport: () => void
  onShare: () => void
  onShowShortcuts: () => void
}

const VIEWPORTS: { id: ViewportType; icon: React.ReactNode; label: string }[] = [
  { id: 'desktop', icon: <Monitor    size={13} strokeWidth={1.75} />, label: 'Desktop' },
  { id: 'tablet',  icon: <Tablet     size={13} strokeWidth={1.75} />, label: 'Tablet'  },
  { id: 'mobile',  icon: <Smartphone size={13} strokeWidth={1.75} />, label: 'Mobile'  },
]

const dim    = 'rgba(255,255,255,0.3)'
const active = 'rgba(255,255,255,0.82)'
const border = 'rgba(255,255,255,0.08)'

export function Header({ mode, viewport, previewTheme, isMobile, sidebarOpen, onSidebarToggle, onModeChange, onViewportChange, onThemeChange, onExport, onShare, onShowShortcuts }: Props) {
  const [shared, setShared] = useState(false)

  function handleShare() {
    onShare()
    setShared(true)
    setTimeout(() => setShared(false), 2200)
  }

  return (
    <header style={{
      height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 12px', background: '#0a0a0a', borderBottom: `1px solid ${border}`,
      flexShrink: 0, gap: 8, zIndex: 50,
    }}>

      {/* Left: sidebar toggle (mobile) + logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        {isMobile && (
          <button
            onClick={onSidebarToggle}
            style={{ width: 30, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${border}`, background: sidebarOpen ? 'rgba(255,255,255,0.06)' : 'transparent', color: sidebarOpen ? active : dim, flexShrink: 0 }}
          >
            {sidebarOpen ? <X size={14} strokeWidth={1.75} /> : <Menu size={14} strokeWidth={1.75} />}
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
          <div style={{ width: 22, height: 22, borderRadius: 5, border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.03em' }}>Tt</span>
          </div>
          {!isMobile && (
            <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em' }}>TypeTest</span>
          )}
        </div>
      </div>

      {/* Center: mode toggle — compare hidden on mobile */}
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: `1px solid ${border}`, borderRadius: 7, padding: 2, gap: 1, flexShrink: 0 }}>
          {(['preview', 'compare'] as AppMode[]).map(m => (
            <button key={m} onClick={() => onModeChange(m)} style={{
              padding: '4px 14px', borderRadius: 5, border: 'none',
              background: mode === m ? 'rgba(255,255,255,0.07)' : 'transparent',
              color: mode === m ? active : dim,
              fontSize: 12, fontWeight: mode === m ? 500 : 400,
              letterSpacing: '-0.01em', transition: 'all 0.12s', textTransform: 'capitalize',
            }}>
              {m}
            </button>
          ))}
        </div>
      )}

      {/* Right: controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>

        {/* Viewport — hidden on mobile (less relevant when sidebar controls it) */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: `1px solid ${border}`, borderRadius: 6, padding: 2, gap: 1 }}>
            {VIEWPORTS.map(v => (
              <button key={v.id} onClick={() => onViewportChange(v.id)} title={v.label} style={{
                width: 26, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 4, border: 'none',
                background: viewport === v.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: viewport === v.id ? active : dim, transition: 'all 0.12s',
              }}>
                {v.icon}
              </button>
            ))}
          </div>
        )}

        {/* Theme toggle */}
        <button
          onClick={() => onThemeChange(previewTheme === 'light' ? 'dark' : 'light')}
          title={previewTheme === 'light' ? 'Dark preview' : 'Light preview'}
          style={{
            width: 28, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 6, border: `1px solid ${border}`,
            background: previewTheme === 'dark' ? 'rgba(255,255,255,0.06)' : 'transparent',
            color: previewTheme === 'dark' ? 'rgba(255,255,255,0.6)' : dim,
          }}
        >
          {previewTheme === 'light' ? <Moon size={12} strokeWidth={1.75} /> : <Sun size={12} strokeWidth={1.75} />}
        </button>

        <div style={{ width: 1, height: 18, background: border }} />

        {/* Share */}
        <button onClick={handleShare} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 10px', borderRadius: 6, border: `1px solid ${border}`,
          background: shared ? 'rgba(16,185,129,0.08)' : 'transparent',
          color: shared ? '#34d399' : dim,
          fontSize: 12, fontWeight: 400, transition: 'all 0.15s', whiteSpace: 'nowrap',
        }}>
          {shared ? <Check size={11} strokeWidth={2.5} /> : <Link2 size={11} strokeWidth={1.75} />}
          {!isMobile && (shared ? 'Copied' : 'Share')}
        </button>

        {/* Export CSS */}
        <button onClick={onExport} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 10px', borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'transparent', color: 'rgba(255,255,255,0.55)',
          fontSize: 12, fontWeight: 500, letterSpacing: '-0.01em', whiteSpace: 'nowrap',
        }}>
          <Code2 size={11} strokeWidth={2} />
          {!isMobile && 'Export CSS'}
        </button>

        {/* Shortcuts hint */}
        {!isMobile && (
          <button onClick={onShowShortcuts} title="Keyboard shortcuts (?)" style={{
            width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 6, border: `1px solid ${border}`, background: 'transparent',
            color: dim, fontSize: 11, fontWeight: 600,
          }}>?</button>
        )}
      </div>
    </header>
  )
}
