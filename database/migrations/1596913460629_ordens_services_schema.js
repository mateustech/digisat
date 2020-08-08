"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrdensServicesSchema extends Schema {
  up() {
    this.create("ordens_services", (table) => {
      table.increments();
      table
        .integer("client_id")
        .unsigned()
        .references("id")
        .inTable("clients")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("colaborator_id")
        .unsigned()
        .references("id")
        .inTable("collaborators")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("adress_id")
        .unsigned()
        .references("id")
        .inTable("adresses")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("service_id")
        .unsigned()
        .references("id")
        .inTable("services")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.string("data").notNullable();
      table.string("hora");
      table.string("tempo");
      table.string("obs");
      table.timestamps();
    });
  }

  down() {
    this.drop("ordens_services");
  }
}

module.exports = OrdensServicesSchema;
