'use strict'

const Model = use('Model')

class DeliveryLocation extends Model {
    user(){
        return this.hasOne('App/Models/User','delivery','id')
    }
}

module.exports = DeliveryLocation
