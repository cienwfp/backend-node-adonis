"use strict"

const Message = require("../../Hooks/Message")

const Person = use("App/Models/Person")
const User = use("App/Models/User")

class UserController {

  async index() {
    const user = await User.query().with('profile').fetch()
    return user
  }

  async store({ request, params }) {

    /**
     * Create user for people
     * POST user/:user_id
     */

    const personId = params.personId
    console.log(personId)
    const data = request.only(["username", "email", "password"])
    const people = await Person.find(personId)

    if (!people) {
      return Message.messageNotFound('Not Found people')
    }

    const user = await User.findBy('personId', personId)

    if (user) {
      return Message.messageBadRequest("This people exist user")
    }

    const user_ = await User.create({ 'personId': personId, ...data })

    return user_
  }

  async show({ params }) {

    /**
     * Show all profile relationship whit user
     * GET /user/:
     */

    let userProfile

    const user = await User.find(params.id)

    try {
      const userProfile = user.profile().fetch()
      return userProfile
    }
    catch {
      return (userProfile = [])
    }
  }

  async destroy({ params, auth, response }) {

    /**
     * Delete user
     * DELETE /user/:id
     */
    var userAuth__

    const user = await User.find(params.id)

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
