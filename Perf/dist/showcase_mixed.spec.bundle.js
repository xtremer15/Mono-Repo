var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/e2e/showcase_mixed.spec.ts
import http from "k6/http";
import { check, sleep } from "k6";

// src/env/dev_config.json
var dev_config_default = {
  baseUrl: "https://demoblaze.com/",
  env: "dev",
  envName: "Development",
  logger: {
    enabled: true,
    logLevel: "DEBUG"
  },
  portNr: 443,
  proxyUrl: "",
  DBConnectionString: "",
  featureFlags: {}
};

// src/env/qa_config.json
var qa_config_default = {
  baseUrl: "https://demoblaze.com/",
  env: "qa",
  envName: "Quality Assurance",
  logger: {
    enabled: true,
    logLevel: "INFO"
  },
  portNr: 443,
  proxyUrl: "",
  DBConnectionString: "",
  featureFlags: {}
};

// src/config/config.ts
var ConfigLoader = class {
  constructor() {
    __publicField(this, "config");
  }
  loadConfig() {
    const targetEnv = __ENV.TARGET_ENV || "dev";
    let baseConfig;
    if (targetEnv === "qa") {
      baseConfig = qa_config_default;
    } else {
      baseConfig = dev_config_default;
    }
    this.config = {
      ...baseConfig,
      baseUrl: __ENV.BASE_URL || baseConfig.baseUrl,
      env: targetEnv
    };
    return this.config;
  }
};

// src/router/router.ts
var Router = class {
  constructor(config2) {
    __publicField(this, "config");
    this.config = config2;
  }
  buildRoute(routeName) {
    const base = this.config.baseUrl.replace(/\/$/, "");
    return routeName ? `${base}/${routeName}` : base;
  }
};
var Routes = class {
};
__publicField(Routes, "HOMEPAGE", "");
__publicField(Routes, "USERS", "users");
__publicField(Routes, "LOGIN", "login");

// src/config/treshold.config.ts
var DefaultThresholds = {
  // Error rates
  http_req_failed: ["rate<0.01"],
  // Error rate should be less than 1%
  http_req_duration: ["p(95)<500", "p(99)<300", "avg<300"],
  //Response time 
  // Core Network & Backend Thresholds
  http_req_waiting: ["p(95)<200"],
  // TTFB should be fast
  http_req_connecting: ["p(95)<50"],
  // TCP connection should be quick
  http_req_sending: ["p(95)<20"],
  // Sending data should be near instant
  http_req_receiving: ["p(95)<100"],
  // Receiving payload
  http_req_blocked: ["p(95)<50"],
  // Free TCP slots
  http_req_tls_handshaking: ["p(95)<100"],
  // SSL Handshake
  // Iteration loop
  iteration_duration: ["p(95)<2000"],
  // Full loop including sleeps
  // Checks
  checks: ["rate>0.95"]
};

