import {Model, DataTypes} from 'sequelize'
import {sequelize} from '@/config/sql.config'
import ModelConstant from '@/constants/model.pg.constant'

class PostMeta extends Model {
  declare id: uuid
  declare readonly created_at: Date
  declare readonly updated_at: Date
  declare readonly deleted_at: Date
}

PostMeta.init({
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
  modelName: 'PostTag',
  tableName: ModelConstant.POST_TAG_MODEL,
})

export default PostMeta