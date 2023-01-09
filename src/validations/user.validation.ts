import Joi from 'joi'
import ConstantRegex from '@/constants/regex.constant'

class UserValidation {
    public register = Joi.object({
        username: Joi.string().max(30).required(),
        name: Joi.string().max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
        phone: Joi.string().min(10).max(15).required(),
        address: Joi.string().max(100).required(),
    })

    public login = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
    })

    public updateUsername = Joi.object({
        username: Joi.string().max(30).required(),
        password: Joi.string().min(6).max(30).required(),
    })

    public updateName = Joi.object({
        name: Joi.string().max(30).required(),
        password: Joi.string().min(6).max(30).required(),
    })

    public updateEmail = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
    })

    public updatePassword = Joi.object({
        oldPassword: Joi.string().min(6).max(30).required(),
        newPassword: Joi.string().min(6).max(30).required(),
        confirmPassword: Joi.string().min(6).max(30).required(),
    })

    public updatePhone = Joi.object({
        phone: Joi.string().min(10).max(15).required(),
        password: Joi.string().min(6).max(30).required(),
    })

    public updateAddress = Joi.object({
        address: Joi.string().max(100).required(),
        password: Joi.string().min(6).max(30).required(),
    })

    public deleteUser = Joi.object({
        password: Joi.string().min(6).max(30).required(),
    })

    public validateUsername(username: string): boolean {
        return ConstantRegex.USERNAME.test(username)
    }

    public validateName(name: string): boolean {
        return ConstantRegex.NAME.test(name)
    }

    public validateEmail(email: string): boolean {
        return ConstantRegex.EMAIL.test(email)
    }

    public validatePassword(password: string): boolean {
        return ConstantRegex.PASSWORD.test(password)
    }

    public validatePhone(phone: string): boolean {
        return ConstantRegex.PHONE.test(phone)
    }

    public validateAddress(address: string): boolean {
        return ConstantRegex.ADDRESS.test(address)
    }
}

export default UserValidation