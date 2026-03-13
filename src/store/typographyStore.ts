import { create } from 'zustand'
import { TypographySettings, LayoutType, ViewportType, AppMode, CustomText, SavedPairing } from '../types'

export type PreviewTheme = 'light' | 'dark'

const LS_KEY = 'typetest_saved_pairings'

function loadSaved(): SavedPairing[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') } catch { return [] }
}
function persistSaved(list: SavedPairing[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(list))
}

const DEFAULT_A: TypographySettings = {
  headingFont: 'Playfair Display', headingWeight: '700',
  bodyFont: 'Lato',                bodyWeight: '400',
  baseFontSize: 16, scaleRatio: 1.25,
  lineHeight: 1.65, letterSpacing: 0, headingLetterSpacing: -0.02,
}

const DEFAULT_B: TypographySettings = {
  headingFont: 'Space Grotesk', headingWeight: '700',
  bodyFont: 'Lora',             bodyWeight: '400',
  baseFontSize: 16, scaleRatio: 1.25,
  lineHeight: 1.65, letterSpacing: 0, headingLetterSpacing: -0.02,
}

const DEFAULT_TEXT: CustomText = {
  heading: '',
  body: '',
}

interface AppStore {
  mode: AppMode
  activeLayout: LayoutType
  viewport: ViewportType
  settings: [TypographySettings, TypographySettings]
  activePanel: 0 | 1
  exportOpen: boolean
  customText: CustomText
  savedPairings: SavedPairing[]
  previewTheme: PreviewTheme

  setMode: (m: AppMode) => void
  setLayout: (l: LayoutType) => void
  setViewport: (v: ViewportType) => void
  setActivePanel: (p: 0 | 1) => void
  setExportOpen: (o: boolean) => void
  setCustomText: (t: Partial<CustomText>) => void
  setPreviewTheme: (t: PreviewTheme) => void
  updateSettings: (idx: 0 | 1, updates: Partial<TypographySettings>) => void
  applyPreset: (idx: 0 | 1, preset: Partial<TypographySettings>) => void
  savePairing: (idx: 0 | 1) => void
  deleteSavedPairing: (id: string) => void
}

export const useStore = create<AppStore>((set, get) => ({
  mode: 'preview',
  activeLayout: 'startup',
  viewport: 'desktop',
  settings: [DEFAULT_A, DEFAULT_B],
  activePanel: 0,
  exportOpen: false,
  customText: DEFAULT_TEXT,
  savedPairings: loadSaved(),
  previewTheme: 'light',

  setMode: m => set({ mode: m }),
  setLayout: l => set({ activeLayout: l }),
  setViewport: v => set({ viewport: v }),
  setActivePanel: p => set({ activePanel: p }),
  setExportOpen: o => set({ exportOpen: o }),
  setCustomText: t => set(s => ({ customText: { ...s.customText, ...t } })),
  setPreviewTheme: t => set({ previewTheme: t }),

  updateSettings: (idx, updates) =>
    set(s => {
      const next = [...s.settings] as [TypographySettings, TypographySettings]
      next[idx] = { ...next[idx], ...updates }
      return { settings: next }
    }),

  applyPreset: (idx, preset) =>
    set(s => {
      const next = [...s.settings] as [TypographySettings, TypographySettings]
      next[idx] = { ...next[idx], ...preset }
      return { settings: next }
    }),

  savePairing: (idx) => {
    const { settings, savedPairings } = get()
    const s = settings[idx]
    const name = `${s.headingFont.split(' ')[0]} + ${s.bodyFont.split(' ')[0]}`
    // avoid duplicates
    const exists = savedPairings.some(p => p.headingFont === s.headingFont && p.bodyFont === s.bodyFont)
    if (exists) return
    const entry: SavedPairing = {
      id: `saved_${Date.now()}`,
      name,
      headingFont: s.headingFont, headingWeight: s.headingWeight,
      bodyFont: s.bodyFont,       bodyWeight: s.bodyWeight,
      savedAt: Date.now(),
    }
    const next = [entry, ...savedPairings]
    persistSaved(next)
    set({ savedPairings: next })
  },

  deleteSavedPairing: (id) => {
    const next = get().savedPairings.filter(p => p.id !== id)
    persistSaved(next)
    set({ savedPairings: next })
  },
}))
