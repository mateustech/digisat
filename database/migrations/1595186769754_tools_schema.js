'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ToolsSchema extends Schema {
  up () {
    this.create('tools', (table) => {
      table.increments()
      table.string('name',240).notNullable()
      table.string('marca',240)
      table.timestamps()
    })
  }

  down () {
    this.drop('tools')
  }
}

module.exports = ToolsSchema
