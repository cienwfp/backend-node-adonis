'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ModifyTypeColumnsInAddressCidadeUfCepObsSchema extends Schema {
  up() {
    this.table('addresses', (table) => {
      table.dropColumn('cidade')
      table.dropColumn('uf')
      table.dropColumn('cep')
      table.dropColumn('obs')
    })
  }

  down() {
    this.table('addresses', (table) => {
      table.integer('cidade')
      table.integer('uf')
      table.integer('cep')
      table.integer('obs')
    })
  }
}

module.exports = ModifyTypeColumnsInAddressCidadeUfCepObsSchema
