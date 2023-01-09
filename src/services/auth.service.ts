import UserRepository from '@/repositories/user.repository'
import UserSecurity from '@/security/user.security'

class AuthService {
    private userRepository: UserRepository
    private userSecurity: UserSecurity

    constructor() {
        this.userRepository = new UserRepository()
        this.userSecurity = new UserSecurity()
    }

    public async findByUsername(username: string): Promise<any> {
        const user = await this.userRepository.findByUsername(username)
        return user
    }

    public async findByEmail(email: string): Promise<any> {
        const user = await this.userRepository.findByEmail(email)
        return user
    }

    public async findByPhone(phone: string): Promise<any> {
        const user = await this.userRepository.findByPhone(phone)
        return user
    }

    public async findByEmailWithPassword(email: string): Promise<any> {
        const user = await this.userRepository.findByEmailWithPassword(email)
        return user
    }

    public comparePassword(password: string, decryptedPassword: string): boolean {
        return this.userSecurity.comparePassword(password, decryptedPassword)
    }

    public async createUser(user: any): Promise<any> {
        const encryptedPassword = this.userSecurity.encrypt(user.password)
        const newUser = {
            username: user.username,
            name: user.name,
            email: user.email,
            password: encryptedPassword,
            phone: user.phone,
            address: user.address,
            isAdmin: user.isAdmin,
        }
        const savedUser = await this.userRepository.createUser(newUser)
        return savedUser
    }

    public async generateAccessToken(
        id: string,
        isAdmin: boolean,
    ): Promise<string> {
        const token = this.userSecurity.generateAccessToken(id, isAdmin)
        return token
    }
}

export default AuthService