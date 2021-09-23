'use strict'

const { v4: uuidv4 } = require('uuid');

const GenerateIdHook = exports = module.exports = {}

GenerateIdHook.uuid = async _id => {
  _id.id = uuidv4();
}
