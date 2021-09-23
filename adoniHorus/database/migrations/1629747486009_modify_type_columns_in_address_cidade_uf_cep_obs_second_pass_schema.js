'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ModifyTypeColumnsInAddressCidadeUfCepObsSecondPassSchema extends Schema {
  up() {
    this.table('addresses', (table) => {
      table.string('cidade')
      table.string('uf')
      table.string('cep')
      table.string('obs')
    })
  }

  down() {
    this.table('addresses', (table) => {
      table.dropColumn('cidade')
      table.dropColumn('uf')
      table.dropColumn('cep')
      table.dropColumn('obs')
    })
  }
}

module.exports = ModifyTypeColumnsInAddressCidadeUfCepObsSecondPassSchema
