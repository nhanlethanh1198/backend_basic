import UserRepository from '@/repositories/user.repository'
import UserSecurity from '@/security/user.security'

class UserService {
    private userRepository: UserRepository
    private userSecurity: UserSecurity

    constructor() {
        this.userRepository = new UserRepository()
        this.userSecurity = new UserSecurity()
    }

    public comparePassword(password: string, encryptedPassword: string): boolean {
        return this.userSecurity.comparePassword(password, encryptedPassword)
    }

    public async findAll(): Promise<any> {
        const users = await this.userRepository.findAll()
        return users
    }

    public async findById(id: string): Promise<any> {
        const user = await this.userRepository.findById(id)
        return user
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

    public async findByIdWithPassword(id: string): Promise<any> {
        const user = await this.userRepository.findByIdWithPassword(id)
        return user
    }

    public async updateUsername(id: string, username: string): Promise<any> {
        const user = await this.userRepository.updateUsername(id, username)
        return user
    }

    public async updateName(id: string, name: string): Promise<any> {
        const user = await this.userRepository.updateName(id, name)
        return user
    }

    public async updateEmail(id: string, email: string): Promise<any> {
        const user = await this.userRepository.updateEmail(id, email)
        return user
    }

    public async updatePassword(id: string, password: string): Promise<any> {
        const encryptedPassword = this.userSecurity.encrypt(password)
        const user = await this.userRepository.updatePassword(id, encryptedPassword)
        return user
    }

    public async updatePhone(id: string, phone: string): Promise<any> {
        const user = await this.userRepository.updatePhone(id, phone)
        return user
    }

    // public async updateAddress(id: string, address: string): Promise<any> {
    //     const user = await this.userRepository.updateAddress(id, address)
    //     return user
    // }

    public async deleteUser(id: string): Promise<any> {
        const user = await this.userRepository.deleteUser(id)
        return user
    }

    public async getUsersStats(): Promise<any> {
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        const usersStats = await this.userRepository.getUsersStats(lastYear)
        return usersStats
    }
}

export default UserService