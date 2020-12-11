import { DataTypes, QueryInterface } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function up (q: QueryInterface) {
  await q.addColumn('pedidos', 'estado', {
    type: DataTypes.ENUM('Pendente', 'Em Andamento', 'Concluído', 'Cancelado'),
    allowNull: false
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function down (q: QueryInterface) {
  await q.removeColumn('pedidos', 'estado')
}
