(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/kpi/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$data$2d$table$2d$component$2f$dist$2f$index$2e$cjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-data-table-component/dist/index.cjs.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const Kpis = ()=>{
    _s();
    const [kpis, setKpis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Kpis.useEffect": ()=>{
            const fetchKpis = {
                "Kpis.useEffect.fetchKpis": async ()=>{
                    const res = await fetch('http://localhost:3001/api/kpis');
                    const data = await res.json();
                    setKpis(data);
                }
            }["Kpis.useEffect.fetchKpis"];
            fetchKpis();
        }
    }["Kpis.useEffect"], []);
    const formatDateTime = (dateStr)=>{
        const date = new Date(dateStr);
        return date.toLocaleString('fr-FR', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const truncateMiddle = (text, maxLength = 40)=>{
        if (!text || text.length <= maxLength) return text;
        const half = Math.floor(maxLength / 2);
        return `${text.slice(0, half)}...${text.slice(-half)}`;
    };
    const columns = [
        {
            name: 'Agence',
            selector: (row)=>row.agence,
            sortable: true
        },
        {
            name: 'Prestation',
            selector: (row)=>truncateMiddle(row.prestation),
            sortable: true,
            wrap: true,
            cell: (row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    title: row.prestation,
                    children: truncateMiddle(row.prestation)
                }, void 0, false, {
                    fileName: "[project]/src/app/kpi/page.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
        },
        {
            name: 'Date',
            selector: (row)=>row.date,
            sortable: true,
            cell: (row)=>formatDateTime(row.date)
        },
        {
            name: 'Nombre',
            selector: (row)=>row.count,
            sortable: true,
            right: true
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: styles.title,
                children: "Statistiques des Prestations"
            }, void 0, false, {
                fileName: "[project]/src/app/kpi/page.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$data$2d$table$2d$component$2f$dist$2f$index$2e$cjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                columns: columns,
                data: kpis,
                pagination: true,
                highlightOnHover: true,
                responsive: true,
                striped: true,
                defaultSortFieldId: 3
            }, void 0, false, {
                fileName: "[project]/src/app/kpi/page.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/kpi/page.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
};
_s(Kpis, "455LlRtOEc3M3sOfDXLb2z842sQ=");
_c = Kpis;
const styles = {
    container: {
        margin: '40px auto',
        padding: '30px',
        maxWidth: '1000px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 3px 15px rgba(0,0,0,0.1)',
        fontFamily: 'Segoe UI, sans-serif',
        color: '#344767'
    },
    title: {
        textAlign: 'center',
        color: '#007bff',
        marginBottom: '20px'
    }
};
const __TURBOPACK__default__export__ = Kpis;
var _c;
__turbopack_context__.k.register(_c, "Kpis");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey, debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        "react-stack-bottom-frame": function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}}),
"[project]/node_modules/react-data-table-component/dist/index.cjs.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
});
var e = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), t = (()=>{
    const e = new Error("Cannot find module 'styled-components'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
function n(e) {
    return e && "object" == typeof e && "default" in e ? e : {
        default: e
    };
}
function o(e) {
    if (e && e.__esModule) return e;
    var t = Object.create(null);
    return e && Object.keys(e).forEach(function(n) {
        if ("default" !== n) {
            var o = Object.getOwnPropertyDescriptor(e, n);
            Object.defineProperty(t, n, o.get ? o : {
                enumerable: !0,
                get: function() {
                    return e[n];
                }
            });
        }
    }), t.default = e, Object.freeze(t);
}
var a, l = o(e), r = n(e), i = n(t);
function s(e, t) {
    return e[t];
}
function d(e = [], t, n = 0) {
    return [
        ...e.slice(0, n),
        t,
        ...e.slice(n)
    ];
}
function c(e = [], t, n = "id") {
    const o = e.slice(), a = s(t, n);
    return a ? o.splice(o.findIndex((e)=>s(e, n) === a), 1) : o.splice(o.findIndex((e)=>e === t), 1), o;
}
function g(e) {
    return e.map((e, t)=>{
        const n = Object.assign(Object.assign({}, e), {
            sortable: e.sortable || !!e.sortFunction || void 0
        });
        return e.id || (n.id = t + 1), n;
    });
}
function u(e, t) {
    return Math.ceil(e / t);
}
function p(e, t) {
    return Math.min(e, t);
}
!function(e) {
    e.ASC = "asc", e.DESC = "desc";
}(a || (a = {}));
const b = ()=>null;
function m(e, t = [], n = []) {
    let o = {}, a = [
        ...n
    ];
    return t.length && t.forEach((t)=>{
        if (!t.when || "function" != typeof t.when) throw new Error('"when" must be defined in the conditional style object and must be function');
        t.when(e) && (o = t.style || {}, t.classNames && (a = [
            ...a,
            ...t.classNames
        ]), "function" == typeof t.style && (o = t.style(e) || {}));
    }), {
        conditionalStyle: o,
        classNames: a.join(" ")
    };
}
function f(e, t = [], n = "id") {
    const o = s(e, n);
    return o ? t.some((e)=>s(e, n) === o) : t.some((t)=>t === e);
}
function h(e, t) {
    return t ? e.findIndex((e)=>w(e.id, t)) : -1;
}
function w(e, t) {
    return e == t;
}
function x(e, t) {
    const n = !e.toggleOnSelectedRowsChange;
    switch(t.type){
        case "SELECT_ALL_ROWS":
            {
                const { keyField: n, rows: o, rowCount: a, mergeSelections: l } = t, r = !e.allSelected, i = !e.toggleOnSelectedRowsChange;
                if (l) {
                    const t = r ? [
                        ...e.selectedRows,
                        ...o.filter((t)=>!f(t, e.selectedRows, n))
                    ] : e.selectedRows.filter((e)=>!f(e, o, n));
                    return Object.assign(Object.assign({}, e), {
                        allSelected: r,
                        selectedCount: t.length,
                        selectedRows: t,
                        toggleOnSelectedRowsChange: i
                    });
                }
                return Object.assign(Object.assign({}, e), {
                    allSelected: r,
                    selectedCount: r ? a : 0,
                    selectedRows: r ? o : [],
                    toggleOnSelectedRowsChange: i
                });
            }
        case "SELECT_SINGLE_ROW":
            {
                const { keyField: o, row: a, isSelected: l, rowCount: r, singleSelect: i } = t;
                return i ? l ? Object.assign(Object.assign({}, e), {
                    selectedCount: 0,
                    allSelected: !1,
                    selectedRows: [],
                    toggleOnSelectedRowsChange: n
                }) : Object.assign(Object.assign({}, e), {
                    selectedCount: 1,
                    allSelected: !1,
                    selectedRows: [
                        a
                    ],
                    toggleOnSelectedRowsChange: n
                }) : l ? Object.assign(Object.assign({}, e), {
                    selectedCount: e.selectedRows.length > 0 ? e.selectedRows.length - 1 : 0,
                    allSelected: !1,
                    selectedRows: c(e.selectedRows, a, o),
                    toggleOnSelectedRowsChange: n
                }) : Object.assign(Object.assign({}, e), {
                    selectedCount: e.selectedRows.length + 1,
                    allSelected: e.selectedRows.length + 1 === r,
                    selectedRows: d(e.selectedRows, a),
                    toggleOnSelectedRowsChange: n
                });
            }
        case "SELECT_MULTIPLE_ROWS":
            {
                const { keyField: o, selectedRows: a, totalRows: l, mergeSelections: r } = t;
                if (r) {
                    const t = [
                        ...e.selectedRows,
                        ...a.filter((t)=>!f(t, e.selectedRows, o))
                    ];
                    return Object.assign(Object.assign({}, e), {
                        selectedCount: t.length,
                        allSelected: !1,
                        selectedRows: t,
                        toggleOnSelectedRowsChange: n
                    });
                }
                return Object.assign(Object.assign({}, e), {
                    selectedCount: a.length,
                    allSelected: a.length === l,
                    selectedRows: a,
                    toggleOnSelectedRowsChange: n
                });
            }
        case "CLEAR_SELECTED_ROWS":
            {
                const { selectedRowsFlag: n } = t;
                return Object.assign(Object.assign({}, e), {
                    allSelected: !1,
                    selectedCount: 0,
                    selectedRows: [],
                    selectedRowsFlag: n
                });
            }
        case "SORT_CHANGE":
            {
                const { sortDirection: o, selectedColumn: a, clearSelectedOnSort: l } = t;
                return Object.assign(Object.assign(Object.assign({}, e), {
                    selectedColumn: a,
                    sortDirection: o,
                    currentPage: 1
                }), l && {
                    allSelected: !1,
                    selectedCount: 0,
                    selectedRows: [],
                    toggleOnSelectedRowsChange: n
                });
            }
        case "CHANGE_PAGE":
            {
                const { page: o, paginationServer: a, visibleOnly: l, persistSelectedOnPageChange: r } = t, i = a && r, s = a && !r || l;
                return Object.assign(Object.assign(Object.assign(Object.assign({}, e), {
                    currentPage: o
                }), i && {
                    allSelected: !1
                }), s && {
                    allSelected: !1,
                    selectedCount: 0,
                    selectedRows: [],
                    toggleOnSelectedRowsChange: n
                });
            }
        case "CHANGE_ROWS_PER_PAGE":
            {
                const { rowsPerPage: n, page: o } = t;
                return Object.assign(Object.assign({}, e), {
                    currentPage: o,
                    rowsPerPage: n
                });
            }
    }
}
const C = t.css`
	pointer-events: none;
	opacity: 0.4;
`, y = i.default.div`
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({ disabled: e })=>e && C};
	${({ theme: e })=>e.table.style};
`, v = t.css`
	position: sticky;
	position: -webkit-sticky; /* Safari */
	top: 0;
	z-index: 1;
`, R = i.default.div`
	display: flex;
	width: 100%;
	${({ $fixedHeader: e })=>e && v};
	${({ theme: e })=>e.head.style};
`, S = i.default.div`
	display: flex;
	align-items: stretch;
	width: 100%;
	${({ theme: e })=>e.headRow.style};
	${({ $dense: e, theme: t })=>e && t.headRow.denseStyle};
`, E = (e, ...n)=>t.css`
		@media screen and (max-width: ${599}px) {
			${t.css(e, ...n)}
		}
	`, O = (e, ...n)=>t.css`
		@media screen and (max-width: ${959}px) {
			${t.css(e, ...n)}
		}
	`, $ = (e, ...n)=>t.css`
		@media screen and (max-width: ${1280}px) {
			${t.css(e, ...n)}
		}
	`, P = (e)=>(n, ...o)=>t.css`
			@media screen and (max-width: ${e}px) {
				${t.css(n, ...o)}
			}
		`, k = i.default.div`
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	${({ theme: e, $headCell: t })=>e[t ? "headCells" : "cells"].style};
	${({ $noPadding: e })=>e && "padding: 0"};
`, D = i.default(k)`
	flex-grow: ${({ button: e, grow: t })=>0 === t || e ? 0 : t || 1};
	flex-shrink: 0;
	flex-basis: 0;
	max-width: ${({ maxWidth: e })=>e || "100%"};
	min-width: ${({ minWidth: e })=>e || "100px"};
	${({ width: e })=>e && t.css`
			min-width: ${e};
			max-width: ${e};
		`};
	${({ right: e })=>e && "justify-content: flex-end"};
	${({ button: e, center: t })=>(t || e) && "justify-content: center"};
	${({ compact: e, button: t })=>(e || t) && "padding: 0"};

	/* handle hiding cells */
	${({ hide: e })=>e && "sm" === e && E`
    display: none;
  `};
	${({ hide: e })=>e && "md" === e && O`
    display: none;
  `};
	${({ hide: e })=>e && "lg" === e && $`
    display: none;
  `};
	${({ hide: e })=>e && Number.isInteger(e) && P(e)`
    display: none;
  `};
`, H = t.css`
	div:first-child {
		white-space: ${({ $wrapCell: e })=>e ? "normal" : "nowrap"};
		overflow: ${({ $allowOverflow: e })=>e ? "visible" : "hidden"};
		text-overflow: ellipsis;
	}
`, j = i.default(D).attrs((e)=>({
        style: e.style
    }))`
	${({ $renderAsCell: e })=>!e && H};
	${({ theme: e, $isDragging: t })=>t && e.cells.draggingStyle};
	${({ $cellStyle: e })=>e};
`;
var F = l.memo(function({ id: e, column: t, row: n, rowIndex: o, dataTag: a, isDragging: r, onDragStart: i, onDragOver: s, onDragEnd: d, onDragEnter: c, onDragLeave: g }) {
    const { conditionalStyle: u, classNames: p } = m(n, t.conditionalCellStyles, [
        "rdt_TableCell"
    ]);
    return l.createElement(j, {
        id: e,
        "data-column-id": t.id,
        role: "cell",
        className: p,
        "data-tag": a,
        $cellStyle: t.style,
        $renderAsCell: !!t.cell,
        $allowOverflow: t.allowOverflow,
        button: t.button,
        center: t.center,
        compact: t.compact,
        grow: t.grow,
        hide: t.hide,
        maxWidth: t.maxWidth,
        minWidth: t.minWidth,
        right: t.right,
        width: t.width,
        $wrapCell: t.wrap,
        style: u,
        $isDragging: r,
        onDragStart: i,
        onDragOver: s,
        onDragEnd: d,
        onDragEnter: c,
        onDragLeave: g
    }, !t.cell && l.createElement("div", {
        "data-tag": a
    }, function(e, t, n, o) {
        return t ? n && "function" == typeof n ? n(e, o) : t(e, o) : null;
    }(n, t.selector, t.format, o)), t.cell && t.cell(n, o, t, e));
});
const T = "input";
var I = l.memo(function({ name: e, component: t = T, componentOptions: n = {
    style: {}
}, indeterminate: o = !1, checked: a = !1, disabled: r = !1, onClick: i = b }) {
    const s = t, d = s !== T ? n.style : ((e)=>Object.assign(Object.assign({
            fontSize: "18px"
        }, !e && {
            cursor: "pointer"
        }), {
            padding: 0,
            marginTop: "1px",
            verticalAlign: "middle",
            position: "relative"
        }))(r), c = l.useMemo({
        "I.useMemo[c]": ()=>({
                "I.useMemo[c]": function(e, ...t) {
                    let n;
                    return Object.keys(e).map({
                        "I.useMemo[c]": (t)=>e[t]
                    }["I.useMemo[c]"]).forEach({
                        "I.useMemo[c]": (o, a)=>{
                            const l = e;
                            "function" == typeof o && (n = Object.assign(Object.assign({}, l), {
                                [Object.keys(e)[a]]: o(...t)
                            }));
                        }
                    }["I.useMemo[c]"]), n || e;
                }
            })["I.useMemo[c]"](n, o)
    }["I.useMemo[c]"], [
        n,
        o
    ]);
    return l.createElement(s, Object.assign({
        type: "checkbox",
        ref: (e)=>{
            e && (e.indeterminate = o);
        },
        style: d,
        onClick: r ? b : i,
        name: e,
        "aria-label": e,
        checked: a,
        disabled: r
    }, c, {
        onChange: b
    }));
});
const M = i.default(k)`
	flex: 0 0 48px;
	min-width: 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;
function A({ name: e, keyField: t, row: n, rowCount: o, selected: a, selectableRowsComponent: r, selectableRowsComponentProps: i, selectableRowsSingle: s, selectableRowDisabled: d, onSelectedRow: c }) {
    const g = !(!d || !d(n));
    return l.createElement(M, {
        onClick: (e)=>e.stopPropagation(),
        className: "rdt_TableCell",
        $noPadding: !0
    }, l.createElement(I, {
        name: e,
        component: r,
        componentOptions: i,
        checked: a,
        "aria-checked": a,
        onClick: ()=>{
            c({
                type: "SELECT_SINGLE_ROW",
                row: n,
                isSelected: a,
                keyField: t,
                rowCount: o,
                singleSelect: s
            });
        },
        disabled: g
    }));
}
const L = i.default.button`
	display: inline-flex;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	background-color: transparent;
	${({ theme: e })=>e.expanderButton.style};
`;
function _({ disabled: e = !1, expanded: t = !1, expandableIcon: n, id: o, row: a, onToggled: r }) {
    const i = t ? n.expanded : n.collapsed;
    return l.createElement(L, {
        "aria-disabled": e,
        onClick: ()=>r && r(a),
        "data-testid": `expander-button-${o}`,
        disabled: e,
        "aria-label": t ? "Collapse Row" : "Expand Row",
        role: "button",
        type: "button"
    }, i);
}
const z = i.default(k)`
	white-space: nowrap;
	font-weight: 400;
	min-width: 48px;
	${({ theme: e })=>e.expanderCell.style};
`;
function N({ row: e, expanded: t = !1, expandableIcon: n, id: o, onToggled: a, disabled: r = !1 }) {
    return l.createElement(z, {
        onClick: (e)=>e.stopPropagation(),
        $noPadding: !0
    }, l.createElement(_, {
        id: o,
        row: e,
        expanded: t,
        expandableIcon: n,
        disabled: r,
        onToggled: a
    }));
}
const W = i.default.div`
	width: 100%;
	box-sizing: border-box;
	${({ theme: e })=>e.expanderRow.style};
	${({ $extendedRowStyle: e })=>e};
`;
var B = l.memo(function({ data: e, ExpanderComponent: t, expanderComponentProps: n, extendedRowStyle: o, extendedClassNames: a }) {
    const r = [
        "rdt_ExpanderRow",
        ...a.split(" ").filter((e)=>"rdt_TableRow" !== e)
    ].join(" ");
    return l.createElement(W, {
        className: r,
        $extendedRowStyle: o
    }, l.createElement(t, Object.assign({
        data: e
    }, n)));
});
const G = "allowRowEvents";
var V, U, q;
exports.Direction = void 0, (V = exports.Direction || (exports.Direction = {})).LTR = "ltr", V.RTL = "rtl", V.AUTO = "auto", exports.Alignment = void 0, (U = exports.Alignment || (exports.Alignment = {})).LEFT = "left", U.RIGHT = "right", U.CENTER = "center", exports.Media = void 0, (q = exports.Media || (exports.Media = {})).SM = "sm", q.MD = "md", q.LG = "lg";
const Y = t.css`
	&:hover {
		${({ $highlightOnHover: e, theme: t })=>e && t.rows.highlightOnHoverStyle};
	}
`, K = t.css`
	&:hover {
		cursor: pointer;
	}
`, J = i.default.div.attrs((e)=>({
        style: e.style
    }))`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${({ theme: e })=>e.rows.style};
	${({ $dense: e, theme: t })=>e && t.rows.denseStyle};
	${({ $striped: e, theme: t })=>e && t.rows.stripedStyle};
	${({ $highlightOnHover: e })=>e && Y};
	${({ $pointerOnHover: e })=>e && K};
	${({ $selected: e, theme: t })=>e && t.rows.selectedHighlightStyle};
	${({ $conditionalStyle: e })=>e};
`;
function Q({ columns: e = [], conditionalRowStyles: t = [], defaultExpanded: n = !1, defaultExpanderDisabled: o = !1, dense: a = !1, expandableIcon: r, expandableRows: i = !1, expandableRowsComponent: d, expandableRowsComponentProps: c, expandableRowsHideExpander: g, expandOnRowClicked: u = !1, expandOnRowDoubleClicked: p = !1, highlightOnHover: f = !1, id: h, expandableInheritConditionalStyles: x, keyField: C, onRowClicked: y = b, onRowDoubleClicked: v = b, onRowMouseEnter: R = b, onRowMouseLeave: S = b, onRowExpandToggled: E = b, onSelectedRow: O = b, pointerOnHover: $ = !1, row: P, rowCount: k, rowIndex: D, selectableRowDisabled: H = null, selectableRows: j = !1, selectableRowsComponent: T, selectableRowsComponentProps: I, selectableRowsHighlight: M = !1, selectableRowsSingle: L = !1, selected: _, striped: z = !1, draggingColumnId: W, onDragStart: V, onDragOver: U, onDragEnd: q, onDragEnter: Y, onDragLeave: K }) {
    const [Q, X] = l.useState(n);
    l.useEffect({
        "Q.useEffect": ()=>{
            X(n);
        }
    }["Q.useEffect"], [
        n
    ]);
    const Z = l.useCallback({
        "Q.useCallback[Z]": ()=>{
            X(!Q), E(!Q, P);
        }
    }["Q.useCallback[Z]"], [
        Q,
        E,
        P
    ]), ee = $ || i && (u || p), te = l.useCallback({
        "Q.useCallback[te]": (e)=>{
            e.target.getAttribute("data-tag") === G && (y(P, e), !o && i && u && Z());
        }
    }["Q.useCallback[te]"], [
        o,
        u,
        i,
        Z,
        y,
        P
    ]), ne = l.useCallback({
        "Q.useCallback[ne]": (e)=>{
            e.target.getAttribute("data-tag") === G && (v(P, e), !o && i && p && Z());
        }
    }["Q.useCallback[ne]"], [
        o,
        p,
        i,
        Z,
        v,
        P
    ]), oe = l.useCallback({
        "Q.useCallback[oe]": (e)=>{
            R(P, e);
        }
    }["Q.useCallback[oe]"], [
        R,
        P
    ]), ae = l.useCallback({
        "Q.useCallback[ae]": (e)=>{
            S(P, e);
        }
    }["Q.useCallback[ae]"], [
        S,
        P
    ]), le = s(P, C), { conditionalStyle: re, classNames: ie } = m(P, t, [
        "rdt_TableRow"
    ]), se = M && _, de = x ? re : {}, ce = z && D % 2 == 0;
    return l.createElement(l.Fragment, null, l.createElement(J, {
        id: `row-${h}`,
        role: "row",
        $striped: ce,
        $highlightOnHover: f,
        $pointerOnHover: !o && ee,
        $dense: a,
        onClick: te,
        onDoubleClick: ne,
        onMouseEnter: oe,
        onMouseLeave: ae,
        className: ie,
        $selected: se,
        $conditionalStyle: re
    }, j && l.createElement(A, {
        name: `select-row-${le}`,
        keyField: C,
        row: P,
        rowCount: k,
        selected: _,
        selectableRowsComponent: T,
        selectableRowsComponentProps: I,
        selectableRowDisabled: H,
        selectableRowsSingle: L,
        onSelectedRow: O
    }), i && !g && l.createElement(N, {
        id: le,
        expandableIcon: r,
        expanded: Q,
        row: P,
        onToggled: Z,
        disabled: o
    }), e.map((e)=>e.omit ? null : l.createElement(F, {
            id: `cell-${e.id}-${le}`,
            key: `cell-${e.id}-${le}`,
            dataTag: e.ignoreRowClick || e.button ? null : G,
            column: e,
            row: P,
            rowIndex: D,
            isDragging: w(W, e.id),
            onDragStart: V,
            onDragOver: U,
            onDragEnd: q,
            onDragEnter: Y,
            onDragLeave: K
        }))), i && Q && l.createElement(B, {
        key: `expander-${le}`,
        data: P,
        extendedRowStyle: de,
        extendedClassNames: ie,
        ExpanderComponent: d,
        expanderComponentProps: c
    }));
}
const X = i.default.span`
	padding: 2px;
	color: inherit;
	flex-grow: 0;
	flex-shrink: 0;
	${({ $sortActive: e })=>e ? "opacity: 1" : "opacity: 0"};
	${({ $sortDirection: e })=>"desc" === e && "transform: rotate(180deg)"};
`, Z = ({ sortActive: e, sortDirection: t })=>r.default.createElement(X, {
        $sortActive: e,
        $sortDirection: t
    }, "▲"), ee = i.default(D)`
	${({ button: e })=>e && "text-align: center"};
	${({ theme: e, $isDragging: t })=>t && e.headCells.draggingStyle};
`, te = t.css`
	cursor: pointer;
	span.__rdt_custom_sort_icon__ {
		i,
		svg {
			transform: 'translate3d(0, 0, 0)';
			${({ $sortActive: e })=>e ? "opacity: 1" : "opacity: 0"};
			color: inherit;
			font-size: 18px;
			height: 18px;
			width: 18px;
			backface-visibility: hidden;
			transform-style: preserve-3d;
			transition-duration: 95ms;
			transition-property: transform;
		}

		&.asc i,
		&.asc svg {
			transform: rotate(180deg);
		}
	}

	${({ $sortActive: e })=>!e && t.css`
			&:hover,
			&:focus {
				opacity: 0.7;

				span,
				span.__rdt_custom_sort_icon__ * {
					opacity: 0.7;
				}
			}
		`};
`, ne = i.default.div`
	display: inline-flex;
	align-items: center;
	justify-content: inherit;
	height: 100%;
	width: 100%;
	outline: none;
	user-select: none;
	overflow: hidden;
	${({ disabled: e })=>!e && te};
`, oe = i.default.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;
var ae = l.memo(function({ column: e, disabled: t, draggingColumnId: n, selectedColumn: o = {}, sortDirection: r, sortIcon: i, sortServer: s, pagination: d, paginationServer: c, persistSelectedOnSort: g, selectableRowsVisibleOnly: u, onSort: p, onDragStart: b, onDragOver: m, onDragEnd: f, onDragEnter: h, onDragLeave: x }) {
    l.useEffect({
        "ae.useEffect": ()=>{
            "string" == typeof e.selector && console.error(`Warning: ${e.selector} is a string based column selector which has been deprecated as of v7 and will be removed in v8. Instead, use a selector function e.g. row => row[field]...`);
        }
    }["ae.useEffect"], []);
    const [C, y] = l.useState(!1), v = l.useRef(null);
    if (l.useEffect({
        "ae.useEffect": ()=>{
            v.current && y(v.current.scrollWidth > v.current.clientWidth);
        }
    }["ae.useEffect"], [
        C
    ]), e.omit) return null;
    const R = ()=>{
        if (!e.sortable && !e.selector) return;
        let t = r;
        w(o.id, e.id) && (t = r === a.ASC ? a.DESC : a.ASC), p({
            type: "SORT_CHANGE",
            sortDirection: t,
            selectedColumn: e,
            clearSelectedOnSort: d && c && !g || s || u
        });
    }, S = (e)=>l.createElement(Z, {
            sortActive: e,
            sortDirection: r
        }), E = ()=>l.createElement("span", {
            className: [
                r,
                "__rdt_custom_sort_icon__"
            ].join(" ")
        }, i), O = !(!e.sortable || !w(o.id, e.id)), $ = !e.sortable || t, P = e.sortable && !i && !e.right, k = e.sortable && !i && e.right, D = e.sortable && i && !e.right, H = e.sortable && i && e.right;
    return l.createElement(ee, {
        "data-column-id": e.id,
        className: "rdt_TableCol",
        $headCell: !0,
        allowOverflow: e.allowOverflow,
        button: e.button,
        compact: e.compact,
        grow: e.grow,
        hide: e.hide,
        maxWidth: e.maxWidth,
        minWidth: e.minWidth,
        right: e.right,
        center: e.center,
        width: e.width,
        draggable: e.reorder,
        $isDragging: w(e.id, n),
        onDragStart: b,
        onDragOver: m,
        onDragEnd: f,
        onDragEnter: h,
        onDragLeave: x
    }, e.name && l.createElement(ne, {
        "data-column-id": e.id,
        "data-sort-id": e.id,
        role: "columnheader",
        tabIndex: 0,
        className: "rdt_TableCol_Sortable",
        onClick: $ ? void 0 : R,
        onKeyPress: $ ? void 0 : (e)=>{
            "Enter" === e.key && R();
        },
        $sortActive: !$ && O,
        disabled: $
    }, !$ && H && E(), !$ && k && S(O), "string" == typeof e.name ? l.createElement(oe, {
        title: C ? e.name : void 0,
        ref: v,
        "data-column-id": e.id
    }, e.name) : e.name, !$ && D && E(), !$ && P && S(O)));
});
const le = i.default(k)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	font-size: unset;
`;
function re({ headCell: e = !0, rowData: t, keyField: n, allSelected: o, mergeSelections: a, selectedRows: r, selectableRowsComponent: i, selectableRowsComponentProps: s, selectableRowDisabled: d, onSelectAllRows: c }) {
    const g = r.length > 0 && !o, u = d ? t.filter((e)=>!d(e)) : t, p = 0 === u.length, b = Math.min(t.length, u.length);
    return l.createElement(le, {
        className: "rdt_TableCol",
        $headCell: e,
        $noPadding: !0
    }, l.createElement(I, {
        name: "select-all-rows",
        component: i,
        componentOptions: s,
        onClick: ()=>{
            c({
                type: "SELECT_ALL_ROWS",
                rows: u,
                rowCount: b,
                mergeSelections: a,
                keyField: n
            });
        },
        checked: o,
        indeterminate: g,
        disabled: p
    }));
}
function ie(e = exports.Direction.AUTO) {
    const t = "object" == typeof window, [n, o] = l.useState(!1);
    return l.useEffect({
        "ie.useEffect": ()=>{
            if (t) if ("auto" !== e) o("rtl" === e);
            else {
                const e = !(!window.document || !window.document.createElement), t = document.getElementsByTagName("BODY")[0], n = document.getElementsByTagName("HTML")[0], a = "rtl" === t.dir || "rtl" === n.dir;
                o(e && a);
            }
        }
    }["ie.useEffect"], [
        e,
        t
    ]), n;
}
const se = i.default.div`
	display: flex;
	align-items: center;
	flex: 1 0 auto;
	height: 100%;
	color: ${({ theme: e })=>e.contextMenu.fontColor};
	font-size: ${({ theme: e })=>e.contextMenu.fontSize};
	font-weight: 400;
`, de = i.default.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
`, ce = i.default.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: inherit;
	z-index: 1;
	align-items: center;
	justify-content: space-between;
	display: flex;
	${({ $rtl: e })=>e && "direction: rtl"};
	${({ theme: e })=>e.contextMenu.style};
	${({ theme: e, $visible: t })=>t && e.contextMenu.activeStyle};
`;
function ge({ contextMessage: e, contextActions: t, contextComponent: n, selectedCount: o, direction: a }) {
    const r = ie(a), i = o > 0;
    return n ? l.createElement(ce, {
        $visible: i
    }, l.cloneElement(n, {
        selectedCount: o
    })) : l.createElement(ce, {
        $visible: i,
        $rtl: r
    }, l.createElement(se, null, ((e, t, n)=>{
        if (0 === t) return null;
        const o = 1 === t ? e.singular : e.plural;
        return n ? `${t} ${e.message || ""} ${o}` : `${t} ${o} ${e.message || ""}`;
    })(e, o, r)), l.createElement(de, null, t));
}
const ue = i.default.div`
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	flex: 1 1 auto;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	${({ theme: e })=>e.header.style}
`, pe = i.default.div`
	flex: 1 0 auto;
	color: ${({ theme: e })=>e.header.fontColor};
	font-size: ${({ theme: e })=>e.header.fontSize};
	font-weight: 400;
`, be = i.default.div`
	flex: 1 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	> * {
		margin-left: 5px;
	}
`, me = ({ title: e, actions: t = null, contextMessage: n, contextActions: o, contextComponent: a, selectedCount: r, direction: i, showMenu: s = !0 })=>l.createElement(ue, {
        className: "rdt_TableHeader",
        role: "heading",
        "aria-level": 1
    }, l.createElement(pe, null, e), t && l.createElement(be, null, t), s && l.createElement(ge, {
        contextMessage: n,
        contextActions: o,
        contextComponent: a,
        direction: i,
        selectedCount: r
    }));
function fe(e, t) {
    var n = {};
    for(var o in e)Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var a = 0;
        for(o = Object.getOwnPropertySymbols(e); a < o.length; a++)t.indexOf(o[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[a]) && (n[o[a]] = e[o[a]]);
    }
    return n;
}
"function" == typeof SuppressedError && SuppressedError;
const he = {
    left: "flex-start",
    right: "flex-end",
    center: "center"
}, we = i.default.header`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${({ align: e })=>he[e]};
	flex-wrap: ${({ $wrapContent: e })=>e ? "wrap" : "nowrap"};
	${({ theme: e })=>e.subHeader.style}
`, xe = (e)=>{
    var { align: t = "right", wrapContent: n = !0 } = e, o = fe(e, [
        "align",
        "wrapContent"
    ]);
    return l.createElement(we, Object.assign({
        align: t,
        $wrapContent: n
    }, o));
}, Ce = i.default.div`
	display: flex;
	flex-direction: column;
`, ye = i.default.div`
	position: relative;
	width: 100%;
	border-radius: inherit;
	${({ $responsive: e, $fixedHeader: n })=>e && t.css`
			overflow-x: auto;

			// hidden prevents vertical scrolling in firefox when fixedHeader is disabled
			overflow-y: ${n ? "auto" : "hidden"};
			min-height: 0;
		`};

	${({ $fixedHeader: e = !1, $fixedHeaderScrollHeight: n = "100vh" })=>e && t.css`
			max-height: ${n};
			-webkit-overflow-scrolling: touch;
		`};

	${({ theme: e })=>e.responsiveWrapper.style};
`, ve = i.default.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${(e)=>e.theme.progress.style};
`, Re = i.default.div`
	position: relative;
	width: 100%;
	${({ theme: e })=>e.tableWrapper.style};
`, Se = i.default(k)`
	white-space: nowrap;
	${({ theme: e })=>e.expanderCell.style};
`, Ee = i.default.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${({ theme: e })=>e.noData.style};
`, Oe = ()=>r.default.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
    }, r.default.createElement("path", {
        d: "M7 10l5 5 5-5z"
    }), r.default.createElement("path", {
        d: "M0 0h24v24H0z",
        fill: "none"
    })), $e = i.default.select`
	cursor: pointer;
	height: 24px;
	max-width: 100%;
	user-select: none;
	padding-left: 8px;
	padding-right: 24px;
	box-sizing: content-box;
	font-size: inherit;
	color: inherit;
	border: none;
	background-color: transparent;
	appearance: none;
	direction: ltr;
	flex-shrink: 0;

	&::-ms-expand {
		display: none;
	}

	&:disabled::-ms-expand {
		background: #f60;
	}

	option {
		color: initial;
	}
`, Pe = i.default.div`
	position: relative;
	flex-shrink: 0;
	font-size: inherit;
	color: inherit;
	margin-top: 1px;

	svg {
		top: 0;
		right: 0;
		color: inherit;
		position: absolute;
		fill: currentColor;
		width: 24px;
		height: 24px;
		display: inline-block;
		user-select: none;
		pointer-events: none;
	}
`, ke = (e)=>{
    var { defaultValue: t, onChange: n } = e, o = fe(e, [
        "defaultValue",
        "onChange"
    ]);
    return l.createElement(Pe, null, l.createElement($e, Object.assign({
        onChange: n,
        defaultValue: t
    }, o)), l.createElement(Oe, null));
}, De = {
    columns: [],
    data: [],
    title: "",
    keyField: "id",
    selectableRows: !1,
    selectableRowsHighlight: !1,
    selectableRowsNoSelectAll: !1,
    selectableRowSelected: null,
    selectableRowDisabled: null,
    selectableRowsComponent: "input",
    selectableRowsComponentProps: {},
    selectableRowsVisibleOnly: !1,
    selectableRowsSingle: !1,
    clearSelectedRows: !1,
    expandableRows: !1,
    expandableRowDisabled: null,
    expandableRowExpanded: null,
    expandOnRowClicked: !1,
    expandableRowsHideExpander: !1,
    expandOnRowDoubleClicked: !1,
    expandableInheritConditionalStyles: !1,
    expandableRowsComponent: function() {
        return r.default.createElement("div", null, "To add an expander pass in a component instance via ", r.default.createElement("strong", null, "expandableRowsComponent"), ". You can then access props.data from this component.");
    },
    expandableIcon: {
        collapsed: r.default.createElement(()=>r.default.createElement("svg", {
                fill: "currentColor",
                height: "24",
                viewBox: "0 0 24 24",
                width: "24",
                xmlns: "http://www.w3.org/2000/svg"
            }, r.default.createElement("path", {
                d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
            }), r.default.createElement("path", {
                d: "M0-.25h24v24H0z",
                fill: "none"
            })), null),
        expanded: r.default.createElement(()=>r.default.createElement("svg", {
                fill: "currentColor",
                height: "24",
                viewBox: "0 0 24 24",
                width: "24",
                xmlns: "http://www.w3.org/2000/svg"
            }, r.default.createElement("path", {
                d: "M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"
            }), r.default.createElement("path", {
                d: "M0-.75h24v24H0z",
                fill: "none"
            })), null)
    },
    expandableRowsComponentProps: {},
    progressPending: !1,
    progressComponent: r.default.createElement("div", {
        style: {
            fontSize: "24px",
            fontWeight: 700,
            padding: "24px"
        }
    }, "Loading..."),
    persistTableHead: !1,
    sortIcon: null,
    sortFunction: null,
    sortServer: !1,
    striped: !1,
    highlightOnHover: !1,
    pointerOnHover: !1,
    noContextMenu: !1,
    contextMessage: {
        singular: "item",
        plural: "items",
        message: "selected"
    },
    actions: null,
    contextActions: null,
    contextComponent: null,
    defaultSortFieldId: null,
    defaultSortAsc: !0,
    responsive: !0,
    noDataComponent: r.default.createElement("div", {
        style: {
            padding: "24px"
        }
    }, "There are no records to display"),
    disabled: !1,
    noTableHead: !1,
    noHeader: !1,
    subHeader: !1,
    subHeaderAlign: exports.Alignment.RIGHT,
    subHeaderWrap: !0,
    subHeaderComponent: null,
    fixedHeader: !1,
    fixedHeaderScrollHeight: "100vh",
    pagination: !1,
    paginationServer: !1,
    paginationServerOptions: {
        persistSelectedOnSort: !1,
        persistSelectedOnPageChange: !1
    },
    paginationDefaultPage: 1,
    paginationResetDefaultPage: !1,
    paginationTotalRows: 0,
    paginationPerPage: 10,
    paginationRowsPerPageOptions: [
        10,
        15,
        20,
        25,
        30
    ],
    paginationComponent: null,
    paginationComponentOptions: {},
    paginationIconFirstPage: r.default.createElement(()=>r.default.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            "aria-hidden": "true",
            role: "presentation"
        }, r.default.createElement("path", {
            d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"
        }), r.default.createElement("path", {
            fill: "none",
            d: "M24 24H0V0h24v24z"
        })), null),
    paginationIconLastPage: r.default.createElement(()=>r.default.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            "aria-hidden": "true",
            role: "presentation"
        }, r.default.createElement("path", {
            d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"
        }), r.default.createElement("path", {
            fill: "none",
            d: "M0 0h24v24H0V0z"
        })), null),
    paginationIconNext: r.default.createElement(()=>r.default.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            "aria-hidden": "true",
            role: "presentation"
        }, r.default.createElement("path", {
            d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
        }), r.default.createElement("path", {
            d: "M0 0h24v24H0z",
            fill: "none"
        })), null),
    paginationIconPrevious: r.default.createElement(()=>r.default.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            "aria-hidden": "true",
            role: "presentation"
        }, r.default.createElement("path", {
            d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
        }), r.default.createElement("path", {
            d: "M0 0h24v24H0z",
            fill: "none"
        })), null),
    dense: !1,
    conditionalRowStyles: [],
    theme: "default",
    customStyles: {},
    direction: exports.Direction.AUTO,
    onChangePage: b,
    onChangeRowsPerPage: b,
    onRowClicked: b,
    onRowDoubleClicked: b,
    onRowMouseEnter: b,
    onRowMouseLeave: b,
    onRowExpandToggled: b,
    onSelectedRowsChange: b,
    onSort: b,
    onColumnOrderChange: b
}, He = {
    rowsPerPageText: "Rows per page:",
    rangeSeparatorText: "of",
    noRowsPerPage: !1,
    selectAllRowsItem: !1,
    selectAllRowsItemText: "All"
}, je = i.default.nav`
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-end;
	align-items: center;
	box-sizing: border-box;
	padding-right: 8px;
	padding-left: 8px;
	width: 100%;
	${({ theme: e })=>e.pagination.style};
`, Fe = i.default.button`
	position: relative;
	display: block;
	user-select: none;
	border: none;
	${({ theme: e })=>e.pagination.pageButtonsStyle};
	${({ $isRTL: e })=>e && "transform: scale(-1, -1)"};
`, Te = i.default.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${E`
    width: 100%;
    justify-content: space-around;
  `};
