'use strict'

const Model = use('Model')

class ServiceDelivery extends Model {
    user(){
        return this.hasOne('App/Models/User')
    }
    
    services(){
        return this.hasMany('App/Models/Service')
    }
    
}

module.exports = ServiceDelivery
