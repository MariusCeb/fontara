var j=Object.defineProperty;var U=(p,d,h)=>d in p?j(p,d,{enumerable:!0,configurable:!0,writable:!0,value:h}):p[d]=h;var v=(p,d,h)=>U(p,typeof d!="symbol"?d+"":d,h);(function(){"use strict";const p=`
  /* ── Widget isolation — prevent host-page fonts from leaking in ── */
  #fontara-dock, #fontara-dock * {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif !important;
    letter-spacing: 0 !important;
    line-height: normal !important;
    text-transform: none !important;
    font-variant: normal !important;
    box-sizing: border-box !important;
  }
  #fontara-panel, #fontara-activation {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif !important;
  }

  /* ── Dock & trigger ──────────────────────────────────────────── */
  #fontara-dock {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  }

  #fontara-trigger {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: #7c3aed;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(124,58,237,0.45);
    transition: transform 0.15s, box-shadow 0.15s;
    color: white;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.03em;
    -webkit-font-smoothing: antialiased;
  }
  #fontara-trigger:hover { transform: scale(1.06); box-shadow: 0 6px 28px rgba(124,58,237,0.55); }
  #fontara-trigger.active { background: #5b21b6; }

  /* ── Panel shell ─────────────────────────────────────────────── */
  #fontara-panel {
    position: fixed;
    bottom: 84px;
    right: 24px;
    width: 310px;
    max-height: 82vh;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06);
    z-index: 2147483646;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  #fontara-panel.hidden { display: none; }

  /* ── Header ──────────────────────────────────────────────────── */
  .fn-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px 10px;
    border-bottom: 1px solid #f3f4f6;
    flex-shrink: 0;
  }
  .fn-title { font-size: 13px; font-weight: 700; color: #111827; }
  .fn-badge {
    font-size: 9px; font-weight: 700; background: #ede9fe; color: #7c3aed;
    padding: 2px 6px; border-radius: 20px; letter-spacing: 0.06em; text-transform: uppercase;
  }
  .fn-close {
    background: none; border: none; cursor: pointer; color: #9ca3af;
    font-size: 15px; padding: 3px 5px; border-radius: 6px; transition: color 0.1s, background 0.1s;
  }
  .fn-close:hover { color: #374151; background: #f3f4f6; }

  /* ── Tabs ────────────────────────────────────────────────────── */
  .fn-tabs {
    display: flex;
    border-bottom: 1px solid #f3f4f6;
    flex-shrink: 0;
  }
  .fn-tab {
    flex: 1; padding: 9px 0; font-size: 12px; font-weight: 600;
    background: none; border: none; cursor: pointer;
    color: #9ca3af; transition: color 0.15s;
    font-family: inherit; border-bottom: 2px solid transparent;
    margin-bottom: -1px;
  }
  .fn-tab.active { color: #7c3aed; border-bottom-color: #7c3aed; }
  .fn-tab:hover:not(.active) { color: #6b7280; }

  /* ── Scrollable body ─────────────────────────────────────────── */
  .fn-scroll {
    overflow-y: auto;
    flex: 1;
    scrollbar-width: thin;
    scrollbar-color: #e5e7eb transparent;
  }

  /* ── Section ─────────────────────────────────────────────────── */
  .fn-section { padding: 10px 14px; }
  .fn-label {
    font-size: 10px; font-weight: 700; color: #9ca3af;
    text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 7px;
  }

  /* ── Slot tabs (Heading / Body) ──────────────────────────────── */
  .fn-slot-tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin-bottom: 2px;
  }
  .fn-slot-tab {
    background: #f9fafb; border: 1.5px solid #e5e7eb; border-radius: 10px;
    padding: 8px 10px; cursor: pointer; text-align: left;
    transition: border-color 0.15s, background 0.15s;
    font-family: inherit;
  }
  .fn-slot-tab.active { border-color: #7c3aed; background: #f5f3ff; }
  .fn-slot-tab:hover:not(.active) { border-color: #c4b5fd; }
  .fn-slot-label {
    display: block; font-size: 9px; font-weight: 700; color: #9ca3af;
    text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px;
  }
  .fn-slot-tab.active .fn-slot-label { color: #7c3aed; }
  .fn-slot-font {
    display: block; font-size: 12px; font-weight: 600; color: #111827;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* ── Search ──────────────────────────────────────────────────── */
  .fn-search {
    width: 100%; border: 1.5px solid #e5e7eb; border-radius: 10px;
    padding: 7px 10px; font-size: 13px; outline: none;
    box-sizing: border-box; transition: border-color 0.15s;
    color: #111827; background: #fafafa; font-family: inherit;
    margin-bottom: 8px;
  }
  .fn-search:focus { border-color: #7c3aed; background: #fff; }

  /* ── Category pills ──────────────────────────────────────────── */
  .fn-cats {
    display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px;
  }
  .fn-cat {
    font-size: 11px; font-weight: 500; padding: 3px 9px;
    border-radius: 20px; border: 1.5px solid #e5e7eb;
    background: white; color: #6b7280; cursor: pointer;
    transition: all 0.1s; font-family: inherit;
  }
  .fn-cat:hover { border-color: #c4b5fd; color: #7c3aed; }
  .fn-cat.active { background: #7c3aed; border-color: #7c3aed; color: white; }

  /* ── Font list ───────────────────────────────────────────────── */
  .fn-font-list {
    max-height: 150px; overflow-y: auto;
    scrollbar-width: thin; scrollbar-color: #e5e7eb transparent;
  }
  .fn-font-item {
    padding: 5px 8px; border-radius: 8px; cursor: pointer;
    font-size: 13px; color: #374151; transition: background 0.1s;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .fn-font-item:hover { background: #f5f3ff; color: #6d28d9; }
  .fn-font-item.selected { background: #ede9fe; color: #7c3aed; font-weight: 600; }
  .fn-empty { font-size: 12px; color: #9ca3af; padding: 8px; margin: 0; }

  /* ── Weight selector ─────────────────────────────────────────── */
  .fn-weights {
    display: flex; flex-wrap: wrap; gap: 4px;
  }
  .fn-weight-btn {
    font-size: 11px; padding: 3px 9px; border-radius: 8px;
    border: 1.5px solid #e5e7eb; background: white; cursor: pointer;
    color: #374151; transition: all 0.1s; font-family: inherit;
  }
  .fn-weight-btn:hover { border-color: #c4b5fd; color: #7c3aed; }
  .fn-weight-btn.active { background: #7c3aed; border-color: #7c3aed; color: white; }

  /* ── Suggestions ─────────────────────────────────────────────── */
  .fn-suggestions {
    display: flex; flex-wrap: wrap; gap: 4px;
  }
  .fn-suggestion {
    font-size: 11px; padding: 3px 9px; border-radius: 8px;
    border: 1.5px solid #e5e7eb; background: white; cursor: pointer;
    color: #374151; transition: all 0.1s; font-family: inherit;
  }
  .fn-suggestion:hover { border-color: #c4b5fd; color: #7c3aed; }
  .fn-suggestion.active { background: #ede9fe; border-color: #7c3aed; color: #7c3aed; font-weight: 600; }

  /* ── Active bar (current pairing) ────────────────────────────── */
  .fn-active-bar {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 14px; background: #fafafa;
    border-top: 1px solid #f3f4f6; border-bottom: 1px solid #f3f4f6;
    flex-shrink: 0;
  }
  .fn-active-item { display: flex; align-items: center; gap: 5px; min-width: 0; flex: 1; }
  .fn-active-label {
    font-size: 9px; font-weight: 700; color: #9ca3af;
    text-transform: uppercase; flex-shrink: 0;
  }
  .fn-active-font {
    font-size: 12px; color: #111827; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }
  .fn-active-sep { font-size: 11px; color: #d1d5db; flex-shrink: 0; }

  /* ── Presets ─────────────────────────────────────────────────── */
  .fn-presets-list {
    overflow-y: auto; flex: 1;
    scrollbar-width: thin; scrollbar-color: #e5e7eb transparent;
    padding: 8px;
    display: flex; flex-direction: column; gap: 6px;
  }
  .fn-preset-card {
    width: 100%; text-align: left; background: white;
    border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 12px;
    cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s;
    font-family: inherit;
  }
  .fn-preset-card:hover { border-color: #c4b5fd; box-shadow: 0 2px 12px rgba(124,58,237,0.1); }
  .fn-preset-heading { font-size: 16px; color: #111827; margin-bottom: 3px; line-height: 1.2; }
  .fn-preset-body { font-size: 11px; color: #6b7280; margin-bottom: 6px; line-height: 1.4; }
  .fn-preset-tags { display: flex; flex-wrap: wrap; gap: 3px; }
  .fn-tag {
    font-size: 9px; font-weight: 600; padding: 2px 6px; border-radius: 20px;
    background: #f3f4f6; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.04em;
    font-family: -apple-system, system-ui, sans-serif;
  }

  /* ── Actions ─────────────────────────────────────────────────── */
  .fn-actions {
    padding: 8px 10px 10px;
    display: flex; gap: 6px;
    flex-shrink: 0;
  }
  .fn-btn {
    flex: 1; padding: 7px 6px; border-radius: 10px;
    border: 1.5px solid #e5e7eb; font-size: 12px; font-weight: 500;
    cursor: pointer; transition: background 0.1s, border-color 0.1s;
    background: white; color: #374151; font-family: inherit;
  }
  .fn-btn:hover { background: #f9fafb; border-color: #d1d5db; }
  .fn-btn-primary { background: #7c3aed; color: white; border-color: #7c3aed; font-weight: 600; }
  .fn-btn-primary:hover { background: #6d28d9; border-color: #6d28d9; }
  .fn-btn-success { background: #059669 !important; border-color: #059669 !important; color: white !important; }
  .fn-btn-danger { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }

  /* ── Inspector ───────────────────────────────────────────────── */
  .fontara-hover {
    outline: 2px dashed rgba(124,58,237,0.6) !important;
    outline-offset: 2px !important;
    cursor: crosshair !important;
  }
  .fontara-selected {
    outline: 2px solid #7c3aed !important;
    outline-offset: 2px !important;
  }

  /* ── Activation overlay ──────────────────────────────────────── */
  #fontara-activation {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.55);
    display: flex; align-items: center; justify-content: center;
    z-index: 2147483647;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
  .fn-activation-box {
    background: white; border-radius: 20px; padding: 32px;
    width: 360px; max-width: calc(100vw - 48px);
    box-shadow: 0 32px 100px rgba(0,0,0,0.25);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  }
  .fn-activation-box h2 { font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 6px; }
  .fn-activation-box p { font-size: 14px; color: #6b7280; margin: 0 0 20px; }
  .fn-key-input {
    width: 100%; border: 1.5px solid #e5e7eb; border-radius: 12px;
    padding: 11px 14px; font-size: 14px;
    font-family: 'SF Mono','Fira Code',monospace;
    outline: none; box-sizing: border-box; margin-bottom: 8px;
    transition: border-color 0.15s; letter-spacing: 0.04em;
  }
  .fn-key-input:focus { border-color: #7c3aed; }
  .fn-key-error { font-size: 13px; color: #dc2626; min-height: 20px; margin: 0 0 12px; }
  .fn-submit-btn {
    width: 100%; background: #7c3aed; color: white; border: none;
    border-radius: 12px; padding: 12px; font-size: 15px; font-weight: 600;
    cursor: pointer; font-family: inherit; transition: background 0.15s;
  }
  .fn-submit-btn:hover { background: #6d28d9; }
  .fn-submit-btn:disabled { opacity: 0.6; cursor: default; }
  .fn-activation-footer { font-size: 12px; color: #9ca3af; text-align: center; margin: 14px 0 0; }
  .fn-activation-footer a { color: #7c3aed; text-decoration: none; }
  .fn-activation-footer a:hover { text-decoration: underline; }

  /* ── Element group chips ─────────────────────────────────────── */
  .fn-element-chips {
    display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 6px;
  }
  .fn-chip {
    font-size: 11px; font-weight: 600; padding: 3px 9px;
    border-radius: 8px; border: 1.5px solid #e5e7eb;
    background: white; color: #374151; cursor: pointer;
    transition: all 0.1s; font-family: inherit !important;
  }
  .fn-chip:hover { border-color: #c4b5fd; color: #7c3aed; }
  .fn-chip.active { background: #7c3aed; border-color: #7c3aed; color: white; }
  .fn-chip-pick { border-style: dashed; }
  .fn-chip-pick.active { background: #dc2626; border-color: #dc2626; border-style: solid; }

  .fn-current-element {
    font-size: 11px; color: #6b7280; margin-top: 2px;
  }
  .fn-current-element strong { color: #374151; }

  /* ── Settings controls ───────────────────────────────────────── */
  .fn-setting-row {
    margin-bottom: 12px;
  }
  .fn-setting-label {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 11px; font-weight: 600; color: #374151;
    margin-bottom: 5px;
  }
  .fn-val {
    font-size: 11px; font-weight: 500; color: #7c3aed;
    background: #ede9fe; padding: 1px 6px; border-radius: 4px;
  }
  .fn-slider {
    width: 100%; height: 4px; accent-color: #7c3aed;
    cursor: pointer; border: none !important;
  }
  .fn-select {
    width: 100%; border: 1.5px solid #e5e7eb; border-radius: 8px;
    padding: 6px 8px; font-size: 12px; outline: none;
    color: #374151; background: #fafafa; cursor: pointer;
    font-family: inherit !important; transition: border-color 0.15s;
  }
  .fn-select:focus { border-color: #7c3aed; }

  /* ── Scale preview ───────────────────────────────────────────── */
  .fn-scale-preview {
    border-top: 1px solid #f3f4f6; padding-top: 10px; margin-top: 4px;
  }
  .fn-scale-row {
    display: flex; align-items: baseline; gap: 6px; margin-bottom: 4px;
    overflow: hidden;
  }
  .fn-scale-tag {
    font-size: 9px; font-weight: 700; color: #9ca3af;
    text-transform: uppercase; width: 22px; flex-shrink: 0;
  }
  .fn-scale-text {
    flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    color: #111827;
  }
  .fn-scale-size {
    font-size: 10px; color: #9ca3af; flex-shrink: 0;
  }

  /* ── Pick button (inside actions bar) ───────────────────────── */
  .fn-btn-pick { border-style: dashed !important; color: #6b7280 !important; }
  .fn-btn-pick:hover { border-color: #7c3aed !important; color: #7c3aed !important; border-style: solid !important; }
  .fn-btn-pick.active { background: #dc2626 !important; border-color: #dc2626 !important; color: white !important; border-style: solid !important; }

  /* ── Reset settings btn ─────────────────────────────────────── */
  .fn-btn-reset-settings {
    width: 100%; margin-top: 8px;
    padding: 7px; border-radius: 10px; border: 1.5px solid #e5e7eb;
    font-size: 12px; font-weight: 500; cursor: pointer;
    background: white; color: #6b7280; font-family: inherit !important;
    transition: background 0.1s, border-color 0.1s;
  }
  .fn-btn-reset-settings:hover { background: #fef2f2; border-color: #fca5a5; color: #dc2626; }
`;let d=!1,h=null;function w(s){return s.id?.startsWith("fontara-")||s.closest("#fontara-dock")!==null||s.closest("#fontara-panel")!==null||s.closest("#fontara-activation")!==null}function x(s){const e=s.target;!e||w(e)||e.classList.add("fontara-hover")}function S(s){const e=s.target;e&&e.classList.remove("fontara-hover")}function k(s){const e=s.target;!e||w(e)||(s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation(),e.classList.remove("fontara-hover"),e.classList.add("fontara-selected"),y(),h?.(e))}function T(s){d&&y(),d=!0,h=s,document.addEventListener("mouseover",x,!0),document.addEventListener("mouseout",S,!0),document.addEventListener("click",k,!0),document.body.style.cursor="crosshair"}function y(){d=!1,document.removeEventListener("mouseover",x,!0),document.removeEventListener("mouseout",S,!0),document.removeEventListener("click",k,!0),document.body.style.cursor=""}function B(){document.querySelectorAll(".fontara-selected").forEach(s=>{s.classList.remove("fontara-selected")})}function C(){return d}const $=new Set;function L(s,e){const t=`${s}:${e.join(",")}`;if($.has(t))return;$.add(t);const i=`fn-font-${s.replace(/\s+/g,"-").toLowerCase()}`;if(document.getElementById(i))return;const a=[...new Set(e)].sort().join(";"),n=document.createElement("link");n.id=i,n.rel="stylesheet",n.href=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(s)}:wght@${a}&display=swap`,document.head.appendChild(n)}const f=[{id:"h1",label:"H1",selectors:"h1",isHeading:!0,defaultFont:"Playfair Display",defaultWeight:"700",defaultFontSize:48,defaultLineHeight:1.1,defaultTracking:-.02},{id:"h2",label:"H2",selectors:"h2",isHeading:!0,defaultFont:"Playfair Display",defaultWeight:"700",defaultFontSize:38,defaultLineHeight:1.15,defaultTracking:-.02},{id:"h3",label:"H3",selectors:"h3",isHeading:!0,defaultFont:"Playfair Display",defaultWeight:"600",defaultFontSize:30,defaultLineHeight:1.2,defaultTracking:-.01},{id:"h4h6",label:"H4–6",selectors:"h4, h5, h6",isHeading:!0,defaultFont:"Inter",defaultWeight:"600",defaultFontSize:22,defaultLineHeight:1.3,defaultTracking:0},{id:"body",label:"Body",selectors:"p, li, td, blockquote, label",isHeading:!1,defaultFont:"Lato",defaultWeight:"400",defaultFontSize:16,defaultLineHeight:1.65,defaultTracking:0},{id:"btn",label:"Btn",selectors:'button, [role="button"], input[type="submit"], a.btn, a[class*="button"]',isHeading:!1,defaultFont:"Inter",defaultWeight:"500",defaultFontSize:14,defaultLineHeight:1.4,defaultTracking:.01},{id:"nav",label:"Nav",selectors:'nav a, header a, [class*="nav"] a, [class*="menu"] a',isHeading:!1,defaultFont:"Inter",defaultWeight:"400",defaultFontSize:14,defaultLineHeight:1.5,defaultTracking:0}];function D(s){const e=s.tagName.toLowerCase();return e==="h1"?"h1":e==="h2"?"h2":e==="h3"?"h3":e==="h4"||e==="h5"||e==="h6"?"h4h6":e==="button"||s.getAttribute("role")==="button"?"btn":e==="a"&&(s.closest("nav")||s.closest("header"))?"nav":"body"}const m="fontara-applied-styles";function H(s){let e=document.getElementById(m);e||(e=document.createElement("style"),e.id=m,document.head.appendChild(e));const t=["/* Fontara — Applied Styles */"];for(const i of f){const a=s[i.id];if(!a)continue;const n=i.selectors.split(",").map(r=>r.trim()).filter(Boolean).join(", ");t.push(`${n} { font-family: '${a.font}', system-ui, sans-serif !important; font-weight: ${a.weight} !important; font-size: ${a.fontSize}px !important; line-height: ${a.lineHeight} !important; letter-spacing: ${a.tracking}em !important; }`)}e.textContent=t.join(`
`)}function q(){document.getElementById(m)?.remove()}function W(s){const e=new Map;for(const a of Object.values(s))e.has(a.font)||e.set(a.font,new Set),e.get(a.font).add(a.weight);const t=Array.from(e.entries()).map(([a,n])=>{const r=[...n].sort().join(";");return`@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(a)}:wght@${r}&display=swap');`}),i=[];for(const a of f){const n=s[a.id];if(!n)continue;const r=a.selectors.split(",").map(g=>g.trim()).filter(Boolean).join(", ");i.push(`${r} {
  font-family: '${n.font}', system-ui, sans-serif;
  font-weight: ${n.weight};
  font-size: ${n.fontSize}px;
  line-height: ${n.lineHeight};
  letter-spacing: ${n.tracking}em;
}`)}return`/* Fontara — Typography Export
 * Generated: ${new Date().toISOString().split("T")[0]}
 */

