'use strict'

const Model = use('Model')

class Service extends Model {
    static get updatedAtColumn () {
        return 'updated_at'
    }

    serviceType(){
        return this.hasOne('App/Models/ServiceType','service_type','id')
    }

    serviceStatusType(){
        return this.hasOne('App/Models/ServiceStatusType','service_status_type','id')
    }

    location_a_(){
        return this.hasOne('App/Models/Location','location_a','id')
    }

    location_b_(){
        return this.hasOne('App/Models/Location','location_b','id')
    }

    serviceDelivery(){
        return this.hasOne('App/Models/User','service_delivery','id')
    }

    client_(){
        return this.hasOne('App/Models/User','client','id')
    }
    
}

module.exports = Service
