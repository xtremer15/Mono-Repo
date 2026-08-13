import http from '../common/utils/http_client';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { ConfigLoader } from '../config/config';
import { Router, Routes } from '../router/router';
import { getWorkload } from '../config/workload.config';
import { HTTP_STATUS_CODES_ENUM } from '../common/enum/http_options.enum';
import { ErrorHandler } from '../common/utils/error_handler';

const configLoader = new ConfigLoader();
const config = configLoader.loadConfig();

const router = new Router(config);

const errorHandler = new ErrorHandler((errorData) => {
    // Console log for now, as telemetry is not yet added
    console.error(`[ErrorHandler] Request Failed: ${JSON.stringify(errorData)}`);
});

const homepageResponseTime = new Trend('homepage_response_time');

export const options = {
    ...getWorkload(config.env, __ENV.WORKLOAD || 'smokeHigh'),
    ext: {
        loadimpact: {
            projectID: 123456, // Replace with your Grafana Cloud project ID
            name: 'Demoblaze Load Test'
        }
    }
};

export default function () {
    const url = router.buildRoute(Routes.HOMEPAGE);

    const res = http.get(url);

    homepageResponseTime.add(res.timings.duration);


    const isStatusOk = check(res, {
        'status is 200 OK': r => r.status === HTTP_STATUS_CODES_ENUM.OK,
        'status is not 400': r => r.status !== HTTP_STATUS_CODES_ENUM.BAD_REQUEST,
        'status is not 500': r => r.status !== HTTP_STATUS_CODES_ENUM.INTERNAL_SERVER_ERROR,
    });


    const isBodyOk = check(res, {
        'body contains string': (resp: any) => resp.body?.includes("PRODUCT STORE"),
        'body size is > 1KB': (resp: any) => resp.body && resp.body.length > 1000,
    });


    const isPerformanceOk = check(res, {
        'duration < 500ms': r => r.timings.duration < 500,
        'waiting (TTFB) < 200ms': r => r.timings.waiting < 200,
        'sending < 20ms': r => r.timings.sending < 20,
        'receiving < 100ms': r => r.timings.receiving < 100,
    });

    const functionalSuccess = isStatusOk && isBodyOk && isPerformanceOk;
    errorHandler.logError(!functionalSuccess, res, {
        tags: {
            endpoint: 'homepage',
            issue: !isStatusOk ? 'status_error' : (!isBodyOk ? 'body_error' : (!isPerformanceOk ? 'performance_error' : 'unknown'))
        }
    });

    //Simple simulation as user landed on the page
    sleep(1)
}
