export interface FontOption {
  family: string
  category: 'serif' | 'sans-serif' | 'display' | 'monospace' | 'handwriting'
  weights: string[]
  variable?: boolean  // supports continuous weight axis 100-900
}

export interface TypographySettings {
  headingFont: string
  headingWeight: string
  bodyFont: string
  bodyWeight: string
  baseFontSize: number
  scaleRatio: number
  lineHeight: number
  letterSpacing: number
  headingLetterSpacing: number
}

export interface CustomText {
  heading: string
  body: string
}

export interface SavedPairing {
  id: string
  name: string
  headingFont: string
  headingWeight: string
  bodyFont: string
  bodyWeight: string
  savedAt: number
}

export type LayoutType = 'portfolio' | 'startup' | 'restaurant' | 'article' | 'typescale' | 'ecommerce' | 'dashboard'
export type ViewportType = 'desktop' | 'tablet' | 'mobile'
export type AppMode = 'preview' | 'compare'

export interface PairingPreset {
  id: string
  name: string
  description: string
  headingFont: string
  headingWeight: string
  bodyFont: string
  bodyWeight: string
  tags: string[]
}
