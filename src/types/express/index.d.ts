import User from '@/interfaces/user.interface'

declare global {
    namespace Express {
        export interface Request {
            user: User
        }

        export type TypedResponse<T> =
          Omit<Response, 'json' | 'status'>
          & { json(data: T): TypedResponse<T> }
          & { status(code: number): TypedResponse<T> };
    }
}