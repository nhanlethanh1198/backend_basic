import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

import Variable from '@/env/variable.env'

class UserSecurity {
    public encrypt(password: string): string {
        return CryptoJS.AES.encrypt(password, Variable.PASS_SECRET).toString()
    }

    public decrypt(password: string): string {
        return CryptoJS.AES.decrypt(password, Variable.PASS_SECRET).toString(
            CryptoJS.enc.Utf8,
        )
    }

    public comparePassword(password: string, decryptedPassword: string): boolean {
        return password === this.decrypt(decryptedPassword)
    }

    public generateAccessToken(id: string, isAdmin: boolean): string {
        const token = jwt.sign({ id, isAdmin }, Variable.JWT_SECRET, {
            expiresIn: '3d',
        })

        return `Bearer ${token}`
    }
}

export default UserSecurity