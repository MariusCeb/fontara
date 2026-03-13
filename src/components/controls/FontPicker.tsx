import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search, ExternalLink } from 'lucide-react'
import { FONTS, FONT_CATEGORIES } from '../../data/fonts'
import { useFontLoader } from '../../hooks/useFontLoader'
import { getSuggestionsFor } from '../../data/fontSuggestions'

interface Props {
  value: string
  onChange: (family: string) => void
  label: string
  suggestionsFor?: string   // heading font → show suggestions in body picker
}

// Fonts whose names are shown in their own typeface inside the picker list
const PREVIEW_FONTS = [
  'Inter','Playfair Display','Space Grotesk','Lora','Montserrat',
  'DM Serif Display','DM Sans','Syne','Cormorant Garamond','Merriweather',
  'Bebas Neue','Outfit','Plus Jakarta Sans','EB Garamond','Raleway',
  'Roboto','Open Sans','Nunito','Work Sans','Poppins','Libre Baskerville',
  'Manrope','Urbanist','PT Serif','Oswald','Spectral','Crimson Text',
  'Roboto Slab','Zilla Slab','Anton','Righteous','Abril Fatface',
  'Big Shoulders Display','JetBrains Mono','Fira Code','Space Mono','IBM Plex Mono',
  // new fonts
  'Figtree','Bricolage Grotesque','Albert Sans','Barlow','Josefin Sans',
  'Mulish','Rubik','Karla','Source Sans 3','IBM Plex Sans','Fira Sans',
  'Jost','Cabin','Exo 2','Fraunces','Source Serif 4','Bitter','Arvo',
  'Domine','Vollkorn','Old Standard TT','Cardo','Noto Serif',
  'Unbounded','Teko','Lobster','Pacifico','Bangers','Instrument Serif',
  'Dancing Script','Caveat','Sacramento','Satisfy','Great Vibes',
  'Roboto Mono','Source Code Pro','Inconsolata','Ubuntu Mono',
  // batch 2
  'Lexend','Red Hat Display','Be Vietnam Pro','Chivo','Archivo','Overpass',
  'Kanit','Instrument Sans','Hanken Grotesk','Readex Pro','Familjen Grotesk',
  'Asap','Public Sans',
  'Bodoni Moda','Gloock','Newsreader','Frank Ruhl Libre','Unna','Cormorant',
  'Dela Gothic One','Yeseva One','Boogaloo','Fugaz One',
  'Courier Prime','DM Mono','Martian Mono','Noto Sans Mono',
  // batch 3
  'Kumbh Sans','Quicksand','Comfortaa','Atkinson Hyperlegible','Commissioner',
  'Encode Sans','Recursive','Schibsted Grotesk','Onest','Epilogue','Spline Sans',
  'Chakra Petch','Anybody','Geist',
  'Rokkitt','Crete Round','Noto Serif Display','Gelasio','Petrona',
  'Russo One','Black Han Sans','Squada One','Exo','Saira','Changa',
  'Architects Daughter','Patrick Hand','Indie Flower','Shadows Into Light','Mali',
  'Share Tech Mono','Nova Mono','Azeret Mono','Chivo Mono','Syne Mono',
]

const CAT_LABEL: Record<string, string> = {
  'sans-serif': 'Sans', serif: 'Serif', display: 'Display',
  handwriting: 'Script', monospace: 'Mono',
}

const T = {
  text1: 'rgba(255,255,255,0.82)',
  text2: 'rgba(255,255,255,0.4)',
  text3: 'rgba(255,255,255,0.2)',
  border: 'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.11)',
  surface: '#111114',
  surface2: '#141418',
  accent: '#8b7cf8',
  accentDim: 'rgba(139,124,248,0.1)',
}

