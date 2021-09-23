'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterArmaSchema extends Schema {
  up () {
    this.table('armas', (table) => {
      table.renameColumn('data ultima_alteracao', 'data_ultima_alteracao')
    })
  }

  down () {
    this.table('armas', (table) => {
      table.renameColumn('data_ultima_alteracao', 'data ultima_alteracao')
    })
  }
}

module.exports = AlterArmaSchema
