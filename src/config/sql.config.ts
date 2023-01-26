import { InstanceUpdateOptions, Sequelize, UpdateOptions } from 'sequelize'
import VariableEnv from '@/env/variable.env'
import logger from '@/utils/logger.util'

const {
  POSTGRES_DATABASE_URL,
  POSTGRES_DATABASE_NAME,
  POSTGRES_DATABASE_USERNAME,
  POSTGRES_DATABASE_PASSWORD,
} = VariableEnv

export const sequelize = new Sequelize(POSTGRES_DATABASE_NAME, POSTGRES_DATABASE_USERNAME, POSTGRES_DATABASE_PASSWORD, {
  dialect: 'postgres',
  host: POSTGRES_DATABASE_URL,
  port: 5432,
  database: POSTGRES_DATABASE_NAME,
  define: {
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    hooks: {
      beforeUpdate: function(instance: any, options: InstanceUpdateOptions) {
        instance.updatedAt = new Date()
      },
      beforeBulkUpdate: function(options: UpdateOptions) {
        options.individualHooks = true
      },
    },
  },
});

export const postgresTestConnectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    logger.info('Postgres connection has been established successfully.')
  } catch (error) {
    logger.error('Unable to connect to the database:', error)
  }
}

export const syncSequelize = async (): Promise<void> => {
  try {
    await sequelize.sync({
      alter: true,
    })
    logger.info('Sequelize sync has been established successfully.')
  } catch (error) {
    logger.error('Unable to connect to the database:', error)
  }
}