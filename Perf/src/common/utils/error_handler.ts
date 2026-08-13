import exec from 'k6/execution';

export class ErrorHandler {
    private logErrorDetails: (errorData: any) => void;
    private loggedEndpoints = new Set<string>();

    constructor(logErrorDetails: (errorData: any) => void) {
        this.logErrorDetails = logErrorDetails;
    }

    public logError(isError: boolean, res: any, tags: Record<string, any> = {}): void {
        if (!isError) return;

        // If it's a performance error, ONLY let VU #1 log it to prevent console spam across hundreds of VUs
        const isPerfError = tags?.tags?.issue === 'performance_error';
        if (isPerfError && exec.vu.idInInstance !== 1) return;

        // Prevent console spam by only logging an endpoint error once per Virtual User
        const endpointKey = tags?.tags?.endpoint || res.url;
        if (this.loggedEndpoints.has(endpointKey)) return;
        this.loggedEndpoints.add(endpointKey);

        const traceparentHeader = res.request && res.request.headers ? res.request.headers["Traceparent"] : undefined;
        const errorData = Object.assign(
            {
                url: res.url,
                status: res.status,
                error_code: res.error_code,
                traceparent: traceparentHeader ? traceparentHeader.toString() : undefined,
            },
            tags
        );
        this.logErrorDetails(errorData);
    }
}
