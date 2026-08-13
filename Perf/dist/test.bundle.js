/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	const __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ homepage_spec),
  options: () => (/* binding */ options)
});

;// external "k6/http"
const http_namespaceObject = require("k6/http");
var http_default = /*#__PURE__*/__webpack_require__.n(http_namespaceObject);
;// external "k6"
const external_k6_namespaceObject = require("k6");
;// external "k6/metrics"
const metrics_namespaceObject = require("k6/metrics");
;// ./src/env/dev_config.json
const dev_config_namespaceObject = /*#__PURE__*/JSON.parse('{"baseUrl":"https://demoblaze.com/","env":"dev","envName":"Development","logger":{"enabled":true,"logLevel":"DEBUG"},"portNr":443,"proxyUrl":"","DBConnectionString":"","featureFlags":{}}');
;// ./src/env/qa_config.json
const qa_config_namespaceObject = /*#__PURE__*/JSON.parse('{"baseUrl":"https://demoblaze.com/","env":"qa","envName":"Quality Assurance","logger":{"enabled":true,"logLevel":"INFO"},"portNr":443,"proxyUrl":"","DBConnectionString":"","featureFlags":{}}');
;// ./src/config/config.ts
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
;

class ConfigLoader {
  loadConfig() {
    // Read target env from CLI (k6 run -e TARGET_ENV=qa), default to 'dev'
    var targetEnv = __ENV.TARGET_ENV || 'dev';
    var baseConfig;
    if (targetEnv === 'qa') {
      baseConfig = qa_config_namespaceObject;
    } else {
      baseConfig = dev_config_namespaceObject;
    }

    // Apply CLI overrides if provided, otherwise fallback to the loaded JSON config
    this.config = _objectSpread(_objectSpread({}, baseConfig), {}, {
      baseUrl: __ENV.BASE_URL || baseConfig.baseUrl,
      env: targetEnv
    });
    return this.config;
  }
}
;// ./src/router/router.ts
function router_defineProperty(e, r, t) { return (r = router_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function router_toPropertyKey(t) { var i = router_toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function router_toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Router {
  constructor(config) {
    this.config = config;
  }
  buildRoute(routeName) {
    // Remove trailing slash from baseUrl if exists, then append routeName
    var base = this.config.baseUrl.replace(/\/$/, "");
    return routeName ? "".concat(base, "/").concat(routeName) : base;
  }
}
class Routes {}
router_defineProperty(Routes, "HOMEPAGE", '');
router_defineProperty(Routes, "USERS", 'users');
router_defineProperty(Routes, "LOGIN", "login");
;// ./src/config/treshold.config.ts
var DefaultThresholds = {
  http_req_failed: ['rate<0.01'],
  // Error rate should be less than 1%
  http_req_duration: ['p(95)<500', 'p(99)<300', 'avg<300'],
  // 95% of requests should be below 500ms,
  // 99% of requests should be below 300ms,average of requests should be below 300ms
  checks: ['rate>0.99']
};
;// ./src/config/workload.config.ts

var Workloads = {
  stag: {
    averageLow: [{
      duration: '1m',
      target: 50
    }, {
      duration: '5m',
      target: 50
    }, {
      duration: '1m',
      target: 0
    }],
    averageMed: [{
      duration: '2m',
      target: 250
    }, {
      duration: '10m',
      target: 250
    }, {
      duration: '2m',
      target: 0
    }],
    averageHigh: [{
      duration: '2m',
      target: 500
    }, {
      duration: '10m',
      target: 500
    }, {
      duration: '2m',
      target: 0
    }],
    stress: [{
      duration: '5s',
      target: 1000
    }, {
      duration: '15s',
      target: 1000
    }, {
      duration: '5s',
      target: 0
    }]
  },
  pre: {
    // Add pre-prod-specific load stages here when ready
  },
  prod: {
    // Add prod-specific load stages here when ready
  }
};
var getWorkload = (envName, workloadName) => {
  var stages;
  if (workloadName.toLowerCase() === 'smoke') {
    stages = Workloads.smoke;
  } else {
    var envWorkloads = Workloads[envName.toLowerCase()];
    if (envWorkloads && envWorkloads[workloadName]) {
      stages = envWorkloads[workloadName];
    } else {
      console.warn("Workload ".concat(workloadName, " not found for env ").concat(envName, ". Falling back to smoke."));
      stages = Workloads.smoke;
    }
  }
  return {
    scenarios: {
      [workloadName]: {
        executor: 'ramping-vus',
        stages: stages
      }
    },
    thresholds: DefaultThresholds
  };
};
;// ./src/common/enum/http_options.enum.ts
var HTTP_OPTIONS_ENUM = /*#__PURE__*/(/* unused pure expression or super */ null && (function (HTTP_OPTIONS_ENUM) {
  HTTP_OPTIONS_ENUM["GET"] = "GET";
  HTTP_OPTIONS_ENUM["POST"] = "POST";
  HTTP_OPTIONS_ENUM["PUT"] = "PUT";
  HTTP_OPTIONS_ENUM["DELETE"] = "DELETE";
  HTTP_OPTIONS_ENUM["PATCH"] = "PATCH";
  HTTP_OPTIONS_ENUM["HEAD"] = "HEAD";
  HTTP_OPTIONS_ENUM["OPTIONS"] = "OPTIONS";
  return HTTP_OPTIONS_ENUM;
}({})));
var HTTP_STATUS_CODES_ENUM = /*#__PURE__*/function (HTTP_STATUS_CODES_ENUM) {
  HTTP_STATUS_CODES_ENUM[HTTP_STATUS_CODES_ENUM["OK"] = 200] = "OK";
  HTTP_STATUS_CODES_ENUM[HTTP_STATUS_CODES_ENUM["CREATED"] = 201] = "CREATED";
  HTTP_STATUS_CODES_ENUM[HTTP_STATUS_CODES_ENUM["ACCEPTED"] = 202] = "ACCEPTED";
  HTTP_STATUS_CODES_ENUM[HTTP_STATUS_CODES_ENUM["NO_CONTENT"] = 204] = "NO_CONTENT";
  HTTP_STATUS_CODES_ENUM[HTTP_STATUS_CODES_ENUM["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  HTTP_STATUS_CODES_ENUM[HTTP_STATUS_CODES_ENUM["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HTTP_STATUS_CODES_ENUM[HTTP_STATUS_CODES_ENUM["FORBIDDEN"] = 403] = "FORBIDDEN";
  HTTP_STATUS_CODES_ENUM[HTTP_STATUS_CODES_ENUM["NOT_FOUND"] = 404] = "NOT_FOUND";
  HTTP_STATUS_CODES_ENUM[HTTP_STATUS_CODES_ENUM["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
  HTTP_STATUS_CODES_ENUM[HTTP_STATUS_CODES_ENUM["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
  return HTTP_STATUS_CODES_ENUM;
}({});
var HTTP_HEADERS_ENUM = /*#__PURE__*/(/* unused pure expression or super */ null && (function (HTTP_HEADERS_ENUM) {
  HTTP_HEADERS_ENUM["CONTENT_TYPE"] = "application/json";
  HTTP_HEADERS_ENUM["ACCEPT"] = "*/*";
  HTTP_HEADERS_ENUM["CACHE_CONTROL"] = "no-cache";
  HTTP_HEADERS_ENUM["CONNECTION"] = "keep-alive";
  HTTP_HEADERS_ENUM["HOST"] = "Host";
  HTTP_HEADERS_ENUM["USER_AGENT"] = "User-Agent";
  HTTP_HEADERS_ENUM["X_REQUESTED_WITH"] = "X-Requested-With";
  return HTTP_HEADERS_ENUM;
}({})));
;// ./src/common/utils/error_handler.ts
class ErrorHandler {
  constructor(logErrorDetails) {
    this.logErrorDetails = logErrorDetails;
  }
  logError(isError, res) {
    var tags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!isError) return;
    var traceparentHeader = res.request && res.request.headers ? res.request.headers["Traceparent"] : undefined;
    var errorData = Object.assign({
      url: res.url,
      status: res.status,
      error_code: res.error_code,
      traceparent: traceparentHeader ? traceparentHeader.toString() : undefined
    }, tags);
    this.logErrorDetails(errorData);
  }
}
;// ./src/e2e/homepage.spec.ts
function homepage_spec_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function homepage_spec_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? homepage_spec_ownKeys(Object(t), !0).forEach(function (r) { homepage_spec_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : homepage_spec_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function homepage_spec_defineProperty(e, r, t) { return (r = homepage_spec_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function homepage_spec_toPropertyKey(t) { var i = homepage_spec_toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function homepage_spec_toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
;








// 1. Initialize configuration (loads dev or qa based on __ENV.TARGET_ENV)
var configLoader = new ConfigLoader();
var config = configLoader.loadConfig();

// 2. Initialize router
var router = new Router(config);

// 3. Initialize Error Handler
var errorHandler = new ErrorHandler(errorData => {
  // Console log for now, as telemetry is not yet added
  console.error("[ErrorHandler] Request Failed: ".concat(JSON.stringify(errorData)));
});

// Custom Metrics
var homepageResponseTime = new metrics_namespaceObject.Trend('homepage_response_time');

// 3. Setup k6 options based on workload type (__ENV.WORKLOAD)
// Defaults to 'smoke' if no environment variable is provided
var targetWorkload = __ENV.WORKLOAD || 'smoke';
var options = homepage_spec_objectSpread(homepage_spec_objectSpread({}, getWorkload(config.env, targetWorkload)), {}, {
  // Pass the resolved env and the workload name
  ext: {
    loadimpact: {
      projectID: 123456,
      // Replace with your Grafana Cloud project ID
      name: 'Demoblaze Load Test'
    }
  }
});

// 4. Default VU function
/* harmony default export */ function homepage_spec() {
  var url = router.buildRoute(Routes.HOMEPAGE);
  var res = http_default().get(url);

  // Track the custom response time metric
  homepageResponseTime.add(res.timings.duration);
  var success = (0,external_k6_namespaceObject.check)(res, {
    'status is 200 OK': r => r.status === HTTP_STATUS_CODES_ENUM.OK
  });
  errorHandler.logError(!success, res, {
    tags: {
      endpoint: 'homepage'
    }
  });
  (0,external_k6_namespaceObject.sleep)(1);
}
const __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=test.bundle.js.map