'use strict'


const Address = use('App/Models/Address')
const People = use('App/Models/Person')
const { add } = require('@adonisjs/framework/src/Route/Store')
const Message = require('../../Hooks/Message')

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
  async index({ request, response }) {

    if (request._body.id) {
      const address = await Address
        .query()
        .where('id', request._body.id)
        .with('people')
        .fetch()

      if (address.rows.length === 0) {

        return (

          response.status(404),
          Message.messageNotFound(`Não encontrado`)

        )

      } else {

        return address
      }
    }

    const address = await Address.all()
    return address
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
  // async create({ request }) {
  // }

  /**
   * Create/save a new address.
   * POST addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const personId = request
      .only(
        [
          'personId'
        ]
      )

    if (!personId.personId) {

      return (

        response.status(406),
        Message.messageNotAcceptable('Inserir personId correto')

      )

    }

    const data = request
      .only(
        [
          "tipo_logradouro",
          "logradouro",
          "numero",
          "complemento",
          "bairro",
          "cidade",
          "uf",
          "cep",
          "obs"
        ]
      )

    const people = await People.find(personId.personId)

    if (!people) {

      return (

        response.status(404),
        Message.messageNotFound('Não encontrado')

      )

    }

    for (let prop in data) {
      if (typeof (data[prop] === 'string') && data[prop] !== null) {
        data[prop] = data[prop].toUpperCase()
      }
    }

    const address = await Address.findOrCreate(data)

    await people.address().attach(address.id)

    people.address = await people.address().fetch()


    return (

      response.status(200),
      Message.messageOk('Criado com sucesso')

    )
  }

  //return Message.messageConflict('People already registared')  


  /**
   * Display a single address.
   * GET addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ request, response, view }) {
    // const address = await Address.find(params.id)
    //return address
    /*if (request._body.id) {
      const address = await Address
        .query()
        .where('id', request._body.id)
        .with('people')
        .fetch()

      if (address.rows.length === 0) {
        return Message.messageNotFound(`Not found address`)
      } else {

        return address
      }
    }*/
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
  // async edit({ params, request, response, view }) {
  // }

  /**
   * Update address details.
   * PUT or PATCH addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response }) {
    /*
    const address = await Address.find(params.id)

    if (!address) {
      return Message.messageNotFound('Address not found')
    }

    const newAddress = request.body

    await address.merge(newAddress)

    await address.save()

    return address
    */
    const data = request.body

    for (let prop in data) {
      if (typeof (data[prop] === 'string') && data[prop] !== null) {
        data[prop] = data[prop].toUpperCase()
      }
    }

    const address = await Address.find(data.id)

    if (!address) {

      return (

        response.status(404),
        Message.messageNotFound('Não encontrado')

      )
    }

    address.merge(data)
    await address.save()

    return (

      response.status(200),
      Message.messageOk('Atualizado com sucesso')

    )

  }

  /**
   * Delete a address with id.
   * DELETE addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ request, response }) {
    /*
     const address = await Address.find(params.id)
 
     if (!address) {
       return Message.messageNotFound('Address not found')
 
     }
 
     await address.delete()
 
     return Message.messageOk('Deleted success')
     */
    const addressId = request.body.id

    const address = await Address.find(addressId)

    if (!address) {

      return (

        response.status(404),
        Message.messageNotFound('Não encontrado')

      )
    }

    await address.delete()

    return (

      response.status(200),
      Message.messageOk('Deletado com sucesso')

    )

  }

}

module.exports = AddressController
