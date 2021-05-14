'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserProfilePivotSchema extends Schema {
  up () {
    this.create('user_profile_pivots', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
      table
        .uuid('profile_id')
        .unsigned()
        .references('profiles.id')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_profile_pivots')
  }
}

module.exports = UserProfilePivotSchema
