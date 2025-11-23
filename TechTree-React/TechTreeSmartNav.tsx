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
    if (e.key === 'e') {
      setEditMode(!editMode);
      return;
    }
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
        aria-expanded={!state.collapsed}
        aria-controls="tt-items"
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
        id="tt-items"
        className="tt-items"
        role={state.orientation === 'vertical' ? 'menu' : 'menubar'}
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
              role="menuitem"
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
