'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArmaSchema extends Schema {
  up () {
    this.create('armas', (table) => {
      table.uuid('id').primary().unique()
      table.uuid('personId')
      table.string('tipo_arma')
      table.string('numero_serie')
      table.string('numero_ro')
      table.string('data_ro')
      table.string('instituicao_geradora_ro')
      table.string('observacao')
      table.string('importador')
      table.string('pais_origem')
      table.string('localidade_apreensao')
      table.string('outras_observacoes')
      table.string('nivel')
      table.string('usuario_ultima_atualizacao')
      table.string('data ultima_alteracao')
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('armas')
  }
}

module.exports = ArmaSchema
