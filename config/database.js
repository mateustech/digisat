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
      host: Env.get("DB_HOST", DATABASE_URL.hostname),
      port: Env.get("DB_PORT", DATABASE_URL.port),
      user: Env.get("DB_USER", DATABASE_URL.username),
      password: Env.get('DB_PASSWORD', DATABASE_URL.password),
      database: Env.get('DB_DATABASE', DATABASE_URL.DB_DATABASE)
    },
    debug: Env.get("DB_DEBUG", false),
  },
};