/* 1. Import fonts */
${t.join(`
`)}

/* 2. Typography rules */
${i.join(`

`)}`}async function P(s){try{return await navigator.clipboard.writeText(s),!0}catch{const e=document.createElement("textarea");e.value=s,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();const t=document.execCommand("copy");return e.remove(),t}}const b=[{family:"Inter",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Roboto",category:"sans-serif",weights:["300","400","500","700","900"],variable:!0},{family:"Open Sans",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Lato",category:"sans-serif",weights:["300","400","700","900"]},{family:"Montserrat",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Raleway",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Nunito",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Nunito Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"DM Sans",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Plus Jakarta Sans",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Space Grotesk",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Outfit",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Syne",category:"sans-serif",weights:["400","500","600","700","800"],variable:!0},{family:"Manrope",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Urbanist",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Work Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Poppins",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Figtree",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Bricolage Grotesque",category:"sans-serif",weights:["200","300","400","500","600","700","800"],variable:!0},{family:"Albert Sans",category:"sans-serif",weights:["100","200","300","400","500","600","700","800","900"],variable:!0},{family:"Barlow",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Josefin Sans",category:"sans-serif",weights:["300","400","600","700"],variable:!0},{family:"Mulish",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Rubik",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Karla",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Source Sans 3",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"IBM Plex Sans",category:"sans-serif",weights:["300","400","500","600","700"]},{family:"Fira Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Jost",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Cabin",category:"sans-serif",weights:["400","500","600","700"],variable:!0},{family:"Titillium Web",category:"sans-serif",weights:["300","400","600","700","900"]},{family:"Exo 2",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Noto Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Lexend",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Red Hat Display",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Be Vietnam Pro",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Chivo",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Archivo",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Instrument Sans",category:"sans-serif",weights:["400","500","600","700"],variable:!0},{family:"Hanken Grotesk",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Readex Pro",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Public Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Quicksand",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Commissioner",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Onest",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Geist",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Epilogue",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Spline Sans",category:"sans-serif",weights:["300","400","500","600","700"]},{family:"Playfair Display",category:"serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Lora",category:"serif",weights:["400","500","600","700"],variable:!0},{family:"Merriweather",category:"serif",weights:["300","400","700","900"]},{family:"EB Garamond",category:"serif",weights:["400","500","600","700","800"],variable:!0},{family:"Libre Baskerville",category:"serif",weights:["400","700"]},{family:"Cormorant Garamond",category:"serif",weights:["300","400","500","600","700"]},{family:"Crimson Text",category:"serif",weights:["400","600","700"]},{family:"DM Serif Display",category:"serif",weights:["400"]},{family:"Spectral",category:"serif",weights:["300","400","500","600","700","800"]},{family:"PT Serif",category:"serif",weights:["400","700"]},{family:"Fraunces",category:"serif",weights:["300","400","500","600","700","800","900"]},{family:"Source Serif 4",category:"serif",weights:["300","400","500","600","700","800","900"]},{family:"Bitter",category:"serif",weights:["300","400","500","600","700","800","900"]},{family:"Domine",category:"serif",weights:["400","500","600","700","800"]},{family:"Vollkorn",category:"serif",weights:["400","500","600","700","800","900"]},{family:"Noto Serif",category:"serif",weights:["300","400","500","600","700","800","900"]},{family:"Instrument Serif",category:"serif",weights:["400"]},{family:"Bodoni Moda",category:"serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Gloock",category:"serif",weights:["400"]},{family:"Newsreader",category:"serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Frank Ruhl Libre",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Cormorant",category:"serif",weights:["300","400","500","600","700"],variable:!0},{family:"Rokkitt",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Petrona",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Bebas Neue",category:"display",weights:["400"]},{family:"Oswald",category:"display",weights:["300","400","500","600","700"]},{family:"Anton",category:"display",weights:["400"]},{family:"Righteous",category:"display",weights:["400"]},{family:"Abril Fatface",category:"display",weights:["400"]},{family:"Big Shoulders Display",category:"display",weights:["300","400","500","600","700","800","900"]},{family:"Unbounded",category:"display",weights:["300","400","500","600","700","800","900"]},{family:"Teko",category:"display",weights:["300","400","500","600","700"]},{family:"Lobster",category:"display",weights:["400"]},{family:"Pacifico",category:"display",weights:["400"]},{family:"Bangers",category:"display",weights:["400"]},{family:"Bungee",category:"display",weights:["400"]},{family:"Alfa Slab One",category:"display",weights:["400"]},{family:"Dela Gothic One",category:"display",weights:["400"]},{family:"Yeseva One",category:"display",weights:["400"]},{family:"Russo One",category:"display",weights:["400"]},{family:"Saira",category:"display",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Dancing Script",category:"handwriting",weights:["400","500","600","700"]},{family:"Caveat",category:"handwriting",weights:["400","500","600","700"]},{family:"Sacramento",category:"handwriting",weights:["400"]},{family:"Kalam",category:"handwriting",weights:["300","400","700"]},{family:"Satisfy",category:"handwriting",weights:["400"]},{family:"Great Vibes",category:"handwriting",weights:["400"]},{family:"Parisienne",category:"handwriting",weights:["400"]},{family:"Architects Daughter",category:"handwriting",weights:["400"]},{family:"Patrick Hand",category:"handwriting",weights:["400"]},{family:"Indie Flower",category:"handwriting",weights:["400"]},{family:"Shadows Into Light",category:"handwriting",weights:["400"]},{family:"Mali",category:"handwriting",weights:["300","400","500","600","700"]},{family:"JetBrains Mono",category:"monospace",weights:["400","500","600","700","800"]},{family:"Fira Code",category:"monospace",weights:["300","400","500","600","700"]},{family:"Space Mono",category:"monospace",weights:["400","700"]},{family:"IBM Plex Mono",category:"monospace",weights:["300","400","500","600","700"]},{family:"Roboto Mono",category:"monospace",weights:["300","400","500","600","700"]},{family:"Source Code Pro",category:"monospace",weights:["300","400","500","600","700","800","900"]},{family:"Inconsolata",category:"monospace",weights:["300","400","500","600","700","800","900"]},{family:"Ubuntu Mono",category:"monospace",weights:["400","700"]},{family:"Courier Prime",category:"monospace",weights:["400","700"]},{family:"DM Mono",category:"monospace",weights:["300","400","500"]},{family:"Martian Mono",category:"monospace",weights:["300","400","500","600","700","800"]},{family:"Chivo Mono",category:"monospace",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Syne Mono",category:"monospace",weights:["400"]}],A=[{id:"all",label:"All"},{id:"sans-serif",label:"Sans"},{id:"serif",label:"Serif"},{id:"display",label:"Display"},{id:"handwriting",label:"Script"},{id:"monospace",label:"Mono"}];function I(s,e){const t=s.toLowerCase().trim();return b.filter(i=>{const a=e==="all"||i.category===e,n=!t||i.family.toLowerCase().includes(t);return a&&n})}function u(s){return b.find(e=>e.family===s)}const F=[{id:"classic-elegance",name:"Classic Elegance",description:"Timeless editorial pairing for premium brands",headingFont:"Playfair Display",headingWeight:"700",bodyFont:"Lato",bodyWeight:"400",tags:["editorial","luxury","classic"]},{id:"modern-editorial",name:"Modern Editorial",description:"Clean tech aesthetic meets readable prose",headingFont:"Inter",headingWeight:"700",bodyFont:"Merriweather",bodyWeight:"400",tags:["tech","blog","modern"]},{id:"tech-craft",name:"Tech Meets Craft",description:"Geometric precision with warm humanist body",headingFont:"Space Grotesk",headingWeight:"700",bodyFont:"Lora",bodyWeight:"400",tags:["startup","saas","tech"]},{id:"bold-clarity",name:"Bold Clarity",description:"Strong impact headlines with clean readability",headingFont:"Montserrat",headingWeight:"800",bodyFont:"Open Sans",bodyWeight:"400",tags:["marketing","landing","bold"]},{id:"designers-choice",name:"Designer's Choice",description:"Matching DM family — perfectly harmonious",headingFont:"DM Serif Display",headingWeight:"400",bodyFont:"DM Sans",bodyWeight:"400",tags:["design","portfolio","harmonious"]},{id:"creative-studio",name:"Creative Studio",description:"Experimental geometry meets friendly warmth",headingFont:"Syne",headingWeight:"800",bodyFont:"Nunito",bodyWeight:"400",tags:["agency","creative","modern"]},{id:"luxury-brand",name:"Luxury Brand",description:"Whisper-thin elegance for high-end positioning",headingFont:"Cormorant Garamond",headingWeight:"600",bodyFont:"Raleway",bodyWeight:"300",tags:["luxury","fashion","premium"]},{id:"street-cred",name:"Street Cred",description:"Maximum impact with clean body copy",headingFont:"Bebas Neue",headingWeight:"400",bodyFont:"Open Sans",bodyWeight:"400",tags:["bold","streetwear","impact"]},{id:"business-pro",name:"Business Pro",description:"Professional and trustworthy for enterprise",headingFont:"Plus Jakarta Sans",headingWeight:"700",bodyFont:"PT Serif",bodyWeight:"400",tags:["business","enterprise","professional"]},{id:"contemporary-classic",name:"Contemporary Classic",description:"Modern sans meets classical elegance",headingFont:"Outfit",headingWeight:"700",bodyFont:"EB Garamond",bodyWeight:"400",tags:["contemporary","magazine","refined"]}],O={"Playfair Display":["Lato","Source Sans 3","DM Sans","Raleway"],"EB Garamond":["Lato","Nunito Sans","Source Sans 3","Inter"],"Cormorant Garamond":["Source Sans 3","Raleway","Lato"],Cormorant:["Source Sans 3","Raleway","DM Sans","Lato"],Lora:["Merriweather","Source Serif 4","Inter","Work Sans"],Merriweather:["Open Sans","Source Sans 3","Lato","Nunito"],"Libre Baskerville":["Lato","Source Sans 3","Open Sans","Raleway"],"DM Serif Display":["DM Sans","Inter","Lato","Source Sans 3"],Fraunces:["Mulish","Nunito","DM Sans","Inter"],Spectral:["Roboto","Source Sans 3","Open Sans","Karla"],"Bodoni Moda":["Raleway","Lato","DM Sans","Source Sans 3"],Gloock:["Inter","DM Sans","Manrope","Nunito Sans"],Newsreader:["Source Sans 3","Nunito Sans","Inter","Lato"],"Frank Ruhl Libre":["Raleway","Nunito","Lato","Open Sans"],"Instrument Serif":["Instrument Sans","Inter","DM Sans","Manrope"],"Crimson Text":["Source Sans 3","Raleway","Open Sans","Lato"],Inter:["Lora","Merriweather","Source Serif 4","EB Garamond"],Montserrat:["Merriweather","Lora","Source Serif 4","Open Sans"],Raleway:["Merriweather","Lora","Libre Baskerville","Open Sans"],"Space Grotesk":["Inter","Lora","DM Sans","Source Serif 4"],Syne:["DM Sans","Inter","Manrope","Lora"],Outfit:["Inter","Nunito","Lora","DM Sans"],"DM Sans":["DM Serif Display","Lora","Spectral","Inter"],"Plus Jakarta Sans":["Lora","Source Serif 4","Merriweather","Inter"],Poppins:["Lato","Open Sans","Source Sans 3","Nunito"],Manrope:["Lora","Source Serif 4","Inter","Nunito Sans"],Urbanist:["Lora","Merriweather","Inter","DM Sans"],"Bricolage Grotesque":["Inter","DM Sans","Lora","Source Serif 4"],"Instrument Sans":["Instrument Serif","Lora","EB Garamond","Inter"],"Hanken Grotesk":["Lora","Source Serif 4","Inter","Nunito"],Archivo:["Lora","Merriweather","Inter","Source Serif 4"],Lexend:["Lora","Merriweather","Inter","Open Sans"],"Bebas Neue":["Lato","Raleway","Open Sans","Montserrat"],Oswald:["Merriweather","Lato","EB Garamond","Source Sans 3"],Unbounded:["Inter","DM Sans","Manrope","Nunito Sans"],"Big Shoulders Display":["Inter","Lato","Source Sans 3","Raleway"],"Dela Gothic One":["Inter","DM Sans","Manrope","Lato"],"Yeseva One":["Josefin Sans","Raleway","Lato","Source Sans 3"],Anton:["Lato","Open Sans","Source Sans 3","Raleway"],"JetBrains Mono":["Inter","Lato","DM Sans","Source Sans 3"],"Fira Code":["Fira Sans","Source Sans 3","Inter","Lato"],"Space Mono":["Space Grotesk","Inter","DM Sans","Lato"]};function M(s){return O[s]??[]}const E={100:"Thin",200:"ExtraLight",300:"Light",400:"Regular",500:"Medium",600:"SemiBold",700:"Bold",800:"ExtraBold",900:"Black"};function z(){const s={};for(const e of f)s[e.id]={font:e.defaultFont,weight:e.defaultWeight,fontSize:e.defaultFontSize,lineHeight:e.defaultLineHeight,tracking:e.defaultTracking};return s}class R{constructor(){v(this,"root");v(this,"s",{open:!1,tab:"fonts",activeGroupIds:["h1"],elementStyles:z(),searchQuery:"",category:"all",inspecting:!1});this.restoreSession(),this.injectStyles(),this.root=document.createElement("div"),this.root.id="fontara-dock",document.body.appendChild(this.root),this.render(),this.preloadAllFonts()}injectStyles(){if(document.getElementById("fontara-styles"))return;const e=document.createElement("style");e.id="fontara-styles",e.textContent=p,document.head.appendChild(e)}restoreSession(){try{const e=localStorage.getItem("fontara_session_v3");if(!e)return;const t=JSON.parse(e);t.elementStyles&&(this.s.elementStyles=t.elementStyles)}catch{}}saveSession(){try{localStorage.setItem("fontara_session_v3",JSON.stringify({elementStyles:this.s.elementStyles}))}catch{}}preloadAllFonts(){const e=new Set;for(const t of Object.values(this.s.elementStyles))e.add(t.font);for(const t of e){const i=u(t);i&&L(t,i.weights)}}applyStyles(){H(this.s.elementStyles)}render(){this.root.innerHTML=`
      <div id="fontara-panel" class="${this.s.open?"":"hidden"}">
        ${this.renderHeader()}
        ${this.renderTabs()}
        <div class="fn-scroll">
          ${this.s.tab==="fonts"?this.renderFontsTab():""}
          ${this.s.tab==="settings"?this.renderSettingsTab():""}
          ${this.s.tab==="presets"?this.renderPresetsTab():""}
        </div>
        ${this.s.tab==="fonts"?this.renderActiveBar():""}
        ${this.renderActions()}
      </div>
      <button id="fontara-trigger" title="Fontara">Ff</button>
    `,this.attachListeners()}renderHeader(){return`
      <div class="fn-header">
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="fn-title">Fontara</span>
          <span class="fn-badge">FREE</span>
        </div>
        <button class="fn-close" id="fn-close">✕</button>
      </div>
    `}renderTabs(){return`
      <div class="fn-tabs">
        ${[["fonts","Fonts"],["settings","Settings"],["presets","Presets"]].map(([t,i])=>`<button class="fn-tab ${this.s.tab===t?"active":""}" data-tab="${t}">${i}</button>`).join("")}
      </div>
    `}renderFontsTab(){const e=this.s.activeGroupIds[0]??"h1",t=f.find(o=>o.id===e),i=this.s.elementStyles[e]?.font??t.defaultFont,a=this.s.elementStyles[e]?.weight??t.defaultWeight,n=M(i),r=I(this.s.searchQuery,this.s.category),g=u(i),c=this.s.activeGroupIds.length>1;return`
      <!-- Element group chips -->
      <div class="fn-section" style="padding-bottom:8px;">
        <div class="fn-label">
          Element ${c?`<span style="color:#7c3aed;">(${this.s.activeGroupIds.length} selected)</span>`:""}
          <span style="font-size:9px;color:#9ca3af;font-weight:400;margin-left:4px;">ctrl+click to multi-select</span>
        </div>
        <div class="fn-element-chips">
          ${f.map(o=>`
            <button class="fn-chip ${this.s.activeGroupIds.includes(o.id)?"active":""}"
              data-group="${o.id}"
              title="${this.s.elementStyles[o.id]?.font??o.defaultFont}">
              ${o.label}
            </button>
          `).join("")}
        </div>
        <div class="fn-current-element">
          ${c?`Editing <strong>${this.s.activeGroupIds.map(o=>f.find(l=>l.id===o)?.label).join(", ")}</strong> simultaneously`:`Editing <strong>${t.label}</strong>:
               <span style="font-family:'${this.esc(i)}',system-ui;font-weight:${a};">
                 ${i} ${a}
               </span>`}
        </div>
      </div>

      <!-- Search + category -->
      <div class="fn-section" style="padding-top:0;">
        <input class="fn-search" id="fn-search"
          placeholder="Search ${b.length} fonts…"
          value="${this.esc(this.s.searchQuery)}"
          autocomplete="off" spellcheck="false" />
        <div class="fn-cats">
          ${A.map(o=>`
            <button class="fn-cat ${this.s.category===o.id?"active":""}" data-cat="${o.id}">${o.label}</button>
          `).join("")}
        </div>

        <!-- Font list -->
        <div class="fn-font-list" id="fn-font-list">
          ${this.renderFontItems(r,i)}
        </div>
      </div>

      <!-- Weight picker -->
      ${g&&g.weights.length>1?`
        <div class="fn-section" style="padding-top:0;">
          <div class="fn-label">Weight</div>
          <div class="fn-weights">
            ${g.weights.map(o=>`
              <button class="fn-weight-btn ${o===a?"active":""}"
                data-weight="${o}" style="font-weight:${o};">
                ${E[o]??o}
              </button>
            `).join("")}
          </div>
        </div>
      `:""}

      <!-- Suggestions (body group only) -->
      ${n.length>0&&!t.isHeading?`
        <div class="fn-section" style="padding-top:0;">
          <div class="fn-label">Pairs with ${this.esc(this.s.elementStyles.h1?.font??"heading")}</div>
          <div class="fn-suggestions">
            ${n.map(o=>`
              <button class="fn-suggestion ${i===o?"active":""}" data-suggest="${this.esc(o)}">${o}</button>
            `).join("")}
          </div>
        </div>
      `:""}
    `}renderFontItems(e,t){return e.length===0?`<p class="fn-empty">No fonts match "${this.esc(this.s.searchQuery)}"</p>`:e.slice(0,100).map(i=>`
      <div class="fn-font-item ${i.family===t?"selected":""}"
        data-font="${this.esc(i.family)}"
        style="font-family:'${this.esc(i.family)}',system-ui">
        ${i.family}
      </div>
    `).join("")}renderSettingsTab(){const e=this.s.activeGroupIds[0]??"h1",t=this.s.elementStyles[e],i=f.find(n=>n.id===e),a=this.s.activeGroupIds.length>1;return`
      <div class="fn-section">
        <div class="fn-label" style="margin-bottom:10px;">
          Settings for
          <strong style="color:#374151;">
            ${a?this.s.activeGroupIds.map(n=>f.find(r=>r.id===n)?.label).join(", "):i.label}
          </strong>
          ${a?'<span style="color:#7c3aed;font-size:9px;"> — applied to all selected</span>':""}
        </div>

        <div class="fn-setting-row">
          <div class="fn-setting-label">
            <span>Font size</span>
            <span class="fn-val" id="fn-val-size">${t.fontSize}px</span>
          </div>
          <input type="range" class="fn-slider" id="fn-font-size"
            min="8" max="200" step="1" value="${t.fontSize}" />
        </div>

        <div class="fn-setting-row">
          <div class="fn-setting-label">
            <span>Line height</span>
            <span class="fn-val" id="fn-val-lh">${t.lineHeight}</span>
          </div>
          <input type="range" class="fn-slider" id="fn-line-height"
            min="0.9" max="2.5" step="0.05" value="${t.lineHeight}" />
        </div>

        <div class="fn-setting-row">
          <div class="fn-setting-label">
            <span>Letter spacing</span>
            <span class="fn-val" id="fn-val-track">${(t.tracking*1e3).toFixed(0)}‰</span>
          </div>
          <input type="range" class="fn-slider" id="fn-tracking"
            min="-100" max="200" step="5" value="${t.tracking*1e3}" />
        </div>

        <!-- Live preview -->
        <div class="fn-scale-preview" style="margin-top:12px;">
          <div class="fn-label">Preview</div>
          <div style="
            font-family:'${this.esc(t.font)}',system-ui;
            font-weight:${t.weight};
            font-size:${Math.min(t.fontSize,36)}px;
            line-height:${t.lineHeight};
            letter-spacing:${t.tracking}em;
            color:#111827; padding:8px 0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
            The quick brown fox
          </div>
          <div style="font-size:10px;color:#9ca3af;">
            ${t.font} · ${t.weight} · ${t.fontSize}px · lh ${t.lineHeight} · ls ${(t.tracking*1e3).toFixed(0)}‰
          </div>
        </div>

        <button class="fn-btn-reset-settings" id="fn-reset-settings" style="margin-top:12px;">
          Reset ${i.label} to defaults
        </button>
      </div>
    `}renderPresetsTab(){return`
      <div class="fn-presets-list" id="fn-presets-list">
        ${F.map(e=>`
          <button class="fn-preset-card" data-preset-id="${e.id}">
            <div class="fn-preset-heading"
              style="font-family:'${this.esc(e.headingFont)}',serif;font-weight:${e.headingWeight};">
              ${e.headingFont}
            </div>
            <div class="fn-preset-body"
              style="font-family:'${this.esc(e.bodyFont)}',sans-serif;">
              ${e.bodyFont} — ${e.description}
            </div>
            <div class="fn-preset-tags">
              ${e.tags.map(t=>`<span class="fn-tag">${t}</span>`).join("")}
            </div>
          </button>
        `).join("")}
      </div>
    `}renderActiveBar(){const e=this.s.elementStyles.h1,t=this.s.elementStyles.body;return`
      <div class="fn-active-bar">
        <div class="fn-active-item">
          <span class="fn-active-label">H</span>
          <span class="fn-active-font"
            style="font-family:'${this.esc(e.font)}',serif;font-weight:${e.weight};">
            ${e.font}
          </span>
        </div>
        <span class="fn-active-sep">+</span>
        <div class="fn-active-item">
          <span class="fn-active-label">B</span>
          <span class="fn-active-font"
            style="font-family:'${this.esc(t.font)}',sans-serif;">
            ${t.font}
          </span>
        </div>
      </div>
    `}renderActions(){return`
      <div class="fn-actions">
        <button class="fn-btn fn-btn-pick ${this.s.inspecting?"active":""}" id="fn-pick-element"
          title="${this.s.inspecting?"Cancel — click any element":"Click an element on the page to select it"}">
          ${this.s.inspecting?"✕":"⊕"} Pick
        </button>
        <button class="fn-btn" id="fn-reset">Reset</button>
        <button class="fn-btn fn-btn-primary" id="fn-export">Export</button>
      </div>
    `}attachListeners(){this.q("#fontara-trigger")?.addEventListener("click",()=>this.togglePanel()),this.q("#fn-close")?.addEventListener("click",()=>this.togglePanel()),this.q("#fn-reset")?.addEventListener("click",()=>{q(),this.s.elementStyles=z();try{localStorage.removeItem("fontara_session_v3")}catch{}this.rerender()}),this.q("#fn-export")?.addEventListener("click",()=>this.handleExport()),this.q("#fn-pick-element")?.addEventListener("click",()=>this.toggleInspect()),this.root.querySelectorAll(".fn-tab").forEach(t=>t.addEventListener("click",()=>{this.s.tab=t.dataset.tab,this.rerender()})),this.root.querySelectorAll(".fn-chip[data-group]").forEach(t=>t.addEventListener("click",i=>{const a=t.dataset.group;i.ctrlKey||i.metaKey?this.s.activeGroupIds.includes(a)?(this.s.activeGroupIds=this.s.activeGroupIds.filter(n=>n!==a),this.s.activeGroupIds.length===0&&(this.s.activeGroupIds=[a])):this.s.activeGroupIds=[...this.s.activeGroupIds,a]:this.s.activeGroupIds=[a],this.rerender()}));const e=this.q("#fn-search");e?.addEventListener("input",()=>{this.s.searchQuery=e.value,this.lightUpdateFontList()}),this.root.querySelectorAll(".fn-cat").forEach(t=>t.addEventListener("click",()=>{this.s.category=t.dataset.cat,this.lightUpdateFontList()})),this.attachFontItemListeners(),this.root.querySelectorAll(".fn-weight-btn").forEach(t=>t.addEventListener("click",()=>{const i=t.dataset.weight;for(const a of this.s.activeGroupIds)this.s.elementStyles[a].weight=i;this.applyStyles(),this.saveSession(),this.rerender()})),this.root.querySelectorAll(".fn-suggestion").forEach(t=>t.addEventListener("click",()=>this.selectFont(t.dataset.suggest))),this.root.querySelectorAll(".fn-preset-card").forEach(t=>t.addEventListener("click",()=>{const i=F.find(a=>a.id===t.dataset.presetId);if(i){for(const a of f)a.isHeading?(this.s.elementStyles[a.id].font=i.headingFont,this.s.elementStyles[a.id].weight=i.headingWeight):a.id==="body"&&(this.s.elementStyles[a.id].font=i.bodyFont,this.s.elementStyles[a.id].weight=i.bodyWeight);this.preloadAllFonts(),this.applyStyles(),this.saveSession(),this.rerender()}})),this.attachSettingsListeners(),this.q("#fn-reset-settings")?.addEventListener("click",()=>{for(const t of this.s.activeGroupIds){const i=f.find(a=>a.id===t);this.s.elementStyles[t]={font:i.defaultFont,weight:i.defaultWeight,fontSize:i.defaultFontSize,lineHeight:i.defaultLineHeight,tracking:i.defaultTracking}}this.applyStyles(),this.saveSession(),this.rerender()})}attachFontItemListeners(){this.root.querySelectorAll(".fn-font-item").forEach(e=>e.addEventListener("click",()=>this.selectFont(e.dataset.font)))}attachSettingsListeners(){const e=(t,i,a,n,r)=>{const g=this.q(`#${t}`);g&&g.addEventListener("input",()=>{const c=parseFloat(g.value)*a;for(const l of this.s.activeGroupIds)this.s.elementStyles[l][n]=c;const o=this.q(`#${i}`);o&&(o.textContent=r(c)),this.applyStyles(),this.saveSession(),this.updateSettingsPreview()})};e("fn-font-size","fn-val-size",1,"fontSize",t=>`${t}px`),e("fn-line-height","fn-val-lh",1,"lineHeight",t=>`${t.toFixed(2)}`),e("fn-tracking","fn-val-track",.001,"tracking",t=>`${(t*1e3).toFixed(0)}‰`)}selectFont(e){const t=u(e);if(t){for(const i of this.s.activeGroupIds){const n=f.find(r=>r.id===i)?.isHeading??!1?t.weights.includes("700")?"700":t.weights[t.weights.length-1]:t.weights.includes("400")?"400":t.weights[0];this.s.elementStyles[i].font=e,this.s.elementStyles[i].weight=n}L(e,t.weights),this.applyStyles(),this.saveSession(),this.lightUpdateAfterFontSelect(e)}}lightUpdateAfterFontSelect(e){const t=this.s.activeGroupIds[0]??"h1",i=this.s.elementStyles[t].weight;this.root.querySelectorAll(".fn-font-item").forEach(c=>{c.classList.toggle("selected",c.dataset.font===e)});const a=this.q(".fn-current-element");if(a&&this.s.activeGroupIds.length===1){const c=f.find(o=>o.id===t);a.innerHTML=`Editing <strong>${c.label}</strong>:
        <span style="font-family:'${this.esc(e)}',system-ui;font-weight:${i};">
          ${e} ${i}
        </span>`}const n=this.q(".fn-active-bar");n&&(n.outerHTML=this.renderActiveBar());const r=this.root.querySelector(".fn-weights")?.closest(".fn-section");if(r){const c=u(e);if(c&&c.weights.length>1){const o=r.querySelector(".fn-weights");o&&(o.innerHTML=c.weights.map(l=>`
            <button class="fn-weight-btn ${l===i?"active":""}"
              data-weight="${l}" style="font-weight:${l};">
              ${E[l]??l}
            </button>
          `).join(""),o.querySelectorAll(".fn-weight-btn").forEach(l=>l.addEventListener("click",()=>{for(const N of this.s.activeGroupIds)this.s.elementStyles[N].weight=l.dataset.weight;this.applyStyles(),this.saveSession(),this.rerender()})))}}const g=this.root.querySelector(".fn-suggestions")?.closest(".fn-section");if(g){const c=g.querySelector(".fn-suggestions");if(c){const o=M(e);c.innerHTML=o.map(l=>`
          <button class="fn-suggestion ${e===l?"active":""}" data-suggest="${this.esc(l)}">${l}</button>
        `).join(""),c.querySelectorAll(".fn-suggestion").forEach(l=>l.addEventListener("click",()=>this.selectFont(l.dataset.suggest)))}}}togglePanel(){this.s.open=!this.s.open,this.q("#fontara-panel")?.classList.toggle("hidden",!this.s.open),this.q("#fontara-trigger")?.classList.toggle("active",this.s.open)}toggleInspect(){C()?(y(),this.s.inspecting=!1,this.rerender()):(this.s.inspecting=!0,this.rerender(),T(e=>{const t=D(e);this.s.activeGroupIds=[t],this.s.inspecting=!1,this.s.open=!0,this.s.tab="fonts",B(),this.rerender()}))}async handleExport(){const e=W(this.s.elementStyles);await P(e);const t=this.q("#fn-export");if(t){const i=t.textContent;t.textContent="Copied!",t.classList.add("fn-btn-success"),setTimeout(()=>{t.textContent=i,t.classList.remove("fn-btn-success")},2e3)}}lightUpdateFontList(){const e=this.q("#fn-font-list")?.scrollTop??0,t=this.s.activeGroupIds[0]??"h1",i=this.s.elementStyles[t]?.font??"",a=I(this.s.searchQuery,this.s.category),n=this.q("#fn-font-list");n&&(n.innerHTML=this.renderFontItems(a,i),this.attachFontItemListeners(),requestAnimationFrame(()=>{n.scrollTop=e})),this.root.querySelectorAll(".fn-cat").forEach(r=>r.classList.toggle("active",r.dataset.cat===this.s.category))}updateSettingsPreview(){const e=this.s.activeGroupIds[0]??"h1",t=this.s.elementStyles[e],i=this.q(".fn-scale-preview");if(!i)return;const a=i.querySelector("div:first-child + div");a&&(a.style.fontFamily=`'${t.font}', system-ui`,a.style.fontWeight=t.weight,a.style.fontSize=`${Math.min(t.fontSize,36)}px`,a.style.lineHeight=`${t.lineHeight}`,a.style.letterSpacing=`${t.tracking}em`)}q(e){return this.root.querySelector(e)}esc(e){return e.replace(/['"<>&]/g,t=>({"'":"&#39;",'"':"&quot;","<":"&lt;",">":"&gt;","&":"&amp;"})[t]??t)}rerender(){const e=this.s.open,t=this.q("#fn-font-list")?.scrollTop??0;this.render(),e&&(this.q("#fontara-panel")?.classList.remove("hidden"),this.q("#fontara-trigger")?.classList.add("active"),this.s.open=!0),t>0&&requestAnimationFrame(()=>{const i=this.q("#fn-font-list");i&&(i.scrollTop=t)})}}function G(){document.getElementById("fontara-dock")||new R}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",G):G()})();
