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
            return Message.messageNotFound(`Pessoa não encontrada`)
          } else {

            const checkResPost = await Rules.rulesResPostPeople(restritivo, posicional, people)

            if (checkResPost.length === 0) {
              return Message.messageUnauthorized('Não autorizado')
            }
            return checkResPost

          }
        }

        if (typeof (onlyPhotos) !== "boolean") {
          return Message.messageNotAcceptable('A variável onlyPhotos tem que ser true para sim ou false para não')
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
            return Message.messageUnauthorized('Não autorizado')
          }
          return checkResPost

        } else {

          const people = await Person.query().hasPhotos().with('photos').fetch()

          const checkResPost = await Rules.rulesResPostPeople(restritivo, posicional, people)

          if (checkResPost.length === 0) {
            return Message.messageUnauthorized('Não autorizado')
          }
          return checkResPost

        }
      } else {

        return Message.messageUnauthorized('Usuário não autorizado para leitura')

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
          return Message.messageNotFound(`Pessoa não enontrada`)
        } else {
          return people
        }
      }

      if (typeof (onlyPhotos) !== "boolean") {
        return Message.messageNotAcceptable('A variável onlyPhotos tem que ser true para sim ou false para não')
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
      return Message.messageConflict('Pessoa já registrada')
    }

    if (!data.cpf) {
      data.cpf = "00000000000"
    } else {
      const cpf = Validation.validationCFP(data.cpf)
      if (cpf === false) {
        return messageNotFound('CPF inválido')
      }
    }

    const people = await Person.create(data)

    return Message.messageCreated('Pessoa criada com sucesso')

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
          return Message.messageNotFound('Pessoa não encontrada')
        }

        const checkResPost = await Rules.rulesResPostPeopleUpdateDelete(restritivo, posicional, people)

        if (!checkResPost) {
          return Message.messageUnauthorized('Não autorizado')
        }

        people.merge(data)
        await people.save()

        return Message.messageOk('Atualizada com sucesso')

      } else {

        return Message.messageUnauthorized('Não autorizado')

      }

    } else {

      const data = request.body
      const people = await Person.find(data.id)

      if (!people) {
        return Message.messageNotFound('Pessoa não encontrada')
      }

      people.merge(data)
      await people.save()

      return Message.messageOk('Atualizado com sucesso')

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
          return Message.messageNotFound('Pessoa não encontrada')
        }

        const checkResPost = await Rules.rulesResPostPeopleUpdateDelete(restritivo, posicional, people)

        if (!checkResPost) {
          return Message.messageUnauthorized('Não autorizadi')
        }

        await people.delete()

        return Message.messageOk('Deletado com sucesso')

      } else {

        return Message.messageUnauthorized('Não autorizado')

      }

    } else {

      const peopleId = request.body.id

      const people = await Person.find(peopleId)

      if (!people) {
        return Message.messageNotFound('Pessoa não encontrada')
      }

      await people.delete()

      return Message.messageOk('Deletado com sucesso')

    }
  }
}

module.exports = PersonController
