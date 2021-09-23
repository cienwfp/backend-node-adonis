'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RelationshipPeopleToPeopleSchema extends Schema {
  up () {
    this.create('relationship_people_to_people', (table) => {
      table.uuid('id').primary().unique()
      table
        .uuid('personIdFirst')
        .unsigned()
        .notNullable()
       table
        .string('relation')
        .notNullable()
      table
        .uuid('personIdSecond')
        .unsigned()
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('relationship_people_to_people')
  }
}

module.exports = RelationshipPeopleToPeopleSchema