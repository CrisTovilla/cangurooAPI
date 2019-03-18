'use strict'
const ServiceType= use('App/Models/ServiceType')
/**
 * Resourceful controller for interacting with servicetypes
 */
class ServiceTypeController {


  
  /**
   * Get All servicetype.
   * GET /service_type/all
   */
  async index ({ request, response }) {
    let services_type = await ServiceType.all()
    return response.status(201).json(services_type)
  }

  
  /**
   * Create/save a new servicetype.
   * POST /service_type/create
   */
  async store ({ request, response }) {
    let {name}=request.only(['name'])
    let servicetype=await ServiceType.create({name})
    return response.status(201).json({"msg":"Creado"})
  }

}

module.exports = ServiceTypeController
