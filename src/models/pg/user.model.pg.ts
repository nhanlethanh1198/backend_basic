import { sequelize } from '@/config/sql.config'
import { DataTypes, Model } from 'sequelize'
import type { v4 as uuid } from 'uuid'
import ConstantNumber from '@/constants/number.constant'

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
    unique: true,
    validate: {
      len: [ConstantNumber.USERNAME_MIN_LENGTH, ConstantNumber.USERNAME_MAX_LENGTH]
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [ConstantNumber.NAME_MIN_LENGTH, ConstantNumber.NAME_MAX_LENGTH]
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [ConstantNumber.NAME_MIN_LENGTH, ConstantNumber.NAME_MAX_LENGTH]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      max: ConstantNumber.EMAIL_MAX_LENGTH
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: ConstantNumber.PASSWORD_MIN_LENGTH
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [ConstantNumber.PHONE_MIN_LENGTH, ConstantNumber.PHONE_MAX_LENGTH]
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [ConstantNumber.ADDRESS_MIN_LENGTH, ConstantNumber.ADDRESS_MAX_LENGTH]
    }
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

export default User;