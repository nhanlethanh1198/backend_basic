class HttpExceptions extends Error {
    public statusCode: number

    public statusMsg: string

    public msg: string

    constructor(statusCode: number, statusMsg: string, msg: any) {
        super(msg)
        this.statusCode = statusCode
        this.statusMsg = statusMsg
        this.msg = msg
    }
}

export default HttpExceptions