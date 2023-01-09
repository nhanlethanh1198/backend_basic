class HttpCode {
    public static readonly CONTINUE: number = 100

    public static readonly SWITCHING_PROTOCOLS: number = 101

    public static readonly PROCESSING: number = 102

    public static readonly OK: number = 200

    public static readonly CREATED: number = 201

    public static readonly ACCEPTED: number = 202

    public static readonly NON_AUTHORITATIVE_INFORMATION: number = 203

    public static readonly NO_CONTENT: number = 204

    public static readonly RESET_CONTENT: number = 205

    public static readonly PARTIAL_CONTENT: number = 206

    public static readonly MULTI_STATUS: number = 207

    public static readonly ALREADY_REPORTED: number = 208

    public static readonly IM_USED: number = 226

    public static readonly MULTIPLE_CHOICES: number = 300

    public static readonly MOVED_PERMANENTLY: number = 301

    public static readonly MOVED_TEMPORARILY: number = 302

    public static readonly SEE_OTHER: number = 303

    public static readonly NOT_MODIFIED: number = 304

    public static readonly USE_PROXY: number = 305

    public static readonly SWITCH_PROXY: number = 306

    public static readonly TEMPORARY_REDIRECT: number = 307

    public static readonly BAD_REQUEST: number = 400

    public static readonly UNAUTHORIZED: number = 401

    public static readonly PAYMENT_REQUIRED: number = 402

    public static readonly FORBIDDEN: number = 403

    public static readonly NOT_FOUND: number = 404

    public static readonly METHOD_NOT_ALLOWED: number = 405

    public static readonly NOT_ACCEPTABLE: number = 406

    public static readonly PROXY_AUTHENTICATION_REQUIRED: number = 407

    public static readonly REQUEST_TIMEOUT: number = 408

    public static readonly CONFLICT: number = 409

    public static readonly GONE: number = 410

    public static readonly LENGTH_REQUIRED: number = 411

    public static readonly PRECONDITION_FAILED: number = 412

    public static readonly PAYLOAD_TOO_LARGE: number = 413

    public static readonly REQUEST_URI_TOO_LONG: number = 414

    public static readonly UNSUPPORTED_MEDIA_TYPE: number = 415

    public static readonly REQUESTED_RANGE_NOT_SATISFIABLE: number = 416

    public static readonly EXPECTATION_FAILED: number = 417

    public static readonly IM_A_TEAPOT: number = 418

    public static readonly METHOD_FAILURE: number = 420

    public static readonly MISDIRECTED_REQUEST: number = 421

    public static readonly UNPROCESSABLE_ENTITY: number = 422

    public static readonly LOCKED: number = 423

    public static readonly FAILED_DEPENDENCY: number = 424

    public static readonly UPGRADE_REQUIRED: number = 426

    public static readonly PRECONDITION_REQUIRED: number = 428

    public static readonly TOO_MANY_REQUESTS: number = 429

    public static readonly REQUEST_HEADER_FIELDS_TOO_LARGE: number = 431

    public static readonly UNAVAILABLE_FOR_LEGAL_REASONS: number = 451

    public static readonly INTERNAL_SERVER_ERROR: number = 500

    public static readonly NOT_IMPLEMENTED: number = 501

    public static readonly BAD_GATEWAY: number = 502

    public static readonly SERVICE_UNAVAILABLE: number = 503

    public static readonly GATEWAY_TIMEOUT: number = 504

    public static readonly HTTP_VERSION_NOT_SUPPORTED: number = 505

    public static readonly VARIANT_ALSO_NEGOTIATES: number = 506

    public static readonly INSUFFICIENT_STORAGE: number = 507

    public static readonly LOOP_DETECTED: number = 508

    public static readonly NOT_EXTENDED: number = 510

    public static readonly NETWORK_AUTHENTICATION_REQUIRED: number = 511

    public static readonly NETWORK_CONNECT_TIMEOUT_ERROR: number = 599
}

export default HttpCode