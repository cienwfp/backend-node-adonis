'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Person = use("App/Models/Person")
const Validation = require('../../../config/validation')
const { messageNotFound } = require('../../Hooks/Message')
const Message = require('../../Hooks/Message')

/**
 * Resourceful controller for interacting with people
 */
class PersonController {
  /**
   * Show a list of all people.
   * GET people
   */
  async index({ request }) {

    const onlyPhotos = request.body.onlyPhotos
    const id = request.body.personId

    if (id) {
      const people = await Person
        .query()
        .where('id', id)
        .with('users.profile')
        .with('photos')
        .with('address')
        .with('vehicles')
        .with('armas')
        .fetch()

      if (people.rows.length === 0) {
        return Message.messageNotFound(`Not found people`)
      } else {
        return people
      }
    }

    if (typeof (onlyPhotos) !== "boolean") {
      return Message.messageNotAcceptable('The onlyPhotos variable have to have boolean')
    }

    if (onlyPhotos === false) {
      const people = await Person
        .query()
        .with('users.profile')
        .with('photos')
        .with('address')
        .with('vehicles')
        .with('armas')
        .fetch()

      return people

    } else {

      const people = await Person.query().hasPhotos().with('photos').fetch()
      return people

    }
  }

  /**
   * Create/save a new person.
   * POST people
   */
  async store({ request }) {
    let data_

    const data = request._body

    if (!data.cpf) {

      data_ = await Person
        .query()
        .where({ 'name': data.name })
        .andWhere({ 'mae': data.mae })
        .fetch()

    } else {
      data_ = await Person
        .query()
        .where(
          {
            'name': data.name,
            'mae': data.mae
          }
        )
        .orWhere(
          {
            'cpf': data.cpf
          }
        )
        .fetch()
    }

    if (data_.rows.length !== 0) {
      return Message.messageConflict('People already registared')
    }

    if (!data.cpf) {
      data.cpf = "00000000000"
    } else {
      const cpf = Validation.validationCFP(data.cpf)
      if (cpf === false) {
        return messageNotFound('CPF is not valid')
      }
    }
   
    const people = await Person.create(data)

    return Message.messageCreated('Person created sucess')

  }

  /**
   * Display a single person.
   * GET people/:id
   */
  async show({ request }) {
  }

  async update({ request }) {

    const data = request.body
    const people = await Person.find(data.id)

    if (!people) {
      return Message.messageNotFound('Not found people')
    }
    people.merge(data)
    await people.save()

    return Message.messageOk('Update people sucess')

  }

  /**
   * Delete a person with id.
   * DELETE people/:id
   */
  async destroy({ request, response }) {

    //const personId = params.id

    //const people = await Person.find(personId)
    const peopleId = request.body.id

    const people = await Person.find(peopleId)

    if (!people) {
      return Message.messageNotFound('Not found people')
    }
    await people.delete()

    return Message.messageOk('Deleted sucess')



  }
}

module.exports = PersonController
