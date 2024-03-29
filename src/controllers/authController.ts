/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import WesenderService from '../services/wesender_service'
import { genereteCode, jwtGenereate } from '../utils/jwtGenerate'

class AuthController {
  public async login (req: Request, res: Response): Promise<Response> {
    try {
      const userValidade = User.build(req.body)

      if (!userValidade.validateModel().status) {
        return res.status(400).json({
          data: null,
          message: userValidade.validateModel().message
        })
      }

      const user = await User.findOne({
        where: { phone: userValidade.phone },
        include: { association: 'tipo' }
      })

      if (!user) {
        return res.status(404).json({
          data: null,
          message: 'Telefone inexistente'
        })
      }

      if (!(await user.checkPassword(userValidade.password))) {
        return res.status(400).json({
          data: null,
          message: 'Palavra-passe incorrecta'
        })
      }

      if (!user.isComplete) {
        return res.status(400).json({
          data: user,
          message: 'Ative a tua conta, para poder fazer o login.'
        })
      }

      if (!user.status) {
        return res.status(400).json({
          data: user,
          message: 'A sua conta encontra-se desativada'
        })
      }

      const idType = process.env.PORT === undefined ? 2 : 2

      if (user?.tipoId !== idType) {
        return res.status(401).json({
          data: null,
          message: 'Não tens permissão, somente para clientes '
        })
      }
      return res.json({
        data: user,
        token: jwtGenereate(user),
        message: 'Login efetuado com sucesso'
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async loginAdmin (req: Request, res: Response): Promise<Response> {
    try {
      const userValidade = User.build(req.body)

      if (!userValidade.validateModel().status) {
        return res.status(400).json({
          data: null,
          message: userValidade.validateModel().message
        })
      }

      const user = await User.findOne({
        where: { phone: userValidade.phone },
        include: { association: 'tipo' }
      })

      if (!user) {
        return res.status(404).json({
          data: null,
          message: 'Telefone inexistente'
        })
      }

      if (!(await user.checkPassword(userValidade.password))) {
        return res.status(400).json({
          data: null,
          message: 'Palavra-passe incorrecta'
        })
      }

      if (!user.isComplete) {
        return res.status(400).json({
          data: null,
          message: 'Ative a tua conta, para poder fazer o login.'
        })
      }

      if (!user.status) {
        return res.status(400).json({
          data: null,
          message: 'A sua conta encontra-se desativada'
        })
      }

      const idType = process.env.PORT === undefined ? 4 : 1

      if (user.tipoId !== idType) {
        return res.status(401).json({
          data: null,
          message: 'Não tens permissão, somente para admins '
        })
      }

      return res.json({
        data: user,
        token: jwtGenereate(user),
        message: 'Login efetuado com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async loginDrive (req: Request, res: Response): Promise<Response> {
    try {
      const userValidade = User.build(req.body)

      if (!userValidade.validateModel().status) {
        return res.status(400).json({
          data: null,
          message: userValidade.validateModel().message
        })
      }

      const user = await User.findOne({
        where: { phone: userValidade.phone },
        include: { association: 'tipo' }
      })

      if (!user) {
        return res.status(404).json({
          data: null,
          message: 'Telefone inexistente'
        })
      }

      if (!(await user.checkPassword(userValidade.password))) {
        return res.status(400).json({
          data: null,
          message: 'Palavra-passe incorrecta'
        })
      }

      if (!user.isComplete) {
        return res.status(400).json({
          data: null,
          message: 'Ative a tua conta, para poder fazer o login.'
        })
      }

      if (!user.status) {
        return res.status(400).json({
          data: null,
          message: 'A sua conta encontra-se desativada'
        })
      }

      const idType = process.env.PORT === undefined ? 22 : 3

      if (user.tipoId !== idType) {
        return res.status(401).json({
          data: null,
          message: 'Não tens permissão, somente para Drivers '
        })
      }

      return res.json({
        data: user,
        token: jwtGenereate(user),
        message: 'Login efetuado com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async forgotPassword (req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findOne({ where: { phone: req.body.phone } })

      if (!user) {
        return res.status(404).json({
          data: null,
          message: 'Usuário não foi encontrado'
        })
      }

      const code = genereteCode()
      const codeHash = await bcrypt.hash(code, 8)

      await user.update({ code: codeHash })

      const status = WesenderService.sendSms(
        [user.phone],
        `Olá ${user.firstName} o seu código para alterar a sua senha é: ${code}`
      )

      if (status) {
        return res.json({
          data: null,
          message: 'Código enviado com sucesso'
        })
      } else {
        return res.status(400).json({
          data: null,
          message: 'Código não foi enviado com sucesso'
        })
      }
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async resetPassword (req: Request, res: Response): Promise<Response> {
    try {
      const userValidate = User.build(req.body)

      if (!userValidate.validateModel().status) {
        return res.status(400).json({
          data: null,
          message: userValidate.validateModel().message
        })
      }

      const user = await User.findOne({ where: { phone: req.body.phone } })

      if (!user) {
        return res.status(404).json({
          data: null,
          message: 'Usuário não foi encontrado'
        })
      }

      if (!user.checkCode(userValidate.code)) {
        return res.status(400).json({
          data: null,
          message: 'Código inválido'
        })
      }

      if (!userValidate.password || userValidate.password.length === 0) {
        return res.status(400).json({
          data: null,
          message: 'Palavra-passe é obrigatória'
        })
      }

      await user.update({ password: userValidate.password })
      return res.json({
        data: null,
        message: 'Palavra-passe alterada com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async ativeAccount (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const code = req.body.code || req.params.code
      const user = id ? await User.findOne({ where: { id }, include: { association: 'tipo ' } }) : await User.findOne({ where: { phone: req.body.phone }, include: { association: 'tipo' } })

      if (!user) {
        return res.status(404).json({
          data: null,
          message: 'Usuário não encontrado'
        })
      }

      if (!(await user.checkCode(code))) {
        return res.status(400).json({
          data: null,
          message: 'Código inválido'
        })
      }

      await user.update({ isComplete: true, status: true })

      return res.json({
        data: user,
        token: jwtGenereate(user),
        message: 'Conta ativada com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }
}

export default new AuthController()
