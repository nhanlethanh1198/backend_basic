import {Model, DataTypes} from 'sequelize'
import {sequelize} from '@/config/sql.config'
import ModelConstant from '@/constants/model.pg.constant'

class Post extends Model {
  declare id: uuid
  declare title: string
  declare metaTitle: string
  declare slug: string
  declare summary: string
  declare published: boolean
  declare content: string
  declare published_at: Date
  declare readonly created_at: Date
  declare readonly updated_at: Date
  declare readonly deleted_at: Date
}

Post.init({
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
  summary: {
    type: DataTypes.TEXT
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
  modelName: 'Post',
  tableName: ModelConstant.POST_MODEL,
})

export default Post