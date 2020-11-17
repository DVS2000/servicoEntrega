import { DataTypes, QueryInterface } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function up (q: QueryInterface) {
  await q.createTable('marca', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url_img: DataTypes.STRING,
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
  await q.dropTable('marca')
}
