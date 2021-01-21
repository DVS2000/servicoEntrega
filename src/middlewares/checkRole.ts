import { Response, Request, NextFunction } from 'express'
import TypeUserModel from '../models/typeuser'

export const checkRole = (idTypeUser: number) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return async (req: Request, res: Response, next: NextFunction) => {
    const idTipo = res.locals.user.type

    const tipo = await TypeUserModel.findByPk(idTypeUser)

    if (idTipo !== idTypeUser) {
      return res.status(401).json({
        data: null,
        message: `Sem acesso, precisa ser um ${tipo?.descricao} para ter acesso a essa rota.`
      })
    } else {
      next()
    }
  }
}
