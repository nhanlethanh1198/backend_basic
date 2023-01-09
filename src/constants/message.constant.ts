class Message {
    public static readonly API_WORKING: string = 'API is working'

    public static readonly SOMETHING_WENT_WRONG: string = 'Something went wrong'

    // auth
    public static readonly USERNAME_NOT_VALID: string = 'username is not valid'
    public static readonly NAME_NOT_VALID: string = 'name is not valid'
    public static readonly EMAIL_NOT_VALID: string = 'email is not valid'
    public static readonly PASSWORD_NOT_VALID: string = 'password is not valid'
    public static readonly PHONE_NOT_VALID: string = 'phone is not valid'
    public static readonly ADDRESS_NOT_VALID: string = 'address is not valid'
    public static readonly USERNAME_EXIST: string = 'username is exist'
    public static readonly EMAIL_EXIST: string = 'email is exist'
    public static readonly PHONE_EXIST: string = 'phone is exist'
    public static readonly USER_NOT_CREATE: string =
        'user is not create, please try again'
    public static readonly USER_CREATE_SUCCESS: string =
        'user is create success, please login'
    public static readonly USER_NOT_FOUND: string = 'user is not found'
    public static readonly PASSWORD_NOT_MATCH: string = 'password is not match'
    public static readonly USER_LOGIN_SUCCESS: string = 'user is login success'

    // token
    public static readonly TOKEN_NOT_VALID: string = 'Token not valid'
    public static readonly NOT_AUTHENTICATED: string = 'Not authenticated'
    public static readonly UNAUTHORIZED: string = 'Unauthorized'
    public static readonly NOT_ALLOWED: string = 'Not allowed'

    // user
    public static readonly USERNAME_NOT_CHANGE: string = 'username is not change'
    public static readonly USERNAME_CHANGE_SUCCESS: string =
        'username is change success'
    public static readonly NAME_NOT_CHANGE: string = 'name is not change'
    public static readonly NAME_CHANGE_SUCCESS: string = 'name is change success'
    public static readonly EMAIL_NOT_CHANGE: string = 'email is not change'
    public static readonly EMAIL_CHANGE_SUCCESS: string =
        'email is change success'
    public static readonly PASSWORD_NOT_CHANGE: string = 'password is not change'
    public static readonly PASSWORD_CHANGE_SUCCESS: string =
        'password is change success'
    public static readonly PHONE_NOT_CHANGE: string = 'phone is not change'
    public static readonly PHONE_CHANGE_SUCCESS: string =
        'phone is change success'
    public static readonly ADDRESS_NOT_CHANGE: string = 'address is not change'
    public static readonly ADDRESS_CHANGE_SUCCESS: string =
        'address is change success'
    public static readonly USER_NOT_DELETE: string =
        'user is not delete, please try again'
    public static readonly USER_DELETE_SUCCESS: string = 'user is delete success'
    public static readonly USER_FOUND: string = 'user is found'
}
export default Message