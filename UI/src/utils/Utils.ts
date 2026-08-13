import { Page } from "@playwright/test";
import winston from "winston";


export const fullLineColorFormat = winston.format((info: any) => {
    const colorMap: Record<string, string> = {
        success: "\x1b[32m", // green
        failed: "\x1b[35m",  // magenta
        error: "\x1b[31m",   // red
        warn: "\x1b[33m",    // yellow
        info: "\x1b[34m",    // blue
        debug: "\x1b[36m",   // cyan
    };

    const color = colorMap[info.level] || "";
    const reset = "\x1b[0m";

    // Apply color to the full line (timestamp + level + message)
    info.fullLineColor = (text: string) => `${color}${text}${reset}`;

    return info;
});



export async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delayMs: number = 500,
    backoffFactor: number = 2
): Promise<T> {
    let attempt = 0;
    let currentDelay = delayMs;

    while (attempt < retries) {
        try {
            return await fn();
        } catch (error) {
            attempt++;
            if (attempt >= retries) {
                throw new Error(`Failed after ${retries} attempts: ${error}`);
            }
            console.warn(`Attempt ${attempt} failed. Retrying in ${currentDelay}ms...`);
            await new Promise(resolve => setTimeout(resolve, currentDelay));
            currentDelay *= backoffFactor;
        }
    }

    // This should never be reached
    throw new Error("Unexpected retry failure");
}

export function generateRandomName(length: number = 6): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
