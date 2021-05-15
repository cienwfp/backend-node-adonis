'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Photo = use('App/Models/Photo')
const Person = use('App/Models/Person')

/**
 * Resourceful controller for interacting with photos
 */
class PhotoController {
  /**
   * Show a list of all photos.
   * GET photos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const photos = await Photo.all()
    return photos
  }

  /**
   * Render a form to be used for creating a new photo.
   * GET photos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new photo.
   * POST photos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const photo = request.only(['people_id', 'photo_base64'])

    const people = await Person.find(photo.people_id)

    if (!people) {
      return ({ "status": 400, "mesage": "Not Found people" })
    }

    const photo_ = await Photo.create(photo)

    return photo_
  }

  /**
   * Display a single photo.
   * GET photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const photo = await Photo.find(params.id)

    return photo
  }

  /**
   * Render a form to update an existing photo.
   * GET photos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update photo details.
   * PUT or PATCH photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const photo = await Photo.find(params.id)

    const photo_ = request.only(['photo_base64'])

    photo.merge(photo_)

    await photo.save()

    return photo
  }

  /**
   * Delete a photo with id.
   * DELETE photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const photo = await Photo.find(params.id)

    await photo.delete()

    return (
      response.status(200).send({'mesage':'Photo was delete'})
    )
  }
}

module.exports = PhotoController
