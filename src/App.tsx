import React, { useEffect, useState, useCallback } from 'react'
import { useStore } from './store/typographyStore'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { PreviewFrame } from './components/previews/PreviewFrame'
import { ExportModal } from './components/export/ExportModal'
import { encodeState, decodeState } from './utils/urlState'
import type { LayoutType } from './types'

export default function App() {
  const {
    mode, activeLayout, viewport, settings, activePanel, exportOpen,
    customText, savedPairings, previewTheme,
    setMode, setLayout, setViewport, setActivePanel, setExportOpen,
    setCustomText, setPreviewTheme, updateSettings, applyPreset,
    savePairing, deleteSavedPairing,
  } = useStore()

  // ── Responsive ───────────────────────────────────────────────────────
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ?? navigator.platform ?? ''
  )
  const mod   = isMac ? '⌘' : 'Ctrl+'
  const shift = isMac ? '⇧' : 'Shift+'

  const [windowW, setWindowW] = useState(() => window.innerWidth)
  const isMobile = windowW < 768
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768)

  // Force mobile viewport on small screens
  useEffect(() => {
    if (isMobile) { setMode('preview'); setViewport('mobile') }
  }, [isMobile]) // eslint-disable-line

  useEffect(() => {
    const handler = () => {
      const w = window.innerWidth
      setWindowW(w)
      if (w >= 768) setSidebarOpen(true)
      if (w < 768) { setMode('preview'); setViewport('mobile') }
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // ── Keyboard shortcuts ───────────────────────────────────────────────
  const [showShortcuts, setShowShortcuts] = useState(false)
  const LAYOUTS_ORDER: LayoutType[] = ['startup', 'portfolio', 'restaurant', 'article', 'ecommerce', 'dashboard', 'typescale']

  const handleKey = useCallback((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement).isContentEditable) return
    const mod = e.metaKey || e.ctrlKey
    if (e.key === '?' || (e.key === '/' && mod)) { e.preventDefault(); setShowShortcuts(s => !s); return }
    if (mod && e.key === 'k') { e.preventDefault(); document.querySelector<HTMLButtonElement>('[data-font-trigger="heading"]')?.click(); return }
    if (mod && e.shiftKey && e.key === 'k') { e.preventDefault(); document.querySelector<HTMLButtonElement>('[data-font-trigger="body"]')?.click(); return }
    if (e.key === 'p' && !mod) { setMode('preview'); return }
    if (e.key === 'c' && !mod && !isMobile) { setMode('compare'); return }
    if (e.key === 'd' && !mod) { setPreviewTheme(previewTheme === 'light' ? 'dark' : 'light'); return }
    if (e.key === 'Escape') { setShowShortcuts(false); return }
    // 1-5: layout shortcuts
    const idx = parseInt(e.key) - 1
    if (idx >= 0 && idx < LAYOUTS_ORDER.length && !mod) setLayout(LAYOUTS_ORDER[idx])
  }, [mode, previewTheme, isMobile]) // eslint-disable-line

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  // ── Load state from URL hash on mount ───────────────────────────────
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash.length < 4) return
    const decoded = decodeState(hash)
    if (!decoded) return
    updateSettings(0, decoded.settings)
    if (decoded.layout)   setLayout(decoded.layout)
    if (decoded.viewport) setViewport(decoded.viewport)
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }, []) // eslint-disable-line

  // ── Share ─────────────────────────────────────────────────────────────
  function handleShare() {
    const panelIdx = mode === 'compare' ? activePanel : 0
    const encoded  = encodeState(settings[panelIdx], activeLayout, viewport)
    const url      = `${window.location.origin}${window.location.pathname}#${encoded}`
    window.location.hash = encoded
    navigator.clipboard.writeText(url).catch(() => {})
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0a0a', overflow: 'hidden' }}>
      <Header
        mode={mode}
        viewport={viewport}
        previewTheme={previewTheme}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(o => !o)}
        onModeChange={setMode}
        onViewportChange={setViewport}
        onThemeChange={setPreviewTheme}
        onExport={() => setExportOpen(true)}
        onShare={handleShare}
        onShowShortcuts={() => setShowShortcuts(s => !s)}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>

        {/* Mobile backdrop */}
        {isMobile && sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{ position: 'fixed', inset: 0, top: 44, background: 'rgba(0,0,0,0.55)', zIndex: 99, backdropFilter: 'blur(2px)' }}
          />
        )}

        <Sidebar
          mode={mode}
          activePanel={activePanel}
          settings={settings}
          activeLayout={activeLayout}
          customText={customText}
          savedPairings={savedPairings}
          isDrawer={isMobile}
          drawerOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onPanelChange={setActivePanel}
          onSettingsChange={updateSettings}
          onLayoutChange={setLayout}
          onCustomTextChange={setCustomText}
          onSavePairing={savePairing}
          onDeleteSavedPairing={deleteSavedPairing}
        />

        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', background: '#101012', minWidth: 0, position: 'relative' }}>
          {mode === 'preview' ? (
            <PreviewFrame
              settings={settings[0]}
              layout={activeLayout}
              viewport={viewport}
              previewTheme={previewTheme}
              customText={customText}
              onTextChange={t => setCustomText(t)}
            />
          ) : (
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minWidth: 0 }}>
              {([0, 1] as const).map(idx => {
                const isActive = activePanel === idx
                return (
                  <div
                    key={idx}
                    style={{
                      flex: 1, overflow: 'hidden', position: 'relative', minWidth: 0,
                      display: 'flex', flexDirection: 'column',
                      borderRight: idx === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    }}
                  >
                    <div
                      onClick={() => setActivePanel(idx)}
                      style={{
                        height: 30, flexShrink: 0, display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', padding: '0 14px',
                        background: isActive ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
                        borderBottom: `1px solid ${isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}>
                        Option {['A', 'B'][idx]}
                      </span>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140, textAlign: 'right' }}>
                        {settings[idx].headingFont.split(' ')[0]} / {settings[idx].bodyFont.split(' ')[0]}
                      </span>
                    </div>
                    {isActive && <div style={{ height: 1, flexShrink: 0, background: 'rgba(124,106,247,0.35)' }} />}
                    <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                      <PreviewFrame
                        settings={settings[idx]}
                        layout={activeLayout}
                        viewport={viewport}
                        previewTheme={previewTheme}
                        customText={customText}
                        onActivate={() => setActivePanel(idx)}
                        onTextChange={t => setCustomText(t)}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>

      {/* Floating keyboard hint — preview mode only, desktop only */}
      {mode === 'preview' && !isMobile && (
        <div style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 40,
          display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end',
          pointerEvents: 'none',
        }}>
          {[
            ['P / C', 'preview · compare'],
            ['D', 'dark / light'],
            ['1 – 7', 'layouts'],
            [`${mod}K`, 'font picker'],
            ['?', 'all shortcuts'],
          ].map(([key, label]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.01em' }}>{label}</span>
              <kbd style={{
                fontSize: 9, fontFamily: 'inherit', fontWeight: 600,
                color: 'rgba(255,255,255,0.35)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 4, padding: '2px 6px',
                letterSpacing: '0.03em', minWidth: 28, textAlign: 'center',
              }}>{key}</kbd>
            </div>
          ))}
        </div>
      )}

      {exportOpen && (
        <ExportModal
          settings={settings[mode === 'compare' ? activePanel : 0]}
          onClose={() => setExportOpen(false)}
        />
      )}

      {/* Keyboard shortcuts overlay */}
      {showShortcuts && (
        <div onClick={() => setShowShortcuts(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#111114', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '24px 28px', minWidth: 320, maxWidth: 400 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Keyboard shortcuts</p>
            {[
              ['?', 'Toggle this panel'],
              [`${mod}K`, 'Open heading font picker'],
              [`${mod}${shift}K`, 'Open body font picker'],
              ['P', 'Switch to preview'],
              ['C', 'Switch to compare'],
              ['D', 'Toggle dark/light preview'],
              ['1–7', 'Switch layout (Startup, Portfolio, Restaurant, Article, E-comm, Dashboard, Scale)'],
              ['Esc', 'Close overlays'],
            ].map(([key, desc]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{desc}</span>
                <kbd style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '2px 7px', fontFamily: 'inherit' }}>{key}</kbd>
              </div>
            ))}
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 16, textAlign: 'center' }}>Click anywhere to close</p>
          </div>
        </div>
      )}
    </div>
  )
}

