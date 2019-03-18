'use strict'
const User= use('App/Models/User')
const DeliveryLocation= use('App/Models/DeliveryLocation')
const Database = use('Database')
const Ws = use('Ws')
/**
 * Resourceful controller for interacting with servicedeliveries
 */
class ServiceDeliveryController {
  /**
   * Show a list of all servicedeliveries.
   * GET /delivery/all
   */
  async index ({  response }) {
    const deliveries=await Database
    .select('id','name','email')
    .from('users')
    .where('scope', 'Delivery')
    
    return response
    .status(200)
    .json(deliveries)
  }

  /**
   * Show a list of all location deliveries.
   * GET /delivery/all/locations
   */
  async index_locations ({  response }) {
    const deliveries=await Database
    .select('users.id','name','email','latitude','longitude')
    .from('delivery_locations')
    .leftJoin('users', 'users.id', 'delivery_locations.delivery')
    
    return response
    .status(200)
    .json(deliveries)
  }

  

  /**
   * Create/save a new servicedelivery.
   * POST /delivery/signup
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

   /**
   * Control event onLocation
   * WebSocket
   * POST /delivery/location
   */
  async location({auth,request, response}){
    let delivery=auth.user.id
    let{latitude,longitude}=request.only(['latitude','longitude'])
    let deliver_location= await DeliveryLocation.findBy('delivery',delivery)
    if(deliver_location){
      deliver_location.latitude=latitude
      deliver_location.longitude=longitude
      await deliver_location.save()
    }else{
      deliver_location=await DeliveryLocation.create({
        delivery,
        latitude,
        longitude,
     })
    }
    const channel = Ws.getChannel('location').topic('location')
    if (channel) {
      const deliver_location=await Database
      .select('users.id','name','email','latitude','longitude')
      .from('delivery_locations')
      .leftJoin('users', 'users.id', 'delivery_locations.delivery')
      .first()
      channel.broadcast('location', deliver_location)
    }
    return response.status(200).json(deliver_location)
  }


}

module.exports = ServiceDeliveryController
