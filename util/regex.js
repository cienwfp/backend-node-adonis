const { functions } = require("lodash")

module.exports = {

  ResPost:

    function (data) {

      const errors = {}

      if (data.restritivo) {

        const regEx = /^[A-Z]/

        if (data.restritivo.split("").length !== 1) {
          errors.length = 'Restritivo have to have a letter bettwen A into Z'
        }

        if (!data.restritivo.match(regEx)) {
          errors.Upcase = 'Restritivo have to have a letter upcase'
        }
      }

      if (data.posicional) {
        
        const regEx = /^([0-9]{1,2})?$/ 

        if (!data.posicional.toString().match(regEx)) {
          errors.number = 'Posicional have to have a Integer Number'
        }
      }


      return {
        errors,
        valid: Object.keys(errors).length < 1
      };
    },
}