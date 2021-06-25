'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsRelationshipPeopleToPeopleSchema extends Schema {
  up () {
    this.table('relationship_people_to_people', (table) => {
      table.string('obs')
    })
  }

  down () {
    this.table('relationship_people_to_people', (table) => {
      table.string('obs')
    })
  }
}

module.exports = AddColumnsRelationshipPeopleToPeopleSchema
