import { QueryInterface, DataTypes } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function up (q: QueryInterface) {
  await q.addColumn('pedidos', 'info_ad', {
    type: DataTypes.STRING
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function down (q: QueryInterface) {
  await q.removeColumn('pedidos', 'info_ad')
}
