'use strict'

const Person = use('App/Models/Person')
const Vehicle = use('App/Models/Arma')
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
  async index ({ request, response, view }) {

    if (request._body.arma === null) {
      const vehicles = await Arma.all()
      return (armas)

    } else {
      const vehicle = await Arma.findBy('arma', request._body.arma)

      if (arma) {
        if (arma.personId) {
          const prorpeties = await Person.find(arma.personId)
          return (
            [arma, prorpeties]
          )

        } else {
          return (arma)
        }

      } else {
        return Message.messageNotFound(`Not found arma ${request._body.arma}`)
      }
    }  
  }

  /**
   * Render a form to be used for creating a new arma.
   * GET armas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new arma.
   * POST armas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    
      const data = request.only(['tipo arma', 'numero serie', 'numero ro', 'data ro', 'instituicao geradora ro', 'observacao', 'importador', 'pais origem', 'localidade apreensao', 'outras observacoes', 'nivel', 'usuario ultima atualizacao', 'data ltima atualizacao', 'status'])
  
      if (!data.Arma) {
        return Message.messageNotAcceptable('Not send arma')
      }
  
      const arma = await Arma.findBy('arma', data.arma)
  
      if (arma) {
        return Message.messageConflict('Arma exist')
      }
  
      if (data.personId) {
  
        const people = await Person.find(data.personId)
  
        if (!arma) {
          return Message.messageNotFound('Not found arma')
        }
  
        const arma = await Arma.create(data)
  
        return (arma)
  
      } else {
        const data = request.only(['tipo arma', 'numero serie', 'numero ro', 'data ro', 'instituicao geradora ro', 'observacao', 'importador', 'pais origem', 'localidade apreensao', 'outras observacoes', 'nivel', 'usuario ultima atualizacao', 'data ltima atualizacao', 'status'])
        const arma = await Arma.create(data)
        return (arma)
      }
  
    }  

  /**
   * Display a single arma.
   * GET armas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing arma.
   * GET armas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update arma details.
   * PUT or PATCH armas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a arma with id.
   * DELETE armas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ArmaController
