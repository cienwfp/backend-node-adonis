'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterPersonSchema extends Schema {
  up() {
    this.table('people', (table) => {
      table.dropColumn('restritivo')
      table.dropColumn('posicional')
    })
  }

  down() {
    this.table('people', (table) => {
      table.string('restritivo')
      table.string('posicional')
    })
  }

}

module.exports = AlterPersonSchema
