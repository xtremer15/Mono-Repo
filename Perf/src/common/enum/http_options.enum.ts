export enum HTTP_OPTIONS_ENUM {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
}

export enum HTTP_STATUS_CODES_ENUM {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export enum HTTP_HEADERS_ENUM {
    CONTENT_TYPE = "application/json",
    ACCEPT = "*/*",
    CACHE_CONTROL = "no-cache",
    CONNECTION = "keep-alive",
    HOST = "Host",
    USER_AGENT = "User-Agent",
    X_REQUESTED_WITH = "X-Requested-With",
}