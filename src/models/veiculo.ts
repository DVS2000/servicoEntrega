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
import User from './user'

interface IVeiculo {
  readonly id?: number
  nome?: string
  matricula?: string
  combustivel?: string
  ano?: Date
  cor?: string
  usado?: boolean
  urlPhoto?: string
  userId?: number
  modeloId?: string
  comentarios?: string
}

class VeiculoModel extends Model<IVeiculo> {
  readonly id?: number
  nome?: string
  matricula?: string
  combustivel?: string
  ano?: Date
  cor?: string
  usado?: boolean
  urlPhoto?: string
  userId?: number
  modeloId?: string
  comentarios?: string
}

VeiculoModel.init({
  nome: Sequelize.STRING,
  matricula: Sequelize.STRING,
  combustivel: Sequelize.STRING,
  ano: Sequelize.DATE,
  cor: Sequelize.STRING,
  usado: Sequelize.BOOLEAN,
  urlPhoto: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  modeloId: Sequelize.INTEGER,
  comentarios: Sequelize.STRING
}, { sequelize: database, tableName: 'veiculos' })

VeiculoModel.belongsTo(modeloModel, {
  as: 'modelo'
})

VeiculoModel.belongsTo(User, { as: 'user' })

export default VeiculoModel
