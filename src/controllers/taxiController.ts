import { Request, Response } from 'express'
import TaxiModel from '../models/taxi'

class TaxiController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const taxis = await TaxiModel.findAll({
        include: [
          {
            association: 'cliente',
            attributes: [
              'id',
              'firstName',
              'secondName',
              'phone',
              'email',
              'urlPhoto'
            ],
            include: ['tipo']
          },
          {
            association: 'motorista',
            attributes: [
              'id',
              'firstName',
              'secondName',
              'phone',
              'email',
              'urlPhoto'
            ],
            include: ['tipo']
          }
        ]
      })

      return res.json({
        data: taxis,
        message: 'Operação efetuada com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async getByID (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const taxi = await TaxiModel.findByPk(id, {
        include: [
          {
            association: 'cliente',
            attributes: [
              'id',
              'firstName',
              'secondName',
              'phone',
              'email',
              'urlPhoto'
            ],
            include: ['tipo']
          },
          {
            association: 'motorista',
            attributes: [
              'id',
              'firstName',
              'secondName',
              'phone',
              'email',
              'urlPhoto'
            ],
            include: ['tipo']
          }
        ]
      })

      if (!taxi) {
        return res.status(404).json({
          data: null,
          message: 'Pedido de táxi não foi encontrado'
        })
      }

      return res.json({
        data: taxi,
        message: 'Operação efetuada com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const taxiValidate = TaxiModel.build(req.body)

      if (!taxiValidate.validateModel().status) {
        return res.status(400).json({
          data: null,
          message: taxiValidate.validateModel().message
        })
      }

      const taxi = await TaxiModel.create(req.body)

      return res.json({
        data: taxi,
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
      const { id } = req.params
      const taxiFound = await TaxiModel.findByPk(id)

      if (!taxiFound) {
        return res.status(404).json({
          data: null,
          message: 'Pedido de táxi não foi encontrado'
        })
      }

      const taxiValidate = TaxiModel.build(req.body)

      if (!taxiValidate.validateModel().status) {
        return res.status(400).json({
          data: null,
          message: taxiValidate.validateModel().message
        })
      }

      const taxi = await taxiFound.update(req.body)

      return res.json({
        data: taxi,
        message: 'Operação efetuada com sucesso'
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
      const { id } = req.params
      const taxiFound = await TaxiModel.findByPk(id)

      if (!taxiFound) {
        return res.status(404).json({
          data: null,
          message: 'Pedido de táxi não foi encontrado'
        })
      }

      await taxiFound.destroy()

      return res.json({
        data: null,
        message: 'Operação efetuada com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }
}

export default new TaxiController()
