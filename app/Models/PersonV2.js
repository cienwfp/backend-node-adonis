'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PersonV2 extends Model {
  static boot() {
    super.boot();
    this.addHook("beforeCreate", "PersonV2Hook.uuid");
  }

  static get primaryKey() {
    return "id";
  }

  static get incrementing() {
    return false;
  }

  // Rest of the model
}

module.exports = PersonV2
