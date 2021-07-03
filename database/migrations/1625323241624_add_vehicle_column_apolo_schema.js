'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddVehicleColumnApoloSchema extends Schema {
  up () {
    this.alter('vehicle', (table) => {
      table.string('pais')
      table.string('uf')
      table.string('municipio')
      table.string('identificador')
      table.string('ano_fabricacao')
      table.string('marcas_visiveis')
      table.string('proprietario')
      table.string('real_condutor')
      table.string('instituicao_proprietaria')
      table.string('usuario_ultima_alteracao')
      table.string('status')
    })
  }

  down () {
    this.table('vehicle', (table) => {
      table.dropColumn('pais')
      table.dropColumn('uf')
      table.dropColumn('municipio')
      table.dropColumn('identificador')
      table.dropColumn('ano_fabricacao')
      table.dropColumn('marcas_visiveis')
      table.dropColumn('proprietario')
      table.dropColumn('real_condutor')
      table.dropColumn('instituicao_proprietaria')
      table.dropColumn('usuario_ultima_alteracao')
      table.dropColumn('status')
    })
  }
}

module.exports = AddVehicleColumnApoloSchema
