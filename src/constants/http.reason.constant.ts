class HttpReason {
    public static readonly CONTINUE: string = 'Continue'

    public static readonly SWITCHING_PROTOCOLS: string = 'Switching Protocols'

    public static readonly PROCESSING: string = 'Processing'

    public static readonly OK: string = 'OK'

    public static readonly CREATED: string = 'Created'

    public static readonly ACCEPTED: string = 'Accepted'

    public static readonly NON_AUTHORITATIVE_INFORMATION: string =
        'Non-Authoritative Information'

    public static readonly NO_CONTENT: string = 'No Content'

    public static readonly RESET_CONTENT: string = 'Reset Content'

    public static readonly PARTIAL_CONTENT: string = 'Partial Content'

    public static readonly MULTI_STATUS: string = 'Multi-Status'

    public static readonly ALREADY_REPORTED: string = 'Already Reported'

    public static readonly IM_USED: string = 'IM Used'

    public static readonly MULTIPLE_CHOICES: string = 'Multiple Choices'

    public static readonly MOVED_PERMANENTLY: string = 'Moved Permanently'

    public static readonly MOVED_TEMPORARILY: string = 'Moved Temporarily'

    public static readonly SEE_OTHER: string = 'See Other'

    public static readonly NOT_MODIFIED: string = 'Not Modified'

    public static readonly USE_PROXY: string = 'Use Proxy'

    public static readonly SWITCH_PROXY: string = 'Switch Proxy'

    public static readonly TEMPORARY_REDIRECT: string = 'Temporary Redirect'

    public static readonly BAD_REQUEST: string = 'Bad Request'

    public static readonly UNAUTHORIZED: string = 'Unauthorized'

    public static readonly PAYMENT_REQUIRED: string = 'Payment Required'

    public static readonly FORBIDDEN: string = 'Forbidden'

    public static readonly NOT_FOUND: string = 'Not Found'

    public static readonly METHOD_NOT_ALLOWED: string = 'Method Not Allowed'

    public static readonly NOT_ACCEPTABLE: string = 'Not Acceptable'

    public static readonly PROXY_AUTHENTICATION_REQUIRED: string =
        'Proxy Authentication Required'

    public static readonly REQUEST_TIMEOUT: string = 'Request Timeout'

    public static readonly CONFLICT: string = 'Conflict'

    public static readonly GONE: string = 'Gone'

    public static readonly LENGTH_REQUIRED: string = 'Length Required'

    public static readonly PRECONDITION_FAILED: string = 'Precondition Failed'

    public static readonly PAYLOAD_TOO_LARGE: string = 'Payload Too Large'

    public static readonly REQUEST_URI_TOO_LONG: string = 'Request URI Too Long'

    public static readonly UNSUPPORTED_MEDIA_TYPE: string =
        'Unsupported Media Type'

    public static readonly REQUESTED_RANGE_NOT_SATISFIABLE: string =
        'Requested Range Not Satisfiable'

    public static readonly EXPECTATION_FAILED: string = 'Expectation Failed'

    public static readonly IM_A_TEAPOT: string = "I'm a teapot"

    public static readonly METHOD_FAILURE: string = 'Method Failure'

    public static readonly MISDIRECTED_REQUEST: string = 'Misdirected Request'

    public static readonly UNPROCESSABLE_ENTITY: string = 'Unprocessable Entity'

    public static readonly LOCKED: string = 'Locked'

    public static readonly FAILED_DEPENDENCY: string = 'Failed Dependency'

    public static readonly UPGRADE_REQUIRED: string = 'Upgrade Required'

    public static readonly PRECONDITION_REQUIRED: string = 'Precondition Required'

    public static readonly TOO_MANY_REQUESTS: string = 'Too Many Requests'

    public static readonly REQUEST_HEADER_FIELDS_TOO_LARGE: string =
        'Request Header Fields Too Large'

    public static readonly UNAVAILABLE_FOR_LEGAL_REASONS: string =
        'Unavailable For Legal Reasons'

    public static readonly INTERNAL_SERVER_ERROR: string = 'Internal Server Error'

    public static readonly NOT_IMPLEMENTED: string = 'Not Implemented'

    public static readonly BAD_GATEWAY: string = 'Bad Gateway'

    public static readonly SERVICE_UNAVAILABLE: string = 'Service Unavailable'

    public static readonly GATEWAY_TIMEOUT: string = 'Gateway Timeout'

    public static readonly HTTP_VERSION_NOT_SUPPORTED: string =
        'HTTP Version Not Supported'

    public static readonly VARIANT_ALSO_NEGOTIATES: string =
        'Variant Also Negotiates'

    public static readonly INSUFFICIENT_STORAGE: string = 'Insufficient Storage'

    public static readonly LOOP_DETECTED: string = 'Loop Detected'

    public static readonly NOT_EXTENDED: string = 'Not Extended'

    public static readonly NETWORK_AUTHENTICATION_REQUIRED: string =
        'Network Authentication Required'

    public static readonly NETWORK_CONNECT_TIMEOUT_ERROR: string =
        'Network Connect Timeout Error'
}

export default HttpReason