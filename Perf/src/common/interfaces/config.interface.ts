import { LOG_LEVELS } from "../types/log_level.type";

export default interface Config {
    baseUrl: string;
    env: string;
    envName: string;
    logger: LoggerConfig;
    portNr: number;
    proxyUrl: string;
    DBConnectionString: string;
    featureFlags: Record<string, boolean>;
}

export interface LoggerConfig {
    enabled: boolean;
    logLevel: LOG_LEVELS
}


export interface TestContext {
    testId: string,
    testStatus: string,
    timestamp: number,
    duration: string,
}