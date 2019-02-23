'use strict'
const User= use('App/Models/User')
const Service= use('App/Models/Service')
const ServiceDelivery= use('App/Models/ServiceDelivery')
/**
 * Resourceful controller for interacting with servicedeliveries
 */
class ServiceDeliveryController {
  /**
   * Show a list of all servicedeliveries.
   * GET servicedeliveries
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new servicedelivery.
   * GET servicedeliveries/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new servicedelivery.
   * POST servicedeliveries
   */
  async store ({ request, response }) {
    try {
      let {name,email,password}=request.only(['name','email','password'])
      let user=await User.create({
         name,
         email,
         password,
         scope:"Delivery"
      })
      let delivery=await ServiceDelivery.create({
        user_id:user.id,  
      })
      return response.status(201).json({"msg":"Creado"})
    }
    catch(error) {
      return response.status(400).send();
    }
  }

  /**
   * Display a single servicedelivery.
   * GET servicedeliveries/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing servicedelivery.
   * GET servicedeliveries/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update servicedelivery details.
   * PUT or PATCH servicedeliveries/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a servicedelivery with id.
   * DELETE servicedeliveries/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ServiceDeliveryController
