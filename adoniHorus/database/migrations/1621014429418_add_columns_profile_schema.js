'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Profile extends Schema {
  up () {
    this.table('profiles', (table) => {
      table.string('unidade')
      table.string('carteira')
    })
  }

  down () {
    this.table('profiles', (table) => {
      table.dropColumn('unidade')
      table.dropColumn('carteira')
    })
  }
}

module.exports = Profile
