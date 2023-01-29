import {Model, DataTypes} from 'sequelize'
import {sequelize} from '@/config/sql.config'
import ModelConstant from '@/constants/model.pg.constant'

class PostCategory extends Model {
  declare id: uuid
  declare readonly created_at: Date
  declare readonly updated_at: Date
  declare readonly deleted_at: Date
}

PostCategory.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  modelName: 'PostCategory',
  tableName: ModelConstant.POST_CATEGORY_MODEL,
})

export default PostCategory