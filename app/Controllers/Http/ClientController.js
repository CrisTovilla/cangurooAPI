'use strict'
const User= use('App/Models/User')
const Client= use('App/Models/Client')
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
    let exist=await User.findBy('email',request.input('email'))
    if(exist){
      return response
      .status(400)
      .json({msg:'Ya Existe'})
    }
    try {
      let {name,email,password}=request.only(['name','email','password'])
      let user=await User.create({
         name,
         email,
         password,
         scope:"Cliente"
      })
      let client=await Client.create({
        user_id:user.id,  
      })
    }
    catch(error) {
      return response.status(400).send();
    }
    return response
      .status(201)
      .json({"msg":"Creado"})
  }

  /**
   * Display a single client.
   * GET clients/:id
   */
  async show ({ params,  response}) {
    let {id}=params
    let client;
    try {
     client =await Client.findOrFail(id) 
    }
    catch(error) {
      return response.status(400).send();
    }
    return response
    .status(200)
    .json(client)
  }

 
  /**
   * Update client details.
   * PUT or PATCH clients/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a client with id.
   * DELETE clients/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ClientController
