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

interface IPedidos {
  readonly id?: number
  descricao?: string
  urlPhoto?: string
  localizacao?: string
  localizacaoEntrega?: string
  preco?: number
  clienteId?: number
  motoristaId?: number
  estado?: Estado
  refPartida?: string
  refEntrega?: string
  nomeChegada?: string
  telefoneChegada?: string
  infoAd?: string
}

class PedidoModel extends Model<IPedidos> {
  public readonly id?: number
  public descricao!: string
  public urlPhoto?: string
  public localizacao?: string
  public localizacaoEntrega?: string
  public preco?: number
  public clienteId?: number
  public motoristaId?: number
  public estado?: Estado
  public refPartida?: string
  public refEntrega?: string
  public nomeChegada?: string
  public telefoneChegada?: string
  public infoAd?: string

  public validateModel (): IValidade {
    if (this.descricao?.length === 0 || this.descricao.length <= 6) {
      return { status: false, message: 'Descrição do pedido inválido ' }
    } else if (this?.localizacao === null) {
      return { status: false, message: 'Localização obrigatória' }
    } else if (this?.localizacaoEntrega === null || this?.localizacaoEntrega === this?.localizacao) {
      return { status: false, message: 'Local de entrega inválida' }
    } else if (this?.preco === null) {
      return { status: false, message: 'Preço inválido' }
    }

    return { status: true, message: 'Okey' }
  }

  public validateCliente (cliente: User): IValidade {
    if (cliente.tipoId !== 2) {
      return { status: false, message: 'Usuário precisa ser um cliente' }
    }
    return { status: true, message: 'Okey' }
  }

  public validateMotorista (motorista: User): IValidade {
    if (motorista.tipoId !== 22) {
      return { status: false, message: 'Usuário precisa ser um motorista' }
    }
    return { status: true, message: 'Okey' }
  }
}

PedidoModel.init({
  descricao: Sequelize.STRING,
  urlPhoto: Sequelize.STRING,
  localizacao: Sequelize.STRING,
  localizacaoEntrega: Sequelize.STRING,
  preco: Sequelize.DECIMAL({ precision: 10, scale: 2 }),
  clienteId: Sequelize.INTEGER,
  motoristaId: Sequelize.INTEGER,
  estado: Sequelize.ENUM('Pendente', 'Em Andamento', 'Concluído', 'Cancelado'),
  refPartida: Sequelize.STRING,
  refEntrega: Sequelize.STRING,
  nomeChegada: Sequelize.STRING,
  telefoneChegada: Sequelize.STRING,
  infoAd: Sequelize.STRING
}, { sequelize: database, tableName: 'pedidos' })

PedidoModel.belongsTo(User, {
  foreignKey: 'clienteId',
  as: 'cliente'
})

PedidoModel.belongsTo(User, {
  foreignKey: 'motoristaId',
  as: 'motorista'
})

export default PedidoModel
