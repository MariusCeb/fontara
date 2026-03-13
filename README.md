# TypeTest

A live typography testing tool for designers and developers. Pick font pairings, tweak type settings, and preview them across 7 real-world layout templates — all in the browser, instantly.

**[→ Try it live](https://mariusceb.github.io/typetest)**

---

## What it does

You choose a heading font and a body font, adjust the scale and spacing, and see the result rendered inside realistic page layouts — a startup landing page, a portfolio, a restaurant site, an article, an e-commerce product page, a SaaS dashboard, and a type specimen sheet.

Everything updates live. No page reloads. No signup.

---

## Features

### 175+ Google Fonts
Every font loads on demand. Browse by category (Sans, Serif, Display, Script, Mono), search by name, or jump straight to a suggested pairing.

### Font pairing suggestions
Pick a heading font and the body picker will show curated fonts that pair well with it — based on actual design conventions, not random picks.

### 7 layout previews
| # | Layout | Context |
|---|--------|---------|
| 1 | Startup | SaaS / product landing page |
| 2 | Portfolio | Designer or creative personal site |
| 3 | Restaurant | Premium dining experience |
| 4 | Article | Editorial / long-form blog |
| 5 | E-commerce | Product detail page |
| 6 | Dashboard | SaaS analytics app |
| 7 | Type Scale | Pure specimen — every size at once |

### Editable preview text
Click directly on the heading or body text inside any layout to edit it in place. See your own copy in your chosen typeface, immediately.

### Compare mode
Open two font pairings side by side in a split view. Switch which panel you're editing from the sidebar.

### Typography controls
- Base font size
- Scale ratio (Minor Third → Perfect Fifth → Golden Ratio, etc.)
- Line height
- Letter spacing (heading + body independently)
- Variable font weight slider (for fonts that support it)

### Keyboard shortcuts
| Key | Action |
|-----|--------|
| `1` – `7` | Switch layout |
| `P` | Preview mode |
| `C` | Compare mode |
| `D` | Toggle dark / light preview |
| `⌘K` | Open heading font picker |
| `⌘⇧K` | Open body font picker |
| `↑ ↓` | Navigate fonts (inside picker, instant preview) |
| `?` | Show all shortcuts |

### Share & export
Copy a shareable URL that encodes your exact settings (fonts, scale, spacing, layout). Open it on any device and it restores your configuration.

### Responsive
Works on desktop, tablet, and mobile. The sidebar becomes a slide-in drawer on small screens.

---

## Tech stack

- **React 18** + **TypeScript**
- **Vite** for dev / build
- **Zustand** for state
- **Lucide React** for icons
- Google Fonts loaded dynamically via `<link>` injection
- Inline styles only — no CSS framework, no Tailwind

---

## Run locally

```bash
git clone https://github.com/MariusCeb/typetest.git
cd typetest
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

---

## Build

```bash
npm run build
```

Output goes to `dist/`.

---

Made by [Marius Ceban](https://mariusceb.github.io/)
