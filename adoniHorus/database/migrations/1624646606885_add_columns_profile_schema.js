'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsProfileSchema extends Schema {
  up () {
    this.table('profiles', (table) => {
      table.string('obs')
    })
  }

  down () {
    this.table('profiles', (table) => {
      table.dropColumn('obs')
    })
  }
}

module.exports = AddColumnsProfileSchema
