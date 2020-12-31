import { QueryInterface, DataTypes } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function up (q: QueryInterface) {
  await q.addColumn('pedidos', 'preco', {
    type: DataTypes.DECIMAL({ precision: 10, scale: 2 }),
    allowNull: false
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function down (q: QueryInterface) {
  await q.removeColumn('pedidos', 'preco')
}
