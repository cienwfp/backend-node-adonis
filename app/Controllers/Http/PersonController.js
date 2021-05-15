'use strict'

const User = require('../../Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Person = use("App/Models/Person")

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
      .fetch()

    return people
  }

  /**
   * Create/save a new person.
   * POST people
   */
  async store({ request, response }) {

    const data = request.only(['name'])

    const people = await Person.create(data)

    return people

  }

  /**
   * Display a single person.
   * GET people/:id
   */
  async show({ params, request, response, view }) {

    const people_id = params.people_id

    const people = await Person.find(people_id)

    return people
  }

  /**
   * Update person details.
   * PUT or PATCH people/:id
   */
  async update({ params, request, response }) {

    const people_id = params.id

    const data = request.only([
      'name'
    ])

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

    return(response.status(200).send('Deleted'))
  }
}

module.exports = PersonController
