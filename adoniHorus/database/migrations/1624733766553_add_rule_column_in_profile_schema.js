'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddRuleColumnInProfileSchema extends Schema {
  up () {
    this.table('profiles', (table) => {
      table.json('rules')
    })
  }

  down () {
    this.table('profiles', (table) => {
      table.dropColumn('rules')
    })
  }
}

module.exports = AddRuleColumnInProfileSchema
