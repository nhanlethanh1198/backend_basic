import { NextFunction, RequestParamHandler, Response } from 'express'
import * as _ from 'lodash'

import DEFAULT_PAGE_SIZE from '@/constants/api.constant'
import { ICrudOption } from '@/interfaces/controller.interface'
class ControllerUtils {

  onError(res: Response, error: any) {

    if (!error.options) {
      console.log("UNKNOW ERROR", error)
      // const err = errorService.router.somethingWentWrong()
      res.status(error.options.code || 500).json(error.options)
    } else {
      res.status(error.options.code || 500).json(error.options)
    }
  }

  onSuccess(res: Response, obj: {[key: string]: any} = {}, extra?: object) {
    obj = obj || {}
    if (Object.keys(obj).length === 0) {
      res.json({
        code: 200
      })
    } else {
      res.json({
        code: 200,
        results: Object.assign({
          obj
        }, extra)
      })
    }
  }

  onSuccessAsList(res: Response, objects: any = [], extras: any = {}, option: ICrudOption = {limit: 10, offset: 0} ): void {
    if (option) {
      option.offset = option.offset || 0
      option.limit = option.limit || 10
    }
    if (objects.toJSON) {
      objects = objects.toJSON()
    }
    const page = _.floor(option.offset / option.limit) + 1
    res.json({
      code: 200,
      results: Object.assign({
        objects
      }, extras),
      pagination: {
        'current_page': page,
        'next_page': page + 1,
        'prev_page': page - 1,
        'limit': option.limit
      }
    })
  }

  onSuccessAndRedirect(res: Response, url: string): void {
    res.status(200).redirect(url)
  }

  route(func: (req: Request, res: Response) => Promise<any>) {
    return (req: Request, res: Response) => func
      .bind(this)(req, res)
      .catch((error: any) => {
        this.onError(res, error)
      })
  }
}

export default ControllerUtils