import React, { useRef, useState, useEffect } from 'react'
import { TypographySettings, LayoutType, ViewportType, CustomText } from '../../types'
import { PreviewTheme } from '../../store/typographyStore'
import { useFontLoader } from '../../hooks/useFontLoader'
import { PortfolioLayout }  from './layouts/PortfolioLayout'
import { StartupLayout }    from './layouts/StartupLayout'
import { RestaurantLayout } from './layouts/RestaurantLayout'
import { ArticleLayout }    from './layouts/ArticleLayout'
import { TypeScaleLayout }  from './layouts/TypeScaleLayout'
import { EcommerceLayout }  from './layouts/EcommerceLayout'
import { DashboardLayout }  from './layouts/DashboardLayout'

interface Props {
  settings: TypographySettings
  layout: LayoutType
  viewport: ViewportType
  previewTheme?: PreviewTheme
  customText?: CustomText
  label?: string
  onActivate?: () => void
  onTextChange?: (t: Partial<CustomText>) => void
}

const VIEWPORT_W: Record<ViewportType, number | null> = {
  desktop: null,
  tablet: 768,
  mobile: 390,
}

const LAYOUTS = {
  portfolio: PortfolioLayout,
  startup: StartupLayout,
  restaurant: RestaurantLayout,
  article: ArticleLayout,
  typescale: TypeScaleLayout,
  ecommerce: EcommerceLayout,
  dashboard: DashboardLayout,
}

const T = {
  border: 'rgba(255,255,255,0.07)',
  text3: 'rgba(255,255,255,0.22)',
  text2: 'rgba(255,255,255,0.45)',
  surface: '#111114',
}

export function PreviewFrame({ settings, layout, viewport, previewTheme = 'light', customText, label, onActivate, onTextChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cw, setCW] = useState(900)

  useFontLoader([settings.headingFont, settings.bodyFont])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(e => setCW(e[0].contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const targetW = VIEWPORT_W[viewport]
  const scale   = targetW ? Math.min(1, cw / targetW) : 1
  // Desktop uses 100% width to avoid Safari resize-animation flash on first render
  const innerW: number | string = targetW ?? '100%'

  const Layout = LAYOUTS[layout]

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      onClick={onActivate}
    >
      {/* Chrome bar */}
      <div style={{
        height: 36, flexShrink: 0,
        display: 'flex', alignItems: 'center',
        padding: '0 14px', gap: 10,
        background: '#0d0d10',
        borderBottom: `1px solid ${T.border}`,
      }}>
        {/* Fake browser dots */}
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.6 }} />
          ))}
        </div>

        {/* URL-like label */}
        <div style={{
          flex: 1, maxWidth: 320, height: 20,
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${T.border}`,
          borderRadius: 5, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 5,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(40,200,64,0.7)' }} />
          <span style={{ fontSize: 10, color: T.text2 }}>
            {settings.headingFont} / {settings.bodyFont}
          </span>
        </div>

        {/* Right meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          {onTextChange && (
            <span style={{ fontSize: 9, color: T.text3, letterSpacing: '0.04em' }}>
              click text to edit
            </span>
          )}
          {label && (
            <span style={{
              fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.06)',
              padding: '2px 7px', borderRadius: 4,
            }}>
              {label}
            </span>
          )}
          {targetW && (
            <span style={{ fontSize: 10, color: T.text3 }}>{targetW}px</span>
          )}
        </div>
      </div>

      {/* Scroll container */}
      <div
        ref={containerRef}
        style={{
          flex: 1, overflow: 'auto',
          background: targetW ? '#111114' : 'transparent',
        }}
      >
        <div style={{
          width: innerW,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          // compensate height so scroll works
          ...(scale < 1
            ? { height: `${100 / scale}%`, overflow: 'hidden' }
            : {}),
        }}>
          <Layout settings={settings} customText={customText} theme={previewTheme} onTextChange={onTextChange} />
        </div>
      </div>
    </div>
  )
}
