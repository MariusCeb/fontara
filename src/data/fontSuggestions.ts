// Curated body font suggestions for a given heading font
// Based on classic typographic pairings and Google Fonts recommendations

export const FONT_SUGGESTIONS: Record<string, string[]> = {
  // Serifs
  'Playfair Display':     ['Lato', 'Source Sans 3', 'DM Sans', 'Raleway'],
  'EB Garamond':          ['Lato', 'Nunito Sans', 'Source Sans 3', 'Inter'],
  'Cormorant Garamond':   ['Proza Libre', 'Source Sans 3', 'Raleway', 'Lato'],
  'Cormorant':            ['Source Sans 3', 'Raleway', 'DM Sans', 'Lato'],
  'Lora':                 ['Merriweather', 'Source Serif 4', 'Inter', 'Work Sans'],
  'Merriweather':         ['Open Sans', 'Source Sans 3', 'Lato', 'Nunito'],
  'Libre Baskerville':    ['Lato', 'Source Sans 3', 'Open Sans', 'Raleway'],
  'DM Serif Display':     ['DM Sans', 'Inter', 'Lato', 'Source Sans 3'],
  'Fraunces':             ['Mulish', 'Nunito', 'DM Sans', 'Inter'],
  'Spectral':             ['Roboto', 'Source Sans 3', 'Open Sans', 'Karla'],
  'Bodoni Moda':          ['Raleway', 'Lato', 'DM Sans', 'Source Sans 3'],
  'Gloock':               ['Inter', 'DM Sans', 'Manrope', 'Nunito Sans'],
  'Newsreader':           ['Source Sans 3', 'Nunito Sans', 'Inter', 'Lato'],
  'Frank Ruhl Libre':     ['Raleway', 'Nunito', 'Lato', 'Open Sans'],
  'Instrument Serif':     ['Instrument Sans', 'Inter', 'DM Sans', 'Manrope'],
  'Crimson Text':         ['Source Sans 3', 'Raleway', 'Open Sans', 'Lato'],
  // Sans-serifs
  'Inter':                ['Lora', 'Merriweather', 'Source Serif 4', 'EB Garamond'],
  'Montserrat':           ['Merriweather', 'Lora', 'Source Serif 4', 'Open Sans'],
  'Raleway':              ['Merriweather', 'Lora', 'Libre Baskerville', 'Open Sans'],
  'Space Grotesk':        ['Inter', 'Lora', 'DM Sans', 'Source Serif 4'],
  'Syne':                 ['DM Sans', 'Inter', 'Manrope', 'Lora'],
  'Outfit':               ['Inter', 'Nunito', 'Lora', 'DM Sans'],
  'DM Sans':              ['DM Serif Display', 'Lora', 'Spectral', 'Inter'],
  'Plus Jakarta Sans':    ['Lora', 'Source Serif 4', 'Merriweather', 'Inter'],
  'Poppins':              ['Lato', 'Open Sans', 'Source Sans 3', 'Nunito'],
  'Manrope':              ['Lora', 'Source Serif 4', 'Inter', 'Nunito Sans'],
  'Urbanist':             ['Lora', 'Merriweather', 'Inter', 'DM Sans'],
  'Bricolage Grotesque':  ['Inter', 'DM Sans', 'Lora', 'Source Serif 4'],
  'Instrument Sans':      ['Instrument Serif', 'Lora', 'EB Garamond', 'Inter'],
  'Hanken Grotesk':       ['Lora', 'Source Serif 4', 'Inter', 'Nunito'],
  'Archivo':              ['Lora', 'Merriweather', 'Inter', 'Source Serif 4'],
  'Lexend':               ['Lora', 'Merriweather', 'Inter', 'Open Sans'],
  // Display
  'Bebas Neue':           ['Lato', 'Raleway', 'Open Sans', 'Montserrat'],
  'Oswald':               ['Merriweather', 'Lato', 'EB Garamond', 'Source Sans 3'],
  'Unbounded':            ['Inter', 'DM Sans', 'Manrope', 'Nunito Sans'],
  'Big Shoulders Display':['Inter', 'Lato', 'Source Sans 3', 'Raleway'],
  'Dela Gothic One':      ['Inter', 'DM Sans', 'Manrope', 'Lato'],
  'Yeseva One':           ['Josefin Sans', 'Raleway', 'Lato', 'Source Sans 3'],
  'Anton':                ['Lato', 'Open Sans', 'Source Sans 3', 'Raleway'],
  // Mono
  'JetBrains Mono':       ['Inter', 'Lato', 'DM Sans', 'Source Sans 3'],
  'Fira Code':            ['Fira Sans', 'Source Sans 3', 'Inter', 'Lato'],
  'Space Mono':           ['Space Grotesk', 'Inter', 'DM Sans', 'Lato'],
}

export function getSuggestionsFor(headingFont: string): string[] {
  return FONT_SUGGESTIONS[headingFont] ?? []
}
