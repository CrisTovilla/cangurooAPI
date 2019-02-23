'use strict'

const Model = use('Model')

class Rating extends Model {
    serviceDeliver(){
        return this.hasOne('App/Models/ServiceDelivery')
    }
    client(){
        return this.hasOne('App/Models/ServiceClient')
    }
}

module.exports = Rating
