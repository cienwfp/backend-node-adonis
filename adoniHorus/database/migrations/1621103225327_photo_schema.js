'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PhotoSchema extends Schema {
  up () {
    this.create('photos', (table) => {
      table.uuid('id').primary()
      table
       .uuid('people_id')
       .unsigned()
       .references('id')
       .inTable('people')
       .onUpdate('CASCADE')
       .onDelete('CASCADE')
      table.text('photo_base64')
      table.timestamps()
    })
  }

  down () {
    this.drop('photos')
  }
}

module.exports = PhotoSchema
