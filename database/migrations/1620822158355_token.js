'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Env = use('Env')

class TokensSchema extends Schema {
  async up () {
    this.create('tokens', (table) => {
      table.increments()
      table
        .uuid('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })

    const userAdmin = {
      'username': Env.get('USER_MASTER'),
      'email': Env.get('USER_MASTER'),
      'password': Env.get('PASSWORD_MASTER'),
      'enabled': true
    }

    await use('App/Models/User').create(userAdmin)

  }

  down () {
    this.drop('tokens')
  }
}

module.exports = TokensSchema
