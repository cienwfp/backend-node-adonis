'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsPersonSchema extends Schema {
  up () {
    this.table('people', (table) => {
      table.string('obs')
    })
  }

  down () {
    this.table('people', (table) => {
      table.string('obs')
    })
  }
}

module.exports = AddColumnsPersonSchema
