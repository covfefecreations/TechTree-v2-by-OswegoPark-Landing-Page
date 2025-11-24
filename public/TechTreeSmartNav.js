var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define("TechTreeSmartNav", ["require", "exports", "react"], function (require, exports, react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TechTreeSmartNav;
    react_1 = __importStar(react_1);
    var DEFAULT_ITEMS = [
        { key: 'home', label: 'Home' },
        { key: 'design', label: 'Design' },
        { key: 'build', label: 'Build' },
        { key: 'qa', label: 'QA' },
        { key: 'deploy', label: 'Deploy' },
        { key: 'monitor', label: 'Monitor' },
    ];
    var DEFAULT_STATE = {
        order: DEFAULT_ITEMS.map(function (i) { return i.key; }),
        scale: 1,
        orientation: 'vertical',
        collapsed: true,
        pos: { right: 16, bottom: 16 }
    };
    function TechTreeSmartNav(_a) {
        var _b = _a.storageKey, storageKey = _b === void 0 ? 'techtree_v1' : _b, _c = _a.initialOrientation, initialOrientation = _c === void 0 ? 'vertical' : _c, onNavigate = _a.onNavigate, _d = _a.items, items = _d === void 0 ? DEFAULT_ITEMS : _d;
        var _e = (0, react_1.useState)(DEFAULT_STATE), state = _e[0], setState = _e[1];
        var _f = (0, react_1.useState)(false), editMode = _f[0], setEditMode = _f[1];
        var _g = (0, react_1.useState)(null), dragKey = _g[0], setDragKey = _g[1];
        var baseRef = (0, react_1.useRef)(null);
        var dockRef = (0, react_1.useRef)(null);
        var longPressRef = (0, react_1.useRef)(null);
        var exitPressRef = (0, react_1.useRef)(null);
        (0, react_1.useEffect)(function () {
            try {
                var raw_1 = localStorage.getItem(storageKey);
                if (raw_1)
                    setState(function (prev) { return (__assign(__assign({}, prev), JSON.parse(raw_1))); });
                else
                    setState(function (prev) { return (__assign(__assign({}, prev), { orientation: initialOrientation })); });
            }
            catch (e) { }
        }, [storageKey, initialOrientation]);
        (0, react_1.useEffect)(function () {
            try {
                localStorage.setItem(storageKey, JSON.stringify(state));
            }
            catch (e) { }
        }, [state, storageKey]);
        function toggleCollapse() { setState(function (s) { return (__assign(__assign({}, s), { collapsed: !s.collapsed })); }); }
        function toggleOrientation() { setState(function (s) { return (__assign(__assign({}, s), { orientation: s.orientation === 'vertical' ? 'horizontal' : 'vertical' })); }); }
        function startLongPress() {
            clearLongTimers();
            longPressRef.current = window.setTimeout(function () {
                setEditMode(true);
            }, 4000);
        }
        function clearLongTimers() {
            if (longPressRef.current) {
                clearTimeout(longPressRef.current);
                longPressRef.current = null;
            }
            if (exitPressRef.current) {
                clearTimeout(exitPressRef.current);
                exitPressRef.current = null;
            }
        }
        function startExitHold() {
            if (!editMode)
                return;
            exitPressRef.current = window.setTimeout(function () {
                setEditMode(false);
            }, 2000);
        }
        // Drag & drop handlers for reordering
        function onDragStart(e, key) {
            if (!editMode) {
                e.preventDefault();
                return;
            }
            setDragKey(key);
            e.dataTransfer.effectAllowed = 'move';
        }
        function onDragOver(e) {
            e.preventDefault();
        }
        function onDrop(e) {
            e.preventDefault();
            var target = e.target.closest('[data-key]');
            if (!target || !dragKey)
                return;
            var targetKey = target.dataset.key;
            setState(function (prev) {
                var order = __spreadArray([], prev.order, true);
                var from = order.indexOf(dragKey);
                var to = order.indexOf(targetKey);
                order.splice(from, 1);
                order.splice(to, 0, dragKey);
                return __assign(__assign({}, prev), { order: order });
            });
            setDragKey(null);
        }
        // reposition by dragging base (simple)
        var dragState = (0, react_1.useRef)({ dragging: false });
        function basePointerDown(e) {
            var _a, _b;
            // if in edit mode then start exit hold; else start dragging
            (_b = (_a = e.target).setPointerCapture) === null || _b === void 0 ? void 0 : _b.call(_a, e.pointerId);
            if (editMode) {
                startExitHold();
                return;
            }
            dragState.current.dragging = true;
            dragState.current.startX = e.clientX;
            dragState.current.startY = e.clientY;
            dragState.current.origRight = state.pos.right;
            dragState.current.origBottom = state.pos.bottom;
            startLongPress();
        }
        function basePointerMove(e) {
            var _a, _b;
            if (!dragState.current.dragging)
                return;
            // reposition
            var dx = ((_a = dragState.current.startX) !== null && _a !== void 0 ? _a : 0) - e.clientX;
            var dy = ((_b = dragState.current.startY) !== null && _b !== void 0 ? _b : 0) - e.clientY;
            setState(function (s) { var _a, _b; return (__assign(__assign({}, s), { pos: { right: Math.max(6, Math.round(((_a = dragState.current.origRight) !== null && _a !== void 0 ? _a : 16) + dx)), bottom: Math.max(6, Math.round(((_b = dragState.current.origBottom) !== null && _b !== void 0 ? _b : 16) + dy)) } })); });
        }
        function basePointerUp(e) {
            var _a, _b;
            (_b = (_a = e.target).releasePointerCapture) === null || _b === void 0 ? void 0 : _b.call(_a, e.pointerId);
            clearLongTimers();
            if (dragState.current.dragging) {
                dragState.current.dragging = false;
            }
            else {
                // if no drag happened and we were in edit hold window cleared, it's a click
            }
        }
        // keyboard: simple handlers while editing
        function onKeyDown(e) {
            var _a, _b;
            var _c, _d;
            if (e.key === 'e') {
                setEditMode(!editMode);
                return;
            }
            if (!editMode)
                return;
            var active = document.activeElement;
            if (!active || !active.dataset.key)
                return;
            var key = active.dataset.key;
            var idx = state.order.indexOf(key);
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                if (idx > 0) {
                    var order_1 = __spreadArray([], state.order, true);
                    _a = [order_1[idx], order_1[idx - 1]], order_1[idx - 1] = _a[0], order_1[idx] = _a[1];
                    setState(function (s) { return (__assign(__assign({}, s), { order: order_1 })); });
                    (_c = active.previousElementSibling) === null || _c === void 0 ? void 0 : _c.focus();
                }
            }
            else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                if (idx < state.order.length - 1) {
                    var order_2 = __spreadArray([], state.order, true);
                    _b = [order_2[idx + 1], order_2[idx]], order_2[idx] = _b[0], order_2[idx + 1] = _b[1];
                    setState(function (s) { return (__assign(__assign({}, s), { order: order_2 })); });
                    (_d = active.nextElementSibling) === null || _d === void 0 ? void 0 : _d.focus();
                }
            }
            else if (e.key === 'Escape') {
                setEditMode(false);
            }
        }
        return (react_1.default.createElement("div", { ref: dockRef, className: "tt-dock ".concat(state.orientation), style: { position: 'fixed', right: state.pos.right, bottom: state.pos.bottom, transform: "scale(".concat(state.scale, ")"), zIndex: 9999 }, role: "menu", "aria-label": "TechTree SmartNav" },
            react_1.default.createElement("div", { ref: baseRef, className: "tt-base", tabIndex: 0, role: "button", "aria-label": "TechTree Menu", "aria-expanded": !state.collapsed, "aria-controls": "tt-items", onClick: function (e) { /* quick click toggles collapse but if long press was running, ignore */ toggleCollapse(); }, onDoubleClick: function () { return toggleOrientation(); }, onPointerDown: basePointerDown, onPointerMove: basePointerMove, onPointerUp: basePointerUp },
                react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false" },
                    react_1.default.createElement("path", { d: "M12 3v4M12 17v4M3 12h4M17 12h4", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round", strokeLinejoin: "round" }),
                    react_1.default.createElement("circle", { cx: "12", cy: "12", r: "1.6", fill: "currentColor" }))),
            react_1.default.createElement("div", { id: "tt-items", className: "tt-items", role: state.orientation === 'vertical' ? 'menu' : 'menubar', "aria-hidden": state.collapsed, style: { display: state.collapsed ? 'none' : 'flex', gap: 8 }, onDragOver: onDragOver, onDrop: onDrop, onKeyDown: onKeyDown }, state.order.map(function (k) {
                var _a;
                var item = items.find(function (i) { return i.key === k; });
                return (react_1.default.createElement("button", { key: k, "data-key": k, role: "menuitem", className: "tt-item", draggable: editMode, onDragStart: function (e) { return onDragStart(e, k); }, onClick: function () { onNavigate === null || onNavigate === void 0 ? void 0 : onNavigate(k); setState(function (s) { return (__assign(__assign({}, s), { collapsed: true })); }); }, "aria-label": item.label }, (_a = item.svg) !== null && _a !== void 0 ? _a : (react_1.default.createElement("span", { style: { fontSize: 16 } }, iconEmoji(k)))));
            })),
            editMode && (react_1.default.createElement("div", { className: "tt-edit-panel", style: { marginTop: 8, padding: 8, borderRadius: 8, background: 'rgba(255,255,255,0.03)' } },
                react_1.default.createElement("label", { style: { fontSize: 13, marginRight: 8 } },
                    "Scale",
                    react_1.default.createElement("input", { type: "range", min: 0.6, max: 1.6, step: 0.05, value: state.scale, onChange: function (e) { return setState(function (s) { return (__assign(__assign({}, s), { scale: Number(e.target.value) })); }); }, style: { marginLeft: 8 } })),
                react_1.default.createElement("button", { onClick: function () { setEditMode(false); } }, "Done")))));
    }
    /* quick emoji fallback */
    function iconEmoji(key) {
        switch (key) {
            case 'home': return '🏠';
            case 'design': return '✏️';
            case 'build': return '🛠️';
            case 'qa': return '🔍';
            case 'deploy': return '🚀';
            case 'monitor': return '📈';
        }
    }
});
