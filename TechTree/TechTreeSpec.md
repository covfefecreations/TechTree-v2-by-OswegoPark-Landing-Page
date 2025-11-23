# TechTree SmartNav — Spec + Implementation (OswegoPark / Owego Labs)

Nice — this is a sexy little utility: a floating, user-scalable, reorderable dock that can sit bottom-right, expand/collapse, and flip between a vertical **Tree** and horizontal **Log**. Below is an executive summary, then a complete product spec, UX gestures mapping, accessibility notes, SVG/icon ideas, commercialization/portfolio opportunities, and two code deliverables you can drop into a project:

1. **Vanilla HTML + CSS + minimal JS** (easy prototype)
2. **React 18 + TypeScript component** with persistence, edit-mode long-press, reorder, scale, orientation toggle

---

# Executive summary

- Name: **TechTree SmartNav** (theme path: `OswegoPark > Components > Object > Navigation > Floating > TechTree SmartNav`)
- Default placement: bottom-right corner (floating)
- Modes:
  - **Tree** = vertical dock (default)
  - **Log** = horizontal dock
- Key behaviors:
  - Floating, drag-to-reposition (snap to bottom-right by default)
  - Reorder icons in **Edit Mode**
  - Scale (user-adjustable slider in Edit Mode)
  - Toggle expand/collapse by tapping the main 4-way arrow icon
  - Enter **Edit Mode**: hold the base icon **≥ 4s**
  - Exit **Edit Mode**: hold the base icon **≥ 2s**
  - Toggle orientation: **double-tap** the base icon (or double-click on desktop)
- Icons: Lucide React friendly; fallback inline SVGs provided
- Persist user settings (order, scale, orientation, collapsed) to `localStorage`
- Mobile-first, accessible, keyboard-navigable

---

# Feature specification (concise)

| Area | Behavior / Implementation |
|---|---|
| Placement | Floating container anchored to bottom-right; supports manual reposition by drag. |
| Modes | Tree (vertical) & Log (horizontal). Default: Tree. |
| Expansion | Collapsed state shows only base icon; expanded shows icon dock. |
| Edit Mode | Long-press base icon (≥4s) toggles Edit Mode. In Edit Mode: reorder via drag, scale slider visible, icon color toggles. Exit via hold 2s. |
| Reorder | Drag & drop; visual ghost while dragging; persisted. |
| Scale | Slider in edit UI (range 0.6 — 1.6), stored. CSS transforms scale the dock. |
| Icons & Quantity | 6 total icons: base 4-way arrow + 5 items for: Home/Main, Design, Build, QA, Deploy, Monitor (user asked icon count 5 representing those — base plus 5 actions = 6). |
| Accessibility | ARIA roles, keyboard move (in edit mode: focus + arrow keys to reorder), label text, high contrast modes. |
| Integration | Vanilla HTML/CSS/JS and React 18 + TypeScript examples provided. Use Lucide icons if available. |

---

# UX / Gestures mapping (cheat-sheet)

- **Single tap / click** on base (4-way arrow) → Toggle **expand / collapse**.
- **Double tap / double click** on base → Toggle **orientation** (vertical ↔ horizontal).
- **Hold 4s** on base → Enter **Edit Mode** (persistent).
- **Hold 2s** on base while in Edit Mode → Exit Edit Mode.
- **Drag icon** (in Edit Mode) → Reorder.
- **Drag dock (outside Edit Mode)** → Move whole dock (reposition).
- **Two-finger pinch** on dock (optional) → adjust scale (mobile OS gesture; fall back to slider in Edit Mode).
- **Keyboard**: Tab to dock, Enter to open. In Edit Mode, use Left/Right or Up/Down to move focused icon. `Esc` to exit Edit Mode.

---

# Design motifs, metaphors & anchor phrases

- Anchor phrase: **“Branch. Log. Launch.”**
- Symbolic motifs:
  - Constellation motif: each icon is a node; the 4-way base is the **root** or **trunk**.
  - Tree growth animation when switching to Tree mode (icons emerge downward like branches).
  - Log motif: icons slide out horizontally like entries in a timeline.
- Suggested mantras for UX microcopy: “Edit mode — cultivate your tree”, “Pin & grow”, “Dock scaled”.

