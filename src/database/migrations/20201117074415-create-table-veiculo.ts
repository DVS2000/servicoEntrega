import { DataTypes, QueryInterface } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function up (q: QueryInterface) {
  await q.createTable('veiculos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    combustivel: DataTypes.STRING,
    ano: DataTypes.DATE,
    cor: DataTypes.STRING,
    usado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    url_photo: DataTypes.STRING,
    modelo_id: {
      type: DataTypes.INTEGER,
      references: { model: 'modelos', key: 'id' },
      allowNull: false
    },
    comentarios: DataTypes.STRING,
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
  await q.dropTable('veiculos')
}
