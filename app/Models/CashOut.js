'use strict'

const Model = use('Model')

class CashOut extends Model {
    serviceDeliver(){
        return this.hasOne('App/Models/ServiceDelivery')
    }
}

module.exports = CashOut
