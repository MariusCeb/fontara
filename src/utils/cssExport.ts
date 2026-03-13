import { TypographySettings } from '../types'
import { getGenericFamily, getScaledSizes } from './typography'

function googleFontsImport(headingFont: string, bodyFont: string): string {
  const families = [...new Set([headingFont, bodyFont])]
  const params = families
    .map(f => `family=${encodeURIComponent(f).replace(/%20/g, '+')}:wght@300;400;500;600;700;800;900`)
    .join('&')
  return `@import url('https://fonts.googleapis.com/css2?${params}&display=swap');`
}

export function generateCSS(settings: TypographySettings): string {
  const { headingFont, headingWeight, bodyFont, bodyWeight,
          baseFontSize, lineHeight, letterSpacing, headingLetterSpacing } = settings
  const sz = getScaledSizes(settings)

  return `/* ================================================
   TypeTest Export
   Generated at ${new Date().toLocaleDateString()}
   ================================================ */

/* 1. Google Fonts */
${googleFontsImport(headingFont, bodyFont)}

/* 2. Custom Properties */
:root {
  /* Typefaces */
  --font-heading: '${headingFont}', ${getGenericFamily(headingFont)};
  --font-body:    '${bodyFont}', ${getGenericFamily(bodyFont)};

  /* Weights */
  --weight-heading: ${headingWeight};
  --weight-body:    ${bodyWeight};

  /* Scale */
  --text-xs:   ${sz.xs.toFixed(2)}px;
  --text-sm:   ${sz.small.toFixed(2)}px;
  --text-base: ${sz.base}px;
  --text-lg:   ${sz.h5.toFixed(2)}px;
  --text-xl:   ${sz.h4.toFixed(2)}px;
  --text-2xl:  ${sz.h3.toFixed(2)}px;
  --text-3xl:  ${sz.h2.toFixed(2)}px;
  --text-4xl:  ${sz.h1.toFixed(2)}px;

  /* Rhythm */
  --leading-body:    ${lineHeight};
  --leading-heading: 1.15;
  --tracking-body:   ${letterSpacing}em;
  --tracking-heading: ${headingLetterSpacing}em;
}

/* 3. Base Styles */
body {
  font-family: var(--font-body);
  font-size:   var(--text-base);
  font-weight: var(--weight-body);
  line-height: var(--leading-body);
  letter-spacing: var(--tracking-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: var(--weight-heading);
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
}

h1 { font-size: var(--text-4xl); }
h2 { font-size: var(--text-3xl); }
h3 { font-size: var(--text-2xl); }
h4 { font-size: var(--text-xl); }
h5 { font-size: var(--text-lg); }

small { font-size: var(--text-sm); }
`
}
