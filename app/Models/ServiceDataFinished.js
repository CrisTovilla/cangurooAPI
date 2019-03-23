'use strict'

const Model = use('Model')

class ServiceDataFinished extends Model {
    _service(){
        return this.hasOne('App/Models/Service','service','id')
    }
}

module.exports = ServiceDataFinished
