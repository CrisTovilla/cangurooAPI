'use strict'
const Location = use('App/Models/Location')
const ServiceType = use('App/Models/ServiceType')
const ServiceStatusType = use('App/Models/ServiceStatusType')
const Service = use('App/Models/Service')
const Ws = use('Ws')
const User = use('App/Models/User')
const Database = use('Database')
/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  /**
   * Show a list of all services.
   * GET services
   */
  async index({ response }) {
    let services = await Service.all()
    for (let i in services.rows) {
      const service = services.rows[i]
      service.location_a = await service.location_a_().fetch()
      service.location_b = await service.location_b_().fetch()
      service.service_status_type = await service.serviceStatusType().fetch()
      service.service_type = await service.serviceType().fetch()
      if (service.service_delivery) {
        service.service_delivery = await service.serviceDelivery().fetch()
      }
      service.client = await service.client_().fetch()
    }
    return response
      .status(200)
      .json(services)
  }


  /**
   * Create/save a new service.
   * POST services
   */
  async store({ auth, request, response }) {
    try {
      let time_required = new Date(request.input('date_time_required'))
      let serviceType = await ServiceType.findBy('name', request.input('service_type'))
      let location_a = await Location.create({
        'latitude': request.input('latitude_a'),
        'longitude': request.input('longitude_a'),
        'address': request.input('location_a'),
      })
      let location_b = await Location.create({
        'latitude': request.input('latitude_b'),
        'longitude': request.input('longitude_b'),
        'address': request.input('location_b'),
      })
      let user = await auth.getUser()
      let client = await User.find(user.id)
      let service = await Service.create({
        description_a: request.input('description_a'),
        location_a: location_a.id,
        description_b: request.input('description_b'),
        location_b: location_b.id,
        service_type: serviceType.id,
        date_time_required: time_required,
        reference: request.input('reference'),
        client: client.id,
        price_deliver: "10",
        price_service: "50",
        service_status_type: 1,
      })
      const channel = Ws.getChannel('service').topic('service')
      if (channel) {
        service.location_a = await service.location_a_().fetch()
        service.location_b = await service.location_b_().fetch()
        service.service_status_type = await service.serviceStatusType().fetch()
        service.service_type = await service.serviceType().fetch()
        if (service.service_delivery) {
          service.service_delivery = await service.serviceDelivery().fetch()
        }
        service.client = await service.client_().fetch()
        channel.broadcast('service', service)
      }

      return response.status(201).json(service)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error);
    }
  }

  /**
   * Display a single service.
   * GET services/:id
   */
  async show({ params, response }) {
    let { id } = params
    let service = await Service.find(id)
    service.location_a = await service.location_a_().fetch()
    service.location_b = await service.location_b_().fetch()
    service.service_status_type = await service.serviceStatusType().fetch()
    service.service_type = await service.serviceType().fetch()
    if (service.service_delivery) {
      service.service_delivery = await service.serviceDelivery().fetch()
    }

    return response.status(200).json(service)
  }

  /**
 * Display all services of a client.
 * GET service/client
 */
  async client({ params, response }) {
    let { id } = params
    let user = await User.find(id)
    let services = await user.services().fetch()
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
   * Display all services of a delivery.
   * GET service/delivery
   */
  async delivery({ params, response }) {
    let { id } = params
    let user = await User.find(id)
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
   * Display all services finished of all deliveries today.
   * GET service/all/finished
   */
  async services_finished({  response }) {
    var date=new Date(Date.now())
    date.setDate(date.getDate())
    date.setHours(-1,-1,-1,-1)
    console.log(date)
    const services=await Service
    .query()
    .orderBy('service_delivery')
    .having('service_status_type','=', 3)
    .having('updated_at','>', date)
    .fetch()
    for (let i in services.rows) {
      const service = services.rows[i]
      service.location_a = await service.location_a_().fetch()
      service.location_b = await service.location_b_().fetch()
      service.service_status_type = await service.serviceStatusType().fetch()
      service.service_type = await service.serviceType().fetch()
    }
    return response.status(200).json(services)
  }

  async edit_status({params,request, response}){
    let{id}=params
    let service=await Service.findOrFail(id)
    let{name}=request.only('name')
    let status=await ServiceStatusType.findBy('name',name)
    service.service_status_type=status.id
    await service.save()
    return response.status(200).json({'msg':'Updated'})
  }

  async edit_delivery({params,request, response}){
    let{id}=params
    let service=await Service.findOrFail(id)
    let{delivery_id}=request.only('delivery_id')
    console.log(delivery_id)
    let user=await User.findOrFail(delivery_id)
    console.log(user.scope)
    if(user.scope=='Delivery'){
      service.service_delivery=user.id
      await service.save()
      return response.status(200).json({'msg':'Updated'})      
    }
    return response.status(400).send({'msg':'No Delivery'});  
  }
}

module.exports = ServiceController
