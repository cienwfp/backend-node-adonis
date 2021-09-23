module.exports = {
  messageOk:
    function (message) {
      return ({
        'status': 200,
        'message': message
      })
    },

  messageCreated:
    function (message) {
      return ({
        'status': 201,
        'message': message
      })
    },
  messageBadRequest:
    function (message) {
      return ({
        'status': 400,
        'message': message
      })
    },
  messageUnauthorized:
    function (message) {
      return ({
        'status': 401,
        'message': message
      })
    },
  messageNotFound:
    function (message) {
      return ({
        'status': 404,
        'message': message
      })
    },
  messageNotAcceptable:
    function (message) {
      return ({
        'status': 406,
        'message': message
      })
    },
  messageConflict:
    function (message) {
      return ({
        'status': 409,
        'message': message
      })
    },
}
