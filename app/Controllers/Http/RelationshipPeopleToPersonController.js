'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Person = use("App/Models/Person")
const RelationshipPeopleToPerson = use("App/Models/RelationshipPeopleToPerson")
const Message = require('../../Hooks/Message')

/**
 * Resourceful controller for interacting with relationshippeopletopeople
 */
class RelationshipPeopleToPersonController {
  /**
   * Show a list of all relationshippeopletopeople.
   * GET relationshippeopletopeople
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {

    const peoples = await RelationshipPeopleToPerson
      .query()
      .where('personIdFirst', request._body.personIdFirst)
      .fetch()

    if (peoples.rows.length !== 0) {

      var i = 0
      var result_ = []
      var result = {}

      do {

        const relationship = await Person
          .query()
          .where({ 'id': peoples.rows[i].$attributes.personIdSecond })
          .with('photos')
          .with('address')
          .fetch()

        result = {
          'relation': peoples.rows[i].$attributes.relation,
          relationship
        }

        result_.push(result)

        i += 1

      } while (i < peoples.rows.length)

      return (result_)

    } else {

      return ([])

    }

  }

  /**
   * Create/save a new relationshippeopletoperson.
   * POST relationshippeopletopeople
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const dados = request.only(['personIdFirst', 'relation', 'personIdSecond'])

    const personFirst = await Person.find(dados.personIdFirst)

    const personSecond = await Person.find(dados.personIdSecond)

    if (personFirst && personSecond) {

      const dataConsulta = {
        'personIdFirst': dados.personIdFirst,
        'personIdSecond': dados.personIdSecond
      }

      const dataUpdate = {
        relation: dados.relation
      }

      const exist = await RelationshipPeopleToPerson.findBy(dataConsulta)

      if (exist) {

        exist.relation = dados.relation

        exist.save()

        return (exist)

      } else {

        const newRelation = await RelationshipPeopleToPerson.create(dados)

        return (newRelation)

      }

    } else {

     return Message.messageNotFound('Pessoa não encontrada na base de dados. Você tem que criar uma pessoa antes de relacionamento')
    }
  }

  /**
   * Update relationshippeopletoperson details.
   * PUT or PATCH relationshippeopletopeople/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a relationshippeopletoperson with id.
   * DELETE relationshippeopletopeople/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ request, response }) {

    if (request._body.all) {

      const peoples = await RelationshipPeopleToPerson
        .query()
        .where('personIdFirst', request._body.personIdFirst)
        .fetch()

      if (peoples.rows.length !== 0) {

        var i = 0

        do {

          await peoples.rows[i].delete()
          i += 1

        } while (i < peoples.rows.length)

        return Message.messageOk('Deletado com sucesso')

      } else {
        return Message.messageBadRequest('Pessoa não tem relacionamento')
      }

    } else {
      const relation = await RelationshipPeopleToPerson
        .query()
        .where(
          {
            'personIdFirst': request._body.personIdFirst,
            'personIdSecond': request._body.personIdSecond
          })
        .fetch()

      if (relation) {

        await relation.rows[0].delete()

        return Message.messageOk('Deletado com sucesso')

      } else {

        return Message.messageBadRequest('Pessoa não tem relacionamento')
      }
    }

  }
}

module.exports = RelationshipPeopleToPersonController
