import { NextFunction, Request, Response } from 'express'
import HttpException from '@/utils/exceptions/http.exceptions'

import { verifyToken } from '@/validations/token.validation'

// message constant
import ConstantMessage from '@/constants/message.constant'

// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'

class AuthenticatedMiddleware {
    public async verifyTokenAndAuthorization(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        verifyToken(req, res, () => {
            if (req?.user?.id === req?.params?.id || req?.user?.isAdmin) {
                return next()
            }

            return next(
                new HttpException(
                    ConstantHttpCode.FORBIDDEN,
                    ConstantHttpReason.FORBIDDEN,
                    ConstantMessage.NOT_ALLOWED,
                ),
            )
        })
    }

    public async verifyTokenAndAdmin(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        verifyToken(req, res, () => {
            if (req?.user?.isAdmin) {
                return next()
            }

            return next(
                new HttpException(
                    ConstantHttpCode.FORBIDDEN,
                    ConstantHttpReason.FORBIDDEN,
                    ConstantMessage.NOT_ALLOWED,
                ),
            )
        })
    }
}

export default AuthenticatedMiddleware