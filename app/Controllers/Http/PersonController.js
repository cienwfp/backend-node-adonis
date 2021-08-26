'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Person = use("App/Models/Person")
const User = use("App/Models/User")
const Regex = require("../../../util/regex")
const Rules = require("../../Hooks/authRoute")
const Validation = require('../../../config/validation')
const { messageNotFound } = require('../../Hooks/Message')
const Message = require('../../Hooks/Message')
const Env = use('Env')

/**
 * Resourceful controller for interacting with people
 */
class PersonController {
  /**
   * Show a list of all people.
   * GET people
   */
  async index({ request, auth }) {

    const userAuth = auth.user.$originalAttributes //id, username, email, password, enabled, personId)

    //Consulta o Id de quem está logado
    //Resgata os valores do campo restritivo e posicional do usuário logado
    //check se os valores restritivo e posicional são válidos.
    //check se o usuário é administrador
    if (userAuth.username !== Env.get("USER_MASTER")) {

      const { restritivo, posicional } = await Rules.userIsLogin(userAuth)

      console.log(restritivo, posicional)

      const { valid, errors } = await Regex.ResPost(restritivo, posicional)

      //verifica se a leitura dos campos estão corretos.
      if (!valid) {
        return (Message.messageBadRequest(errors))
      }
      //check as regras para o usuário logado  
      const check = await Rules.rulesPerson(userAuth)

      //check se o usuário tem autorização para acessar o resultado
      if (check.read) {

        const onlyPhotos = request.body.onlyPhotos
        const id = request.body.personId

        if (id) {
          const people = await Person
            .query()
            .where('id', id)
            .with('users.profile')
            .with('photos')
            .with('address')
            .with('vehicles')
            .with('armas')
            .fetch()

          if (people.rows.length === 0) {
            return Message.messageNotFound(`Not found people`)
          } else {

            const checkResPost = await Rules.rulesResPostPeople(restritivo, posicional, people)

            if (checkResPost.length === 0) {
              return Message.messageUnauthorized('Unauthorized')
            }
            return checkResPost

          }
        }

        if (typeof (onlyPhotos) !== "boolean") {
          return Message.messageNotAcceptable('The onlyPhotos variable have to have boolean')
        }

        if (onlyPhotos === false) {
          const people = await Person
            .query()
            .with('users.profile')
            .with('photos')
            .with('address')
            .with('vehicles')
            .with('armas')
            .fetch()

          const checkResPost = await Rules.rulesResPostPeople(restritivo, posicional, people)

          if (checkResPost.length === 0) {
            return Message.messageUnauthorized('Unauthorized')
          }
          return checkResPost

        } else {

          const people = await Person.query().hasPhotos().with('photos').fetch()

          const checkResPost = await Rules.rulesResPostPeople(restritivo, posicional, people)

          if (checkResPost.length === 0) {
            return Message.messageUnauthorized('Unauthorized')
          }
          return checkResPost

        }
      } else {

        return Message.messageUnauthorized('User Unauthorized for read')

      }

    } else {

      const onlyPhotos = request.body.onlyPhotos
      const id = request.body.personId

      if (id) {
        const people = await Person
          .query()
          .where('id', id)
          .with('users.profile')
          .with('photos')
          .with('address')
          .with('vehicles')
          .with('armas')
          .fetch()

        if (people.rows.length === 0) {
          return Message.messageNotFound(`Not found people`)
        } else {
          return people
        }
      }

      if (typeof (onlyPhotos) !== "boolean") {
        return Message.messageNotAcceptable('The onlyPhotos variable have to have boolean')
      }

      if (onlyPhotos === false) {
        const people = await Person
          .query()
          .with('users.profile')
          .with('photos')
          .with('address')
          .with('vehicles')
          .with('armas')
          .fetch()

        return people

      } else {

        const people = await Person.query().hasPhotos().with('photos').fetch()
        return people

      }
    }
  }

