import k6http from 'k6/http';

const DEBUG_ENABLED = __ENV.DEBUG === 'true';

function logRequest(res: any) {
    if (DEBUG_ENABLED && res && res.request) {
        const req = res.request;
        const timestamp = new Date().toISOString();
        const reqBody = req.body ? `\nRequest Body: ${req.body}` : '';
        const resBody = res.body ? `\nResponse Body: ${String(res.body).substring(0, 1000)}` : '';
        
        const logEntry = `\n--- [${timestamp}] ---\n` +
                         `REQUEST: ${req.method} ${req.url}${reqBody}\n` +
                         `RESPONSE: Status ${res.status}${resBody}\n` +
                         `----------------------\n`;
                         
        console.info(logEntry);
    }
}

export const http = {
    get: (url: any, params?: any) => {
        const res = k6http.get(url, params);
        logRequest(res);
        return res;
    },
    post: (url: any, body?: any, params?: any) => {
        const res = k6http.post(url, body, params);
        logRequest(res);
        return res;
    },
    put: (url: any, body?: any, params?: any) => {
        const res = k6http.put(url, body, params);
        logRequest(res);
        return res;
    },
    del: (url: any, body?: any, params?: any) => {
        const res = k6http.del(url, body, params);
        logRequest(res);
        return res;
    },
    patch: (url: any, body?: any, params?: any) => {
        const res = k6http.patch(url, body, params);
        logRequest(res);
        return res;
    },
    options: (url: any, body?: any, params?: any) => {
        const res = k6http.options(url, body, params);
        logRequest(res);
        return res;
    },
    head: (url: any, params?: any) => {
        const res = k6http.head(url, params);
        logRequest(res);
        return res;
    },
    request: (method: any, url: any, body?: any, params?: any) => {
        const res = k6http.request(method, url, body, params);
        logRequest(res);
        return res;
    },
    batch: (requests: any) => {
        const responses = k6http.batch(requests);
        if (Array.isArray(responses)) {
            responses.forEach(logRequest);
        } else {
            Object.values(responses).forEach(logRequest);
        }
        return responses;
    }
};

export default http;
