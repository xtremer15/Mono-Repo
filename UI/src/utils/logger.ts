import winston from "winston";
import { ConsoleMessage, LaunchOptions, Logger, Page, Request, test as testLogger } from "@playwright/test";
import { fullLineColorFormat } from "./Utils";
import { Console } from "console";

type LogSeverity = 'verbose' | 'info' | 'warning' | 'error';

type ExtendedFixtures = {
  logger: Logger;
};


type CustomLogger = winston.Logger & {
  success: (msg: string) => winston.Logger;
  failed: (msg: string) => winston.Logger;
};

const loggingLevels = {
  levels: {
    error:   0,   
    warn:    1,
    failed:  2,   
    info:    3,
    success: 4,   
    debug:   5,   
  },
  colors: {
    error:   "red",
    warn:    "yellow",
    failed:  "magenta",
    info:    "blue",
    success: "green",
    debug:   "cyan",
  },
};
winston.addColors(loggingLevels.colors);

export const winLogger = winston.createLogger({
  levels: loggingLevels.levels,
  level: "debug",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        fullLineColorFormat(),
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
      )
    }),
    new winston.transports.File({ filename: 'tests.log' }),
  ],
}) as CustomLogger;

const now = () => new Date().toISOString();
const pageEventsListener = (p: Page, label: string) => winLogger.info(`${now()} ${label}: ${p.url()}`);
const networkListneres = (req: Request, label: string) => winLogger.debug(`${now()} ${label}: ${req.method()} ${req.url()} (${req.resourceType()})`);

export function attachPageEvents(page: Page) {

  page.on("domcontentloaded", (p) => pageEventsListener(p, "DOM Loaded"));
  page.on("load", (p) => pageEventsListener(p, "Page Loaded"));

  page.on("console", (msg: ConsoleMessage) => {
    const type = msg.type();
    if (type === "error") winLogger.error(`${now()} Console Error: ${msg.text()}`);
    else if (type === "warning") winLogger.warn(`${now()} Console Warning: ${msg.text()}`);
    else winLogger.info(`${now()} Console: ${msg.text()}`);
  });

  page.on("pageerror", (err: Error) => winLogger.error(`${now()} Page Error: ${err.message}`));

  page.on("request", (req) => networkListneres(req, "Request"));
  page.on("requestfinished", (req) => networkListneres(req, "Request Finished"));
  page.on("requestfailed", (req) => networkListneres(req, `Request Failed: ${req.method()} ${req.url()}`));
};


export const test = testLogger.extend<ExtendedFixtures>({
  logger: async ({ }, use) => {
    const logger: Logger = {
      isEnabled: (name, severity: LogSeverity) => name === "api" || name === 'ui',
      log: (name, severity: LogSeverity, message, args) => {
        winLogger.info(`[API] ${severity} ${message} ${args.join(" ")}`);
      },
    };

    await use(logger);
  },

  page: async ({ page }, use) => {
    attachPageEvents(page);
    await use(page);
  },
});
export { expect } from '@playwright/test';