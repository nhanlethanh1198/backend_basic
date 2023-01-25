import { Model } from "@sequelize/core";


// type UserAssociations = "posts" | "comments" | "roles";

export class User extends Model {

  // declare public id: string | any;
  declare public username: string;
  declare public name: string;
  declare public email: string;
  declare public password: string;
  declare public phone: string;
  declare public address: string;
  declare public is_admin: boolean;

  declare public readonly created_at: Date;
  declare public updated_at: Date;
  declare public deleted_at: Date;

  // declare public getPosts: HasManyGetAssociationsMixin<Post>;
  // declare public setPosts: HasManySetAssociationsMixin<Post, Post['id']>;
  // declare public addPost: HasManyAddAssociationMixin<Post, Post['id']>;
  // declare public addPosts: HasManyAddAssociationsMixin<Post, Post['id']>;
  // declare public createPost: HasManyCreateAssociationMixin<Post>;
  // declare public removePost: HasManyRemoveAssociationMixin<Post, Post['id']>;
  // declare public removePosts: HasManyRemoveAssociationsMixin<Post, Post['id']>;
  // declare public hasPost: HasManyHasAssociationMixin<Post, Post['id']>;
  // declare public hasPosts: HasManyHasAssociationsMixin<Post, Post['id']>;
  // declare public countPosts: HasManyCountAssociationsMixin;


  // declare public getComments: HasManyGetAssociationsMixin<Comment>;
  // declare public setComments: HasManySetAssociationsMixin<Comment, Comment['id']>;
  // declare public addComment: HasManyAddAssociationMixin<Comment, Comment['id']>;
  // declare public addComments: HasManyAddAssociationsMixin<Comment, Comment['id']>;
  // declare public createComment: HasManyCreateAssociationMixin<Comment>;
  // declare public removeComment: HasManyRemoveAssociationMixin<Comment, Comment['id']>;
  // declare public removeComments: HasManyRemoveAssociationsMixin<Comment, Comment['id']>;
  // declare public hasComment: HasManyHasAssociationMixin<Comment, Comment['id']>;
  // declare public hasComments: HasManyHasAssociationsMixin<Comment, Comment['id']>;
  // declare public countComments: HasManyCountAssociationsMixin;


  // declare public getRoles: BelongsToManyGetAssociationsMixin<Role>;
  // declare public setRoles: BelongsToManySetAssociationsMixin<Role, Role['id']>;
  // declare public addRole: BelongsToManyAddAssociationMixin<Role, Role['id']>;
  // declare public addRoles: BelongsToManyAddAssociationsMixin<Role, Role['id']>;
  // declare public createRole: BelongsToManyCreateAssociationMixin<Role>;
  // declare public removeRole: BelongsToManyRemoveAssociationMixin<Role, Role['id']>;
  // declare public removeRoles: BelongsToManyRemoveAssociationsMixin<Role, Role['id']>;
  // declare public hasRole: BelongsToManyHasAssociationMixin<Role, Role['id']>;
  // declare public hasRoles: BelongsToManyHasAssociationsMixin<Role, Role['id']>;
  // declare public countRoles: BelongsToManyCountAssociationsMixin;

  // static initModel(sequelize: Sequelize) {
  //   User.init({
  //     id: {
  //       type: DataTypes.UUID,
  //       defaultValue: DataTypes.UUIDV4,
  //       primaryKey: true
  //     }
  //   }, { sequelize });
  // }

}