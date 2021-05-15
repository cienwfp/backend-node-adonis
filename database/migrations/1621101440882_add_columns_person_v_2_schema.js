'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsPersonV2Schema extends Schema {
  up () {
    this.table('people', (table) => {
      table.string('sexo')
      table.string('mae')
      table.string('pai')
      table.string('nacionalidade')
      table.date('data_nascimento')
      table.string('uf_nascimento')
      table.string('municipio_nascimento')
      table.string('cpf')
      table.string('rg')
      table.string('uf_rg')
      table.string('orgao_rg')
      table.boolean('obito')
      table.boolean('organico')
      table.string('codinome')
      table.integer('posicional')
      table.string('restritivo')
      })
  }

  down () {
    this.table('people', (table) => {
      table.dropColumn('sexo')
      table.dropColumn('mae')
      table.dropColumn('pai')
      table.dropColumn('nacionalidade')
      table.dropColumn('data_nascimento')
      table.dropColumn('uf_nascimento')
      table.dropColumn('municipio_nascimento')
      table.dropColumn('cpf')
      table.dropColumn('rg')
      table.dropColumn('uf_rg')
      table.dropColumn('orgao_rg')
      table.dropColumn('obito')
      table.dropColumn('organico')
      table.dropColumn('codinome')
      table.dropColumn('posicional')
      table.dropColumn('restritivo')
    })
  }
}

module.exports = AddColumnsPersonV2Schema
