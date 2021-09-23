'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsArmaSchema extends Schema {
  up () {
    this.table('armas', (table) => {
      table.string('restritivo')
      table.string('posicional')
    })
  }

  down () {
    this.table('armas', (table) => {
      table.dropColumn('restritivo')
      table.dropColumn('posicional')
    })
  }
}

module.exports = AddColumnsArmaSchema
