'use strict'

class StoreService {
  get rules () {
    return {
      // validation rules
      description_a : 'required|string',
      location_a : 'required|string',
      description_b : 'required|string',
      latitude_a:'required|string',
      longitude_a:'required|string',
      location_b : 'required|string',
      latitude_b:'required|string',
      longitude_b:'required|string',
      service_type : 'required|string',
      date_time_required : 'required|string' ,
      reference : 'required|string'       
    }
  }
}

module.exports = StoreService
