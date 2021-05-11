'use strict'

const { v4: uuidv4 } = require('uuid');

const PersonHook = exports = module.exports = {}

PersonHook.uuid = async people => {
  people.id = uuidv4();
}
