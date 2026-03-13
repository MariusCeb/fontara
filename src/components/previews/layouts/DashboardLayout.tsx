import React, { useState, useEffect, useRef } from 'react'
import { TypographySettings, CustomText } from '../../../types'
import { PreviewTheme } from '../../../store/typographyStore'
import { getStyleMap } from '../../../utils/typography'

interface Props { settings: TypographySettings; customText?: CustomText; theme?: PreviewTheme; onTextChange?: (t: Partial<CustomText>) => void }

const PALETTE = {
  light: {
    bg: '#fafafa', dark: '#111111', mid: '#555555', muted: '#888888',
    faint: '#f0f0f0', border: '#e5e5e5', rule: '#e0e0e0',
    accent: '#111111', navBg: 'rgba(250,250,250,0.92)',
    blockquoteBg: '#f4f4f4', blockquoteBorder: '#d0d0d0',
    sidebar: '#f4f4f5', sidebarBorder: '#e4e4e7',
    cardBg: '#ffffff',
  },
  dark: {
    bg: '#0f0f0f', dark: '#efefef', mid: '#aaaaaa', muted: '#666666',
    faint: '#1a1a1a', border: 'rgba(255,255,255,0.08)', rule: 'rgba(255,255,255,0.07)',
    accent: '#efefef', navBg: 'rgba(15,15,15,0.92)',
    blockquoteBg: 'rgba(255,255,255,0.03)', blockquoteBorder: 'rgba(255,255,255,0.15)',
    sidebar: '#141414', sidebarBorder: 'rgba(255,255,255,0.07)',
    cardBg: '#161616',
  },
}

