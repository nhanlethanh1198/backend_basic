import express, { Application, Request, Response, NextFunction } from 'express'

import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'

import ErrorMiddleware from '@/middlewares/error.middleware'
import HttpException from '@/utils/exceptions/http.exceptions'
import Controller from '@/interfaces/controller.interface'

import connectDb from '@/config/db.config'

// variable
import Variable from '@/env/variable.env'

// api constant
import ConstantAPI from '@/constants/api.constant'

// message constant
import ConstantMessage from '@/constants/message.constant'

// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'

class App {
    public app: Application
    private DATABASE_URL: string

    constructor(controllers: Controller[]) {
        this.app = express()
        this.DATABASE_URL = Variable.DATABASE_URL

        this.initialiseDatabaseConnection(this.DATABASE_URL)
        this.initialiseConfig()
        this.initialiseRoutes()
        this.initialiseControllers(controllers)
        this.initialiseErrorHandling()
    }

    private initialiseConfig(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cookieParser())
        this.app.use(compression())
        this.app.use(cors())
        this.app.use(helmet())
    }

    private initialiseRoutes(): void {
        this.app.get(
            ConstantAPI.ROOT,
            (_req: Request, res: Response, next: NextFunction) => {
                try {
                    return res.status(ConstantHttpCode.OK).json({
                        status: {
                            code: ConstantHttpCode.OK,
                            msg: ConstantHttpReason.OK,
                        },
                        msg: ConstantMessage.API_WORKING,
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
            },
        )
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.app.use(ConstantAPI.API, controller.router)
        })
    }

    private initialiseErrorHandling(): void {
        this.app.use(ErrorMiddleware)
    }

    private initialiseDatabaseConnection(url: string): void {
        connectDb(url)
    }
}

export default App