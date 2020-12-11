import { Response, Request } from 'express'
import PedidoModel, { Estado } from '../models/pedidos'

class PedidoController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const pedidos = await PedidoModel.findAll({
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
        data: pedidos,
        message: 'Pedidos encontrados com sucesso'
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
      const pedidoValidate = PedidoModel.build(req.body)

      if (!pedidoValidate.validateModel().status) {
        return res.status(400).json({
          data: null,
          message: pedidoValidate.validateModel().message
        })
      }

      if (res.locals.user.type !== 2) {
        return res.status(400).json({
          data: null,
          message: 'Cliente inválido'
        })
      }

      const pedido = await PedidoModel.create({ ...req.body, estado: Estado[0] })
      return res.json({
        data: pedido,
        message: 'Pedido creatado com sucesso'
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
      const pedido = await PedidoModel.findByPk(req.params.id)
      if (!pedido) {
        return res.status(404).json({
          data: null,
          message: 'Pedido foi encontrado'
        })
      }

      const pedidoValidate = PedidoModel.build(req.body)

      if (!pedidoValidate.validateModel().status) {
        return res.status(400).json({
          data: null,
          message: pedidoValidate.validateModel().message
        })
      }

      if (res.locals.type !== 2) {
        return res.status(403).json({
          data: null,
          message: 'Cliente inválido'
        })
      }

      await pedido.update(req.body)

      return res.json({
        data: pedido,
        message: 'Pedido atualizado com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async updateEstado (req: Request, res: Response): Promise<Response> {
    try {
      const pedido = await PedidoModel.findByPk(req.params.id)
      if (!pedido) {
        return res.status(404).json({
          data: null,
          message: 'Pedido não encontrado'
        })
      }

      if (res.locals.user.type !== 22) {
        return res.status(403).json({
          data: null,
          message: 'Motorista inválido'
        })
      }

      await pedido.update({ ...req.body, motoristaId: res.locals.user.id })
      return res.json({
        data: pedido,
        message: 'Estado do pedido atualizado com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }

  public async cancel (req: Request, res: Response): Promise<Response> {
    try {
      const pedido = await PedidoModel.findByPk(req.params.id)
      if (!pedido) {
        return res.status(404).json({
          data: null,
          message: 'Pedido não encontrado'
        })
      }

      await pedido.update({ estado: Estado[3] })
      return res.json({
        data: null,
        message: 'Cancelado com sucesso'
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
      const pedido = await PedidoModel.findByPk(req.params.id)
      if (!pedido) {
        return res.status(404).json({
          data: null,
          message: 'Pedido não encontrado'
        })
      }

      await pedido.destroy()
      return res.json({
        data: null,
        message: 'Cancelado com sucesso'
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
      const pedidos = await PedidoModel.findOne({
        where: { id: req.params.id },
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
        data: pedidos,
        message: 'Pedidos encontrados com sucesso'
      })
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: 'Ocorreu um erro interno'
      })
    }
  }
}

export default new PedidoController()
