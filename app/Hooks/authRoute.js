'use restrict'

const { functions } = require("lodash")

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

  rulesAddress:
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

        return rules_.rules.updade

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

        return rules_.rules.delete

      }
    },

  rulesPosRes:
    async function (userAuth) {

      const user = await User
        .query()
        .where('id', userAuth.id)
        .with('profile')
        .fetch()

      const PosRest_ = user.rows[0].$relations.profile.rows[0]

      if (!PosRest_) {

        return (PosRest)
        
      } else {

        PosRest = {
          posicional: PosRest_.posicional,
          restritivo: PosRest_.restritivo
        }

      return (PosRest)
      }
    },
}