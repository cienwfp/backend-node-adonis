'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsPhotoSchema extends Schema {
  up () {
    this.table('photos', (table) => {
      table.string('obs')
    })
  }

  down () {
    this.table('photos', (table) => {
      table.dropColumn('obs')
    })
  }
}

module.exports = AddColumnsPhotoSchema
