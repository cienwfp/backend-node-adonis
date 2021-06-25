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

  photos() {
    return this.hasMany('App/Models/Photo', 'id', 'people_id')
  }

  address() {
      return (
        this.belongsToMany('App/Models/Address', 'people_id', 'address_id', 'id', 'id')
            .pivotTable('pivot_people_address')
      )
    }

  vehicles() {
    return this.hasMany('App/Models/Vehicle', 'id', 'personId')
  }
}

module.exports = Person
