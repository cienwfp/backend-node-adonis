'use strict'

const Person = use('App/Models/Person')
const Arma = use('App/Models/Arma')
const { messageBadRequest } = require('../../Hooks/Message')
const Message = require('../../Hooks/Message')


class ArmaController {
  /**
   * Show a list of all armas.
   * GET armas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {

    if ((!request._body.numero_serie ||
      request._body.numero_serie === null) &&
      !request._body.tipo_arma) {

      const armas = await Arma
        .query()
        .with('people')
        .fetch()

      return (armas)

    }

    if (request._body.numero_serie) {

      const arma = await Arma
        .query()
        .where('numero_serie', request._body.numero_serie)
        .with('people')
        .fetch()

      if (arma.rows.length !== 0) {

        return (arma)

      } else {

        return (

          response.status(404),
          Message.messageNotFound('Arma não encontrada com o número de série')

        )

      }

    }

    if (request._body.tipo_arma) {
      const armas = await Arma
        .query()
        .where('tipo_arma', request._body.tipo_arma)
        .with('people')
        .fetch()

      if (armas.rows.length === 0) {
        
        return (

          response.status(404),
          Message.messageNotFound(`Tipo de arma não encontrado ${request._body.tipo_arma}`)

        )

      } else {
        
        return armas
      
      }
    }
  }

  /**
   * Create/save a new arma.
   * POST armas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {

    const data = request.only(
      [
        'personId',
        'tipo_arma',
        'numero_serie',
        'numero_ro',
        'data_ro',
        'instituicao_geradora_ro',
        'observacao',
        'importador',
        'pais_origem',
        'localidade_apreensao',
        'outras_observacoes',
        'nivel',
        'status',
        'posicional',
        'restritivo'
      ]
    )

    if (!data.tipo_arma) {
      
      return (
        
        response.status(406),
        Message.messageNotAcceptable('Inserir o tipo de arma')

      )
    }

    if (data.numero_serie !== null) {
      
      const arma_ = await Arma.findBy('numero_serie', data.numero_serie)

      if (arma_) {
        
        return (

          response.status(409),
          Message.messageConflict('Arma já existe')

        )
      
      }

    }

    if (data.personId) {

      const people = await Person.find(data.personId)

      if (!people) {
        
        return (

          response.status(404),
          Message.messageNotFound('Não encontrado')

        )
      
      }

      //data.usuario_ultima_atualizacao = auth.user.username
      //if (!data.usuario_ultima_atualizacao || data.usuario_ultima_atualizacao == null) {
      //return Message.messageUnauthorized('Unauthorized')
      //}
      data.usuario_ultima_atualizacao = auth.user.username

      for (let prop in data) {
        if (typeof(data[prop] === 'string') && data[prop] !== null) {
          data[prop] = data[prop].toUpperCase()
        }
      }

      await Arma.create(data)

      return (
        
        response.status(200),
        Message.messageOk('Arma criada com sucesso')

      )

    } else {

      data.usuario_ultima_atualizacao = auth.user.username
      const arma_ = await Arma.create(data)
      
      return (

        response.status(200),
        Message.messageOk('Arma criada com sucesso')

      )

    }

  }

  /**
   * Update arma details.
   * PUT with ID in the body of the request
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, auth }) {

    const data = request.body

    for (let prop in data) {
      if (typeof(data[prop] === 'string') && data[prop] !== null) {
        data[prop] = data[prop].toUpperCase()
      }
    }

    if (!data.id) {

      return (

        response.status(406),
        Message.messageNotAcceptable('Inserir id da arma')

      )

    }

    if (data.personId) {

      const people = await Person.find(data.personId)
      
      if (!people) {
      
        return (
          
          response.status(404),
          Message.messageNotFound('Pessoa não encontrada')

        )

      }

    }

    const arma = await Arma.find(data.id)

    if (!arma) {
      
      return (

        response.status(404),
        Message.messageNotFound('Arma não encontrada')

      )

    }

    data.usuario_ultima_atualizacao = auth.user.username

    arma.merge(data)
    await arma.save()

    return (
      
      response.status(200),
      Message.messageOk('Atualizada com sucesso')

    )

  }

  /**
   * Delete a arma with id.
   * DELETE armas/
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ request }) {

    const armaId = request.body.id

    const arma = await Arma.find(armaId)

    if (!arma) {

      return (

        response.status(404),
        Message.messageNotFound('Arma não encontrada')

      )
    }

    await arma.delete()

    return (

      response.status(200),
      Message.messageOk('Deletada com sucesso')

    )

  }
}

module.exports = ArmaController
