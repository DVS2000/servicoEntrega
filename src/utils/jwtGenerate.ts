/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import User from '../models/user'
import jwt from 'jsonwebtoken'
import configJwt from '../config/jwtConfig'

export function jwtGenereate (params: User): string {
  return jwt.sign(
    {
      id: params.id,
      status: params.status
    },
    configJwt.jwtSecret,
    { expiresIn: 86400 }
  )
}

export function genereteCode (): string {
  const first = Math.floor(Math.random() * 10)
  const secod = Math.floor(Math.random() * 10)
  const thirth = Math.floor(Math.random() * 10)
  const four = Math.floor(Math.random() * 10)

  return `${first}${secod}${thirth}${four}`
}
