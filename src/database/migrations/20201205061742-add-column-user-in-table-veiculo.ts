import { DataTypes, QueryInterface } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function up (q: QueryInterface) {
  await q.addColumn('veiculos', 'user_id', {
    type: DataTypes.INTEGER,
    references: { key: 'id', model: 'users' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function down (q: QueryInterface) {
  await q.removeColumn('veiculos', 'user_id')
}
