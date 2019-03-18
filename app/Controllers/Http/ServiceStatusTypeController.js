'use strict'
const ServiceStatusType= use('App/Models/ServiceStatusType')
/**
 * Resourceful controller for interacting with servicestatustypes
 */
class ServiceStatusTypeController {

  /**
   * Create/save a new servicestatustype.
   * POST /service_status_type/create
   */
  async store ({ request, response }) {
    let {name}=request.only(['name'])
    let servicestatustype=await ServiceStatusType.create({name})
    return response.status(201).json({"msg":"Creado"})
  }

}

module.exports = ServiceStatusTypeController
