'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RelationshipPeopleToPerson extends Model {

  static boot() {
    super.boot();
    this.addHook("beforeCreate", "GenerateIdHook.uuid");
  }

  static get primaryKey() {
    return "id";
  }

  static get incrementing() {
    return false;
  }
}

module.exports = RelationshipPeopleToPerson
