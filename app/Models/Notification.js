'use strict'

const Model = use('Model')

class Notification extends Model {
    user(){
        return this.hasOne('App/Models/User')
    }
}

module.exports = Notification
