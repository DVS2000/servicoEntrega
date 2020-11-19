/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import { Response, Request } from 'express'
import MarcaModel from '../models/marca'

class MarcaController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const marca = await MarcaModel.findAll()

      return res.json({
        data: marca,
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
      const marcaFound = await MarcaModel.findOne({
        where: { descricao: req.body.descricao }
      })

      if (marcaFound) {
        return res.status(400).json({
          data: null,
          message: 'Marca existente.'
        })
      }

      const marca = await MarcaModel.create(req.body)

      return res.json({
        data: marca,
        message: 'Operação efetuada com sucesso'
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
      const marcaFound = await MarcaModel.findByPk(req.params.id)

      if (!marcaFound) {
        return res.status(404).json({
          data: null,
          message: 'Marca encontrada'
        })
      }

      const marcaFoundByDesc = await MarcaModel.findOne({
        where: { descricao: req.body.descricao }
      })

      if (marcaFoundByDesc) {
        if (marcaFoundByDesc?.id !== marcaFound?.id) {
          return res.status(400).json({
            data: null,
            message: 'Marca existente.'
          })
        }
      }

      await marcaFound.update(req.body)

      return res.json({
        data: marcaFound,
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
      const marcaFound = await MarcaModel.findByPk(req.params.id)

      if (!marcaFound) {
        return res.status(404).json({
          data: null,
          message: 'Tipo de usário não encontrado'
        })
      }

      await marcaFound.destroy()

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

export default new MarcaController()