---

# Iconography & SVG concepts

- Base icon: 4-way arrow (circle center with four chevrons). Provide both mono and multicolor versions. Use a thin rounded stroke (Lucide style).
- Action icons (small, modern):
  - Home/Main: simplified house or hub
  - Design: pen / vector node
  - Build: hammer + bracket
  - QA: check-in-circle or bug with check
  - Deploy: rocket or upload arrow
  - Monitor: pulse / waveform with eye

SVG idea (simple 4-way arrow, copyable):

```svg
<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
  <path d="M12 2v5M12 17v5M2 12h5M17 12h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
</svg>
```

Recommend Lucide for production (same aesthetic, tree-consistent).

---

# Accessibility & performance notes

- Provide `aria-expanded`, `aria-label`, and `role="menu"` for the dock.
- Ensure 44–48px touch targets at smallest scale.
- Respect `prefers-reduced-motion` (no flourish animations if user prefers reduced motion).
- Persist state with `localStorage` but allow opt-out via `data-no-persist` attribute.
- Keep DOM lightweight and avoid heavy animation frameworks for battery reasons.

---

# Commercialization / portfolio opportunities

- Ship as a small open-source component package (`@owegolabs/techtree-smartnav`) with:
  - Customization tokens (CSS vars)
  - Icon packs (Lucide plugin)
  - Storybook stories (Tree, Log, collapsed, edit-mode, keyboard)
- Offer premium themes / SVG icon sets, or Figma components for sale.
- Make a demo page that shows "reorder, scale, persist" and record a 30s screen capture for portfolio.

---

# Vanilla prototype (HTML + CSS + JS)

Drop this into a static page for quick prototyping. Mobile-first, minimal dependencies.

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>TechTree SmartNav — Prototype</title>
<style>
  :root{
    --dock-bg: rgba(20,24,30,0.9);
    --accent: #7dd3fc;
    --size: 1; /* scale multiplier */
    --icon-size: calc(48px * var(--size));
    --gap: 10px;
    --corner-gap: 16px;
    --dock-radius: 12px;
  }
  /* Container anchored bottom-right */
  .tt-dock {
    position: fixed;
    right: var(--corner-gap);
    bottom: var(--corner-gap);
    z-index: 9999;
    transform-origin: bottom right;
    transform: scale(var(--size));
    touch-action: none;
    user-select: none;
  }
  .tt-dock.collapsed .tt-items { display: none; }
  .tt-base {
    width: var(--icon-size);
    height: var(--icon-size);
    border-radius: 14px;
    background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.08));
    display: grid;
    place-items: center;
    box-shadow: 0 6px 18px rgba(0,0,0,0.35);
    color: white;
    cursor: pointer;
  }
  .tt-dock.vertical { display: flex; flex-direction: column; align-items: flex-end; gap: var(--gap); }
  .tt-dock.horizontal { display: flex; flex-direction: row; align-items: center; gap: var(--gap); }
  .tt-items {
    display: flex;
    gap: var(--gap);
    align-items: center;
  }
  .tt-item {
    width: var(--icon-size);
    height: var(--icon-size);
    border-radius: 10px;
    background: rgba(255,255,255,0.04);
    display: grid;
    place-items: center;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: transform 160ms ease, box-shadow 160ms;
  }
  .tt-item.dragging { opacity: 0.5; transform: scale(1.05); box-shadow: 0 8px 24px rgba(0,0,0,0.45);}
  .tt-item:focus { outline: 2px solid var(--accent); }
  .tt-edit-badge {
    position: absolute;
    right: calc(var(--corner-gap) + 6px);
    bottom: calc(var(--corner-gap) + 6px);
    background: #ffb86b; color:#111; font-weight:700;
    padding: 4px 8px; border-radius: 999px; font-size:12px;
  }
  /* Edit panel */
  .tt-edit-panel {
    margin-top: 8px;
    padding: 8px;
    border-radius: 10px;
    background: rgba(255,255,255,0.03);
    display:flex; gap:8px; align-items:center;
  }
  .tt-slider { width:120px; }
  /* small screens */
  @media (max-width:520px){
    :root{ --corner-gap: 10px; }
  }
