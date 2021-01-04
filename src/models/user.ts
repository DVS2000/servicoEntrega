/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'
import database from '../database/index'
import TypeUser from '../models/typeuser'
import { IValidade } from '../utils/interface_validate_error'
import { validateEmail, validateFieldNumber, validateFieldText, validateLengthText, validateMaxLength } from '../validators/validators'

interface IUser {
  readonly id?: number
  firstName?: string
  secondName?: string
  phone?: string
  email?: string
  urlPhoto?: string
  code?: string
  status?: boolean
  isComplete?: boolean
  password?: string
  passwordHash?: string
  tipoId: number
  readonly createdAt?: Date
  readonly updatedAt?: Date
}

class User extends Model<IUser> {
  public readonly id!: number

  public firstName!: string

  public secondName!: string

  public phone!: string

  public email!: string

  public urlPhoto!: string

  public code!: string

  public status!: boolean

  public isComplete!: boolean

  public password!: string

  public passwordHash!: string

  public tipoId!: number

  public readonly createdAt!: Date

  public readonly updatedAt!: Date

  public async checkPassword (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.passwordHash)
  }

  public async checkCode (code: string): Promise<boolean> {
    return await bcrypt.compare(code, this.code)
  }

  /**
   * Função para fazer a validação de todos os campos
   * do **USER**
   */
  public validateModel (): IValidade {
    if (this.firstName) {
      if (!validateMaxLength(this.firstName.trim(), 15) || !validateFieldText(this.firstName.trim())) {
        return { status: false, message: 'Primeiro nome inválido' }
      }
    }

    if (this.secondName) {
      if (!validateMaxLength(this.secondName.trim(), 15) || !validateFieldText(this.secondName.trim())) {
        return { status: false, message: 'Segundo nome inválido' }
      }
    }

    if (this.phone) {
      if (!validateLengthText(this.phone.trim(), 9) || !validateFieldNumber(this.phone.trim())) {
        return { status: false, message: 'Telefone inválido' }
      }
    }

    if (this.email) {
      if (!validateEmail(this.email.trim())) {
        return { status: false, message: 'E-mail inválido' }
      }
    }

    if (this.password) {
      if (!validateMaxLength(this.password.trim(), 10)) {
        return { status: false, message: 'Palavra-passe inválida' }
      }
    }

    return { status: true, message: 'okey' }
  }
}

User.init(
  {
    firstName: Sequelize.STRING,
    secondName: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    urlPhoto: Sequelize.STRING,
    code: Sequelize.STRING,
    status: Sequelize.BOOLEAN,
    isComplete: Sequelize.BOOLEAN,
    password: Sequelize.STRING,
    passwordHash: Sequelize.STRING,
    tipoId: Sequelize.INTEGER
  },
  { sequelize: database }
)

User.belongsTo(TypeUser, {
  as: 'tipo'
})

User.addHook(
  'beforeCreate',
  async (user: User): Promise<void> => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 8)
      user.status = true
      user.isComplete = false
    }

    if (user.code) {
      user.code = await bcrypt.hash(user.code, 8)
    }
  }
)

User.addHook(
  'beforeUpdate',
  async (user: User): Promise<void> => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 8)
    }
  }
)

export default User
