/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import { Response, Request } from 'express'
import TypeUserModel from '../models/typeuser'

class TypeUserController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const typesUser = await TypeUserModel.findAll()

      return res.json({
        data: typesUser,
        message: 'Operação realizada com sucesso'
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
      if (req.body.descricao.trim() === '') {
        return res.status(400).json({
          data: null,
          message: 'Descrição inválida'
        })
      }

      const typeUserFound = await TypeUserModel.findOne({
        where: { descricao: req.body.descricao }
      })

      if (typeUserFound) {
        return res.status(400).json({
          data: null,
          message: 'Tipo de usário existente.'
        })
      }

      const typeUser = await TypeUserModel.create(req.body)

      return res.json({
        data: typeUser,
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

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const typeUserFound = await TypeUserModel.findByPk(req.params.id)

      if (!typeUserFound) {
        return res.status(404).json({
          data: null,
          message: 'Tipo de usário não encontrado'
        })
      }

      if (req.body.descricao.trim() === '') {
        return res.status(400).json({
          data: null,
          message: 'Descrição inválida'
        })
      }

      const typeUserByDesc = await TypeUserModel.findOne({
        where: { descricao: req.body.descricao }
      })

      if (typeUserByDesc) {
        if (typeUserByDesc?.id !== typeUserFound.id) {
          return res.status(400).json({
            data: null,
            message: 'Tipo de usário existente'
          })
        }
      }

      await typeUserFound.update(req.body)

      return res.json({
        data: typeUserFound,
        message: 'Dados atualizado com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const typeUserFound = await TypeUserModel.findByPk(req.params.id)

      if (!typeUserFound) {
        return res.status(404).json({
          data: null,
          message: 'Tipo de usário não encontrado'
        })
      }

      await typeUserFound.destroy()

      return res.json({
        data: null,
        message: 'Dados eliminado com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }
}

export default new TypeUserController()
