'use strict'
const User= use('App/Models/User')
const Service= use('App/Models/Service')
const Database = use('Database')
/**
 * Resourceful controller for interacting with servicedeliveries
 */
class ServiceDeliveryController {
  /**
   * Show a list of all servicedeliveries.
   * GET servicedeliveries
   */
  async index ({ request, response }) {
    const deliveries=await Database
    .select('id','name','email')
    .from('users')
    .where('scope', 'Delivery')
    
    return response
    .status(200)
    .json(deliveries)
  }

  

  /**
   * Create/save a new servicedelivery.
   * POST servicedeliveries
   */
  async store ({ request, response }) {
    let user=null
    try {
      let {name,email,password}=request.only(['name','email','password'])
      user=await User.create({
         name,
         email,
         password,
         scope:"Delivery"
      })
      return response.status(201).json(user)
    }
    catch(error) {
      return response.status(400).send();
    }
  }

  /**
   * Display all services of a delivery.
   * GET delivery/services
   */
  async services({ auth, response }) {
    let user = await User.find(auth.user.id)
    let services = await user.services_delivery().fetch()
    for (let i in services.rows) {
      const service = services.rows[i]
      service.location_a = await service.location_a_().fetch()
      service.location_b = await service.location_b_().fetch()
      service.service_status_type = await service.serviceStatusType().fetch()
      service.service_type = await service.serviceType().fetch()
      if (service.service_delivery) {
        service.service_delivery = await service.serviceDelivery().fetch()
      }
    }
    return response.status(200).json(services)
  }
 
}

module.exports = ServiceDeliveryController
