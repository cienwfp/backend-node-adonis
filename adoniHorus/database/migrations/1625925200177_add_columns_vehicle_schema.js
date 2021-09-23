'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsVehicleSchema extends Schema {
  up () {
    this.table('vehicle', (table) => {
      table.string('restritivo')
      table.string('posicional')
    })
  }

  down () {
    this.table('vehicle', (table) => {
      table.dropColumn('restritivo')
      table.dropColumn('posicional')
    })
  }
}

module.exports = AddColumnsVehicleSchema