export function DashboardLayout({ settings, customText, theme = 'light', onTextChange }: Props) {
  const s = getStyleMap(settings)
  const C = PALETTE[theme] as typeof PALETTE['light'] & { sidebar: string; sidebarBorder: string; cardBg: string }

  const brandName = customText?.heading || 'Meridian'
  const subtitle  = customText?.body    || "Here's what's happening with your store today."

  const [narrow, setNarrow] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setNarrow(e.contentRect.width < 560))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const bar: React.CSSProperties = { display: 'block', width: 18, height: 1.5, background: C.dark, borderRadius: 1 }

  const editableStyle = (base: React.CSSProperties): React.CSSProperties => ({
    ...base,
    outline: 'none',
    cursor: onTextChange ? 'text' : 'default',
    borderBottom: onTextChange ? `1.5px dashed ${C.rule}` : 'none',
    paddingBottom: onTextChange ? 4 : 0,
  })

  const navItems = [
    { label: 'Overview',  icon: '⊡' },
    { label: 'Analytics', icon: '◈' },
    { label: 'Projects',  icon: '◫' },
    { label: 'Team',      icon: '◎' },
    { label: 'Settings',  icon: '⊙' },
  ]

  const stats = [
    { label: 'Total Revenue',  value: '$48,291', trend: '+12%', up: true },
    { label: 'Active Users',   value: '2,847',   trend: '+8%',  up: true },
    { label: 'Conversion',     value: '3.4%',    trend: '-0.3%', up: false },
    { label: 'Avg. Session',   value: '4m 12s',  trend: '+23%', up: true },
  ]

  const activity = [
    { initials: 'JL', name: 'Jamie Lee',    sub: 'Completed onboarding flow',          time: '2m ago',   status: 'Done',    statusOk: true },
    { initials: 'RK', name: 'Ravi Kumar',   sub: 'Upgraded to Pro plan',               time: '14m ago',  status: 'Active',  statusOk: true },
    { initials: '??', name: 'Someone',      sub: 'Reset their password (5th time)',    time: '22m ago',  status: 'Again',   statusOk: false },
    { initials: 'MO', name: 'Maya Osei',    sub: 'Submitted a support ticket',         time: '1h ago',   status: 'Open',    statusOk: false },
    { initials: 'TN', name: 'Tom Nielsen',  sub: 'Exported analytics report',          time: '3h ago',   status: 'Done',    statusOk: true },
    { initials: 'SP', name: 'Sara Patel',   sub: 'Invited 3 team members',             time: 'Yesterday', status: 'Pending', statusOk: false },
  ]

  const topPages = [
    { path: '/dashboard',        views: '18,402', bounce: '24%' },
    { path: '/analytics',        views: '9,841',  bounce: '31%' },
    { path: '/projects/new',     views: '6,120',  bounce: '18%' },
    { path: '/settings/billing', views: '4,307',  bounce: '41%' },
    { path: '/forgot-password',  views: '8,204',  bounce: '2%'  },
  ]

  return (
    <div ref={rootRef} style={{ background: C.bg, color: C.dark, minHeight: 600 }}>

      {narrow ? (
        /* ── NARROW: top nav bar ── */
        <>
          <nav style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 20px', height: 52,
            borderBottom: `1px solid ${C.rule}`,
            background: C.navBg, backdropFilter: 'blur(12px)',
            position: 'sticky', top: 0, zIndex: 10,
          }}>
            <span
              contentEditable={!!onTextChange}
              suppressContentEditableWarning
              onBlur={onTextChange ? e => onTextChange({ heading: e.currentTarget.innerText }) : undefined}
              style={editableStyle({
                ...s.h5,
                fontFamily: s.h1.fontFamily,
                fontWeight: s.h1.fontWeight,
                letterSpacing: '-0.02em',
                color: C.dark,
              })}
            >
              {brandName}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: theme === 'light'
                  ? 'linear-gradient(135deg, #c8d8f0, #a8b8e0)'
                  : 'linear-gradient(135deg, #1e2a3a, #141e2e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${C.border}`,
              }}>
                <span style={{ ...s.label, color: C.muted, fontSize: 10, letterSpacing: 0 }}>JL</span>
              </div>
              <button
                onClick={() => setMenuOpen(o => !o)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}
              >
                <span style={bar} /><span style={bar} /><span style={{ ...bar, width: 12 }} />
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div style={{ background: C.bg, borderBottom: `1px solid ${C.rule}`, padding: '8px 20px 16px' }}>
              {navItems.map(item => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 0', borderBottom: `1px solid ${C.rule}`,
                  ...s.small, color: C.mid,
                }}>
                  <span style={{ color: C.muted, fontStyle: 'normal', fontSize: 14 }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* ── WIDE: left sidebar (rendered inline, not fixed, so it flows with scroll in preview) ── */
        null
      )}

      <div style={{
        display: narrow ? 'block' : 'flex',
        alignItems: 'stretch',
      }}>
        {/* SIDEBAR */}
        {!narrow && (
          <aside style={{
            width: 200,
            flexShrink: 0,
            background: C.sidebar,
            borderRight: `1px solid ${C.sidebarBorder}`,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 600,
          }}>
            {/* Brand */}
            <div style={{
              padding: '20px 20px 16px',
              borderBottom: `1px solid ${C.sidebarBorder}`,
            }}>
              <span
                contentEditable={!!onTextChange}
                suppressContentEditableWarning
                onBlur={onTextChange ? e => onTextChange({ heading: e.currentTarget.innerText }) : undefined}
                style={editableStyle({
                  ...s.h5,
                  fontFamily: s.h1.fontFamily,
                  fontWeight: s.h1.fontWeight,
                  letterSpacing: '-0.02em',
                  color: C.dark,
                })}
              >
                {brandName}
              </span>
            </div>

            {/* Nav items */}
            <nav style={{ flex: 1, padding: '12px 8px' }}>
              {navItems.map((item, i) => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px',
                  borderRadius: 6,
                  background: i === 0
                    ? (theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.07)')
                    : 'transparent',
                  marginBottom: 2,
                  cursor: 'pointer',
                }}>
                  <span style={{ color: i === 0 ? C.dark : C.muted, fontSize: 14 }}>{item.icon}</span>
                  <span style={{
                    ...s.small,
                    color: i === 0 ? C.dark : C.mid,
                    fontWeight: i === 0 ? 600 : 400,
                  }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </nav>

            {/* User avatar */}
            <div style={{
              padding: '14px 20px',
              borderTop: `1px solid ${C.sidebarBorder}`,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: theme === 'light'
                  ? 'linear-gradient(135deg, #c8d8f0, #a8b8e0)'
                  : 'linear-gradient(135deg, #1e2a3a, #141e2e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${C.border}`,
              }}>
                <span style={{ ...s.label, color: C.muted, fontSize: 10, letterSpacing: 0 }}>JL</span>
              </div>
              <div>
                <p style={{ ...s.label, color: C.dark, fontWeight: 600, marginBottom: 1 }}>Jamie Lee</p>
                <p style={{ ...s.label, color: C.muted, fontSize: 10 }}>Admin</p>
              </div>
            </div>
          </aside>
        )}

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* Top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: narrow ? '16px 20px' : '18px 32px',
            borderBottom: `1px solid ${C.rule}`,
            background: C.navBg,
            backdropFilter: 'blur(12px)',
            position: 'sticky', top: 0, zIndex: 5,
          }}>
            <div>
              <h1 style={{ ...s.h4, fontFamily: s.h1.fontFamily, fontWeight: s.h1.fontWeight, color: C.dark, marginBottom: 0 }}>
                Overview
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                ...s.label,
                color: C.mid,
                background: C.faint,
                border: `1px solid ${C.border}`,
                borderRadius: 40,
                padding: '5px 14px',
                cursor: 'pointer',
              }}>
                Mar 1 – Mar 13, 2026
              </div>
              {!narrow && (
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: theme === 'light'
                    ? 'linear-gradient(135deg, #c8d8f0, #a8b8e0)'
                    : 'linear-gradient(135deg, #1e2a3a, #141e2e)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${C.border}`,
                }}>
                  <span style={{ ...s.label, color: C.muted, fontSize: 10, letterSpacing: 0 }}>JL</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ padding: narrow ? '24px 20px' : '32px 32px' }}>

            {/* Edit hint */}
            {onTextChange && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                marginBottom: 16, fontSize: 10, color: C.muted,
                border: `1px dashed ${C.rule}`, borderRadius: 20, padding: '3px 11px',
              }}>
                <span>&#9998;</span><span>click brand name or subtitle below to edit</span>
              </div>
            )}

            {/* Subtitle */}
            <p
              contentEditable={!!onTextChange}
              suppressContentEditableWarning
              onBlur={onTextChange ? e => onTextChange({ body: e.currentTarget.innerText }) : undefined}
              style={editableStyle({
                ...s.body,
                color: C.muted,
                lineHeight: settings.lineHeight,
                marginBottom: 28,
              })}
            >
              {subtitle}
            </p>

            {/* ── STAT CARDS ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: narrow ? '1fr 1fr' : 'repeat(4, 1fr)',
              gap: 16,
              marginBottom: 40,
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  background: C.cardBg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: '18px 20px',
                }}>
                  <p style={{ ...s.label, color: C.muted, marginBottom: 8, letterSpacing: '0.04em' }}>
                    {stat.label}
                  </p>
                  <p style={{
                    ...s.h3,
                    fontFamily: s.h1.fontFamily,
                    fontWeight: s.h1.fontWeight,
                    color: C.dark,
                    marginBottom: 10,
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </p>
                  <span style={{
                    ...s.label,
                    color: stat.up
                      ? (theme === 'light' ? '#1a7a3a' : '#4ade80')
                      : (theme === 'light' ? '#b91c1c' : '#f87171'),
                    background: stat.up
                      ? (theme === 'light' ? '#dcfce7' : 'rgba(74,222,128,0.12)')
                      : (theme === 'light' ? '#fee2e2' : 'rgba(248,113,113,0.12)'),
                    borderRadius: 20,
                    padding: '2px 8px',
                    fontWeight: 600,
                  }}>
                    {stat.up ? '↑' : '↓'} {stat.trend}
                  </span>
                </div>
              ))}
            </div>

            {/* ── RECENT ACTIVITY ── */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{
                ...s.h5,
                fontFamily: s.h1.fontFamily,
                fontWeight: s.h1.fontWeight,
                color: C.dark,
                marginBottom: 16,
                letterSpacing: '-0.01em',
              }}>
                Recent Activity
              </h2>
              <div style={{
                background: C.cardBg,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
                {activity.map((row, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '13px 20px',
                    borderBottom: i < activity.length - 1 ? `1px solid ${C.rule}` : 'none',
                  }}>
                    {/* Avatar */}
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                      background: theme === 'light'
                        ? 'linear-gradient(135deg, #dde8f8, #c8d4ee)'
                        : 'linear-gradient(135deg, #1e2838, #151e2c)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${C.border}`,
                    }}>
                      <span style={{ ...s.label, color: C.muted, fontSize: 10, letterSpacing: 0 }}>{row.initials}</span>
                    </div>
                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ ...s.small, color: C.dark, fontWeight: 600, marginBottom: 2 }}>{row.name}</p>
                      <p style={{ ...s.label, color: C.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.sub}</p>
                    </div>
                    {/* Timestamp */}
                    {!narrow && (
                      <span style={{ ...s.label, color: C.muted, flexShrink: 0, marginRight: 12 }}>{row.time}</span>
                    )}
                    {/* Status badge */}
                    <span style={{
                      ...s.label,
                      flexShrink: 0,
                      color: row.statusOk
                        ? (theme === 'light' ? '#1a7a3a' : '#4ade80')
                        : (theme === 'light' ? '#92400e' : '#fbbf24'),
                      background: row.statusOk
                        ? (theme === 'light' ? '#dcfce7' : 'rgba(74,222,128,0.12)')
                        : (theme === 'light' ? '#fef3c7' : 'rgba(251,191,36,0.12)'),
                      borderRadius: 20,
                      padding: '2px 10px',
                      fontWeight: 500,
                    }}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── TOP PAGES ── */}
            <div>
              <h2 style={{
                ...s.h5,
                fontFamily: s.h1.fontFamily,
                fontWeight: s.h1.fontWeight,
                color: C.dark,
                marginBottom: 16,
                letterSpacing: '-0.01em',
              }}>
                Top Pages
              </h2>
              <div style={{
                background: C.cardBg,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
                {/* Table header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 100px 100px',
                  padding: '10px 20px',
                  borderBottom: `1px solid ${C.rule}`,
                  background: C.faint,
                }}>
                  {['Page', 'Views', 'Bounce'].map(col => (
                    <span key={col} style={{ ...s.label, color: C.muted, letterSpacing: '0.06em' }}>{col}</span>
                  ))}
                </div>
                {/* Rows */}
                {topPages.map((row, i) => (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 100px 100px',
                    padding: '12px 20px',
                    borderBottom: i < topPages.length - 1 ? `1px solid ${C.rule}` : 'none',
                    alignItems: 'center',
                  }}>
                    <span style={{
                      ...s.small,
                      color: C.dark,
                      fontFamily: 'monospace',
                      fontSize: 12,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {row.path}
                    </span>
                    <span style={{ ...s.small, color: C.mid }}>{row.views}</span>
                    <span style={{ ...s.small, color: C.mid }}>{row.bounce}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
