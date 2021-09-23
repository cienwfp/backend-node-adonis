'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profile extends Model {
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
            return (this
                .belongsToMany('App/Models/User', 'profile_id', 'user_id', 'id', 'id')
                .pivotTable('user_profile_pivots')
            )
    }
}

module.exports = Profile
