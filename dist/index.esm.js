import require$$0, { createContext, useState, useRef, useEffect, useCallback, useContext } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
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
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_PORTAL_TYPE:
	            return "Portal";
	          case REACT_CONTEXT_TYPE:
	            return (type.displayName || "Context") + ".Provider";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
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
	        JSCompiler_inline_result = true;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function getTaskName(type) {
	      if (type === REACT_FRAGMENT_TYPE) return "<>";
	      if (
	        "object" === typeof type &&
	        null !== type &&
	        type.$$typeof === REACT_LAZY_TYPE
	      )
	        return "<...>";
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
	        if (getter && getter.isReactWarning) return false;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = true),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = true;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: true
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = true),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(
	      type,
	      key,
	      self,
	      source,
	      owner,
	      props,
	      debugStack,
	      debugTask
	    ) {
	      self = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== self ? self : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: false,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: false, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: null
	      });
	      Object.defineProperty(type, "_debugStack", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugStack
	      });
	      Object.defineProperty(type, "_debugTask", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugTask
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      source,
	      self,
	      debugStack,
	      debugTask
	    ) {
	      var children = config.children;
	      if (void 0 !== children)
	        if (isStaticChildren)
	          if (isArrayImpl(children)) {
	            for (
	              isStaticChildren = 0;
	              isStaticChildren < children.length;
	              isStaticChildren++
	            )
	              validateChildKeys(children[isStaticChildren]);
	            Object.freeze && Object.freeze(children);
	          } else
	            console.error(
	              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	            );
	        else validateChildKeys(children);
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = true));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(
	        type,
	        children,
	        self,
	        source,
	        getOwner(),
	        maybeKey,
	        debugStack,
	        debugTask
	      );
	    }
	    function validateChildKeys(node) {
	      "object" === typeof node &&
	        null !== node &&
	        node.$$typeof === REACT_ELEMENT_TYPE &&
	        node._store &&
	        (node._store.validated = 1);
	    }
	    var React = require$$0,
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
	      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      isArrayImpl = Array.isArray,
	      createTask = console.createTask
	        ? console.createTask
	        : function () {
	            return null;
	          };
	    React = {
	      "react-stack-bottom-frame": function (callStackForError) {
	        return callStackForError();
	      }
	    };
	    var specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(
	      React,
	      UnknownOwner
	    )();
	    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
	    var didWarnAboutKeySpread = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        false,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        true,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	  })();
	return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}

var jsxRuntimeExports = jsxRuntime.exports;

var IDLE_TIMEOUT = 30000; // 30 seconds
var CHECK_INTERVAL = 1000; // 1 second
var TrackingUtils = /** @class */ (function () {
    function TrackingUtils() {
    }
    TrackingUtils.setCookie = function (name, value, days, domain) {
        if (days === void 0) { days = 365; }
        var expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        // Build cookie string conditionally based on domain availability and validity
        var cookieString = "".concat(name, "=").concat(value, "; expires=").concat(expires, "; path=/");
        // Only add domain if it's provided and valid
        if (domain && domain.trim() !== "") {
            // Handle localhost and IP addresses
            if (window.location.hostname === "localhost" ||
                window.location.hostname === "127.0.0.1" ||
                /^\d+\.\d+\.\d+\.\d+$/.test(window.location.hostname)) {
                // For localhost/IP, don't set domain attribute
                console.warn("Domain attribute not set for localhost/IP address");
            }
            else {
                // For regular domains, ensure domain starts with a dot for subdomain support
                var domainValue = domain.startsWith(".") ? domain : ".".concat(domain);
                cookieString += "; domain=".concat(domainValue);
            }
        }
        // Add SameSite attribute for better security and compatibility
        cookieString += "; SameSite=Lax";
        document.cookie = cookieString;
        return TrackingUtils.getCookie(name);
    };
    TrackingUtils.getCookie = function (name) {
        var _a;
        var value = "; ".concat(document.cookie);
        var parts = value.split("; ".concat(name, "="));
        if (parts.length === 2) {
            return (_a = parts.pop()) === null || _a === void 0 ? void 0 : _a.split(";").shift();
        }
        return undefined;
    };
    TrackingUtils.generateId = function () {
        return crypto.randomUUID();
    };
    TrackingUtils.isValidProtocol = function () {
        return (window.location.protocol === "http:" ||
            window.location.protocol === "https:");
    };
    TrackingUtils.isDisabled = function () {
        return localStorage.getItem("engageTrackDisabled") === "true";
    };
    return TrackingUtils;
}());
var ActivityTracker = /** @class */ (function () {
    function ActivityTracker(onIdle, onHidden) {
        var _this = this;
        this.intervalId = null;
        this.checkActivity = function () {
            if (document.hidden) {
                _this.stop();
                _this.onHidden(Date.now() - _this.startTime);
            }
            else {
                var currentTime = Date.now();
                if (currentTime - _this.lastActivityTime >= IDLE_TIMEOUT) {
                    _this.onIdle(currentTime - _this.startTime);
                    _this.stop();
                }
            }
        };
        this.startTime = Date.now();
        this.lastActivityTime = this.startTime;
        this.onIdle = onIdle;
        this.onHidden = onHidden;
        this.setupEventListeners();
        this.startTracking();
    }
    ActivityTracker.prototype.setupEventListeners = function () {
        var _this = this;
        // Activity tracking
        var updateActivity = function () {
            _this.lastActivityTime = Date.now();
        };
        document.addEventListener("mousemove", updateActivity);
        document.addEventListener("keydown", updateActivity);
        document.addEventListener("scroll", updateActivity);
        document.addEventListener("click", updateActivity);
        // Visibility change tracking
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                _this.stop();
                _this.onHidden(Date.now() - _this.startTime);
            }
            else {
                _this.reset();
                _this.startTracking();
            }
        });
        // Page unload tracking
        window.addEventListener("pagehide", function () {
            _this.stop();
        });
    };
    ActivityTracker.prototype.startTracking = function () {
        if (!this.intervalId) {
            this.intervalId = window.setInterval(this.checkActivity, CHECK_INTERVAL);
        }
    };
    ActivityTracker.prototype.stop = function () {
        if (this.intervalId) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    };
    ActivityTracker.prototype.reset = function () {
        this.startTime = Date.now();
        this.lastActivityTime = this.startTime;
    };
    ActivityTracker.prototype.destroy = function () {
        this.stop();
    };
    ActivityTracker.prototype.getTimeSpent = function () {
        return Date.now() - this.startTime;
    };
    return ActivityTracker;
}());

