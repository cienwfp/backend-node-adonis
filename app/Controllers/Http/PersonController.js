'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Person = use("App/Models/Person")
const Validation = require('../../../config/validation')

/**
 * Resourceful controller for interacting with people
 */
class PersonController {
  /**
   * Show a list of all people.
   * GET people
   */
  async index({ request, response, view }) {

    //const people = await Person.all()
    const people = await Person
      .query()
      .with('users.profile')
      .with('photos')
      .with('address')
      .with('vehicles')
      .fetch()

    return people
  }

  /**
   * Create/save a new person.
   * POST people
   */
  async store({ request, response }) {
    let data_

    const data = request._body

    if (!data.cpf) {
     
      data_ = await Person
      .query()
      .where({'name': data.name})
      .andWhere({'mae': data.mae})
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

    console.log(data_)
    if (data_.rows.length!==0) {
      return (
        response
          .status(409)
          .send(
            {
              'mesage': 'People already registared',
              ...data_
            }
          )
      )
    }
    
    if (!data.cpf) {
      data.cpf = "00000000000"
    } else {
      const cpf = Validation.validationCFP(data.cpf)
      if (cpf === false) {
        return (
          response
            .status(400)
            .send({ 'mesage': 'CPF is not valid' })
        )
      }
    }

    const people = await Person.create(data)

    return people

  }

  /**
   * Display a single person.
   * GET people/:id
   */
  async show({ params }) {

    const people_id = params.people_id
    const people = await Person
    .query()
    .where({'id':people_id})
    .with('users.profile')
    .with('photos')
    .with('address')
    .with('vehicles')
    .fetch()

  return people
  }

  /**
   * Update person details.
   * PUT or PATCH people/:id
   */
  async update({ params, request }) {

    const people_id = params.id

    const data = request.body

    const people = await Person.find(people_id)

    people.merge(data)
    await people.save()

    return people

  }

  /**
   * Delete a person with id.
   * DELETE people/:id
   */
  async destroy({ params, request, response }) {

    const people_id = params.id

    const people = await Person.find(people_id)

    //if (people.user_id !== auth.user.id) {
    //  return response.status(401).send({ error: 'Not authorized' })
    //}

    await people.delete()

    return (
      response
        .status(200)
        .send({ 'mesage': 'Deleted' })
    )
  }
}

module.exports = PersonController
