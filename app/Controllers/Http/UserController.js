"use strict"

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

    const people_id = params.people_id
    const data = request.only(["username", "email", "password"])
    const people = await Person.find(people_id)
    
    if (!people) {
      return ({ "status": 400, "mesage": "Not Found people" })
    }

    const user = await User.findBy('people_id', people_id)

    if (user) {
      return ({ "status": 400, "mesage": "This people exist user" })
    }

    const user_ = await User.create({ 'people_id': people_id, ...data })

    return user_
  }

  async show({ params }) {

    /**
     * Show all profile relationship whit user
     * GET /user/:id
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

        return (
          response.
            status(401).
            send({ error: 'Not authorized' })
        )
      }
    }


    await user.delete()

    return (
      response
        .status(200).
        json({ 'mesage': 'Deleted' })
    )
  }
}

module.exports = UserController