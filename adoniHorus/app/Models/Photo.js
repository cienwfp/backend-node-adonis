'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Photo extends Model {
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

  people () {
    return this.hasOne('App/Models/Person', 'personId', 'id')
  }
}

module.exports = Photo
