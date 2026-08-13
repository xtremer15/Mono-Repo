// k6 supports these 7 core executor types
export type ExecutorType =
    | 'shared-iterations'
    | 'per-vu-iterations'
    | 'constant-vus'
    | 'ramping-vus'
    | 'constant-arrival-rate'
    | 'ramping-arrival-rate'
    | 'externally-controlled';