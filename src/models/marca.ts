/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import Sequelize, { Model } from 'sequelize'
import database from '../database/index'

interface IMarca {
  readonly id?: number
  descricao?: string
  urlImg?: string
}

class MarcaModel extends Model<IMarca> {
  public readonly id?: number
  public descricao?: string
  public urlImg?: string
}

MarcaModel.init({
  descricao: Sequelize.STRING,
  urlImg: Sequelize.STRING
}, { sequelize: database, tableName: 'marca' })

export default MarcaModel
