import { ExecutorType } from "../types/executor.type";
import { ThresholdsConfig } from "./treshold.interface";



export interface Stage {
    duration: string;
    target: number;
}

export interface ScenarioDefinition {
    executor: ExecutorType;
    exec?: string;          // Used for multi-scenario scripts to define which exported function to call
    stages?: Stage[];       // Used by ramping-vus or ramping-arrival-rate
    vus?: number;           // Used by constant-vus, shared-iterations, per-vu-iterations
    iterations?: number;    // Used by shared-iterations
    duration?: string;      // Used by constant-vus, constant-arrival-rate, shared-iterations
    rate?: number;          // Used by arrival-rate executors
    timeUnit?: string;      // Used by arrival-rate executors
    preAllocatedVUs?: number;// Used by arrival-rate executors
    maxVUs?: number;        // Used by arrival-rate executors
}

export interface ScenariosConfig {
    [key: string]: ScenarioDefinition;
}

export default interface WorkloadConfig {
    scenarios: ScenariosConfig;
    thresholds?: ThresholdsConfig;
}
