import { sequelize } from "@/config/sql.config";
import { DataTypes, Model } from "@sequelize/core";
// import * as uuid from "uuid";
import type { v4 as uuid } from "uuid";


class User extends Model {
  declare public id: uuid;
  declare public username: string;
  declare public firstName: string;
  declare public lastName: string;
  declare public email: string;
  declare public password: string;
  declare public phone: string;
  declare public address: string;
  declare public isAdmin: boolean;

  declare public createdAt: Date;
  declare public updatedAt: Date;

  declare public deletedAt: Date;

}

User.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }

}, {
  sequelize,
  modelName: "User",
  tableName: "tbl_users",
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeUpdate: (user: User) => {
      user.updatedAt = new Date();
    }
  },
  defaultScope: {
    attributes: { exclude: ["password"] }
  },
  scopes: {
    withPassword: {
      attributes: { exclude: [] }
    },
    withDeleted: {
      paranoid: false
    },
    onlyDeleted: {
      paranoid: false,
      where: { deletedAt: { $ne: null } }
    }
  }
});