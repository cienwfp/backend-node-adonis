'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {
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
        return (
            this.belongsToMany('App/Models/Person', 'address_id', 'personId', 'id', 'id')
                .pivotTable('pivot_people_address')
        )
    }
}

module.exports = Address
