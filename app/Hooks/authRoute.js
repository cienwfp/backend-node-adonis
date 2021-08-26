'use restrict'

const { isNull } = require("lodash")
const _ = require("lodash")
const Env = use('Env')

const User = use('App/Models/User')

const rules = {
  create: false,
  read: false,
  updade: false,
  delete: false
}

var PosRest = {
  restritivo: null,
  posicional: null
}

module.exports = {

  userIsLogin:
    async function (userAuth) {

      const user = await User
        .query()
        .where('id', userAuth.id)
        .with('profile')
        .fetch()

      const restritivo = user.rows[0].$relations.profile.rows[0].restritivo
      const posicional = user.rows[0].$relations.profile.rows[0].posicional

      return {restritivo: restritivo, posicional: posicional}

    },

  rulesUser:
    async function (userAuth) {

      const user = await User
        .query()
        .where('id', userAuth.id)
        .with('profile')
        .fetch()

      const rules_ = user.rows[0].$relations.profile.rows[0]

      if (!rules_) {

        return rules

      } else {

        return rules_.rules.user

      }
    },

  rulesProfile:
    async function (userAuth) {

      const user = await User
        .query()
        .where('id', userAuth.id)
        .with('profile')
        .fetch()

      const rules_ = user.rows[0].$relations.profile.rows[0]

      if (!rules_) {

        return rules

      } else {

        return rules_.rules.profile

      }
    },

  rulesPerson:
    async function (userAuth) {

      const user = await User
        .query()
        .where('id', userAuth.id)
        .with('profile')
        .fetch()

      const rules_ = user.rows[0].$relations.profile.rows[0]

      if (!rules_) {

        return rules

      } else {

        return rules_.rules.person

      }
    },

  rulesResPostUser:
    async function (restritivo, posicional, users) {

      var usersFilter
      var usersFilter_ = new Array()

      for (i in users.rows) {

        if
          (users.rows[i].$relations.profile.rows[0] &&
          users.rows[i].$relations.profile.rows.length !== 0) {

          const restritivoPesq = (users.rows[i].$relations.profile.rows[0].restritivo)
          const posicionalPesq = (users.rows[i].$relations.profile.rows[0].posicional)

          if (restritivo === restritivoPesq && posicional >= posicionalPesq) {

            usersFilter = { ...users.rows[i].$attributes, ...users.rows[i].$relations }

          }

        } else {

          usersFilter = { ...users.rows[i].$attributes, ...users.rows[i].$relations }

        }

        usersFilter_.push(usersFilter)

      }

      return usersFilter_
    },

  rulesResPostPeople:
    async function (restritivo, posicional, people) {

      var peopleFilter
      var peopleFilter_ = new Array()

      for (i in people.rows) {

        if (people.rows[i] !== 0) {

          const restritivoPesq = (people.rows[i].restritivo)
          const posicionalPesq = (people.rows[i].posicional)

          if
            ((restritivo == restritivoPesq && posicional >= posicionalPesq) ||
            (!restritivoPesq) && (!posicionalPesq)) {

            peopleFilter = { ...people.rows[i].$attributes, ...people.rows[i].$relations }

            peopleFilter_.push(peopleFilter);

          }

        }
      }
      return peopleFilter_
    },

  rulesResPostPeopleUpdateDelete:
    async function (restritivo, posicional, people) {

      const restritivoPesq = (people.restritivo)
      const posicionalPesq = (people.posicional)

      if
        ((restritivo == restritivoPesq && posicional >= posicionalPesq) ||
        (!restritivoPesq) && (!posicionalPesq)) {

        return true

      }

      return false
 
    }
}