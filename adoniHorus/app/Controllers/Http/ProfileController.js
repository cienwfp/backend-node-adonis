'use strict'

const Profile = use('App/Models/Profile')
const User = use('App/Models/User')
const Message = require('../../Hooks/Message')
const _ = require('lodash')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with profiles
 */
class ProfileController {

  async index({ request, Response }) {

    const id = request.body.id

    if (request.body.id) {
      const profile = await Profile
        .query()
        .where('id', id)
        .with('users')
        .fetch()

      if (profile.rows.length === 0) {

        return (

          response.status(404),
          Message.messageNotFound(`Id do Perfil não encontrado`)

        )

      } else {

        return profile

      }

    }

    if (!request.body.id) {
      const profile = await Profile
        .query()
        .with('users')
        .fetch()

      return profile

    }

  }

  /*  
    const profile = await Profile
      .query()
      .with('users')
      .fetch()

    return (profile)
*/



  async store({ request, response }) {

    /**
   * Create/save a new profile.
   */

    var dados = {}

    dados.rules = {
      user: {
        create: false,
        update: false,
        read: false,
        delete: false
      },
      person: {
        create: false,
        update: false,
        read: false,
        delete: false
      },
      arma: {
        create: false,
        update: false,
        read: false,
        delete: false
      },
      vehicle: {
        create: false,
        update: false,
        read: false,
        delete: false
      },
      profile: {
        create: false,
        update: false,
        read: false,
        delete: false
      }
    }

    const userId = request.body.userId

    const dadosReq = request.only(['profile', 'unidade', 'carteira', 'rules', 'restritivo', 'posicional'])

    _.merge(dados, dadosReq)

    const user = await User.find(userId)

    const profile = await Profile.findOrCreate(dados)

    await user.profile().attach(profile.id)

    profile.user = await profile.users().fetch()

    return (

      response.status(200),
      Message.messageOk('Profile cadastrado com sucesso')

    )

  }

  /**
 * Update profile details.
 * PUT or PATCH profiles/:id
 */
  async update({ request }) {
    /*
        const data = request.only([
          'profile', 'unidade', 'carteira', 'rules', 'restritivo', 'posicional'
        ])
        console.log(data)
        const profile = await Profile.find(params.id)
    
        profile.merge(data)
        await profile.save()
    
        return profile */
    const data = request.body
    const profile = await Profile.find(data.id)

    if (!profile) {

      return (

        response.status(404),
        Message.messageNotFound('Perfil não encontrado')

      )
    }

    profile.merge(data)
    await profile.save()

    return (

      response.status(200),
      Message.messageOk('Perfil atualizado com sucesso')

    )

  }

  /**
   * Delete a profile with id.
   * DELETE profiles/:id
   */
  async destroy({ request }) {

    const data = request.body
    const profile = await Profile.find(data.id)

    if (profile) {

      await profile.delete()

      return (

        response.status(200),
        Message.messageOk('Perfil deletado')

      )

    } else {

      return (

        response.status(404),
        Message.messageNotFound('Perfil não encontrado')

      )

    }

    /*
      const profile = await Profile.find(params.id)
  
      if (profile) {
        await profile.delete()
        return Message.messageOk('deleted')
  
      } else {
        return Message.messageNotFound(`Not Found profile ${params.id}`)
      }
  */

  }

}

module.exports = ProfileController
