'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterColumnPeopleIdIntoPersonIdInPivotPeopleAddressSchema extends Schema {
  up () {
    this.table('pivot_people_address', (table) => {
      table.renameColumn('people_id', 'personId') // alter table
    })
  }

  down () {
    this.table('pivot_people_address', (table) => {
      table.renameColumn('personId', 'people_id')
    })// reverse alternations
    
  }
}

module.exports = AlterColumnPeopleIdIntoPersonIdInPivotPeopleAddressSchema
