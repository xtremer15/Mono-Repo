export interface ThresholdsConfig {
    http_req_failed?: string[];
    http_req_duration?: string[];
    http_req_waiting?: string[];
    http_req_connecting?: string[];
    http_req_sending?: string[];
    http_req_receiving?: string[];
    http_req_blocked?: string[];
    http_req_tls_handshaking?: string[];
    iteration_duration?: string[];
    checks?: string[];
}