import { NextFunction, Request, Response, Router } from 'express'

import Controller from '@/interfaces/controller.interface'

import UserService from '@/services/user.service'
import Validate from '@/validations/user.validation'

import Authenticated from '@/middlewares/authenticated.middleware'
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

class UserController implements Controller {
    public path: string
    public router: Router
    private userService: UserService
    private authenticated: Authenticated
    private validate: Validate

    constructor() {
        this.path = ConstantAPI.USERS
        this.router = Router()
        this.userService = new UserService()
        this.authenticated = new Authenticated()
        this.validate = new Validate()

        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}${ConstantAPI.USER_UPDATE_USERNAME}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.updateUsername),
            this.updateUsername,
        )

        this.router.post(
            `${this.path}${ConstantAPI.USER_UPDATE_NAME}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.updateName),
            this.updateName,
        )

        this.router.post(
            `${this.path}${ConstantAPI.USER_UPDATE_EMAIL}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.updateEmail),
            this.updateEmail,
        )

        this.router.post(
            `${this.path}${ConstantAPI.USER_UPDATE_PASSWORD}`,
            this.authenticated.verifyTokenAndAuthorization,
            validationMiddleware(this.validate.updatePassword),
          this.updatePassword,
        )

        this.router.post(
          `${this.path}${ConstantAPI.USER_UPDATE_PHONE}`,
          this.authenticated.verifyTokenAndAuthorization,
          validationMiddleware(this.validate.updatePhone),
          this.updatePhone,
        )

        // this.router.post(
        //     `${this.path}${ConstantAPI.USER_UPDATE_ADDRESS}`,
        //     this.authenticated.verifyTokenAndAuthorization,
        //     validationMiddleware(this.validate.updateAddress
        //     this.updateAddress,
        // )

        this.router.post(
          `${this.path}${ConstantAPI.USER_DELETE}`,
          this.authenticated.verifyTokenAndAuthorization,
          validationMiddleware(this.validate.deleteUser),
          this.deleteUser,
        )

        this.router.get(
          `${this.path}${ConstantAPI.USER_GET}`,
            this.authenticated.verifyTokenAndAuthorization,
            this.getUser,
        )

        this.router.get(
            `${this.path}${ConstantAPI.USER_GET_ALL}`,
            this.authenticated.verifyTokenAndAdmin,
            this.getAllUsers,
        )

        this.router.get(
            `${this.path}${ConstantAPI.USER_GET_ALL_STATS}`,
            this.authenticated.verifyTokenAndAdmin,
            this.getUsersStats,
        )
    }

    private updateUsername = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { username, password } = req.body
            const { id } = req.params

            const user = await this.userService.findByIdWithPassword(id)
            if (!user) {
                return next(
                    new HttpException(
                        ConstantHttpCode.NOT_FOUND,
                        ConstantHttpReason.NOT_FOUND,
                        ConstantMessage.USER_NOT_FOUND,
                    ),
                )
            }
            logger.info(`user ${user.username} found`)

            const isUsernameValid = this.validate.validateUsername(username)
            if (!isUsernameValid) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.USERNAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`username ${username} is valid`)

            const isPasswordValid = this.validate.validatePassword(password)
            if (!isPasswordValid) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PASSWORD_NOT_VALID,
                    ),
                )
            }
            logger.info(`password ${password} is valid`)

            const isMatch = this.userService.comparePassword(password, user.password)
            if (!isMatch) {
                return next(
                    new HttpException(
                        ConstantHttpCode.UNAUTHORIZED,
                        ConstantHttpReason.UNAUTHORIZED,
                        ConstantMessage.PASSWORD_NOT_MATCH,
                    ),
                )
            }
            logger.info(`password ${password} match`)

            const usernameCheck = await this.userService.findByUsername(username)
            if (usernameCheck) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.USERNAME_EXIST,
                    ),
                )
            }

            if (user.username === username) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.USERNAME_NOT_CHANGE,
                    ),
                )
            }

            const updatedUser = await this.userService.updateUsername(id, username)
            if (!updatedUser) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.USERNAME_NOT_CHANGE,
                    ),
                )
            }
            logger.info(`user ${user.username} updated`)

            return res.status(ConstantHttpCode.OK).json({
                status: {
                    code: ConstantHttpCode.OK,
                    msg: ConstantHttpReason.OK,
                },
                msg: ConstantMessage.USERNAME_CHANGE_SUCCESS,
                data: {
                    user: updatedUser,
                },
            })
        } catch (err: any) {
            next(
                new HttpException(
                    ConstantHttpCode.INTERNAL_SERVER_ERROR,
                    ConstantHttpReason.INTERNAL_SERVER_ERROR,
                    err?.message,
                ),
            )
        }
    }

    private updateName = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { name, password } = req.body
            const { id } = req.params

            const user = await this.userService.findByIdWithPassword(id)
            if (!user) {
                return next(
                    new HttpException(
                        ConstantHttpCode.NOT_FOUND,
                        ConstantHttpReason.NOT_FOUND,
                        ConstantMessage.USER_NOT_FOUND,
                    ),
                )
            }
            logger.info(`user ${user.username} found`)

            const isNameValid = this.validate.validateName(name)
            if (!isNameValid) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.NAME_NOT_VALID,
                    ),
                )
            }
            logger.info(`name ${name} is valid`)

            const isPasswordValid = this.validate.validatePassword(password)
            if (!isPasswordValid) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PASSWORD_NOT_VALID,
                    ),
                )
            }
            logger.info(`password ${password} is valid`)

            const isMatch = this.userService.comparePassword(password, user.password)
            if (!isMatch) {
                return next(
                    new HttpException(
                        ConstantHttpCode.UNAUTHORIZED,
                        ConstantHttpReason.UNAUTHORIZED,
                        ConstantMessage.PASSWORD_NOT_MATCH,
                    ),
                )
            }
            logger.info(`password ${password} match`)

            if (user.name === name) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.NAME_NOT_CHANGE,
                    ),
                )
            }

            const updatedUser = await this.userService.updateName(id, name)
            if (!updatedUser) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.NAME_NOT_CHANGE,
                    ),
                )
            }
            logger.info(`user ${user.username} updated`)

            return res.status(ConstantHttpCode.OK).json({
                status: {
                    code: ConstantHttpCode.OK,
                    msg: ConstantHttpReason.OK,
                },
                msg: ConstantMessage.NAME_CHANGE_SUCCESS,
                data: {
                    user: updatedUser,
                },
            })
        } catch (err: any) {
            next(
                new HttpException(
                    ConstantHttpCode.INTERNAL_SERVER_ERROR,
                    ConstantHttpReason.INTERNAL_SERVER_ERROR,
                    err?.message,
                ),
            )
        }
    }

    private updateEmail = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body
            const { id } = req.params

            const user = await this.userService.findByIdWithPassword(id)
            if (!user) {
                return next(
                    new HttpException(
                        ConstantHttpCode.NOT_FOUND,
                        ConstantHttpReason.NOT_FOUND,
                        ConstantMessage.USER_NOT_FOUND,
                    ),
                )
            }

            const isEmailValid = this.validate.validateEmail(email)
            if (!isEmailValid) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.EMAIL_NOT_VALID,
                    ),
                )
            }

            const isPasswordValid = this.validate.validatePassword(password)
            if (!isPasswordValid) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PASSWORD_NOT_VALID,
                    ),
                )
            }

            if (user.email === email) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.EMAIL_NOT_CHANGE,
                    ),
                )
            }

            const emailCheck = await this.userService.findByEmail(email)
            if (emailCheck) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.EMAIL_EXIST,
                    ),
                )
            }

            const isMatch = this.userService.comparePassword(password, user.password)
            if (!isMatch) {
                return next(
                    new HttpException(
                        ConstantHttpCode.UNAUTHORIZED,
                        ConstantHttpReason.UNAUTHORIZED,
                        ConstantMessage.PASSWORD_NOT_MATCH,
                    ),
                )
            }

            const updatedUser = await this.userService.updateEmail(id, email)
            if (!updatedUser) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.EMAIL_NOT_CHANGE,
                    ),
                )
            }

            return res.status(ConstantHttpCode.OK).json({
                status: {
                    code: ConstantHttpCode.OK,
                    msg: ConstantHttpReason.OK,
                },
                msg: ConstantMessage.EMAIL_CHANGE_SUCCESS,
                data: {
                    user: updatedUser,
                },
            })
        } catch (err: any) {
            next(
                new HttpException(
                    ConstantHttpCode.INTERNAL_SERVER_ERROR,
                    ConstantHttpReason.INTERNAL_SERVER_ERROR,
                    err?.message,
                ),
            )
        }
    }

    private updatePassword = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body
            const { id } = req.params

            if (newPassword !== confirmPassword) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PASSWORD_NOT_MATCH,
                    ),
                )
            }

            const user = await this.userService.findByIdWithPassword(id)
            if (!user) {
                return next(
                    new HttpException(
                        ConstantHttpCode.NOT_FOUND,
                        ConstantHttpReason.NOT_FOUND,
                        ConstantMessage.USER_NOT_FOUND,
                    ),
                )
            }

            const isOldPasswordValid = this.validate.validatePassword(oldPassword)
            if (!isOldPasswordValid) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PASSWORD_NOT_VALID,
                    ),
                )
            }

            const isNewPasswordValid = this.validate.validatePassword(newPassword)
            if (!isNewPasswordValid) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PASSWORD_NOT_VALID,
                    ),
                )
            }

            const isConfirmPasswordValid =
                this.validate.validatePassword(confirmPassword)
            if (!isConfirmPasswordValid) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PASSWORD_NOT_VALID,
                    ),
                )
            }

            const isMatch = this.userService.comparePassword(
                oldPassword,
                user.password,
            )
            if (!isMatch) {
                return next(
                    new HttpException(
                        ConstantHttpCode.UNAUTHORIZED,
                        ConstantHttpReason.UNAUTHORIZED,
                        ConstantMessage.PASSWORD_NOT_MATCH,
                    ),
                )
            }

            if (oldPassword === newPassword) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PASSWORD_NOT_CHANGE,
                    ),
                )
            }

            const updatedUser = await this.userService.updatePassword(id, newPassword)
            if (!updatedUser) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PASSWORD_NOT_CHANGE,
                    ),
                )
            }

            return res.status(ConstantHttpCode.OK).json({
                status: {
                    code: ConstantHttpCode.OK,
                    msg: ConstantHttpReason.OK,
                },
                msg: ConstantMessage.PASSWORD_CHANGE_SUCCESS,
                data: {
                    user: updatedUser,
                },
            })
        } catch (err: any) {
            next(
                new HttpException(
                    ConstantHttpCode.INTERNAL_SERVER_ERROR,
                    ConstantHttpReason.INTERNAL_SERVER_ERROR,
                    err?.message,
                ),
            )
        }
    }

    private updatePhone = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { phone, password } = req.body
            const { id } = req.params

            const user = await this.userService.findByIdWithPassword(id)
            if (!user) {
                return next(
                    new HttpException(
                        ConstantHttpCode.NOT_FOUND,
                        ConstantHttpReason.NOT_FOUND,
                        ConstantMessage.USER_NOT_FOUND,
                    ),
                )
            }

            const isPhoneValid = this.validate.validatePhone(phone)
            logger.info({ isPhoneValid })
            if (!isPhoneValid) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PHONE_NOT_VALID,
                    ),
                )
            }

            const isPasswordValid = this.validate.validatePassword(password)
            if (!isPasswordValid) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PASSWORD_NOT_VALID,
                    ),
                )
            }

            const phoneCheck = await this.userService.findByPhone(phone)
            if (phoneCheck) {
                return next(
                    new HttpException(
                        ConstantHttpCode.NOT_FOUND,
                        ConstantHttpReason.NOT_FOUND,
                        ConstantMessage.PHONE_EXIST,
                    ),
                )
            }

            const isMatch = this.userService.comparePassword(password, user.password)
            if (!isMatch) {
                return next(
                    new HttpException(
                        ConstantHttpCode.UNAUTHORIZED,
                        ConstantHttpReason.UNAUTHORIZED,
                        ConstantMessage.PASSWORD_NOT_MATCH,
                    ),
                )
            }

            if (user.phone === phone) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PHONE_NOT_CHANGE,
                    ),
                )
            }

            const updatedUser = await this.userService.updatePhone(id, phone)
            if (!updatedUser) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PHONE_NOT_CHANGE,
                    ),
                )
            }

            return res.status(ConstantHttpCode.OK).json({
                status: {
                    code: ConstantHttpCode.OK,
                    msg: ConstantHttpReason.OK,
                },
                msg: ConstantMessage.PHONE_CHANGE_SUCCESS,
                data: {
                    user: updatedUser,
                },
            })
        } catch (err: any) {
            next(
              new HttpException(
                ConstantHttpCode.INTERNAL_SERVER_ERROR,
                ConstantHttpReason.INTERNAL_SERVER_ERROR,
                err?.message,
              ),
            )
        }
    }

    // updateAddress = async (
    //     req: Request,
    //     res: Response,
    //     
    // ): Promise<Response | void> => {
    //     try {
    //         const { address, password } = req.body
    //         const { id } = req.params
    //
    //         const user = await this.userService.findByIdWithPassword(id)
    //         if (!user) {
    //             return next(
    //                 new HttpException(
    //                     ConstantHttpCode.NOT_FOUND,
    //                     ConstantHttpReason.NOT_FOUND,
    //                     ConstantMessage.USER_NOT_FOUND,
    //                 
    //             )
    //         }
    //
    //         const isAddressValid = this.validate.validateAddress(address)
    //         if (!isAddressValid) {
    //             return next(
    //                 new HttpException(
    //                     ConstantHttpCode.BAD_REQUEST,
    //                     ConstantHttpReason.BAD_REQUEST,
    //                     ConstantMessage.ADDRESS_NOT_VALID,
    //                 
    //             )
    //         }
    //
    //         const isPasswordValid = this.validate.validatePassword(password)
    //         if (!isPasswordValid) {
    //             return next(
    //                 new HttpException(
    //                     ConstantHttpCode.BAD_REQUEST,
    //                     ConstantHttpReason.BAD_REQUEST,
    //                     ConstantMessage.PASSWORD_NOT_VALID,
    //                 
    //             )
    //         }
    //
    //         const isMatch = this.userService.comparePassword(password, user.password)
    //         if (!isMatch) {
    //             return next(
    //                 new HttpException(
    //                     ConstantHttpCode.UNAUTHORIZED,
    //                     ConstantHttpReason.UNAUTHORIZED,
    //                     ConstantMessage.PASSWORD_NOT_MATCH,
    //                 
    //             )
    //         }
    //
    //         if (user.address === address) {
    //             return next(
    //                 new HttpException(
    //                     ConstantHttpCode.BAD_REQUEST,
    //                     ConstantHttpReason.BAD_REQUEST,
    //                     ConstantMessage.ADDRESS_NOT_CHANGE,
    //                 
    //             )
    //         }
    //
    //         const updatedUser = await this.userService.updateAddress(id, address)
    //         if (!updatedUser) {
    //             return next(
    //                 new HttpException(
    //                     ConstantHttpCode.BAD_REQUEST,
    //                     ConstantHttpReason.BAD_REQUEST,
    //                     ConstantMessage.ADDRESS_NOT_CHANGE,
    //                 
    //             )
    //         }
    //
    //         return res.status(ConstantHttpCode.OK).json({
    //             status: {
    //                 code: ConstantHttpCode.OK,
    //                 msg: ConstantHttpReason.OK,
    //             },
    //             msg: ConstantMessage.ADDRESS_CHANGE_SUCCESS,
    //             data: {
    //                 user: updatedUser,
    //             },
    //         })
    //     } catch (err: any) {
    //         next(
    //             new HttpException(
    //                 ConstantHttpCode.INTERNAL_SERVER_ERROR,
    //                 ConstantHttpReason.INTERNAL_SERVER_ERROR,
    //                 err?.message,
    //             
    //         )
    //     }
    // }

    deleteUser = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { password } = req.body
            const { id } = req.params

            const user = await this.userService.findByIdWithPassword(id)
            if (!user) {
                return next(
                    new HttpException(
                        ConstantHttpCode.NOT_FOUND,
                        ConstantHttpReason.NOT_FOUND,
                        ConstantMessage.USER_NOT_FOUND,
                    ),
                )
            }

            const isPasswordValid = this.validate.validatePassword(password)
            if (!isPasswordValid) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.PASSWORD_NOT_VALID,
                    ),
                )
            }

            const isMatch = this.userService.comparePassword(password, user.password)
            if (!isMatch) {
                return next(
                    new HttpException(
                        ConstantHttpCode.UNAUTHORIZED,
                        ConstantHttpReason.UNAUTHORIZED,
                        ConstantMessage.PASSWORD_NOT_MATCH,
                    ),
                )
            }

            const deletedUser = await this.userService.deleteUser(id)
            if (!deletedUser) {
                return next(
                    new HttpException(
                        ConstantHttpCode.BAD_REQUEST,
                        ConstantHttpReason.BAD_REQUEST,
                        ConstantMessage.USER_NOT_DELETE,
                    ),
                )
            }

            return res.status(ConstantHttpCode.OK).json({
                status: {
                    code: ConstantHttpCode.OK,
                    msg: ConstantHttpReason.OK,
                },
                msg: ConstantMessage.USER_DELETE_SUCCESS,
            })
        } catch (err: any) {
            next(
                new HttpException(
                    ConstantHttpCode.INTERNAL_SERVER_ERROR,
                    ConstantHttpReason.INTERNAL_SERVER_ERROR,
                    err?.message,
                ),
            )
        }
    }

    private getUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { id } = req.params

            const user = await this.userService.findById(id)
            if (!user) {
                return next(
                    new HttpException(
                        ConstantHttpCode.NOT_FOUND,
                        ConstantHttpReason.NOT_FOUND,
                        ConstantMessage.USER_NOT_FOUND,
                    ),
                )
            }

            return res.status(ConstantHttpCode.OK).json({
                status: {
                    code: ConstantHttpCode.OK,
                    msg: ConstantHttpReason.OK,
                },
                msg: ConstantMessage.USER_FOUND,
                data: {
                    user,
                },
            })
        } catch (err: any) {
            next(
                new HttpException(
                    ConstantHttpCode.INTERNAL_SERVER_ERROR,
                    ConstantHttpReason.INTERNAL_SERVER_ERROR,
                    err?.message,
                ),
            )
        }
    }

    private getAllUsers = async (
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const users = await this.userService.findAll()
            if (!users) {
                return next(
                    new HttpException(
                        ConstantHttpCode.NOT_FOUND,
                        ConstantHttpReason.NOT_FOUND,
                        ConstantMessage.USER_NOT_FOUND,
                    ),
                )
            }

            return res.status(ConstantHttpCode.OK).json({
                status: {
                    code: ConstantHttpCode.OK,
                    msg: ConstantHttpReason.OK,
                },
                msg: ConstantMessage.USER_FOUND,
                data: {
                    users,
                },
            })
        } catch (err: any) {
            next(
                new HttpException(
                    ConstantHttpCode.INTERNAL_SERVER_ERROR,
                    ConstantHttpReason.INTERNAL_SERVER_ERROR,
                    err?.message,
                ),
            )
        }
    }

    private getUsersStats = async (
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const usersStats = await this.userService.getUsersStats()
            if (!usersStats) {
                return next(
                    new HttpException(
                        ConstantHttpCode.NOT_FOUND,
                        ConstantHttpReason.NOT_FOUND,
                        ConstantMessage.USER_NOT_FOUND,
                    ),
                )
            }

            return res.status(ConstantHttpCode.OK).json({
                status: {
                    code: ConstantHttpCode.OK,
                    msg: ConstantHttpReason.OK,
                },
                msg: ConstantMessage.USER_FOUND,
                data: {
                    users: usersStats,
                },
            })
        } catch (err: any) {
            next(
                new HttpException(
                    ConstantHttpCode.INTERNAL_SERVER_ERROR,
                    ConstantHttpReason.INTERNAL_SERVER_ERROR,
                    err?.message,
                ),
            )
        }
    }
}

export default UserController