'use strict'

const Model = use('Model')

class Service extends Model {
    serviceType(){
        return this.hasOne('App/Models/ServiceType')
    }

    locations(){
        return this.hasMany('App/Models/Location')
    }

    serviceDeliver(){
        return this.hasOne('App/Models/ServiceDeliver')
    }

    client(){
        return this.hasOne('App/Models/Client')
    }
    
}

module.exports = Service
