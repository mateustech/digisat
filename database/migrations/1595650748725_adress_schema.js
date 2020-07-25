'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdressSchema extends Schema {
  up () {
    this.create('adresses', (table) => {
      table.increments()
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('cep',10).notNullable()
      table.string('longradouro',140).nullable()
      table.string('complemento',60).nullable()
      table.string('numero',40).nullable()
      table.string('pont_ref',240).nullable()
      table.string('bairro',60).nullable()
      table.string('cidade',60).nullable()
      table.string('estado',60).nullable()
      table.string('lat',30).nullable()
      table.string('long',30).nullable()
      table.string('zone',240).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('adresses')
  }
}

module.exports = AdressSchema
