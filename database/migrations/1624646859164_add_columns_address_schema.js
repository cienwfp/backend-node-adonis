'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsAddressSchema extends Schema {
  up () {
    this.table('addresses', (table) => {
      table.string('complemento')
      table.string('bairro')
      table.integer('cidade')
      table.integer('uf')
      table.integer('cep')
      table.integer('obs')
    })
  }

  down () {
    this.table('addresses', (table) => {
      table.string('complemento')
      table.string('bairro')
      table.integer('cidade')
      table.integer('uf')
      table.integer('cep')
      table.integer('obs')
    })
  }
}

module.exports = AddColumnsAddressSchema
