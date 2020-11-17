/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import Sequelize, { Model } from 'sequelize'
import database from '../database/index'
import modeloModel from '../models/modelo'

interface IVeiculo {
  readonly id?: number
  matricula?: string
  combustivel?: string
  ano?: Date
  cor?: string
  usado?: boolean
  urlPhoto?: string
  modeloId?: string
  comentarios?: string
}

class VeiculoModel extends Model<IVeiculo> {
  readonly id?: number
  matricula?: string
  combustivel?: string
  ano?: Date
  cor?: string
  usado?: boolean
  urlPhoto?: string
  modeloId?: string
  comentarios?: string
}

VeiculoModel.init({
  matricula: Sequelize.STRING,
  combustivel: Sequelize.STRING,
  ano: Sequelize.DATE,
  cor: Sequelize.STRING,
  usado: Sequelize.BOOLEAN,
  urlPhoto: Sequelize.STRING,
  modeloId: Sequelize.INTEGER,
  comentarios: Sequelize.STRING
}, { sequelize: database, tableName: 'veiculos' })

VeiculoModel.belongsTo(modeloModel, {
  as: 'modelo'
})

export default VeiculoModel