// src/config/workload.config.ts
var defaultSmoke = {
  executor: "ramping-vus",
  stages: [
    { duration: "5s", target: 5 },
    { duration: "5s", target: 5 },
    { duration: "5s", target: 0 }
  ]
};
var Workloads = {
  dev: {
    smoke: defaultSmoke,
    smokeLow: {
      executor: "ramping-vus",
      stages: [
        { duration: "1s", target: 15 },
        { duration: "13s", target: 15 },
        { duration: "1s", target: 0 }
      ]
    },
    smokeMed: {
      executor: "ramping-vus",
      stages: [
        { duration: "1s", target: 250 },
        { duration: "13s", target: 250 },
        { duration: "1s", target: 0 }
      ]
    },
    smokeHigh: {
      executor: "ramping-vus",
      stages: [
        { duration: "1s", target: 500 },
        { duration: "13s", target: 500 },
        { duration: "1s", target: 0 }
      ]
    },
    smokeLoad: {
      executor: "ramping-vus",
      stages: [
        { duration: "15s", target: 1e3 }
      ]
    },
    smokeLoadRampUsers: {
      executor: "ramping-vus",
      stages: [
        { duration: "2s", target: 1e3 },
        { duration: "13s", target: 1e3 },
        { duration: "1s", target: 0 }
      ]
    },
    smokeLoadConstantArrival: {
      executor: "constant-arrival-rate",
      rate: 1e3,
      timeUnit: "1s",
      // per 1 second (1000 RPS)
      duration: "15s",
      preAllocatedVUs: 500,
      maxVUs: 2e3
      // Absolute maximum VUs k6 can use to sustain the rate and will fill with another 500 for the difference between the rate and preallocated VUs
    },
    smokeLoadConstantVUs: {
      executor: "constant-vus",
      vus: 1e3,
      duration: "15s"
    },
    smokeMixedTraffic: {
      homepage_traffic: {
        executor: "constant-vus",
        vus: 70,
        // 70% of 100 users
        duration: "15s",
        exec: "homepageFlow"
      },
      login_traffic: {
        executor: "constant-vus",
        vus: 30,
        // 30% of 100 users
        duration: "15s",
        exec: "loginFlow"
      }
    }
  },
  qa: {
    smoke: defaultSmoke,
    load: {
      executor: "ramping-vus",
      stages: [
        { duration: "0s", target: 1e3 },
        { duration: "15s", target: 1e3 },
        { duration: "0s", target: 0 }
      ]
    }
  },
  pre: {},
  prod: {}
};
var getWorkload = (envName, workloadName) => {
  let scenarioDef;
  const envWorkloads = Workloads[envName.toLowerCase()];
  if (envWorkloads && envWorkloads[workloadName]) {
    scenarioDef = envWorkloads[workloadName];
  } else {
    console.warn(`Workload '${workloadName}' not found for env '${envName}'. Falling back to default smoke.`);
    scenarioDef = defaultSmoke;
  }
  let scenariosConfig;
  if (scenarioDef.executor) {
    scenariosConfig = {
      [workloadName]: scenarioDef
    };
  } else {
    scenariosConfig = scenarioDef;
  }
  return {
    scenarios: scenariosConfig,
    thresholds: DefaultThresholds
  };
};

// src/common/utils/error_handler.ts
var ErrorHandler = class {
  constructor(logErrorDetails) {
    __publicField(this, "logErrorDetails");
    this.logErrorDetails = logErrorDetails;
  }
  logError(isError, res, tags = {}) {
    if (!isError) return;
    const traceparentHeader = res.request && res.request.headers ? res.request.headers["Traceparent"] : void 0;
    const errorData = Object.assign(
      {
        url: res.url,
        status: res.status,
        error_code: res.error_code,
        traceparent: traceparentHeader ? traceparentHeader.toString() : void 0
      },
      tags
    );
    this.logErrorDetails(errorData);
  }
};

// src/e2e/showcase_mixed.spec.ts
var configLoader = new ConfigLoader();
var config = configLoader.loadConfig();
var router = new Router(config);
var errorHandler = new ErrorHandler((errorData) => {
  console.error(`[ErrorHandler] Request Failed: ${JSON.stringify(errorData)}`);
});
var options = getWorkload(__ENV.TARGET_ENV || "dev", __ENV.WORKLOAD || "smokeMixedTraffic");
function homepageFlow() {
  const url = router.buildRoute(Routes.HOMEPAGE);
  const res = http.get(url);
  const isStatusOk = check(res, {
    "homepage status is 200 OK": (r) => r.status === 200 /* OK */
  });
  const isBodyOk = check(res, {
    "homepage body contains string": (resp) => resp.body?.includes("PRODUCT STORE")
  });
  const functionalSuccess = isStatusOk && isBodyOk;
  errorHandler.logError(!functionalSuccess, res, { tags: { endpoint: "homepage", issue: !isStatusOk ? "status" : "body" } });
  sleep(1);
}
function loginFlow() {
  const url = "https://api.demoblaze.com/login";
  const payload = JSON.stringify({
    username: "testuser123",
    password: "testpassword123"
  });
  const res = http.post(url, payload, {
    headers: { "Content-Type": "application/json" }
  });
  const isStatusOk = check(res, {
    "login API status is 200 OK": (r) => r.status === 200 /* OK */
  });
  const isResponseValid = check(res, {
    "login API responded": (resp) => resp.body !== null && resp.body.length > 0
  });
  const functionalSuccess = isStatusOk && isResponseValid;
  errorHandler.logError(!functionalSuccess, res, { tags: { endpoint: "login_api", issue: !isStatusOk ? "status" : "body" } });
  sleep(1);
}
function showcase_mixed_spec_default() {
  homepageFlow();
}
export {
  showcase_mixed_spec_default as default,
  homepageFlow,
  loginFlow,
  options
};
