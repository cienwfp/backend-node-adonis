'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Photo = use('App/Models/Photo')
const Person = use('App/Models/Person')
const Message = require('../../Hooks/Message')

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
  async index() {
   
    const onlyPhotos = request.body.onlyPhotos

    if (typeof (onlyPhotos) !== "boolean") {
      return Message.messageNotAcceptable('The onlyPhoto variable have to have boolean')
    } 

    if (onlyPhotos === false) {
      const people = await Person
      .query()
      .with('users.profile')
      .with('photos')
      .with('adress')
      .with('veicles')
      .with('armas')
      .fetch()

      return people

    } else {

      const people = await Person.query().hasPhotos().with('photos').fetch()
      return people
    }
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
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new photo.
   * POST photos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    let photo_base64_

    const photo = request.only(['personId', 'photo_base64', 'posicional', 'restritivo'])

    const people = await Person.find(photo.personId)

    if (!people) {
      return Message.messageNotFound("Not Found people")
    }

    for (photo_base64_ of photo.photo_base64) {
      await Photo
        .create(
          {
            'personId': photo.personId,
            'photo_base64': photo_base64_
          }
        )
    }

    return Message.messageOk('Photos saved')
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
  async show({ request }) {
  /*
    if (request._body.id) {
      const photo = await Photo
      .query()
      .where('id', request._body.id)
      .with('people')
      .fetch()

      if (photo.rows.length === 0) {
        return Message.messageNotFound(`Not found photo`)
      } else {
        return photo
      }
    }
  } 



  
  if (request._body.id) {
    const photo = await Photo
      .query()
      .where('id', request._body.id)
      .with('people')
      .fetch()

    if (photo.id) {
      return Message.messageNotFound(`Not found photo`)
    } else {

      return photo
    }*/
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
  async edit({ params, request, response, view }) {
  }

  /**
   * Update photo details.
   * PUT or PATCH photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response }) {

    const data = request.body
    const photo = await Photo.find(data.id)

    if (!photo) {
      return Message.messageNotFound('Not found photo')
    }

    photo.merge(data)
    await photo.save()

    return Message.messageOk('Update photo sucess')

    /*const photo = await Photo.find(params.id)
  
    const photo_ = request.only(['photo_base64'])
  
    photo.merge(photo_)
  
    await photo.save()
  
    return photo
    */
  }

  /**
   * Delete a photo with id.
   * DELETE photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ request, response }) {

    const photo = await Photo.findBy('id', request._body.id)

    if (!photo) {
      return Message.messageNotFound(`Not found photo`)
    }

    await photo.delete()

    return Message.messageOk('Delete photo sucess')

    //const photoId = request.body.id

    //const photo = await Photo.findBy(photoId)

    // if (!photo) {
    //  return Message.messageNotFound('Not found photo')
    //}
    //await photo.delete()

    //return Message.messageOk('Deleted sucess')

    /* const photo = await Photo.find(params.id)
  
    await photo.delete()
  
    return Message.messageOk('Photo was delete')
  }*/
  }
}
module.exports = PhotoController
