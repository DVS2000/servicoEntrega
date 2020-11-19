/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import configJwt from '../config/jwtConfig'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      data: null,
      message: 'Token não foi encontrado'
    })
  }

  const parts = authHeader.split(' ')

  if (!(parts.length === 2)) {
    return res.status(401).json({
      data: null,
      message: 'Token com erro'
    })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({
      data: null,
      message: 'Token mal formatado'
    })
  }

  jwt.verify(token, configJwt.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        data: null,
        message: 'Token inválido'
      })
    }

    res.locals.user = decoded
    next()
  })
}
