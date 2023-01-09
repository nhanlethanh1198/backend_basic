class Api {
    public static readonly ROOT: string = '/'

    public static readonly API: string = '/api'


    // auth
    public static readonly AUTH: string = '/auth'
    public static readonly AUTH_REGISTER: string = '/register'
    public static readonly AUTH_LOGIN: string = '/login'

    // users
    public static readonly USERS: string = '/users'
    public static readonly USER_UPDATE_USERNAME: string = '/update-username/:id'
    public static readonly USER_UPDATE_NAME: string = '/update-name/:id'
    public static readonly USER_UPDATE_EMAIL: string = '/update-email/:id'
    public static readonly USER_UPDATE_PASSWORD: string = '/update-password/:id'
    public static readonly USER_UPDATE_PHONE: string = '/update-phone/:id'
    public static readonly USER_UPDATE_ADDRESS: string = '/update-address/:id'
    public static readonly USER_DELETE: string = '/delete/:id'
    public static readonly USER_GET: string = '/find/:id'
    public static readonly USER_GET_ALL: string = '/'
    public static readonly USER_GET_ALL_STATS: string = '/stats'
}

export default Api