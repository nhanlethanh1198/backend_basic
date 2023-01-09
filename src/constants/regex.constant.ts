class Regex {
    public static readonly USERNAME = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,32}$/
    public static readonly EMAIL =
        /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    public static readonly PASSWORD =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    public static readonly NAME = /^[a-zA-Z ]{2,35}$/
    public static readonly PHONE =
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/
    public static readonly ADDRESS = /^[a-zA-Z0-9\s,'-]{10,200}$/
}

export default Regex