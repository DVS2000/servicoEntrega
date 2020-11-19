import { Request } from 'express'

export class UserRequest {
  public id?: number

  public status?: boolean

  public phone?: string
}

export interface RequestUser extends Request {
   user: UserRequest
}
