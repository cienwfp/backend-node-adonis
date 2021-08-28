'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemoveColumnTipoLogradouroInPeopleSchema extends Schema {
  up () {
    this.table('people', (table) => {
      table.dropColumn('tipo_logradouro')
    })
  }

  down () {
    this.table('people', (table) => {
      table.string('tipo_logradouro')
    })
  }
}

module.exports = RemoveColumnTipoLogradouroInPeopleSchema
