'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PersonV2s = use("App/Models/PersonV2")

/**
 * Resourceful controller for interacting with personv2s
 */
class PersonV2Controller {
  /**
   * Show a list of all personv2s.
   * GET personv2s
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new personv2.
   * GET personv2s/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const data = request.only([
      'firstname',
      'middlename',
      'lastname',
      'vulgo',
      'datanascimento',
      'natutal',
      'tipologradouro',
      'logradouro',
      'numero',
      'complemento',
      'foto',
      'organic',
    ])  

    const person = await PersonV2s.create(data)

    return person
  }

  /**
   * Create/save a new personv2.
   * POST personv2s
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single personv2.
   * GET personv2s/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing personv2.
   * GET personv2s/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update personv2 details.
   * PUT or PATCH personv2s/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a personv2 with id.
   * DELETE personv2s/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PersonV2Controller
