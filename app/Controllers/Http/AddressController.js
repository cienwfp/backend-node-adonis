'use strict'

const Address = use('App/Models/Address')
const People = use('App/Models/Person')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with addresses
 */
class AddressController {
  /**
   * Show a list of all addresses.
   * GET addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const addresses = await Address.all()
    return addresses
  }

  /**
   * Render a form to be used for creating a new address.
   * GET addresses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request }) {
  }

  /**
   * Create/save a new address.
   * POST addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const people_id = request
      .only(
        [
          'people_id'
        ]
      )

    const dataAdress = request
      .only(
        [
          'tipo_logradouro',
          'logradouro',
          'numero'
        ]
      )

    const people = await People.find(people_id.people_id)

    console.log(people)

    const address = await Address.findOrCreate(dataAdress)

    await people.address().attach(address.id)

    people.address = await people.address().fetch()

    return people
  }

  /**
   * Display a single address.
   * GET addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const address = await Address.find(params.id)
    return address
  }

  /**
   * Render a form to update an existing address.
   * GET addresses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update address details.
   * PUT or PATCH addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const address = await Address.find(params.id)

    if (!address) {
      return (
        response
          .status(400)
          .send({ 'mesage': 'Address not found' })
      )
    }

    const newAddress = request.body

    await address.merge(newAddress)

    await address.save()

    return address
  }

  /**
   * Delete a address with id.
   * DELETE addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const address = await Address.find(params.id)

    if (!address) {
      return (
        response
          .status(400)
          .send({ 'mesage': 'Address not found' })
      )
    }

    await address.delete()

    return (
      response
        .status(200)
        .send({ 'mesage': 'deleted' })
    )
  }
}

module.exports = AddressController