var TrackingContext = createContext(null);
function TrackerProvider(_a) {
    var _this = this;
    var children = _a.children, siteId = _a.siteId, domain = _a.domain, _b = _a.serverUrl, serverUrl = _b === void 0 ? "http://localhost:5000/api/track" : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.autoTrack, autoTrack = _d === void 0 ? true : _d;
    var _e = useState(false), isInitialized = _e[0], setIsInitialized = _e[1];
    var _f = useState(null), sessionId = _f[0], setSessionId = _f[1];
    var _g = useState(null), userId = _g[0], setUserId = _g[1];
    var activityTrackerRef = useRef(null);
    var startTimeRef = useRef(Date.now());
    var config = {
        siteId: siteId,
        domain: domain,
        serverUrl: serverUrl,
        disabled: disabled
    };
    // Initialize tracking
    useEffect(function () {
        if (disabled || TrackingUtils.isDisabled()) {
            console.warn("EngageTrack is disabled");
            return;
        }
        if (!siteId) {
            console.error("Site ID is required for EngageTrack");
            return;
        }
        if (!TrackingUtils.isValidProtocol()) {
            console.warn("EngageTrack SDK is only supported on HTTP or HTTPS protocols.");
            return;
        }
        // Initialize session and user IDs
        var existingSessionId = TrackingUtils.getCookie("session_id");
        var existingUserId = TrackingUtils.getCookie("user_id");
        var newSessionId = existingSessionId || TrackingUtils.setCookie("session_id", TrackingUtils.generateId(), 1 / 48, domain);
        var newUserId = existingUserId || TrackingUtils.setCookie("user_id", TrackingUtils.generateId(), 365, domain);
        setSessionId(newSessionId || null);
        setUserId(newUserId || null);
        setIsInitialized(true);
        console.log('EngageTrack initialized:', { userId: newUserId, sessionId: newSessionId });
    }, [siteId, domain, disabled]);
    // Send tracking data to server
    var sendTrackingData = useCallback(function (eventType_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return __awaiter(_this, __spreadArray([eventType_1], args_1, true), void 0, function (eventType, data) {
            var payload, error_1;
            if (data === void 0) { data = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isInitialized || disabled || !sessionId || !userId) {
                            return [2 /*return*/];
                        }
                        payload = {
                            siteId: siteId,
                            eventType: eventType.toUpperCase(),
                            data: __assign(__assign({}, data), { sessionId: sessionId, userId: userId, userAgent: navigator.userAgent, path: window.location.pathname, referer: document.referrer || undefined, title: document.title || undefined }),
                            timestamp: new Date().toISOString(),
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch(serverUrl, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(payload),
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error sending tracking data:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }, [isInitialized, disabled, sessionId, userId, siteId, serverUrl]);
    // Track function
    var track = useCallback(function (eventType, data) {
        sendTrackingData(eventType, data);
    }, [sendTrackingData]);
    // Auto-tracking setup
    useEffect(function () {
        if (!isInitialized || !autoTrack || disabled) {
            return;
        }
        // Track page load
        track('page_load', { timeSpent: 0 });
        // Track page view
        track('page_view', {
            url: window.location.href,
            title: document.title,
            timeSpent: 0,
        });
        // Setup click tracking
        var handleClick = function (event) {
            var target = event.target;
            track('user_click', {
                url: window.location.href,
                element: target.tagName || 'unknown',
                timeSpent: Date.now() - startTimeRef.current,
            });
        };
        document.addEventListener('click', handleClick);
        // Setup activity tracking
        var handleIdle = function (timeSpent) {
            track('idle_timeout', { timeSpent: timeSpent });
        };
        var handleHidden = function (timeSpent) {
            track('page_hidden', { timeSpent: timeSpent });
        };
        activityTrackerRef.current = new ActivityTracker(handleIdle, handleHidden);
        // Setup page unload tracking
        var handleUnload = function () {
            track('page_unload', { timeSpent: Date.now() - startTimeRef.current });
        };
        window.addEventListener('pagehide', handleUnload);
        // Cleanup
        return function () {
            document.removeEventListener('click', handleClick);
            window.removeEventListener('pagehide', handleUnload);
            if (activityTrackerRef.current) {
                activityTrackerRef.current.destroy();
            }
        };
    }, [isInitialized, autoTrack, disabled, track]);
    var contextValue = {
        track: track,
        config: config,
        isInitialized: isInitialized,
        sessionId: sessionId,
        userId: userId,
    };
    return (jsxRuntimeExports.jsx(TrackingContext.Provider, { value: contextValue, children: children }));
}
function useTrack() {
    var context = useContext(TrackingContext);
    if (!context) {
        throw new Error('useTrack must be used within a TrackerProvider');
    }
    return {
        track: context.track,
        isInitialized: context.isInitialized,
        sessionId: context.sessionId,
        userId: context.userId,
        config: context.config,
    };
}

function useTracking() {
    var _a = useTrack(), baseTrack = _a.track, isInitialized = _a.isInitialized, sessionId = _a.sessionId, userId = _a.userId, config = _a.config;
    // Enhanced track function with common patterns
    var track = useCallback(function () { return ({
        // Custom events
        customEvent: function (eventName, data) {
            baseTrack('custom', __assign({ eventName: eventName }, data));
        },
        // Page events
        pageView: function (url, title) {
            baseTrack('page_view', {
                url: url || window.location.href,
                title: title || document.title,
                timeSpent: 0,
            });
        },
        // User interaction events
        click: function (element, data) {
            baseTrack('user_click', __assign({ element: element || 'unknown', url: window.location.href }, data));
        },
        // Form events
        formSubmit: function (formName, data) {
            baseTrack('custom', __assign({ eventName: 'form_submit', formName: formName }, data));
        },
        formStart: function (formName, data) {
            baseTrack('custom', __assign({ eventName: 'form_start', formName: formName }, data));
        },
        // Button events
        buttonClick: function (buttonName, data) {
            baseTrack('custom', __assign({ eventName: 'button_click', buttonName: buttonName }, data));
        },
        // Search events
        search: function (query, results, data) {
            baseTrack('custom', __assign({ eventName: 'search', query: query, results: results }, data));
        },
        // Download events
        download: function (fileName, fileType, data) {
            baseTrack('custom', __assign({ eventName: 'download', fileName: fileName, fileType: fileType }, data));
        },
        // Video events
        videoPlay: function (videoTitle, duration, data) {
            baseTrack('custom', __assign({ eventName: 'video_play', videoTitle: videoTitle, duration: duration }, data));
        },
        videoPause: function (videoTitle, currentTime, data) {
            baseTrack('custom', __assign({ eventName: 'video_pause', videoTitle: videoTitle, currentTime: currentTime }, data));
        },
        videoComplete: function (videoTitle, duration, data) {
            baseTrack('custom', __assign({ eventName: 'video_complete', videoTitle: videoTitle, duration: duration }, data));
        },
        // E-commerce events
        purchase: function (orderId, total, currency, data) {
            baseTrack('custom', __assign({ eventName: 'purchase', orderId: orderId, total: total, currency: currency || 'USD' }, data));
        },
        addToCart: function (productId, productName, price, data) {
            baseTrack('custom', __assign({ eventName: 'add_to_cart', productId: productId, productName: productName, price: price }, data));
        },
        removeFromCart: function (productId, productName, data) {
            baseTrack('custom', __assign({ eventName: 'remove_from_cart', productId: productId, productName: productName }, data));
        },
        // Generic track function
        event: function (eventType, data) {
            baseTrack(eventType, data);
        }
    }); }, [baseTrack]);
    return {
        track: track(),
        isInitialized: isInitialized,
        sessionId: sessionId,
        userId: userId,
        config: config,
    };
}

export { ActivityTracker, TrackerProvider, TrackingUtils, useTrack, useTracking };
//# sourceMappingURL=index.esm.js.map
