// import Variable from '@/env/variable.env'
import * as process from 'process'

require('dotenv').config()
const Variable = process.env

module.exports = {
  development: {
    username: Variable.POSTGRES_DATABASE_USERNAME,
    password: Variable.POSTGRES_DATABASE_PASSWORD,
    database: Variable.POSTGRES_DATABASE_NAME,
    host: Variable.POSTGRES_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: Variable.POSTGRES_DATABASE_USERNAME,
    password: Variable.POSTGRES_DATABASE_PASSWORD,
    database: Variable.POSTGRES_DATABASE_NAME,
    host: Variable.POSTGRES_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: Variable.POSTGRES_DATABASE_USERNAME,
    password: Variable.POSTGRES_DATABASE_PASSWORD,
    database: Variable.POSTGRES_DATABASE_NAME,
    host: Variable.POSTGRES_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  }
}