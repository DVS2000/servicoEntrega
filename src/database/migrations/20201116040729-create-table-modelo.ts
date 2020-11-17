import { DataTypes, QueryInterface } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function up (q: QueryInterface) {
  await q.createTable('modelos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marca_id: {
      type: DataTypes.INTEGER,
      references: { model: 'marca', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function down (q: QueryInterface) {
  await q.dropTable('modelos')
}
