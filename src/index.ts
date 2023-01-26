import express, { Application, NextFunction, Request, Response } from 'express'

import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'

import ErrorMiddleware from '@/middlewares/error.middleware'
import HttpException from '@/utils/exceptions/http.exceptions'
import Controller from '@/interfaces/controller.interface'

import mongoConnectDB from '@/config/db.config'
import { postgresTestConnectDB, syncSequelize } from '@/config/sql.config'

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
    public app: Application;
    private MONGO_DATABASE_URL: string;
    private POSTGRES_DATABASE_URL: string;
    private POSTGRES_DATABASE_NAME: string;
    private POSTGRES_DATABASE_USERNAME: string;
    private POSTGRES_DATABASE_PASSWORD: string;


    constructor(controllers: Controller[]) {
        this.app = express();
        this.MONGO_DATABASE_URL = Variable.MONGO_DATABASE_URL;
        this.POSTGRES_DATABASE_URL = Variable.POSTGRES_DATABASE_URL;
        this.POSTGRES_DATABASE_NAME = Variable.POSTGRES_DATABASE_NAME;
        this.POSTGRES_DATABASE_USERNAME = Variable.POSTGRES_DATABASE_USERNAME;
        this.POSTGRES_DATABASE_PASSWORD = Variable.POSTGRES_DATABASE_PASSWORD;

        this.initialiseDatabaseConnection(this.MONGO_DATABASE_URL);
        this.initialisePostgresConnection();
        this.initialiseConfig();
        this.initialiseRoutes();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
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
            this.app.use(ConstantAPI.API, controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.app.use(ErrorMiddleware);
    }

    private async initialiseDatabaseConnection(url: string): Promise<void> {
        await mongoConnectDB(url);
    }

    private async initialisePostgresConnection(): Promise<void> {
        await postgresTestConnectDB().then(async () => {
            await syncSequelize()
        })
    }
}

export default App