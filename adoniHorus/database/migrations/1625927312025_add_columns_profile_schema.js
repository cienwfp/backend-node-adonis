'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsProfileSchema extends Schema {
  up () {
    this.table('profiles', (table) => {
      table.string('restritivo')
      table.string('posicional')
    })
  }

  down () {
    this.table('profiles', (table) => {
      table.dropColumn('restritivo')
      table.dropColumn('posicional')
    })
  }
}

module.exports = AddColumnsProfileSchema
