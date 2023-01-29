import {Model, DataTypes} from 'sequelize'
import {sequelize} from '@/config/sql.config'
import ModelConstant from '@/constants/model.pg.constant'

class Category extends Model {
  declare id: uuid
  declare title: string
  declare metaTitle: string
  declare slug: string
  declare content: string
  declare readonly created_at: Date
  declare readonly updated_at: Date
  declare readonly deleted_at: Date
}

Category.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(75),
    allowNull: false
  },
  metaTitle: {
    type: DataTypes.STRING(100)
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  content: {
    type: DataTypes.TEXT
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'Category',
  tableName: ModelConstant.CATEGORY_MODEL,
})

export default Category