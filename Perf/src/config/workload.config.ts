import WorkloadConfig, { ScenarioDefinition } from "../common/interfaces/workload_config.interface";
import { DefaultThresholds } from "./treshold.config";

// A generic smoke test to use as a fallback if the requested workload is not found
const defaultSmoke: ScenarioDefinition = {
    executor: 'ramping-vus',
    stages: [
        { duration: '5s', target: 5 },
        { duration: '5s', target: 5 },
        { duration: '5s', target: 0 },
    ]
};

export const Workloads: any = {
    dev: {
        smoke: defaultSmoke,
        smokeLow: {
            executor: 'ramping-vus',
            stages: [
                { duration: '1s', target: 15 },
                { duration: '13s', target: 15 },
                { duration: '1s', target: 0 },
            ]
        },
        smokeMed: {
            executor: 'ramping-vus',
            stages: [
                { duration: '1s', target: 250 },
                { duration: '13s', target: 250 },
                { duration: '1s', target: 0 },
            ]
        },
        smokeHigh: {
            executor: 'ramping-vus',
            stages: [
                { duration: '1s', target: 500 },
                { duration: '13s', target: 500 },
                { duration: '1s', target: 0 },
            ]
        },
        smokeLoad: {
            executor: 'ramping-vus',
            stages: [
                { duration: '15s', target: 1000 },
            ]
        },
        smokeLoadRampUsers: {
            executor: 'ramping-vus',
            stages: [
                { duration: '2s', target: 1000 },
                { duration: '13s', target: 1000 },
                { duration: '1s', target: 0 },
            ]
        },

        smokeLoadConstantArrival: {
            executor: 'constant-arrival-rate',
            rate: 1000,
            timeUnit: '1s',       // per 1 second (1000 RPS)
            duration: '15s',
            preAllocatedVUs: 500,
            maxVUs: 2000,         // Absolute maximum VUs k6 can use to sustain the rate and will fill with another 500 for the difference between the rate and preallocated VUs
        },

        smokeLoadConstantVUs: {
            executor: 'constant-vus',
            vus: 1000,
            duration: '15s',
        },

        smokeMixedTraffic: {
            homepage_traffic: {
                executor: 'constant-vus',
                vus: 70, // 70% of 100 users
                duration: '15s',
                exec: 'homepageFlow'
            },
            login_traffic: {
                executor: 'constant-vus',
                vus: 30, // 30% of 100 users
                duration: '15s',
                exec: 'loginFlow'
            }
        }
    },
    qa: {
        smoke: defaultSmoke,
        load: {
            executor: 'ramping-vus',
            stages: [
                { duration: '0s', target: 1000 },
                { duration: '15s', target: 1000 },
                { duration: '0s', target: 0 },
            ]
        },
    },
    pre: {},
    prod: {}
};

export const getWorkload = (envName: string, workloadName: string): WorkloadConfig => {
    let scenarioDef: any;

    const envWorkloads = Workloads[envName.toLowerCase()];

    //Validates the relation between workload and environment from **Workloads** object
    if (envWorkloads && envWorkloads[workloadName]) {
        scenarioDef = envWorkloads[workloadName];
    } else {
        console.warn(`Workload '${workloadName}' not found for env '${envName}'. Falling back to default smoke.`);
        scenarioDef = defaultSmoke;
    }

    // Determine if scenarioDef is a single ScenarioDefinition (has executor) or a ScenariosConfig (multiple scenarios)
    let scenariosConfig: any;
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