  /**
   * Create/save a new person.
   * POST people
   */
  async store({ request }) {
    let data_

    const data = request._body

    if (!data.cpf) {

      data_ = await Person
        .query()
        .where({ 'name': data.name })
        .andWhere({ 'mae': data.mae })
        .fetch()

    } else {
      data_ = await Person
        .query()
        .where(
          {
            'name': data.name,
            'mae': data.mae
          }
        )
        .orWhere(
          {
            'cpf': data.cpf
          }
        )
        .fetch()
    }

    if (data_.rows.length !== 0) {
      return Message.messageConflict('People already registared')
    }

    if (!data.cpf) {
      data.cpf = "00000000000"
    } else {
      const cpf = Validation.validationCFP(data.cpf)
      if (cpf === false) {
        return messageNotFound('CPF is not valid')
      }
    }

    const people = await Person.create(data)

    return Message.messageCreated('Person created sucess')

  }

  /**
   * Display a single person.
   * GET people/:id
   */
  async show({ request }) {
  }

  async update({ request, auth }) {

    const userAuth = auth.user.$originalAttributes //id, username, email, password, enabled, personId)

    //Consulta o Id de quem está logado
    //Resgata os valores do campo restritivo e posicional do usuário logado
    //check se os valores restritivo e posicional são válidos.
    //check se o usuário é administrador
    if (userAuth.username !== Env.get("USER_MASTER")) {

      const { restritivo, posicional } = await Rules.userIsLogin(userAuth)

      const { valid, errors } = await Regex.ResPost(restritivo, posicional)

      //verifica se a leitura dos campos estão corretos.
      if (!valid) {
        return (Message.messageBadRequest(errors))
      }
      //check as regras para o usuário logado  
      const check = await Rules.rulesPerson(userAuth)

      //check se o usuário tem autorização para acessar o resultado
      if (check.update) {

        const data = request.body
        const people = await Person.find(data.id)

        if (!people) {
          return Message.messageNotFound('Not found people')
        }

        const checkResPost = await Rules.rulesResPostPeopleUpdateDelete(restritivo, posicional, people)

        if (!checkResPost) {
          return Message.messageUnauthorized('Unauthorized')
        }

        people.merge(data)
        await people.save()

        return Message.messageOk('Update people sucess')

      } else {

        return Message.messageUnauthorized('Unauthorized')

      }

    } else {

      const data = request.body
      const people = await Person.find(data.id)

      if (!people) {
        return Message.messageNotFound('Not found people')
      }

      people.merge(data)
      await people.save()

      return Message.messageOk('Update people sucess')

    }
  }

  /**
   * Delete a person with id.
   * DELETE people/:id
   */
  async destroy({ request, auth }) {

    const userAuth = auth.user.$originalAttributes //id, username, email, password, enabled, personId)

    //Consulta o Id de quem está logado
    //Resgata os valores do campo restritivo e posicional do usuário logado
    //check se os valores restritivo e posicional são válidos.
    //check se o usuário é administrador
    if (userAuth.username !== Env.get("USER_MASTER")) {

      const { restritivo, posicional } = await Rules.userIsLogin(userAuth)

      const { valid, errors } = await Regex.ResPost(restritivo, posicional)

      //verifica se a leitura dos campos estão corretos.
      if (!valid) {
        return (Message.messageBadRequest(errors))
      }
      //check as regras para o usuário logado  
      const check = await Rules.rulesPerson(userAuth)

      //check se o usuário tem autorização para acessar o resultado

      if (check.delete) {

        const peopleId = request.body.id

        const people = await Person.find(peopleId)

        if (!people) {
          return Message.messageNotFound('Not found people')
        }

        const checkResPost = await Rules.rulesResPostPeopleUpdateDelete(restritivo, posicional, people)

        if (!checkResPost) {
          return Message.messageUnauthorized('Unauthorized')
        }

        await people.delete()

        return Message.messageOk('Deleted sucess')

      } else {

        return Message.messageUnauthorized('Unauthorized')

      }

    } else {

      const peopleId = request.body.id

      const people = await Person.find(peopleId)

      if (!people) {
        return Message.messageNotFound('Not found people')
      }

      await people.delete()

      return Message.messageOk('Deleted sucess')

    }
  }
}

module.exports = PersonController
