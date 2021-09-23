'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VehicleSchema extends Schema {
  up () {
    this.create('vehicle', (table) => {
      table.uuid('id').primary().unique()
      table.uuid('personId')
      table.string('placa').notNullable()
      table.string('tipo', 50).notNullable()
      table.string('marca', 50).notNullable()
      table.string('modelo', 50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vehicle')
  }
}

module.exports = VehicleSchema
