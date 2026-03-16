import React, { useState, useRef, useEffect } from 'react'
import { Monitor, Tablet, Smartphone, Code2, Link2, Check, Sun, Moon, Menu, X, Puzzle } from 'lucide-react'
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
  const [showWidget, setShowWidget] = useState(false)
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    if (!showWidget) return
    const handler = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setShowWidget(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showWidget])

  function tryWidgetOnPage() {
    if (widgetLoaded || document.getElementById('fontara-dock')) {
      setWidgetLoaded(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://app.fontara.it/widget.js'
    script.onload = () => setWidgetLoaded(true)
    document.body.appendChild(script)
  }

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
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.03em' }}>Fa</span>
          </div>
          {!isMobile && (
            <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em' }}>Fontara</span>
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

        {/* Install Widget */}
        <div ref={widgetRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowWidget(v => !v)}
            title="Install Fontara Widget"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 10px', borderRadius: 6,
              border: `1px solid ${showWidget ? 'rgba(124,58,237,0.5)' : border}`,
              background: showWidget ? 'rgba(124,58,237,0.12)' : 'transparent',
              color: showWidget ? '#a78bfa' : dim,
              fontSize: 12, fontWeight: 500, letterSpacing: '-0.01em', whiteSpace: 'nowrap',
            }}
          >
            <Puzzle size={11} strokeWidth={1.75} />
            {!isMobile && 'Widget'}
          </button>

          {showWidget && (
            <div style={{
              position: 'absolute', top: 34, right: 0,
              width: 280, background: '#1a1a1f',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, padding: 14,
              boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
              zIndex: 200,
            }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)', margin: '0 0 4px' }}>
                Fontara Widget
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: '0 0 12px', lineHeight: 1.5 }}>
                Test fonts live on any site. Add this script tag to your page:
              </p>
              <div style={{
                background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 6, padding: '8px 10px', marginBottom: 10,
                fontFamily: 'monospace', fontSize: 10, color: '#a78bfa',
                wordBreak: 'break-all', lineHeight: 1.6,
                userSelect: 'all',
              }}>
                {'<script src="https://app.fontara.it/widget.js"></script>'}
              </div>
              <button
                onClick={tryWidgetOnPage}
                style={{
                  width: '100%', padding: '7px 0', borderRadius: 7,
                  border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                  background: widgetLoaded ? 'rgba(5,150,105,0.2)' : 'rgba(124,58,237,0.8)',
                  color: widgetLoaded ? '#34d399' : 'white',
                  transition: 'all 0.15s',
                }}
              >
                {widgetLoaded ? '✓ Widget active on this page' : 'Try it on this page →'}
              </button>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '10px 0' }} />

              {/* Pricing */}
              <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                Unlock PRO features
              </p>
              <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                <div style={{ flex: 1, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 10px' }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 3px' }}>Personal</p>
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.85)', margin: '0 0 2px' }}>€29</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: 0 }}>1 device · lifetime</p>
                </div>
                <div style={{ flex: 1, border: '1px solid rgba(124,58,237,0.5)', borderRadius: 8, padding: '8px 10px', background: 'rgba(124,58,237,0.08)' }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#a78bfa', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 3px' }}>Commercial</p>
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.85)', margin: '0 0 2px' }}>€89</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: 0 }}>∞ devices · lifetime</p>
                </div>
              </div>
              <a
                href="https://app.fontara.it/pricing"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', textAlign: 'center',
                  padding: '7px 0', borderRadius: 7, marginBottom: 10,
                  background: 'rgba(124,58,237,0.8)', color: 'white',
                  fontSize: 12, fontWeight: 600, textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(124,58,237,1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(124,58,237,0.8)')}
              >
                Get PRO →
              </a>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '10px 0' }} />

              <div style={{ textAlign: 'center' }}>
                <a
                  // eslint-disable-next-line no-script-url
                  href="javascript:(function(){if(document.getElementById('fontara-dock'))return;var s=document.createElement('script');s.src='https://app.fontara.it/widget.js';document.body.appendChild(s);})()"
                  draggable
                  onClick={e => e.preventDefault()}
                  style={{
                    display: 'inline-block',
                    background: 'rgba(124,58,237,0.8)', color: 'white',
                    padding: '6px 18px', borderRadius: 7,
                    fontSize: 12, fontWeight: 600, textDecoration: 'none',
                    cursor: 'grab', userSelect: 'none',
                    boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
                  }}
                >
                  Fontara
                </a>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: '6px 0 0', lineHeight: 1.4 }}>
                  Drag to your bookmarks bar to try for free
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Get PRO */}
        <a
          href="https://app.fontara.it/pricing"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '5px 11px', borderRadius: 6,
            background: 'rgba(124,58,237,0.85)',
            border: '1px solid rgba(124,58,237,0.6)',
            color: 'white', fontSize: 12, fontWeight: 600,
            letterSpacing: '-0.01em', whiteSpace: 'nowrap',
            textDecoration: 'none', transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(124,58,237,1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(124,58,237,0.85)')}
        >
          {isMobile ? 'PRO' : 'Get PRO Widget →'}
        </a>

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
