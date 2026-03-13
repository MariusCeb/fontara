import { useEffect } from 'react'

const loadedFonts = new Set<string>()

export function useFontLoader(families: string[]) {
  useEffect(() => {
    families.forEach((family) => {
      if (!family || loadedFonts.has(family)) return
      loadedFonts.add(family)

      const encoded = encodeURIComponent(family).replace(/%20/g, '+')
      const url = `https://fonts.googleapis.com/css2?family=${encoded}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap`

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = url
      document.head.appendChild(link)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [families.join('|')])
}
