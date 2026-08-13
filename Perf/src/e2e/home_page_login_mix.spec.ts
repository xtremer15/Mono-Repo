import http from '../common/utils/http_client';
import { check, sleep } from 'k6';
import { ConfigLoader } from '../config/config';
import { Router, Routes } from '../router/router';
import { getWorkload } from '../config/workload.config';
import { HTTP_STATUS_CODES_ENUM, HTTP_HEADERS_ENUM } from '../common/enum/http_options.enum';
import { ErrorHandler } from '../common/utils/error_handler';
import { TestData } from '../common/data/test_data';

const configLoader = new ConfigLoader();
const config = configLoader.loadConfig();
const router = new Router(config);

const errorHandler = new ErrorHandler((errorData) => {
    console.error(`[ErrorHandler] Request Failed: ${JSON.stringify(errorData)}`);
});


export const options = getWorkload(config.env, __ENV.WORKLOAD || 'smokeMixedTraffic');


export function homepageFlow() {
    const url = router.buildRoute(Routes.HOMEPAGE);
    const res = http.get(url);

    const isStatusOk = check(res, {
        'homepage status is 200 OK': r => r.status === HTTP_STATUS_CODES_ENUM.OK,
    });

    const isBodyOk = check(res, {
        'homepage body contains string': (resp: any) => resp.body?.includes("PRODUCT STORE"),
    });

    const functionalSuccess = isStatusOk && isBodyOk;
    errorHandler.logError(!functionalSuccess, res, { tags: { endpoint: 'homepage', issue: !isStatusOk ? 'status' : 'body' } });

    sleep(1);
}


export function loginFlow() {
    const url = "https://api.demoblaze.com/login";
    const payload = TestData.LOGIN_PAYLOAD;

    const res = http.post(url, payload, {
        headers: { 'Content-Type': HTTP_HEADERS_ENUM.CONTENT_TYPE }
    });


    const isStatusOk = check(res, {
        'login API status is 200 OK': r => r.status === HTTP_STATUS_CODES_ENUM.OK,
    });

    const isResponseValid = check(res, {
        'login API responded': (resp: any) => resp.body !== null && resp.body.length > 0,
    });

    const functionalSuccess = isStatusOk && isResponseValid;
    errorHandler.logError(!functionalSuccess, res, { tags: { endpoint: 'login_api', issue: !isStatusOk ? 'status' : 'body' } });

    sleep(1);
}


export default function () {
    // Required by k6, but unused if scenarios dictate specific execs
    homepageFlow();
}
