'use strict'

const Model = use('Model')

class Client extends Model {
    user(){
        return this.hasOne('App/Models/User')
    }
    
    services () {
        return this.hasMany('App/Models/Service')
    }

    cards(){
        return this.hasMany('App/Models/Card')
    }

    ratings(){
        return this.hasMany('App/Models/Raring')
    }
}

module.exports = Client
