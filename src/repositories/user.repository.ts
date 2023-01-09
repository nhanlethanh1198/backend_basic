
import User from '@/models/user.model'
import UserInterface from '@/interfaces/user.interface'

class UserRepository {
    public async findAll(): Promise<UserInterface[]> {
        const users = await User.find({}).select('-password')
        return users
    }

    public async findById(id: string): Promise<UserInterface | null> {
        const user = await User.findById(id).select('-password')
        return user
    }

    public async findByUsername(username: string): Promise<UserInterface | null> {
        const user = await User.findOne({ username }).select('-password')
        return user
    }

    public async findByEmail(email: string): Promise<UserInterface | null> {
        const user = await User.findOne({ email }).select('-password')
        return user
    }

    public async findByPhone(phone: string): Promise<UserInterface | null> {
        const user = await User.findOne({ phone }).select('-password')
        return user
    }

    public async findByIdWithPassword(id: string): Promise<UserInterface | null> {
        const user = await User.findById(id)
        return user
    }

    public async findByUsernameWithPassword(
        username: string,
    ): Promise<UserInterface | null> {
        const user = await User.findOne({ username })
        return user
    }

    public async findByEmailWithPassword(
        email: string,
    ): Promise<UserInterface | null> {
        const user = await User.findOne({ email })
        return user
    }

    public async findByPhoneWithPassword(
        phone: string,
    ): Promise<UserInterface | null> {
        const user = await User.findOne({ phone })
        return user
    }

    public async createUser(user: any): Promise<UserInterface | null> {
        const newUser = new User({
            username: user.username,
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            address: user.address,
            isAdmin: user.isAdmin,
        })
        const savedUser = await newUser.save()
        return savedUser
    }

    public async updateUsername(
        id: string,
        username: string,
    ): Promise<UserInterface | null> {
        const user = await User.findByIdAndUpdate(
            id,
            { username },
            { new: true },
        ).select('-password')
        return user
    }

    public async updateName(
        id: string,
        name: string,
    ): Promise<UserInterface | null> {
        const user = await User.findByIdAndUpdate(
            id,
            { name },
            { new: true },
        ).select('-password')
        return user
    }

    public async updateEmail(
        id: string,
        email: string,
    ): Promise<UserInterface | null> {
        const user = await User.findByIdAndUpdate(
            id,
            { email },
            { new: true },
        ).select('-password')
        return user
    }

    public async updatePassword(
        id: string,
        password: string,
    ): Promise<UserInterface | null> {
        const user = await User.findByIdAndUpdate(
            id,
            { password },
            { new: true },
        ).select('-password')
        return user
    }

    public async updatePhone(
        id: string,
        phone: string,
    ): Promise<UserInterface | null> {
        const user = await User.findByIdAndUpdate(
            id,
            { phone },
            { new: true },
        ).select('-password')
        return user
    }

    public async updateAddress(
        id: string,
        address: string,
    ): Promise<UserInterface | null> {
        const user = await User.findByIdAndUpdate(
            id,
            { address },
            { new: true },
        ).select('-password')
        return user
    }

    public async deleteUser(id: string): Promise<UserInterface | null> {
        const user = await User.findByIdAndDelete(id)
        return user
    }

    public async getUsersStats(lastYear: Date): Promise<UserInterface[] | null> {
        const users = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                },
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 },
                },
            },
        ])
        return users
    }
}

export default UserRepository