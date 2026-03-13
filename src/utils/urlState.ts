import { TypographySettings, LayoutType, ViewportType } from '../types'

// Compact keys to keep URL short
interface Encoded {
  hf: string; hw: string
  bf: string; bw: string
  fs: number; sr: number
  lh: number; ls: number; hls: number
  ly: string; vp: string
}

export function encodeState(
  s: TypographySettings,
  layout: LayoutType,
  viewport: ViewportType,
): string {
  const payload: Encoded = {
    hf: s.headingFont,        hw: s.headingWeight,
    bf: s.bodyFont,           bw: s.bodyWeight,
    fs: s.baseFontSize,       sr: s.scaleRatio,
    lh: s.lineHeight,         ls: s.letterSpacing,
    hls: s.headingLetterSpacing,
    ly: layout,               vp: viewport,
  }
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
}

export function decodeState(hash: string): {
  settings: Partial<TypographySettings>
  layout?: LayoutType
  viewport?: ViewportType
} | null {
  try {
    const clean = hash.replace(/^#/, '')
    const obj: Encoded = JSON.parse(decodeURIComponent(escape(atob(clean))))
    return {
      settings: {
        headingFont: obj.hf,         headingWeight: obj.hw,
        bodyFont: obj.bf,            bodyWeight: obj.bw,
        baseFontSize: obj.fs,        scaleRatio: obj.sr,
        lineHeight: obj.lh,          letterSpacing: obj.ls,
        headingLetterSpacing: obj.hls,
      },
      layout: obj.ly as LayoutType,
      viewport: obj.vp as ViewportType,
    }
  } catch {
    return null
  }
}
