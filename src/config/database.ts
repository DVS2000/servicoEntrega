import { Options } from 'sequelize'

export const dbConfig: Options = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'servico_entrega',
  define: {
    timestamps: true,
    underscored: true
  }
}

