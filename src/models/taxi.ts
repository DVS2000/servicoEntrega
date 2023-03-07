/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import Sequelize, { Model } from 'sequelize'
import database from '../database/index'
import { IValidade } from '../interfaces/interface_validate_error'
import User from './user'

export enum Estado {
  'Pendente',
  'Em Andamento',
  'Concluído',
  'Cancelado'
}

interface ITaxi {
  partida?: string
  refPartida?: string
  chegada?: string
  refChegada?: string
  estado?: Estado
  preco?: number
  readonly clienteId?: number
  readonly motoristaId?: number
}

class TaxiModel extends Model<ITaxi> {
  public partida?: string
  public refPartida?: string
  public chegada?: string
  public refChegada?: string
  public readonly clienteId?: number
  public readonly motoristaId?: number
  public estado?: Estado
  public preco?: number

  public validateModel (): IValidade {
    if (this.partida) {
      if (this.chegada == null) {
        return {
          status: false,
          message: 'Localização da chegada é obrigatória'
        }
      }
    }

    if (this.chegada) {
      if (this.partida == null) {
        return {
          status: false,
          message: 'Localização da chegada é obrigatória'
        }
      }
    }
    return { status: true, message: 'okey' }
  }
}

TaxiModel.init(
  {
    partida: Sequelize.STRING,
    refPartida: Sequelize.STRING,
    chegada: Sequelize.STRING,
    refChegada: Sequelize.STRING,
    estado: Sequelize.ENUM('Pendente', 'Em Andamento', 'Concluído', 'Cancelado'),
    preco: Sequelize.DECIMAL({ precision: 10, scale: 2 }),
    clienteId: Sequelize.INTEGER,
    motoristaId: Sequelize.INTEGER
  },
  { tableName: 'taxi', sequelize: database }
)

TaxiModel.belongsTo(User, {
  foreignKey: 'clienteId',
  as: 'cliente'
})

TaxiModel.belongsTo(User, {
  foreignKey: 'motoristaId',
  as: 'motorista'
})

export default TaxiModel
