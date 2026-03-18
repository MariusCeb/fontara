var Pe=Object.defineProperty;var qe=(B,M,O)=>M in B?Pe(B,M,{enumerable:!0,configurable:!0,writable:!0,value:O}):B[M]=O;var W=(B,M,O)=>qe(B,typeof M!="symbol"?M+"":M,O);(function(){"use strict";const B=`
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
  .fn-pro-info {
    position: relative; display: inline-flex; align-items: center; cursor: default;
  }
  .fn-pro-info-popup {
    position: absolute; top: 100%; left: 0;
    width: 220px; color: rgba(255,255,255,0.75);
    font-size: 11px; font-weight: 400; line-height: 1.5;
    padding-top: 6px; border-radius: 10px;
    z-index: 9999; opacity: 0; pointer-events: none;
    transition: opacity 0.15s 0s; letter-spacing: 0;
  }
  .fn-pro-info-popup-inner {
    background: #1c1c24; padding: 10px 12px; border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.45);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .fn-pro-info:hover .fn-pro-info-popup,
  .fn-pro-info:focus-within .fn-pro-info-popup {
    opacity: 1; pointer-events: auto; transition: opacity 0.15s 0s;
  }
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
    position: absolute; bottom: calc(100% + 6px); right: 0; left: auto;
    background: #1c1c24; color: rgba(255,255,255,0.82);
    font-size: 11px; font-weight: 400; letter-spacing: 0;
    padding: 7px 10px; border-radius: 8px; line-height: 1.4;
    max-width: 190px; white-space: normal; pointer-events: none;
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
    overflow: hidden; background: var(--fn-surface);
  }
  .fn-cpicker-swatches {
    display: grid; grid-template-columns: repeat(8, 1fr);
    gap: 4px; padding: 8px 8px 6px;
    border-bottom: 1px solid var(--fn-border-light);
  }
  .fn-cpicker-swatch {
    height: 16px; border-radius: 3px; cursor: pointer;
    border: 1px solid rgba(0,0,0,0.12);
    transition: transform 0.1s, box-shadow 0.1s;
  }
  .fn-cpicker-swatch:hover {
    transform: scale(1.18); box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  }
  .fn-cpicker-sv {
    position: relative; height: 110px; cursor: crosshair; user-select: none;
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
  .fn-cpicker-bottom {
    padding: 7px 8px 8px;
  }
  .fn-cpicker-rgb-row {
    display: flex; gap: 5px; margin-bottom: 6px;
  }
  .fn-cpicker-rgb-col {
    flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px;
  }
  .fn-cpicker-rgb-input {
    width: 100%; text-align: center; border: 1.5px solid var(--fn-border);
    border-radius: 6px; padding: 3px 2px; font-size: 11px; font-family: inherit;
    color: var(--fn-text); background: var(--fn-bg); outline: none;
    -moz-appearance: textfield;
  }
  .fn-cpicker-rgb-input::-webkit-inner-spin-button,
  .fn-cpicker-rgb-input::-webkit-outer-spin-button { -webkit-appearance: none; }
  .fn-cpicker-rgb-input:focus { border-color: var(--fn-accent); }
  .fn-cpicker-rgb-label {
    font-size: 9px; color: var(--fn-text-faint); font-weight: 600; letter-spacing: 0.03em;
    text-transform: uppercase;
  }
  .fn-cpicker-hex-row {
    display: flex; align-items: center; gap: 6px;
  }
  .fn-cpicker-preview {
    width: 26px; height: 26px; border-radius: 6px; flex-shrink: 0;
    border: 1.5px solid var(--fn-border);
  }
  .fn-cpicker-hex-input {
    flex: 1; min-width: 0;
  }
  .fn-cpicker-eyedropper {
    width: 26px; height: 26px; border-radius: 6px; flex-shrink: 0;
    border: 1.5px solid var(--fn-border); cursor: pointer;
    background: var(--fn-bg); color: var(--fn-text-muted);
    display: flex; align-items: center; justify-content: center;
    padding: 0; transition: border-color 0.15s, color 0.15s;
  }
  .fn-cpicker-eyedropper:hover { border-color: var(--fn-accent-mid); color: var(--fn-accent); }

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

  /* ── PRO exclusive section header ───────────────────────────── */
  .fn-pro-section-header {
    display: flex; align-items: center; justify-content: space-between;
    margin: 10px 8px 6px; padding: 6px 10px;
    background: linear-gradient(135deg, rgba(217,119,6,0.08), rgba(124,58,237,0.07));
    border: 1px solid rgba(217,119,6,0.25);
    border-radius: 8px;
  }
  .fn-pro-section-badge {
    font-size: 10px; font-weight: 700; color: #d97706;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .fn-pro-section-sub {
    font-size: 9px; color: var(--fn-text-faint); font-style: italic;
  }
  .fn-preset-pro-card { border-color: rgba(217,119,6,0.2) !important; }
  .fn-preset-pro-card:not(.fn-preset-locked):hover { border-color: #d97706 !important; }

  /* ── Share pairing button ────────────────────────────────────── */
  .fn-share-btn {
    margin-left: 8px; padding: 2px 8px;
    font-size: 10px; font-weight: 600; border-radius: 20px;
    border: 1.5px solid var(--fn-accent-mid); color: var(--fn-accent);
    background: var(--fn-accent-soft); cursor: pointer;
    letter-spacing: 0.01em; transition: all 0.1s;
  }
  .fn-share-btn:hover { background: var(--fn-accent); color: white; border-color: var(--fn-accent); }

  /* ── Export modal divider + coming soon ─────────────────────── */
  .fn-export-divider { height: 1px; background: var(--fn-border-light); margin: 3px 0; }
  .fn-export-opt-coming {
    opacity: 0.55; cursor: not-allowed !important; position: relative;
  }
  .fn-coming-badge {
    font-size: 8px; font-weight: 700; color: #7c3aed;
    background: rgba(124,58,237,0.12); padding: 1px 5px; border-radius: 20px;
    letter-spacing: 0.05em; text-transform: uppercase; margin-left: 4px;
    vertical-align: middle;
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
  .fn-cat-custom {
    border-style: dashed !important;
    border-color: #d97706 !important;
    color: #d97706 !important;
    background: rgba(217,119,6,0.06) !important;
  }
  .fn-cat-custom:hover { background: rgba(217,119,6,0.12) !important; }
  .fn-cat-custom.active {
    border-style: solid !important;
    background: rgba(217,119,6,0.15) !important;
    color: #b45309 !important;
  }

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
`;let M=!1,O=null;function K(f){return f.id?.startsWith("fontara-")||f.closest("#fontara-dock")!==null||f.closest("#fontara-panel")!==null||f.closest("#fontara-activation")!==null}function J(f){const e=f.target;!e||K(e)||e.classList.add("fontara-hover")}function X(f){const e=f.target;e&&e.classList.remove("fontara-hover")}function Y(f){const e=f.target;!e||K(e)||(f.preventDefault(),f.stopPropagation(),f.stopImmediatePropagation(),e.classList.remove("fontara-hover"),e.classList.add("fontara-selected"),N(),O?.(e))}function de(f){M&&N(),M=!0,O=f,document.addEventListener("mouseover",J,!0),document.addEventListener("mouseout",X,!0),document.addEventListener("click",Y,!0),document.body.style.cursor="crosshair"}function N(){M=!1,document.removeEventListener("mouseover",J,!0),document.removeEventListener("mouseout",X,!0),document.removeEventListener("click",Y,!0),document.body.style.cursor=""}function fe(){document.querySelectorAll(".fontara-selected").forEach(f=>{f.classList.remove("fontara-selected")})}function he(){return M}const Q=new Set;function T(f,e,t){const n=`${f}:${e.join(",")}:${t??""}`;if(Q.has(n))return;Q.add(n);const i=`fn-font-${f.replace(/\s+/g,"-").toLowerCase()}`,r=document.getElementById(i);if(r&&!t)return;r?.remove();const o=document.createElement("link");if(o.id=i,o.rel="stylesheet",t){const a=[...new Set(e)].map(Number).sort((c,y)=>c-y),s=a[0],d=a[a.length-1];o.href=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(f)}:wdth,wght@${t[0]}..${t[1]},${s}..${d}&display=swap`}else{const a=[...new Set(e)].sort().join(";");o.href=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(f)}:wght@${a}&display=swap`}document.head.appendChild(o)}const E=[{id:"h1",label:"H1",selectors:"h1",isHeading:!0,defaultFont:"Playfair Display",defaultWeight:"700",defaultFontSize:48,defaultLineHeight:1.1,defaultTracking:-.02},{id:"h2",label:"H2",selectors:"h2",isHeading:!0,defaultFont:"Playfair Display",defaultWeight:"700",defaultFontSize:38,defaultLineHeight:1.15,defaultTracking:-.02},{id:"h3",label:"H3",selectors:"h3",isHeading:!0,defaultFont:"Playfair Display",defaultWeight:"600",defaultFontSize:30,defaultLineHeight:1.2,defaultTracking:-.01},{id:"h4h6",label:"H4–6",selectors:"h4, h5, h6",isHeading:!0,defaultFont:"Inter",defaultWeight:"600",defaultFontSize:22,defaultLineHeight:1.3,defaultTracking:0},{id:"body",label:"Body",selectors:"p, li, td, blockquote, label",isHeading:!1,defaultFont:"Lato",defaultWeight:"400",defaultFontSize:16,defaultLineHeight:1.65,defaultTracking:0},{id:"btn",label:"Btn",selectors:'button, [role="button"], input[type="submit"], a.btn, a[class*="button"]',isHeading:!1,defaultFont:"Inter",defaultWeight:"500",defaultFontSize:14,defaultLineHeight:1.4,defaultTracking:.01},{id:"nav",label:"Nav",selectors:'nav a, header a, [class*="nav"] a, [class*="menu"] a',isHeading:!1,defaultFont:"Inter",defaultWeight:"400",defaultFontSize:14,defaultLineHeight:1.5,defaultTracking:0}];function pe(f){const e=f.tagName.toLowerCase();return e==="h1"?"h1":e==="h2"?"h2":e==="h3"?"h3":e==="h4"||e==="h5"||e==="h6"?"h4h6":e==="button"||f.getAttribute("role")==="button"?"btn":e==="a"&&(f.closest("nav")||f.closest("header"))?"nav":"body"}function ge(f,e){return f.font===e.defaultFont&&f.weight===e.defaultWeight&&f.fontSize===e.defaultFontSize&&f.lineHeight===e.defaultLineHeight&&f.tracking===e.defaultTracking&&!f.customSelectors&&f.fontStretch==null&&f.fontStyle==null&&!f.textColor&&f.textTransform==null&&f.wordSpacing==null}const G="fontara-applied-styles";function ue(f){let e=document.getElementById(G);e||(e=document.createElement("style"),e.id=G,document.head.appendChild(e));const t=["/* Fontara — Applied Styles */"];for(const n of E){const i=f[n.id];if(!i||ge(i,n))continue;let a=`${(i.customSelectors??n.selectors).split(",").map(s=>s.trim()).filter(Boolean).join(", ")} {`;i.font!==n.defaultFont&&(a+=` font-family: '${i.font}', system-ui, sans-serif !important;`),i.weight!==n.defaultWeight&&(a+=` font-weight: ${i.weight} !important;`),a+=` font-size: ${i.fontSize}px !important; line-height: ${i.lineHeight} !important; letter-spacing: ${i.tracking}em !important;`,i.fontStretch!=null&&(a+=` font-stretch: ${i.fontStretch}% !important;`),i.fontStyle!=null&&(a+=` font-style: ${i.fontStyle} !important;`),i.textColor&&(a+=` color: ${i.textColor} !important;`),i.textTransform!=null&&(a+=` text-transform: ${i.textTransform} !important;`),i.wordSpacing!=null&&(a+=` word-spacing: ${i.wordSpacing}em !important;`),a+=" }",t.push(a)}e.textContent=t.join(`
`)}function me(){document.getElementById(G)?.remove()}function ye(f){const e=new Map;for(const r of Object.values(f))e.has(r.font)||e.set(r.font,new Set),e.get(r.font).add(r.weight);const t=Array.from(e.entries()).map(([r,o])=>{const a=[...o].sort().join(";");return`@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(r)}:wght@${a}&display=swap');`}),n=[];for(const r of E){const o=f[r.id];if(!o)continue;let d=`${(o.customSelectors??r.selectors).split(",").map(c=>c.trim()).filter(Boolean).join(", ")} {
  font-family: '${o.font}', system-ui, sans-serif;
  font-weight: ${o.weight};
  font-size: ${o.fontSize}px;
  line-height: ${o.lineHeight};
  letter-spacing: ${o.tracking}em;
`;o.fontStretch!=null&&(d+=`  font-stretch: ${o.fontStretch}%;
`),o.fontStyle!=null&&(d+=`  font-style: ${o.fontStyle};
`),o.textTransform!=null&&(d+=`  text-transform: ${o.textTransform};
`),o.wordSpacing!=null&&(d+=`  word-spacing: ${o.wordSpacing}em;
`),d+="}",n.push(d)}const i=Array.from(e.entries()).map(([r,o])=>{const a=[...o].sort().join(";");return`  <link rel="preload" as="style" href="${`https://fonts.googleapis.com/css2?family=${encodeURIComponent(r)}:wght@${a}&display=swap`}" onload="this.onload=null;this.rel='stylesheet'">`});return`/* Fontara — Typography Export
 * Generated: ${new Date().toISOString().split("T")[0]}
 */

/* 1. Font loading — add to <head> for best performance */
/*
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${i.join(`
`)}
*/

/* 2. Import fonts (simpler alternative to preload above) */
${t.join(`
`)}

/* 3. Typography rules */
${n.join(`

`)}`}function ve(f,e="fn"){const t=new Map;for(const o of Object.values(f))t.has(o.font)||t.set(o.font,new Set),t.get(o.font).add(o.weight);const n=Array.from(t.entries()).map(([o,a])=>{const s=[...a].sort().join(";");return`@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(o)}:wght@${s}&display=swap');`}),i=[],r=[];for(const o of E){const a=f[o.id];if(!a)continue;const s=o.id.replace(/[^a-z0-9]/gi,"-");i.push(`  --${e}-${s}-family: '${a.font}', system-ui, sans-serif;`),i.push(`  --${e}-${s}-weight: ${a.weight};`),i.push(`  --${e}-${s}-size: ${a.fontSize}px;`),i.push(`  --${e}-${s}-line-height: ${a.lineHeight};`),i.push(`  --${e}-${s}-tracking: ${a.tracking}em;`);const c=(a.customSelectors??o.selectors).split(",").map(y=>y.trim()).filter(Boolean).join(", ");r.push(`${c} {
  font-family: var(--${e}-${s}-family);
  font-weight: var(--${e}-${s}-weight);
  font-size: var(--${e}-${s}-size);
  line-height: var(--${e}-${s}-line-height);
  letter-spacing: var(--${e}-${s}-tracking);
}`)}return`/* Fontara — CSS Variables Export
 * Generated: ${new Date().toISOString().split("T")[0]}
 * Prefix: --${e}
 */

/* 1. Import fonts */
${n.join(`
`)}

/* 2. Custom properties */
:root {
${i.join(`
`)}
}

/* 3. Apply */
${r.join(`

`)}`}function be(f){const e={};for(const t of E){const n=f[t.id];n&&(e[t.id]={fontFamily:{value:n.font,type:"fontFamilies"},fontWeight:{value:String(n.weight),type:"fontWeights"},fontSize:{value:String(n.fontSize),type:"fontSizes"},lineHeight:{value:String(n.lineHeight),type:"lineHeights"},letterSpacing:{value:`${n.tracking*100}%`,type:"letterSpacing"}})}return JSON.stringify({typography:e},null,2)}function xe(f){const e={};for(const t of E){const n=f[t.id];n&&(e[t.id]={font:n.font,weight:n.weight,fontSize:n.fontSize,lineHeight:n.lineHeight,tracking:n.tracking,...n.fontStretch!=null?{fontStretch:n.fontStretch}:{},...n.fontStyle!=null?{fontStyle:n.fontStyle}:{},...n.textTransform!=null?{textTransform:n.textTransform}:{},...n.wordSpacing!=null?{wordSpacing:n.wordSpacing}:{},...n.customSelectors?{selectors:n.customSelectors}:{}})}return JSON.stringify(e,null,2)}function we(f){const e=new Set;for(const a of Object.values(f))e.add(a.font);const t={};for(const a of e){const s=a.toLowerCase().replace(/\s+/g,"-");t[s]=[a,"system-ui","sans-serif"]}const n=f.body,i={},r={};return n&&(i.base=`${n.fontSize}px`,r.normal=`${n.tracking}em`),`// tailwind.config.js — theme.extend
const fontaraExtend = ${JSON.stringify({fontFamily:t,fontSize:i,letterSpacing:r},null,2)};

module.exports = {
  theme: {
    extend: fontaraExtend,
  },
};`}async function Z(f){try{return await navigator.clipboard.writeText(f),!0}catch{const e=document.createElement("textarea");e.value=f,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();const t=document.execCommand("copy");return e.remove(),t}}const _=[{family:"Inter",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Roboto",category:"sans-serif",weights:["300","400","500","700","900"],variable:!0},{family:"Open Sans",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0,wdth:[75,100]},{family:"Lato",category:"sans-serif",weights:["300","400","700","900"]},{family:"Montserrat",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Raleway",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Nunito",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Nunito Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"DM Sans",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Plus Jakarta Sans",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Space Grotesk",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Outfit",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Syne",category:"sans-serif",weights:["400","500","600","700","800"],variable:!0},{family:"Manrope",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Urbanist",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Work Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Poppins",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Figtree",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Bricolage Grotesque",category:"sans-serif",weights:["200","300","400","500","600","700","800"],variable:!0},{family:"Albert Sans",category:"sans-serif",weights:["100","200","300","400","500","600","700","800","900"],variable:!0},{family:"Barlow",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Josefin Sans",category:"sans-serif",weights:["300","400","600","700"],variable:!0},{family:"Mulish",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Rubik",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Karla",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Source Sans 3",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0,wdth:[75,125]},{family:"IBM Plex Sans",category:"sans-serif",weights:["300","400","500","600","700"]},{family:"Fira Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Jost",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Cabin",category:"sans-serif",weights:["400","500","600","700"],variable:!0,wdth:[75,100]},{family:"Titillium Web",category:"sans-serif",weights:["300","400","600","700","900"]},{family:"Exo 2",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Noto Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Lexend",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Red Hat Display",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Be Vietnam Pro",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Chivo",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Archivo",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0,wdth:[75,125]},{family:"Instrument Sans",category:"sans-serif",weights:["400","500","600","700"],variable:!0},{family:"Hanken Grotesk",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Readex Pro",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Public Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Quicksand",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Commissioner",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0,wdth:[100,125]},{family:"Onest",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Geist",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Epilogue",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Spline Sans",category:"sans-serif",weights:["300","400","500","600","700"]},{family:"Encode Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0,wdth:[75,125]},{family:"Asap",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Kanit",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Prompt",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Overpass",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Oxygen",category:"sans-serif",weights:["300","400","700"]},{family:"Varela Round",category:"sans-serif",weights:["400"]},{family:"Comfortaa",category:"sans-serif",weights:["300","400","500","600","700"],variable:!0},{family:"Maven Pro",category:"sans-serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Gothic A1",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Hind",category:"sans-serif",weights:["300","400","500","600","700"]},{family:"Schibsted Grotesk",category:"sans-serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Sora",category:"sans-serif",weights:["300","400","500","600","700","800"]},{family:"Rajdhani",category:"sans-serif",weights:["300","400","500","600","700"]},{family:"Anybody",category:"sans-serif",weights:["100","200","300","400","500","600","700","800","900"],variable:!0,wdth:[50,150]},{family:"Wix Madefor Display",category:"sans-serif",weights:["400","500","600","700","800"],variable:!0},{family:"Inclusive Sans",category:"sans-serif",weights:["400"]},{family:"Barlow Condensed",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"Barlow Semi Condensed",category:"sans-serif",weights:["300","400","500","600","700","800","900"]},{family:"IBM Plex Sans Condensed",category:"sans-serif",weights:["300","400","500","600","700"]},{family:"Noto Sans Display",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Familjen Grotesk",category:"sans-serif",weights:["400","500","600","700"],variable:!0},{family:"Anek Latin",category:"sans-serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Gantari",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"M PLUS Rounded 1c",category:"sans-serif",weights:["300","400","500","700","800","900"]},{family:"Kumbh Sans",category:"sans-serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Acumin Pro",category:"sans-serif",weights:["400","700"]},{family:"Playfair Display",category:"serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Lora",category:"serif",weights:["400","500","600","700"],variable:!0},{family:"Merriweather",category:"serif",weights:["300","400","700","900"]},{family:"EB Garamond",category:"serif",weights:["400","500","600","700","800"],variable:!0},{family:"Libre Baskerville",category:"serif",weights:["400","700"]},{family:"Cormorant Garamond",category:"serif",weights:["300","400","500","600","700"]},{family:"Crimson Text",category:"serif",weights:["400","600","700"]},{family:"DM Serif Display",category:"serif",weights:["400"]},{family:"Spectral",category:"serif",weights:["300","400","500","600","700","800"]},{family:"PT Serif",category:"serif",weights:["400","700"]},{family:"Fraunces",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0,wdth:[79,125]},{family:"Source Serif 4",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Bitter",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Domine",category:"serif",weights:["400","500","600","700","800"]},{family:"Vollkorn",category:"serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Noto Serif",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Instrument Serif",category:"serif",weights:["400"]},{family:"Bodoni Moda",category:"serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Gloock",category:"serif",weights:["400"]},{family:"Newsreader",category:"serif",weights:["300","400","500","600","700","800"],variable:!0},{family:"Frank Ruhl Libre",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Cormorant",category:"serif",weights:["300","400","500","600","700"],variable:!0},{family:"Rokkitt",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Petrona",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Alegreya",category:"serif",weights:["400","500","700","800","900"],variable:!0},{family:"Alegreya Sans",category:"serif",weights:["300","400","500","700","800","900"]},{family:"Cinzel",category:"serif",weights:["400","500","600","700","800","900"],variable:!0},{family:"Cardo",category:"serif",weights:["400","700"]},{family:"Josefin Slab",category:"serif",weights:["300","400","600","700"],variable:!0},{family:"Martel",category:"serif",weights:["300","400","600","700","800","900"]},{family:"Neuton",category:"serif",weights:["300","400","700","800"]},{family:"Philosopher",category:"serif",weights:["400","700"]},{family:"Libre Caslon Text",category:"serif",weights:["400","700"]},{family:"Young Serif",category:"serif",weights:["400"]},{family:"Trocchi",category:"serif",weights:["400"]},{family:"Fenix",category:"serif",weights:["400"]},{family:"Rufina",category:"serif",weights:["400","700"]},{family:"Unna",category:"serif",weights:["400","700"]},{family:"Vidaloka",category:"serif",weights:["400"]},{family:"Taviraj",category:"serif",weights:["300","400","500","600","700","800","900"]},{family:"Hepta Slab",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Rasa",category:"serif",weights:["300","400","500","600","700"],variable:!0},{family:"Scope One",category:"serif",weights:["400"]},{family:"Della Respira",category:"serif",weights:["400"]},{family:"Lustria",category:"serif",weights:["400"]},{family:"Playfair",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Noto Serif Display",category:"serif",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Pirata One",category:"serif",weights:["400"]},{family:"Cambo",category:"serif",weights:["400"]},{family:"Coustard",category:"serif",weights:["400","900"]},{family:"Mate",category:"serif",weights:["400"]},{family:"Noticia Text",category:"serif",weights:["400","700"]},{family:"Bebas Neue",category:"display",weights:["400"]},{family:"Oswald",category:"display",weights:["300","400","500","600","700"],variable:!0},{family:"Anton",category:"display",weights:["400"]},{family:"Righteous",category:"display",weights:["400"]},{family:"Abril Fatface",category:"display",weights:["400"]},{family:"Big Shoulders Display",category:"display",weights:["300","400","500","600","700","800","900"],variable:!0,wdth:[70,100]},{family:"Unbounded",category:"display",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Teko",category:"display",weights:["300","400","500","600","700"],variable:!0},{family:"Lobster",category:"display",weights:["400"]},{family:"Pacifico",category:"display",weights:["400"]},{family:"Bangers",category:"display",weights:["400"]},{family:"Bungee",category:"display",weights:["400"]},{family:"Alfa Slab One",category:"display",weights:["400"]},{family:"Dela Gothic One",category:"display",weights:["400"]},{family:"Yeseva One",category:"display",weights:["400"]},{family:"Russo One",category:"display",weights:["400"]},{family:"Saira",category:"display",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Black Han Sans",category:"display",weights:["400"]},{family:"Fredoka",category:"display",weights:["300","400","500","600","700"],variable:!0},{family:"Lilita One",category:"display",weights:["400"]},{family:"Squada One",category:"display",weights:["400"]},{family:"Ultra",category:"display",weights:["400"]},{family:"Titan One",category:"display",weights:["400"]},{family:"Concert One",category:"display",weights:["400"]},{family:"Boogaloo",category:"display",weights:["400"]},{family:"Permanent Marker",category:"display",weights:["400"]},{family:"Michroma",category:"display",weights:["400"]},{family:"Graduate",category:"display",weights:["400"]},{family:"Koulen",category:"display",weights:["400"]},{family:"Press Start 2P",category:"display",weights:["400"]},{family:"Bowlby One",category:"display",weights:["400"]},{family:"Coiny",category:"display",weights:["400"]},{family:"Monoton",category:"display",weights:["400"]},{family:"Poller One",category:"display",weights:["400"]},{family:"Racing Sans One",category:"display",weights:["400"]},{family:"Faster One",category:"display",weights:["400"]},{family:"Audiowide",category:"display",weights:["400"]},{family:"Orbitron",category:"display",weights:["400","500","600","700","800","900"],variable:!0},{family:"Exo",category:"display",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Quantico",category:"display",weights:["400","700"]},{family:"Syncopate",category:"display",weights:["400","700"]},{family:"Big Shoulders Text",category:"display",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Fjalla One",category:"display",weights:["400"]},{family:"Passion One",category:"display",weights:["400","700","900"]},{family:"Voltaire",category:"display",weights:["400"]},{family:"Caesar Dressing",category:"display",weights:["400"]},{family:"Ceviche One",category:"display",weights:["400"]},{family:"Changa One",category:"display",weights:["400"]},{family:"Cinzel Decorative",category:"display",weights:["400","700","900"]},{family:"Ewert",category:"display",weights:["400"]},{family:"Goblin One",category:"display",weights:["400"]},{family:"Kalnia",category:"display",weights:["300","400","500","600","700"],variable:!0},{family:"Krona One",category:"display",weights:["400"]},{family:"Londrina Solid",category:"display",weights:["300","400","900"]},{family:"Modak",category:"display",weights:["400"]},{family:"Nixie One",category:"display",weights:["400"]},{family:"Rammetto One",category:"display",weights:["400"]},{family:"Russo One",category:"display",weights:["400"]},{family:"Wallpoet",category:"display",weights:["400"]},{family:"Special Elite",category:"display",weights:["400"]},{family:"Rye",category:"display",weights:["400"]},{family:"Diplomata SC",category:"display",weights:["400"]},{family:"Bona Nova SC",category:"display",weights:["400","700"]},{family:"Poiret One",category:"display",weights:["400"]},{family:"Italiana",category:"display",weights:["400"]},{family:"Marcellus",category:"display",weights:["400"]},{family:"Marcellus SC",category:"display",weights:["400"]},{family:"Tenor Sans",category:"display",weights:["400"]},{family:"Cormorant SC",category:"display",weights:["300","400","500","600","700"]},{family:"Playfair Display SC",category:"display",weights:["400","700","900"]},{family:"Forum",category:"display",weights:["400"]},{family:"Bellefair",category:"display",weights:["400"]},{family:"Oleo Script",category:"display",weights:["400","700"]},{family:"Electrolize",category:"display",weights:["400"]},{family:"Black Ops One",category:"display",weights:["400"]},{family:"Nova Square",category:"display",weights:["400"]},{family:"Turret Road",category:"display",weights:["400","700"]},{family:"Iceland",category:"display",weights:["400"]},{family:"Gugi",category:"display",weights:["400"]},{family:"Jura",category:"display",weights:["300","400","500","600","700"],variable:!0},{family:"Share Tech",category:"display",weights:["400"]},{family:"Nova Slim",category:"display",weights:["400"]},{family:"Oxanium",category:"display",weights:["300","400","500","600","700","800"],variable:!0},{family:"Rationale",category:"display",weights:["400"]},{family:"Dancing Script",category:"handwriting",weights:["400","500","600","700"],variable:!0},{family:"Caveat",category:"handwriting",weights:["400","500","600","700"],variable:!0},{family:"Sacramento",category:"handwriting",weights:["400"]},{family:"Kalam",category:"handwriting",weights:["300","400","700"]},{family:"Satisfy",category:"handwriting",weights:["400"]},{family:"Great Vibes",category:"handwriting",weights:["400"]},{family:"Parisienne",category:"handwriting",weights:["400"]},{family:"Architects Daughter",category:"handwriting",weights:["400"]},{family:"Patrick Hand",category:"handwriting",weights:["400"]},{family:"Indie Flower",category:"handwriting",weights:["400"]},{family:"Shadows Into Light",category:"handwriting",weights:["400"]},{family:"Mali",category:"handwriting",weights:["300","400","500","600","700"]},{family:"Allura",category:"handwriting",weights:["400"]},{family:"Cookie",category:"handwriting",weights:["400"]},{family:"Damion",category:"handwriting",weights:["400"]},{family:"Italianno",category:"handwriting",weights:["400"]},{family:"Pinyon Script",category:"handwriting",weights:["400"]},{family:"Zeyada",category:"handwriting",weights:["400"]},{family:"The Nautigal",category:"handwriting",weights:["400","700"]},{family:"Yesteryear",category:"handwriting",weights:["400"]},{family:"Style Script",category:"handwriting",weights:["400"]},{family:"Euphoria Script",category:"handwriting",weights:["400"]},{family:"Niconne",category:"handwriting",weights:["400"]},{family:"Mynerve",category:"handwriting",weights:["400"]},{family:"Stalemate",category:"handwriting",weights:["400"]},{family:"Covered By Your Grace",category:"handwriting",weights:["400"]},{family:"Rock Salt",category:"handwriting",weights:["400"]},{family:"Caveat Brush",category:"handwriting",weights:["400"]},{family:"Nanum Pen Script",category:"handwriting",weights:["400"]},{family:"Liu Jian Mao Cao",category:"handwriting",weights:["400"]},{family:"Kaushan Script",category:"handwriting",weights:["400"]},{family:"JetBrains Mono",category:"monospace",weights:["400","500","600","700","800"],variable:!0},{family:"Fira Code",category:"monospace",weights:["300","400","500","600","700"],variable:!0},{family:"Space Mono",category:"monospace",weights:["400","700"]},{family:"IBM Plex Mono",category:"monospace",weights:["300","400","500","600","700"]},{family:"Roboto Mono",category:"monospace",weights:["300","400","500","600","700"],variable:!0},{family:"Source Code Pro",category:"monospace",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Inconsolata",category:"monospace",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Ubuntu Mono",category:"monospace",weights:["400","700"]},{family:"Courier Prime",category:"monospace",weights:["400","700"]},{family:"DM Mono",category:"monospace",weights:["300","400","500"]},{family:"Martian Mono",category:"monospace",weights:["300","400","500","600","700","800"],variable:!0},{family:"Chivo Mono",category:"monospace",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Syne Mono",category:"monospace",weights:["400"]},{family:"Anonymous Pro",category:"monospace",weights:["400","700"]},{family:"Azeret Mono",category:"monospace",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Red Hat Mono",category:"monospace",weights:["300","400","500","600","700"],variable:!0},{family:"Overpass Mono",category:"monospace",weights:["300","400","500","600","700"],variable:!0},{family:"Share Tech Mono",category:"monospace",weights:["400"]},{family:"Xanh Mono",category:"monospace",weights:["400"]},{family:"Nanum Gothic Coding",category:"monospace",weights:["400","700"]},{family:"B612 Mono",category:"monospace",weights:["400","700"]},{family:"Cutive Mono",category:"monospace",weights:["400"]},{family:"Nova Mono",category:"monospace",weights:["400"]},{family:"PT Mono",category:"monospace",weights:["400"]},{family:"Sometype Mono",category:"monospace",weights:["400","500","600","700"],variable:!0},{family:"Fragment Mono",category:"monospace",weights:["400"]},{family:"Cousine",category:"monospace",weights:["400","700"]},{family:"Major Mono Display",category:"monospace",weights:["400"]},{family:"Noto Sans Mono",category:"monospace",weights:["300","400","500","600","700","800","900"],variable:!0},{family:"Spline Sans Mono",category:"monospace",weights:["300","400","500","600","700"],variable:!0},{family:"Kode Mono",category:"monospace",weights:["400","500","600","700"],variable:!0},{family:"VT323",category:"experimental",weights:["400"]},{family:"Silkscreen",category:"experimental",weights:["400","700"]},{family:"Pixelify Sans",category:"experimental",weights:["400","500","600","700"],variable:!0},{family:"Tiny5",category:"experimental",weights:["400"]},{family:"DotGothic16",category:"experimental",weights:["400"]},{family:"Cabin Sketch",category:"experimental",weights:["400","700"]},{family:"Butcherman",category:"experimental",weights:["400"]},{family:"New Rocker",category:"experimental",weights:["400"]},{family:"Metal Mania",category:"experimental",weights:["400"]},{family:"Creepster",category:"experimental",weights:["400"]},{family:"Henny Penny",category:"experimental",weights:["400"]},{family:"Rubik Wet Paint",category:"experimental",weights:["400"]},{family:"Rubik Dirt",category:"experimental",weights:["400"]},{family:"Rubik Burned",category:"experimental",weights:["400"]},{family:"Rubik Storm",category:"experimental",weights:["400"]},{family:"Rubik Maze",category:"experimental",weights:["400"]},{family:"Rubik Moonrocks",category:"experimental",weights:["400"]},{family:"Rubik Puddles",category:"experimental",weights:["400"]},{family:"Rubik Glitch",category:"experimental",weights:["400"]},{family:"Bungee Shade",category:"experimental",weights:["400"]},{family:"Bungee Inline",category:"experimental",weights:["400"]},{family:"Bungee Outline",category:"experimental",weights:["400"]},{family:"Fascinate",category:"experimental",weights:["400"]},{family:"Fascinate Inline",category:"experimental",weights:["400"]},{family:"Nabla",category:"experimental",weights:["400"]},{family:"UnifrakturMaguntia",category:"experimental",weights:["400"]},{family:"MedievalSharp",category:"experimental",weights:["400"]},{family:"Germania One",category:"experimental",weights:["400"]},{family:"Uncial Antiqua",category:"experimental",weights:["400"]},{family:"Stalinist One",category:"experimental",weights:["400"]},{family:"Diplomata",category:"experimental",weights:["400"]},{family:"Emblema One",category:"experimental",weights:["400"]},{family:"Sixtyfour Convergence",category:"experimental",weights:["400"]},{family:"Tsukimi Rounded",category:"experimental",weights:["300","400","500","600","700"]},{family:"Ojuju",category:"experimental",weights:["300","400","500","600","700","800"],variable:!0}],ke=[{id:"all",label:"All"},{id:"sans-serif",label:"Sans"},{id:"serif",label:"Serif"},{id:"display",label:"Display"},{id:"handwriting",label:"Script"},{id:"monospace",label:"Mono"},{id:"experimental",label:"🔥 Wild"}];function ee(f,e){const t=f.toLowerCase().trim();return _.filter(n=>{const i=e==="all"||n.category===e,r=!t||n.family.toLowerCase().includes(t);return i&&r})}function z(f){return _.find(e=>e.family===f)}const R=[{id:"classic-elegance",name:"Classic Elegance",description:"Timeless editorial pairing for premium brands",headingFont:"Playfair Display",headingWeight:"700",bodyFont:"Lato",bodyWeight:"400",tags:["editorial","luxury","classic"]},{id:"modern-editorial",name:"Modern Editorial",description:"Clean tech aesthetic meets readable prose",headingFont:"Inter",headingWeight:"700",bodyFont:"Merriweather",bodyWeight:"400",tags:["tech","blog","modern"]},{id:"tech-craft",name:"Tech Meets Craft",description:"Geometric precision with warm humanist body",headingFont:"Space Grotesk",headingWeight:"700",bodyFont:"Lora",bodyWeight:"400",tags:["startup","saas","tech"]},{id:"bold-clarity",name:"Bold Clarity",description:"Strong impact headlines with clean readability",headingFont:"Montserrat",headingWeight:"800",bodyFont:"Open Sans",bodyWeight:"400",tags:["marketing","landing","bold"]},{id:"designers-choice",name:"Designer's Choice",description:"Matching DM family — perfectly harmonious",headingFont:"DM Serif Display",headingWeight:"400",bodyFont:"DM Sans",bodyWeight:"400",tags:["design","portfolio","harmonious"]},{id:"creative-studio",name:"Creative Studio",description:"Experimental geometry meets friendly warmth",headingFont:"Syne",headingWeight:"800",bodyFont:"Nunito",bodyWeight:"400",tags:["agency","creative","modern"]},{id:"luxury-brand",name:"Luxury Brand",description:"Whisper-thin elegance for high-end positioning",headingFont:"Cormorant Garamond",headingWeight:"600",bodyFont:"Raleway",bodyWeight:"300",tags:["luxury","fashion","premium"]},{id:"street-cred",name:"Street Cred",description:"Maximum impact with clean body copy",headingFont:"Bebas Neue",headingWeight:"400",bodyFont:"Open Sans",bodyWeight:"400",tags:["bold","streetwear","impact"]},{id:"business-pro",name:"Business Pro",description:"Professional and trustworthy for enterprise",headingFont:"Plus Jakarta Sans",headingWeight:"700",bodyFont:"PT Serif",bodyWeight:"400",tags:["business","enterprise","professional"]},{id:"contemporary-classic",name:"Contemporary Classic",description:"Modern sans meets classical elegance",headingFont:"Outfit",headingWeight:"700",bodyFont:"EB Garamond",bodyWeight:"400",tags:["contemporary","magazine","refined"]},{id:"editorial-noir",name:"Editorial Noir",description:"High contrast, magazine-worthy gravitas",headingFont:"Bodoni Moda",headingWeight:"700",bodyFont:"Source Sans 3",bodyWeight:"400",tags:["editorial","magazine","high-contrast"]},{id:"soft-tech",name:"Soft Tech",description:"Friendly rounded feel for apps and tools",headingFont:"Nunito",headingWeight:"800",bodyFont:"Manrope",bodyWeight:"400",tags:["app","saas","friendly"]},{id:"humanist-warmth",name:"Humanist Warmth",description:"Warm grotesque headlines, readable serif body",headingFont:"Karla",headingWeight:"700",bodyFont:"Lora",bodyWeight:"400",tags:["blog","warmth","humanist"]},{id:"brutalist",name:"Brutalist",description:"Raw typographic power — unapologetically bold",headingFont:"Anton",headingWeight:"400",bodyFont:"Work Sans",bodyWeight:"400",tags:["bold","brutalist","impact"]},{id:"old-money",name:"Old Money",description:"Classic serif pairing for heritage and prestige",headingFont:"Libre Baskerville",headingWeight:"700",bodyFont:"Crimson Text",bodyWeight:"400",tags:["heritage","luxury","classic"]},{id:"scandinavian",name:"Scandinavian",description:"Clean minimal aesthetic — form meets function",headingFont:"Manrope",headingWeight:"600",bodyFont:"Inter",bodyWeight:"400",tags:["minimal","nordic","clean"]},{id:"futuristic",name:"Futuristic",description:"Sci-fi geometric for cutting-edge interfaces",headingFont:"Orbitron",headingWeight:"700",bodyFont:"Exo 2",bodyWeight:"400",tags:["futuristic","sci-fi","tech"]},{id:"journalistic",name:"Journalistic",description:"Authoritative news design, built to be read",headingFont:"Source Serif 4",headingWeight:"700",bodyFont:"Source Sans 3",bodyWeight:"400",tags:["news","editorial","readable"]},{id:"romantic",name:"Romantic",description:"Delicate script headline over elegant serif",headingFont:"Cormorant",headingWeight:"400",bodyFont:"Raleway",bodyWeight:"300",tags:["wedding","romance","delicate"]},{id:"playful-kids",name:"Playful",description:"Bouncy, fun, full of personality",headingFont:"Fredoka",headingWeight:"600",bodyFont:"Nunito",bodyWeight:"400",tags:["kids","playful","fun"]},{id:"dark-academia",name:"Dark Academia",description:"Literary gravitas with old-world sophistication",headingFont:"EB Garamond",headingWeight:"700",bodyFont:"Spectral",bodyWeight:"400",tags:["literary","academic","elegant"]},{id:"startup-energy",name:"Startup Energy",description:"Bold, ambitious, ready to disrupt",headingFont:"Bricolage Grotesque",headingWeight:"700",bodyFont:"DM Sans",bodyWeight:"400",tags:["startup","vc","bold"]},{id:"readable-long",name:"Long-Form Read",description:"Optimised for extended reading sessions",headingFont:"Bitter",headingWeight:"700",bodyFont:"Lora",bodyWeight:"400",tags:["readability","blog","article"]},{id:"geometric-modern",name:"Geometric Modern",description:"Precise geometry for design-forward projects",headingFont:"Urbanist",headingWeight:"800",bodyFont:"Jost",bodyWeight:"400",tags:["modern","geometric","design"]},{id:"artisan-craft",name:"Artisan Craft",description:"Handcrafted warmth for makers and creators",headingFont:"Fraunces",headingWeight:"700",bodyFont:"Karla",bodyWeight:"400",tags:["artisan","craft","warm"]},{id:"neoclassical",name:"Neoclassical",description:"Roman capitals meeting contemporary body text",headingFont:"Cinzel",headingWeight:"600",bodyFont:"Alegreya",bodyWeight:"400",tags:["classical","architecture","formal"]},{id:"developer-docs",name:"Developer Docs",description:"Sharp sans for headings, mono for code feel",headingFont:"IBM Plex Sans",headingWeight:"600",bodyFont:"IBM Plex Mono",bodyWeight:"400",tags:["developer","docs","technical"]},{id:"fashion-editorial",name:"Fashion Editorial",description:"High-fashion serif with airy sans body",headingFont:"Playfair Display",headingWeight:"900",bodyFont:"Raleway",bodyWeight:"300",tags:["fashion","editorial","luxury"]},{id:"neo-brutalist",name:"Neo-Brutalist",description:"Condensed display with bold grotesque energy",headingFont:"Oswald",headingWeight:"700",bodyFont:"Barlow",bodyWeight:"400",tags:["brutal","web","bold"]},{id:"minimal-swiss",name:"Minimal Swiss",description:"Swiss grid discipline — pure typographic clarity",headingFont:"Work Sans",headingWeight:"700",bodyFont:"Source Sans 3",bodyWeight:"300",tags:["swiss","minimal","grid"]},{id:"natural-organic",name:"Natural Organic",description:"Earthy, breathing, sustainably beautiful",headingFont:"Vollkorn",headingWeight:"600",bodyFont:"Nunito Sans",bodyWeight:"400",tags:["organic","nature","wellness"]},{id:"sci-fi-mono",name:"Sci-Fi Terminal",description:"Cold and precise, like a starship interface",headingFont:"Space Mono",headingWeight:"700",bodyFont:"Share Tech Mono",bodyWeight:"400",tags:["sci-fi","terminal","dark"]},{id:"retro-wave",name:"Retro Wave",description:"80s nostalgia with modern execution",headingFont:"Righteous",headingWeight:"400",bodyFont:"Rajdhani",bodyWeight:"400",tags:["retro","80s","neon"]},{id:"academic-paper",name:"Academic Paper",description:"Scholarly precision, built for long-form content",headingFont:"Libre Baskerville",headingWeight:"700",bodyFont:"Merriweather",bodyWeight:"400",tags:["academic","research","readable"]},{id:"fintech",name:"FinTech Clean",description:"Trustworthy, data-first, conversion-optimised",headingFont:"Figtree",headingWeight:"700",bodyFont:"Inter",bodyWeight:"400",tags:["fintech","banking","trust"]},{id:"porto-poster",name:"Porto Poster",description:"Massive ink display with airy geometric body — poster energy",headingFont:"Abril Fatface",headingWeight:"400",bodyFont:"Josefin Sans",bodyWeight:"300",tags:["pro","editorial","poster"],pro:!0},{id:"coastal-modern",name:"Coastal Modern",description:"Refined display grace paired with quiet neutral warmth",headingFont:"Gilda Display",headingWeight:"400",bodyFont:"Questrial",bodyWeight:"400",tags:["pro","lifestyle","luxury"],pro:!0},{id:"dev-manifesto",name:"Dev Manifesto",description:"Monospaced boldness — serious tech with personality",headingFont:"JetBrains Mono",headingWeight:"700",bodyFont:"Fira Sans",bodyWeight:"400",tags:["pro","developer","docs"],pro:!0},{id:"venetian-ink",name:"Venetian Ink",description:"Renaissance calligraphy meets philosophical prose",headingFont:"Cardo",headingWeight:"700",bodyFont:"Philosopher",bodyWeight:"400",tags:["pro","literary","classical"],pro:!0},{id:"parisian-cafe",name:"Parisian Café",description:"Small caps French elegance with slab serif warmth",headingFont:"Playfair Display SC",headingWeight:"700",bodyFont:"Josefin Slab",bodyWeight:"300",tags:["pro","french","refined"],pro:!0},{id:"velvet-night",name:"Velvet Night",description:"Ultra-thin luxury display — fashion at its quietest",headingFont:"Italiana",headingWeight:"400",bodyFont:"Jost",bodyWeight:"300",tags:["pro","fashion","luxury"],pro:!0},{id:"league-champion",name:"League Champion",description:"Compressed power headlines with clean Franklin body",headingFont:"League Spartan",headingWeight:"800",bodyFont:"Libre Franklin",bodyWeight:"400",tags:["pro","sports","bold"],pro:!0},{id:"neon-genesis",name:"Neon Genesis",description:"Anime-coded futurism — wide spaced and electric",headingFont:"Syncopate",headingWeight:"700",bodyFont:"Exo 2",bodyWeight:"400",tags:["pro","anime","futuristic"],pro:!0},{id:"sketch-notes",name:"Sketch Notes",description:"Raw hand-drawn energy meets clean readable body",headingFont:"Permanent Marker",headingWeight:"400",bodyFont:"Lato",bodyWeight:"400",tags:["wild","hand-drawn","raw"]},{id:"retro-terminal",name:"Retro Terminal",description:"Pure monochrome pixel nostalgia — no frills",headingFont:"VT323",headingWeight:"400",bodyFont:"Share Tech Mono",bodyWeight:"400",tags:["wild","pixel","terminal"]},{id:"bauhaus-grid",name:"Bauhaus Grid",description:"Compressed display type with German avant-garde rigour",headingFont:"Staatliches",headingWeight:"400",bodyFont:"Barlow",bodyWeight:"400",tags:["wild","bauhaus","condensed"]},{id:"art-deco",name:"Art Déco",description:"1920s geometric luxury — whisper-thin and precious",headingFont:"Poiret One",headingWeight:"400",bodyFont:"Cormorant Garamond",bodyWeight:"400",tags:["wild","art-deco","1920s"]},{id:"urban-signage",name:"Urban Signage",description:"Bold street-level signage with condensed body energy",headingFont:"Bungee",headingWeight:"400",bodyFont:"Barlow Condensed",bodyWeight:"400",tags:["wild","street","signage"]},{id:"cafe-chalkboard",name:"Café Chalkboard",description:"Warm handwritten charm for menus and mood boards",headingFont:"Caveat",headingWeight:"700",bodyFont:"Karla",bodyWeight:"400",tags:["wild","handwritten","warm"]},{id:"bubble-gum",name:"Bubble Gum",description:"Maximum softness — every corner is round and friendly",headingFont:"Comfortaa",headingWeight:"700",bodyFont:"Nunito",bodyWeight:"400",tags:["wild","rounded","playful"]},{id:"pixel-arcade",name:"Pixel Arcade",description:"Full 8-bit game aesthetic — insert coin to continue",headingFont:"Press Start 2P",headingWeight:"400",bodyFont:"Space Mono",bodyWeight:"400",tags:["wild","8-bit","gaming"]}],Se={"Playfair Display":["Lato","Source Sans 3","DM Sans","Raleway"],"EB Garamond":["Lato","Nunito Sans","Source Sans 3","Inter"],"Cormorant Garamond":["Source Sans 3","Raleway","Lato"],Cormorant:["Source Sans 3","Raleway","DM Sans","Lato"],Lora:["Merriweather","Source Serif 4","Inter","Work Sans"],Merriweather:["Open Sans","Source Sans 3","Lato","Nunito"],"Libre Baskerville":["Lato","Source Sans 3","Open Sans","Raleway"],"DM Serif Display":["DM Sans","Inter","Lato","Source Sans 3"],Fraunces:["Mulish","Nunito","DM Sans","Inter"],Spectral:["Roboto","Source Sans 3","Open Sans","Karla"],"Bodoni Moda":["Raleway","Lato","DM Sans","Source Sans 3"],Gloock:["Inter","DM Sans","Manrope","Nunito Sans"],Newsreader:["Source Sans 3","Nunito Sans","Inter","Lato"],"Frank Ruhl Libre":["Raleway","Nunito","Lato","Open Sans"],"Instrument Serif":["Instrument Sans","Inter","DM Sans","Manrope"],"Crimson Text":["Source Sans 3","Raleway","Open Sans","Lato"],Inter:["Lora","Merriweather","Source Serif 4","EB Garamond"],Montserrat:["Merriweather","Lora","Source Serif 4","Open Sans"],Raleway:["Merriweather","Lora","Libre Baskerville","Open Sans"],"Space Grotesk":["Inter","Lora","DM Sans","Source Serif 4"],Syne:["DM Sans","Inter","Manrope","Lora"],Outfit:["Inter","Nunito","Lora","DM Sans"],"DM Sans":["DM Serif Display","Lora","Spectral","Inter"],"Plus Jakarta Sans":["Lora","Source Serif 4","Merriweather","Inter"],Poppins:["Lato","Open Sans","Source Sans 3","Nunito"],Manrope:["Lora","Source Serif 4","Inter","Nunito Sans"],Urbanist:["Lora","Merriweather","Inter","DM Sans"],"Bricolage Grotesque":["Inter","DM Sans","Lora","Source Serif 4"],"Instrument Sans":["Instrument Serif","Lora","EB Garamond","Inter"],"Hanken Grotesk":["Lora","Source Serif 4","Inter","Nunito"],Archivo:["Lora","Merriweather","Inter","Source Serif 4"],Lexend:["Lora","Merriweather","Inter","Open Sans"],"Bebas Neue":["Lato","Raleway","Open Sans","Montserrat"],Oswald:["Merriweather","Lato","EB Garamond","Source Sans 3"],Unbounded:["Inter","DM Sans","Manrope","Nunito Sans"],"Big Shoulders Display":["Inter","Lato","Source Sans 3","Raleway"],"Dela Gothic One":["Inter","DM Sans","Manrope","Lato"],"Yeseva One":["Josefin Sans","Raleway","Lato","Source Sans 3"],Anton:["Lato","Open Sans","Source Sans 3","Raleway"],"JetBrains Mono":["Inter","Lato","DM Sans","Source Sans 3"],"Fira Code":["Fira Sans","Source Sans 3","Inter","Lato"],"Space Mono":["Space Grotesk","Inter","DM Sans","Lato"]};function te(f){return Se[f]??[]}const j="fontara_v1_cache";function ne(){const f=[navigator.userAgent,navigator.language,`${screen.width}x${screen.height}`,String(new Date().getTimezoneOffset()),navigator.platform??""].join("|");let e=2166136261;for(let t=0;t<f.length;t++)e^=f.charCodeAt(t),e=e*16777619>>>0;return e.toString(36).padStart(7,"0")}function ie(){try{const f=localStorage.getItem(j);return f?JSON.parse(f):null}catch{return null}}function se(f,e){try{const t={key:f,valid:!0,expiresAt:e};localStorage.setItem(j,JSON.stringify(t))}catch{}}function $e(){try{localStorage.removeItem(j)}catch{}}async function Fe(f){const e=ie();try{const n=await(await fetch("https://app.fontara.it/api/verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:f,fingerprint:ne(),checkOnly:!0})})).json();return n.valid&&n.expiresAt?se(f,n.expiresAt):n.valid||$e(),n}catch{return e&&e.key===f&&e.valid?{valid:!0,expiresAt:e.expiresAt}:{valid:!1,error:"Network error"}}}async function ae(f){const e=ie();if(e&&e.key===f&&e.valid&&e.expiresAt>Date.now())return{valid:!0,expiresAt:e.expiresAt};try{const n=await(await fetch("https://app.fontara.it/api/verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:f,fingerprint:ne()})})).json();return n.valid&&n.expiresAt&&se(f,n.expiresAt),n}catch{return e&&e.key===f&&e.valid&&e.expiresAt+5184e5>Date.now()?{valid:!0,expiresAt:e.expiresAt}:{valid:!1,error:"Unable to reach Fontara servers. Check your connection and try again."}}}const q="__custom",re={100:"Thin",200:"ExtraLight",300:"Light",400:"Regular",500:"Medium",600:"SemiBold",700:"Bold",800:"ExtraBold",900:"Black"};function oe(){const f={};for(const e of E)f[e.id]={font:e.defaultFont,weight:e.defaultWeight,fontSize:e.defaultFontSize,lineHeight:e.defaultLineHeight,tracking:e.defaultTracking};return f}function D(f){return JSON.parse(JSON.stringify(f))}function V(f){const e=f.replace("#","");if(e.length!==6)return null;const t=parseInt(e.slice(0,2),16),n=parseInt(e.slice(2,4),16),i=parseInt(e.slice(4,6),16);return[t,n,i]}function ce(f,e,t){const n=i=>{const r=i/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)};return .2126*n(f)+.7152*n(e)+.0722*n(t)}function Ee(f,e){const t=V(f),n=V(e);if(!t||!n)return null;const i=ce(...t),r=ce(...n),o=Math.max(i,r),a=Math.min(i,r);return(o+.05)/(a+.05)}function C(f){const e=V(f);if(!e)return[0,0,100];const t=e[0]/255,n=e[1]/255,i=e[2]/255,r=Math.max(t,n,i),o=Math.min(t,n,i),a=r-o,s=r*100,d=r===0?0:a/r*100;let c=0;return a>0&&(r===t?c=(n-i)/a%6*60:r===n?c=((i-t)/a+2)*60:c=((t-n)/a+4)*60,c<0&&(c+=360)),[Math.round(c),Math.round(d),Math.round(s)]}function U(f,e,t){const n=e/100,i=t/100,r=o=>{const a=(o+f/60)%6,s=i-i*n*Math.max(0,Math.min(a,4-a,1));return Math.round(s*255).toString(16).padStart(2,"0")};return`#${r(5)}${r(3)}${r(1)}`}function I(f,e,t){const n=e/100,i=t/100,r=o=>{const a=(o+f/60)%6;return Math.round((i-i*n*Math.max(0,Math.min(a,4-a,1)))*255)};return[r(5),r(3),r(1)]}const Le=["#000000","#374151","#6b7280","#9ca3af","#d1d5db","#f3f4f6","#ffffff","#fef9c3","#ef4444","#f97316","#eab308","#22c55e","#06b6d4","#3b82f6","#8b5cf6","#ec4899"];function H(){try{const f=globalThis?.chrome?.storage?.local;return f&&typeof f.get=="function"?f:null}catch{return null}}class Me{constructor(e){W(this,"root");W(this,"_exportModalListenerActive",!1);W(this,"_colorPickerCloseListener",null);W(this,"_contrastBgCloseListener",null);W(this,"_destroyed",!1);W(this,"s",{open:!1,tab:"fonts",activeGroupIds:["h1"],elementStyles:oe(),searchQuery:"",category:"all",inspecting:!1,theme:"light",undoStack:[],redoStack:[],exportFormat:"css",showExportModal:!1,cssPrefix:"fn",licenseValid:!1,licenseEmail:null,showActivationModal:!1,showShortcutsHelp:!1,contrastBg:"#ffffff",contrastBgPickerOpen:!1,contrastBgH:0,contrastBgS:0,contrastBgV:100,advancedOpen:!1,contrastOpen:!1,pageFontsOpen:!1,pageFonts:[],customFonts:[],customFontDropActive:!1,customFontModal:!1,pendingFontName:"",pendingFontData:null,pendingFontFileName:"",colorPickerOpen:!1,pickerH:0,pickerS:0,pickerV:100,licenseKey:null,savedPresets:[],savedPresetsLoaded:!1,presetNameInput:"",presetSaveError:"",sharePairingToast:!1});this.restoreSession(),this.injectStyles(),this.root=document.createElement("div"),this.root.id="fontara-dock",this.s.theme==="dark"&&this.root.classList.add("dark"),this.restoreDockPosition(),document.body.appendChild(this.root),this.loadCustomFonts(),this.attachDropZone(),this.render(),this.preloadAllFonts(),this.attachGlobalKeydown(),this.checkLicenseCache().then(async()=>{this.s.licenseValid&&this.s.licenseKey&&(this.rerender(),this.bgVerifyLicense(this.s.licenseKey),await this.loadSavedPresets().catch(()=>{})),e&&!this.s.licenseValid&&await this.autoVerifyKey(e)})}restoreDockPosition(){try{const e=localStorage.getItem("fontara_dock_pos");if(!e)return;const{right:t,bottom:n}=JSON.parse(e);typeof t=="number"&&(this.root.style.right=`${t}px`),typeof n=="number"&&(this.root.style.bottom=`${n}px`)}catch{}}saveDockPosition(){try{const e=parseFloat(this.root.style.right)||24,t=parseFloat(this.root.style.bottom)||24;localStorage.setItem("fontara_dock_pos",JSON.stringify({right:e,bottom:t}))}catch{}}getPanelLayout(){const e=this.root.getBoundingClientRect(),t=12,n=e.top-t,i=window.innerHeight-e.bottom-t,r=260;return n>=r&&n>=i?{dir:"above",maxHeight:`${Math.min(n,window.innerHeight*.85)}px`}:i>=r?{dir:"below",maxHeight:`${Math.min(i,window.innerHeight*.85)}px`}:n>=i?{dir:"above",maxHeight:`${Math.max(n,260)}px`}:{dir:"below",maxHeight:`${Math.max(i,260)}px`}}injectStyles(){if(document.getElementById("fontara-styles"))return;const e=document.createElement("style");e.id="fontara-styles",e.textContent=B,document.head.appendChild(e)}restoreSession(){try{const e=localStorage.getItem("fontara_session_v3");if(!e)return;const t=JSON.parse(e);t.elementStyles&&(this.s.elementStyles=t.elementStyles),t.theme&&(this.s.theme=t.theme)}catch{}}saveSession(){try{localStorage.setItem("fontara_session_v3",JSON.stringify({elementStyles:this.s.elementStyles,theme:this.s.theme}))}catch{}}loadCustomFonts(){const e=H();if(e)e.get("fontara_custom_fonts",t=>{const n=t.fontara_custom_fonts;n?.length&&(this.s.customFonts=n,n.forEach(i=>this.injectFontFace(i)),this.rerender())});else try{const t=localStorage.getItem("fontara_custom_fonts");if(!t)return;const n=JSON.parse(t);this.s.customFonts=n,n.forEach(i=>this.injectFontFace(i))}catch{}}saveCustomFonts(){const e=H();if(e)e.set({fontara_custom_fonts:this.s.customFonts});else try{localStorage.setItem("fontara_custom_fonts",JSON.stringify(this.s.customFonts))}catch{}}injectFontFace(e){const t=`fn-custom-font-${e.id}`;if(document.getElementById(t))return;const n=document.createElement("style");n.id=t,n.textContent=`@font-face { font-family: ${JSON.stringify(e.name)}; src: url('${e.dataUrl}'); }`,document.head.appendChild(n)}handleFontFile(e){const t=[".ttf",".otf",".woff",".woff2"],n=e.name.toLowerCase();if(!t.some(r=>n.endsWith(r)))return;const i=new FileReader;i.onload=r=>{const o=r.target?.result;o&&(this.s.pendingFontData=o,this.s.pendingFontFileName=e.name.replace(/\.[^.]+$/,""),this.s.pendingFontName=this.s.pendingFontFileName,this.s.customFontModal=!0,this.rerender())},i.readAsDataURL(e)}handleMultipleFontFiles(e){const t=[".ttf",".otf",".woff",".woff2"],n=e.filter(o=>t.some(a=>o.name.toLowerCase().endsWith(a)));if(!n.length)return;let i=0;const r=[];n.forEach(o=>{const a=o.name.replace(/\.[^.]+$/,""),s=new FileReader;s.onload=d=>{const c=d.target?.result;if(c){const l={id:`cf_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,name:a,dataUrl:c};this.injectFontFace(l),r.push(l)}++i===n.length&&(this.s.customFonts=[...this.s.customFonts,...r],this.saveCustomFonts(),this.s.tab="fonts",this.s.category=q,this.rerender())},s.readAsDataURL(o)})}attachDropZone(){this.root.addEventListener("dragover",e=>{if(!this.s.licenseValid)return;const t=e.dataTransfer?.items;if(t){for(let n=0;n<t.length;n++)if(t[n].kind==="file"){e.preventDefault(),this.s.customFontDropActive||(this.s.customFontDropActive=!0,this.root.classList.add("fn-drop-active"));break}}}),this.root.addEventListener("dragleave",e=>{this.root.contains(e.relatedTarget)||(this.s.customFontDropActive=!1,this.root.classList.remove("fn-drop-active"))}),this.root.addEventListener("drop",e=>{if(e.preventDefault(),this.s.customFontDropActive=!1,this.root.classList.remove("fn-drop-active"),!this.s.licenseValid)return;const t=e.dataTransfer?.files;t?.length&&(t.length===1?this.handleFontFile(t[0]):this.handleMultipleFontFiles(Array.from(t)))})}preloadAllFonts(){const e=new Set;for(const t of Object.values(this.s.elementStyles))e.add(t.font);for(const t of e){const n=z(t);n&&T(t,n.weights,n.wdth)}}applyStyles(){ue(this.s.elementStyles)}saveLicenseCache(e){const t={valid:!0,...e};try{localStorage.setItem("fontara_v1_cache",JSON.stringify(t))}catch{}const n=H();n&&n.set({fontara_v1_cache:t})}async checkLicenseCache(){let e=null;const t=H();if(t&&(e=await new Promise(n=>{t.get("fontara_v1_cache",i=>{n(i.fontara_v1_cache??null)})}),e?.valid&&e.expiresAt>Date.now()))try{localStorage.setItem("fontara_v1_cache",JSON.stringify(e))}catch{}if(!e)try{const n=localStorage.getItem("fontara_v1_cache");e=n?JSON.parse(n):null}catch{}e?.valid&&e.expiresAt>Date.now()&&(this.s.licenseValid=!0,this.s.licenseEmail=e.email??null,this.s.licenseKey=e.key??null)}async autoVerifyKey(e){try{const t=await ae(e);t.valid&&(this.s.licenseValid=!0,this.s.licenseEmail=t.email??null,this.s.licenseKey=e,this.saveLicenseCache({key:e,email:t.email,expiresAt:t.expiresAt}),this.rerender(),this.loadSavedPresets())}catch{}}async bgVerifyLicense(e){try{const t=await Fe(e);if(!t.valid){if(t.error==="Network error")return;this.clearLicenseCacheAll(),this.s.licenseValid=!1,this.s.licenseEmail=null,this.rerender()}}catch{}}clearLicenseCacheAll(){try{localStorage.removeItem("fontara_v1_cache")}catch{}const e=H();e&&e.remove("fontara_v1_cache")}async loadSavedPresets(){if(this.s.licenseKey)try{const e=await fetch("https://app.fontara.it/api/presets",{headers:{"x-fontara-key":this.s.licenseKey}});if(!e.ok)return;const t=await e.json();this.s.savedPresets=t.presets??[],this.s.savedPresetsLoaded=!0,this.rerender()}catch{}}async savePreset(e){if(!e.trim()){this.s.presetSaveError="Enter a name first.",this.rerender();return}if(!this.s.licenseKey){this.s.presetSaveError="Not activated — activate PRO first.",this.rerender();return}const t=this.q("#fn-save-preset");t&&(t.disabled=!0,t.textContent="Saving…"),this.s.presetSaveError="";const n=this.s.elementStyles.h1,i=this.s.elementStyles.body;try{const r=await fetch("https://app.fontara.it/api/presets",{method:"POST",headers:{"Content-Type":"application/json","x-fontara-key":this.s.licenseKey},body:JSON.stringify({name:e.trim(),headingFont:n.font,bodyFont:i.font,headingWeight:n.weight,bodyWeight:i.weight,config:D(this.s.elementStyles)})});if(!r.ok){const a=await r.json().catch(()=>({}));this.s.presetSaveError=a.error??`Server error ${r.status}`,this.rerender();return}const o=await r.json();this.s.savedPresets=[o.preset,...this.s.savedPresets],this.s.presetNameInput="",this.s.presetSaveError="",this.rerender()}catch(r){this.s.presetSaveError=r instanceof Error?r.message:"Network error. Try again.",this.rerender()}}async deletePreset(e){if(this.s.licenseKey){this.s.savedPresets=this.s.savedPresets.filter(t=>t.id!==e),this.rerender();try{await fetch(`https://app.fontara.it/api/presets/${e}`,{method:"DELETE",headers:{"x-fontara-key":this.s.licenseKey}})}catch{}}}pushUndo(){this.s.undoStack.push(D(this.s.elementStyles)),this.s.undoStack.length>(this.s.licenseValid?50:5)&&this.s.undoStack.shift(),this.s.redoStack=[]}undo(){this.s.undoStack.length!==0&&(this.s.redoStack.push(D(this.s.elementStyles)),this.s.elementStyles=this.s.undoStack.pop(),this.applyStyles(),this.saveSession(),this.rerender())}redo(){this.s.redoStack.length!==0&&(this.s.undoStack.push(D(this.s.elementStyles)),this.s.elementStyles=this.s.redoStack.pop(),this.applyStyles(),this.saveSession(),this.rerender())}attachGlobalKeydown(){document.addEventListener("keydown",e=>{const t=e.target,n=t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable,i=t.id==="fn-search";if(this.s.open&&this.s.tab==="fonts"&&(e.key==="ArrowDown"||e.key==="ArrowUp")){if(n&&!i)return;e.preventDefault();const r=Array.from(this.root.querySelectorAll(".fn-font-item"));if(r.length===0)return;const o=r.findIndex(d=>d.classList.contains("selected")),a=e.key==="ArrowDown"?o<r.length-1?o+1:0:o>0?o-1:r.length-1,s=r[a];s?.dataset.font&&(this.selectFont(s.dataset.font),s.scrollIntoView({block:"nearest"}));return}if(this.s.open&&this.s.tab==="fonts"&&e.key==="Enter"&&i){e.preventDefault();const o=this.root.querySelector(".fn-font-item.selected")??this.root.querySelector(".fn-font-item");o?.dataset.font&&(this.selectFont(o.dataset.font),e.target.blur());return}if(e.key==="Escape"){if(this.s.showActivationModal){this.s.showActivationModal=!1,this.rerender();return}if(this.s.showShortcutsHelp){this.s.showShortcutsHelp=!1,this.rerender();return}if(this.s.showExportModal){this.s.showExportModal=!1,this.rerender();return}if(this.s.customFontModal){this.s.customFontModal=!1,this.s.pendingFontData=null,this.rerender();return}if(this.s.inspecting){this.toggleInspect();return}return}if(!n){if(e.ctrlKey&&e.shiftKey&&e.key==="F"){e.preventDefault(),this.togglePanel();return}if(e.key==="?"&&!e.ctrlKey&&!e.metaKey){e.preventDefault(),this.s.showShortcutsHelp=!this.s.showShortcutsHelp,this.rerender();return}if(this.s.open){if(e.ctrlKey&&!e.shiftKey&&e.key==="z"){e.preventDefault(),this.undo();return}if(e.ctrlKey&&(e.key==="y"||e.shiftKey&&e.key==="z")){e.preventDefault(),this.redo();return}e.key==="1"&&(this.s.tab="fonts",this.rerender()),e.key==="2"&&(this.s.tab="settings",this.rerender()),e.key==="3"&&(this.s.tab="presets",this.rerender())}}})}render(){const e=this.getPanelLayout();this.root.innerHTML=`
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
          ${this.s.licenseValid?`<div class="fn-pro-info">
           <span class="fn-badge fn-badge-pro">PRO</span>
           <div class="fn-pro-info-popup">
             <div class="fn-pro-info-popup-inner">
               <div style="font-weight:600;margin-bottom:4px;color:rgba(255,255,255,0.92);">🔑 Keep your key private</div>
               <div style="color:rgba(255,255,255,0.6);margin-bottom:8px;">To use Fontara on another browser, remove this device from your dashboard first, then activate on the new one.</div>
               <a href="https://app.fontara.it/dashboard" target="_blank" rel="noopener"
                 style="color:#a78bfa;font-weight:600;text-decoration:none;">Manage devices →</a>
             </div>
           </div>
         </div>`:`<span class="fn-badge">FREE</span>
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
          <p class="fn-activation-footer" style="margin-top:6px;">
            Don't have a license key? <a href="https://app.fontara.it/pricing" target="_blank" rel="noopener">Get Fontara PRO</a>
          </p>
        </div>
      </div>
    `}renderTabs(){return`
      <div class="fn-tabs">
        ${[["fonts","Fonts"],["settings","Settings"],["presets","Presets"]].map(([t,n])=>`<button class="fn-tab ${this.s.tab===t?"active":""}" data-tab="${t}">${n}</button>`).join("")}
      </div>
    `}renderFontsTab(){const e=this.s.activeGroupIds[0]??"h1",t=E.find(c=>c.id===e)??E[0],n=this.s.elementStyles[e]?.font??t.defaultFont,i=this.s.elementStyles[e]?.weight??t.defaultWeight,r=te(n),o=ee(this.s.searchQuery,this.s.category),a=z(n),s=this.s.activeGroupIds.length>1,d=this.s.elementStyles[e];return`
      <!-- Element group chips -->
      <div class="fn-section" style="padding-bottom:8px;">
        <div class="fn-label">
          Element ${s?`<span style="color:var(--fn-accent);">(${this.s.activeGroupIds.length} selected)</span>`:""}
          <span style="font-size:9px;color:var(--fn-text-faint);font-weight:400;margin-left:4px;">ctrl+click to multi-select</span>
        </div>
        <div class="fn-element-chips">
          ${E.map(c=>`
            <button class="fn-chip ${this.s.activeGroupIds.includes(c.id)?"active":""}"
              data-group="${c.id}"
              title="${this.s.elementStyles[c.id]?.font??c.defaultFont}">
              ${c.label}
            </button>
          `).join("")}
        </div>
        <div class="fn-current-element">
          ${s?`Editing <strong>${this.s.activeGroupIds.map(c=>E.find(y=>y.id===c)?.label).join(", ")}</strong> simultaneously`:`Editing <strong>${t.label}</strong>:
               <span style="font-family:'${this.esc(n)}',system-ui;font-weight:${i};">
                 ${n} ${i}
               </span>`}
        </div>
      </div>

      <!-- Search + category -->
      <div class="fn-section" style="padding-top:0;">
        <input class="fn-search" id="fn-search"
          placeholder="Search ${_.length} fonts…"
          value="${this.esc(this.s.searchQuery)}"
          autocomplete="off" spellcheck="false" />
        <div class="fn-cats">
          ${ke.map(c=>`
            <button class="fn-cat ${this.s.category===c.id?"active":""}" data-cat="${c.id}">${c.label}</button>
          `).join("")}
          <button class="fn-cat fn-cat-custom ${this.s.category===q?"active":""}" data-cat="${q}">My Fonts${this.s.customFonts.length>0&&this.s.licenseValid?` (${this.s.customFonts.length})`:""}${this.s.licenseValid?"":' <span class="fn-pro-inline">PRO</span>'}</button>
        </div>

        <!-- Font list -->
        <div class="fn-font-list ${this.s.customFontDropActive?"fn-drop-active":""}" id="fn-font-list">
          ${this.s.category===q?this.renderCustomFontItems():this.renderFontItems(o,n)}
        </div>
      </div>

      <!-- Weight picker -->
      ${a&&a.weights.length>1?`
        <div class="fn-section" style="padding-top:0;">
          <div class="fn-label">Weight</div>
          <div class="fn-weights">
            ${a.weights.map(c=>`
              <button class="fn-weight-btn ${c===i?"active":""}"
                data-weight="${c}" style="font-weight:${c};">
                ${re[c]??c}
              </button>
            `).join("")}
          </div>
        </div>
      `:""}

      <!-- Variable font axes -->
      ${a?.variable&&!s?`
        <div class="fn-section" style="padding-top:0;">
          <div class="fn-varfont-section">
            <div class="fn-label">Variable Font Axes</div>
            ${a.wdth&&this.s.licenseValid?`
              <div class="fn-setting-row">
                <div class="fn-setting-label">
                  <span>Stretch</span>
                  <span class="fn-val" id="fn-val-stretch">${d?.fontStretch??100}%</span>
                </div>
                <input type="range" class="fn-slider" id="fn-font-stretch"
                  min="${a.wdth[0]}" max="${a.wdth[1]}" step="1" value="${Math.max(a.wdth[0],Math.min(a.wdth[1],d?.fontStretch??100))}" />
              </div>
            `:""}
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:11px;font-weight:600;color:var(--fn-text-secondary);">Style</span>
              <button class="fn-italic-toggle ${d?.fontStyle==="italic"?"active":""}"
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
            ${r.map(c=>`
              <button class="fn-suggestion ${n===c?"active":""}" data-suggest="${this.esc(c)}">${c}</button>
            `).join("")}
          </div>
        </div>
      `:""}
    `}renderFontItems(e,t){return e.length===0?`<p class="fn-empty">No fonts match "${this.esc(this.s.searchQuery)}"</p>`:e.slice(0,100).map(n=>`
      <div class="fn-font-item ${n.family===t?"selected":""}"
        data-font="${this.esc(n.family)}">
        <span class="fn-font-name">${this.esc(n.family)}</span>
        <span class="fn-font-preview" style="font-family:'${this.esc(n.family)}',system-ui">Aa</span>
      </div>
    `).join("")}renderCustomFontItems(){const e=this.s.elementStyles[this.s.activeGroupIds[0]??"h1"]?.font??"";return this.s.customFonts.length===0?`
        <div class="fn-drop-zone" id="fn-custom-drop-zone">
          <div class="fn-drop-zone-icon">⬆</div>
          <div class="fn-drop-zone-text">Drop a font file here</div>
          <div class="fn-drop-zone-sub">.ttf · .otf · .woff · .woff2</div>
          <label class="fn-drop-zone-browse">
            <input type="file" id="fn-custom-font-file" accept=".ttf,.otf,.woff,.woff2" multiple style="display:none;" />
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
          <input type="file" id="fn-custom-font-file" accept=".ttf,.otf,.woff,.woff2" multiple style="display:none;" />
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
    `}detectPageFonts(){const e=new Set(["serif","sans-serif","monospace","cursive","fantasy","system-ui","ui-serif","ui-sans-serif","ui-monospace","ui-rounded","-apple-system","BlinkMacSystemFont","Segoe UI","Segoe UI Emoji","Segoe UI Symbol","Helvetica Neue","Helvetica","Arial","Arial Black","Times New Roman","Times","Courier New","Courier","Verdana","Georgia","Palatino","Garamond","Tahoma","Trebuchet MS","Impact","Comic Sans MS","Lucida Console"]),t=new Set;let n=0;for(const i of document.querySelectorAll("body *")){if(!(i instanceof HTMLElement)||i.closest("#fontara-dock"))continue;if(++n>2e3)break;const r=window.getComputedStyle(i).fontFamily;for(const o of r.split(",")){const a=o.trim().replace(/^["']|["']$/g,"");if(a&&!e.has(a)){t.add(a);break}}}return[...t].sort()}renderSettingsTab(){const e=this.s.activeGroupIds[0]??"h1",t=this.s.elementStyles[e],n=E.find(l=>l.id===e),i=this.s.activeGroupIds.length>1,r=t.textColor??(this.s.theme==="dark"?"#f1f5f9":"#111827"),o=this.s.contrastBg,a=Ee(r,o),s=a!=null?a.toFixed(2):"—",d=a!=null&&a>=4.5,c=a!=null&&a>=3,y=a!=null&&a>=7;return`
      <div class="fn-section">
        <div class="fn-label" style="margin-bottom:10px;">
          Settings for
          <strong style="color:var(--fn-text-secondary);">
            ${i?this.s.activeGroupIds.map(l=>E.find(p=>p.id===l)?.label).join(", "):n.label}
          </strong>
          ${i?'<span style="color:var(--fn-accent);font-size:9px;"> — applied to all selected</span>':""}
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
            <span class="fn-val" id="fn-val-track">${(t.tracking*1e3).toFixed(0)}%</span>
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
              value="${this.esc(t.textColor??(this.s.theme==="dark"?"#f1f5f9":"#111827"))}"
              maxlength="7" spellcheck="false" autocomplete="off" />
          </div>
          ${this.s.colorPickerOpen?this.renderColorPicker("text",this.s.pickerH,this.s.pickerS,this.s.pickerV):""}
        </div>

        <!-- PRO Typography (always visible for PRO users) -->
        <div style="border-top:1px solid var(--fn-border-light);padding-top:8px;margin-bottom:12px;">
          ${this.s.licenseValid?`
            <div class="fn-label" style="margin-bottom:8px;display:flex;align-items:center;">Typography<i class="fn-tip" data-tip="Text transform &amp; word spacing">i</i></div>
            <div class="fn-setting-row">
              <div class="fn-setting-label" style="margin-bottom:6px;"><span>Text transform</span></div>
              <div style="display:flex;gap:4px;">
                ${["none","uppercase","lowercase","capitalize"].map(l=>`
                  <button class="fn-tt-btn${(t.textTransform??"none")===l?" fn-tt-active":""}"
                    data-tt="${l}">${l==="none"?"Aa":l==="uppercase"?"AA":l==="lowercase"?"aa":"Aa↑"}</button>
                `).join("")}
              </div>
            </div>
            <div class="fn-setting-row">
              <div class="fn-setting-label">
                <span>Word spacing</span>
                <span class="fn-val" id="fn-val-wspace">${((t.wordSpacing??0)*1e3).toFixed(0)}%</span>
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
              <div style="margin-bottom:8px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;">
                  <div style="font-size:10px;color:var(--fn-text-faint);">Background</div>
                  ${o!=="#ffffff"?'<button class="fn-color-reset" id="fn-contrast-bg-reset">Reset</button>':""}
                </div>
                <div class="fn-color-row">
                  <div class="fn-color-swatch-box" id="fn-contrast-bg-swatch"
                    style="background:${this.esc(o)};" title="Open color picker"></div>
                  <input type="text" class="fn-color-hex" id="fn-contrast-bg-hex"
                    value="${this.esc(o)}" placeholder="#hex" maxlength="7"
                    spellcheck="false" autocomplete="off" />
                </div>
                ${this.s.contrastBgPickerOpen?this.renderColorPicker("cbg",this.s.contrastBgH,this.s.contrastBgS,this.s.contrastBgV):""}
              </div>
              <div class="fn-contrast-row" style="margin-bottom:6px;">
                <div style="flex:1;">
                  <div style="font-size:10px;color:var(--fn-text-faint);margin-bottom:2px;">Ratio</div>
                  <div class="fn-contrast-ratio">${s}:1</div>
                </div>
              </div>
              <div class="fn-contrast-badges">
                <span class="fn-contrast-badge ${d?"fn-contrast-pass":"fn-contrast-fail"}">AA ${d?"✓":"✗"}</span>
                <span class="fn-contrast-badge ${c?"fn-contrast-pass":"fn-contrast-fail"}">AA Large ${c?"✓":"✗"}</span>
                <span class="fn-contrast-badge ${y?"fn-contrast-pass":"fn-contrast-fail"}">AAA ${y?"✓":"✗"}</span>
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

        <!-- Page fonts (collapsible, PRO) -->
        <div style="border-top:1px solid var(--fn-border-light);padding-top:8px;margin-bottom:8px;">
          <div class="fn-collapsible-header" id="${this.s.licenseValid?"fn-page-fonts-toggle":"fn-page-fonts-pro-upsell"}">
            <span class="fn-label" style="margin-bottom:0;display:flex;align-items:center;">Fonts on this page${this.s.licenseValid?"":' <span class="fn-pro-inline">PRO</span>'}<i class="fn-tip" data-tip="Detect all fonts currently used on this page and apply them instantly">i</i></span>
            <span class="fn-collapsible-arrow ${this.s.pageFontsOpen&&this.s.licenseValid?"open":""}">▶</span>
          </div>
          ${this.s.pageFontsOpen&&this.s.licenseValid?`
            <div style="margin-top:8px;">
              ${this.s.pageFonts.length===0?`
                <div style="font-size:10px;color:var(--fn-text-faint);">No custom fonts detected on this page.</div>
              `:`
                <div style="display:flex;flex-direction:column;gap:3px;">
                  ${this.s.pageFonts.map(l=>`
                    <button class="fn-page-font-btn" data-font="${this.esc(l)}"
                      style="text-align:left;padding:5px 8px;border-radius:6px;border:1px solid var(--fn-border);background:var(--fn-surface);cursor:pointer;font-size:11px;color:var(--fn-text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;">
                      ${this.esc(l)}
                    </button>
                  `).join("")}
                </div>
                <div style="font-size:10px;color:var(--fn-text-faint);margin-top:6px;">Click a font to apply it to ${this.esc(n.label)}.</div>
              `}
              <button class="fn-page-font-rescan" id="fn-page-fonts-rescan"
                style="margin-top:6px;font-size:10px;color:var(--fn-accent);background:none;border:none;cursor:pointer;padding:0;text-decoration:underline;">
                Rescan
              </button>
            </div>
          `:""}
        </div>

        <button class="fn-btn-reset-settings" id="fn-reset-settings">
          Reset ${n.label} to defaults
        </button>
      </div>
    `}renderColorPicker(e,t,n,i){const r=U(t,n,i),[o,a,s]=I(t,n,i),d=Le.map(c=>`<div class="fn-cpicker-swatch" data-cpicker-swatch="${this.esc(c)}" data-cpicker-suffix="${e}"
        style="background:${this.esc(c)};" title="${this.esc(c)}"></div>`).join("");return`
      <div class="fn-color-picker" id="fn-color-picker-${e}">
        <div class="fn-cpicker-swatches">${d}</div>
        <div class="fn-cpicker-sv" id="fn-cpicker-sv-${e}" style="background:hsl(${t},100%,50%);">
          <div class="fn-cpicker-sv-white"></div>
          <div class="fn-cpicker-sv-black"></div>
          <div class="fn-cpicker-sv-thumb" id="fn-cpicker-sv-thumb-${e}"
            style="left:${n}%;top:${100-i}%;"></div>
        </div>
        <div class="fn-cpicker-hue" id="fn-cpicker-hue-${e}">
          <div class="fn-cpicker-hue-thumb" id="fn-cpicker-hue-thumb-${e}"
            style="left:${t/360*100}%;"></div>
        </div>
        <div class="fn-cpicker-bottom">
          <div class="fn-cpicker-rgb-row">
            <div class="fn-cpicker-rgb-col">
              <input type="number" class="fn-cpicker-rgb-input" id="fn-cpicker-r-${e}"
                min="0" max="255" value="${o}" />
              <label class="fn-cpicker-rgb-label">R</label>
            </div>
            <div class="fn-cpicker-rgb-col">
              <input type="number" class="fn-cpicker-rgb-input" id="fn-cpicker-g-${e}"
                min="0" max="255" value="${a}" />
              <label class="fn-cpicker-rgb-label">G</label>
            </div>
            <div class="fn-cpicker-rgb-col">
              <input type="number" class="fn-cpicker-rgb-input" id="fn-cpicker-b-${e}"
                min="0" max="255" value="${s}" />
              <label class="fn-cpicker-rgb-label">B</label>
            </div>
          </div>
          <div class="fn-cpicker-hex-row">
            <div class="fn-cpicker-preview" id="fn-cpicker-preview-${e}"
              style="background:${this.esc(r)};"></div>
            <button class="fn-cpicker-eyedropper" id="fn-cpicker-eyedropper-${e}" title="Pick color from page">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8-3 3-1.5-1.5 3-3-1-1"/>
              </svg>
            </button>
            <input type="text" class="fn-color-hex fn-cpicker-hex-input" id="fn-cpicker-hex-${e}"
              value="${this.esc(r)}" maxlength="7" spellcheck="false" autocomplete="off" />
          </div>
        </div>
      </div>
    `}renderPresetsTab(){const e=R.filter(a=>!a.pro),t=R.filter(a=>a.pro),n=e.length-8,i=this.s.licenseValid,r=i?`
      <div class="fn-saved-section">
        <div class="fn-label" style="margin-bottom:6px;">
          My Presets
          ${this.s.sharePairingToast?'<span style="margin-left:8px;font-size:10px;color:#10b981;font-weight:600;">✓ Link copied!</span>':'<button class="fn-share-btn" id="fn-share-pairing" title="Share current pairing">⬆ Share</button>'}
        </div>
        <div class="fn-save-preset-row">
          <input class="fn-save-preset-input" id="fn-preset-name"
            placeholder="Name this setup…"
            value="${this.esc(this.s.presetNameInput)}"
            spellcheck="false" autocomplete="off" maxlength="80" />
          <button class="fn-save-preset-btn" id="fn-save-preset">Save</button>
        </div>
        ${this.s.presetSaveError?`<p style="font-size:10px;color:#f87171;margin:2px 0 4px;line-height:1.4;">${this.esc(this.s.presetSaveError)}</p>`:""}
        ${this.s.savedPresets.length>0?this.s.savedPresets.map(a=>`
              <div class="fn-saved-preset-card" data-saved-preset="${this.esc(a.id)}">
                <span class="fn-saved-preset-name">${this.esc(a.name)}</span>
                <span style="font-size:10px;color:var(--fn-text-faint);margin-right:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90px;">
                  ${this.esc(a.headingFont)} + ${this.esc(a.bodyFont)}
                </span>
                <button class="fn-preset-delete-btn" data-delete-preset="${this.esc(a.id)}" title="Delete">✕</button>
              </div>
            `).join(""):'<p class="fn-empty" style="padding:2px 0 6px;">No saved presets yet.</p>'}
      </div>
      <div class="fn-presets-divider"></div>
    `:`
      <div style="margin-bottom:10px;padding:9px 11px;background:rgba(124,58,237,0.07);border:1px solid rgba(124,58,237,0.2);border-radius:9px;">
        <p style="font-size:11px;font-weight:600;color:rgba(124,58,237,0.95);margin:0 0 2px;">Save your own presets</p>
        <p style="font-size:10px;color:var(--fn-text-faint);margin:0 0 7px;line-height:1.45;">+ unlock ${t.length+n} more font pairings with PRO</p>
        <button id="fn-upsell-preset" style="width:100%;padding:5px 0;border:none;border-radius:6px;background:rgba(124,58,237,0.85);color:white;font-size:11px;font-weight:600;cursor:pointer;letter-spacing:-0.01em;">Unlock PRO →</button>
      </div>
    `,o=(a,s)=>`
      <button class="fn-preset-card${s?" fn-preset-locked":""}${a.pro?" fn-preset-pro-card":""}"
        data-preset-id="${a.id}"${s?' data-preset-locked="1"':""}>
        <div class="fn-preset-heading"
          style="font-family:'${this.esc(a.headingFont)}',serif;font-weight:${a.headingWeight};">
          ${a.headingFont}${s?` <span class="fn-preset-lock-badge">${a.pro?"✦ PRO":"🔒 PRO"}</span>`:""}
        </div>
        <div class="fn-preset-body"
          style="font-family:'${this.esc(a.bodyFont)}',sans-serif;">
          ${a.bodyFont} — ${a.description}
        </div>
        <div class="fn-preset-tags">
          ${a.tags.filter(d=>d!=="pro").map(d=>`<span class="fn-tag">${d}</span>`).join("")}
        </div>
      </button>
    `;return`
      <div class="fn-presets-list" id="fn-presets-list">
        ${r}

        <!-- Free pairings (first 8 free, rest locked) -->
        ${e.map((a,s)=>o(a,!i&&s>=8)).join("")}

        <!-- PRO Exclusive section -->
        <div class="fn-pro-section-header">
          <span class="fn-pro-section-badge">✦ PRO Exclusive</span>
          <span class="fn-pro-section-sub">Unique curated pairings</span>
        </div>
        ${t.map(a=>o(a,!i)).join("")}

        ${i&&this.s.licenseKey?`
        <div style="margin-top:14px;padding:9px 11px;background:var(--fn-surface);border:1px solid var(--fn-border);border-radius:9px;">
          <div style="font-size:10px;font-weight:600;color:var(--fn-text-secondary);margin-bottom:5px;">Your license</div>
          <div style="font-size:10px;color:var(--fn-text-faint);margin-bottom:6px;font-family:monospace;letter-spacing:0.03em;">
            ${this.esc(this.s.licenseKey.slice(0,9))}••••••••••••••
          </div>
          <div style="font-size:10px;color:var(--fn-text-faint);line-height:1.5;margin-bottom:6px;">
            Keep your key private. To use Fontara on another browser, first
            remove this device from your dashboard, then activate on the new browser.
          </div>
          <a href="https://app.fontara.it/dashboard" target="_blank" rel="noopener"
            style="font-size:10px;color:var(--fn-accent);text-decoration:none;font-weight:600;">
            Manage devices →
          </a>
        </div>
        `:""}
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
        <div class="fn-export-divider"></div>
        <button class="fn-export-opt fn-export-opt-coming" disabled title="Coming soon — PRO">
          Figma Plugin <span class="fn-coming-badge">soon</span>
        </button>
        <button class="fn-export-opt fn-export-opt-coming" disabled title="Coming soon — PRO">
          VS Code <span class="fn-coming-badge">soon</span>
        </button>
        ${e?`<div class="fn-export-prefix">
          <label>Prefix</label>
          <input id="fn-css-prefix" type="text" value="${this.s.cssPrefix}" placeholder="fn" maxlength="20" spellcheck="false" />
        </div>`:""}
      </div>
    `}attachListeners(){this.attachTriggerDrag(),this.q("#fn-close")?.addEventListener("click",()=>this.togglePanel()),this.q("#fn-undo")?.addEventListener("click",()=>this.undo()),this.q("#fn-redo")?.addEventListener("click",()=>this.redo()),this.q("#fn-theme-toggle")?.addEventListener("click",()=>{this.s.theme=this.s.theme==="dark"?"light":"dark",this.root.classList.toggle("dark",this.s.theme==="dark"),this.saveSession(),this.rerender()}),this.q("#fn-shortcuts-btn")?.addEventListener("click",()=>{this.s.showShortcutsHelp=!this.s.showShortcutsHelp,this.rerender()}),this.q("#fn-shortcuts-close")?.addEventListener("click",()=>{this.s.showShortcutsHelp=!1,this.rerender()}),this.q("#fn-activate-link")?.addEventListener("click",()=>{this.s.showActivationModal=!0,this.rerender()}),this.q("#fn-activation-cancel")?.addEventListener("click",s=>{s.preventDefault(),this.s.showActivationModal=!1,this.rerender()}),this.q("#fn-license-submit")?.addEventListener("click",()=>this.handleLicenseSubmit()),this.q("#fn-license-key")?.addEventListener("keydown",s=>{s.key==="Enter"&&this.handleLicenseSubmit()}),this.q("#fn-reset")?.addEventListener("click",()=>{this.pushUndo(),me(),this.s.elementStyles=oe();try{localStorage.removeItem("fontara_session_v3")}catch{}this.rerender()}),this.q("#fn-export")?.addEventListener("click",s=>{s.stopPropagation(),this.s.showExportModal=!this.s.showExportModal,this.rerender()}),this.root.querySelectorAll("[data-export-format]").forEach(s=>s.addEventListener("click",()=>{if(s.dataset.exportLocked){this.s.showExportModal=!1,this.s.showActivationModal=!0,this.rerender();return}const d=s.dataset.exportFormat;this.s.showExportModal=!1,this.handleExport(d)})),this.q("#fn-css-prefix")?.addEventListener("input",s=>{this.s.cssPrefix=s.target.value}),this.s.showExportModal&&!this._exportModalListenerActive&&requestAnimationFrame(()=>{this._exportModalListenerActive||(this._exportModalListenerActive=!0,document.addEventListener("click",()=>{this._exportModalListenerActive=!1,this.s.showExportModal=!1,this.rerender()},{once:!0}))}),this.q("#fn-pick-element")?.addEventListener("click",()=>this.toggleInspect()),this.root.querySelectorAll(".fn-tab").forEach(s=>s.addEventListener("click",()=>{this.s.colorPickerOpen=!1,this.s.tab=s.dataset.tab,this.rerender()})),this.root.querySelectorAll(".fn-chip[data-group]").forEach(s=>s.addEventListener("click",d=>{this.s.colorPickerOpen=!1;const c=s.dataset.group;d.ctrlKey||d.metaKey?this.s.activeGroupIds.includes(c)?(this.s.activeGroupIds=this.s.activeGroupIds.filter(y=>y!==c),this.s.activeGroupIds.length===0&&(this.s.activeGroupIds=[c])):this.s.activeGroupIds=[...this.s.activeGroupIds,c]:this.s.activeGroupIds=[c],this.rerender()}));const e=this.q("#fn-search");e?.addEventListener("input",()=>{this.s.searchQuery=e.value,this.lightUpdateFontList()}),this.root.querySelectorAll(".fn-cat").forEach(s=>s.addEventListener("click",()=>{const d=s.dataset.cat;if(d===q&&!this.s.licenseValid){this.s.showActivationModal=!0,this.rerender();return}const c=d===q||this.s.category===q;this.s.category=d,c?this.rerender():this.lightUpdateFontList()})),this.attachFontItemListeners(),this.s.category===q&&this.attachCustomFontListeners(),this.q("#fn-custom-font-save")?.addEventListener("click",()=>{const d=(this.q("#fn-custom-font-name")?.value??this.s.pendingFontName).trim();if(!d||!this.s.pendingFontData)return;const y={id:`cf_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,name:d,dataUrl:this.s.pendingFontData};this.injectFontFace(y),this.s.customFonts=[...this.s.customFonts,y],this.saveCustomFonts(),this.s.customFontModal=!1,this.s.pendingFontData=null,this.s.pendingFontFileName="",this.s.pendingFontName="",this.s.tab="fonts",this.s.category=q,this.rerender()}),this.q("#fn-custom-font-cancel")?.addEventListener("click",()=>{this.s.customFontModal=!1,this.s.pendingFontData=null,this.s.pendingFontFileName="",this.s.pendingFontName="",this.rerender()}),this.q("#fn-custom-font-name")?.addEventListener("keydown",s=>{s.key==="Enter"&&this.q("#fn-custom-font-save")?.click()}),this.root.querySelectorAll(".fn-weight-btn").forEach(s=>s.addEventListener("click",()=>{this.pushUndo();const d=s.dataset.weight;for(const c of this.s.activeGroupIds)this.s.elementStyles[c].weight=d;this.applyStyles(),this.saveSession(),this.rerender()})),this.root.querySelectorAll(".fn-suggestion").forEach(s=>s.addEventListener("click",()=>this.selectFont(s.dataset.suggest))),this.root.querySelectorAll(".fn-preset-card").forEach(s=>s.addEventListener("click",()=>{if(s.dataset.presetLocked){this.s.showActivationModal=!0,this.rerender();return}const d=R.find(c=>c.id===s.dataset.presetId);if(d){this.pushUndo();for(const c of E)c.isHeading?(this.s.elementStyles[c.id].font=d.headingFont,this.s.elementStyles[c.id].weight=d.headingWeight):c.id==="body"&&(this.s.elementStyles[c.id].font=d.bodyFont,this.s.elementStyles[c.id].weight=d.bodyWeight);this.preloadAllFonts(),this.applyStyles(),this.saveSession(),this.rerender()}}));const t=this.q("#fn-font-stretch");t&&(t.addEventListener("input",()=>{const s=parseInt(t.value,10),d=this.s.activeGroupIds[0]??"h1";this.s.elementStyles[d].fontStretch=s;const c=this.q("#fn-val-stretch");c&&(c.textContent=`${s}%`),this.applyStyles(),this.saveSession()}),t.addEventListener("change",()=>this.pushUndo())),this.q("#fn-italic-toggle")?.addEventListener("click",()=>{this.pushUndo();const s=this.s.activeGroupIds[0]??"h1",d=this.s.elementStyles[s].fontStyle;this.s.elementStyles[s].fontStyle=d==="italic"?"normal":"italic",this.applyStyles(),this.saveSession(),this.rerender()}),this.attachSettingsListeners(),this.q("#fn-reset-settings")?.addEventListener("click",()=>{this.pushUndo();for(const s of this.s.activeGroupIds){const d=E.find(c=>c.id===s);this.s.elementStyles[s]={font:d.defaultFont,weight:d.defaultWeight,fontSize:d.defaultFontSize,lineHeight:d.defaultLineHeight,tracking:d.defaultTracking}}this.applyStyles(),this.saveSession(),this.rerender()}),this.q("#fn-typo-pro-upsell")?.addEventListener("click",()=>{this.s.showActivationModal=!0,this.rerender()}),this.root.querySelectorAll("[data-tt]").forEach(s=>{s.addEventListener("click",()=>{this.pushUndo();const d=s.dataset.tt;for(const c of this.s.activeGroupIds)this.s.elementStyles[c].textTransform=d;this.applyStyles(),this.saveSession(),this.rerender()})});const n=this.q("#fn-word-spacing");n&&(n.addEventListener("input",()=>{const s=parseFloat(n.value)*.001;for(const c of this.s.activeGroupIds)this.s.elementStyles[c].wordSpacing=s;const d=this.q("#fn-val-wspace");d&&(d.textContent=`${(s*1e3).toFixed(0)}%`),this.applyStyles(),this.saveSession()}),n.addEventListener("change",()=>this.pushUndo())),this.q("#fn-advanced-toggle")?.addEventListener("click",()=>{this.s.advancedOpen=!this.s.advancedOpen,this.rerender()}),this.q("#fn-advanced-pro-upsell")?.addEventListener("click",()=>{this.s.showActivationModal=!0,this.rerender()}),this.q("#fn-contrast-toggle")?.addEventListener("click",()=>{this.s.contrastOpen=!this.s.contrastOpen,this.rerender()}),this.q("#fn-contrast-pro-upsell")?.addEventListener("click",()=>{this.s.showActivationModal=!0,this.rerender()}),this.q("#fn-page-fonts-toggle")?.addEventListener("click",()=>{this.s.pageFontsOpen=!this.s.pageFontsOpen,this.s.pageFontsOpen&&(this.s.pageFonts=this.detectPageFonts()),this.rerender()}),this.q("#fn-page-fonts-pro-upsell")?.addEventListener("click",()=>{this.s.showActivationModal=!0,this.rerender()}),this.q("#fn-page-fonts-rescan")?.addEventListener("click",()=>{this.s.pageFonts=this.detectPageFonts(),this.rerender()}),this.root.querySelectorAll(".fn-page-font-btn").forEach(s=>{s.addEventListener("click",()=>{const d=s.dataset.font;if(d){for(const c of this.s.activeGroupIds)this.s.elementStyles[c].font=d;this.pushUndo(),this.applyStyles(),this.saveSession(),this.rerender()}})});const i=this.q("#fn-custom-selector");i&&i.addEventListener("change",()=>{const s=i.value.trim();for(const d of this.s.activeGroupIds)this.s.elementStyles[d].customSelectors=s||void 0;this.applyStyles(),this.saveSession()}),this.q("#fn-contrast-bg-swatch")?.addEventListener("click",()=>{if(this._contrastBgCloseListener&&(document.removeEventListener("click",this._contrastBgCloseListener),this._contrastBgCloseListener=null),!this.s.contrastBgPickerOpen){const[s,d,c]=C(this.s.contrastBg);this.s.contrastBgH=s,this.s.contrastBgS=d,this.s.contrastBgV=c}this.s.contrastBgPickerOpen=!this.s.contrastBgPickerOpen,this.rerender()});const r=this.q("#fn-contrast-bg-hex");r&&r.addEventListener("input",()=>{const s=r.value.trim();if(/^#[0-9a-fA-F]{6}$/.test(s)){this.s.contrastBg=s;const[d,c,y]=C(s);this.s.contrastBgH=d,this.s.contrastBgS=c,this.s.contrastBgV=y;const l=this.q("#fn-contrast-bg-swatch");l&&(l.style.background=s),this.rerender()}}),this.q("#fn-contrast-bg-reset")?.addEventListener("click",()=>{this.s.contrastBg="#ffffff",this.s.contrastBgH=0,this.s.contrastBgS=0,this.s.contrastBgV=100,this.s.contrastBgPickerOpen=!1,this._contrastBgCloseListener&&(document.removeEventListener("click",this._contrastBgCloseListener),this._contrastBgCloseListener=null),this.rerender()}),this.s.contrastBgPickerOpen&&this.attachContrastBgPickerListeners(),this.q("#fn-color-swatch-box")?.addEventListener("click",()=>{if(this._colorPickerCloseListener&&(document.removeEventListener("click",this._colorPickerCloseListener),this._colorPickerCloseListener=null),!this.s.colorPickerOpen){const s=this.s.activeGroupIds[0]??"h1",d=this.s.elementStyles[s],c=this.s.theme==="dark"?"#f1f5f9":"#111827",[y,l,p]=C(d.textColor??c);this.s.pickerH=y,this.s.pickerS=l,this.s.pickerV=p}this.s.colorPickerOpen=!this.s.colorPickerOpen,this.rerender()});const o=this.q("#fn-text-color-hex");o&&(o.addEventListener("input",()=>{const s=o.value.trim();if(/^#[0-9a-fA-F]{6}$/.test(s)){for(const l of this.s.activeGroupIds)this.s.elementStyles[l].textColor=s;const[d,c,y]=C(s);if(this.s.pickerH=d,this.s.pickerS=c,this.s.pickerV=y,this.s.colorPickerOpen){const l=this.q("#fn-cpicker-sv-text"),p=this.q("#fn-cpicker-sv-thumb-text"),h=this.q("#fn-cpicker-hue-thumb-text");l&&(l.style.background=`hsl(${d},100%,50%)`),p&&(p.style.left=`${c}%`,p.style.top=`${100-y}%`),h&&(h.style.left=`${d/360*100}%`);const g=this.q("#fn-color-swatch-box");g&&(g.style.background=s)}this.applyStyles(),this.saveSession()}}),o.addEventListener("change",()=>this.pushUndo())),this.s.colorPickerOpen&&this.attachColorPickerListeners(),this.q("#fn-color-reset")?.addEventListener("click",()=>{this.pushUndo();for(const s of this.s.activeGroupIds)delete this.s.elementStyles[s].textColor;this.applyStyles(),this.saveSession(),this.rerender()}),this.q("#fn-upsell-preset")?.addEventListener("click",()=>{this.s.showActivationModal=!0,this.rerender()});const a=this.q("#fn-preset-name");a&&(a.addEventListener("input",()=>{this.s.presetNameInput=a.value}),a.addEventListener("keydown",s=>{s.key==="Enter"&&this.savePreset(a.value)})),this.q("#fn-save-preset")?.addEventListener("click",()=>{const s=this.q("#fn-preset-name");s&&this.savePreset(s.value)}),this.q("#fn-share-pairing")?.addEventListener("click",()=>{const s=this.s.elementStyles.h1,d=this.s.elementStyles.body,c=`https://app.fontara.it/share?h=${encodeURIComponent(s.font)}&hw=${s.weight}&b=${encodeURIComponent(d.font)}&bw=${d.weight}`;Z(c),this.s.sharePairingToast=!0,this.rerender(),setTimeout(()=>{this.s.sharePairingToast=!1,this.rerender()},2500)}),this.root.querySelectorAll("[data-saved-preset]").forEach(s=>s.addEventListener("click",d=>{if(d.target.closest("[data-delete-preset]"))return;const c=this.s.savedPresets.find(y=>y.id===s.dataset.savedPreset);if(c){if(this.pushUndo(),c.config&&Object.keys(c.config).length>0)this.s.elementStyles=D(c.config);else for(const y of E)y.isHeading?(this.s.elementStyles[y.id].font=c.headingFont,this.s.elementStyles[y.id].weight=c.headingWeight):y.id==="body"&&(this.s.elementStyles[y.id].font=c.bodyFont,this.s.elementStyles[y.id].weight=c.bodyWeight);this.preloadAllFonts(),this.applyStyles(),this.saveSession(),this.rerender()}})),this.root.querySelectorAll("[data-delete-preset]").forEach(s=>s.addEventListener("click",d=>{d.stopPropagation(),this.deletePreset(s.dataset.deletePreset)})),this.attachPresetCardFontLoading()}attachColorPickerListeners(){const e=this.q("#fn-cpicker-sv-text"),t=this.q("#fn-cpicker-hue-text"),n=this.q("#fn-cpicker-sv-thumb-text"),i=this.q("#fn-cpicker-hue-thumb-text");if(!e||!t)return;const r=(l,p,h)=>{this.s.pickerH=l,this.s.pickerS=p,this.s.pickerV=h;const g=U(l,p,h);for(const L of this.s.activeGroupIds)this.s.elementStyles[L].textColor=g;this.applyStyles(),this.saveSession();const m=this.q("#fn-color-swatch-box");m&&(m.style.background=g);const x=this.q("#fn-text-color-hex");x&&(x.value=g);const u=this.q("#fn-cpicker-hex-text");u&&(u.value=g);const v=this.q("#fn-cpicker-preview-text");v&&(v.style.background=g);const[b,w,k]=I(l,p,h),S=this.q("#fn-cpicker-r-text"),$=this.q("#fn-cpicker-g-text"),F=this.q("#fn-cpicker-b-text");S&&(S.value=String(b)),$&&($.value=String(w)),F&&(F.value=String(k))},o=(l,p)=>{const h=e.getBoundingClientRect(),g=Math.round(Math.max(0,Math.min(1,(l-h.left)/h.width))*100),m=Math.round(Math.max(0,Math.min(1,1-(p-h.top)/h.height))*100);n&&(n.style.left=`${g}%`,n.style.top=`${100-m}%`),r(this.s.pickerH,g,m)};e.addEventListener("mousedown",l=>{l.preventDefault(),o(l.clientX,l.clientY);const p=g=>{g.preventDefault(),o(g.clientX,g.clientY)},h=()=>{this.pushUndo(),document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",h)};document.addEventListener("mousemove",p),document.addEventListener("mouseup",h)}),e.addEventListener("touchstart",l=>{l.preventDefault(),o(l.touches[0].clientX,l.touches[0].clientY);const p=m=>{m.preventDefault(),o(m.touches[0].clientX,m.touches[0].clientY)},h=()=>{e.removeEventListener("touchmove",p),e.removeEventListener("touchend",h),e.removeEventListener("touchcancel",h)},g=()=>{this.pushUndo(),h()};e.addEventListener("touchmove",p,{passive:!1}),e.addEventListener("touchend",g),e.addEventListener("touchcancel",h)},{passive:!1});const a=l=>{const p=t.getBoundingClientRect(),h=Math.round(Math.max(0,Math.min(1,(l-p.left)/p.width))*360);i&&(i.style.left=`${h/360*100}%`),e.style.background=`hsl(${h},100%,50%)`,r(h,this.s.pickerS,this.s.pickerV)};t.addEventListener("mousedown",l=>{l.preventDefault(),a(l.clientX);const p=g=>{g.preventDefault(),a(g.clientX)},h=()=>{this.pushUndo(),document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",h)};document.addEventListener("mousemove",p),document.addEventListener("mouseup",h)}),t.addEventListener("touchstart",l=>{l.preventDefault(),a(l.touches[0].clientX);const p=m=>{m.preventDefault(),a(m.touches[0].clientX)},h=()=>{t.removeEventListener("touchmove",p),t.removeEventListener("touchend",h),t.removeEventListener("touchcancel",h)},g=()=>{this.pushUndo(),h()};t.addEventListener("touchmove",p,{passive:!1}),t.addEventListener("touchend",g),t.addEventListener("touchcancel",h)},{passive:!1});const s=this.q("#fn-cpicker-hex-text");s&&s.addEventListener("input",()=>{const l=s.value.trim();if(/^#[0-9a-fA-F]{6}$/.test(l)){const[p,h,g]=C(l);this.s.pickerH=p,this.s.pickerS=h,this.s.pickerV=g,e&&(e.style.background=`hsl(${p},100%,50%)`),n&&(n.style.left=`${h}%`,n.style.top=`${100-g}%`),i&&(i.style.left=`${p/360*100}%`);for(const F of this.s.activeGroupIds)this.s.elementStyles[F].textColor=l;this.applyStyles(),this.saveSession();const m=this.q("#fn-color-swatch-box");m&&(m.style.background=l);const x=this.q("#fn-text-color-hex");x&&(x.value=l);const u=this.q("#fn-cpicker-preview-text");u&&(u.style.background=l);const[v,b,w]=I(p,h,g),k=this.q("#fn-cpicker-r-text"),S=this.q("#fn-cpicker-g-text"),$=this.q("#fn-cpicker-b-text");k&&(k.value=String(v)),S&&(S.value=String(b)),$&&($.value=String(w))}});const d=()=>{const l=this.q("#fn-cpicker-r-text"),p=this.q("#fn-cpicker-g-text"),h=this.q("#fn-cpicker-b-text");if(!l||!p||!h)return;const g=Math.max(0,Math.min(255,parseInt(l.value)||0)),m=Math.max(0,Math.min(255,parseInt(p.value)||0)),x=Math.max(0,Math.min(255,parseInt(h.value)||0)),u=`#${g.toString(16).padStart(2,"0")}${m.toString(16).padStart(2,"0")}${x.toString(16).padStart(2,"0")}`,[v,b,w]=C(u);this.s.pickerH=v,this.s.pickerS=b,this.s.pickerV=w,e&&(e.style.background=`hsl(${v},100%,50%)`),n&&(n.style.left=`${b}%`,n.style.top=`${100-w}%`),i&&(i.style.left=`${v/360*100}%`);for(const L of this.s.activeGroupIds)this.s.elementStyles[L].textColor=u;this.applyStyles(),this.saveSession();const k=this.q("#fn-color-swatch-box");k&&(k.style.background=u);const S=this.q("#fn-text-color-hex");S&&(S.value=u);const $=this.q("#fn-cpicker-hex-text");$&&($.value=u);const F=this.q("#fn-cpicker-preview-text");F&&(F.style.background=u)};for(const l of["fn-cpicker-r-text","fn-cpicker-g-text","fn-cpicker-b-text"]){const p=this.q(`#${l}`);p&&p.addEventListener("change",d)}const c=this.q("#fn-color-picker-text");c&&c.addEventListener("click",l=>{const p=l.target.closest("[data-cpicker-swatch]");if(!p)return;const h=p.dataset.cpickerSwatch;if(!h)return;const[g,m,x]=C(h);this.s.pickerH=g,this.s.pickerS=m,this.s.pickerV=x,e&&(e.style.background=`hsl(${g},100%,50%)`),n&&(n.style.left=`${m}%`,n.style.top=`${100-x}%`),i&&(i.style.left=`${g/360*100}%`);for(const A of this.s.activeGroupIds)this.s.elementStyles[A].textColor=h;this.applyStyles(),this.saveSession(),this.pushUndo();const u=this.q("#fn-color-swatch-box");u&&(u.style.background=h);const v=this.q("#fn-text-color-hex");v&&(v.value=h);const b=this.q("#fn-cpicker-hex-text");b&&(b.value=h);const w=this.q("#fn-cpicker-preview-text");w&&(w.style.background=h);const[k,S,$]=I(g,m,x),F=this.q("#fn-cpicker-r-text"),L=this.q("#fn-cpicker-g-text"),P=this.q("#fn-cpicker-b-text");F&&(F.value=String(k)),L&&(L.value=String(S)),P&&(P.value=String($))});const y=this.q("#fn-cpicker-eyedropper-text");y&&"EyeDropper"in window?y.addEventListener("click",async l=>{l.stopPropagation();try{const g=(await new window.EyeDropper().open()).sRGBHex,[m,x,u]=C(g);this.s.pickerH=m,this.s.pickerS=x,this.s.pickerV=u,e&&(e.style.background=`hsl(${m},100%,50%)`),n&&(n.style.left=`${x}%`,n.style.top=`${100-u}%`),i&&(i.style.left=`${m/360*100}%`);for(const Ce of this.s.activeGroupIds)this.s.elementStyles[Ce].textColor=g;this.applyStyles(),this.saveSession(),this.pushUndo();const v=this.q("#fn-color-swatch-box");v&&(v.style.background=g);const b=this.q("#fn-text-color-hex");b&&(b.value=g);const w=this.q("#fn-cpicker-hex-text");w&&(w.value=g);const k=this.q("#fn-cpicker-preview-text");k&&(k.style.background=g);const[S,$,F]=I(m,x,u),L=this.q("#fn-cpicker-r-text"),P=this.q("#fn-cpicker-g-text"),A=this.q("#fn-cpicker-b-text");L&&(L.value=String(S)),P&&(P.value=String($)),A&&(A.value=String(F))}catch{}}):y&&(y.style.display="none"),this._colorPickerCloseListener&&(document.removeEventListener("click",this._colorPickerCloseListener),this._colorPickerCloseListener=null),this.s.colorPickerOpen&&requestAnimationFrame(()=>{if(!this.s.colorPickerOpen)return;const l=p=>{if(!this.s.colorPickerOpen){document.removeEventListener("click",l),this._colorPickerCloseListener===l&&(this._colorPickerCloseListener=null);return}const h=this.q("#fn-color-picker-text"),g=this.q("#fn-color-swatch-box");!h?.contains(p.target)&&!g?.contains(p.target)&&(this.s.colorPickerOpen=!1,this._colorPickerCloseListener=null,this.rerender(),document.removeEventListener("click",l))};this._colorPickerCloseListener=l,document.addEventListener("click",l)})}attachContrastBgPickerListeners(){const e=this.q("#fn-cpicker-sv-cbg"),t=this.q("#fn-cpicker-hue-cbg"),n=this.q("#fn-cpicker-sv-thumb-cbg"),i=this.q("#fn-cpicker-hue-thumb-cbg");if(!e||!t)return;const r=(l,p,h)=>{this.s.contrastBgH=l,this.s.contrastBgS=p,this.s.contrastBgV=h;const g=U(l,p,h);this.s.contrastBg=g;const m=this.q("#fn-contrast-bg-swatch");m&&(m.style.background=g);const x=this.q("#fn-contrast-bg-hex");x&&(x.value=g);const u=this.q("#fn-cpicker-hex-cbg");u&&(u.value=g);const v=this.q("#fn-cpicker-preview-cbg");v&&(v.style.background=g);const[b,w,k]=I(l,p,h),S=this.q("#fn-cpicker-r-cbg"),$=this.q("#fn-cpicker-g-cbg"),F=this.q("#fn-cpicker-b-cbg");S&&(S.value=String(b)),$&&($.value=String(w)),F&&(F.value=String(k))},o=(l,p)=>{const h=e.getBoundingClientRect(),g=Math.round(Math.max(0,Math.min(1,(l-h.left)/h.width))*100),m=Math.round(Math.max(0,Math.min(1,1-(p-h.top)/h.height))*100);n&&(n.style.left=`${g}%`,n.style.top=`${100-m}%`),r(this.s.contrastBgH,g,m)};e.addEventListener("mousedown",l=>{l.preventDefault(),o(l.clientX,l.clientY);const p=g=>{g.preventDefault(),o(g.clientX,g.clientY)},h=()=>{document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",h),this.rerender()};document.addEventListener("mousemove",p),document.addEventListener("mouseup",h)}),e.addEventListener("touchstart",l=>{l.preventDefault(),o(l.touches[0].clientX,l.touches[0].clientY);const p=g=>{g.preventDefault(),o(g.touches[0].clientX,g.touches[0].clientY)},h=()=>{e.removeEventListener("touchmove",p),e.removeEventListener("touchend",h),e.removeEventListener("touchcancel",h),this.rerender()};e.addEventListener("touchmove",p,{passive:!1}),e.addEventListener("touchend",h),e.addEventListener("touchcancel",h)},{passive:!1});const a=l=>{const p=t.getBoundingClientRect(),h=Math.round(Math.max(0,Math.min(1,(l-p.left)/p.width))*360);i&&(i.style.left=`${h/360*100}%`),e.style.background=`hsl(${h},100%,50%)`,r(h,this.s.contrastBgS,this.s.contrastBgV)};t.addEventListener("mousedown",l=>{l.preventDefault(),a(l.clientX);const p=g=>{g.preventDefault(),a(g.clientX)},h=()=>{document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",h),this.rerender()};document.addEventListener("mousemove",p),document.addEventListener("mouseup",h)}),t.addEventListener("touchstart",l=>{l.preventDefault(),a(l.touches[0].clientX);const p=g=>{g.preventDefault(),a(g.touches[0].clientX)},h=()=>{t.removeEventListener("touchmove",p),t.removeEventListener("touchend",h),t.removeEventListener("touchcancel",h),this.rerender()};t.addEventListener("touchmove",p,{passive:!1}),t.addEventListener("touchend",h),t.addEventListener("touchcancel",h)},{passive:!1});const s=this.q("#fn-cpicker-hex-cbg");s&&s.addEventListener("input",()=>{const l=s.value.trim();if(/^#[0-9a-fA-F]{6}$/.test(l)){const[p,h,g]=C(l);this.s.contrastBgH=p,this.s.contrastBgS=h,this.s.contrastBgV=g,this.s.contrastBg=l,e.style.background=`hsl(${p},100%,50%)`,n&&(n.style.left=`${h}%`,n.style.top=`${100-g}%`),i&&(i.style.left=`${p/360*100}%`);const m=this.q("#fn-contrast-bg-swatch");m&&(m.style.background=l);const x=this.q("#fn-contrast-bg-hex");x&&(x.value=l);const u=this.q("#fn-cpicker-preview-cbg");u&&(u.style.background=l);const[v,b,w]=I(p,h,g),k=this.q("#fn-cpicker-r-cbg"),S=this.q("#fn-cpicker-g-cbg"),$=this.q("#fn-cpicker-b-cbg");k&&(k.value=String(v)),S&&(S.value=String(b)),$&&($.value=String(w))}});const d=()=>{const l=this.q("#fn-cpicker-r-cbg"),p=this.q("#fn-cpicker-g-cbg"),h=this.q("#fn-cpicker-b-cbg");if(!l||!p||!h)return;const g=Math.max(0,Math.min(255,parseInt(l.value)||0)),m=Math.max(0,Math.min(255,parseInt(p.value)||0)),x=Math.max(0,Math.min(255,parseInt(h.value)||0)),u=`#${g.toString(16).padStart(2,"0")}${m.toString(16).padStart(2,"0")}${x.toString(16).padStart(2,"0")}`,[v,b,w]=C(u);this.s.contrastBgH=v,this.s.contrastBgS=b,this.s.contrastBgV=w,this.s.contrastBg=u,e&&(e.style.background=`hsl(${v},100%,50%)`),n&&(n.style.left=`${b}%`,n.style.top=`${100-w}%`),i&&(i.style.left=`${v/360*100}%`);const k=this.q("#fn-contrast-bg-swatch");k&&(k.style.background=u);const S=this.q("#fn-contrast-bg-hex");S&&(S.value=u);const $=this.q("#fn-cpicker-hex-cbg");$&&($.value=u);const F=this.q("#fn-cpicker-preview-cbg");F&&(F.style.background=u)};for(const l of["fn-cpicker-r-cbg","fn-cpicker-g-cbg","fn-cpicker-b-cbg"]){const p=this.q(`#${l}`);p&&p.addEventListener("change",d)}const c=this.q("#fn-color-picker-cbg");c&&c.addEventListener("click",l=>{const p=l.target.closest("[data-cpicker-swatch]");if(!p)return;const h=p.dataset.cpickerSwatch;if(!h)return;const[g,m,x]=C(h);this.s.contrastBgH=g,this.s.contrastBgS=m,this.s.contrastBgV=x,this.s.contrastBg=h,e&&(e.style.background=`hsl(${g},100%,50%)`),n&&(n.style.left=`${m}%`,n.style.top=`${100-x}%`),i&&(i.style.left=`${g/360*100}%`);const u=this.q("#fn-contrast-bg-swatch");u&&(u.style.background=h);const v=this.q("#fn-contrast-bg-hex");v&&(v.value=h);const b=this.q("#fn-cpicker-hex-cbg");b&&(b.value=h);const w=this.q("#fn-cpicker-preview-cbg");w&&(w.style.background=h);const[k,S,$]=I(g,m,x),F=this.q("#fn-cpicker-r-cbg"),L=this.q("#fn-cpicker-g-cbg"),P=this.q("#fn-cpicker-b-cbg");F&&(F.value=String(k)),L&&(L.value=String(S)),P&&(P.value=String($))});const y=this.q("#fn-cpicker-eyedropper-cbg");y&&"EyeDropper"in window?y.addEventListener("click",async l=>{l.stopPropagation();try{const g=(await new window.EyeDropper().open()).sRGBHex,[m,x,u]=C(g);this.s.contrastBgH=m,this.s.contrastBgS=x,this.s.contrastBgV=u,this.s.contrastBg=g,e&&(e.style.background=`hsl(${m},100%,50%)`),n&&(n.style.left=`${x}%`,n.style.top=`${100-u}%`),i&&(i.style.left=`${m/360*100}%`);const v=this.q("#fn-contrast-bg-swatch");v&&(v.style.background=g);const b=this.q("#fn-contrast-bg-hex");b&&(b.value=g);const w=this.q("#fn-cpicker-hex-cbg");w&&(w.value=g);const k=this.q("#fn-cpicker-preview-cbg");k&&(k.style.background=g);const[S,$,F]=I(m,x,u),L=this.q("#fn-cpicker-r-cbg"),P=this.q("#fn-cpicker-g-cbg"),A=this.q("#fn-cpicker-b-cbg");L&&(L.value=String(S)),P&&(P.value=String($)),A&&(A.value=String(F))}catch{}}):y&&(y.style.display="none"),this._contrastBgCloseListener&&(document.removeEventListener("click",this._contrastBgCloseListener),this._contrastBgCloseListener=null),this.s.contrastBgPickerOpen&&requestAnimationFrame(()=>{if(!this.s.contrastBgPickerOpen)return;const l=p=>{if(!this.s.contrastBgPickerOpen){document.removeEventListener("click",l),this._contrastBgCloseListener===l&&(this._contrastBgCloseListener=null);return}const h=this.q("#fn-color-picker-cbg"),g=this.q("#fn-contrast-bg-swatch");!h?.contains(p.target)&&!g?.contains(p.target)&&(this.s.contrastBgPickerOpen=!1,this._contrastBgCloseListener=null,this.rerender(),document.removeEventListener("click",l))};this._contrastBgCloseListener=l,document.addEventListener("click",l)})}attachPresetCardFontLoading(){const e=this.root.querySelectorAll(".fn-preset-card[data-preset-id]");if(!e.length||typeof IntersectionObserver>"u")return;const t=new IntersectionObserver(n=>{n.forEach(i=>{if(!i.isIntersecting)return;const r=i.target,o=R.find(a=>a.id===r.dataset.presetId);if(o){const a=z(o.headingFont);a&&T(o.headingFont,a.weights.slice(0,1),a.wdth);const s=z(o.bodyFont);s&&T(o.bodyFont,s.weights.slice(0,1),s.wdth)}t.unobserve(r)})},{rootMargin:"80px"});e.forEach(n=>t.observe(n))}attachCustomFontListeners(){this.root.querySelectorAll("[data-delete-font]").forEach(t=>t.addEventListener("click",n=>{n.stopPropagation();const i=t.dataset.deleteFont,r=this.s.customFonts.find(o=>o.id===i);if(document.getElementById(`fn-custom-font-${i}`)?.remove(),this.s.customFonts=this.s.customFonts.filter(o=>o.id!==i),r){for(const o of Object.keys(this.s.elementStyles))if(this.s.elementStyles[o].font===r.name){const a=E.find(s=>s.id===o);this.s.elementStyles[o].font=a.defaultFont,this.s.elementStyles[o].weight=a.defaultWeight}this.applyStyles()}this.saveCustomFonts(),this.rerender()}));const e=this.q("#fn-custom-font-file");e&&e.addEventListener("change",()=>{const t=e.files;t?.length&&(t.length===1?this.handleFontFile(t[0]):this.handleMultipleFontFiles(Array.from(t)),e.value="")})}attachTriggerDrag(){const e=this.q("#fontara-trigger"),t=this.q(".fn-header");if(!e)return;let n=!1,i="btn",r=0,o=0,a=0,s=0;const d=(u,v,b)=>Math.max(v,Math.min(b,u)),c=u=>{const v=u.clientX-r,b=u.clientY-o;if(!n&&(Math.abs(v)>4||Math.abs(b)>4)&&(n=!0,i==="btn"&&e.classList.add("dragging"),document.body.style.userSelect="none"),!n)return;const w=d(a-v,0,window.innerWidth-52),k=d(s-b,0,window.innerHeight-52);this.root.style.right=`${w}px`,this.root.style.bottom=`${k}px`},y=()=>{document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",y),i==="btn"&&e.classList.remove("dragging"),document.body.style.userSelect="",n?(this.saveDockPosition(),n=!1):i==="btn"&&this.togglePanel()},l=(u,v)=>{if(u.button!==0)return;u.preventDefault(),i=v,n=!1,r=u.clientX,o=u.clientY;const b=this.root.getBoundingClientRect();a=window.innerWidth-b.right,s=window.innerHeight-b.bottom,document.addEventListener("mousemove",c),document.addEventListener("mouseup",y)};e.addEventListener("mousedown",u=>l(u,"btn")),t&&t.addEventListener("mousedown",u=>{u.target.closest("button")||l(u,"header")});let p=null,h=!1;const g=(u,v)=>{if(u.touches.length!==1)return;u.preventDefault();const b=u.touches[0];p=b.identifier,h=v,n=!1,r=b.clientX,o=b.clientY;const w=this.root.getBoundingClientRect();a=window.innerWidth-w.right,s=window.innerHeight-w.bottom},m=u=>{u.preventDefault();const v=Array.from(u.changedTouches).find($=>$.identifier===p);if(!v)return;const b=v.clientX-r,w=v.clientY-o;if(!n&&(Math.abs(b)>4||Math.abs(w)>4)&&(n=!0),!n)return;const k=d(a-b,0,window.innerWidth-52),S=d(s-w,0,window.innerHeight-52);this.root.style.right=`${k}px`,this.root.style.bottom=`${S}px`},x=u=>{Array.from(u.changedTouches).find(b=>b.identifier===p)&&(p=null,n?(this.saveDockPosition(),n=!1):h||this.togglePanel())};e.addEventListener("touchstart",u=>g(u,!1),{passive:!1}),e.addEventListener("touchmove",m,{passive:!1}),e.addEventListener("touchend",x),t&&(t.addEventListener("touchstart",u=>{u.target.closest("button")||g(u,!0)},{passive:!1}),t.addEventListener("touchmove",m,{passive:!1}),t.addEventListener("touchend",x))}attachFontItemListeners(){const e=this.q("#fn-font-list"),t=this.root.querySelectorAll(".fn-font-item");if(t.forEach(n=>n.addEventListener("click",i=>{i.target.closest(".fn-custom-font-delete")||this.selectFont(n.dataset.font)})),e&&typeof IntersectionObserver<"u"){const n=new IntersectionObserver(i=>{i.forEach(r=>{if(r.isIntersecting){const o=r.target.dataset.font;if(o){const a=z(o);a&&T(o,a.weights.slice(0,1),a.wdth)}n.unobserve(r.target)}})},{root:e,rootMargin:"60px"});t.forEach(i=>n.observe(i))}}attachSettingsListeners(){const e=(t,n,i,r,o)=>{const a=this.q(`#${t}`);a&&(a.addEventListener("input",()=>{const s=parseFloat(a.value)*i;for(const c of this.s.activeGroupIds)this.s.elementStyles[c][r]=s;const d=this.q(`#${n}`);d&&(d.textContent=o(s)),this.applyStyles(),this.saveSession()}),a.addEventListener("change",()=>this.pushUndo()))};e("fn-font-size","fn-val-size",1,"fontSize",t=>`${t}px`),e("fn-line-height","fn-val-lh",1,"lineHeight",t=>`${t.toFixed(2)}`),e("fn-tracking","fn-val-track",.001,"tracking",t=>`${(t*1e3).toFixed(0)}%`)}selectFont(e){const t=z(e),n=this.s.customFonts.some(i=>i.name===e);if(!(!t&&!n)){this.pushUndo();for(const i of this.s.activeGroupIds)if(this.s.elementStyles[i].font=e,t){const o=E.find(a=>a.id===i)?.isHeading??!1?t.weights.includes("700")?"700":t.weights[t.weights.length-1]:t.weights.includes("400")?"400":t.weights[0];this.s.elementStyles[i].weight=o}t&&T(e,t.weights,t.wdth),this.applyStyles(),this.saveSession(),this.lightUpdateAfterFontSelect(e)}}lightUpdateAfterFontSelect(e){const t=this.s.activeGroupIds[0]??"h1",n=this.s.elementStyles[t].weight;this.root.querySelectorAll(".fn-font-item").forEach(s=>{s.classList.toggle("selected",s.dataset.font===e)});const i=this.q(".fn-current-element");if(i&&this.s.activeGroupIds.length===1){const s=E.find(d=>d.id===t)??E[0];i.innerHTML=`Editing <strong>${this.esc(s.label)}</strong>:
        <span style="font-family:'${this.esc(e)}',system-ui;font-weight:${n};">
          ${this.esc(e)} ${Number(n)}
        </span>`}const r=this.q(".fn-active-bar");if(r){const s=document.createElement("div");s.innerHTML=this.renderActiveBar();const d=s.firstElementChild;d&&r.replaceWith(d)}const o=this.root.querySelector(".fn-weights")?.closest(".fn-section");if(o){const s=z(e);if(s&&s.weights.length>1){const d=o.querySelector(".fn-weights");d&&(d.innerHTML=s.weights.map(c=>`
            <button class="fn-weight-btn ${c===n?"active":""}"
              data-weight="${c}" style="font-weight:${c};">
              ${re[c]??c}
            </button>
          `).join(""),d.querySelectorAll(".fn-weight-btn").forEach(c=>c.addEventListener("click",()=>{this.pushUndo();for(const y of this.s.activeGroupIds)this.s.elementStyles[y].weight=c.dataset.weight;this.applyStyles(),this.saveSession(),this.rerender()})))}}const a=this.root.querySelector(".fn-suggestions")?.closest(".fn-section");if(a){const s=a.querySelector(".fn-suggestions");if(s){const d=te(e);s.innerHTML=d.map(c=>`
          <button class="fn-suggestion ${e===c?"active":""}" data-suggest="${this.esc(c)}">${c}</button>
        `).join(""),s.querySelectorAll(".fn-suggestion").forEach(c=>c.addEventListener("click",()=>this.selectFont(c.dataset.suggest)))}}}togglePanel(){this.s.open=!this.s.open,this.s.open?this.rerender():(this.q("#fontara-panel")?.classList.add("hidden"),this.q("#fontara-trigger")?.classList.remove("active"))}toggleInspect(){he()?(N(),this.s.inspecting=!1,this.rerender()):(this.s.inspecting=!0,this.rerender(),de(e=>{if(this._destroyed)return;const t=pe(e);this.s.activeGroupIds=[t],this.s.inspecting=!1,this.s.open=!0,this.s.tab="fonts",fe(),this.rerender()}))}async handleExport(e){const t=this.s.customFonts.filter(a=>Object.values(this.s.elementStyles).some(s=>s.font===a.name)),n=t.length>0?t.map(a=>`@font-face {
  font-family: ${JSON.stringify(a.name)};
  src: url('${a.dataUrl}');
}`).join(`

`)+`

`:"";let i,r;e==="json"?(i=xe(this.s.elementStyles),r="JSON"):e==="tailwind"?(i=we(this.s.elementStyles),r="Tailwind"):e==="cssvars"?(i=ve(this.s.elementStyles,this.s.cssPrefix||"fn"),r="CSS Vars"):e==="figma"?(i=be(this.s.elementStyles),r="Figma"):(i=n+ye(this.s.elementStyles),r="CSS"),await Z(i);const o=this.q("#fn-export");if(o){const a=o.textContent;o.textContent=`${r} Copied!`,o.classList.add("fn-btn-success"),setTimeout(()=>{o.textContent=a,o.classList.remove("fn-btn-success")},2e3)}}async handleLicenseSubmit(){const e=this.q("#fn-license-key"),t=this.q("#fn-license-error"),n=this.q("#fn-license-submit");if(!e||!n)return;const i=e.value.trim();if(!i){t&&(t.textContent="Please enter a license key.");return}n.disabled=!0,n.textContent="Verifying…",t&&(t.textContent="");try{const r=await ae(i);r.valid?(this.s.licenseValid=!0,this.s.licenseEmail=r.email??null,this.s.licenseKey=i,this.saveLicenseCache({key:i,email:r.email,expiresAt:r.expiresAt}),this.s.showActivationModal=!1,this.rerender(),this.loadSavedPresets()):(t&&(t.textContent=r.error??"Invalid license key."),n.disabled=!1,n.textContent="Activate")}catch{t&&(t.textContent="Network error. Please try again."),n.disabled=!1,n.textContent="Activate"}}lightUpdateFontList(){const e=this.q("#fn-font-list")?.scrollTop??0,t=this.s.activeGroupIds[0]??"h1",n=this.s.elementStyles[t]?.font??"",i=this.q("#fn-font-list");if(i){if(this.s.category===q)i.innerHTML=this.renderCustomFontItems(),this.attachFontItemListeners(),this.attachCustomFontListeners();else{const r=ee(this.s.searchQuery,this.s.category);i.innerHTML=this.renderFontItems(r,n),this.attachFontItemListeners()}requestAnimationFrame(()=>{i.scrollTop=e})}this.root.querySelectorAll(".fn-cat").forEach(r=>r.classList.toggle("active",r.dataset.cat===this.s.category))}q(e){return this.root.querySelector(e)}esc(e){return e.replace(/['"<>&]/g,t=>({"'":"&#39;",'"':"&quot;","<":"&lt;",">":"&gt;","&":"&amp;"})[t]??t)}rerender(){const e=this.s.open,t=this.q("#fn-font-list")?.scrollTop??0,n=this.q(".fn-scroll")?.scrollTop??0;this.render(),this.root.classList.toggle("dark",this.s.theme==="dark"),e&&(this.q("#fontara-panel")?.classList.remove("hidden"),this.q("#fontara-trigger")?.classList.add("active"),this.s.open=!0),(t>0||n>0)&&requestAnimationFrame(()=>{const i=this.q("#fn-font-list");i&&t>0&&(i.scrollTop=t);const r=this.q(".fn-scroll");r&&n>0&&(r.scrollTop=n)})}}function le(){if(document.getElementById("fontara-dock"))return;const e=(document.currentScript??document.querySelector("script[data-fontara-key]"))?.getAttribute("data-fontara-key")??null;new Me(e)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",le):le()})();
