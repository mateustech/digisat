"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CollaboratorsSchema extends Schema {
  up() {
    this.create("collaborators", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("cpf");
      table.string("rg");
      table.string("contato").notNullable().unique();
      table.string("password").notNullable();
      table.string("cargo");
      table.timestamps();
    });
  }

  down() {
    this.drop("collaborators");
  }
}

module.exports = CollaboratorsSchema;
