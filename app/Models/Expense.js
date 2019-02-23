'use strict'

const Model = use('Model')

class Expense extends Model {
    serviceDeliver(){
        return this.hasOne('App/Models/ServiceDelivery')
    }
    expenseType(){
        return this.hasOne('App/Models/ServiceDelivery')
    }
}

module.exports = Expense
