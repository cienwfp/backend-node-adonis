'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PeopleAddressPivotSchema extends Schema {
  up () {
    this.create('pivot_people_address', (table) => {
      table.increments()
      table
        .uuid('people_id')
        .unsigned()
        .references('id')
        .inTable('people')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .uuid('address_id')
        .unsigned()
        .references('id')
        .inTable('addresses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .timestamps()
    })
  }

  down () {
    this.drop('pivot_people_address')
  }
}

module.exports = PeopleAddressPivotSchema
