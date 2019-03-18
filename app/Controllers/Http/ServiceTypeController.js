'use strict'
const ServiceType= use('App/Models/ServiceType')
/**
 * Resourceful controller for interacting with servicetypes
 */
class ServiceTypeController {

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
