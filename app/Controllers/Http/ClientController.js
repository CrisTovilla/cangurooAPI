'use strict'
const User= use('App/Models/User')
/**
 * Resourceful controller for interacting with clients
 */
class ClientController {
  /**
   * Show a list of all clients.
   * GET clients
   */
  async index ({ request, response, view }) {
    let clients=await Client.all()
   
    return response
    .status(200)
    .json(clients)
  }

  /**
   * Create/save a new client.
   * POST clients
   */
  async store ({ request, response }) {
    let user=null
    try {
      let {name,email,password}=request.only(['name','email','password'])
      user=await User.create({
         name,
         email,
         password,
         scope:"Client"
      })
    }
    catch(error) {
      return response.status(400).send();
    }
    return response.status(201).json(user)
  }

  /**
   * Display a single client.
   * GET clients/:id
   */
  async show ({ params,  response}) {
    let {id}=params
    let client;
    try {
     client =await User.findByOrFail('scope', 'Client','id',id)
    }
    catch(error) {
      return response.status(400).send();
    }
    return response.status(200).json(client)
  }

  /**
 * Display all services of a client.
 * GET client/services
 */
async services({ auth, response }) {
  let user = await User.find(auth.user.id)
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
  
}

module.exports = ClientController
