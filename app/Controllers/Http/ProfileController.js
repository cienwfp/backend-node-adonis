'use strict'

const Profile = use('App/Models/Profile')
const User = use('App/Models/User')
const Message = require('../../Hooks/Message')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with profiles
 */
class ProfileController {

  async index() {

    /**
     * Show a list of all profiles.
     * GET profile
     */

    // const profiles = await Profile.all()

    const profilesUsers = await Profile.query().with('users').fetch()

    return (profilesUsers)
  }

  async store({ params, request, response }) {

    /**
   * Create/save a new profile.
   */

    const dados = request.only(['profile', 'unidade', 'carteira', 'rules', 'restritivo', 'posicional'])

    const user = await User.find(params.user_id)

    const profile = await Profile.findOrCreate(dados)

    await user.profile().attach(profile.id)

    profile.user = await profile.users().fetch()

    return user
    //return profile

  }

  async show({ params, request, response, view }) {
    /**
   * Display a single profile.
   * GET profiles/:id
   */

    let user

    const profiles = await Profile.find(params.id)

    try {
      return await profiles.users().fetch()
    }
    catch {
      return user = []
    }
  }

  /**
   * Update profile details.
   * PUT or PATCH profiles/:id
   */
  async update({ params, request }) {

    const data = request.only([
      'profile', 'unidade', 'carteira', 'rules', 'restritivo', 'posicional'
    ])
    console.log(data)
    const profile = await Profile.find(params.id)

    profile.merge(data)
    await profile.save()

    return profile

  }

  /**
   * Delete a profile with id.
   * DELETE profiles/:id
   */
  async destroy({ params, response }) {

    const profile = await Profile.find(params.id)

    if (profile) {
      await profile.delete()
      return Message.messageOk('deleted')

    } else {
      return Message.messageNotFound(`Not Found profile ${params.id}`)
    }



  }
}
module.exports = ProfileController
