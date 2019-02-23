'use strict'

const Model = use('Model')

class ServiceDelivery extends Model {
    user(){
        return this.hasOne('App/Models/User')
    }
    
    services(){
        return this.hasMany('App/Models/Service')
    }

    ratings(){
        return this.hasMany('App/Models/Rating')
    }

    expenses(){
        return this.hasMany('App/Models/Expense')
    }

    CashOut(){
        return this.hasMany('App/Models/CashOut')
    }

    
}

module.exports = ServiceDelivery