`, Ie = i.default.span`
	flex-shrink: 1;
	user-select: none;
`, Me = i.default(Ie)`
	margin: 0 24px;
`, Ae = i.default(Ie)`
	margin: 0 4px;
`;
var Le = l.memo(function({ rowsPerPage: e, rowCount: t, currentPage: n, direction: o = De.direction, paginationRowsPerPageOptions: a = De.paginationRowsPerPageOptions, paginationIconLastPage: r = De.paginationIconLastPage, paginationIconFirstPage: i = De.paginationIconFirstPage, paginationIconNext: s = De.paginationIconNext, paginationIconPrevious: d = De.paginationIconPrevious, paginationComponentOptions: c = De.paginationComponentOptions, onChangeRowsPerPage: g = De.onChangeRowsPerPage, onChangePage: p = De.onChangePage }) {
    const b = (()=>{
        const e = "object" == typeof window;
        function t() {
            return {
                width: e ? window.innerWidth : void 0,
                height: e ? window.innerHeight : void 0
            };
        }
        const [n, o] = l.useState(t);
        return l.useEffect({
            "Le.b.useEffect": ()=>{
                if (!e) return ({
                    "Le.b.useEffect": ()=>null
                })["Le.b.useEffect"];
                function n() {
                    o(t());
                }
                return window.addEventListener("resize", n), ({
                    "Le.b.useEffect": ()=>window.removeEventListener("resize", n)
                })["Le.b.useEffect"];
            }
        }["Le.b.useEffect"], []), n;
    })(), m = ie(o), f = b.width && b.width > 599, h = u(t, e), w = n * e, x = w - e + 1, C = 1 === n, y = n === h, v = Object.assign(Object.assign({}, He), c), R = n === h ? `${x}-${t} ${v.rangeSeparatorText} ${t}` : `${x}-${w} ${v.rangeSeparatorText} ${t}`, S = l.useCallback({
        "Le.useCallback[S]": ()=>p(n - 1)
    }["Le.useCallback[S]"], [
        n,
        p
    ]), E = l.useCallback({
        "Le.useCallback[E]": ()=>p(n + 1)
    }["Le.useCallback[E]"], [
        n,
        p
    ]), O = l.useCallback({
        "Le.useCallback[O]": ()=>p(1)
    }["Le.useCallback[O]"], [
        p
    ]), $ = l.useCallback({
        "Le.useCallback[$]": ()=>p(u(t, e))
    }["Le.useCallback[$]"], [
        p,
        t,
        e
    ]), P = l.useCallback({
        "Le.useCallback[P]": (e)=>g(Number(e.target.value), n)
    }["Le.useCallback[P]"], [
        n,
        g
    ]), k = a.map((e)=>l.createElement("option", {
            key: e,
            value: e
        }, e));
    v.selectAllRowsItem && k.push(l.createElement("option", {
        key: -1,
        value: t
    }, v.selectAllRowsItemText));
    const D = l.createElement(ke, {
        onChange: P,
        defaultValue: e,
        "aria-label": v.rowsPerPageText
    }, k);
    return l.createElement(je, {
        className: "rdt_Pagination"
    }, !v.noRowsPerPage && f && l.createElement(l.Fragment, null, l.createElement(Ae, null, v.rowsPerPageText), D), f && l.createElement(Me, null, R), l.createElement(Te, null, l.createElement(Fe, {
        id: "pagination-first-page",
        type: "button",
        "aria-label": "First Page",
        "aria-disabled": C,
        onClick: O,
        disabled: C,
        $isRTL: m
    }, i), l.createElement(Fe, {
        id: "pagination-previous-page",
        type: "button",
        "aria-label": "Previous Page",
        "aria-disabled": C,
        onClick: S,
        disabled: C,
        $isRTL: m
    }, d), !v.noRowsPerPage && !f && D, l.createElement(Fe, {
        id: "pagination-next-page",
        type: "button",
        "aria-label": "Next Page",
        "aria-disabled": y,
        onClick: E,
        disabled: y,
        $isRTL: m
    }, s), l.createElement(Fe, {
        id: "pagination-last-page",
        type: "button",
        "aria-label": "Last Page",
        "aria-disabled": y,
        onClick: $,
        disabled: y,
        $isRTL: m
    }, r)));
});
const _e = (e, t)=>{
    const n = l.useRef(!0);
    l.useEffect({
        "_e.useEffect": ()=>{
            n.current ? n.current = !1 : e();
        }
    }["_e.useEffect"], t);
};
function ze(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ne = function(e) {
    return function(e) {
        return !!e && "object" == typeof e;
    }(e) && !function(e) {
        var t = Object.prototype.toString.call(e);
        return "[object RegExp]" === t || "[object Date]" === t || function(e) {
            return e.$$typeof === We;
        }(e);
    }(e);
};
var We = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
function Be(e, t) {
    return !1 !== t.clone && t.isMergeableObject(e) ? Ye((n = e, Array.isArray(n) ? [] : {}), e, t) : e;
    "TURBOPACK unreachable";
    var n;
}
function Ge(e, t, n) {
    return e.concat(t).map(function(e) {
        return Be(e, n);
    });
}
function Ve(e) {
    return Object.keys(e).concat(function(e) {
        return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
            return Object.propertyIsEnumerable.call(e, t);
        }) : [];
    }(e));
}
function Ue(e, t) {
    try {
        return t in e;
    } catch (e) {
        return !1;
    }
}
function qe(e, t, n) {
    var o = {};
    return n.isMergeableObject(e) && Ve(e).forEach(function(t) {
        o[t] = Be(e[t], n);
    }), Ve(t).forEach(function(a) {
        (function(e, t) {
            return Ue(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
        })(e, a) || (Ue(e, a) && n.isMergeableObject(t[a]) ? o[a] = (function(e, t) {
            if (!t.customMerge) return Ye;
            var n = t.customMerge(e);
            return "function" == typeof n ? n : Ye;
        })(a, n)(e[a], t[a], n) : o[a] = Be(t[a], n));
    }), o;
}
function Ye(e, t, n) {
    (n = n || {}).arrayMerge = n.arrayMerge || Ge, n.isMergeableObject = n.isMergeableObject || Ne, n.cloneUnlessOtherwiseSpecified = Be;
    var o = Array.isArray(t);
    return o === Array.isArray(e) ? o ? n.arrayMerge(e, t, n) : qe(e, t, n) : Be(t, n);
}
Ye.all = function(e, t) {
    if (!Array.isArray(e)) throw new Error("first argument should be an array");
    return e.reduce(function(e, n) {
        return Ye(e, n, t);
    }, {});
};
var Ke = ze(Ye);
const Je = {
    text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.54)",
        disabled: "rgba(0, 0, 0, 0.38)"
    },
    background: {
        default: "#FFFFFF"
    },
    context: {
        background: "#e3f2fd",
        text: "rgba(0, 0, 0, 0.87)"
    },
    divider: {
        default: "rgba(0,0,0,.12)"
    },
    button: {
        default: "rgba(0,0,0,.54)",
        focus: "rgba(0,0,0,.12)",
        hover: "rgba(0,0,0,.12)",
        disabled: "rgba(0, 0, 0, .18)"
    },
    selected: {
        default: "#e3f2fd",
        text: "rgba(0, 0, 0, 0.87)"
    },
    highlightOnHover: {
        default: "#EEEEEE",
        text: "rgba(0, 0, 0, 0.87)"
    },
    striped: {
        default: "#FAFAFA",
        text: "rgba(0, 0, 0, 0.87)"
    }
}, Qe = {
    default: Je,
    light: Je,
    dark: {
        text: {
            primary: "#FFFFFF",
            secondary: "rgba(255, 255, 255, 0.7)",
            disabled: "rgba(0,0,0,.12)"
        },
        background: {
            default: "#424242"
        },
        context: {
            background: "#E91E63",
            text: "#FFFFFF"
        },
        divider: {
            default: "rgba(81, 81, 81, 1)"
        },
        button: {
            default: "#FFFFFF",
            focus: "rgba(255, 255, 255, .54)",
            hover: "rgba(255, 255, 255, .12)",
            disabled: "rgba(255, 255, 255, .18)"
        },
        selected: {
            default: "rgba(0, 0, 0, .7)",
            text: "#FFFFFF"
        },
        highlightOnHover: {
            default: "rgba(0, 0, 0, .7)",
            text: "#FFFFFF"
        },
        striped: {
            default: "rgba(0, 0, 0, .87)",
            text: "#FFFFFF"
        }
    }
};
function Xe(e, t, n, o) {
    const [r, i] = l.useState({
        "Xe.useState": ()=>g(e)
    }["Xe.useState"]), [s, d] = l.useState(""), c = l.useRef("");
    _e(()=>{
        i(g(e));
    }, [
        e
    ]);
    const u = l.useCallback({
        "Xe.useCallback[u]": (e)=>{
            var t, n, o;
            const { attributes: a } = e.target, l = null === (t = a.getNamedItem("data-column-id")) || void 0 === t ? void 0 : t.value;
            l && (c.current = (null === (o = null === (n = r[h(r, l)]) || void 0 === n ? void 0 : n.id) || void 0 === o ? void 0 : o.toString()) || "", d(c.current));
        }
    }["Xe.useCallback[u]"], [
        r
    ]), p = l.useCallback({
        "Xe.useCallback[p]": (e)=>{
            var n;
            const { attributes: o } = e.target, a = null === (n = o.getNamedItem("data-column-id")) || void 0 === n ? void 0 : n.value;
            if (a && c.current && a !== c.current) {
                const e = h(r, c.current), n = h(r, a), o = [
                    ...r
                ];
                o[e] = r[n], o[n] = r[e], i(o), t(o);
            }
        }
    }["Xe.useCallback[p]"], [
        t,
        r
    ]), b = l.useCallback({
        "Xe.useCallback[b]": (e)=>{
            e.preventDefault();
        }
    }["Xe.useCallback[b]"], []), m = l.useCallback({
        "Xe.useCallback[m]": (e)=>{
            e.preventDefault();
        }
    }["Xe.useCallback[m]"], []), f = l.useCallback({
        "Xe.useCallback[f]": (e)=>{
            e.preventDefault(), c.current = "", d("");
        }
    }["Xe.useCallback[f]"], []), w = function(e = !1) {
        return e ? a.ASC : a.DESC;
    }(o), x = l.useMemo({
        "Xe.useMemo[x]": ()=>r[h(r, null == n ? void 0 : n.toString())] || {}
    }["Xe.useMemo[x]"], [
        n,
        r
    ]);
    return {
        tableColumns: r,
        draggingColumnId: s,
        handleDragStart: u,
        handleDragEnter: p,
        handleDragOver: b,
        handleDragLeave: m,
        handleDragEnd: f,
        defaultSortDirection: w,
        defaultSortColumn: x
    };
}
var Ze = l.memo(function(e) {
    const { data: n = De.data, columns: o = De.columns, title: r = De.title, actions: i = De.actions, keyField: d = De.keyField, striped: c = De.striped, highlightOnHover: g = De.highlightOnHover, pointerOnHover: b = De.pointerOnHover, dense: m = De.dense, selectableRows: h = De.selectableRows, selectableRowsSingle: w = De.selectableRowsSingle, selectableRowsHighlight: C = De.selectableRowsHighlight, selectableRowsNoSelectAll: v = De.selectableRowsNoSelectAll, selectableRowsVisibleOnly: E = De.selectableRowsVisibleOnly, selectableRowSelected: O = De.selectableRowSelected, selectableRowDisabled: $ = De.selectableRowDisabled, selectableRowsComponent: P = De.selectableRowsComponent, selectableRowsComponentProps: D = De.selectableRowsComponentProps, onRowExpandToggled: H = De.onRowExpandToggled, onSelectedRowsChange: j = De.onSelectedRowsChange, expandableIcon: F = De.expandableIcon, onChangeRowsPerPage: T = De.onChangeRowsPerPage, onChangePage: I = De.onChangePage, paginationServer: M = De.paginationServer, paginationServerOptions: A = De.paginationServerOptions, paginationTotalRows: L = De.paginationTotalRows, paginationDefaultPage: _ = De.paginationDefaultPage, paginationResetDefaultPage: z = De.paginationResetDefaultPage, paginationPerPage: N = De.paginationPerPage, paginationRowsPerPageOptions: W = De.paginationRowsPerPageOptions, paginationIconLastPage: B = De.paginationIconLastPage, paginationIconFirstPage: G = De.paginationIconFirstPage, paginationIconNext: V = De.paginationIconNext, paginationIconPrevious: U = De.paginationIconPrevious, paginationComponent: q = De.paginationComponent, paginationComponentOptions: Y = De.paginationComponentOptions, responsive: K = De.responsive, progressPending: J = De.progressPending, progressComponent: X = De.progressComponent, persistTableHead: Z = De.persistTableHead, noDataComponent: ee = De.noDataComponent, disabled: te = De.disabled, noTableHead: ne = De.noTableHead, noHeader: oe = De.noHeader, fixedHeader: le = De.fixedHeader, fixedHeaderScrollHeight: ie = De.fixedHeaderScrollHeight, pagination: se = De.pagination, subHeader: de = De.subHeader, subHeaderAlign: ce = De.subHeaderAlign, subHeaderWrap: ge = De.subHeaderWrap, subHeaderComponent: ue = De.subHeaderComponent, noContextMenu: pe = De.noContextMenu, contextMessage: be = De.contextMessage, contextActions: fe = De.contextActions, contextComponent: he = De.contextComponent, expandableRows: we = De.expandableRows, onRowClicked: Oe = De.onRowClicked, onRowDoubleClicked: $e = De.onRowDoubleClicked, onRowMouseEnter: Pe = De.onRowMouseEnter, onRowMouseLeave: ke = De.onRowMouseLeave, sortIcon: He = De.sortIcon, onSort: je = De.onSort, sortFunction: Fe = De.sortFunction, sortServer: Te = De.sortServer, expandableRowsComponent: Ie = De.expandableRowsComponent, expandableRowsComponentProps: Me = De.expandableRowsComponentProps, expandableRowDisabled: Ae = De.expandableRowDisabled, expandableRowsHideExpander: ze = De.expandableRowsHideExpander, expandOnRowClicked: Ne = De.expandOnRowClicked, expandOnRowDoubleClicked: We = De.expandOnRowDoubleClicked, expandableRowExpanded: Be = De.expandableRowExpanded, expandableInheritConditionalStyles: Ge = De.expandableInheritConditionalStyles, defaultSortFieldId: Ve = De.defaultSortFieldId, defaultSortAsc: Ue = De.defaultSortAsc, clearSelectedRows: qe = De.clearSelectedRows, conditionalRowStyles: Ye = De.conditionalRowStyles, theme: Je = De.theme, customStyles: Ze = De.customStyles, direction: et = De.direction, onColumnOrderChange: tt = De.onColumnOrderChange, className: nt, ariaLabel: ot } = e, { tableColumns: at, draggingColumnId: lt, handleDragStart: rt, handleDragEnter: it, handleDragOver: st, handleDragLeave: dt, handleDragEnd: ct, defaultSortDirection: gt, defaultSortColumn: ut } = Xe(o, tt, Ve, Ue), [{ rowsPerPage: pt, currentPage: bt, selectedRows: mt, allSelected: ft, selectedCount: ht, selectedColumn: wt, sortDirection: xt, toggleOnSelectedRowsChange: Ct }, yt] = l.useReducer(x, {
        allSelected: !1,
        selectedCount: 0,
        selectedRows: [],
        selectedColumn: ut,
        toggleOnSelectedRowsChange: !1,
        sortDirection: gt,
        currentPage: _,
        rowsPerPage: N,
        selectedRowsFlag: !1,
        contextMessage: De.contextMessage
    }), { persistSelectedOnSort: vt = !1, persistSelectedOnPageChange: Rt = !1 } = A, St = !(!M || !Rt && !vt), Et = se && !J && n.length > 0, Ot = q || Le, $t = l.useMemo({
        "Ze.useMemo[$t]": ()=>({
                "Ze.useMemo[$t]": (e = {}, t = "default", n = "default")=>{
                    const o = Qe[t] ? t : n;
                    return Ke({
                        table: {
                            style: {
                                color: (a = Qe[o]).text.primary,
                                backgroundColor: a.background.default
                            }
                        },
                        tableWrapper: {
                            style: {
                                display: "table"
                            }
                        },
                        responsiveWrapper: {
                            style: {}
                        },
                        header: {
                            style: {
                                fontSize: "22px",
                                color: a.text.primary,
                                backgroundColor: a.background.default,
                                minHeight: "56px",
                                paddingLeft: "16px",
                                paddingRight: "8px"
                            }
                        },
                        subHeader: {
                            style: {
                                backgroundColor: a.background.default,
                                minHeight: "52px"
                            }
                        },
                        head: {
                            style: {
                                color: a.text.primary,
                                fontSize: "12px",
                                fontWeight: 500
                            }
                        },
                        headRow: {
                            style: {
                                backgroundColor: a.background.default,
                                minHeight: "52px",
                                borderBottomWidth: "1px",
                                borderBottomColor: a.divider.default,
                                borderBottomStyle: "solid"
                            },
                            denseStyle: {
                                minHeight: "32px"
                            }
                        },
                        headCells: {
                            style: {
                                paddingLeft: "16px",
                                paddingRight: "16px"
                            },
                            draggingStyle: {
                                cursor: "move"
                            }
                        },
                        contextMenu: {
                            style: {
                                backgroundColor: a.context.background,
                                fontSize: "18px",
                                fontWeight: 400,
                                color: a.context.text,
                                paddingLeft: "16px",
                                paddingRight: "8px",
                                transform: "translate3d(0, -100%, 0)",
                                transitionDuration: "125ms",
                                transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
                                willChange: "transform"
                            },
                            activeStyle: {
                                transform: "translate3d(0, 0, 0)"
                            }
                        },
                        cells: {
                            style: {
                                paddingLeft: "16px",
                                paddingRight: "16px",
                                wordBreak: "break-word"
                            },
                            draggingStyle: {}
                        },
                        rows: {
                            style: {
                                fontSize: "13px",
                                fontWeight: 400,
                                color: a.text.primary,
                                backgroundColor: a.background.default,
                                minHeight: "48px",
                                "&:not(:last-of-type)": {
                                    borderBottomStyle: "solid",
                                    borderBottomWidth: "1px",
                                    borderBottomColor: a.divider.default
                                }
                            },
                            denseStyle: {
                                minHeight: "32px"
                            },
                            selectedHighlightStyle: {
                                "&:nth-of-type(n)": {
                                    color: a.selected.text,
                                    backgroundColor: a.selected.default,
                                    borderBottomColor: a.background.default
                                }
                            },
                            highlightOnHoverStyle: {
                                color: a.highlightOnHover.text,
                                backgroundColor: a.highlightOnHover.default,
                                transitionDuration: "0.15s",
                                transitionProperty: "background-color",
                                borderBottomColor: a.background.default,
                                outlineStyle: "solid",
                                outlineWidth: "1px",
                                outlineColor: a.background.default
                            },
                            stripedStyle: {
                                color: a.striped.text,
                                backgroundColor: a.striped.default
                            }
                        },
                        expanderRow: {
                            style: {
                                color: a.text.primary,
                                backgroundColor: a.background.default
                            }
                        },
                        expanderCell: {
                            style: {
                                flex: "0 0 48px"
                            }
                        },
                        expanderButton: {
                            style: {
                                color: a.button.default,
                                fill: a.button.default,
                                backgroundColor: "transparent",
                                borderRadius: "2px",
                                transition: "0.25s",
                                height: "100%",
                                width: "100%",
                                "&:hover:enabled": {
                                    cursor: "pointer"
                                },
                                "&:disabled": {
                                    color: a.button.disabled
                                },
                                "&:hover:not(:disabled)": {
                                    cursor: "pointer",
                                    backgroundColor: a.button.hover
                                },
                                "&:focus": {
                                    outline: "none",
                                    backgroundColor: a.button.focus
                                },
                                svg: {
                                    margin: "auto"
                                }
                            }
                        },
                        pagination: {
                            style: {
                                color: a.text.secondary,
                                fontSize: "13px",
                                minHeight: "56px",
                                backgroundColor: a.background.default,
                                borderTopStyle: "solid",
                                borderTopWidth: "1px",
                                borderTopColor: a.divider.default
                            },
                            pageButtonsStyle: {
                                borderRadius: "50%",
                                height: "40px",
                                width: "40px",
                                padding: "8px",
                                margin: "px",
                                cursor: "pointer",
                                transition: "0.4s",
                                color: a.button.default,
                                fill: a.button.default,
                                backgroundColor: "transparent",
                                "&:disabled": {
                                    cursor: "unset",
                                    color: a.button.disabled,
                                    fill: a.button.disabled
                                },
                                "&:hover:not(:disabled)": {
                                    backgroundColor: a.button.hover
                                },
                                "&:focus": {
                                    outline: "none",
                                    backgroundColor: a.button.focus
                                }
                            }
                        },
                        noData: {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: a.text.primary,
                                backgroundColor: a.background.default
                            }
                        },
                        progress: {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: a.text.primary,
                                backgroundColor: a.background.default
                            }
                        }
                    }, e);
                    "TURBOPACK unreachable";
                    var a;
                }
            })["Ze.useMemo[$t]"](Ze, Je)
    }["Ze.useMemo[$t]"], [
        Ze,
        Je
    ]), Pt = l.useMemo({
        "Ze.useMemo[Pt]": ()=>Object.assign({}, "auto" !== et && {
                dir: et
            })
    }["Ze.useMemo[Pt]"], [
        et
    ]), kt = l.useMemo({
        "Ze.useMemo[kt]": ()=>{
            if (Te) return n;
            if ((null == wt ? void 0 : wt.sortFunction) && "function" == typeof wt.sortFunction) {
                const e = wt.sortFunction, t = xt === a.ASC ? e : ({
                    "Ze.useMemo[kt]": (t, n)=>-1 * e(t, n)
                })["Ze.useMemo[kt]"];
                return [
                    ...n
                ].sort(t);
            }
            return ({
                "Ze.useMemo[kt]": function(e, t, n, o) {
                    return t ? o && "function" == typeof o ? o(e.slice(0), t, n) : e.slice(0).sort({
                        "Ze.useMemo[kt]": (e, o)=>{
                            const a = t(e), l = t(o);
                            if ("asc" === n) {
                                if (a < l) return -1;
                                if (a > l) return 1;
                            }
                            if ("desc" === n) {
                                if (a > l) return -1;
                                if (a < l) return 1;
                            }
                            return 0;
                        }
                    }["Ze.useMemo[kt]"]) : e;
                }
            })["Ze.useMemo[kt]"](n, null == wt ? void 0 : wt.selector, xt, Fe);
        }
    }["Ze.useMemo[kt]"], [
        Te,
        wt,
        xt,
        n,
        Fe
    ]), Dt = l.useMemo({
        "Ze.useMemo[Dt]": ()=>{
            if (se && !M) {
                const e = bt * pt, t = e - pt;
                return kt.slice(t, e);
            }
            return kt;
        }
    }["Ze.useMemo[Dt]"], [
        bt,
        se,
        M,
        pt,
        kt
    ]), Ht = l.useCallback({
        "Ze.useCallback[Ht]": (e)=>{
            yt(e);
        }
    }["Ze.useCallback[Ht]"], []), jt = l.useCallback({
        "Ze.useCallback[jt]": (e)=>{
            yt(e);
        }
    }["Ze.useCallback[jt]"], []), Ft = l.useCallback({
        "Ze.useCallback[Ft]": (e)=>{
            yt(e);
        }
    }["Ze.useCallback[Ft]"], []), Tt = l.useCallback({
        "Ze.useCallback[Tt]": (e, t)=>Oe(e, t)
    }["Ze.useCallback[Tt]"], [
        Oe
    ]), It = l.useCallback({
        "Ze.useCallback[It]": (e, t)=>$e(e, t)
    }["Ze.useCallback[It]"], [
        $e
    ]), Mt = l.useCallback({
        "Ze.useCallback[Mt]": (e, t)=>Pe(e, t)
    }["Ze.useCallback[Mt]"], [
        Pe
    ]), At = l.useCallback({
        "Ze.useCallback[At]": (e, t)=>ke(e, t)
    }["Ze.useCallback[At]"], [
        ke
    ]), Lt = l.useCallback({
        "Ze.useCallback[Lt]": (e)=>yt({
                type: "CHANGE_PAGE",
                page: e,
                paginationServer: M,
                visibleOnly: E,
                persistSelectedOnPageChange: Rt
            })
    }["Ze.useCallback[Lt]"], [
        M,
        Rt,
        E
    ]), _t = l.useCallback({
        "Ze.useCallback[_t]": (e)=>{
            const t = u(L || Dt.length, e), n = p(bt, t);
            M || Lt(n), yt({
                type: "CHANGE_ROWS_PER_PAGE",
                page: n,
                rowsPerPage: e
            });
        }
    }["Ze.useCallback[_t]"], [
        bt,
        Lt,
        M,
        L,
        Dt.length
    ]);
    if (se && !M && kt.length > 0 && 0 === Dt.length) {
        const e = u(kt.length, pt), t = p(bt, e);
        Lt(t);
    }
    _e(()=>{
        j({
            allSelected: ft,
            selectedCount: ht,
            selectedRows: mt.slice(0)
        });
    }, [
        Ct
    ]), _e(()=>{
        je(wt, xt, kt.slice(0));
    }, [
        wt,
        xt
    ]), _e(()=>{
        I(bt, L || kt.length);
    }, [
        bt
    ]), _e(()=>{
        T(pt, bt);
    }, [
        pt
    ]), _e(()=>{
        Lt(_);
    }, [
        _,
        z
    ]), _e(()=>{
        if (se && M && L > 0) {
            const e = u(L, pt), t = p(bt, e);
            bt !== t && Lt(t);
        }
    }, [
        L
    ]), l.useEffect({
        "Ze.useEffect": ()=>{
            yt({
                type: "CLEAR_SELECTED_ROWS",
                selectedRowsFlag: qe
            });
        }
    }["Ze.useEffect"], [
        w,
        qe
    ]), l.useEffect({
        "Ze.useEffect": ()=>{
            if (!O) return;
            const e = kt.filter({
                "Ze.useEffect.e": (e)=>O(e)
            }["Ze.useEffect.e"]), t = w ? e.slice(0, 1) : e;
            yt({
                type: "SELECT_MULTIPLE_ROWS",
                keyField: d,
                selectedRows: t,
                totalRows: kt.length,
                mergeSelections: St
            });
        }
    }["Ze.useEffect"], [
        n,
        O
    ]);
    const zt = E ? Dt : kt, Nt = Rt || w || v;
    return l.createElement(t.ThemeProvider, {
        theme: $t
    }, !oe && (!!r || !!i) && l.createElement(me, {
        title: r,
        actions: i,
        showMenu: !pe,
        selectedCount: ht,
        direction: et,
        contextActions: fe,
        contextComponent: he,
        contextMessage: be
    }), de && l.createElement(xe, {
        align: ce,
        wrapContent: ge
    }, ue), l.createElement(ye, Object.assign({
        $responsive: K,
        $fixedHeader: le,
        $fixedHeaderScrollHeight: ie,
        className: nt
    }, Pt), l.createElement(Re, null, J && !Z && l.createElement(ve, null, X), l.createElement(y, Object.assign({
        disabled: te,
        className: "rdt_Table",
        role: "table"
    }, ot && {
        "aria-label": ot
    }), !ne && (!!Z || kt.length > 0 && !J) && l.createElement(R, {
        className: "rdt_TableHead",
        role: "rowgroup",
        $fixedHeader: le
    }, l.createElement(S, {
        className: "rdt_TableHeadRow",
        role: "row",
        $dense: m
    }, h && (Nt ? l.createElement(k, {
        style: {
            flex: "0 0 48px"
        }
    }) : l.createElement(re, {
        allSelected: ft,
        selectedRows: mt,
        selectableRowsComponent: P,
        selectableRowsComponentProps: D,
        selectableRowDisabled: $,
        rowData: zt,
        keyField: d,
        mergeSelections: St,
        onSelectAllRows: jt
    })), we && !ze && l.createElement(Se, null), at.map((e)=>l.createElement(ae, {
            key: e.id,
            column: e,
            selectedColumn: wt,
            disabled: J || 0 === kt.length,
            pagination: se,
            paginationServer: M,
            persistSelectedOnSort: vt,
            selectableRowsVisibleOnly: E,
            sortDirection: xt,
            sortIcon: He,
            sortServer: Te,
            onSort: Ht,
            onDragStart: rt,
            onDragOver: st,
            onDragEnd: ct,
            onDragEnter: it,
            onDragLeave: dt,
            draggingColumnId: lt
        })))), !kt.length && !J && l.createElement(Ee, null, ee), J && Z && l.createElement(ve, null, X), !J && kt.length > 0 && l.createElement(Ce, {
        className: "rdt_TableBody",
        role: "rowgroup"
    }, Dt.map((e, t)=>{
        const n = s(e, d), o = function(e = "") {
            return "number" != typeof e && (!e || 0 === e.length);
        }(n) ? t : n, a = f(e, mt, d), r = !!(we && Be && Be(e)), i = !!(we && Ae && Ae(e));
        return l.createElement(Q, {
            id: o,
            key: o,
            keyField: d,
            "data-row-id": o,
            columns: at,
            row: e,
            rowCount: kt.length,
            rowIndex: t,
            selectableRows: h,
            expandableRows: we,
            expandableIcon: F,
            highlightOnHover: g,
            pointerOnHover: b,
            dense: m,
            expandOnRowClicked: Ne,
            expandOnRowDoubleClicked: We,
            expandableRowsComponent: Ie,
            expandableRowsComponentProps: Me,
            expandableRowsHideExpander: ze,
            defaultExpanderDisabled: i,
            defaultExpanded: r,
            expandableInheritConditionalStyles: Ge,
            conditionalRowStyles: Ye,
            selected: a,
            selectableRowsHighlight: C,
            selectableRowsComponent: P,
            selectableRowsComponentProps: D,
            selectableRowDisabled: $,
            selectableRowsSingle: w,
            striped: c,
            onRowExpandToggled: H,
            onRowClicked: Tt,
            onRowDoubleClicked: It,
            onRowMouseEnter: Mt,
            onRowMouseLeave: At,
            onSelectedRow: Ft,
            draggingColumnId: lt,
            onDragStart: rt,
            onDragOver: st,
            onDragEnd: ct,
            onDragEnter: it,
            onDragLeave: dt
        });
    }))))), Et && l.createElement("div", null, l.createElement(Ot, {
        onChangePage: Lt,
        onChangeRowsPerPage: _t,
        rowCount: L || kt.length,
        currentPage: bt,
        rowsPerPage: pt,
        direction: et,
        paginationRowsPerPageOptions: W,
        paginationIconLastPage: B,
        paginationIconFirstPage: G,
        paginationIconNext: V,
        paginationIconPrevious: U,
        paginationComponentOptions: Y
    })));
});
exports.STOP_PROP_TAG = G, exports.createTheme = function(e = "default", t, n = "default") {
    return Qe[e] || (Qe[e] = Ke(Qe[n], t || {})), Qe[e] = Ke(Qe[e], t || {}), Qe[e];
}, exports.default = Ze, exports.defaultThemes = Qe; //# sourceMappingURL=index.cjs.js.map
}}),
}]);

//# sourceMappingURL=_ca8ae567._.js.map