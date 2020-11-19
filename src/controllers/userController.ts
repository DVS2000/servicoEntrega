/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import { Request, Response } from 'express'
import User from '../models/user'
import WesenderService from '../services/wesender_service'
import { genereteCode } from '../utils/jwtGenerate'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.findAll({
        include: {
          association: 'tipo'
        }
      })

      return res.json({
        data: users,
        message: 'Operação efetuada com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const userValidate = User.build(req.body)

      if (!userValidate.validateModel().status) {
        return res.status(400).json({
          data: null,
          message: userValidate.validateModel().message
        })
      }

      const { phone, email } = req.body

      if (await User.findOne({ where: { phone } })) {
        return res.status(400).json({
          data: null,
          message: 'Telefone existente'
        })
      }

      if (await User.findOne({ where: { email } })) {
        return res.status(400).json({
          data: null,
          message: 'E-mail existente'
        })
      }

      const code = genereteCode()

      const user = await User.create({ ...req.body, code })

      // SEND MESSAGE FROM WESENDER BY-> Digital Factory
      WesenderService.sendSms(
        [user.phone],
        `Olá ${user.firstName} Seja Bem-vindo ao Yenda, o seu código de ativação para é: ${code}`
      )

      return res.json({
        data: user,
        message: 'Usuário criado com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const userValidate = User.build(req.body)

      if (!userValidate.validateModel().status) {
        return res.status(400).json({
          data: null,
          message: userValidate.validateModel().message
        })
      }

      console.log(res.locals.user)

      const id = res.locals.user.id || req.params.id
      const userFound = await User.findByPk(id)

      if (!userFound) {
        return res.status(404).json({
          data: null,
          message: 'Usuário não foi encontrado'
        })
      }

      const { phone, email } = req.body
      const foundByPhone = await User.findOne({ where: { phone } })

      if (foundByPhone?.id !== userFound.id) {
        return res.status(400).json({
          data: null,
          message: 'Contacto existente'
        })
      }

      const foundByEmail = await User.findOne({ where: { email } })

      if (foundByEmail?.id !== userFound.id) {
        return res.status(400).json({
          data: null,
          message: 'E-mail existente'
        })
      }

      await userFound.update(req.body)

      return res.json({
        data: userFound,
        message: 'Dados atualizado com sucesso'
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const id = res.locals.user.id || req.params.id
      const userFound = await User.findByPk(id)

      if (!userFound) {
        return res.status(404).json({
          data: null,
          message: 'Usuário não foi encontrado'
        })
      }

      await userFound.destroy()
      return res.json({
        data: null,
        message: 'Eliminado com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async getByIDorToken (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id ? req.params.id : res.locals.user.id
      const user = await User.findOne({
        where: { id },
        include: {
          association: 'tipo'
        }
      })

      return res.json({
        data: user,
        message: 'Operação efetuada com sucesso'
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }
}

export default new UserController()
