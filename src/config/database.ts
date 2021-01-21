import { Options } from 'sequelize'

export const dbConfig: Options = {
  dialect: 'mysql',
  host: process.env.PORT === undefined ? 'localhost' : 'bpfmwze3rcqrhjnxcdag-mysql.services.clever-cloud.com',
  username: process.env.PORT === undefined ? 'root' : 'u2saoq57ijsitkbi',
  password: process.env.PORT === undefined ? '' : 'BwQwV8UoeGK3nuNMj3ns',
  database: process.env.PORT === undefined ? 'servico_entrega' : 'bpfmwze3rcqrhjnxcdag',
  define: {
    timestamps: true,
    underscored: true
  }
}
