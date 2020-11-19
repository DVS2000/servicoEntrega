/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import { Request, Response } from 'express'
import ModeloModel from '../models/modelo'

class ModeloController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const modelos = await ModeloModel.findAll({
        include: {
          association: 'marca'
        }
      })

      return res.json({
        data: modelos,
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
      const modeloFound = await ModeloModel.findOne({
        where: { descricao: req.body.descricao }
      })

      if (modeloFound) {
        return res.status(400).json({
          data: null,
          message: 'Modelo existente'
        })
      }

      const modelo = await ModeloModel.create(req.body)

      return res.json({
        data: modelo,
        message: 'Modelo criado com sucesso'
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
      const modeloFound = await ModeloModel.findByPk(req.params.id)

      if (!modeloFound) {
        return res.status(404).json({
          data: null,
          message: 'Tipo de usário não encontrado'
        })
      }

      const modeloFoundByDesc = await ModeloModel.findOne({
        where: { descricao: req.body.descricao }
      })

      if (modeloFoundByDesc) {
        if (modeloFoundByDesc?.id !== modeloFound.id) {
          return res.status(400).json({
            data: null,
            message: 'Modelo existente'
          })
        }
      }

      await modeloFound.update(req.body)

      return res.json({
        data: modeloFound,
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
      const modeloFound = await ModeloModel.findByPk(req.params.id)

      if (!modeloFound) {
        return res.status(404).json({
          data: null,
          message: 'Modelo não encontrado'
        })
      }

      await modeloFound.destroy()

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

export default new ModeloController()
