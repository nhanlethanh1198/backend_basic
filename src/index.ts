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

const morgan = require('morgan')

const session = require('express-session')

class App {
    public app: Application;
    private readonly MONGO_DATABASE_URL: string;
    private POSTGRES_DATABASE_URL: string;
    private POSTGRES_DATABASE_NAME: string;
    private POSTGRES_DATABASE_USERNAME: string;
    private POSTGRES_DATABASE_PASSWORD: string;
    private SESSION_SECRET: string;
    private SESSION_NAME: string;
    private SESSION_KEYS: string;
    private SESSION_MAX_AGE: number;
    private SESSION_RESAVE: boolean;


    constructor(controllers: Controller[]) {
        this.app = express();
        this.MONGO_DATABASE_URL = Variable.MONGO_DATABASE_URL;
        this.POSTGRES_DATABASE_URL = Variable.POSTGRES_DATABASE_URL;
        this.POSTGRES_DATABASE_NAME = Variable.POSTGRES_DATABASE_NAME;
        this.POSTGRES_DATABASE_USERNAME = Variable.POSTGRES_DATABASE_USERNAME;
        this.POSTGRES_DATABASE_PASSWORD = Variable.POSTGRES_DATABASE_PASSWORD;
        this.SESSION_SECRET = Variable.SESSION_SECRET;
        this.SESSION_NAME = Variable.SESSION_NAME;
        this.SESSION_KEYS = Variable.SESSION_KEYS;
        this.SESSION_MAX_AGE = Variable.SESSION_MAX_AGE;
        this.SESSION_RESAVE = Variable.SESSION_RESAVE;


        // this.initialiseDatabaseConnection(this.MONGO_DATABASE_URL).then();
        this.initialisePostgresConnection().then();
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
        this.app.use(morgan())

        // Reduce Fingerprinting
        this.app.disable('x-powered-by')

        // Session Config
        this.app.use(session({
            name: this.SESSION_NAME,
            keys: this.SESSION_KEYS.split(','), // key for encrypting cookie
            secret: this.SESSION_SECRET,
            resave: this.SESSION_RESAVE,
            saveUninitialized: true,
            cookie: {
                secure: true,
                httpOnly: true,
                expires: this.SESSION_MAX_AGE,
            },
            proxy: true,
        }))


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

        this.app.get(
          ConstantAPI.ROOT + 'test2',
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

        // this.app.post(
        //   ConstantAPI.ROOT + 'webhook',
        //   (_req: Request, res: Response, next: NextFunction) => {
        //       try {
        //           const data: TGithubhook = _req.body || undefined
        //           console.log({data})
        //           const json_str = JSON.stringify(data) || "none"
        //           const request_body = {
        //               "chat_id": -1001871216290,
        //               "text": json_str
        //           }
        //
        //           axios.post('https://api.telegram.org/bot5972720670:AAGekgTvZOlgU1S6FTCGmwA31b28lJdszQs/sendMessage', request_body).then((res: AxiosResponse<any>) => {
        //               return res.data
        //           }).catch((err) => {
        //               console.log('telegram send webhook error')
        //           })
        //
        //
        //           return res.status(ConstantHttpCode.OK).json({
        //               status: {
        //                   code: ConstantHttpCode.OK,
        //                   msg: ConstantHttpReason.OK,
        //               },
        //               msg: ConstantMessage.API_WORKING,
        //           })
        //       } catch (err: any) {
        //           return next(
        //             new HttpException(
        //               ConstantHttpCode.INTERNAL_SERVER_ERROR,
        //               ConstantHttpReason.INTERNAL_SERVER_ERROR,
        //               err.message,
        //             ),
        //           )
        //       }
        //   },
        // )

    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.app.use(controller.router);
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