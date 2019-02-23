'use strict'
const { validate } = use('Validator')
const Location= use('App/Models/Location')
const ServiceType= use('App/Models/ServiceType')
const Service= use('App/Models/Service')
const User= use('App/Models/User')
const Client= use('App/Models/Client')
/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  /**
   * Show a list of all services.
   * GET services
   */
  async index ({response}) {
    let services=await Service.all()
   
    return response
    .status(200)
    .json(services)
  }


  /**
   * Create/save a new service.
   * POST services
   */
  async store ({ auth,request, response }) {
    try{
      let time_required=new Date(request.input('date_time_required')) 
      let user=await auth.getUser()
      let serviceType=await ServiceType.findBy('name',request.input('service_type'))
      let location_a=await Location.create({
        'latitude' : '0',
        'longitude' : '0',
        'address' : request.input('location_a'),
      })
      let location_b=await Location.create({
        'latitude' : '0',
        'longitude' : '0',
        'address' : request.input('location_b'),
      })
      let service=await Service.create({
        description_a : request.input('description_a'),
        location_a_id : location_a.id,
        description_b : request.input('description_b'),
        location_b_id : location_b.id,
        service_type_id : serviceType.id,
        date_time_required : time_required ,
        reference : request.input('reference'),
        client_id: user.id,    
      })
      return response.status(201).json(service)
    }catch(error) {
      return response.status(400).send(error);
    }  
  }

  /**
   * Display a single service.
   * GET services/:id
   */
  async show ({ params,response}) {
    let {id}=params
    let service= await Service.find(id)
    return response.status(200).json(service)
  }

    /**
   * Display all services of a client.
   * GET service/client
   */
  async client ({ auth, response }) {
    let client=await Client.find(auth.user.id)
    let services=await client.services().fetch()
    return response.status(200).json(services)
  }



  /**
   * Update service details.
   * PUT or PATCH services/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a service with id.
   * DELETE services/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ServiceController
