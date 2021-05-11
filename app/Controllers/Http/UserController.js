"use strict"

const Person = use("App/Models/Person")
const User = use("App/Models/User")

class UserController {
  async create ({ request, params }) {

    const people_id = params.people_id

    const data = request.only(["username", "email", "password"])

    const people = await Person.find(people_id)

    if (!people) {
      return ({"status": 400, "mesage":"Not Found people"})
    }
    
    const user = await User.findBy('people_id', people_id )

    if (user) {
      return ({"status": 400, "mesage":"This people exist user"})
    }
    const user_ = await User.create({'people_id': people_id, ...data})

    return user_
  }
}

module.exports = UserController