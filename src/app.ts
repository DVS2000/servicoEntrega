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

class App {
    public express: express.Application

    constructor () {
      this.express = express()
      this.middlewares()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
      this.express.use('/upload', express.static('src/upload'))
    }

    private routes (): void {
      this.express.use(routes)
    }
}

export default new App().express
