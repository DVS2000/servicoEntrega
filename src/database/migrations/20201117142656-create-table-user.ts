import { DataTypes, QueryInterface } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function up (q: QueryInterface) {
  await q.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    second_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING,
    url_photo: DataTypes.STRING,
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo_id: {
      type: DataTypes.INTEGER,
      references: { model: 'typeusers', key: 'id' },
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
  await q.dropTable('users')
}
