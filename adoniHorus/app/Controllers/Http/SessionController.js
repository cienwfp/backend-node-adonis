'use strict'

const Message = require("../../Hooks/Message")

const User = use("App/Models/User")

const Env = use('Env')

class SessionController {

  async create({ request, auth, response }) {

    const { username, password } = request.all()

    const user = await User
    .query()
    .where('username', username)
    .with('profile')
    .fetch()

    if (user.rows.lenght !== 0) {

      if (user.rows[0].$attributes.enabled) {

        try {

          const token = await auth.attempt(username, password,
            {
              "user": user
            }
          )

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