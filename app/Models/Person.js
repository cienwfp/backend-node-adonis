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
    return this.hasMany('App/Models/User', 'id', 'personId')
   }

  photos() {
    return this.hasMany('App/Models/Photo', 'id', 'personId')
  }

  address() {
      return (
        this.belongsToMany('App/Models/Address', 'personId', 'address_id', 'id', 'id')
            .pivotTable('pivot_people_address')
      )
    }

  vehicles() {
    return this.hasMany('App/Models/Vehicle', 'id', 'personId')
  }

  
  armas() {
    return this.hasMany('App/Models/Arma', 'id', 'personId')
  }
}

module.exports = Person
