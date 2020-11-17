/*
 * Name: Dorivaldo Vicente dos Santos
 * E-mail: dorivaldodossantos2000@gmail.com
 * Phone: 944557610 / 992228230(WhatsApp)
 * Github: https://github.com/DVS2000
 * Site: https://dorivaldodossantos.herokuapp.com
 */

import sequelize from 'sequelize'
import { dbConfig } from '../config/database'

class Database {
    public connection!: sequelize.Sequelize

    public constructor () {
      this.init()
    }

    private init (): void {
      this.connection = new sequelize.Sequelize(dbConfig)
    }
}

export default new Database().connection
