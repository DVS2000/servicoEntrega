/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import express from 'express'
import cors from 'cors'
import routes from './routes'
import socketIO from 'socket.io'
import { IUser } from './interfaces/interface_user'
import { createServer, Server } from 'http'
import { IMessageClient, IMessageDrive } from './interfaces/interface_message_socket'

export class App {
    private _app: express.Application
    private server: Server
    private io: socketIO.Server
    public users: IUser[] = []

    constructor () {
      this._app = express()
      this.middlewares()
      this.server = createServer(this._app)
      this.io = socketIO(this.server)
      this.routes()
      this.listen()
    }

    private middlewares (): void {
      this._app.use(express.json())
      this._app.use(cors())
      this._app.use('/upload', express.static('src/upload'))
    }

    private routes (): void {
      this._app.use(routes)
    }

    private listen (): void {
      this.server.listen(process.env.PORT || 3333, () => {
        console.log('TÁ DE BOA -> NA FÉ DE DEUS')
      })

      this.io.on('connect', client => {
        console.log(`Conectado ID => ${client.id}`)

        client.on('user_connected', (data: IUser) => {
          this.users.push(data)
          client.join(`${data.tipo}`)
        })

        client.on('send_by_client', (data: IMessageClient) => {
          this.io.to(data.sala).emit('sms', data.data)
        })

        client.on('send_by_drive', (data: IMessageDrive) => {
          this.io.to(data.client).emit('sms', data)
        })

        client.on('teste', data => client.broadcast.emit('sms', data))

        client.on('sair', (data: string) => {
          const user = this.users.filter((x) => x.id === data)
          this.users.splice(this.users.indexOf(user[0]), 1)
          client.disconnect()
        })
      })
    }

    get app (): express.Application {
      return this._app
    }
}
