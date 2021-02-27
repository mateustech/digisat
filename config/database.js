"use strict";

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use("Env");

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use("Helpers");

const Url = require("url-parse");
const DATABASE_URL = new Url(Env.get("DATABASE_URL"));

module.exports = {
  /*
  mais um comentario
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get(DATABASE_URL.DB_CONNECTION, 'pg'),


  pg: {
    client: "pg",
    connection: {
      // host: Env.get("DB_HOST", DATABASE_URL.hostname),
      host: "ec2-54-160-67-197.compute-1.amazonaws.com",
      // port: Env.get("DB_PORT", DATABASE_URL.port),
      port: "5432",
      // user: Env.get("DB_USER", DATABASE_URL.username),
      user: "ttuodeotydljxy",
      // password: Env.get('DB_PASSWORD', DATABASE_URL.password),
      password: "38516f7cb4e30dc46810681bb3ecb217aba8fe6c96cded0d53961e04a6bf1dc2",
      // database: Env.get('DB_DATABASE', DATABASE_URL.DB_DATABASE)
      database: "d78e90g6dhgvua"
    },
    debug: Env.get("DB_DEBUG", false),
  },
};
