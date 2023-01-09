import { Router, Request, Response, NextFunction } from 'express'

import AuthService from '@/services/auth.service'
import Controller from '@/interfaces/controller.interface'

import Validate from '@/validations/user.validation'
import validationMiddleware from '@/middlewares/validation.middleware'

import HttpException from '@/utils/exceptions/http.exceptions'

// api constant
import ConstantAPI from '@/constants/api.constant'

// message constant
import ConstantMessage from '@/constants/message.constant'

// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'

// logger
import logger from '@/utils/logger.util'

class AuthController implements Controller {
    public path: string
    public router: Router
    private authService: AuthService
    private validate: Validate

    constructor() {
        this.path = ConstantAPI.AUTH
        this.router = Router()
        this.authService = new AuthService()
        this.validate = new Validate()

        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${ConstantAPI.AUTH_REGISTER}`,
            validationMiddleware(this.validate.register),
            this.register,
        )

        this.router.post(
            `${this.path}${ConstantAPI.AUTH_LOGIN}`,
            validationMiddleware(this.validate.login),
            this.login,
        )
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { username, name, email, password, phone, address } = req.body

            const usernameValidated = this.validate.validateUsername(username)
            if (!usernameValidated) {
                return next(
                    new HttpException(
                        ConstantHttpCode.CONFLICT,
                        ConstantHttpReason.CONFLICT,
                        ConstantMessage.USERNAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`username ${username} is valid`)

            const nameValidated = this.validate.validateName(name)
            if (!nameValidated) {
                return next(
                    new HttpException(
                        ConstantHttpCode.CONFLICT,
                        ConstantHttpReason.CONFLICT,
                        ConstantMessage.NAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`name ${name} is valid`)

            const emailValidated = this.validate.validateEmail(email)
            if (!emailValidated) {
                return next(
                    new HttpException(
                        ConstantHttpCode.CONFLICT,
                        ConstantHttpReason.CONFLICT,
                        ConstantMessage.EMAIL_NOT_VALID,
                    ),
                )
            }
            logger.info(`email ${email} is valid`)

            const passwordValidated = this.validate.validatePassword(password)
            if (!passwordValidated) {
                return next(
                    new HttpException(
                        ConstantHttpCode.CONFLICT,
                        ConstantHttpReason.CONFLICT,
                        ConstantMessage.PASSWORD_NOT_VALID,
                    ),
                )
            }
            logger.info(`password ${password} is valid`)

            const phoneValidated = this.validate.validatePhone(phone)
            if (!phoneValidated) {
                return next(
                    new HttpException(
                        ConstantHttpCode.CONFLICT,
                        ConstantHttpReason.CONFLICT,
                        ConstantMessage.PHONE_NOT_VALID,
                    ),
                )
            }
            logger.info(`phone ${phone} is valid`)

            const addressValidated = this.validate.validateAddress(address)
            if (!addressValidated) {
                return next(
                    new HttpException(
                        ConstantHttpCode.CONFLICT,
                        ConstantHttpReason.CONFLICT,
                        ConstantMessage.ADDRESS_NOT_VALID,
                    ),
                )
            }
            logger.info(`address ${address} is valid`)

            const usernameCheck = await this.authService.findByUsername(username)
            if (usernameCheck) {
                return next(
                    new HttpException(
                        ConstantHttpCode.CONFLICT,
                        ConstantHttpReason.CONFLICT,
                        ConstantMessage.USERNAME_EXIST,
                    ),
                )
            }

            const emailCheck = await this.authService.findByEmail(email)
            if (emailCheck) {
                return next(
                    new HttpException(
                        ConstantHttpCode.CONFLICT,
                        ConstantHttpReason.CONFLICT,
                        ConstantMessage.EMAIL_EXIST,
                    ),
                )
            }

            const phoneCheck = await this.authService.findByPhone(phone)
            if (phoneCheck) {
                return next(
                    new HttpException(
                        ConstantHttpCode.CONFLICT,
                        ConstantHttpReason.CONFLICT,
                        ConstantMessage.PHONE_EXIST,
                    ),
                )
            }

            const newUserData = {
                username,
                name,
                email,
                password,
                phone,
                address,
            }

            const user = await this.authService.createUser(newUserData)
            if (!user) {
                return next(
                    new HttpException(
                        ConstantHttpCode.CONFLICT,
                        ConstantHttpReason.CONFLICT,
                        ConstantMessage.USER_NOT_CREATE,
                    ),
                )
            }

            const newUser = { ...user }._doc

            logger.info({ newUserpassword: newUser.password })

            delete newUser.password

            logger.info({ newUserpassword: newUser.password })

            return res.status(ConstantHttpCode.CREATED).json({
                status: {
                    code: ConstantHttpCode.CREATED,
                    msg: ConstantHttpReason.CREATED,
                },
                msg: ConstantMessage.USER_CREATE_SUCCESS,
                data: newUser,
            })
        } catch (err: any) {
            return next(
                new HttpException(
                    ConstantHttpCode.INTERNAL_SERVER_ERROR,
                    ConstantHttpReason.INTERNAL_SERVER_ERROR,
                    err.message,
                ),
            )
        }
    }

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body

            const emailValidated = this.validate.validateEmail(email)
            if (!emailValidated) {
                return next(
                    new HttpException(
                        ConstantHttpCode.INTERNAL_SERVER_ERROR,
                        ConstantHttpReason.INTERNAL_SERVER_ERROR,
                        ConstantMessage.EMAIL_NOT_VALID,
                    ),
                )
            }
            logger.info(`email ${email} is valid`)

            const passwordValidated = this.validate.validatePassword(password)
            if (!passwordValidated) {
                return next(
                    new HttpException(
                        ConstantHttpCode.INTERNAL_SERVER_ERROR,
                        ConstantHttpReason.INTERNAL_SERVER_ERROR,
                        ConstantMessage.PASSWORD_NOT_VALID,
                    ),
                )
            }
            logger.info(`password ${password} is valid`)

            const user = await this.authService.findByEmailWithPassword(email)
            if (!user) {
                return next(
                    new HttpException(
                        ConstantHttpCode.INTERNAL_SERVER_ERROR,
                        ConstantHttpReason.INTERNAL_SERVER_ERROR,
                        ConstantMessage.USER_NOT_FOUND,
                    ),
                )
            }

            const isMatch = this.authService.comparePassword(password, user.password)
            if (!isMatch) {
                return next(
                    new HttpException(
                        ConstantHttpCode.INTERNAL_SERVER_ERROR,
                        ConstantHttpReason.INTERNAL_SERVER_ERROR,
                        ConstantMessage.PASSWORD_NOT_MATCH,
                    ),
                )
            }

            const accessToken = await this.authService.generateAccessToken(
                user.id,
                user.isAdmin,
            )
            logger.info(`accessToken: ${accessToken}`)

            const newUser = { ...user }._doc

            logger.info({ newUserpassword: newUser.password })

            delete newUser.password

            logger.info({ newUserpassword: newUser.password })

            return res.status(ConstantHttpCode.OK).json({
                status: {
                    code: ConstantHttpCode.OK,
                    msg: ConstantHttpReason.OK,
                },
                msg: ConstantMessage.USER_LOGIN_SUCCESS,
                data: {
                    user: newUser,
                    accessToken,
                },
            })
        } catch (err: any) {
            return next(
                new HttpException(
                    ConstantHttpCode.INTERNAL_SERVER_ERROR,
                    ConstantHttpReason.INTERNAL_SERVER_ERROR,
                    err.message,
                ),
            )
        }
    }
}

export default AuthController