import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute, CreateOptions,
  Sequelize
} from 'sequelize'
import {sequelize} from '@/config/sql.config'
import ModelConstant from '@/constants/model.pg.constant'
import {PostModel as Post} from '.'

type UserAssociations = 'posts'

class User extends Model<
  InferAttributes<User, {omit: UserAssociations}>,
  InferCreationAttributes<User, {omit: UserAssociations}>
> {
    declare id: CreationOptional<uuid>
    declare first_name: string | null
    declare last_name: string | null
    declare email: string | null
    declare phone: string | null
    declare password: string | null
    declare is_admin: boolean
    declare readonly created_at: Date
    declare readonly updated_at: Date
    declare readonly deleted_at: Date | null

    declare static associations: {
      authors: Association<Post, User>,
    }

  declare posts?: NonAttribute<Post[]>
  declare getPosts: HasManyGetAssociationsMixin<Post>
  declare setPosts: HasManySetAssociationsMixin<Post, number>
  declare addPost: HasManyAddAssociationMixin<Post, number>
  declare addPosts: HasManyAddAssociationsMixin<Post, number>
  declare createPost: HasManyCreateAssociationMixin<Post>
  declare removePost: HasManyRemoveAssociationMixin<Post, number>
  declare removePosts: HasManyRemoveAssociationsMixin<Post, number>
  declare hasPost: HasManyHasAssociationMixin<Post, number>
  declare hasPosts: HasManyHasAssociationsMixin<Post, number>
  declare countPosts: HasManyCountAssociationsMixin

    static initModel(): typeof User {
      User.init({
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_admin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        }
      }, {
        sequelize,
        modelName: 'User',
        tableName: ModelConstant.USER_MODEL,
      })

      return User
    }
}



export default User