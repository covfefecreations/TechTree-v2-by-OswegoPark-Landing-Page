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