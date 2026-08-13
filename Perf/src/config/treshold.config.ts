import { ThresholdsConfig } from "../common/interfaces/treshold.interface";

export const DefaultThresholds: ThresholdsConfig = {
    // Error rates
    http_req_failed: ['rate<0.01'],   // Error rate should be less than 1%
    http_req_duration: ['p(95)<500', 'p(99)<300', 'avg<300'],

    //Response time 
    // Core Network & Backend Thresholds
    http_req_waiting: ['p(95)<200'],      // TTFB should be fast
    http_req_connecting: ['p(95)<50'],    // TCP connection should be quick
    http_req_sending: ['p(95)<20'],       // Sending data should be near instant
    http_req_receiving: ['p(95)<100'],    // Receiving payload
    http_req_blocked: ['p(95)<50'],       // Free TCP slots
    http_req_tls_handshaking: ['p(95)<100'], // SSL Handshake

    // Iteration loop
    iteration_duration: ['p(95)<2000'],   // Full loop including sleeps

    // Checks
    checks: ['rate>0.95'],
};
