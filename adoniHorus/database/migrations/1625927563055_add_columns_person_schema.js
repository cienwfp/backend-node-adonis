'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsPersonSchema extends Schema {
  up () {
    this.table('people', (table) => {
      table.string('restritivo')
      table.string('posicional')
    })
  }

  down () {
    this.table('people', (table) => {
      table.dropColumn('restritivo')
      table.dropColumn('posicional')
    })
  }
}

module.exports = AddColumnsPersonSchema
