import { QueryInterface, DataTypes } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function up (q: QueryInterface) {
  await q.addColumn('pedidos', 'localizacao_entrega', {
    type: DataTypes.STRING,
    allowNull: false
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function down (q: QueryInterface) {
  await q.removeColumn('pedidos', 'localizacao_entrega')
}
