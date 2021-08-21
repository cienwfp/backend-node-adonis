'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemoveColumnsInPhotoSchema extends Schema {
  up() {
    this.table('photos', (table) => {
      table.dropColumn('restritivo')
      table.dropColumn('posicional')
    })
  }

  down() {
    this.table('photos', (table) => {
      table.string('restritivo')
      table.string('posicional')
    })
  }
}

module.exports = RemoveColumnsInPhotoSchema

