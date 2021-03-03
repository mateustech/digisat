"use strict";

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use("Env");

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use("Helpers");

const Url = require("url-parse");
const DATABASE_URL = new Url(Env.get("DATABASE_URL"));

module.exports = {
  connection: Env.get(DATABASE_URL),

  //comentario
  pg: {
    client: "pg",
    connection: {
      host: Env.get("DB_HOST"),
      port: Env.get("DB_PORT"),
      user: Env.get("DB_USER"),
      password: Env.get("DB_PASSWORD"),
      database: Env.get("DB_DATABASE"),
    },
    debug: Env.get("DB_DEBUG", false),
  },
};
