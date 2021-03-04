"use strict";

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use("Env");

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use("Helpers");

const Url = require("url-parse");
const DATABASE_URL = new Url(Env.get("DATABASE_URL"));

module.exports = {
  connection: "pg",

  //comentario
  pg: {
    client: "pg",
    connection: {
      host: Env.get("DB_HOST", POSTGRES_DBHOST),
      port: Env.get("DB_PORT", POSTGRES_DBPORT),
      user: Env.get("DB_USER", POSTGRES_DBUSER),
      password: Env.get("DB_PASSWORD", POSTGRES_DBPASS),
      database: Env.get("DB_DATABASE", POSTGRES_DBNAME),
    },
    debug: Env.get("DB_DEBUG", false),
  },
};
