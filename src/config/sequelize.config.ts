import VariableEnv from '@/env/variable.env'

module.exports = {
  development: {
    username: VariableEnv.POSTGRES_DATABASE_USERNAME,
    password: VariableEnv.POSTGRES_DATABASE_PASSWORD,
    database: VariableEnv.POSTGRES_DATABASE_NAME,
    host: VariableEnv.POSTGRES_DATABASE_URL,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: VariableEnv.POSTGRES_DATABASE_USERNAME,
    password: VariableEnv.POSTGRES_DATABASE_PASSWORD,
    database: VariableEnv.POSTGRES_DATABASE_NAME,
    host: VariableEnv.POSTGRES_DATABASE_URL,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: VariableEnv.POSTGRES_DATABASE_USERNAME,
    password: VariableEnv.POSTGRES_DATABASE_PASSWORD,
    database: VariableEnv.POSTGRES_DATABASE_NAME,
    host: VariableEnv.POSTGRES_DATABASE_URL,
    dialect: 'postgres',
    logging: false
  }
}