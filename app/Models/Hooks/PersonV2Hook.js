'use strict'

const { v4: uuidv4 } = require('uuid');

const PersonV2Hook = exports = module.exports = {}

PersonV2Hook.uuid = async personv2 => {
  personv2.id = uuidv4();
}
