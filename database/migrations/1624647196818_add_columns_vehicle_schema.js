'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsVehicleSchema extends Schema {
  up () {
    this.alter('vehicle', (table) => {
      table.string('cor')
      table.string('obs')
    })
  }

  down () {
    this.alter('vehicle', (table) => {
      table.string('cor')
      table.string('obs')
    })
  }
}

module.exports = AddColumnsVehicleSchema
