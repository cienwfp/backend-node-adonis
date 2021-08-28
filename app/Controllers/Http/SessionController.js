'use strict'

const Message = require("../../Hooks/Message")

const User = use("App/Models/User")

const Env = use('Env')

class SessionController {
  async create({ request, auth }) {
    const { username, password } = request.all()

    const user = await User.findBy('username', username)

    if (user) {
      if (user.enabled) {
        const token = await auth.attempt(username, password)
        return token
      } else {
        return Message.messageUnauthorized('Usuário nao habilitado')
      }
    }else{
      return Message.messageNotFound('Usuário não encontrado')
    }
  }
}

module.exports = SessionController