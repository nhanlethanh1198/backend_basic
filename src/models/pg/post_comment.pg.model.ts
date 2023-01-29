import {Model, DataTypes} from 'sequelize'
import {sequelize} from '@/config/sql.config'
import ModelConstant from '@/constants/model.pg.constant'

class PostComment extends Model {
  declare id: uuid
  declare title: string
  declare published: boolean
  declare published_at: Date
  declare content: string
  declare readonly created_at: Date
  declare readonly updated_at: Date
  declare readonly deleted_at: Date
}

PostComment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(75),
    allowNull: false
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  publishedAt: {
    type: DataTypes.DATE
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
  modelName: 'PostComment',
  tableName: ModelConstant.POST_COMMENT_MODEL,
})

export default PostComment