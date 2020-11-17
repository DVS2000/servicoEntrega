/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import Sequelize, { Model } from 'sequelize'
import database from '../database/index'

interface ITypeUser {
  readonly id?: number
  descricao: string
}

class TypeUserModel extends Model<ITypeUser> {
  public readonly id?: number
  public descricao?: string
}

TypeUserModel.init({
  descricao: Sequelize.STRING
}, {
  sequelize: database,
  tableName: 'typeusers'
})

export default TypeUserModel
