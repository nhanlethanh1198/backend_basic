class Api {
    public static readonly DEFAULT_PAGE_SIZE: number = 10

    public static readonly ROOT: string = '/'

    public static readonly API: string = '/api'

    public static readonly HOOK: string = '/hook'


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

//
// const ConstantAPI = {
//     ROOT: '/',
//     API: '/api',
//     HOOK: '/hook',
//     AUTH: '/auth',
//     AUTH_REGISTER: '/register',
//     AUTH_LOGIN: '/login',
//     USERS: '/users',
//     USER_UPDATE_USERNAME: '/update-username/:id',
//     USER_UPDATE_NAME: '/update-name/:id',
//     USER_UPDATE_EMAIL: '/update-email/:id',
//     USER_UPDATE_PASSWORD: '/update-password/:id',
//     USER_UPDATE_PHONE: '/update-phone/:id',
//     USER_UPDATE_ADDRESS: '/update-address/:id',
//     USER_DELETE: '/delete/:id',
//     USER_GET: '/find/:id',
//     USER_GET_ALL: '/',
//     USER_GET_ALL_STATS: '/stats',
//
// }

export default Api