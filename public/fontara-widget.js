var xe=Object.defineProperty;var we=(x,v,w)=>v in x?xe(x,v,{enumerable:!0,configurable:!0,writable:!0,value:w}):x[v]=w;var O=(x,v,w)=>we(x,typeof v!="symbol"?v+"":v,w);(function(){"use strict";const x=`
  /* ── CSS custom properties (light theme) ─────────────────────── */
  #fontara-dock {
    --fn-bg: #ffffff;
    --fn-border: #e5e7eb;
    --fn-border-light: #f3f4f6;
    --fn-text: #111827;
    --fn-text-secondary: #374151;
    --fn-text-muted: #6b7280;
    --fn-text-faint: #9ca3af;
    --fn-surface: #f9fafb;
    --fn-surface-hover: #fafafa;
    --fn-accent: #7c3aed;
    --fn-accent-dark: #6d28d9;
    --fn-accent-light: #ede9fe;
    --fn-accent-mid: #c4b5fd;
    --fn-accent-soft: #f5f3ff;
    --fn-success: #059669;
    --fn-danger: #dc2626;
    --fn-danger-light: #fee2e2;
    --fn-danger-mid: #fca5a5;
    --fn-scrollbar: #e5e7eb;
  }

  /* ── Dark theme overrides ─────────────────────────────────────── */
  #fontara-dock.dark {
    --fn-bg: #1e1e2e;
    --fn-border: #313149;
    --fn-border-light: #2a2a40;
    --fn-text: #f1f5f9;
    --fn-text-secondary: #cbd5e1;
    --fn-text-muted: #94a3b8;
    --fn-text-faint: #64748b;
    --fn-surface: #2a2a40;
    --fn-surface-hover: #252535;
    --fn-accent: #a78bfa;
    --fn-accent-dark: #7c3aed;
    --fn-accent-light: #312e56;
    --fn-accent-mid: #7c6fa0;
    --fn-accent-soft: #2d2b4a;
    --fn-success: #34d399;
    --fn-danger: #f87171;
    --fn-danger-light: #3b1f1f;
    --fn-danger-mid: #7f1d1d;
    --fn-scrollbar: #313149;
  }

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
    width: 48px;
    height: 48px;
  }

  #fontara-trigger {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: #7c3aed;
    border: none;
    cursor: grab;
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
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    position: relative;
    z-index: 1;
  }
  #fontara-trigger:hover { transform: scale(1.06); box-shadow: 0 6px 28px rgba(124,58,237,0.55); }
  #fontara-trigger.active { background: #5b21b6; }
  #fontara-trigger.dragging { cursor: grabbing; transform: scale(1.08); }

  /* ── Panel shell ─────────────────────────────────────────────── */
  #fontara-panel {
    position: absolute;
    right: 0;
    width: 310px;
    background: var(--fn-bg);
    border: 1px solid var(--fn-border);
    border-radius: 20px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  /* Panel opens upward (default — dock near bottom) */
  #fontara-panel.fn-panel-above { bottom: 60px; top: auto; }
  /* Panel opens downward (dock near top) */
  #fontara-panel.fn-panel-below { top: 60px; bottom: auto; }
  #fontara-panel.hidden { display: none; }

  /* ── Header ──────────────────────────────────────────────────── */
  .fn-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px 10px;
    border-bottom: 1px solid var(--fn-border-light);
    flex-shrink: 0;
  }
  .fn-title { font-size: 13px; font-weight: 700; color: var(--fn-text); }
  .fn-badge {
    font-size: 9px; font-weight: 700; background: var(--fn-accent-light); color: var(--fn-accent);
    padding: 2px 6px; border-radius: 20px; letter-spacing: 0.06em; text-transform: uppercase;
  }
  .fn-badge-pro { background: #fef3c7; color: #d97706; }
  .fn-close {
    background: none; border: none; cursor: pointer; color: var(--fn-text-faint);
    font-size: 15px; padding: 3px 5px; border-radius: 6px; transition: color 0.1s, background 0.1s;
  }
  .fn-close:hover { color: var(--fn-text-secondary); background: var(--fn-border-light); }
  .fn-header-btn {
    background: none; border: none; cursor: pointer; color: var(--fn-text-faint);
    font-size: 14px; padding: 3px 5px; border-radius: 6px; transition: color 0.1s, background 0.1s;
  }
  .fn-header-btn:hover { color: var(--fn-accent); background: var(--fn-accent-light); }
  .fn-activate-link {
    font-size: 10px; color: var(--fn-accent); cursor: pointer; background: none; border: none;
    padding: 2px 5px; border-radius: 4px; font-weight: 600; transition: background 0.1s;
  }
  .fn-activate-link:hover { background: var(--fn-accent-light); }

  /* ── Tabs ────────────────────────────────────────────────────── */
  .fn-tabs {
    display: flex;
    border-bottom: 1px solid var(--fn-border-light);
    flex-shrink: 0;
  }
  .fn-tab {
    flex: 1; padding: 9px 0; font-size: 12px; font-weight: 600;
    background: none; border: none; cursor: pointer;
    color: var(--fn-text-faint); transition: color 0.15s;
    font-family: inherit; border-bottom: 2px solid transparent;
    margin-bottom: -1px;
  }
  .fn-tab.active { color: var(--fn-accent); border-bottom-color: var(--fn-accent); }
  .fn-tab:hover:not(.active) { color: var(--fn-text-muted); }

  /* ── Scrollable body ─────────────────────────────────────────── */
  .fn-scroll {
    overflow-y: auto;
    flex: 1;
    scrollbar-width: thin;
    scrollbar-color: var(--fn-scrollbar) transparent;
  }

  /* ── Section ─────────────────────────────────────────────────── */
  .fn-section { padding: 10px 14px; }
  .fn-label {
    font-size: 10px; font-weight: 700; color: var(--fn-text-faint);
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
    background: var(--fn-surface); border: 1.5px solid var(--fn-border); border-radius: 10px;
    padding: 8px 10px; cursor: pointer; text-align: left;
    transition: border-color 0.15s, background 0.15s;
    font-family: inherit;
  }
  .fn-slot-tab.active { border-color: var(--fn-accent); background: var(--fn-accent-soft); }
  .fn-slot-tab:hover:not(.active) { border-color: var(--fn-accent-mid); }
  .fn-slot-label {
    display: block; font-size: 9px; font-weight: 700; color: var(--fn-text-faint);
    text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px;
  }
  .fn-slot-tab.active .fn-slot-label { color: var(--fn-accent); }
  .fn-slot-font {
    display: block; font-size: 12px; font-weight: 600; color: var(--fn-text);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* ── Search ──────────────────────────────────────────────────── */
  .fn-search {
    width: 100%; border: 1.5px solid var(--fn-border); border-radius: 10px;
    padding: 7px 10px; font-size: 13px; outline: none;
    box-sizing: border-box; transition: border-color 0.15s;
    color: var(--fn-text); background: var(--fn-surface-hover); font-family: inherit;
    margin-bottom: 8px;
  }
  .fn-search:focus { border-color: var(--fn-accent); background: var(--fn-bg); }

  /* ── Category pills ──────────────────────────────────────────── */
  .fn-cats {
    display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px;
  }
  .fn-cat {
    font-size: 11px; font-weight: 500; padding: 3px 9px;
    border-radius: 20px; border: 1.5px solid var(--fn-border);
    background: var(--fn-bg); color: var(--fn-text-muted); cursor: pointer;
    transition: all 0.1s; font-family: inherit;
  }
  .fn-cat:hover { border-color: var(--fn-accent-mid); color: var(--fn-accent); }
  .fn-cat.active { background: var(--fn-accent); border-color: var(--fn-accent); color: white; }

  /* ── Font list ───────────────────────────────────────────────── */
  .fn-font-list {
    max-height: 150px; overflow-y: auto;
    scrollbar-width: thin; scrollbar-color: var(--fn-scrollbar) transparent;
    border: 1.5px solid var(--fn-border);
    border-radius: 10px;
    background: var(--fn-accent-light);
  }
  .fn-font-item {
    padding: 5px 8px; border-radius: 8px; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between;
    transition: background 0.1s; gap: 6px;
  }
  .fn-font-item:hover { background: var(--fn-accent-soft); }
  .fn-font-item.selected { background: var(--fn-accent-light); }
  .fn-font-name {
    font-size: 13px; color: var(--fn-text-secondary);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;
  }
  .fn-font-item:hover .fn-font-name { color: var(--fn-accent-dark); }
  .fn-font-item.selected .fn-font-name { color: var(--fn-accent); font-weight: 600; }
  .fn-font-preview {
    font-size: 16px; color: var(--fn-text-muted); flex-shrink: 0;
    line-height: 1; letter-spacing: 0 !important;
  }
  .fn-font-item:hover .fn-font-preview { color: var(--fn-accent-dark); }
  .fn-font-item.selected .fn-font-preview { color: var(--fn-accent); }
  .fn-empty { font-size: 12px; color: var(--fn-text-faint); padding: 8px; margin: 0; }

  /* ── Weight selector ─────────────────────────────────────────── */
  .fn-weights {
    display: flex; flex-wrap: wrap; gap: 4px;
  }
  .fn-weight-btn {
    font-size: 11px; padding: 3px 9px; border-radius: 8px;
    border: 1.5px solid var(--fn-border); background: var(--fn-bg); cursor: pointer;
    color: var(--fn-text-secondary); transition: all 0.1s; font-family: inherit;
  }
  .fn-weight-btn:hover { border-color: var(--fn-accent-mid); color: var(--fn-accent); }
  .fn-weight-btn.active { background: var(--fn-accent); border-color: var(--fn-accent); color: white; }

  /* ── Suggestions ─────────────────────────────────────────────── */
  .fn-suggestions {
    display: flex; flex-wrap: wrap; gap: 4px;
  }
  .fn-suggestion {
    font-size: 11px; padding: 3px 9px; border-radius: 8px;
    border: 1.5px solid var(--fn-border); background: var(--fn-bg); cursor: pointer;
    color: var(--fn-text-secondary); transition: all 0.1s; font-family: inherit;
  }
  .fn-suggestion:hover { border-color: var(--fn-accent-mid); color: var(--fn-accent); }
  .fn-suggestion.active { background: var(--fn-accent-light); border-color: var(--fn-accent); color: var(--fn-accent); font-weight: 600; }

  /* ── Active bar (current pairing) ────────────────────────────── */
  .fn-active-bar {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 14px; background: var(--fn-surface-hover);
    border-top: 1px solid var(--fn-border-light); border-bottom: 1px solid var(--fn-border-light);
    flex-shrink: 0;
  }
  .fn-active-item { display: flex; align-items: center; gap: 5px; min-width: 0; flex: 1; }
  .fn-active-label {
    font-size: 9px; font-weight: 700; color: var(--fn-text-faint);
    text-transform: uppercase; flex-shrink: 0;
  }
  .fn-active-font {
    font-size: 12px; color: var(--fn-text); white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }
  .fn-active-sep { font-size: 11px; color: var(--fn-border); flex-shrink: 0; }

  /* ── Presets ─────────────────────────────────────────────────── */
  .fn-presets-list {
    overflow-y: auto; flex: 1;
    scrollbar-width: thin; scrollbar-color: var(--fn-scrollbar) transparent;
    padding: 8px;
    display: flex; flex-direction: column; gap: 6px;
  }
  .fn-preset-card {
    width: 100%; text-align: left; background: var(--fn-bg);
    border: 1.5px solid var(--fn-border); border-radius: 12px; padding: 12px;
    cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s;
    font-family: inherit;
  }
  .fn-preset-card:hover { border-color: var(--fn-accent-mid); box-shadow: 0 2px 12px rgba(124,58,237,0.1); }
  .fn-preset-heading { font-size: 16px; color: var(--fn-text); margin-bottom: 3px; line-height: 1.2; }
  .fn-preset-body { font-size: 11px; color: var(--fn-text-muted); margin-bottom: 6px; line-height: 1.4; }
  .fn-preset-tags { display: flex; flex-wrap: wrap; gap: 3px; }
  .fn-tag {
    font-size: 9px; font-weight: 600; padding: 2px 6px; border-radius: 20px;
    background: var(--fn-border-light); color: var(--fn-text-faint); text-transform: uppercase; letter-spacing: 0.04em;
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
    border: 1.5px solid var(--fn-border); font-size: 12px; font-weight: 500;
    cursor: pointer; transition: background 0.1s, border-color 0.1s;
    background: var(--fn-bg); color: var(--fn-text-secondary); font-family: inherit;
  }
  .fn-btn:hover { background: var(--fn-surface); border-color: var(--fn-text-faint); }
  .fn-btn-primary { background: var(--fn-accent); color: white; border-color: var(--fn-accent); font-weight: 600; }
  .fn-btn-primary:hover { background: var(--fn-accent-dark); border-color: var(--fn-accent-dark); }
  .fn-btn-success { background: var(--fn-success) !important; border-color: var(--fn-success) !important; color: white !important; }
  .fn-btn-danger { background: var(--fn-danger-light); border-color: var(--fn-danger-mid); color: var(--fn-danger); }

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
  .fn-activation-footer { font-size: 12px; color: #9ca3af; text-align: center; margin: 24px 0 0; }
  .fn-activation-footer a { color: #7c3aed; text-decoration: none; }
  .fn-activation-footer a:hover { text-decoration: underline; }

  /* ── Element group chips ─────────────────────────────────────── */
  .fn-element-chips {
    display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 6px;
  }
  .fn-chip {
    font-size: 11px; font-weight: 600; padding: 3px 9px;
    border-radius: 8px; border: 1.5px solid var(--fn-border);
    background: var(--fn-bg); color: var(--fn-text-secondary); cursor: pointer;
    transition: all 0.1s; font-family: inherit !important;
  }
  .fn-chip:hover { border-color: var(--fn-accent-mid); color: var(--fn-accent); }
  .fn-chip.active { background: var(--fn-accent); border-color: var(--fn-accent); color: white; }
  .fn-chip-pick { border-style: dashed; }
  .fn-chip-pick.active { background: var(--fn-danger); border-color: var(--fn-danger); border-style: solid; }

  .fn-current-element {
    font-size: 11px; color: var(--fn-text-muted); margin-top: 2px;
  }
  .fn-current-element strong { color: var(--fn-text-secondary); }

  /* ── Settings controls ───────────────────────────────────────── */
  .fn-setting-row {
    margin-bottom: 12px;
  }
  .fn-setting-label {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 11px; font-weight: 600; color: var(--fn-text-secondary);
    margin-bottom: 5px;
  }
  .fn-val {
    font-size: 11px; font-weight: 500; color: var(--fn-accent);
    background: var(--fn-accent-light); padding: 1px 6px; border-radius: 4px;
  }
  .fn-slider {
    -webkit-appearance: none; appearance: none;
    width: 100%; height: 16px; background: transparent;
    cursor: pointer; border: none !important; padding: 0; margin: 0; outline: none;
  }
  .fn-slider::-webkit-slider-runnable-track {
    height: 2px; background: var(--fn-border); border-radius: 1px;
  }
  .fn-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px; height: 10px; border-radius: 50%;
    background: var(--fn-accent); margin-top: -4px;
    box-shadow: 0 1px 4px rgba(124,58,237,0.35);
    transition: transform 0.1s;
  }
  .fn-slider:hover::-webkit-slider-thumb { transform: scale(1.25); }
  .fn-slider::-moz-range-track {
    height: 2px; background: var(--fn-border); border-radius: 1px; border: none;
  }
  .fn-slider::-moz-range-thumb {
    width: 10px; height: 10px; border-radius: 50%;
    background: var(--fn-accent); border: none;
    box-shadow: 0 1px 4px rgba(124,58,237,0.35);
  }
  .fn-select {
    width: 100%; border: 1.5px solid var(--fn-border); border-radius: 8px;
    padding: 6px 8px; font-size: 12px; outline: none;
    color: var(--fn-text-secondary); background: var(--fn-surface); cursor: pointer;
    font-family: inherit !important; transition: border-color 0.15s;
  }
  .fn-select:focus { border-color: var(--fn-accent); }

  /* ── Scale preview ───────────────────────────────────────────── */
  .fn-scale-preview {
    border-top: 1px solid var(--fn-border-light); padding-top: 10px; margin-top: 4px;
  }
  .fn-scale-row {
    display: flex; align-items: baseline; gap: 6px; margin-bottom: 4px;
    overflow: hidden;
  }
  .fn-scale-tag {
    font-size: 9px; font-weight: 700; color: var(--fn-text-faint);
    text-transform: uppercase; width: 22px; flex-shrink: 0;
  }
  .fn-scale-text {
    flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    color: var(--fn-text);
  }
  .fn-scale-size {
    font-size: 10px; color: var(--fn-text-faint); flex-shrink: 0;
  }

  /* ── Pick button (inside actions bar) ───────────────────────── */
  .fn-btn-pick { border-style: dashed !important; color: var(--fn-text-muted) !important; }
  .fn-btn-pick:hover { border-color: var(--fn-accent) !important; color: var(--fn-accent) !important; border-style: solid !important; }
  .fn-btn-pick.active { background: var(--fn-danger) !important; border-color: var(--fn-danger) !important; color: white !important; border-style: solid !important; }

  /* ── Reset settings btn ─────────────────────────────────────── */
  .fn-btn-reset-settings {
    width: 100%; margin-top: 8px;
    padding: 7px; border-radius: 10px; border: 1.5px solid var(--fn-border);
    font-size: 12px; font-weight: 500; cursor: pointer;
    background: var(--fn-bg); color: var(--fn-text-muted); font-family: inherit !important;
    transition: background 0.1s, border-color 0.1s;
  }
  .fn-btn-reset-settings:hover { background: var(--fn-danger-light); border-color: var(--fn-danger-mid); color: var(--fn-danger); }

  /* ── Export modal ────────────────────────────────────────────── */
  .fn-export-modal {
    position: absolute;
    bottom: 56px; right: 10px;
    background: var(--fn-bg);
    border: 1.5px solid var(--fn-border);
    border-radius: 14px;
    padding: 8px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    display: flex; flex-direction: column; gap: 4px;
    z-index: 10;
    min-width: 130px;
  }
  .fn-export-opt {
    padding: 7px 12px; border-radius: 9px; border: none; cursor: pointer;
    font-size: 12px; font-weight: 500; text-align: left;
    background: none; color: var(--fn-text-secondary); font-family: inherit;
    transition: background 0.1s, color 0.1s;
  }
  .fn-export-opt:hover { background: var(--fn-accent-soft); color: var(--fn-accent); }
  .fn-export-opt-locked { opacity: 0.55; }
  .fn-export-opt-locked:hover { background: var(--fn-accent-soft); color: var(--fn-text-muted) !important; }
  .fn-export-prefix {
    padding: 6px 12px 8px; border-top: 1px solid var(--fn-border);
    display: flex; align-items: center; gap: 8px; margin-top: 2px;
  }
  .fn-export-prefix label { font-size: 11px; color: var(--fn-text-muted); white-space: nowrap; }
  .fn-export-prefix input {
    flex: 1; font-size: 11px; font-family: 'SF Mono','Fira Code',monospace;
    padding: 3px 7px; border: 1px solid var(--fn-border); border-radius: 6px;
    background: var(--fn-surface); color: var(--fn-text-primary); outline: none;
  }
  .fn-export-prefix input:focus { border-color: var(--fn-accent); }

  /* ── PRO feature gating ─────────────────────────────────────── */
  .fn-pro-inline {
    font-size: 8px; font-weight: 700; background: #fef3c7; color: #d97706;
    padding: 1px 5px; border-radius: 20px; letter-spacing: 0.06em; text-transform: uppercase;
    margin-left: 4px; vertical-align: middle; cursor: pointer;
  }
  .fn-preset-locked { opacity: 0.5; }
  .fn-preset-locked:hover { border-color: var(--fn-border) !important; box-shadow: none !important; cursor: pointer; }
  .fn-preset-lock-badge {
    font-size: 9px; font-weight: 700; color: #d97706; background: #fef3c7;
    padding: 1px 5px; border-radius: 20px; margin-left: 5px;
    letter-spacing: 0.04em; text-transform: uppercase; vertical-align: middle;
  }

  /* ── Shortcuts overlay ───────────────────────────────────────── */
  .fn-shortcuts-overlay {
    position: absolute;
    top: 54px; left: 0; right: 0;
    background: var(--fn-bg);
    border-top: 1px solid var(--fn-border-light);
    border-bottom: 1px solid var(--fn-border-light);
    padding: 12px 14px;
    z-index: 10;
  }
  .fn-shortcuts-title {
    font-size: 10px; font-weight: 700; color: var(--fn-text-faint);
    text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;
  }
  .fn-shortcut-row {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 11px; color: var(--fn-text-muted); margin-bottom: 5px;
  }
  .fn-kbd {
    font-family: 'SF Mono', 'Fira Code', monospace !important;
    font-size: 10px; background: var(--fn-surface); color: var(--fn-text-secondary);
    border: 1px solid var(--fn-border); border-radius: 4px;
    padding: 1px 5px; letter-spacing: 0;
  }
  .fn-shortcuts-close {
    margin-top: 8px; width: 100%; padding: 5px; border-radius: 8px;
    border: 1px solid var(--fn-border); background: none;
    font-size: 11px; color: var(--fn-text-muted); cursor: pointer;
    font-family: inherit;
  }
  .fn-shortcuts-close:hover { background: var(--fn-surface); }

  /* ── Contrast checker ────────────────────────────────────────── */
  .fn-contrast-row {
    display: flex; align-items: center; gap: 8px; margin-bottom: 10px;
  }
  .fn-contrast-swatch {
    width: 28px; height: 28px; border-radius: 6px;
    border: 1.5px solid var(--fn-border); cursor: pointer; flex-shrink: 0;
  }
  .fn-contrast-ratio {
    font-size: 20px; font-weight: 800; color: var(--fn-text);
    line-height: 1;
  }
  .fn-contrast-badges {
    display: flex; gap: 4px; flex-wrap: wrap; margin-top: 6px;
  }
  .fn-contrast-badge {
    font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px;
    letter-spacing: 0.04em;
  }
  .fn-contrast-pass { background: #d1fae5; color: #065f46; }
  .fn-contrast-fail { background: var(--fn-danger-light); color: var(--fn-danger); }
  #fontara-dock.dark .fn-contrast-pass { background: #064e3b; color: #6ee7b7; }

  /* ── Collapsible advanced section ────────────────────────────── */
  .fn-collapsible-header {
    display: flex; align-items: center; justify-content: space-between;
    cursor: pointer; padding: 6px 0; user-select: none;
  }
  .fn-collapsible-header:hover .fn-label { color: var(--fn-accent); }
  .fn-collapsible-arrow {
    font-size: 10px; color: var(--fn-text-faint); transition: transform 0.15s;
  }
  .fn-collapsible-arrow.open { transform: rotate(90deg); }
  .fn-collapsible-body { overflow: hidden; }

  /* ── Tooltip icon ────────────────────────────────────────────── */
  .fn-tip {
    display: inline-flex; align-items: center; justify-content: center;
    width: 13px; height: 13px; border-radius: 50%;
    border: 1px solid var(--fn-text-faint); color: var(--fn-text-faint);
    font-size: 8px; font-weight: 700; cursor: default;
    margin-left: 5px; flex-shrink: 0; position: relative;
    font-style: normal; line-height: 1;
  }
  .fn-tip::after {
    content: attr(data-tip);
    position: absolute; bottom: calc(100% + 7px); left: 50%;
    transform: translateX(-50%);
    background: #1c1c24; color: rgba(255,255,255,0.82);
    font-size: 11px; font-weight: 400; letter-spacing: 0;
    padding: 7px 11px; border-radius: 8px;
    white-space: nowrap; pointer-events: none;
    opacity: 0; transition: opacity 0.15s;
    box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.08);
    z-index: 9999;
  }
  .fn-tip:hover::after { opacity: 1; }

  /* ── Custom selector input ───────────────────────────────────── */
  .fn-selector-input {
    width: 100%; border: 1.5px solid var(--fn-border); border-radius: 8px;
    padding: 6px 8px; font-size: 11px; outline: none; box-sizing: border-box;
    color: var(--fn-text-secondary); background: var(--fn-surface);
    font-family: 'SF Mono', 'Fira Code', monospace !important;
    transition: border-color 0.15s; letter-spacing: 0 !important;
  }
  .fn-selector-input:focus { border-color: var(--fn-accent); }

  /* ── Variable font controls ─────────────────────────────────── */
  .fn-varfont-section {
    margin-top: 4px;
    padding-top: 8px;
    border-top: 1px solid var(--fn-border-light);
  }
  .fn-italic-toggle {
    padding: 4px 10px; border-radius: 7px; border: 1.5px solid var(--fn-border);
    background: var(--fn-bg); color: var(--fn-text-secondary); cursor: pointer;
    font-size: 12px; font-family: inherit; transition: all 0.1s;
    font-style: italic;
  }
  .fn-italic-toggle.active {
    background: var(--fn-accent); border-color: var(--fn-accent); color: white;
  }

  /* ── Undo/redo btns ──────────────────────────────────────────── */
  .fn-btn-sm {
    padding: 5px 8px; border-radius: 8px; border: 1.5px solid var(--fn-border);
    background: var(--fn-bg); color: var(--fn-text-muted); font-size: 12px;
    cursor: pointer; font-family: inherit; transition: all 0.1s;
  }
  .fn-btn-sm:hover { border-color: var(--fn-accent-mid); color: var(--fn-accent); }
  .fn-btn-sm:disabled { opacity: 0.3; cursor: default; pointer-events: none; }

  /* ── Color picker ────────────────────────────────────────────── */
  .fn-color-row {
    display: flex; align-items: center; gap: 6px;
  }
  .fn-color-swatch-box {
    width: 26px; height: 26px; border-radius: 6px;
    border: 1.5px solid var(--fn-border); cursor: pointer; flex-shrink: 0;
    transition: border-color 0.15s, transform 0.1s;
  }
  .fn-color-swatch-box:hover { border-color: var(--fn-accent-mid); transform: scale(1.06); }
  .fn-color-hex {
    flex: 1; border: 1.5px solid var(--fn-border); border-radius: 8px;
    padding: 4px 6px; font-size: 11px; outline: none; min-width: 0;
    color: var(--fn-text); background: var(--fn-surface); font-family: inherit;
    transition: border-color 0.15s;
  }
  .fn-color-hex:focus { border-color: var(--fn-accent); }
  .fn-color-reset {
    background: none; border: 1.5px solid var(--fn-border); border-radius: 7px;
    padding: 2px 7px; font-size: 10px; cursor: pointer; color: var(--fn-text-muted);
    font-family: inherit; transition: all 0.1s; white-space: nowrap;
  }
  .fn-color-reset:hover { border-color: var(--fn-accent-mid); color: var(--fn-accent); }

  /* ── Custom HSV color picker ─────────────────────────────────── */
  .fn-color-picker {
    margin-top: 8px; border-radius: 9px;
    border: 1.5px solid var(--fn-border);
    overflow: hidden; background: var(--fn-surface); padding-bottom: 6px;
  }
  .fn-cpicker-sv {
    position: relative; height: 90px; cursor: crosshair; user-select: none;
  }
  .fn-cpicker-sv-white {
    position: absolute; inset: 0;
    background: linear-gradient(to right, #fff, transparent);
  }
  .fn-cpicker-sv-black {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent, #000);
  }
  .fn-cpicker-sv-thumb {
    position: absolute; width: 12px; height: 12px;
    border: 2px solid #fff; border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 1px rgba(0,0,0,0.35);
    pointer-events: none; z-index: 1;
  }
  .fn-cpicker-hue {
    position: relative; height: 10px; margin: 8px 8px 0;
    border-radius: 5px; cursor: crosshair; user-select: none;
    background: linear-gradient(to right,
      hsl(0,100%,50%), hsl(30,100%,50%), hsl(60,100%,50%), hsl(90,100%,50%),
      hsl(120,100%,50%), hsl(150,100%,50%), hsl(180,100%,50%), hsl(210,100%,50%),
      hsl(240,100%,50%), hsl(270,100%,50%), hsl(300,100%,50%), hsl(330,100%,50%),
      hsl(360,100%,50%));
  }
  .fn-cpicker-hue-thumb {
    position: absolute; top: 50%;
    width: 14px; height: 14px; border-radius: 50%;
    border: 2px solid #fff; transform: translate(-50%, -50%);
    box-shadow: 0 0 0 1px rgba(0,0,0,0.35);
    pointer-events: none;
  }

  /* ── Saved presets (PRO) ─────────────────────────────────────── */
  .fn-saved-section {
    padding: 8px 8px 0;
  }
  .fn-save-preset-row {
    display: flex; gap: 5px; margin-bottom: 8px;
  }
  .fn-save-preset-input {
    flex: 1; border: 1.5px solid var(--fn-border); border-radius: 8px;
    padding: 5px 8px; font-size: 12px; outline: none; min-width: 0;
    color: var(--fn-text); background: var(--fn-surface); font-family: inherit;
    transition: border-color 0.15s;
  }
  .fn-save-preset-input:focus { border-color: var(--fn-accent); }
  .fn-save-preset-btn {
    padding: 5px 10px; border-radius: 8px; border: none; cursor: pointer;
    background: var(--fn-accent); color: white; font-size: 12px; font-weight: 600;
    font-family: inherit; transition: background 0.1s; white-space: nowrap; flex-shrink: 0;
  }
  .fn-save-preset-btn:hover { background: var(--fn-accent-dark); }
  .fn-save-preset-btn:disabled { opacity: 0.5; cursor: default; }
  .fn-saved-preset-card {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 10px; border-radius: 8px;
    border: 1.5px solid var(--fn-border); background: var(--fn-bg);
    margin-bottom: 5px; cursor: pointer; transition: border-color 0.15s;
  }
  .fn-saved-preset-card:hover { border-color: var(--fn-accent-mid); }
  .fn-saved-preset-name {
    font-size: 12px; font-weight: 600; color: var(--fn-text); flex: 1;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .fn-preset-delete-btn {
    background: none; border: none; cursor: pointer; color: var(--fn-text-faint);
    font-size: 11px; padding: 2px 5px; border-radius: 4px; transition: color 0.1s, background 0.1s;
    flex-shrink: 0; line-height: 1;
  }
  .fn-preset-delete-btn:hover { color: var(--fn-danger); background: var(--fn-danger-light); }
  .fn-presets-divider {
    height: 1px; background: var(--fn-border-light); margin: 6px 8px 10px;
  }

  /* ── Text transform buttons ─────────────────────────────────── */
  .fn-tt-btn {
    flex: 1; padding: 5px 0; border-radius: 7px;
    border: 1.5px solid var(--fn-border);
    background: var(--fn-bg); color: var(--fn-text-muted);
    font-size: 11px; font-weight: 600; cursor: pointer;
    font-family: inherit !important; transition: all 0.1s;
    text-align: center;
  }
  .fn-tt-btn:hover { border-color: var(--fn-accent-mid); color: var(--fn-accent); }
  .fn-tt-btn.fn-tt-active { background: var(--fn-accent); border-color: var(--fn-accent); color: white; }

  /* ── Header drag cursor ──────────────────────────────────────── */
  .fn-header { cursor: grab; }
  .fn-header:active { cursor: grabbing; }
  .fn-header button { cursor: pointer; }

  /* ── My Fonts category ───────────────────────────────────────── */
  .fn-cat-custom { border-style: dashed !important; }
  .fn-cat-custom.active { border-style: solid !important; }

  /* ── Drop zone ───────────────────────────────────────────────── */
  .fn-drop-zone {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    padding: 22px 16px; border: 1.5px dashed var(--fn-border);
    border-radius: 10px; text-align: center; margin: 4px 0;
    transition: border-color 0.15s, background 0.15s;
  }
  .fn-drop-zone:hover { border-color: var(--fn-accent-mid); background: var(--fn-accent-soft); }
  .fn-drop-zone-sm {
    flex-direction: row; padding: 8px 12px; gap: 8px; align-items: center; margin-top: 4px;
  }
  .fn-drop-zone-icon { font-size: 20px; color: var(--fn-text-faint); line-height: 1; }
  .fn-drop-zone-text { font-size: 11px; font-weight: 600; color: var(--fn-text-secondary); }
  .fn-drop-zone-sub { font-size: 10px; color: var(--fn-text-faint); }
  .fn-drop-zone-browse {
    font-size: 10px; color: var(--fn-accent); cursor: pointer;
    text-decoration: underline; text-underline-offset: 2px;
  }
  .fn-font-list.fn-drop-active {
    border: 2px dashed var(--fn-accent) !important;
    background: var(--fn-accent-soft) !important;
    border-radius: 10px;
  }

  /* ── Custom font items ───────────────────────────────────────── */
  .fn-custom-font-item { padding-right: 4px; }
  .fn-custom-font-delete {
    margin-left: auto; flex-shrink: 0;
    width: 18px; height: 18px; border: none; background: none; cursor: pointer;
    color: var(--fn-text-faint); font-size: 10px; border-radius: 4px; padding: 0;
    display: flex; align-items: center; justify-content: center;
    transition: color 0.1s, background 0.1s;
  }
  .fn-custom-font-delete:hover { color: var(--fn-danger); background: var(--fn-danger-light); }
`;let v=!1,w=null;function W(d){return d.id?.startsWith("fontara-")||d.closest("#fontara-dock")!==null||d.closest("#fontara-panel")!==null||d.closest("#fontara-activation")!==null}function D(d){const e=d.target;!e||W(e)||e.classList.add("fontara-hover")}function T(d){const e=d.target;e&&e.classList.remove("fontara-hover")}function q(d){const e=d.target;!e||W(e)||(d.preventDefault(),d.stopPropagation(),d.stopImmediatePropagation(),e.classList.remove("fontara-hover"),e.classList.add("fontara-selected"),C(),w?.(e))}function Y(d){v&&C(),v=!0,w=d,document.addEventListener("mouseover",D,!0),document.addEventListener("mouseout",T,!0),document.addEventListener("click",q,!0),document.body.style.cursor="crosshair"}function C(){v=!1,document.removeEventListener("mouseover",D,!0),document.removeEventListener("mouseout",T,!0),document.removeEventListener("click",q,!0),document.body.style.cursor=""}function Q(){document.querySelectorAll(".fontara-selected").forEach(d=>{d.classList.remove("fontara-selected")})}function Z(){return v}const B=new Set;function $(d,e,t){const n=`${d}:${e.join(",")}:${t??""}`;if(B.has(n))return;B.add(n);const s=`fn-font-${d.replace(/\s+/g,"-").toLowerCase()}`,r=document.getElementById(s);if(r&&!t)return;r?.remove();const l=document.createElement("link");if(l.id=s,l.rel="stylesheet",t){const o=[...new Set(e)].map(Number).sort((a,f)=>a-f),i=o[0],c=o[o.length-1];l.href=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(d)}:wdth,wght@${t[0]}..${t[1]},${i}..${c}&display=swap`}else{const o=[...new Set(e)].sort().join(";");l.href=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(d)}:wght@${o}&display=swap`}document.head.appendChild(l)}const g=[{id:"h1",label:"H1",selectors:"h1",isHeading:!0,defaultFont:"Playfair Display",defaultWeight:"700",defaultFontSize:48,defaultLineHeight:1.1,defaultTracking:-.02},{id:"h2",label:"H2",selectors:"h2",isHeading:!0,defaultFont:"Playfair Display",defaultWeight:"700",defaultFontSize:38,defaultLineHeight:1.15,defaultTracking:-.02},{id:"h3",label:"H3",selectors:"h3",isHeading:!0,defaultFont:"Playfair Display",defaultWeight:"600",defaultFontSize:30,defaultLineHeight:1.2,defaultTracking:-.01},{id:"h4h6",label:"H4–6",selectors:"h4, h5, h6",isHeading:!0,defaultFont:"Inter",defaultWeight:"600",defaultFontSize:22,defaultLineHeight:1.3,defaultTracking:0},{id:"body",label:"Body",selectors:"p, li, td, blockquote, label",isHeading:!1,defaultFont:"Lato",defaultWeight:"400",defaultFontSize:16,defaultLineHeight:1.65,defaultTracking:0},{id:"btn",label:"Btn",selectors:'button, [role="button"], input[type="submit"], a.btn, a[class*="button"]',isHeading:!1,defaultFont:"Inter",defaultWeight:"500",defaultFontSize:14,defaultLineHeight:1.4,defaultTracking:.01},{id:"nav",label:"Nav",selectors:'nav a, header a, [class*="nav"] a, [class*="menu"] a',isHeading:!1,defaultFont:"Inter",defaultWeight:"400",defaultFontSize:14,defaultLineHeight:1.5,defaultTracking:0}];function ee(d){const e=d.tagName.toLowerCase();return e==="h1"?"h1":e==="h2"?"h2":e==="h3"?"h3":e==="h4"||e==="h5"||e==="h6"?"h4h6":e==="button"||d.getAttribute("role")==="button"?"btn":e==="a"&&(d.closest("nav")||d.closest("header"))?"nav":"body"}const I="fontara-applied-styles";function te(d){let e=document.getElementById(I);e||(e=document.createElement("style"),e.id=I,document.head.appendChild(e));const t=["/* Fontara — Applied Styles */"];for(const n of g){const s=d[n.id];if(!s)continue;let o=`${(s.customSelectors??n.selectors).split(",").map(i=>i.trim()).filter(Boolean).join(", ")} { font-family: '${s.font}', system-ui, sans-serif !important; font-weight: ${s.weight} !important; font-size: ${s.fontSize}px !important; line-height: ${s.lineHeight} !important; letter-spacing: ${s.tracking}em !important;`;s.fontStretch!=null&&(o+=` font-stretch: ${s.fontStretch}% !important;`),s.fontStyle!=null&&(o+=` font-style: ${s.fontStyle} !important;`),s.textColor&&(o+=` color: ${s.textColor} !important;`),s.textTransform!=null&&(o+=` text-transform: ${s.textTransform} !important;`),s.wordSpacing!=null&&(o+=` word-spacing: ${s.wordSpacing}em !important;`),o+=" }",t.push(o)}e.textContent=t.join(`
`)}function ne(){document.getElementById(I)?.remove()}function ie(d){const e=new Map;for(const r of Object.values(d))e.has(r.font)||e.set(r.font,new Set),e.get(r.font).add(r.weight);const t=Array.from(e.entries()).map(([r,l])=>{const o=[...l].sort().join(";");return`@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(r)}:wght@${o}&display=swap');`}),n=[];for(const r of g){const l=d[r.id];if(!l)continue;let c=`${(l.customSelectors??r.selectors).split(",").map(a=>a.trim()).filter(Boolean).join(", ")} {
  font-family: '${l.font}', system-ui, sans-serif;
  font-weight: ${l.weight};
  font-size: ${l.fontSize}px;
  line-height: ${l.lineHeight};
  letter-spacing: ${l.tracking}em;
`;l.fontStretch!=null&&(c+=`  font-stretch: ${l.fontStretch}%;
`),l.fontStyle!=null&&(c+=`  font-style: ${l.fontStyle};
`),l.textTransform!=null&&(c+=`  text-transform: ${l.textTransform};
`),l.wordSpacing!=null&&(c+=`  word-spacing: ${l.wordSpacing}em;
`),c+="}",n.push(c)}const s=Array.from(e.entries()).map(([r,l])=>{const o=[...l].sort().join(";");return`  <link rel="preload" as="style" href="${`https://fonts.googleapis.com/css2?family=${encodeURIComponent(r)}:wght@${o}&display=swap`}" onload="this.onload=null;this.rel='stylesheet'">`});return`/* Fontara — Typography Export
 * Generated: ${new Date().toISOString().split("T")[0]}
 */

/* 1. Font loading — add to <head> for best performance */
/*
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${s.join(`
`)}
*/

/* 2. Import fonts (simpler alternative to preload above) */
${t.join(`
`)}

/* 3. Typography rules */
${n.join(`

`)}`}function ae(d,e="fn"){const t=new Map;for(const l of Object.values(d))t.has(l.font)||t.set(l.font,new Set),t.get(l.font).add(l.weight);const n=Array.from(t.entries()).map(([l,o])=>{const i=[...o].sort().join(";");return`@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(l)}:wght@${i}&display=swap');`}),s=[],r=[];for(const l of g){const o=d[l.id];if(!o)continue;const i=l.id.replace(/[^a-z0-9]/gi,"-");s.push(`  --${e}-${i}-family: '${o.font}', system-ui, sans-serif;`),s.push(`  --${e}-${i}-weight: ${o.weight};`),s.push(`  --${e}-${i}-size: ${o.fontSize}px;`),s.push(`  --${e}-${i}-line-height: ${o.lineHeight};`),s.push(`  --${e}-${i}-tracking: ${o.tracking}em;`);const a=(o.customSelectors??l.selectors).split(",").map(f=>f.trim()).filter(Boolean).join(", ");r.push(`${a} {
  font-family: var(--${e}-${i}-family);
  font-weight: var(--${e}-${i}-weight);
  font-size: var(--${e}-${i}-size);
  line-height: var(--${e}-${i}-line-height);
  letter-spacing: var(--${e}-${i}-tracking);
}`)}return`/* Fontara — CSS Variables Export
 * Generated: ${new Date().toISOString().split("T")[0]}
 * Prefix: --${e}
 */

/* 1. Import fonts */
${n.join(`
`)}

/* 2. Custom properties */
:root {
${s.join(`
`)}
}

/* 3. Apply */
${r.join(`

`)}`}function se(d){const e={};for(const t of g){const n=d[t.id];n&&(e[t.id]={fontFamily:{value:n.font,type:"fontFamilies"},fontWeight:{value:String(n.weight),type:"fontWeights"},fontSize:{value:String(n.fontSize),type:"fontSizes"},lineHeight:{value:String(n.lineHeight),type:"lineHeights"},letterSpacing:{value:`${n.tracking*100}%`,type:"letterSpacing"}})}return JSON.stringify({typography:e},null,2)}function re(d){const e={};for(const t of g){const n=d[t.id];n&&(e[t.id]={font:n.font,weight:n.weight,fontSize:n.fontSize,lineHeight:n.lineHeight,tracking:n.tracking,...n.fontStretch!=null?{fontStretch:n.fontStretch}:{},...n.fontStyle!=null?{fontStyle:n.fontStyle}:{},...n.textTransform!=null?{textTransform:n.textTransform}:{},...n.wordSpacing!=null?{wordSpacing:n.wordSpacing}:{},...n.customSelectors?{selectors:n.customSelectors}:{}})}return JSON.stringify(e,null,2)}function oe(d){const e=new Set;for(const o of Object.values(d))e.add(o.font);const t={};for(const o of e){const i=o.toLowerCase().replace(/\s+/g,"-");t[i]=[o,"system-ui","sans-serif"]}const n=d.body,s={},r={};return n&&(s.base=`${n.fontSize}px`,r.normal=`${n.tracking}em`),`// tailwind.config.js — theme.extend
const fontaraExtend = ${JSON.stringify({fontFamily:t,fontSize:s,letterSpacing:r},null,2)};

module.exports = {
  theme: {
    extend: fontaraExtend,
  },
};`}async function le(d){try{return await navigator.clipboard.writeText(d),!0}catch{const e=document.createElement("textarea");e.value=d,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();const t=document.execCommand("copy");return e.remove(),t}}const z=[{family:"Inter",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Roboto",category:"sans-serif",weights:["300","400","500","700","900"],variable:!0},{family:"Open Sans",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0,wdth:[75,100]},{family:"Lato",category:"sans-serif",weights:["300","400","700","900"]},{family:"Montserrat",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Raleway",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Nunito",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Nunito Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"DM Sans",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Plus Jakarta Sans",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Space Grotesk",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Outfit",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Syne",category:"sans-serif",weights:["400","500","600","700","800"],variable:!0},{family:"Manrope",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Urbanist",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Work Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Poppins",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Figtree",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Bricolage Grotesque",category:"sans-serif",weights:["200","300","400","500","600","700","800"],variable:!0},{family:"Albert Sans",category:"sans-serif",weights:["100","200","300","400","500","600","700","800","900"],variable:!0},{family:"Barlow",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Josefin Sans",category:"sans-serif",weights:["300","400","600","700"],variable:!0},{family:"Mulish",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Rubik",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Karla",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Source Sans 3",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0,wdth:[75,125]},{family:"IBM Plex Sans",category:"sans-serif",weights:["300","400","500","600","700"]},{family:"Fira Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Jost",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Cabin",category:"sans-serif",weights:["400","500","600","700"],variable:!0,wdth:[75,100]},{family:"Titillium Web",category:"sans-serif",weights:["300","400","600","700","900"]},{family:"Exo 2",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Noto Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Lexend",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Red Hat Display",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Be Vietnam Pro",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Chivo",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Archivo",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0,wdth:[75,125]},{family:"Instrument Sans",category:"sans-serif",weights:["400","500","600","700"],variable:!0},{family:"Hanken Grotesk",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Readex Pro",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Public Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Quicksand",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Commissioner",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0,wdth:[100,125]},{family:"Onest",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Geist",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Epilogue",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Spline Sans",category:"sans-serif",weights:["300","400","500","600","700"]},{family:"Encode Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0,wdth:[75,125]},{family:"Asap",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Kanit",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Prompt",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Overpass",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Oxygen",category:"sans-serif",weights:["300","400","700"]},{family:"Varela Round",category:"sans-serif",weights:["400"]},{family:"Comfortaa",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Maven Pro",category:"sans-serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Gothic A1",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Hind",category:"sans-serif",weights:["300","400","500","600","700"]},{family:"Schibsted Grotesk",category:"sans-serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Sora",category:"sans-serif",weights:["300","400","500","600","700","800"]},{family:"Rajdhani",category:"sans-serif",weights:["300","400","500","600","700"]},{family:"Anybody",category:"sans-serif",weights:["100","200","300","400","500","600","700","800","900"],variable:!0,wdth:[50,150]},{family:"Wix Madefor Display",category:"sans-serif",weights:["400","500","600","700","800"],variable:!0},{family:"Inclusive Sans",category:"sans-serif",weights:["400"]},{family:"Barlow Condensed",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Barlow Semi Condensed",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"IBM Plex Sans Condensed",category:"sans-serif",weights:["300","400","500","600","700"]},{family:"Noto Sans Display",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Familjen Grotesk",category:"sans-serif",weights:["400","500","600","700"],variable:!0},{family:"Anek Latin",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Gantari",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"M PLUS Rounded 1c",category:"sans-serif",weights:["300","400","500","700","800","900"]},{family:"Kumbh Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Acumin Pro",category:"sans-serif",weights:["400","700"]},{family:"Playfair Display",category:"serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Lora",category:"serif",weights:["400","500","600","700"],variable:!0},{family:"Merriweather",category:"serif",weights:["300","400","700","900"]},{family:"EB Garamond",category:"serif",weights:["400","500","600","700","800"],variable:!0},{family:"Libre Baskerville",category:"serif",weights:["400","700"]},{family:"Cormorant Garamond",category:"serif",weights:["300","400","500","600","700"]},{family:"Crimson Text",category:"serif",weights:["400","600","700"]},{family:"DM Serif Display",category:"serif",weights:["400"]},{family:"Spectral",category:"serif",weights:["300","400","500","600","700","800"]},{family:"PT Serif",category:"serif",weights:["400","700"]},{family:"Fraunces",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0,wdth:[79,125]},{family:"Source Serif 4",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Bitter",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Domine",category:"serif",weights:["400","500","600","700","800"]},{family:"Vollkorn",category:"serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Noto Serif",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Instrument Serif",category:"serif",weights:["400"]},{family:"Bodoni Moda",category:"serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Gloock",category:"serif",weights:["400"]},{family:"Newsreader",category:"serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Frank Ruhl Libre",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Cormorant",category:"serif",weights:["300","400","500","600","700"],variable:!0},{family:"Rokkitt",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Petrona",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Alegreya",category:"serif",weights:["400","500","700","800","900"],variable:!0},{family:"Alegreya Sans",category:"serif",weights:["300","400","500","700","800","900"]},{family:"Cinzel",category:"serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Cardo",category:"serif",weights:["400","700"]},{family:"Josefin Slab",category:"serif",weights:["300","400","600","700"],variable:!0},{family:"Martel",category:"serif",weights:["300","400","600","700","800","900"]},{family:"Neuton",category:"serif",weights:["300","400","700","800"]},{family:"Philosopher",category:"serif",weights:["400","700"]},{family:"Libre Caslon Text",category:"serif",weights:["400","700"]},{family:"Young Serif",category:"serif",weights:["400"]},{family:"Trocchi",category:"serif",weights:["400"]},{family:"Fenix",category:"serif",weights:["400"]},{family:"Rufina",category:"serif",weights:["400","700"]},{family:"Unna",category:"serif",weights:["400","700"]},{family:"Vidaloka",category:"serif",weights:["400"]},{family:"Taviraj",category:"serif",weights:["300","400","500","600","700","800","900"]},{family:"Hepta Slab",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Rasa",category:"serif",weights:["300","400","500","600","700"],variable:!0},{family:"Scope One",category:"serif",weights:["400"]},{family:"Della Respira",category:"serif",weights:["400"]},{family:"Lustria",category:"serif",weights:["400"]},{family:"Playfair",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Noto Serif Display",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Pirata One",category:"serif",weights:["400"]},{family:"Cambo",category:"serif",weights:["400"]},{family:"Coustard",category:"serif",weights:["400","900"]},{family:"Mate",category:"serif",weights:["400"]},{family:"Noticia Text",category:"serif",weights:["400","700"]},{family:"Bebas Neue",category:"display",weights:["400"]},{family:"Oswald",category:"display",weights:["300","400","500","600","700"],variable:!0},{family:"Anton",category:"display",weights:["400"]},{family:"Righteous",category:"display",weights:["400"]},{family:"Abril Fatface",category:"display",weights:["400"]},{family:"Big Shoulders Display",category:"display",weights:["300","400","500","600","700","800","900"],variable:!0,wdth:[70,100]},{family:"Unbounded",category:"display",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Teko",category:"display",weights:["300","400","500","600","700"],variable:!0},{family:"Lobster",category:"display",weights:["400"]},{family:"Pacifico",category:"display",weights:["400"]},{family:"Bangers",category:"display",weights:["400"]},{family:"Bungee",category:"display",weights:["400"]},{family:"Alfa Slab One",category:"display",weights:["400"]},{family:"Dela Gothic One",category:"display",weights:["400"]},{family:"Yeseva One",category:"display",weights:["400"]},{family:"Russo One",category:"display",weights:["400"]},{family:"Saira",category:"display",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Black Han Sans",category:"display",weights:["400"]},{family:"Fredoka",category:"display",weights:["300","400","500","600","700"],variable:!0},{family:"Lilita One",category:"display",weights:["400"]},{family:"Squada One",category:"display",weights:["400"]},{family:"Ultra",category:"display",weights:["400"]},{family:"Titan One",category:"display",weights:["400"]},{family:"Concert One",category:"display",weights:["400"]},{family:"Boogaloo",category:"display",weights:["400"]},{family:"Permanent Marker",category:"display",weights:["400"]},{family:"Michroma",category:"display",weights:["400"]},{family:"Graduate",category:"display",weights:["400"]},{family:"Koulen",category:"display",weights:["400"]},{family:"Press Start 2P",category:"display",weights:["400"]},{family:"Bowlby One",category:"display",weights:["400"]},{family:"Coiny",category:"display",weights:["400"]},{family:"Monoton",category:"display",weights:["400"]},{family:"Poller One",category:"display",weights:["400"]},{family:"Racing Sans One",category:"display",weights:["400"]},{family:"Faster One",category:"display",weights:["400"]},{family:"Audiowide",category:"display",weights:["400"]},{family:"Orbitron",category:"display",weights:["400","500","600","700","800","900"],variable:!0},{family:"Exo",category:"display",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Quantico",category:"display",weights:["400","700"]},{family:"Syncopate",category:"display",weights:["400","700"]},{family:"Big Shoulders Text",category:"display",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Fjalla One",category:"display",weights:["400"]},{family:"Passion One",category:"display",weights:["400","700","900"]},{family:"Voltaire",category:"display",weights:["400"]},{family:"Caesar Dressing",category:"display",weights:["400"]},{family:"Ceviche One",category:"display",weights:["400"]},{family:"Changa One",category:"display",weights:["400"]},{family:"Cinzel Decorative",category:"display",weights:["400","700","900"]},{family:"Ewert",category:"display",weights:["400"]},{family:"Goblin One",category:"display",weights:["400"]},{family:"Kalnia",category:"display",weights:["300","400","500","600","700"],variable:!0},{family:"Krona One",category:"display",weights:["400"]},{family:"Londrina Solid",category:"display",weights:["300","400","900"]},{family:"Modak",category:"display",weights:["400"]},{family:"Nixie One",category:"display",weights:["400"]},{family:"Rammetto One",category:"display",weights:["400"]},{family:"Russo One",category:"display",weights:["400"]},{family:"Wallpoet",category:"display",weights:["400"]},{family:"Special Elite",category:"display",weights:["400"]},{family:"Rye",category:"display",weights:["400"]},{family:"Diplomata SC",category:"display",weights:["400"]},{family:"Bona Nova SC",category:"display",weights:["400","700"]},{family:"Poiret One",category:"display",weights:["400"]},{family:"Italiana",category:"display",weights:["400"]},{family:"Marcellus",category:"display",weights:["400"]},{family:"Marcellus SC",category:"display",weights:["400"]},{family:"Tenor Sans",category:"display",weights:["400"]},{family:"Cormorant SC",category:"display",weights:["300","400","500","600","700"]},{family:"Playfair Display SC",category:"display",weights:["400","700","900"]},{family:"Forum",category:"display",weights:["400"]},{family:"Bellefair",category:"display",weights:["400"]},{family:"Oleo Script",category:"display",weights:["400","700"]},{family:"Electrolize",category:"display",weights:["400"]},{family:"Black Ops One",category:"display",weights:["400"]},{family:"Nova Square",category:"display",weights:["400"]},{family:"Turret Road",category:"display",weights:["400","700"]},{family:"Iceland",category:"display",weights:["400"]},{family:"Gugi",category:"display",weights:["400"]},{family:"Jura",category:"display",weights:["300","400","500","600","700"],variable:!0},{family:"Share Tech",category:"display",weights:["400"]},{family:"Nova Slim",category:"display",weights:["400"]},{family:"Oxanium",category:"display",weights:["300","400","500","600","700","800"],variable:!0},{family:"Rationale",category:"display",weights:["400"]},{family:"Dancing Script",category:"handwriting",weights:["400","500","600","700"],variable:!0},{family:"Caveat",category:"handwriting",weights:["400","500","600","700"],variable:!0},{family:"Sacramento",category:"handwriting",weights:["400"]},{family:"Kalam",category:"handwriting",weights:["300","400","700"]},{family:"Satisfy",category:"handwriting",weights:["400"]},{family:"Great Vibes",category:"handwriting",weights:["400"]},{family:"Parisienne",category:"handwriting",weights:["400"]},{family:"Architects Daughter",category:"handwriting",weights:["400"]},{family:"Patrick Hand",category:"handwriting",weights:["400"]},{family:"Indie Flower",category:"handwriting",weights:["400"]},{family:"Shadows Into Light",category:"handwriting",weights:["400"]},{family:"Mali",category:"handwriting",weights:["300","400","500","600","700"]},{family:"Allura",category:"handwriting",weights:["400"]},{family:"Cookie",category:"handwriting",weights:["400"]},{family:"Damion",category:"handwriting",weights:["400"]},{family:"Italianno",category:"handwriting",weights:["400"]},{family:"Pinyon Script",category:"handwriting",weights:["400"]},{family:"Zeyada",category:"handwriting",weights:["400"]},{family:"The Nautigal",category:"handwriting",weights:["400","700"]},{family:"Yesteryear",category:"handwriting",weights:["400"]},{family:"Style Script",category:"handwriting",weights:["400"]},{family:"Euphoria Script",category:"handwriting",weights:["400"]},{family:"Niconne",category:"handwriting",weights:["400"]},{family:"Mynerve",category:"handwriting",weights:["400"]},{family:"Stalemate",category:"handwriting",weights:["400"]},{family:"Covered By Your Grace",category:"handwriting",weights:["400"]},{family:"Rock Salt",category:"handwriting",weights:["400"]},{family:"Caveat Brush",category:"handwriting",weights:["400"]},{family:"Nanum Pen Script",category:"handwriting",weights:["400"]},{family:"Liu Jian Mao Cao",category:"handwriting",weights:["400"]},{family:"Kaushan Script",category:"handwriting",weights:["400"]},{family:"JetBrains Mono",category:"monospace",weights:["400","500","600","700","800"],variable:!0},{family:"Fira Code",category:"monospace",weights:["300","400","500","600","700"],variable:!0},{family:"Space Mono",category:"monospace",weights:["400","700"]},{family:"IBM Plex Mono",category:"monospace",weights:["300","400","500","600","700"]},{family:"Roboto Mono",category:"monospace",weights:["300","400","500","600","700"],variable:!0},{family:"Source Code Pro",category:"monospace",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Inconsolata",category:"monospace",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Ubuntu Mono",category:"monospace",weights:["400","700"]},{family:"Courier Prime",category:"monospace",weights:["400","700"]},{family:"DM Mono",category:"monospace",weights:["300","400","500"]},{family:"Martian Mono",category:"monospace",weights:["300","400","500","600","700","800"],variable:!0},{family:"Chivo Mono",category:"monospace",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Syne Mono",category:"monospace",weights:["400"]},{family:"Anonymous Pro",category:"monospace",weights:["400","700"]},{family:"Azeret Mono",category:"monospace",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Red Hat Mono",category:"monospace",weights:["300","400","500","600","700"],variable:!0},{family:"Overpass Mono",category:"monospace",weights:["300","400","500","600","700"],variable:!0},{family:"Share Tech Mono",category:"monospace",weights:["400"]},{family:"Xanh Mono",category:"monospace",weights:["400"]},{family:"Nanum Gothic Coding",category:"monospace",weights:["400","700"]},{family:"B612 Mono",category:"monospace",weights:["400","700"]},{family:"Cutive Mono",category:"monospace",weights:["400"]},{family:"Nova Mono",category:"monospace",weights:["400"]},{family:"PT Mono",category:"monospace",weights:["400"]},{family:"Sometype Mono",category:"monospace",weights:["400","500","600","700"],variable:!0},{family:"Fragment Mono",category:"monospace",weights:["400"]},{family:"Cousine",category:"monospace",weights:["400","700"]},{family:"Major Mono Display",category:"monospace",weights:["400"]},{family:"Noto Sans Mono",category:"monospace",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Spline Sans Mono",category:"monospace",weights:["300","400","500","600","700"],variable:!0},{family:"Kode Mono",category:"monospace",weights:["400","500","600","700"],variable:!0},{family:"VT323",category:"experimental",weights:["400"]},{family:"Silkscreen",category:"experimental",weights:["400","700"]},{family:"Pixelify Sans",category:"experimental",weights:["400","500","600","700"],variable:!0},{family:"Tiny5",category:"experimental",weights:["400"]},{family:"DotGothic16",category:"experimental",weights:["400"]},{family:"Cabin Sketch",category:"experimental",weights:["400","700"]},{family:"Butcherman",category:"experimental",weights:["400"]},{family:"New Rocker",category:"experimental",weights:["400"]},{family:"Metal Mania",category:"experimental",weights:["400"]},{family:"Creepster",category:"experimental",weights:["400"]},{family:"Henny Penny",category:"experimental",weights:["400"]},{family:"Rubik Wet Paint",category:"experimental",weights:["400"]},{family:"Rubik Dirt",category:"experimental",weights:["400"]},{family:"Rubik Burned",category:"experimental",weights:["400"]},{family:"Rubik Storm",category:"experimental",weights:["400"]},{family:"Rubik Maze",category:"experimental",weights:["400"]},{family:"Rubik Moonrocks",category:"experimental",weights:["400"]},{family:"Rubik Puddles",category:"experimental",weights:["400"]},{family:"Rubik Glitch",category:"experimental",weights:["400"]},{family:"Bungee Shade",category:"experimental",weights:["400"]},{family:"Bungee Inline",category:"experimental",weights:["400"]},{family:"Bungee Outline",category:"experimental",weights:["400"]},{family:"Fascinate",category:"experimental",weights:["400"]},{family:"Fascinate Inline",category:"experimental",weights:["400"]},{family:"Nabla",category:"experimental",weights:["400"]},{family:"UnifrakturMaguntia",category:"experimental",weights:["400"]},{family:"MedievalSharp",category:"experimental",weights:["400"]},{family:"Germania One",category:"experimental",weights:["400"]},{family:"Uncial Antiqua",category:"experimental",weights:["400"]},{family:"Stalinist One",category:"experimental",weights:["400"]},{family:"Diplomata",category:"experimental",weights:["400"]},{family:"Emblema One",category:"experimental",weights:["400"]},{family:"Sixtyfour Convergence",category:"experimental",weights:["400"]},{family:"Tsukimi Rounded",category:"experimental",weights:["300","400","500","600","700"]},{family:"Ojuju",category:"experimental",weights:["300","400","500","600","700","800"],variable:!0}],ce=[{id:"all",label:"All"},{id:"sans-serif",label:"Sans"},{id:"serif",label:"Serif"},{id:"display",label:"Display"},{id:"handwriting",label:"Script"},{id:"monospace",label:"Mono"},{id:"experimental",label:"🔥 Wild"}];function R(d,e){const t=d.toLowerCase().trim();return z.filter(n=>{const s=e==="all"||n.category===e,r=!t||n.family.toLowerCase().includes(t);return s&&r})}function S(d){return z.find(e=>e.family===d)}const M=[{id:"classic-elegance",name:"Classic Elegance",description:"Timeless editorial pairing for premium brands",headingFont:"Playfair Display",headingWeight:"700",bodyFont:"Lato",bodyWeight:"400",tags:["editorial","luxury","classic"]},{id:"modern-editorial",name:"Modern Editorial",description:"Clean tech aesthetic meets readable prose",headingFont:"Inter",headingWeight:"700",bodyFont:"Merriweather",bodyWeight:"400",tags:["tech","blog","modern"]},{id:"tech-craft",name:"Tech Meets Craft",description:"Geometric precision with warm humanist body",headingFont:"Space Grotesk",headingWeight:"700",bodyFont:"Lora",bodyWeight:"400",tags:["startup","saas","tech"]},{id:"bold-clarity",name:"Bold Clarity",description:"Strong impact headlines with clean readability",headingFont:"Montserrat",headingWeight:"800",bodyFont:"Open Sans",bodyWeight:"400",tags:["marketing","landing","bold"]},{id:"designers-choice",name:"Designer's Choice",description:"Matching DM family — perfectly harmonious",headingFont:"DM Serif Display",headingWeight:"400",bodyFont:"DM Sans",bodyWeight:"400",tags:["design","portfolio","harmonious"]},{id:"creative-studio",name:"Creative Studio",description:"Experimental geometry meets friendly warmth",headingFont:"Syne",headingWeight:"800",bodyFont:"Nunito",bodyWeight:"400",tags:["agency","creative","modern"]},{id:"luxury-brand",name:"Luxury Brand",description:"Whisper-thin elegance for high-end positioning",headingFont:"Cormorant Garamond",headingWeight:"600",bodyFont:"Raleway",bodyWeight:"300",tags:["luxury","fashion","premium"]},{id:"street-cred",name:"Street Cred",description:"Maximum impact with clean body copy",headingFont:"Bebas Neue",headingWeight:"400",bodyFont:"Open Sans",bodyWeight:"400",tags:["bold","streetwear","impact"]},{id:"business-pro",name:"Business Pro",description:"Professional and trustworthy for enterprise",headingFont:"Plus Jakarta Sans",headingWeight:"700",bodyFont:"PT Serif",bodyWeight:"400",tags:["business","enterprise","professional"]},{id:"contemporary-classic",name:"Contemporary Classic",description:"Modern sans meets classical elegance",headingFont:"Outfit",headingWeight:"700",bodyFont:"EB Garamond",bodyWeight:"400",tags:["contemporary","magazine","refined"]},{id:"editorial-noir",name:"Editorial Noir",description:"High contrast, magazine-worthy gravitas",headingFont:"Bodoni Moda",headingWeight:"700",bodyFont:"Source Sans 3",bodyWeight:"400",tags:["editorial","magazine","high-contrast"]},{id:"soft-tech",name:"Soft Tech",description:"Friendly rounded feel for apps and tools",headingFont:"Nunito",headingWeight:"800",bodyFont:"Manrope",bodyWeight:"400",tags:["app","saas","friendly"]},{id:"humanist-warmth",name:"Humanist Warmth",description:"Warm grotesque headlines, readable serif body",headingFont:"Karla",headingWeight:"700",bodyFont:"Lora",bodyWeight:"400",tags:["blog","warmth","humanist"]},{id:"brutalist",name:"Brutalist",description:"Raw typographic power — unapologetically bold",headingFont:"Anton",headingWeight:"400",bodyFont:"Work Sans",bodyWeight:"400",tags:["bold","brutalist","impact"]},{id:"old-money",name:"Old Money",description:"Classic serif pairing for heritage and prestige",headingFont:"Libre Baskerville",headingWeight:"700",bodyFont:"Crimson Text",bodyWeight:"400",tags:["heritage","luxury","classic"]},{id:"scandinavian",name:"Scandinavian",description:"Clean minimal aesthetic — form meets function",headingFont:"Manrope",headingWeight:"600",bodyFont:"Inter",bodyWeight:"400",tags:["minimal","nordic","clean"]},{id:"futuristic",name:"Futuristic",description:"Sci-fi geometric for cutting-edge interfaces",headingFont:"Orbitron",headingWeight:"700",bodyFont:"Exo 2",bodyWeight:"400",tags:["futuristic","sci-fi","tech"]},{id:"journalistic",name:"Journalistic",description:"Authoritative news design, built to be read",headingFont:"Source Serif 4",headingWeight:"700",bodyFont:"Source Sans 3",bodyWeight:"400",tags:["news","editorial","readable"]},{id:"romantic",name:"Romantic",description:"Delicate script headline over elegant serif",headingFont:"Cormorant",headingWeight:"400",bodyFont:"Raleway",bodyWeight:"300",tags:["wedding","romance","delicate"]},{id:"playful-kids",name:"Playful",description:"Bouncy, fun, full of personality",headingFont:"Fredoka",headingWeight:"600",bodyFont:"Nunito",bodyWeight:"400",tags:["kids","playful","fun"]},{id:"dark-academia",name:"Dark Academia",description:"Literary gravitas with old-world sophistication",headingFont:"EB Garamond",headingWeight:"700",bodyFont:"Spectral",bodyWeight:"400",tags:["literary","academic","elegant"]},{id:"startup-energy",name:"Startup Energy",description:"Bold, ambitious, ready to disrupt",headingFont:"Bricolage Grotesque",headingWeight:"700",bodyFont:"DM Sans",bodyWeight:"400",tags:["startup","vc","bold"]},{id:"readable-long",name:"Long-Form Read",description:"Optimised for extended reading sessions",headingFont:"Bitter",headingWeight:"700",bodyFont:"Lora",bodyWeight:"400",tags:["readability","blog","article"]},{id:"geometric-modern",name:"Geometric Modern",description:"Precise geometry for design-forward projects",headingFont:"Urbanist",headingWeight:"800",bodyFont:"Jost",bodyWeight:"400",tags:["modern","geometric","design"]},{id:"artisan-craft",name:"Artisan Craft",description:"Handcrafted warmth for makers and creators",headingFont:"Fraunces",headingWeight:"700",bodyFont:"Karla",bodyWeight:"400",tags:["artisan","craft","warm"]},{id:"neoclassical",name:"Neoclassical",description:"Roman capitals meeting contemporary body text",headingFont:"Cinzel",headingWeight:"600",bodyFont:"Alegreya",bodyWeight:"400",tags:["classical","architecture","formal"]},{id:"developer-docs",name:"Developer Docs",description:"Sharp sans for headings, mono for code feel",headingFont:"IBM Plex Sans",headingWeight:"600",bodyFont:"IBM Plex Mono",bodyWeight:"400",tags:["developer","docs","technical"]},{id:"fashion-editorial",name:"Fashion Editorial",description:"High-fashion serif with airy sans body",headingFont:"Playfair Display",headingWeight:"900",bodyFont:"Raleway",bodyWeight:"300",tags:["fashion","editorial","luxury"]},{id:"neo-brutalist",name:"Neo-Brutalist",description:"Condensed display with bold grotesque energy",headingFont:"Oswald",headingWeight:"700",bodyFont:"Barlow",bodyWeight:"400",tags:["brutal","web","bold"]},{id:"minimal-swiss",name:"Minimal Swiss",description:"Swiss grid discipline — pure typographic clarity",headingFont:"Work Sans",headingWeight:"700",bodyFont:"Source Sans 3",bodyWeight:"300",tags:["swiss","minimal","grid"]},{id:"natural-organic",name:"Natural Organic",description:"Earthy, breathing, sustainably beautiful",headingFont:"Vollkorn",headingWeight:"600",bodyFont:"Nunito Sans",bodyWeight:"400",tags:["organic","nature","wellness"]},{id:"sci-fi-mono",name:"Sci-Fi Terminal",description:"Cold and precise, like a starship interface",headingFont:"Space Mono",headingWeight:"700",bodyFont:"Share Tech Mono",bodyWeight:"400",tags:["sci-fi","terminal","dark"]},{id:"retro-wave",name:"Retro Wave",description:"80s nostalgia with modern execution",headingFont:"Righteous",headingWeight:"400",bodyFont:"Rajdhani",bodyWeight:"400",tags:["retro","80s","neon"]},{id:"academic-paper",name:"Academic Paper",description:"Scholarly precision, built for long-form content",headingFont:"Libre Baskerville",headingWeight:"700",bodyFont:"Merriweather",bodyWeight:"400",tags:["academic","research","readable"]},{id:"fintech",name:"FinTech Clean",description:"Trustworthy, data-first, conversion-optimised",headingFont:"Figtree",headingWeight:"700",bodyFont:"Inter",bodyWeight:"400",tags:["fintech","banking","trust"]},{id:"sketch-notes",name:"Sketch Notes",description:"Raw hand-drawn energy meets clean readable body",headingFont:"Permanent Marker",headingWeight:"400",bodyFont:"Lato",bodyWeight:"400",tags:["wild","hand-drawn","raw"]},{id:"retro-terminal",name:"Retro Terminal",description:"Pure monochrome pixel nostalgia — no frills",headingFont:"VT323",headingWeight:"400",bodyFont:"Share Tech Mono",bodyWeight:"400",tags:["wild","pixel","terminal"]},{id:"bauhaus-grid",name:"Bauhaus Grid",description:"Compressed display type with German avant-garde rigour",headingFont:"Staatliches",headingWeight:"400",bodyFont:"Barlow",bodyWeight:"400",tags:["wild","bauhaus","condensed"]},{id:"art-deco",name:"Art Déco",description:"1920s geometric luxury — whisper-thin and precious",headingFont:"Poiret One",headingWeight:"400",bodyFont:"Cormorant Garamond",bodyWeight:"400",tags:["wild","art-deco","1920s"]},{id:"urban-signage",name:"Urban Signage",description:"Bold street-level signage with condensed body energy",headingFont:"Bungee",headingWeight:"400",bodyFont:"Barlow Condensed",bodyWeight:"400",tags:["wild","street","signage"]},{id:"cafe-chalkboard",name:"Café Chalkboard",description:"Warm handwritten charm for menus and mood boards",headingFont:"Caveat",headingWeight:"700",bodyFont:"Karla",bodyWeight:"400",tags:["wild","handwritten","warm"]},{id:"bubble-gum",name:"Bubble Gum",description:"Maximum softness — every corner is round and friendly",headingFont:"Comfortaa",headingWeight:"700",bodyFont:"Nunito",bodyWeight:"400",tags:["wild","rounded","playful"]},{id:"pixel-arcade",name:"Pixel Arcade",description:"Full 8-bit game aesthetic — insert coin to continue",headingFont:"Press Start 2P",headingWeight:"400",bodyFont:"Space Mono",bodyWeight:"400",tags:["wild","8-bit","gaming"]}],de={"Playfair Display":["Lato","Source Sans 3","DM Sans","Raleway"],"EB Garamond":["Lato","Nunito Sans","Source Sans 3","Inter"],"Cormorant Garamond":["Source Sans 3","Raleway","Lato"],Cormorant:["Source Sans 3","Raleway","DM Sans","Lato"],Lora:["Merriweather","Source Serif 4","Inter","Work Sans"],Merriweather:["Open Sans","Source Sans 3","Lato","Nunito"],"Libre Baskerville":["Lato","Source Sans 3","Open Sans","Raleway"],"DM Serif Display":["DM Sans","Inter","Lato","Source Sans 3"],Fraunces:["Mulish","Nunito","DM Sans","Inter"],Spectral:["Roboto","Source Sans 3","Open Sans","Karla"],"Bodoni Moda":["Raleway","Lato","DM Sans","Source Sans 3"],Gloock:["Inter","DM Sans","Manrope","Nunito Sans"],Newsreader:["Source Sans 3","Nunito Sans","Inter","Lato"],"Frank Ruhl Libre":["Raleway","Nunito","Lato","Open Sans"],"Instrument Serif":["Instrument Sans","Inter","DM Sans","Manrope"],"Crimson Text":["Source Sans 3","Raleway","Open Sans","Lato"],Inter:["Lora","Merriweather","Source Serif 4","EB Garamond"],Montserrat:["Merriweather","Lora","Source Serif 4","Open Sans"],Raleway:["Merriweather","Lora","Libre Baskerville","Open Sans"],"Space Grotesk":["Inter","Lora","DM Sans","Source Serif 4"],Syne:["DM Sans","Inter","Manrope","Lora"],Outfit:["Inter","Nunito","Lora","DM Sans"],"DM Sans":["DM Serif Display","Lora","Spectral","Inter"],"Plus Jakarta Sans":["Lora","Source Serif 4","Merriweather","Inter"],Poppins:["Lato","Open Sans","Source Sans 3","Nunito"],Manrope:["Lora","Source Serif 4","Inter","Nunito Sans"],Urbanist:["Lora","Merriweather","Inter","DM Sans"],"Bricolage Grotesque":["Inter","DM Sans","Lora","Source Serif 4"],"Instrument Sans":["Instrument Serif","Lora","EB Garamond","Inter"],"Hanken Grotesk":["Lora","Source Serif 4","Inter","Nunito"],Archivo:["Lora","Merriweather","Inter","Source Serif 4"],Lexend:["Lora","Merriweather","Inter","Open Sans"],"Bebas Neue":["Lato","Raleway","Open Sans","Montserrat"],Oswald:["Merriweather","Lato","EB Garamond","Source Sans 3"],Unbounded:["Inter","DM Sans","Manrope","Nunito Sans"],"Big Shoulders Display":["Inter","Lato","Source Sans 3","Raleway"],"Dela Gothic One":["Inter","DM Sans","Manrope","Lato"],"Yeseva One":["Josefin Sans","Raleway","Lato","Source Sans 3"],Anton:["Lato","Open Sans","Source Sans 3","Raleway"],"JetBrains Mono":["Inter","Lato","DM Sans","Source Sans 3"],"Fira Code":["Fira Sans","Source Sans 3","Inter","Lato"],"Space Mono":["Space Grotesk","Inter","DM Sans","Lato"]};function N(d){return de[d]??[]}const H="fontara_v1_cache";function fe(){const d=[navigator.userAgent,navigator.language,`${screen.width}x${screen.height}`,String(new Date().getTimezoneOffset()),navigator.platform??""].join("|");let e=2166136261;for(let t=0;t<d.length;t++)e^=d.charCodeAt(t),e=e*16777619>>>0;return e.toString(36).padStart(7,"0")}function he(){try{const d=localStorage.getItem(H);return d?JSON.parse(d):null}catch{return null}}function pe(d,e){try{const t={key:d,valid:!0,expiresAt:e};localStorage.setItem(H,JSON.stringify(t))}catch{}}const ge="FTPR-DEV00-DEV00-DEV00-DEV00";async function G(d){if(d===ge)return{valid:!0,expiresAt:Date.now()+7*24*60*60*1e3,email:"dev@localhost"};const e=he();if(e&&e.key===d&&e.valid&&e.expiresAt>Date.now())return{valid:!0,expiresAt:e.expiresAt};try{const n=await(await fetch("https://app.fontara.it/api/verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:d,fingerprint:fe()})})).json();return n.valid&&n.expiresAt&&pe(d,n.expiresAt),n}catch{return e&&e.key===d&&e.valid&&e.expiresAt+5184e5>Date.now()?{valid:!0,expiresAt:e.expiresAt}:{valid:!1,error:"Unable to reach Fontara servers. Check your connection and try again."}}}const b="__custom",j={100:"Thin",200:"ExtraLight",300:"Light",400:"Regular",500:"Medium",600:"SemiBold",700:"Bold",800:"ExtraBold",900:"Black"};function U(){const d={};for(const e of g)d[e.id]={font:e.defaultFont,weight:e.defaultWeight,fontSize:e.defaultFontSize,lineHeight:e.defaultLineHeight,tracking:e.defaultTracking};return d}function E(d){return JSON.parse(JSON.stringify(d))}function P(d){const e=d.replace("#","");if(e.length!==6)return null;const t=parseInt(e.slice(0,2),16),n=parseInt(e.slice(2,4),16),s=parseInt(e.slice(4,6),16);return[t,n,s]}function V(d,e,t){const n=s=>{const r=s/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)};return .2126*n(d)+.7152*n(e)+.0722*n(t)}function ue(d,e){const t=P(d),n=P(e);if(!t||!n)return null;const s=V(...t),r=V(...n),l=Math.max(s,r),o=Math.min(s,r);return(l+.05)/(o+.05)}function K(d){const e=P(d);if(!e)return[0,0,100];const t=e[0]/255,n=e[1]/255,s=e[2]/255,r=Math.max(t,n,s),l=Math.min(t,n,s),o=r-l,i=r*100,c=r===0?0:o/r*100;let a=0;return o>0&&(r===t?a=(n-s)/o%6*60:r===n?a=((s-t)/o+2)*60:a=((t-n)/o+4)*60,a<0&&(a+=360)),[Math.round(a),Math.round(c),Math.round(i)]}function me(d,e,t){const n=e/100,s=t/100,r=l=>{const o=(l+d/60)%6,i=s-s*n*Math.max(0,Math.min(o,4-o,1));return Math.round(i*255).toString(16).padStart(2,"0")};return`#${r(5)}${r(3)}${r(1)}`}class ye{constructor(e){O(this,"root");O(this,"s",{open:!1,tab:"fonts",activeGroupIds:["h1"],elementStyles:U(),searchQuery:"",category:"all",inspecting:!1,theme:"light",undoStack:[],redoStack:[],exportFormat:"css",showExportModal:!1,cssPrefix:"fn",licenseValid:!1,licenseEmail:null,showActivationModal:!1,showShortcutsHelp:!1,contrastBg:"#ffffff",advancedOpen:!1,contrastOpen:!1,customFonts:[],customFontDropActive:!1,customFontModal:!1,pendingFontName:"",pendingFontData:null,pendingFontFileName:"",colorPickerOpen:!1,pickerH:0,pickerS:0,pickerV:100,licenseKey:null,savedPresets:[],savedPresetsLoaded:!1,presetNameInput:"",presetSaveError:""});this.restoreSession(),this.injectStyles(),this.root=document.createElement("div"),this.root.id="fontara-dock",this.s.theme==="dark"&&this.root.classList.add("dark"),this.restoreDockPosition(),document.body.appendChild(this.root),this.loadCustomFonts(),this.attachDropZone(),this.render(),this.preloadAllFonts(),this.attachGlobalKeydown(),this.checkLicenseCache(),this.s.licenseValid&&this.s.licenseKey&&this.loadSavedPresets(),e&&!this.s.licenseValid&&this.autoVerifyKey(e)}restoreDockPosition(){try{const e=localStorage.getItem("fontara_dock_pos");if(!e)return;const{right:t,bottom:n}=JSON.parse(e);typeof t=="number"&&(this.root.style.right=`${t}px`),typeof n=="number"&&(this.root.style.bottom=`${n}px`)}catch{}}saveDockPosition(){try{const e=parseFloat(this.root.style.right)||24,t=parseFloat(this.root.style.bottom)||24;localStorage.setItem("fontara_dock_pos",JSON.stringify({right:e,bottom:t}))}catch{}}getPanelLayout(){const e=this.root.getBoundingClientRect(),t=12,n=e.top-t,s=window.innerHeight-e.bottom-t,r=260;return n>=r&&n>=s?{dir:"above",maxHeight:`${Math.min(n,window.innerHeight*.85)}px`}:s>=r?{dir:"below",maxHeight:`${Math.min(s,window.innerHeight*.85)}px`}:n>=s?{dir:"above",maxHeight:`${Math.max(n,260)}px`}:{dir:"below",maxHeight:`${Math.max(s,260)}px`}}injectStyles(){if(document.getElementById("fontara-styles"))return;const e=document.createElement("style");e.id="fontara-styles",e.textContent=x,document.head.appendChild(e)}restoreSession(){try{const e=localStorage.getItem("fontara_session_v3");if(!e)return;const t=JSON.parse(e);t.elementStyles&&(this.s.elementStyles=t.elementStyles),t.theme&&(this.s.theme=t.theme)}catch{}}saveSession(){try{localStorage.setItem("fontara_session_v3",JSON.stringify({elementStyles:this.s.elementStyles,theme:this.s.theme}))}catch{}}loadCustomFonts(){try{const e=localStorage.getItem("fontara_custom_fonts");if(!e)return;const t=JSON.parse(e);this.s.customFonts=t,t.forEach(n=>this.injectFontFace(n))}catch{}}saveCustomFonts(){try{localStorage.setItem("fontara_custom_fonts",JSON.stringify(this.s.customFonts))}catch{}}injectFontFace(e){const t=`fn-custom-font-${e.id}`;if(document.getElementById(t))return;const n=document.createElement("style");n.id=t,n.textContent=`@font-face { font-family: '${e.name.replace(/'/g,"\\'")}'; src: url('${e.dataUrl}'); }`,document.head.appendChild(n)}handleFontFile(e){const t=[".ttf",".otf",".woff",".woff2"],n=e.name.toLowerCase();if(!t.some(r=>n.endsWith(r)))return;const s=new FileReader;s.onload=r=>{const l=r.target?.result;l&&(this.s.pendingFontData=l,this.s.pendingFontFileName=e.name.replace(/\.[^.]+$/,""),this.s.pendingFontName=this.s.pendingFontFileName,this.s.customFontModal=!0,this.rerender())},s.readAsDataURL(e)}attachDropZone(){this.root.addEventListener("dragover",e=>{const t=e.dataTransfer?.items;if(t){for(let n=0;n<t.length;n++)if(t[n].kind==="file"){e.preventDefault(),this.s.customFontDropActive||(this.s.customFontDropActive=!0,this.root.classList.add("fn-drop-active"));break}}}),this.root.addEventListener("dragleave",e=>{this.root.contains(e.relatedTarget)||(this.s.customFontDropActive=!1,this.root.classList.remove("fn-drop-active"))}),this.root.addEventListener("drop",e=>{e.preventDefault(),this.s.customFontDropActive=!1,this.root.classList.remove("fn-drop-active");const t=e.dataTransfer?.files;t?.length&&this.handleFontFile(t[0])})}preloadAllFonts(){const e=new Set;for(const t of Object.values(this.s.elementStyles))e.add(t.font);for(const t of e){const n=S(t);n&&$(t,n.weights,n.wdth)}}applyStyles(){te(this.s.elementStyles)}checkLicenseCache(){try{const e=localStorage.getItem("fontara_v1_cache");if(!e)return;const t=JSON.parse(e);t?.valid&&t.expiresAt>Date.now()&&(this.s.licenseValid=!0,this.s.licenseEmail=t.email??null,this.s.licenseKey=t.key??null)}catch{}}async autoVerifyKey(e){try{const t=await G(e);if(t.valid){this.s.licenseValid=!0,this.s.licenseEmail=t.email??null,this.s.licenseKey=e;try{localStorage.setItem("fontara_v1_cache",JSON.stringify({valid:!0,key:e,email:t.email,expiresAt:t.expiresAt}))}catch{}this.rerender(),this.loadSavedPresets()}}catch{}}async loadSavedPresets(){if(this.s.licenseKey)try{const e=await fetch("https://app.fontara.it/api/presets",{headers:{"x-fontara-key":this.s.licenseKey}});if(!e.ok)return;const t=await e.json();this.s.savedPresets=t.presets??[],this.s.savedPresetsLoaded=!0,this.rerender()}catch{}}async savePreset(e){if(!e.trim()){this.s.presetSaveError="Enter a name first.",this.rerender();return}if(!this.s.licenseKey){this.s.presetSaveError="Not activated — activate PRO first.",this.rerender();return}const t=this.q("#fn-save-preset");t&&(t.disabled=!0,t.textContent="Saving…"),this.s.presetSaveError="";const n=this.s.elementStyles.h1,s=this.s.elementStyles.body;try{const r=await fetch("https://app.fontara.it/api/presets",{method:"POST",headers:{"Content-Type":"application/json","x-fontara-key":this.s.licenseKey},body:JSON.stringify({name:e.trim(),headingFont:n.font,bodyFont:s.font,headingWeight:n.weight,bodyWeight:s.weight,config:E(this.s.elementStyles)})});if(!r.ok){const o=await r.json().catch(()=>({}));this.s.presetSaveError=o.error??`Server error ${r.status}`,this.rerender();return}const l=await r.json();this.s.savedPresets=[l.preset,...this.s.savedPresets],this.s.presetNameInput="",this.s.presetSaveError="",this.rerender()}catch(r){this.s.presetSaveError=r instanceof Error?r.message:"Network error. Try again.",this.rerender()}}async deletePreset(e){if(this.s.licenseKey){this.s.savedPresets=this.s.savedPresets.filter(t=>t.id!==e),this.rerender();try{await fetch(`https://app.fontara.it/api/presets/${e}`,{method:"DELETE",headers:{"x-fontara-key":this.s.licenseKey}})}catch{}}}pushUndo(){this.s.undoStack.push(E(this.s.elementStyles)),this.s.undoStack.length>(this.s.licenseValid?50:5)&&this.s.undoStack.shift(),this.s.redoStack=[]}undo(){this.s.undoStack.length!==0&&(this.s.redoStack.push(E(this.s.elementStyles)),this.s.elementStyles=this.s.undoStack.pop(),this.applyStyles(),this.saveSession(),this.rerender())}redo(){this.s.redoStack.length!==0&&(this.s.undoStack.push(E(this.s.elementStyles)),this.s.elementStyles=this.s.redoStack.pop(),this.applyStyles(),this.saveSession(),this.rerender())}attachGlobalKeydown(){document.addEventListener("keydown",e=>{const t=e.target,n=t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable,s=t.id==="fn-search";if(this.s.open&&this.s.tab==="fonts"&&(e.key==="ArrowDown"||e.key==="ArrowUp")){if(n&&!s)return;e.preventDefault();const r=Array.from(this.root.querySelectorAll(".fn-font-item"));if(r.length===0)return;const l=r.findIndex(c=>c.classList.contains("selected")),o=e.key==="ArrowDown"?l<r.length-1?l+1:0:l>0?l-1:r.length-1,i=r[o];i?.dataset.font&&(this.selectFont(i.dataset.font),i.scrollIntoView({block:"nearest"}));return}if(this.s.open&&this.s.tab==="fonts"&&e.key==="Enter"&&s){e.preventDefault();const l=this.root.querySelector(".fn-font-item.selected")??this.root.querySelector(".fn-font-item");l?.dataset.font&&(this.selectFont(l.dataset.font),e.target.blur());return}if(e.key==="Escape"){if(this.s.showActivationModal){this.s.showActivationModal=!1,this.rerender();return}if(this.s.showShortcutsHelp){this.s.showShortcutsHelp=!1,this.rerender();return}if(this.s.showExportModal){this.s.showExportModal=!1,this.rerender();return}if(this.s.customFontModal){this.s.customFontModal=!1,this.s.pendingFontData=null,this.rerender();return}if(this.s.inspecting){this.toggleInspect();return}return}if(!n){if(e.ctrlKey&&e.shiftKey&&e.key==="F"){e.preventDefault(),this.togglePanel();return}if(e.key==="?"&&!e.ctrlKey&&!e.metaKey){e.preventDefault(),this.s.showShortcutsHelp=!this.s.showShortcutsHelp,this.rerender();return}if(this.s.open){if(e.ctrlKey&&!e.shiftKey&&e.key==="z"){e.preventDefault(),this.undo();return}if(e.ctrlKey&&(e.key==="y"||e.shiftKey&&e.key==="z")){e.preventDefault(),this.redo();return}e.key==="1"&&(this.s.tab="fonts",this.rerender()),e.key==="2"&&(this.s.tab="settings",this.rerender()),e.key==="3"&&(this.s.tab="presets",this.rerender())}}})}render(){const e=this.getPanelLayout();this.root.innerHTML=`
      ${this.s.showActivationModal?this.renderActivationModal():""}
      ${this.s.customFontModal?this.renderCustomFontModal():""}
      <div id="fontara-panel"
        class="${this.s.open?"":"hidden"} fn-panel-${e.dir}"
        style="max-height:${e.maxHeight};">
        ${this.renderHeader()}
        ${this.s.showShortcutsHelp?this.renderShortcutsOverlay():""}
        ${this.renderTabs()}
        <div class="fn-scroll">
          ${this.s.tab==="fonts"?this.renderFontsTab():""}
          ${this.s.tab==="settings"?this.renderSettingsTab():""}
          ${this.s.tab==="presets"?this.renderPresetsTab():""}
        </div>
        ${this.s.tab==="fonts"?this.renderActiveBar():""}
        ${this.renderActions()}
        ${this.s.showExportModal?this.renderExportModal():""}
      </div>
      <button id="fontara-trigger" title="Fontara (Ctrl+Shift+F)">Fa</button>
    `,this.attachListeners()}renderHeader(){return`
      <div class="fn-header">
        <div style="display:flex;align-items:center;gap:6px;">
          <span class="fn-title">Fontara</span>
          ${this.s.licenseValid?'<span class="fn-badge fn-badge-pro">PRO</span>':`<span class="fn-badge">FREE</span>
         <button class="fn-activate-link" id="fn-activate-link">Activate</button>`}
        </div>
        <div style="display:flex;align-items:center;gap:2px;">
          <button class="fn-header-btn" id="fn-undo" title="Undo (Ctrl+Z)"
            ${this.s.undoStack.length===0?'disabled style="opacity:0.3;cursor:default;"':""}>↩</button>
          <button class="fn-header-btn" id="fn-redo" title="Redo (Ctrl+Y)"
            ${this.s.redoStack.length===0?'disabled style="opacity:0.3;cursor:default;"':""}>↪</button>
          <button class="fn-header-btn" id="fn-theme-toggle"
            title="${this.s.theme==="dark"?"Switch to light mode":"Switch to dark mode"}">
            ${this.s.theme==="dark"?"☀":"🌙"}
          </button>
          <button class="fn-header-btn" id="fn-shortcuts-btn" title="Keyboard shortcuts (?)">⌨</button>
          <button class="fn-close" id="fn-close">✕</button>
        </div>
      </div>
    `}renderShortcutsOverlay(){return`
      <div class="fn-shortcuts-overlay">
        <div class="fn-shortcuts-title">Keyboard Shortcuts</div>
        <div class="fn-shortcut-row">
          <span>Toggle panel</span>
          <span class="fn-kbd">Ctrl+Shift+F</span>
        </div>
        <div class="fn-shortcut-row">
          <span>Close / Cancel</span>
          <span class="fn-kbd">Esc</span>
        </div>
        <div class="fn-shortcut-row">
          <span>Undo</span>
          <span class="fn-kbd">Ctrl+Z</span>
        </div>
        <div class="fn-shortcut-row">
          <span>Redo</span>
          <span class="fn-kbd">Ctrl+Y</span>
        </div>
        <div class="fn-shortcut-row">
          <span>Fonts / Settings / Presets</span>
          <span class="fn-kbd">1 / 2 / 3</span>
        </div>
        <div class="fn-shortcut-row">
          <span>This help</span>
          <span class="fn-kbd">?</span>
        </div>
        <button class="fn-shortcuts-close" id="fn-shortcuts-close">Close</button>
      </div>
    `}renderActivationModal(){return`
      <div id="fontara-activation">
        <div class="fn-activation-box">
          <h2>Activate Fontara PRO</h2>
          <p>Enter your license key to unlock PRO features.</p>
          <input class="fn-key-input" id="fn-license-key" type="text"
            placeholder="FTPR-XXXX-XXXX-XXXX-XXXX" autocomplete="off" spellcheck="false" />
          <p class="fn-key-error" id="fn-license-error"></p>
          <button class="fn-submit-btn" id="fn-license-submit">Activate</button>
          <p class="fn-activation-footer">
            <a href="#" id="fn-activation-cancel">Cancel</a>
          </p>
        </div>
      </div>
    `}renderTabs(){return`
      <div class="fn-tabs">
        ${[["fonts","Fonts"],["settings","Settings"],["presets","Presets"]].map(([t,n])=>`<button class="fn-tab ${this.s.tab===t?"active":""}" data-tab="${t}">${n}</button>`).join("")}
      </div>
    `}renderFontsTab(){const e=this.s.activeGroupIds[0]??"h1",t=g.find(a=>a.id===e),n=this.s.elementStyles[e]?.font??t.defaultFont,s=this.s.elementStyles[e]?.weight??t.defaultWeight,r=N(n),l=R(this.s.searchQuery,this.s.category),o=S(n),i=this.s.activeGroupIds.length>1,c=this.s.elementStyles[e];return`
      <!-- Element group chips -->
      <div class="fn-section" style="padding-bottom:8px;">
        <div class="fn-label">
          Element ${i?`<span style="color:var(--fn-accent);">(${this.s.activeGroupIds.length} selected)</span>`:""}
          <span style="font-size:9px;color:var(--fn-text-faint);font-weight:400;margin-left:4px;">ctrl+click to multi-select</span>
        </div>
        <div class="fn-element-chips">
          ${g.map(a=>`
            <button class="fn-chip ${this.s.activeGroupIds.includes(a.id)?"active":""}"
              data-group="${a.id}"
              title="${this.s.elementStyles[a.id]?.font??a.defaultFont}">
              ${a.label}
            </button>
          `).join("")}
        </div>
        <div class="fn-current-element">
          ${i?`Editing <strong>${this.s.activeGroupIds.map(a=>g.find(f=>f.id===a)?.label).join(", ")}</strong> simultaneously`:`Editing <strong>${t.label}</strong>:
               <span style="font-family:'${this.esc(n)}',system-ui;font-weight:${s};">
                 ${n} ${s}
               </span>`}
        </div>
      </div>

      <!-- Search + category -->
      <div class="fn-section" style="padding-top:0;">
        <input class="fn-search" id="fn-search"
          placeholder="Search ${z.length} fonts…"
          value="${this.esc(this.s.searchQuery)}"
          autocomplete="off" spellcheck="false" />
        <div class="fn-cats">
          ${ce.map(a=>`
            <button class="fn-cat ${this.s.category===a.id?"active":""}" data-cat="${a.id}">${a.label}</button>
          `).join("")}
          <button class="fn-cat fn-cat-custom ${this.s.category===b?"active":""}" data-cat="${b}">My Fonts${this.s.customFonts.length>0?` (${this.s.customFonts.length})`:""}</button>
        </div>

        <!-- Font list -->
        <div class="fn-font-list ${this.s.customFontDropActive?"fn-drop-active":""}" id="fn-font-list">
          ${this.s.category===b?this.renderCustomFontItems():this.renderFontItems(l,n)}
        </div>
      </div>

      <!-- Weight picker -->
      ${o&&o.weights.length>1?`
        <div class="fn-section" style="padding-top:0;">
          <div class="fn-label">Weight</div>
          <div class="fn-weights">
            ${o.weights.map(a=>`
              <button class="fn-weight-btn ${a===s?"active":""}"
                data-weight="${a}" style="font-weight:${a};">
                ${j[a]??a}
              </button>
            `).join("")}
          </div>
        </div>
      `:""}

      <!-- Variable font axes -->
      ${o?.variable&&!i?`
        <div class="fn-section" style="padding-top:0;">
          <div class="fn-varfont-section">
            <div class="fn-label">Variable Font Axes</div>
            ${o.wdth&&this.s.licenseValid?`
              <div class="fn-setting-row">
                <div class="fn-setting-label">
                  <span>Stretch</span>
                  <span class="fn-val" id="fn-val-stretch">${c?.fontStretch??100}%</span>
                </div>
                <input type="range" class="fn-slider" id="fn-font-stretch"
                  min="${o.wdth[0]}" max="${o.wdth[1]}" step="1" value="${Math.max(o.wdth[0],Math.min(o.wdth[1],c?.fontStretch??100))}" />
              </div>
            `:""}
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:11px;font-weight:600;color:var(--fn-text-secondary);">Style</span>
              <button class="fn-italic-toggle ${c?.fontStyle==="italic"?"active":""}"
                id="fn-italic-toggle">Italic</button>
            </div>
          </div>
        </div>
      `:""}

      <!-- Suggestions (body group only) -->
      ${r.length>0&&!t.isHeading?`
        <div class="fn-section" style="padding-top:0;">
          <div class="fn-label">Pairs with ${this.esc(this.s.elementStyles.h1?.font??"heading")}</div>
          <div class="fn-suggestions">
            ${r.map(a=>`
              <button class="fn-suggestion ${n===a?"active":""}" data-suggest="${this.esc(a)}">${a}</button>
            `).join("")}
          </div>
        </div>
      `:""}
    `}renderFontItems(e,t){return e.length===0?`<p class="fn-empty">No fonts match "${this.esc(this.s.searchQuery)}"</p>`:e.slice(0,100).map(n=>`
      <div class="fn-font-item ${n.family===t?"selected":""}"
        data-font="${this.esc(n.family)}">
        <span class="fn-font-name">${n.family}</span>
        <span class="fn-font-preview" style="font-family:'${this.esc(n.family)}',system-ui">Aa</span>
      </div>
    `).join("")}renderCustomFontItems(){const e=this.s.elementStyles[this.s.activeGroupIds[0]??"h1"]?.font??"";return this.s.customFonts.length===0?`
        <div class="fn-drop-zone" id="fn-custom-drop-zone">
          <div class="fn-drop-zone-icon">⬆</div>
          <div class="fn-drop-zone-text">Drop a font file here</div>
          <div class="fn-drop-zone-sub">.ttf · .otf · .woff · .woff2</div>
          <label class="fn-drop-zone-browse">
            <input type="file" id="fn-custom-font-file" accept=".ttf,.otf,.woff,.woff2" style="display:none;" />
            or browse files
          </label>
        </div>
      `:`
      ${this.s.customFonts.map(t=>`
        <div class="fn-font-item fn-custom-font-item ${t.name===e?"selected":""}"
          data-font="${this.esc(t.name)}">
          <span class="fn-font-name">${this.esc(t.name)}</span>
          <span class="fn-font-preview" style="font-family:'${this.esc(t.name)}',system-ui">Aa</span>
          <button class="fn-custom-font-delete" data-delete-font="${this.esc(t.id)}" title="Remove">✕</button>
        </div>
      `).join("")}
      <div class="fn-drop-zone fn-drop-zone-sm" id="fn-custom-drop-zone">
        <span class="fn-drop-zone-icon" style="font-size:14px;">⬆</span>
        <span class="fn-drop-zone-text">Drop another font</span>
        <label class="fn-drop-zone-browse" style="margin-left:auto;">
          <input type="file" id="fn-custom-font-file" accept=".ttf,.otf,.woff,.woff2" style="display:none;" />
          browse
        </label>
      </div>
    `}renderCustomFontModal(){return`
      <div id="fontara-custom-font-modal" style="position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:2147483647;display:flex;align-items:center;justify-content:center;">
        <div style="background:var(--fn-bg);border:1px solid var(--fn-border);border-radius:12px;padding:20px;width:280px;box-shadow:0 8px 32px rgba(0,0,0,0.4);">
          <h3 style="font-size:14px;font-weight:700;color:var(--fn-text);margin:0 0 4px;">Name your font</h3>
          <p style="font-size:11px;color:var(--fn-text-secondary);margin:0 0 12px;">File: <strong>${this.esc(this.s.pendingFontFileName)}</strong></p>
          <input class="fn-key-input" id="fn-custom-font-name" type="text"
            value="${this.esc(this.s.pendingFontName)}"
            placeholder="e.g. MyBrandFont"
            autocomplete="off" spellcheck="false" maxlength="60" />
          <p style="font-size:10px;color:var(--fn-text-faint);margin:4px 0 10px;">This becomes the CSS font-family name.</p>
          <div style="display:flex;gap:8px;">
            <button class="fn-submit-btn" id="fn-custom-font-save" style="flex:1;padding:8px 0;">Add Font</button>
            <button class="fn-btn" id="fn-custom-font-cancel" style="flex:0;padding:0 14px;">Cancel</button>
          </div>
        </div>
      </div>
    `}renderSettingsTab(){const e=this.s.activeGroupIds[0]??"h1",t=this.s.elementStyles[e],n=g.find(p=>p.id===e),s=this.s.activeGroupIds.length>1,r=t.textColor??(this.s.theme==="dark"?"#f1f5f9":"#111827"),l=this.s.contrastBg,o=ue(r,l),i=o!=null?o.toFixed(2):"—",c=o!=null&&o>=4.5,a=o!=null&&o>=3,f=o!=null&&o>=7;return`
      <div class="fn-section">
        <div class="fn-label" style="margin-bottom:10px;">
          Settings for
          <strong style="color:var(--fn-text-secondary);">
            ${s?this.s.activeGroupIds.map(p=>g.find(m=>m.id===p)?.label).join(", "):n.label}
          </strong>
          ${s?'<span style="color:var(--fn-accent);font-size:9px;"> — applied to all selected</span>':""}
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

        <div class="fn-setting-row">
          <div class="fn-setting-label">
            <span>Text color</span>
            ${t.textColor?'<button class="fn-color-reset" id="fn-color-reset">Reset</button>':""}
          </div>
          <div class="fn-color-row">
            <div class="fn-color-swatch-box" id="fn-color-swatch-box"
              style="background:${this.esc(t.textColor??(this.s.theme==="dark"?"#f1f5f9":"#111827"))};"
              title="${this.s.colorPickerOpen?"Close picker":"Open color picker"}"></div>
            <input type="text" class="fn-color-hex" id="fn-text-color-hex"
              value="${this.esc(t.textColor??"")}"
              placeholder="#hex" maxlength="7" spellcheck="false" autocomplete="off" />
          </div>
          ${this.s.colorPickerOpen?this.renderColorPicker():""}
        </div>

        <!-- PRO Typography (always visible for PRO users) -->
        <div style="border-top:1px solid var(--fn-border-light);padding-top:8px;margin-bottom:12px;">
          ${this.s.licenseValid?`
            <div class="fn-label" style="margin-bottom:8px;display:flex;align-items:center;">Typography<i class="fn-tip" data-tip="Text transform &amp; word spacing">i</i></div>
            <div class="fn-setting-row">
              <div class="fn-setting-label" style="margin-bottom:6px;"><span>Text transform</span></div>
              <div style="display:flex;gap:4px;">
                ${["none","uppercase","lowercase","capitalize"].map(p=>`
                  <button class="fn-tt-btn${(t.textTransform??"none")===p?" fn-tt-active":""}"
                    data-tt="${p}">${p==="none"?"Aa":p==="uppercase"?"AA":p==="lowercase"?"aa":"Aa↑"}</button>
                `).join("")}
              </div>
            </div>
            <div class="fn-setting-row">
              <div class="fn-setting-label">
                <span>Word spacing</span>
                <span class="fn-val" id="fn-val-wspace">${((t.wordSpacing??0)*1e3).toFixed(0)}‰</span>
              </div>
              <input type="range" class="fn-slider" id="fn-word-spacing"
                min="-50" max="300" step="5" value="${(t.wordSpacing??0)*1e3}" />
            </div>
          `:`
            <div class="fn-collapsible-header" id="fn-typo-pro-upsell">
              <span class="fn-label" style="margin-bottom:0;display:flex;align-items:center;">Typography Pro <span class="fn-pro-inline">PRO</span><i class="fn-tip" data-tip="Text transform, word spacing &amp; advanced type controls">i</i></span>
              <span class="fn-collapsible-arrow">▶</span>
            </div>
          `}
        </div>

        <!-- Contrast checker (collapsible) -->
        <div style="border-top:1px solid var(--fn-border-light);padding-top:8px;margin-bottom:12px;">
          <div class="fn-collapsible-header" id="${this.s.licenseValid?"fn-contrast-toggle":"fn-contrast-pro-upsell"}">
            <span class="fn-label" style="margin-bottom:0;display:flex;align-items:center;">Contrast (A11y)${this.s.licenseValid?"":' <span class="fn-pro-inline">PRO</span>'}<i class="fn-tip" data-tip="Check WCAG contrast ratio between your text and background">i</i></span>
            <span class="fn-collapsible-arrow ${this.s.contrastOpen&&this.s.licenseValid?"open":""}">▶</span>
          </div>
          ${this.s.contrastOpen&&this.s.licenseValid?`
            <div style="margin-top:8px;">
              <div class="fn-contrast-row">
                <div>
                  <div style="font-size:10px;color:var(--fn-text-faint);margin-bottom:3px;">Background</div>
                  <input type="color" class="fn-contrast-swatch" id="fn-contrast-bg" value="${this.esc(l)}" />
                </div>
                <div style="flex:1;">
                  <div style="font-size:10px;color:var(--fn-text-faint);margin-bottom:2px;">Ratio</div>
                  <div class="fn-contrast-ratio">${i}:1</div>
                </div>
              </div>
              <div class="fn-contrast-badges">
                <span class="fn-contrast-badge ${c?"fn-contrast-pass":"fn-contrast-fail"}">AA ${c?"✓":"✗"}</span>
                <span class="fn-contrast-badge ${a?"fn-contrast-pass":"fn-contrast-fail"}">AA Large ${a?"✓":"✗"}</span>
                <span class="fn-contrast-badge ${f?"fn-contrast-pass":"fn-contrast-fail"}">AAA ${f?"✓":"✗"}</span>
              </div>
              <div style="font-size:10px;color:var(--fn-text-faint);margin-top:6px;">
                Text: <code style="font-family:monospace !important;letter-spacing:0 !important;">${r}</code>
              </div>
            </div>
          `:""}
        </div>

        <!-- Advanced / Custom selectors (collapsible) -->
        <div style="border-top:1px solid var(--fn-border-light);padding-top:8px;margin-bottom:8px;">
          <div class="fn-collapsible-header" id="${this.s.licenseValid?"fn-advanced-toggle":"fn-advanced-pro-upsell"}">
            <span class="fn-label" style="margin-bottom:0;display:flex;align-items:center;">Advanced${this.s.licenseValid?"":' <span class="fn-pro-inline">PRO</span>'}<i class="fn-tip" data-tip="Override CSS selectors for precise element targeting">i</i></span>
            <span class="fn-collapsible-arrow ${this.s.advancedOpen&&this.s.licenseValid?"open":""}">▶</span>
          </div>
          ${this.s.advancedOpen&&this.s.licenseValid?`
            <div style="margin-top:8px;">
              <div class="fn-setting-label" style="margin-bottom:4px;">
                <span>CSS Selector</span>
              </div>
              <input class="fn-selector-input" id="fn-custom-selector"
                value="${this.esc(t.customSelectors??n.selectors)}"
                placeholder="${this.esc(n.selectors)}"
                spellcheck="false" autocomplete="off" />
              <div style="font-size:10px;color:var(--fn-text-faint);margin-top:4px;">
                Overrides default selector for this group.
              </div>
            </div>
          `:""}
        </div>

        <button class="fn-btn-reset-settings" id="fn-reset-settings">
          Reset ${n.label} to defaults
        </button>
      </div>
    `}renderColorPicker(){const e=this.s.pickerH,t=this.s.pickerS,n=this.s.pickerV;return`
      <div class="fn-color-picker" id="fn-color-picker">
        <div class="fn-cpicker-sv" id="fn-cpicker-sv" style="background:hsl(${e},100%,50%);">
          <div class="fn-cpicker-sv-white"></div>
          <div class="fn-cpicker-sv-black"></div>
          <div class="fn-cpicker-sv-thumb" id="fn-cpicker-sv-thumb"
            style="left:${t}%;top:${100-n}%;"></div>
        </div>
        <div class="fn-cpicker-hue" id="fn-cpicker-hue">
          <div class="fn-cpicker-hue-thumb" id="fn-cpicker-hue-thumb"
            style="left:${e/360*100}%;"></div>
        </div>
      </div>
    `}renderPresetsTab(){const e=M.length-8;return`
      <div class="fn-presets-list" id="fn-presets-list">
        ${this.s.licenseValid?`
      <div class="fn-saved-section">
        <div class="fn-label" style="margin-bottom:6px;">My Presets</div>
        <div class="fn-save-preset-row">
          <input class="fn-save-preset-input" id="fn-preset-name"
            placeholder="Name this setup…"
            value="${this.esc(this.s.presetNameInput)}"
            spellcheck="false" autocomplete="off" maxlength="80" />
          <button class="fn-save-preset-btn" id="fn-save-preset">Save</button>
        </div>
        ${this.s.presetSaveError?`<p style="font-size:10px;color:#f87171;margin:2px 0 4px;line-height:1.4;">${this.esc(this.s.presetSaveError)}</p>`:""}
        ${this.s.savedPresets.length>0?this.s.savedPresets.map(n=>`
              <div class="fn-saved-preset-card" data-saved-preset="${this.esc(n.id)}">
                <span class="fn-saved-preset-name">${this.esc(n.name)}</span>
                <span style="font-size:10px;color:var(--fn-text-faint);margin-right:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90px;">
                  ${this.esc(n.headingFont)} + ${this.esc(n.bodyFont)}
                </span>
                <button class="fn-preset-delete-btn" data-delete-preset="${this.esc(n.id)}" title="Delete">✕</button>
              </div>
            `).join(""):'<p class="fn-empty" style="padding:2px 0 6px;">No saved presets yet.</p>'}
      </div>
      <div class="fn-presets-divider"></div>
    `:`
      <div style="margin-bottom:10px;padding:9px 11px;background:rgba(124,58,237,0.07);border:1px solid rgba(124,58,237,0.2);border-radius:9px;">
        <p style="font-size:11px;font-weight:600;color:rgba(124,58,237,0.95);margin:0 0 2px;">Save your own presets</p>
        <p style="font-size:10px;color:var(--fn-text-faint);margin:0 0 7px;line-height:1.45;">+ unlock ${e} more font pairings with PRO</p>
        <button id="fn-upsell-preset" style="width:100%;padding:5px 0;border:none;border-radius:6px;background:rgba(124,58,237,0.85);color:white;font-size:11px;font-weight:600;cursor:pointer;letter-spacing:-0.01em;">Unlock PRO →</button>
      </div>
    `}
        ${M.map((n,s)=>{const r=!this.s.licenseValid&&s>=8;return`
            <button class="fn-preset-card${r?" fn-preset-locked":""}"
              data-preset-id="${n.id}"${r?' data-preset-locked="1"':""}>
              <div class="fn-preset-heading"
                style="font-family:'${this.esc(n.headingFont)}',serif;font-weight:${n.headingWeight};">
                ${n.headingFont}${r?' <span class="fn-preset-lock-badge">🔒 PRO</span>':""}
              </div>
              <div class="fn-preset-body"
                style="font-family:'${this.esc(n.bodyFont)}',sans-serif;">
                ${n.bodyFont} — ${n.description}
              </div>
              <div class="fn-preset-tags">
                ${n.tags.map(l=>`<span class="fn-tag">${l}</span>`).join("")}
              </div>
            </button>
          `}).join("")}
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
        <button class="fn-btn fn-btn-primary" id="fn-export">Export ▾</button>
      </div>
    `}renderExportModal(){const e=this.s.licenseValid,t=!e;return`
      <div class="fn-export-modal" id="fn-export-modal">
        <button class="fn-export-opt" data-export-format="css">CSS</button>
        <button class="fn-export-opt${t?" fn-export-opt-locked":""}"
          data-export-format="json"${t?' data-export-locked="1"':""}>
          JSON${t?" 🔒":""}
        </button>
        <button class="fn-export-opt${t?" fn-export-opt-locked":""}"
          data-export-format="tailwind"${t?' data-export-locked="1"':""}>
          Tailwind${t?" 🔒":""}
        </button>
        <button class="fn-export-opt${t?" fn-export-opt-locked":""}"
          data-export-format="cssvars"${t?' data-export-locked="1"':""}>
          CSS Vars${t?" 🔒":""}
        </button>
        <button class="fn-export-opt${t?" fn-export-opt-locked":""}"
          data-export-format="figma"${t?' data-export-locked="1"':""}>
          Figma${t?" 🔒":""}
        </button>
        ${e?`<div class="fn-export-prefix">
          <label>Prefix</label>
          <input id="fn-css-prefix" type="text" value="${this.s.cssPrefix}" placeholder="fn" maxlength="20" spellcheck="false" />
        </div>`:""}
      </div>
    `}attachListeners(){this.attachTriggerDrag(),this.q("#fn-close")?.addEventListener("click",()=>this.togglePanel()),this.q("#fn-undo")?.addEventListener("click",()=>this.undo()),this.q("#fn-redo")?.addEventListener("click",()=>this.redo()),this.q("#fn-theme-toggle")?.addEventListener("click",()=>{this.s.theme=this.s.theme==="dark"?"light":"dark",this.root.classList.toggle("dark",this.s.theme==="dark"),this.saveSession(),this.rerender()}),this.q("#fn-shortcuts-btn")?.addEventListener("click",()=>{this.s.showShortcutsHelp=!this.s.showShortcutsHelp,this.rerender()}),this.q("#fn-shortcuts-close")?.addEventListener("click",()=>{this.s.showShortcutsHelp=!1,this.rerender()}),this.q("#fn-activate-link")?.addEventListener("click",()=>{this.s.showActivationModal=!0,this.rerender()}),this.q("#fn-activation-cancel")?.addEventListener("click",i=>{i.preventDefault(),this.s.showActivationModal=!1,this.rerender()}),this.q("#fn-license-submit")?.addEventListener("click",()=>this.handleLicenseSubmit()),this.q("#fn-license-key")?.addEventListener("keydown",i=>{i.key==="Enter"&&this.handleLicenseSubmit()}),this.q("#fn-reset")?.addEventListener("click",()=>{this.pushUndo(),ne(),this.s.elementStyles=U();try{localStorage.removeItem("fontara_session_v3")}catch{}this.rerender()}),this.q("#fn-export")?.addEventListener("click",i=>{i.stopPropagation(),this.s.showExportModal=!this.s.showExportModal,this.rerender()}),this.root.querySelectorAll("[data-export-format]").forEach(i=>i.addEventListener("click",()=>{if(i.dataset.exportLocked){this.s.showExportModal=!1,this.s.showActivationModal=!0,this.rerender();return}const c=i.dataset.exportFormat;this.s.showExportModal=!1,this.handleExport(c)})),this.q("#fn-css-prefix")?.addEventListener("input",i=>{this.s.cssPrefix=i.target.value}),this.s.showExportModal&&requestAnimationFrame(()=>{document.addEventListener("click",()=>{this.s.showExportModal=!1,this.rerender()},{once:!0})}),this.q("#fn-pick-element")?.addEventListener("click",()=>this.toggleInspect()),this.root.querySelectorAll(".fn-tab").forEach(i=>i.addEventListener("click",()=>{this.s.colorPickerOpen=!1,this.s.tab=i.dataset.tab,this.rerender()})),this.root.querySelectorAll(".fn-chip[data-group]").forEach(i=>i.addEventListener("click",c=>{this.s.colorPickerOpen=!1;const a=i.dataset.group;c.ctrlKey||c.metaKey?this.s.activeGroupIds.includes(a)?(this.s.activeGroupIds=this.s.activeGroupIds.filter(f=>f!==a),this.s.activeGroupIds.length===0&&(this.s.activeGroupIds=[a])):this.s.activeGroupIds=[...this.s.activeGroupIds,a]:this.s.activeGroupIds=[a],this.rerender()}));const e=this.q("#fn-search");e?.addEventListener("input",()=>{this.s.searchQuery=e.value,this.lightUpdateFontList()}),this.root.querySelectorAll(".fn-cat").forEach(i=>i.addEventListener("click",()=>{const c=i.dataset.cat,a=c===b||this.s.category===b;this.s.category=c,a?this.rerender():this.lightUpdateFontList()})),this.attachFontItemListeners(),this.s.category===b&&this.attachCustomFontListeners(),this.q("#fn-custom-font-save")?.addEventListener("click",()=>{const c=(this.q("#fn-custom-font-name")?.value??this.s.pendingFontName).trim();if(!c||!this.s.pendingFontData)return;const f={id:`cf_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,name:c,dataUrl:this.s.pendingFontData};this.injectFontFace(f),this.s.customFonts=[...this.s.customFonts,f],this.saveCustomFonts(),this.s.customFontModal=!1,this.s.pendingFontData=null,this.s.pendingFontFileName="",this.s.pendingFontName="",this.s.tab="fonts",this.s.category=b,this.rerender()}),this.q("#fn-custom-font-cancel")?.addEventListener("click",()=>{this.s.customFontModal=!1,this.s.pendingFontData=null,this.s.pendingFontFileName="",this.s.pendingFontName="",this.rerender()}),this.q("#fn-custom-font-name")?.addEventListener("keydown",i=>{i.key==="Enter"&&this.q("#fn-custom-font-save")?.click()}),this.root.querySelectorAll(".fn-weight-btn").forEach(i=>i.addEventListener("click",()=>{this.pushUndo();const c=i.dataset.weight;for(const a of this.s.activeGroupIds)this.s.elementStyles[a].weight=c;this.applyStyles(),this.saveSession(),this.rerender()})),this.root.querySelectorAll(".fn-suggestion").forEach(i=>i.addEventListener("click",()=>this.selectFont(i.dataset.suggest))),this.root.querySelectorAll(".fn-preset-card").forEach(i=>i.addEventListener("click",()=>{if(i.dataset.presetLocked){this.s.showActivationModal=!0,this.rerender();return}const c=M.find(a=>a.id===i.dataset.presetId);if(c){this.pushUndo();for(const a of g)a.isHeading?(this.s.elementStyles[a.id].font=c.headingFont,this.s.elementStyles[a.id].weight=c.headingWeight):a.id==="body"&&(this.s.elementStyles[a.id].font=c.bodyFont,this.s.elementStyles[a.id].weight=c.bodyWeight);this.preloadAllFonts(),this.applyStyles(),this.saveSession(),this.rerender()}}));const t=this.q("#fn-font-stretch");t&&(t.addEventListener("input",()=>{const i=parseInt(t.value,10),c=this.s.activeGroupIds[0]??"h1";this.s.elementStyles[c].fontStretch=i;const a=this.q("#fn-val-stretch");a&&(a.textContent=`${i}%`),this.applyStyles(),this.saveSession()}),t.addEventListener("change",()=>this.pushUndo())),this.q("#fn-italic-toggle")?.addEventListener("click",()=>{this.pushUndo();const i=this.s.activeGroupIds[0]??"h1",c=this.s.elementStyles[i].fontStyle;this.s.elementStyles[i].fontStyle=c==="italic"?"normal":"italic",this.applyStyles(),this.saveSession(),this.rerender()}),this.attachSettingsListeners(),this.q("#fn-reset-settings")?.addEventListener("click",()=>{this.pushUndo();for(const i of this.s.activeGroupIds){const c=g.find(a=>a.id===i);this.s.elementStyles[i]={font:c.defaultFont,weight:c.defaultWeight,fontSize:c.defaultFontSize,lineHeight:c.defaultLineHeight,tracking:c.defaultTracking}}this.applyStyles(),this.saveSession(),this.rerender()}),this.q("#fn-typo-pro-upsell")?.addEventListener("click",()=>{this.s.showActivationModal=!0,this.rerender()}),this.root.querySelectorAll("[data-tt]").forEach(i=>{i.addEventListener("click",()=>{this.pushUndo();const c=i.dataset.tt;for(const a of this.s.activeGroupIds)this.s.elementStyles[a].textTransform=c;this.applyStyles(),this.saveSession(),this.rerender()})});const n=this.q("#fn-word-spacing");n&&(n.addEventListener("input",()=>{const i=parseFloat(n.value)*.001;for(const a of this.s.activeGroupIds)this.s.elementStyles[a].wordSpacing=i;const c=this.q("#fn-val-wspace");c&&(c.textContent=`${(i*1e3).toFixed(0)}‰`),this.applyStyles(),this.saveSession()}),n.addEventListener("change",()=>this.pushUndo())),this.q("#fn-advanced-toggle")?.addEventListener("click",()=>{this.s.advancedOpen=!this.s.advancedOpen,this.rerender()}),this.q("#fn-advanced-pro-upsell")?.addEventListener("click",()=>{this.s.showActivationModal=!0,this.rerender()}),this.q("#fn-contrast-toggle")?.addEventListener("click",()=>{this.s.contrastOpen=!this.s.contrastOpen,this.rerender()}),this.q("#fn-contrast-pro-upsell")?.addEventListener("click",()=>{this.s.showActivationModal=!0,this.rerender()});const s=this.q("#fn-custom-selector");s&&s.addEventListener("change",()=>{const i=s.value.trim();for(const c of this.s.activeGroupIds)this.s.elementStyles[c].customSelectors=i||void 0;this.applyStyles(),this.saveSession()});const r=this.q("#fn-contrast-bg");r&&r.addEventListener("input",()=>{this.s.contrastBg=r.value,this.rerender()}),this.q("#fn-color-swatch-box")?.addEventListener("click",()=>{if(!this.s.colorPickerOpen){const i=this.s.activeGroupIds[0]??"h1",c=this.s.elementStyles[i],a=this.s.theme==="dark"?"#f1f5f9":"#111827",[f,p,m]=K(c.textColor??a);this.s.pickerH=f,this.s.pickerS=p,this.s.pickerV=m}this.s.colorPickerOpen=!this.s.colorPickerOpen,this.rerender()});const l=this.q("#fn-text-color-hex");l&&(l.addEventListener("input",()=>{const i=l.value.trim();if(/^#[0-9a-fA-F]{6}$/.test(i)){for(const p of this.s.activeGroupIds)this.s.elementStyles[p].textColor=i;const[c,a,f]=K(i);if(this.s.pickerH=c,this.s.pickerS=a,this.s.pickerV=f,this.s.colorPickerOpen){const p=this.q("#fn-cpicker-sv"),m=this.q("#fn-cpicker-sv-thumb"),k=this.q("#fn-cpicker-hue-thumb");p&&(p.style.background=`hsl(${c},100%,50%)`),m&&(m.style.left=`${a}%`,m.style.top=`${100-f}%`),k&&(k.style.left=`${c/360*100}%`);const L=this.q("#fn-color-swatch-box");L&&(L.style.background=i)}this.applyStyles(),this.saveSession()}}),l.addEventListener("change",()=>this.pushUndo())),this.s.colorPickerOpen&&this.attachColorPickerListeners(),this.q("#fn-color-reset")?.addEventListener("click",()=>{this.pushUndo();for(const i of this.s.activeGroupIds)delete this.s.elementStyles[i].textColor;this.applyStyles(),this.saveSession(),this.rerender()}),this.q("#fn-upsell-preset")?.addEventListener("click",()=>{this.s.showActivationModal=!0,this.rerender()});const o=this.q("#fn-preset-name");o&&(o.addEventListener("input",()=>{this.s.presetNameInput=o.value}),o.addEventListener("keydown",i=>{i.key==="Enter"&&this.savePreset(o.value)})),this.q("#fn-save-preset")?.addEventListener("click",()=>{const i=this.q("#fn-preset-name");i&&this.savePreset(i.value)}),this.root.querySelectorAll("[data-saved-preset]").forEach(i=>i.addEventListener("click",c=>{if(c.target.closest("[data-delete-preset]"))return;const a=this.s.savedPresets.find(f=>f.id===i.dataset.savedPreset);if(a){if(this.pushUndo(),a.config&&Object.keys(a.config).length>0)this.s.elementStyles=E(a.config);else for(const f of g)f.isHeading?(this.s.elementStyles[f.id].font=a.headingFont,this.s.elementStyles[f.id].weight=a.headingWeight):f.id==="body"&&(this.s.elementStyles[f.id].font=a.bodyFont,this.s.elementStyles[f.id].weight=a.bodyWeight);this.preloadAllFonts(),this.applyStyles(),this.saveSession(),this.rerender()}})),this.root.querySelectorAll("[data-delete-preset]").forEach(i=>i.addEventListener("click",c=>{c.stopPropagation(),this.deletePreset(i.dataset.deletePreset)})),this.attachPresetCardFontLoading()}attachColorPickerListeners(){const e=this.q("#fn-cpicker-sv"),t=this.q("#fn-cpicker-hue"),n=this.q("#fn-cpicker-sv-thumb"),s=this.q("#fn-cpicker-hue-thumb");if(!e||!t)return;const r=(i,c,a)=>{this.s.pickerH=i,this.s.pickerS=c,this.s.pickerV=a;const f=me(i,c,a);for(const k of this.s.activeGroupIds)this.s.elementStyles[k].textColor=f;this.applyStyles(),this.saveSession();const p=this.q("#fn-color-swatch-box");p&&(p.style.background=f);const m=this.q("#fn-text-color-hex");m&&(m.value=f)},l=(i,c)=>{const a=e.getBoundingClientRect(),f=Math.round(Math.max(0,Math.min(1,(i-a.left)/a.width))*100),p=Math.round(Math.max(0,Math.min(1,1-(c-a.top)/a.height))*100);n&&(n.style.left=`${f}%`,n.style.top=`${100-p}%`),r(this.s.pickerH,f,p)};e.addEventListener("mousedown",i=>{i.preventDefault(),l(i.clientX,i.clientY);const c=f=>{f.preventDefault(),l(f.clientX,f.clientY)},a=()=>{this.pushUndo(),document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",c),document.addEventListener("mouseup",a)}),e.addEventListener("touchstart",i=>{i.preventDefault(),l(i.touches[0].clientX,i.touches[0].clientY);const c=f=>{f.preventDefault(),l(f.touches[0].clientX,f.touches[0].clientY)},a=()=>{this.pushUndo(),e.removeEventListener("touchmove",c),e.removeEventListener("touchend",a)};e.addEventListener("touchmove",c,{passive:!1}),e.addEventListener("touchend",a)},{passive:!1});const o=i=>{const c=t.getBoundingClientRect(),a=Math.round(Math.max(0,Math.min(1,(i-c.left)/c.width))*360);s&&(s.style.left=`${a/360*100}%`),e.style.background=`hsl(${a},100%,50%)`,r(a,this.s.pickerS,this.s.pickerV)};t.addEventListener("mousedown",i=>{i.preventDefault(),o(i.clientX);const c=f=>{f.preventDefault(),o(f.clientX)},a=()=>{this.pushUndo(),document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",c),document.addEventListener("mouseup",a)}),t.addEventListener("touchstart",i=>{i.preventDefault(),o(i.touches[0].clientX);const c=f=>{f.preventDefault(),o(f.touches[0].clientX)},a=()=>{this.pushUndo(),t.removeEventListener("touchmove",c),t.removeEventListener("touchend",a)};t.addEventListener("touchmove",c,{passive:!1}),t.addEventListener("touchend",a)},{passive:!1}),requestAnimationFrame(()=>{const i=c=>{const a=this.q("#fn-color-picker"),f=this.q("#fn-color-swatch-box");a&&!a.contains(c.target)&&f&&!f.contains(c.target)&&(this.s.colorPickerOpen=!1,this.rerender(),document.removeEventListener("click",i))};document.addEventListener("click",i)})}attachPresetCardFontLoading(){const e=this.root.querySelectorAll(".fn-preset-card[data-preset-id]");if(!e.length||typeof IntersectionObserver>"u")return;const t=new IntersectionObserver(n=>{n.forEach(s=>{if(!s.isIntersecting)return;const r=s.target,l=M.find(o=>o.id===r.dataset.presetId);if(l){const o=S(l.headingFont);o&&$(l.headingFont,o.weights.slice(0,1),o.wdth);const i=S(l.bodyFont);i&&$(l.bodyFont,i.weights.slice(0,1),i.wdth)}t.unobserve(r)})},{rootMargin:"80px"});e.forEach(n=>t.observe(n))}attachCustomFontListeners(){this.root.querySelectorAll("[data-delete-font]").forEach(t=>t.addEventListener("click",n=>{n.stopPropagation();const s=t.dataset.deleteFont,r=this.s.customFonts.find(l=>l.id===s);if(document.getElementById(`fn-custom-font-${s}`)?.remove(),this.s.customFonts=this.s.customFonts.filter(l=>l.id!==s),r){for(const l of Object.keys(this.s.elementStyles))if(this.s.elementStyles[l].font===r.name){const o=g.find(i=>i.id===l);this.s.elementStyles[l].font=o.defaultFont,this.s.elementStyles[l].weight=o.defaultWeight}this.applyStyles()}this.saveCustomFonts(),this.rerender()}));const e=this.q("#fn-custom-font-file");e&&e.addEventListener("change",()=>{const t=e.files?.[0];t&&(this.handleFontFile(t),e.value="")})}attachTriggerDrag(){const e=this.q("#fontara-trigger"),t=this.q(".fn-header");if(!e)return;let n=!1,s="btn",r=0,l=0,o=0,i=0;const c=(h,y,u)=>Math.max(y,Math.min(u,h)),a=h=>{const y=h.clientX-r,u=h.clientY-l;if(!n&&(Math.abs(y)>4||Math.abs(u)>4)&&(n=!0,s==="btn"&&e.classList.add("dragging"),document.body.style.userSelect="none"),!n)return;const F=c(o-y,0,window.innerWidth-52),A=c(i-u,0,window.innerHeight-52);this.root.style.right=`${F}px`,this.root.style.bottom=`${A}px`},f=()=>{document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",f),s==="btn"&&e.classList.remove("dragging"),document.body.style.userSelect="",n?(this.saveDockPosition(),n=!1):s==="btn"&&this.togglePanel()},p=(h,y)=>{if(h.button!==0)return;h.preventDefault(),s=y,n=!1,r=h.clientX,l=h.clientY;const u=this.root.getBoundingClientRect();o=window.innerWidth-u.right,i=window.innerHeight-u.bottom,document.addEventListener("mousemove",a),document.addEventListener("mouseup",f)};e.addEventListener("mousedown",h=>p(h,"btn")),t&&t.addEventListener("mousedown",h=>{h.target.closest("button")||p(h,"header")});let m=null,k=!1;const L=(h,y)=>{if(h.touches.length!==1)return;h.preventDefault();const u=h.touches[0];m=u.identifier,k=y,n=!1,r=u.clientX,l=u.clientY;const F=this.root.getBoundingClientRect();o=window.innerWidth-F.right,i=window.innerHeight-F.bottom},_=h=>{h.preventDefault();const y=Array.from(h.changedTouches).find(be=>be.identifier===m);if(!y)return;const u=y.clientX-r,F=y.clientY-l;if(!n&&(Math.abs(u)>4||Math.abs(F)>4)&&(n=!0),!n)return;const A=c(o-u,0,window.innerWidth-52),ve=c(i-F,0,window.innerHeight-52);this.root.style.right=`${A}px`,this.root.style.bottom=`${ve}px`},X=h=>{Array.from(h.changedTouches).find(u=>u.identifier===m)&&(m=null,n?(this.saveDockPosition(),n=!1):k||this.togglePanel())};e.addEventListener("touchstart",h=>L(h,!1),{passive:!1}),e.addEventListener("touchmove",_,{passive:!1}),e.addEventListener("touchend",X),t&&(t.addEventListener("touchstart",h=>{h.target.closest("button")||L(h,!0)},{passive:!1}),t.addEventListener("touchmove",_,{passive:!1}),t.addEventListener("touchend",X))}attachFontItemListeners(){const e=this.q("#fn-font-list"),t=this.root.querySelectorAll(".fn-font-item");if(t.forEach(n=>n.addEventListener("click",s=>{s.target.closest(".fn-custom-font-delete")||this.selectFont(n.dataset.font)})),e&&typeof IntersectionObserver<"u"){const n=new IntersectionObserver(s=>{s.forEach(r=>{if(r.isIntersecting){const l=r.target.dataset.font;if(l){const o=S(l);o&&$(l,o.weights.slice(0,1),o.wdth)}n.unobserve(r.target)}})},{root:e,rootMargin:"60px"});t.forEach(s=>n.observe(s))}}attachSettingsListeners(){const e=(t,n,s,r,l)=>{const o=this.q(`#${t}`);o&&(o.addEventListener("input",()=>{const i=parseFloat(o.value)*s;for(const a of this.s.activeGroupIds)this.s.elementStyles[a][r]=i;const c=this.q(`#${n}`);c&&(c.textContent=l(i)),this.applyStyles(),this.saveSession()}),o.addEventListener("change",()=>this.pushUndo()))};e("fn-font-size","fn-val-size",1,"fontSize",t=>`${t}px`),e("fn-line-height","fn-val-lh",1,"lineHeight",t=>`${t.toFixed(2)}`),e("fn-tracking","fn-val-track",.001,"tracking",t=>`${(t*1e3).toFixed(0)}‰`)}selectFont(e){const t=S(e),n=this.s.customFonts.some(s=>s.name===e);if(!(!t&&!n)){this.pushUndo();for(const s of this.s.activeGroupIds)if(this.s.elementStyles[s].font=e,t){const l=g.find(o=>o.id===s)?.isHeading??!1?t.weights.includes("700")?"700":t.weights[t.weights.length-1]:t.weights.includes("400")?"400":t.weights[0];this.s.elementStyles[s].weight=l}t&&$(e,t.weights,t.wdth),this.applyStyles(),this.saveSession(),this.lightUpdateAfterFontSelect(e)}}lightUpdateAfterFontSelect(e){const t=this.s.activeGroupIds[0]??"h1",n=this.s.elementStyles[t].weight;this.root.querySelectorAll(".fn-font-item").forEach(i=>{i.classList.toggle("selected",i.dataset.font===e)});const s=this.q(".fn-current-element");if(s&&this.s.activeGroupIds.length===1){const i=g.find(c=>c.id===t);s.innerHTML=`Editing <strong>${i.label}</strong>:
        <span style="font-family:'${this.esc(e)}',system-ui;font-weight:${n};">
          ${e} ${n}
        </span>`}const r=this.q(".fn-active-bar");r&&(r.outerHTML=this.renderActiveBar());const l=this.root.querySelector(".fn-weights")?.closest(".fn-section");if(l){const i=S(e);if(i&&i.weights.length>1){const c=l.querySelector(".fn-weights");c&&(c.innerHTML=i.weights.map(a=>`
            <button class="fn-weight-btn ${a===n?"active":""}"
              data-weight="${a}" style="font-weight:${a};">
              ${j[a]??a}
            </button>
          `).join(""),c.querySelectorAll(".fn-weight-btn").forEach(a=>a.addEventListener("click",()=>{this.pushUndo();for(const f of this.s.activeGroupIds)this.s.elementStyles[f].weight=a.dataset.weight;this.applyStyles(),this.saveSession(),this.rerender()})))}}const o=this.root.querySelector(".fn-suggestions")?.closest(".fn-section");if(o){const i=o.querySelector(".fn-suggestions");if(i){const c=N(e);i.innerHTML=c.map(a=>`
          <button class="fn-suggestion ${e===a?"active":""}" data-suggest="${this.esc(a)}">${a}</button>
        `).join(""),i.querySelectorAll(".fn-suggestion").forEach(a=>a.addEventListener("click",()=>this.selectFont(a.dataset.suggest)))}}}togglePanel(){this.s.open=!this.s.open,this.s.open?this.rerender():(this.q("#fontara-panel")?.classList.add("hidden"),this.q("#fontara-trigger")?.classList.remove("active"))}toggleInspect(){Z()?(C(),this.s.inspecting=!1,this.rerender()):(this.s.inspecting=!0,this.rerender(),Y(e=>{const t=ee(e);this.s.activeGroupIds=[t],this.s.inspecting=!1,this.s.open=!0,this.s.tab="fonts",Q(),this.rerender()}))}async handleExport(e){const t=this.s.customFonts.filter(o=>Object.values(this.s.elementStyles).some(i=>i.font===o.name)),n=t.length>0?t.map(o=>`@font-face {
  font-family: '${o.name}';
  src: url('${o.dataUrl}');
}`).join(`

`)+`

`:"";let s,r;e==="json"?(s=re(this.s.elementStyles),r="JSON"):e==="tailwind"?(s=oe(this.s.elementStyles),r="Tailwind"):e==="cssvars"?(s=ae(this.s.elementStyles,this.s.cssPrefix||"fn"),r="CSS Vars"):e==="figma"?(s=se(this.s.elementStyles),r="Figma"):(s=n+ie(this.s.elementStyles),r="CSS"),await le(s);const l=this.q("#fn-export");if(l){const o=l.textContent;l.textContent=`${r} Copied!`,l.classList.add("fn-btn-success"),setTimeout(()=>{l.textContent=o,l.classList.remove("fn-btn-success")},2e3)}}async handleLicenseSubmit(){const e=this.q("#fn-license-key"),t=this.q("#fn-license-error"),n=this.q("#fn-license-submit");if(!e||!n)return;const s=e.value.trim();if(!s){t&&(t.textContent="Please enter a license key.");return}n.disabled=!0,n.textContent="Verifying…",t&&(t.textContent="");try{const r=await G(s);if(r.valid){this.s.licenseValid=!0,this.s.licenseEmail=r.email??null,this.s.licenseKey=s;try{localStorage.setItem("fontara_v1_cache",JSON.stringify({valid:!0,key:s,email:r.email,expiresAt:r.expiresAt}))}catch{}this.s.showActivationModal=!1,this.rerender(),this.loadSavedPresets()}else t&&(t.textContent=r.error??"Invalid license key."),n.disabled=!1,n.textContent="Activate"}catch{t&&(t.textContent="Network error. Please try again."),n.disabled=!1,n.textContent="Activate"}}lightUpdateFontList(){const e=this.q("#fn-font-list")?.scrollTop??0,t=this.s.activeGroupIds[0]??"h1",n=this.s.elementStyles[t]?.font??"",s=this.q("#fn-font-list");if(s){if(this.s.category===b)s.innerHTML=this.renderCustomFontItems(),this.attachFontItemListeners(),this.attachCustomFontListeners();else{const r=R(this.s.searchQuery,this.s.category);s.innerHTML=this.renderFontItems(r,n),this.attachFontItemListeners()}requestAnimationFrame(()=>{s.scrollTop=e})}this.root.querySelectorAll(".fn-cat").forEach(r=>r.classList.toggle("active",r.dataset.cat===this.s.category))}q(e){return this.root.querySelector(e)}esc(e){return e.replace(/['"<>&]/g,t=>({"'":"&#39;",'"':"&quot;","<":"&lt;",">":"&gt;","&":"&amp;"})[t]??t)}rerender(){const e=this.s.open,t=this.q("#fn-font-list")?.scrollTop??0,n=this.q(".fn-scroll")?.scrollTop??0;this.render(),this.root.classList.toggle("dark",this.s.theme==="dark"),e&&(this.q("#fontara-panel")?.classList.remove("hidden"),this.q("#fontara-trigger")?.classList.add("active"),this.s.open=!0),(t>0||n>0)&&requestAnimationFrame(()=>{const s=this.q("#fn-font-list");s&&t>0&&(s.scrollTop=t);const r=this.q(".fn-scroll");r&&n>0&&(r.scrollTop=n)})}}function J(){if(document.getElementById("fontara-dock"))return;const e=(document.currentScript??document.querySelector("script[data-fontara-key]"))?.getAttribute("data-fontara-key")??null;new ye(e)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",J):J()})();
