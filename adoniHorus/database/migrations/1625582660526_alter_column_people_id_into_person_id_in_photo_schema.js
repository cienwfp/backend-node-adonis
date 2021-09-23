'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterColumnPeopleIdIntoPersonIdInPhotoSchema extends Schema {
  up () {
    this.alter('photos', (table) => {
      table.renameColumn('people_id', 'personId')
    })
  }

  down () {
    this.alter('photos', (table) => {
      table.renameColumn('personId', 'people_id')
    })
  }
}

module.exports = AlterColumnPeopleIdIntoPersonIdInPhotoSchema
