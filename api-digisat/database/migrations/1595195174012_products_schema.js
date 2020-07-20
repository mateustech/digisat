'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('codigo',240).notNullable()
      table.string('nome',240)
      table.string('price_custo',240)
      table.string('price_venda',240)
      table.string('und_medida',240)
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
