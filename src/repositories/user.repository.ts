// import User from "@/models/mongo/user.model";
// import UserInterface from "@/interfaces/user.interface";
import User from '@/models/pg/user.pg.model'
import { sequelize } from '@/config/sql.config'

class UserRepository {
  public async findAll(): Promise<User[]> {
    const users = await User.findAll({})
    return users
  }

  public async findById(id: string): Promise<User | null> {
    const user = await User.findByPk(id)
    return user
  }

  public async findByUsername(username: string): Promise<User | null> {
    const user = await User.findOne({
      where: {
        username,
      },
    })
    return user
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({
      where: {
        email,
      },
    })
    return user
  }

  public async findByPhone(phone: string): Promise<User | null> {
    const user = await User.findOne({
      where: { phone },
    })
    return user
  }

  public async findByIdWithPassword(id: string): Promise<User | null> {
    const user = await User.findByPk(id)
    return user
  }

  public async findByUsernameWithPassword(
    username: string,
  ): Promise<User | null> {
    const user = await User.findOne({ where: { username } })
    return user
  }

  public async findByEmailWithPassword(
    email: string,
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } })
    return user
  }

  public async findByPhoneWithPassword(
    phone: string,
  ): Promise<User | null> {
    const user = await User.findOne({ where: { phone } })
    return user
  }

  public async createUser(user: any): Promise<User | null> {
    try {
      const result = await sequelize.transaction(async (transaction) => {
        const newUser = await User.create({
          username: user.username,
          last_name: user.last_name,
          email: user.email,
          password: user.password,
          phone: user.phone,
          is_admin: user.is_admin,
        }, {
          transaction,
        })

        return newUser
      })

      return result
    } catch (e) {
      return null
    }
  }

  public async updateUsername(
    id: string,
    username: string,
  ): Promise<User | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await User.update({
          username,
        }, {
          where: {
            id,
          },
          transaction,
        })

        return await User.findByPk(id)
      })
    } catch (e) {
      return null
    }
  }

  public async updateName(
    id: string,
    last_name: string,
  ): Promise<User | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await User.update({
          last_name,
        }, {
          where: {
            id,
          },
          transaction,
        })

        return await User.findByPk(id)
      })
    } catch (e) {
      return null
    }
  }

  public async updateEmail(
    id: string,
    email: string,
  ): Promise<User | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await User.update({
          email,
        }, {
          where: {
            id,
          },
          transaction,
        })

        return await User.findByPk(id)
      })
    } catch (e) {
      return null
    }
  }

  public async updatePassword(
    id: string,
    password: string,
  ): Promise<User | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await User.update({
          password,
        }, {
          where: {
            id,
          },
          transaction,
        })

        return await User.findByPk(id)
      })
    } catch (e) {
      return null
    }
  }

  public async updatePhone(
    id: string,
    phone: string,
  ): Promise<User | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await User.update({
          phone,
        }, {
          where: {
            id,
          },
          transaction,
        })

        return await User.findByPk(id)
      })
    } catch (e) {
      return null
    }
  }

  // public async updateAddress(
  //     id: string,
  //     address: string,
  // ): Promise<User | null> {
  //   try {
  //     return await sequelize.transaction(async (transaction) => {
  //       await User.update({
  //         address
  //       }, {
  //         where: {
  //           id
  //         },
  //         transaction
  //       })
  //
  //       return await User.findByPk(id)
  //     })
  //   } catch (e) {
  //     return null
  //   }
  // }

  public async deleteUser(id: string): Promise<User | null> {
    const user = await User.findByPk(id)
    user?.destroy()
    return user
  }

  public async getUsersStats(lastYear: Date): Promise<User[] | null> {
    const users = await User.findAll()
    return users
  }
}

export default UserRepository