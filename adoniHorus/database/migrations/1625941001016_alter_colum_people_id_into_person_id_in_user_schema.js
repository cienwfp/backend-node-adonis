'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterColumPeopleIdIntoPersonIdInUserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.renameColumn('people_id', 'personId')
    })
  }

  down () {
    this.alter('users', (table) => {
      table.renameColumn('personId', 'people_id')
    })
  }
}

module.exports = AlterColumPeopleIdIntoPersonIdInUserSchema
