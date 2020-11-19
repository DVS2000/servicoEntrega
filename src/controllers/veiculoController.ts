/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import { Request, Response } from 'express'
import VeiculoModel from '../models/veiculo'
import { validateMatricula } from '../validators/validators'

class VeiculoController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const veiculos = await VeiculoModel.findAll({
        include: {
          association: 'modelo'
        }
      })

      return res.json({
        data: veiculos,
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
      if (!validateMatricula(req.body.matricula)) {
        return res.status(400).json({
          data: null,
          message: 'Matrícula inváilida'
        })
      }

      const foundbyMatr = await VeiculoModel.findOne({
        where: { matricula: req.body.matricula }
      })

      if (foundbyMatr) {
        return res.status(400).json({
          data: null,
          message: 'Matrícula existente'
        })
      }

      const veiculo = await VeiculoModel.create(req.body)

      return res.json({
        data: veiculo,
        message: 'Veículo criado com sucesso'
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
      const veiculoFound = await VeiculoModel.findByPk(req.params.id)

      if (!veiculoFound) {
        res.status(400).json({
          data: null,
          message: 'Veículo inexistente'
        })
      }

      const rexExpMatricula = /^[A-Z]{2}-\d{2}-\d{2}-[A-Z]{2}$|^[A-Z]{3}-\d{2}-\d{2}$/

      if (!rexExpMatricula.test(req.body.matricula)) {
        return res.status(400).json({
          data: null,
          message: 'Matrícula inváilida'
        })
      }

      const foundbyMatr = await VeiculoModel.findOne({
        where: { matricula: req.body.matricula }
      })

      if (foundbyMatr?.id !== veiculoFound?.id) {
        return res.status(400).json({
          data: null,
          message: 'Veículo existente'
        })
      }

      await veiculoFound?.update(req.body)

      return res.json({
        data: veiculoFound,
        message: 'Veículo atualizado com sucesso'
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
      const veiculoFound = await VeiculoModel.findByPk(req.params.id)

      if (!veiculoFound) {
        res.status(400).json({
          data: null,
          message: 'Veículo inexistente'
        })
      }

      await veiculoFound?.destroy()

      return res.json({
        data: null,
        message: 'Veículo elimnado com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async getByMatricula (req: Request, res: Response): Promise<Response> {
    try {
      const veiculos = await VeiculoModel.findOne({
        where: {
          matricula: req.params.matricula
        },
        include: {
          association: 'modelo'
        }
      })

      console.table(veiculos)

      return res.json({
        data: veiculos,
        message: 'Operação realizada com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }
}

export default new VeiculoController()
