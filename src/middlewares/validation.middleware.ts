import { Request, Response, NextFunction, RequestHandler } from 'express'
import Joi from 'joi'

// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'

const validationMiddleware = (schema: Joi.Schema): RequestHandler => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        }

        try {
            const value = await schema.validateAsync(req.body, validationOptions)
            req.body = value
            next()
        } catch (e: any) {
            const errors: string[] = []
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message)
            })

            res.status(ConstantHttpCode.NOT_FOUND).send({
                status: {
                    code: ConstantHttpCode.NOT_FOUND,
                    msg: ConstantHttpReason.NOT_FOUND,
                },
                msg: errors,
            })
        }
    }
}

export default validationMiddleware