"use strict"

const Message = require("../../Hooks/Message")
const { validateRegisterUser } = require('../../../util/validators')

const Person = use("App/Models/Person")
const User = use("App/Models/User")

class UserController {

  async index() {
    const user = await User
      .query()
      .with('profile') 
      .fetch()

      delete user.password
    return user
  }

  async store({ request }) {

    /**
     * Create user for people
     * POST user/:user_id
     */

    const personId = params.personId
 
    const data = request.only(["username", "email", "password"])

    const { errors, valid } = validateRegisterUser(personId, data.username, data.email, data.password)   
    
    if (!valid) {
      return Message.messageNotAcceptable(errors)
    }

    const people = await Person.find(personId)

    if (!people) {
      return Message.messageNotFound('Not Found people')
    }

    const user = await User.findBy('personId', data.personId)

    if (user) {
      return Message.messageBadRequest("This people exist user")
    }

    const user_ = await User.create(data)

    return user_
  }

  async show({ request }) {

    /**
     * Show all profile relationship whit user
     * GET /user/:
     */

    let Profile
    const data = request.only(['id'])

    if (!data.id) {
      return Message.messageNotAcceptable('Not found user')
    }


    /*
    const userProfile = user.profile().fetch()
    return userProfile
    */

    const user = await User
      .query()
      .where('id', data.id)
      .with('profile')
      .fetch()


    return (user)


  }

  async update({ request }) {

    const data = request.body.id
    const user = await User.find(data.id)
    
    if (!user) {
      return Message.messageNotFound('Not found user')
    }
    user.merge(data)
    await user.save()

    return Message.messageOk('Update user sucess')

  }

  async destroy({ request, auth, response }) {

    /**
     * Delete user
     * DELETE /user/:id
     */
    var userAuth__

    //const user = await User.find(params.id)
    const data = request.body
    const user = await User.find(data.id)

    //if (people.user_id !== auth.user.id) {
    //  return response.status(401).send({ error: 'Not authorized' })
    //}

    const userAuth = await User.find(auth.user.id)

    const userAuth_ = await userAuth.profile().fetch()

    console.log(userAuth)
    console.log(userAuth_)

    for (userAuth__ of userAuth_.rows) {
      if (
        (userAuth__.profile !== 'coordenador') ||
        (userAuth__.unidade !== '1') ||
        (userAuth__.carteira !== 'segor')) {

        return Message.messageUnauthorized('Not authorized')
      }
    }


    await user.delete()

    return Message.messageUnauthorized('Deleted')

  }
}

module.exports = UserController
