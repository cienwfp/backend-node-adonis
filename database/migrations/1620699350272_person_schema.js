'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonSchema extends Schema {
  up () {
    this.create('persons', (table) => {
      table.uuid('id').unique().primary()
      table.string('firstname', 20)
      table.string('middlename', 20)
      table.string('lastname', 20)
      table.string('vulgo', 20)
      table.date('datanascimento')
      table.string('natutal', 20)
      table.string('tipologradouro', 20)
      table.string('logradouro', 100)
      table.integer('numero', 20)
      table.string('complemento', 50)
      table.text('foto')
      table.boolean('organic', 20)
      table.timestamps()
    })
  }

  down () {
      this.drop('persons')
    }
}

module.exports = PersonSchema
