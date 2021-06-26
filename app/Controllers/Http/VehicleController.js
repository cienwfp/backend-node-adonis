'use strict'

const Person = use('App/Models/Person')
const Vehicle = use('App/Models/Vehicle')
const Message = require('../../Hooks/Message')

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
  async index({ request, response }) {

    if (request._body.placa === null) {
      const vehicles = await Vehicle.all()
      return (vehicles)

    } else {
      const vehicle = await Vehicle.findBy('placa', request._body.placa)

      if (vehicle) {
        if (vehicle.personId) {
          const prorpeties = await Person.find(vehicle.personId)
          return (
            [vehicle, prorpeties]
          )

        } else {
          return (vehicle)
        }

      } else {
        return Message.messageNotFound(`Not found vehicle whit placa ${request._body.placa}`)
      }
    }
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
      return Message.messageNotAcceptable('Not send placa')
    }

    const vehicle = await Vehicle.findBy('placa', data.placa)

    if (vehicle) {
      return Message.messageConflict('Vehicle exist')
    }

    if (data.personId) {

      const people = await Person.find(data.personId)

      if (!people) {
        return Message.messageNotFound('Not found people')
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
  async update({ request, response }) {
    const data = request.only(['placa', 'tipo', 'marca', 'modelo', 'personId'])
    const vehicle = await Vehicle.findBy('placa', data.placa)

    if (!vehicle) {
      return Message.messageNotFound(`Not found vehicle with ${data.placa}`)
    }

    vehicle.merge(data)
    await vehicle.save()

    return Message.messageOk('Update vehicle sucess')
  }

  /**
   * Delete a vehicle with id.
   * DELETE vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ request, response }) {
    const vehicle = await Vehicle.findBy('placa', request._body.placa)

    if (!vehicle) {
      return Message.messageNotFound(`Not found vehicle with ${request._body.placa}`)
    }

    await vehicle.delete()

    return Message.messageOk('Delete vehicle sucess')

  }
}

module.exports = VehicleController
