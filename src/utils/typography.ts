import React from 'react'
import { TypographySettings } from '../types'
import { FONTS } from '../data/fonts'

export function getGenericFamily(fontFamily: string): string {
  const font = FONTS.find(f => f.family === fontFamily)
  if (!font) return 'sans-serif'
  if (font.category === 'monospace') return 'monospace'
  if (font.category === 'serif') return 'serif'
  if (font.category === 'handwriting') return 'cursive'
  return 'sans-serif'
}

export function getScaledSizes(settings: TypographySettings) {
  const { baseFontSize, scaleRatio } = settings
  return {
    h1: baseFontSize * Math.pow(scaleRatio, 5),
    h2: baseFontSize * Math.pow(scaleRatio, 4),
    h3: baseFontSize * Math.pow(scaleRatio, 3),
    h4: baseFontSize * Math.pow(scaleRatio, 2),
    h5: baseFontSize * scaleRatio,
    base: baseFontSize,
    small: baseFontSize * 0.875,
    xs: baseFontSize * 0.75,
  }
}

export interface StyleMap {
  h1: React.CSSProperties
  h2: React.CSSProperties
  h3: React.CSSProperties
  h4: React.CSSProperties
  h5: React.CSSProperties
  body: React.CSSProperties
  small: React.CSSProperties
  label: React.CSSProperties
}

export function getStyleMap(settings: TypographySettings): StyleMap {
  const sz = getScaledSizes(settings)

  const headingBase: React.CSSProperties = {
    fontFamily: `'${settings.headingFont}', ${getGenericFamily(settings.headingFont)}`,
    fontWeight: Number(settings.headingWeight),
    lineHeight: 1.15,
    letterSpacing: `${settings.headingLetterSpacing}em`,
    margin: 0,
  }

  const bodyBase: React.CSSProperties = {
    fontFamily: `'${settings.bodyFont}', ${getGenericFamily(settings.bodyFont)}`,
    fontWeight: Number(settings.bodyWeight),
    lineHeight: settings.lineHeight,
    letterSpacing: `${settings.letterSpacing}em`,
    margin: 0,
  }

  return {
    h1: { ...headingBase, fontSize: `${sz.h1.toFixed(1)}px` },
    h2: { ...headingBase, fontSize: `${sz.h2.toFixed(1)}px` },
    h3: { ...headingBase, fontSize: `${sz.h3.toFixed(1)}px` },
    h4: { ...headingBase, fontSize: `${sz.h4.toFixed(1)}px` },
    h5: { ...headingBase, fontSize: `${sz.h5.toFixed(1)}px` },
    body: { ...bodyBase, fontSize: `${sz.base}px` },
    small: { ...bodyBase, fontSize: `${sz.small.toFixed(1)}px` },
    label: {
      ...bodyBase,
      fontSize: `${sz.xs.toFixed(1)}px`,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  }
}
