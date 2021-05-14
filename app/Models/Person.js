'use strict'

const { primaryKey } = require('@adonisjs/lucid/src/Lucid/Model');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class Person extends Model {
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

  users() {
    return this.hasMany('App/Models/User', 'id', 'people_id')
  }
}

module.exports = Person
