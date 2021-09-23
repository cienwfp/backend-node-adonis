const { functions } = require("lodash")
const User = use("App/Models/User")

module.exports = {

  ResPost:

    async function (restritivo, posicional) {

      const errors = {}

      if (restritivo) {

        const regEx = /^[A-Z]/

        if (restritivo.split("").length !== 1) {
          errors.length = 'Restritivo have to have a letter bettwen A into Z'
        }

        if (!restritivo.match(regEx)) {
          errors.Upcase = 'Restritivo have to have a letter upcase'
        }
      }

      if (posicional) {

        const regEx = /^([0-9]{1,2})?$/

        if (!posicional.toString().match(regEx)) {
          errors.number = 'Posicional have to have a Integer Number'
        }
      }

      return {
        errors,
        valid: Object.keys(errors).length < 1
      };
    },
}