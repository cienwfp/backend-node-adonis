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
        Message.messageNotFound(`Not found vehicle whit placa ${request._body.placa}`)
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
      Message.messageNotAcceptable('Not send placa')
    }

    const vehicle = await Vehicle.findBy('placa', data.placa)

    if (vehicle) {
      Message.messageConflict('Vehicle exist')
    }

    if (data.personId) {

      const people = await Person.find(data.personId)

      if (!people) {
        Message.messageNotFound('Not found people')
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
<<<<<<< HEAD
      return (
        response
          .status(404)
          .send({ 'message': `Not found vehicle with ${data.placa}` })
      )
=======
      Message.messageNotFound(`Not found vehicle with ${data.placa}`)
>>>>>>> 5aada35e694a49db5dbdef12601f28f4e534d3ea
    }

    vehicle.merge(data)
    await vehicle.save()

<<<<<<< HEAD
    return (
      response
        .status(200)
        .send({ 'message': 'Update vehicle sucess' })
    )
=======
    Message.messageOk('Update vehicle sucess')
>>>>>>> 5aada35e694a49db5dbdef12601f28f4e534d3ea
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
<<<<<<< HEAD
      return (
        response
          .status(404)
          .send({ 'message': `Not found vehicle with ${request._body.placa}` })
      )
=======
      Message.messageNotFound(`Not found vehicle with ${request._body.placa}`)
>>>>>>> 5aada35e694a49db5dbdef12601f28f4e534d3ea
    }

    await vehicle.delete()

<<<<<<< HEAD
    return (
      response
        .status(200)
        .send({ 'message': 'Delete vehicle sucess' })
    )
=======
    Message.messageOk('Delete vehicle sucess')

>>>>>>> 5aada35e694a49db5dbdef12601f28f4e534d3ea
  }
}

module.exports = VehicleController
