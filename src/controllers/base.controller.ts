import { Request, RequestHandler, Response, Router } from 'express'
import Controller from '@/interfaces/controller.interface'
import ControllerUtils from '@/utils/controller.utils'
import Authenticated from '@/middlewares/authenticated.middleware'

class BaseController extends ControllerUtils implements Controller {
  public path: string
  public router: Router

  // public validate: typeof ValidationMiddleware
  public authenticated: Authenticated

  constructor() {
    super()
    this.path = '/'
    this.router = Router()
    this.authenticated = new Authenticated()
    this.customRoutes()
    this.initialiseRoutes()
  }

  customRoutes(): void {

  }

  initialiseRoutes(): void {
    this.router.get('/', this.getListMiddleware(), this.getList)
    this.router.get('/:id', this.getItemMiddleware(), this.getItem)
    this.router.post('/', this.createItemMiddleware(), this.createItem)
    this.router.put('/:id', this.updateItemMiddleware(), this.updateItem)
    this.router.delete('/', this.deleteManyItemsMiddleware(), this.deleteManyItem)
    this.router.delete('/:id', this.deleteItemMiddeware(), this.deleteItem)
  }

  getListMiddleware(): RequestHandler[] {
    return []
  }

  getItemMiddleware(): RequestHandler[] {
    return []
  }

  createItemMiddleware(): RequestHandler[] {
    return []
  }

  updateItemMiddleware(): RequestHandler[] {
    return []
  }

  deleteManyItemsMiddleware(): RequestHandler[] {
    return []
  }

  deleteItemMiddeware(): RequestHandler[] {
    return []
  }

  getList(req: Request, res: Response): void {
    return
  }

  getItem(req: Request, res: Response): void {
    return
  }

  createItem(req: Request, res: Response): void {
    return
  }

  updateItem(req: Request, res: Response): void {
    return
  }

  deleteManyItem(req: Request, res: Response): void {
    return
  }

  deleteItem(req: Request, res: Response): void {
    return
  }

}

export default BaseController