export function FontPicker({ value, onChange, label, suggestionsFor }: Props) {
  const suggestions = suggestionsFor ? getSuggestionsFor(suggestionsFor) : []
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<typeof FONT_CATEGORIES[number]>('all')
  const [focusedIdx, setFocusedIdx] = useState(-1)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useFontLoader(PREVIEW_FONTS)

  const filtered = FONTS.filter(f => {
    const matchCat = category === 'all' || f.category === category
    const matchQ = f.family.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchQ
  })

  // Reset focused index when list changes
  useEffect(() => { setFocusedIdx(-1) }, [search, category])

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIdx < 0 || !listRef.current) return
    const el = listRef.current.querySelectorAll<HTMLButtonElement>('button[data-font-item]')[focusedIdx]
    el?.scrollIntoView({ block: 'nearest' })
  }, [focusedIdx])

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedIdx(i => {
        const next = Math.min(i + 1, filtered.length - 1)
        if (filtered[next]) onChange(filtered[next].family)
        return next
      })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedIdx(i => {
        const next = Math.max(i - 1, 0)
        if (filtered[next]) onChange(filtered[next].family)
        return next
      })
    } else if (e.key === 'Enter' && focusedIdx >= 0) {
      e.preventDefault()
      const font = filtered[focusedIdx]
      if (font) { onChange(font.family); setOpen(false); setSearch(''); setFocusedIdx(-1) }
    } else if (e.key === 'Escape') {
      setOpen(false); setSearch('')
    }
  }

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: T.text2, fontWeight: 500 }}>{label}</span>
        <a
          href={`https://fonts.google.com/specimen/${encodeURIComponent(value).replace(/%20/g, '+')}`}
          target="_blank" rel="noreferrer"
          title="Open in Google Fonts"
          style={{ display: 'flex', alignItems: 'center', gap: 3, color: T.text3, textDecoration: 'none', fontSize: 10 }}
          onClick={e => e.stopPropagation()}
        >
          <ExternalLink size={10} strokeWidth={1.75} />
        </a>
      </div>

      {/* Trigger */}
      <button
        data-font-trigger={label.toLowerCase()}
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 10px',
          background: T.surface2,
          border: `1px solid ${open ? T.borderHover : T.border}`,
          borderRadius: 7,
          color: T.text1,
          fontFamily: `'${value}', sans-serif`,
          fontSize: 14,
          transition: 'border-color 0.15s',
          gap: 8,
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
        <ChevronDown
          size={13}
          strokeWidth={1.75}
          color={T.text3}
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 5px)', left: 0, right: 0, zIndex: 1000,
          background: '#131316',
          border: `1px solid rgba(255,255,255,0.1)`,
          borderRadius: 9,
          boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3)',
          display: 'flex', flexDirection: 'column',
          maxHeight: 340, overflow: 'hidden',
        }}>

          {/* Search */}
          <div style={{ padding: '10px 10px 6px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${T.border}`,
              borderRadius: 6, padding: '6px 10px',
            }}>
              <Search size={12} strokeWidth={2} color={T.text3} style={{ flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search fonts…"
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: T.text1, fontSize: 12,
                }}
              />
            </div>
          </div>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: 4, padding: '0 10px 8px', flexWrap: 'wrap' }}>
            {FONT_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '3px 9px', borderRadius: 5, border: 'none', fontSize: 10,
                  fontWeight: 600, letterSpacing: '0.04em', textTransform: 'capitalize',
                  background: category === cat ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                  color: category === cat ? T.text1 : T.text3,
                  transition: 'all 0.15s',
                }}
              >
                {cat === 'all' ? 'All' : CAT_LABEL[cat] ?? cat}
              </button>
            ))}
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div style={{ padding: '6px 10px 8px', borderTop: `1px solid ${T.border}` }}>
              <p style={{ fontSize: 9, color: T.text3, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Pairs well with</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {suggestions.map(s => (
                  <button key={s} onClick={() => { onChange(s); setOpen(false); setSearch('') }} style={{
                    fontSize: 11, padding: '3px 9px', borderRadius: 5, border: `1px solid ${T.border}`,
                    background: value === s ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                    color: value === s ? T.text1 : T.text2, cursor: 'pointer',
                    fontFamily: `'${s}', sans-serif`,
                  }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Font list */}
          <div ref={listRef} style={{ overflowY: 'auto', flex: 1, borderTop: `1px solid ${T.border}` }}>
            {filtered.length === 0 ? (
              <p style={{ padding: '20px 14px', color: T.text3, fontSize: 12, textAlign: 'center' }}>
                No fonts found
              </p>
            ) : filtered.map((font, idx) => {
              const isSelected = font.family === value
              const isFocused = idx === focusedIdx
              return (
                <button
                  key={font.family}
                  data-font-item
                  onClick={() => { onChange(font.family); setOpen(false); setSearch(''); setFocusedIdx(-1) }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px', border: 'none', textAlign: 'left',
                    background: isFocused ? 'rgba(255,255,255,0.08)' : isSelected ? 'rgba(255,255,255,0.06)' : 'transparent',
                    borderLeft: `2px solid ${isSelected ? 'rgba(255,255,255,0.25)' : isFocused ? 'rgba(255,255,255,0.15)' : 'transparent'}`,
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => {
                    if (!isSelected && !isFocused) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
                  }}
                  onMouseLeave={e => {
                    if (!isSelected && !isFocused) (e.currentTarget as HTMLElement).style.background = 'transparent'
                  }}
                >
                  <span style={{
                    fontFamily: `'${font.family}', ${font.category}`,
                    fontSize: 15, color: isSelected ? 'rgba(255,255,255,0.9)' : T.text1,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {font.family}
                  </span>
                  <span style={{
                    fontSize: 9, color: T.text3, letterSpacing: '0.06em', textTransform: 'uppercase',
                    fontWeight: 600, flexShrink: 0, marginLeft: 8,
                    background: 'rgba(255,255,255,0.04)', padding: '2px 5px', borderRadius: 3,
                  }}>
                    {CAT_LABEL[font.category] ?? font.category}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
