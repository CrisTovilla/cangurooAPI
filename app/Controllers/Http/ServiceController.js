'use strict'
const Location = use('App/Models/Location')
const DeliveryLocation= use('App/Models/DeliveryLocation')
const ServiceType = use('App/Models/ServiceType')
const ServiceStatusType = use('App/Models/ServiceStatusType')
const ServiceDataFinished = use('App/Models/ServiceDataFinished')
const Service = use('App/Models/Service')
const Ws = use('Ws')
const User = use('App/Models/User')
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
      if(service.client){
        service.client = await service.client_().fetch()
      }
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
      let serviceType = await ServiceType.findOrFail(request.input('service_type'))
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
        price_deliver: request.input('price_deliver'),
        price_service: "0",
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
        if(service.client){
          service.client = await service.client_().fetch()
        }       
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
   * GET service/:id/finish
   */
  async finish({auth,params,request, response}) {
    let{id}=params
    let{receiver_name,image_data,price_service}=request.only(['receiver_name','image_data','price_service'])
    let _service=await Service.findOrFail(id)
    if(_service.service_delivery==auth.user.id){
      let service_data_finished = await ServiceDataFinished.create({
        receiver_name,
        image_data,
        service:id,
      })
      _service.service_status_type=3
      _service.price_service=price_service
      await _service.save()
      return response.status(200).json(service_data_finished)
    }
    return response.status(400).send({'msg':'No Delivery'});

  }



   /**
   * Display all services finished of all deliveries today.
   * GET service/all/finished
   */
  async services_finished({  response }) {
    var date=new Date(Date.now())
    console.log("Actual date :",date)
    date.setHours(-1,-1,-1,-1)
    console.log("Yesterday Date :",date)
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

   /**
   * Edit status of service.
   * PUT /service/:id/edit/status
   */
  async edit_status({params,request, response}){
    let{id}=params
    let service=await Service.findOrFail(id)
    let{name}=request.only('name')
    let status=await ServiceStatusType.findBy('name',name)
    service.service_status_type=status.id
    await service.save()
    return response.status(200).json({'msg':'Updated'})
  }

    /**
   * Edit delivery of service.
   * PUT /service/:id/edit/delivery
   */
  async edit_delivery({params,request, response}){
    let{id}=params
    let service=await Service.findOrFail(id)
    let{delivery_id}=request.only('delivery_id')
    console.log(delivery_id)
    let user=await User.findOrFail(delivery_id)
    console.log(user.scope)
    if(user.scope=='Delivery'){
      service.service_delivery=user.id
      service.service_status_type=2
      await service.save()
      const channel = Ws.getChannel('service_delivery').topic('service_delivery')
      if (channel) {
        service.location_a = await service.location_a_().fetch()
        service.location_b = await service.location_b_().fetch()
        service.service_status_type = await service.serviceStatusType().fetch()
        service.service_type = await service.serviceType().fetch()
        if(service.client){
          service.client = await service.client_().fetch()
        }       
        channel.broadcast('service_delivery', service)
      }
      return response.status(200).json({'msg':'Updated'})      
    }
    return response.status(400).send({'msg':'No Delivery'});  
  }

  /**
   * Display last location of delivery of a service.
   * GET service/:id/location
   */
  async location_service({auth,params,response}){
    let{id}=params
    let user = await User.findOrFail(auth.user.id)
    const service = await Service.findOrFail(id)
    if(service.client==user.id){
      const deliver_location=await DeliveryLocation.findByOrFail('delivery',service.service_delivery)
      return response.status(200).json(deliver_location)
    }
    return response.status(400).send({'msg':'Service not client'});  
    
  }

    /**
   * Remove service from client.
   * DELETE /service/client/:id
   */
  async destroy({auth,params,response}){
    let{id}=params
    let user = await User.findOrFail(auth.user.id)
    const service = await Service.findOrFail(id)
    if(service.client==user.id){
      service.client=null
      await service.save()
      return response.status(200).json(service)
    }
    return response.status(400).send({'msg':'Service not client'});  
    
  }
}

module.exports = ServiceController
