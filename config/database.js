'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')
const Url = require('url-parse')
const CLEARDB_DATABASE_URL = new Url(Env.get('CLEARDB_DATABASE_URL'))
module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'sqlite'),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be a good choice for a development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(`${Env.get('DB_DATABASE', 'development')}.sqlite`)
    },
    useNullAsDefault: true,
    debug: Env.get('DB_DEBUG', false)
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', '3306'),
      user: Env.get('DB_USER', 'up'),
      password: Env.get('DB_PASSWORD', 'Up@14111989'),
      database: Env.get('DB_DATABASE', 'canguroBD')
    },
    debug: Env.get('DB_DEBUG', false)
  },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST','ec2-54-163-234-88.compute-1.amazonaws.com'),
      port: Env.get('DB_PORT', '5432'),
      user: Env.get('DB_USER', 'madnlhduyvuodk'),
      password: Env.get('DB_PASSWORD', 'adc751560f84f0c8c899ad9219be831cdcf758465e12f22cfb2633010d3ca8ce'),
      database: Env.get('DB_DATABASE', 'd7lbkf1jgiucch')
    },
    debug: Env.get('DB_DEBUG', false)
  }
}
