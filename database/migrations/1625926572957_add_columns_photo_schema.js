'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsPhotoSchema extends Schema {
  up () {
    this.table('photos', (table) => {
      table.string('restritivo')
      table.string('posicional')
    })
  }

  down () {
    this.table('photos', (table) => {
      table.dropColumn('restritivo')
      table.dropColumn('posicional')
    })
  }
}

module.exports = AddColumnsPhotoSchema
