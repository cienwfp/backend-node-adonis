'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vehicle extends Model {

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

  static get table() {
    return 'vehicle'
  }
  
}

module.exports = Vehicle
