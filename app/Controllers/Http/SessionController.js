'use strict'

const Message = require("../../Hooks/Message")

const User = use("App/Models/User")

const Env = use('Env')

class SessionController {

  async create({ request, auth, response }) {

    const { username, password } = request.all()

    const user = await User.findBy('username', username)

    if (user) {

      if (user.enabled) {

        try {

          const token = await auth.attempt(username, password)

          return token

        } catch {

          return (

            response.status(401),
            Message.messageUnauthorized('Senha incorreta')

          )
        
        }

      } else {

        return (

          response.status(200),
          Message.messageUnauthorized('Usuário não habilitado')
      
        )
      
      }

    } else {

      return (

        response.status(404),
        Message.messageNotFound('Usuário não encontrado')

      )

    }

  }

}

module.exports = SessionController