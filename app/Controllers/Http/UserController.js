"use strict"

const Message = require("../../Hooks/Message")
const Rules = require("../../Hooks/authRoute")
const { validateRegisterUser, validateUpdateUserInput } = require('../../../util/validators')
const { get } = require("@adonisjs/lucid/src/Factory")
const Regex = require("../../../util/regex")
const Env = use('Env')

const Person = use("App/Models/Person")
const User = use("App/Models/User")
class UserController {

  async index({ request, auth }) {

    const userAuth = auth.user.$originalAttributes //id, username, email, password, enabled, personId)

    //Consulta o Id de quem está logado
    //Resgata os valores do campo restritivo e posicional do usuário logado
    //check se os valores restritivo e posicional são válidos.
    //check se o usuário é administrador
    if (userAuth.username !== Env.get("USER_MASTER")) {

      const user = await User
        .query()
        .where('id', userAuth.id)
        .with('profile')
        .fetch()

      const restritivo = user.rows[0].$relations.profile.rows[0].restritivo
      const posicional = user.rows[0].$relations.profile.rows[0].posicional

      const { valid, errors } = await Regex.ResPost(restritivo, posicional)

      //verifica se a leitura dos campos estão corretos.
      if (!valid) {
        return (Message.messageBadRequest(errors))
      }
      //check as regras para o usuário logado  
      const check = await Rules.rulesUser(userAuth)

      //check se o usuário tem autorização para acessar o resultado
      if (check.read) {

        if (!request._body.id) {

          const users = await User
            .query()
            .with('profile')
            .fetch()

          const checkResPost = await Rules.rulesResPostUser(restritivo, posicional, users)

          return checkResPost
        }

        if (request._body.id) {
          
          const user = await User
            .query()
            .where('id', request._body.id)
            .with('profile')
            .fetch()

          if (user.rows.length === 0) {
            return Message.messageNotFound(`Not found id User`)
          } else {

            return user
          }

        }
      } else {

        return Message.messageUnauthorized('Unauthorized')
      }

    } else {

      if (!request._body.id) {

        const users = await User
          .query()
          .with('profile')
          .fetch()

        return users
      }

      if (request._body.id) {
        const user = await User
          .query()
          .where('id', request._body.id)
          .with('profile')
          .fetch()

        if (user.rows.length === 0) {
          return Message.messageNotFound(`Not found id User`)
        } else {

          return user
        }
      }
    }
  }


  async store({ request, auth }) {

    /**
     * Create user for people
     * POST user/:user_id
     */

    const userAuth = auth.user.$originalAttributes //id, username, email, password, enabled, personId)

    const check = await Rules.rulesUser(userAuth)

    if (check.create || userAuth.username === Env.get("USER_MASTER")) {

      const data = request.only(["personId", "username", "email", "password", "enabled"])

      const { errors, valid } = validateRegisterUser(data.personId, data.username, data.email, data.password, data.enabled)

      if (!valid) {
        return Message.messageNotAcceptable(errors)
      }

      if (!data.personId || data.personId == null) {
        return Message.messageNotAcceptable('Not send ID person')
      }
      const people = await Person.find(data.personId)

      if (!people) {
        return Message.messageNotFound('Not Found people')
      }

      const user = await User.findBy('personId', data.personId)

      if (user) {
        return Message.messageBadRequest("This people exist user")
      }

      const user_ = await User.create(data)

      return Message.messageOk('Person created success')

    } else {

      return Message.messageUnauthorized('Unauthorized')
    }
  }

  async update({ request, auth }) {

    const userAuth = auth.user.$originalAttributes //id, username, email, password, enabled, personId)

    const check = await Rules.rulesUser(userAuth)

    if (check.update || userAuth.username === Env.get("USER_MASTER")) {

      const data = request.body

      const user = await User.find(data.id)

      const { errors, valid } = validateUpdateUserInput(data)

      if (!valid) {
        return Message.messageNotAcceptable(errors)
      }

      if (!user) {
        return Message.messageNotFound('Not found user')
      }
      user.merge(data)
      await user.save()

      return Message.messageOk('Update user sucess')

    } else {

      return Message.messageUnauthorized('Unauthorized')
    }
  }

  async destroy({ request, auth }) {

    /**
     * Delete user
     * DELETE /user/:id
     */

    const userAuth = auth.user.$originalAttributes //id, username, email, password, enabled, personId)

    const check = await Rules.rulesUser(userAuth)

    if (check.delete || userAuth.username === Env.get("USER_MASTER")) {
      //const user = await User.find(params.id)
      const data = request.body
      const user = await User.find(data.id)

      await user.delete()

      return Message.messageUnauthorized('Deleted')

    } else {

      return Message.messageUnauthorized('Unauthorized')
    }
  }
}

module.exports = UserController
