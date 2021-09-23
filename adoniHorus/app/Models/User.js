'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()
    this.addHook("beforeCreate", "GenerateIdHook.uuid");
    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get visible() {
    return ['username', 'email', 'id']
  }
  
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  person () {
    return this.hasOne('App/Models/Person')
  }

  profile () {
      return (this
          .belongsToMany('App/Models/Profile', 'user_id', 'profile_id', 'id', 'id')
          .pivotTable('user_profile_pivots')
      )
  }
}

module.exports = User