</style>
</head>
<body style="min-height:100vh;background:#0b0f14;color:#fff;padding:40px;">

<div id="techtree" class="tt-dock vertical" role="menu" aria-label="TechTree SmartNav">
  <div id="base" class="tt-base" aria-label="TechTree Menu" tabindex="0" title="TechTree Menu">
    <!-- 4-way arrow SVG -->
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="1.6" fill="currentColor"/>
    </svg>
  </div>

  <div id="items" class="tt-items" aria-hidden="true">
    <button class="tt-item" data-key="home" aria-label="Home">🏠</button>
    <button class="tt-item" data-key="design" aria-label="Design">✏️</button>
    <button class="tt-item" data-key="build" aria-label="Build">🛠️</button>
    <button class="tt-item" data-key="qa" aria-label="QA">🔍</button>
    <button class="tt-item" data-key="deploy" aria-label="Deploy">🚀</button>
    <button class="tt-item" data-key="monitor" aria-label="Monitor">📈</button>
  </div>
</div>

<script>
(function(){
  const dock = document.getElementById('techtree');
  const base = document.getElementById('base');
  const items = document.getElementById('items');
  let collapsed = true;
  let orientation = 'vertical'; // or 'horizontal'
  let editMode = false;
  let longPressTimer = null;
  let exitPressTimer = null;

  const STORAGE_KEY = 'techtree_v1';
  let state = {
    order: ['home','design','build','qa','deploy','monitor'],
    scale: 1,
    orientation: 'vertical',
    collapsed: true,
    pos: {right: 16, bottom: 16}
  };

  function save(){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}
  }
  function load(){
    try{
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if(s) state = {...state, ...s};
    }catch(e){}
  }
  load();
  // apply
  function applyState(){
    document.documentElement.style.setProperty('--size', state.scale);
    dock.classList.remove('vertical','horizontal');
    dock.classList.add(state.orientation);
    dock.style.right = state.pos.right+'px';
    dock.style.bottom = state.pos.bottom+'px';
    if(state.collapsed) dock.classList.add('collapsed');
    else dock.classList.remove('collapsed');
    renderItems();
  }

  function renderItems(){
    // map order -> DOM
    const mapping = {
      home: '🏠', design: '✏️', build: '🛠️', qa: '🔍', deploy: '🚀', monitor: '📈'
    };
    items.innerHTML = '';
    state.order.forEach(key=>{
      const btn = document.createElement('button');
      btn.className = 'tt-item';
      btn.dataset.key = key;
      btn.setAttribute('aria-label', key);
      btn.innerText = mapping[key] || key;
      btn.draggable = true;
      items.appendChild(btn);
    });
    items.setAttribute('aria-hidden', state.collapsed ? 'true' : 'false');
  }

  applyState();

  // toggle expand/collapse (single click)
  base.addEventListener('click', (e)=>{
    // short click only if not part of long-press
    if(longPressTimer) return;
    state.collapsed = !state.collapsed;
    save();
    applyState();
  });

  // double click -> toggle orientation
  base.addEventListener('dblclick', (e)=>{
    state.orientation = state.orientation === 'vertical' ? 'horizontal' : 'vertical';
    save(); applyState();
  });

  // long press to enter edit mode (>=4s)
  base.addEventListener('pointerdown', (e)=>{
    longPressTimer = setTimeout(()=>{
      editMode = true;
      dock.classList.add('editing');
      // show simple edit panel
      showEditPanel();
    }, 4000);
  });
  ['pointerup','pointerleave','pointercancel'].forEach(evt=>{
    base.addEventListener(evt, ()=> {
      if(longPressTimer){ clearTimeout(longPressTimer); longPressTimer = null; }
    });
  });

  // while in edit mode, hold 2s to exit
  base.addEventListener('pointerdown', (e)=>{
    if(!editMode) return;
    exitPressTimer = setTimeout(()=> {
      editMode = false;
      dock.classList.remove('editing');
      hideEditPanel();
    }, 2000);
  });
  ['pointerup','pointerleave','pointercancel'].forEach(evt=>{
    base.addEventListener(evt, ()=> {
      if(exitPressTimer){ clearTimeout(exitPressTimer); exitPressTimer = null; }
    });
  });

  // simple drag & drop reorder with HTML5 API
  let dragKey = null;
  items.addEventListener('dragstart', (e)=>{
    const t = e.target;
    if(!t.classList.contains('tt-item') || !editMode) { e.preventDefault(); return; }
    dragKey = t.dataset.key;
    t.classList.add('dragging');
    e.dataTransfer?.setData('text/plain', dragKey);
    e.dataTransfer.effectAllowed = 'move';
  });
  items.addEventListener('dragend', (e)=>{
    const el = items.querySelector('.dragging');
    if(el) el.classList.remove('dragging');
    dragKey = null;
  });
  items.addEventListener('dragover', (e)=>{
    e.preventDefault();
    if(!editMode) return;
    const after = getDragAfterElement(items, e.clientY, e.clientX);
    const dragged = items.querySelector(`[data-key="${dragKey}"]`);
    if(after == null) items.appendChild(dragged);
    else items.insertBefore(dragged, after);
  });
  items.addEventListener('drop', (e)=>{
    e.preventDefault();
    // update order from DOM
    const newOrder = Array.from(items.querySelectorAll('.tt-item')).map(b=>b.dataset.key);
    state.order = newOrder;
    save(); applyState();
  });

  function getDragAfterElement(container, y, x){
    const horizontal = state.orientation === 'horizontal';
    const draggableElements = [...container.querySelectorAll('.tt-item:not(.dragging)')];
    return draggableElements.reduce((closest, child)=>{
      const rect = child.getBoundingClientRect();
      const offset = horizontal ? x - (rect.left + rect.width/2) : y - (rect.top + rect.height/2);
      if(offset < 0 && offset > closest.offset) { return {offset: offset, element: child}; }
      return closest;
    }, {offset: Number.NEGATIVE_INFINITY}).element;
  }

  // Reposition dock (drag the base while not in edit mode)
  let draggingDock = false, start = null;
  base.addEventListener('pointerdown', (e)=>{
    if(editMode) return;
    draggingDock = true;
    start = {x:e.clientX, y:e.clientY, right: state.pos.right, bottom: state.pos.bottom};
    base.setPointerCapture(e.pointerId);
  });
  base.addEventListener('pointermove', (e)=>{
    if(!draggingDock || editMode || !start) return;
    const dx = start.x - e.clientX;
    const dy = start.y - e.clientY;
    state.pos.right = Math.max(6, Math.round(start.right + dx));
    state.pos.bottom = Math.max(6, Math.round(start.bottom + dy));
    applyState();
  });
  base.addEventListener('pointerup', (e)=>{
    if(draggingDock){ draggingDock=false; start=null; save(); }
    try{ base.releasePointerCapture?.(e.pointerId);}catch(e){}
  });

  // Simple Edit panel UI
  let editPanel = null;
  function showEditPanel(){
    if(editPanel) return;
    editPanel = document.createElement('div');
    editPanel.className = 'tt-edit-panel';
    editPanel.innerHTML = `
      <label style="font-size:13px">Scale
        <input class="tt-slider" type="range" min="0.6" max="1.6" step="0.05" value="${state.scale}">
      </label>
      <button class="tt-save">Save</button>
    `;
    dock.appendChild(editPanel);
    const slider = editPanel.querySelector('.tt-slider');
    slider.addEventListener('input', (e)=>{
      state.scale = parseFloat(e.target.value);
      applyState();
    });
    editPanel.querySelector('.tt-save').addEventListener('click', ()=>{
      editMode = false; dock.classList.remove('editing'); hideEditPanel(); save();
    });
  }
  function hideEditPanel(){ if(!editPanel) return; editPanel.remove(); editPanel = null; }

  // Click handler for items
  items.addEventListener('click', (e)=>{
    const b = e.target.closest('.tt-item');
    if(!b) return;
    const key = b.dataset.key;
    // Hook: perform navigation or callback
    console.log('navigate to', key);
    // For demo: collapse after click
    state.collapsed = true; save(); applyState();
  });

  // keyboard reordering in edit mode (focus management)
  document.addEventListener('keydown', (e)=>{
    if(!editMode) return;
    const active = document.activeElement;
    if(!active || !active.classList.contains('tt-item')) return;
    const idx = Array.from(items.children).indexOf(active);
    if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
      if(idx>0){ items.insertBefore(active, items.children[idx-1]); updateOrderAndSave(); active.focus(); }
    } else if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
      if(idx < items.children.length-1){ items.insertBefore(items.children[idx+1], active); updateOrderAndSave(); active.focus(); }
    } else if(e.key === 'Escape'){
      editMode=false; dock.classList.remove('editing'); hideEditPanel();
    }
  });
  function updateOrderAndSave(){ state.order = Array.from(items.children).map(n => n.dataset.key); save(); }

})();
</script>
</body>
</html>
```

> This prototype covers scale, expansion, orientation toggle, edit mode (long press), reorder (HTML5 drag), and reposition of the dock.

---

# React 18 + TypeScript component

Below is a portable component you can drop into a React app. It uses hooks, persists to `localStorage`, supports edit-mode long-press logic, reorder using HTML5 drag (works on desktop; touch still supported by native dragstart on many browsers). The component accepts props for icon set and callbacks.

```tsx
// TechTreeSmartNav.tsx
import React, { useEffect, useRef, useState } from 'react';

