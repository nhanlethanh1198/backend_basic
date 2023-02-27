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
import { GithubHookInterface } from '@/interfaces/github.hook.interface'
import axios, { AxiosError, AxiosResponse } from 'axios'
const {GithubWebhook} = require('@inventivetalent/express-github-webhook');

class GithubHookController implements Controller {
  public path: string
  public router: Router
  private webhookHandler: typeof GithubWebhook

  constructor() {
    this.path = ConstantAPI.HOOK
    this.router = Router()
    this.webhookHandler = new GithubWebhook({
      // events: ['push', 'workflow_run', 'workflow_job', 'in_progress', 'completed'],
      secret: 'ecc'
    })

    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, this.getHook)
    this.router.post(
      `${this.path}`, this.receiveHook
    )
  }

  private getHook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      console.log('hello')
      return res.json({
        "message": "test"
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

  private receiveHook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { body } = req
      await this.sendToTelegram(body)

      return res.json({
        "status": "success",
        "message": "Sent to telegram message"
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

  private sendToTelegram = async (
    data: GithubHookInterface
  ): Promise<Response | any> => {
    const url: string = 'https://api.telegram.org/bot5972720670:AAGekgTvZOlgU1S6FTCGmwA31b28lJdszQs/sendMessage'
    // filtering necessary keys in object
    const {
      action,
      workflow_job,
      repository
    } = data

    const new_workflow_job = {
      check_run_url: workflow_job?.check_run_url,
      completed_at: workflow_job?.completed_at,
      created_at: workflow_job?.created_at,
      head_branch: workflow_job?.head_branch,
      started_at: workflow_job?.started_at,
      status: workflow_job?.status,
      workflow_name: workflow_job?.workflow_name,
    }

    const new_repository = {
      full_name: repository?.full_name,
      html_url: repository?.html_url,
      private: repository?.private
    }

    const body = {
      chat_id: -1001871216290,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      allow_sending_without_reply: true,
      text: `<b>Action ${action.toUpperCase()}</b>

Workflow name: ${workflow_job?.workflow_name}
Workflow url: ${workflow_job?.html_url}
Created At: ${workflow_job?.created_at}
Completed At: ${workflow_job?.completed_at}

Repository: ${new_repository.full_name}
url: <a>${new_repository.html_url}</a>`
    }

    try {
      const res: AxiosResponse = await axios.post(url, body)
      return res.data
    } catch (err: AxiosError | any) {
      console.log(err)
      console.log(err.message)
    }
  }



}

export default GithubHookController