/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import Sequelize, { Model } from 'sequelize'
import database from '../database/index'
import MarcaModel from './marca'

interface IModelo {
  readonly id?: number
  descricao?: string
  marcaId?: number
}

class ModeloModel extends Model<IModelo> {
  public readonly id?: number
  public descricao?: string
  public marcaId?: number
}

ModeloModel.init({
  descricao: Sequelize.STRING,
  marcaId: Sequelize.INTEGER
}, { sequelize: database, tableName: 'modelos' })

ModeloModel.belongsTo(MarcaModel, {
  as: 'marca'
})

export default ModeloModel