type ItemKey = 'home'|'design'|'build'|'qa'|'deploy'|'monitor';
export type TechItem = { key: ItemKey; label: string; svg?: React.ReactNode };

const DEFAULT_ITEMS: TechItem[] = [
  { key:'home', label:'Home' },
  { key:'design', label:'Design' },
  { key:'build', label:'Build' },
  { key:'qa', label:'QA' },
  { key:'deploy', label:'Deploy' },
  { key:'monitor', label:'Monitor' },
];

type Props = {
  storageKey?: string;
  initialOrientation?: 'vertical' | 'horizontal';
  onNavigate?: (key: ItemKey)=>void;
  items?: TechItem[];
};

type PersistState = {
  order: ItemKey[];
  scale: number;
  orientation: 'vertical'|'horizontal';
  collapsed: boolean;
  pos: { right:number; bottom:number };
};

const DEFAULT_STATE: PersistState = {
  order: DEFAULT_ITEMS.map(i=>i.key),
  scale: 1,
  orientation: 'vertical',
  collapsed: true,
  pos: { right: 16, bottom: 16 }
};

export default function TechTreeSmartNav({ storageKey='techtree_v1', initialOrientation='vertical', onNavigate, items=DEFAULT_ITEMS }: Props){
  const [state, setState] = useState<PersistState>(DEFAULT_STATE);
  const [editMode, setEditMode] = useState(false);
  const [dragKey, setDragKey] = useState<ItemKey | null>(null);
  const baseRef = useRef<HTMLDivElement|null>(null);
  const dockRef = useRef<HTMLDivElement|null>(null);
  const longPressRef = useRef<number|null>(null);
  const exitPressRef = useRef<number|null>(null);

  useEffect(()=>{
    try{
      const raw = localStorage.getItem(storageKey);
      if(raw) setState(prev => ({...prev, ...JSON.parse(raw)}));
      else setState(prev => ({...prev, orientation: initialOrientation}));
    }catch(e){}
  }, [storageKey, initialOrientation]);

  useEffect(()=> {
    try{ localStorage.setItem(storageKey, JSON.stringify(state)); }catch(e){}
  }, [state, storageKey]);

  function toggleCollapse(){ setState(s=>({ ...s, collapsed: !s.collapsed })); }

  function toggleOrientation(){ setState(s => ({ ...s, orientation: s.orientation==='vertical' ? 'horizontal' : 'vertical' })); }

  function startLongPress(){
    clearLongTimers();
    longPressRef.current = window.setTimeout(()=> {
      setEditMode(true);
    }, 4000);
  }
  function clearLongTimers(){
    if(longPressRef.current) { clearTimeout(longPressRef.current); longPressRef.current = null; }
    if(exitPressRef.current){ clearTimeout(exitPressRef.current); exitPressRef.current = null; }
  }
  function startExitHold(){
    if(!editMode) return;
    exitPressRef.current = window.setTimeout(()=> {
      setEditMode(false);
    }, 2000);
  }

  // Drag & drop handlers for reordering
  function onDragStart(e: React.DragEvent, key: ItemKey){
    if(!editMode) { e.preventDefault(); return; }
    setDragKey(key); e.dataTransfer.effectAllowed = 'move';
  }
  function onDragOver(e: React.DragEvent){
    e.preventDefault();
  }
  function onDrop(e: React.DragEvent){
    e.preventDefault();
    const target = (e.target as HTMLElement).closest('[data-key]') as HTMLElement|null;
    if(!target || !dragKey) return;
    const targetKey = target.dataset.key as ItemKey;
    setState(prev => {
      const order = [...prev.order];
      const from = order.indexOf(dragKey);
      const to = order.indexOf(targetKey);
      order.splice(from,1);
      order.splice(to,0,dragKey);
      return {...prev, order};
    });
    setDragKey(null);
  }

  // reposition by dragging base (simple)
  const dragState = useRef<{dragging:false|true, startX?:number, startY?:number, origRight?:number, origBottom?:number}>({ dragging:false });
  function basePointerDown(e: React.PointerEvent){
    // if in edit mode then start exit hold; else start dragging
    (e.target as Element).setPointerCapture?.(e.pointerId);
    if(editMode){ startExitHold(); return; }
    dragState.current.dragging = true;
    dragState.current.startX = e.clientX;
    dragState.current.startY = e.clientY;
    dragState.current.origRight = state.pos.right;
    dragState.current.origBottom = state.pos.bottom;
    startLongPress();
  }
  function basePointerMove(e: React.PointerEvent){
    if(!dragState.current.dragging) return;
    // reposition
    const dx = (dragState.current.startX ?? 0) - e.clientX;
    const dy = (dragState.current.startY ?? 0) - e.clientY;
    setState(s => ({ ...s, pos: { right: Math.max(6, Math.round((dragState.current.origRight ?? 16) + dx)), bottom: Math.max(6, Math.round((dragState.current.origBottom ?? 16) + dy)) } }));
  }
  function basePointerUp(e: React.PointerEvent){
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    clearLongTimers();
    if(dragState.current.dragging) {
      dragState.current.dragging = false;
    } else {
      // if no drag happened and we were in edit hold window cleared, it's a click
    }
  }

  // keyboard: simple handlers while editing
  function onKeyDown(e: React.KeyboardEvent){
    if(!editMode) return;
    const active = document.activeElement as HTMLElement|null;
    if(!active || !active.dataset.key) return;
    const key = active.dataset.key as ItemKey;
    const idx = state.order.indexOf(key);
    if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
      if(idx>0){ const order = [...state.order]; [order[idx-1], order[idx]] = [order[idx], order[idx-1]]; setState(s=>({...s, order})); (active.previousElementSibling as HTMLElement)?.focus(); }
    } else if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
      if(idx < state.order.length-1){ const order = [...state.order]; [order[idx], order[idx+1]] = [order[idx+1], order[idx]]; setState(s=>({...s, order})); (active.nextElementSibling as HTMLElement)?.focus(); }
    } else if(e.key === 'Escape') {
      setEditMode(false);
    }
  }

  return (
    <div
      ref={dockRef}
      className={`tt-dock ${state.orientation}`}
      style={{ position:'fixed', right: state.pos.right, bottom: state.pos.bottom, transform: `scale(${state.scale})`, zIndex: 9999 }}
      role="menu"
      aria-label="TechTree SmartNav"
    >
      <div
        ref={baseRef}
        className="tt-base"
        tabIndex={0}
        role="button"
        aria-label="TechTree Menu"
        onClick={(e)=> { /* quick click toggles collapse but if long press was running, ignore */ toggleCollapse(); }}
        onDoubleClick={()=> toggleOrientation()}
        onPointerDown={basePointerDown}
        onPointerMove={basePointerMove}
        onPointerUp={basePointerUp}
      >
        {/* Provide 4-way arrow icon; production: swap with Lucide icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden focusable="false">
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="1.6" fill="currentColor"/>
        </svg>
      </div>

      <div
        className="tt-items"
        aria-hidden={state.collapsed}
        style={{ display: state.collapsed ? 'none' : 'flex', gap: 8 }}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onKeyDown={onKeyDown}
      >
        {state.order.map(k=>{
          const item = items.find(i=>i.key===k)!;
          return (
            <button
              key={k}
              data-key={k}
              className="tt-item"
              draggable={editMode}
              onDragStart={(e)=> onDragStart(e, k)}
              onClick={()=> { onNavigate?.(k); setState(s=>({...s, collapsed:true})); }}
              aria-label={item.label}
            >
              {item.svg ?? (<span style={{fontSize:16}}>{iconEmoji(k)}</span>)}
            </button>
          );
        })}
      </div>

      {editMode && (
        <div className="tt-edit-panel" style={{ marginTop:8, padding:8, borderRadius:8, background:'rgba(255,255,255,0.03)' }}>
          <label style={{ fontSize:13, marginRight:8 }}>
            Scale
            <input
              type="range"
              min={0.6} max={1.6} step={0.05}
              value={state.scale}
              onChange={(e)=> setState(s=>({...s, scale: Number(e.target.value)}))}
              style={{ marginLeft:8 }}
            />
          </label>
          <button onClick={()=> { setEditMode(false); }}>Done</button>
        </div>
      )}
    </div>
  );
}

/* quick emoji fallback */
function iconEmoji(key: ItemKey){
  switch(key){
    case 'home': return '🏠';
    case 'design': return '✏️';
    case 'build': return '🛠️';
    case 'qa': return '🔍';
    case 'deploy': return '🚀';
    case 'monitor': return '📈';
  }
}
```

**Notes on the React component**
- Replace emoji fallback with Lucide React icons for production. Example: `import { Home, PenTool, Hammer, Search, Rocket, Monitor } from 'lucide-react';`
- The component is intentionally small; consider swapping drag & drop for a library like `dnd-kit` or `react-beautiful-dnd` for polished touch support and a11y if you need more robustness.
- Persisted state uses `localStorage`. For multi-device sync, hook into user account settings on your backend.

---

# Integration checklist (developer actionable)

- [ ] Hook navigation clicks to your router (e.g., `onNavigate` prop).
- [ ] Replace SVG/emoji placeholders with Lucide components (monochrome or multicolor SVG).
- [ ] Add `prefers-reduced-motion` CSS handling.
- [ ] Add fallback for browsers where HTML5 drag isn't available on touch: integrate `dnd-kit` or custom pointer-based reorder.
- [ ] Add analytics events for reorder/scale choices (opt-in).
- [ ] Add Storybook stories: default, collapsed, editing, horizontal, vertical, keyboard-only.

---

# SVG / icon system & reusable tokens (quick)

Use CSS variables for themes:

```css
:root{
  --owg-primary: #0ea5a4;
  --owg-surface: rgba(10,12,16,0.92);
  --owg-accent: linear-gradient(90deg,#7dd3fc,#60a5fa);
  --tt-radius: 12px;
  --tt-touch: 48px;
}
```

Suggested SVG motifs: small rounded strokes, stroke width 1.4–1.8, 16–22px viewBox for icons to match Lucide scale. Multi-color approach: provide `--icon-fill-1`, `--icon-fill-2` CSS tokens to subtly tint icons.

---

# Metaphor / icon anchors for dashboards & branding

- Use a small **tree silhouette** as the dock collapsed icon in marketing material.
- Use `🔗` / `⟂` motif for "reorder" interactions iconography.
- Suggested anchor phrase for copy: **“Cultivate your stack”** — short, brandable, and visually evocative.

---

# Final recommendations / next steps

- Replace prototype drag logic with `dnd-kit` for professional touch/keyboard a11y.
- Produce a Storybook + Figma component set and include a short demo video for your portfolio.
- Consider licensing icon packs (Lucide free + custom colors) and selling the theme as a small UI kit.

---

If you want, I can:
- Convert the React component to use `dnd-kit` for smooth touch & a11y.
- Produce a polished Storybook entry and Figma tokens file for OswegoPark Labs branding (SVG source + exportable icons).
- Create a 30s product demo script and storyboard you can record for the portfolio.

Which of those would you like next?