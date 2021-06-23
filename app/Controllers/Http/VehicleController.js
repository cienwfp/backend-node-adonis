'use strict'

const Person = use('App/Models/Person')
const Vehicle = use('App/Models/Vehicle')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with vehicles
 */
class VehicleController {
  /**
   * Show a list of all vehicles.
   * GET vehicles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Create/save a new vehicle.
   * POST vehicles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const data = request.only(['personId', 'placa', 'tipo', 'marca', 'modelo'])

    if (!data.placa) {
      return (
        response
          .status(400)
          .send({ 'message': 'Not send placa' })
      )
    }

    if (data.personId) {

      const people = await Person.find(data.personId)

      if (!people) {
        return (
          response
            .status(404)
            .send({ 'message': 'Not found people' })
        )
      }

      const vehicle = await Vehicle.create(data)

      return (vehicle)

    } else {
      const data = request.only(['placa', 'tipo', 'marca', 'modelo'])
      const vehicle = await Vehicle.create(data)
      return (vehicle)
    }

  }

  /**
   * Update vehicle details.
   * PUT or PATCH vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a vehicle with id.
   * DELETE vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = VehicleController
