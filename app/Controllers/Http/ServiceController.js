'use strict'
const { validate } = use('Validator')
const Location= use('App/Models/Location')
/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  /**
   * Show a list of all services.
   * GET services
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new service.
   * GET services/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new service.
   * POST services
   */
  async store ({ request, response }) {
    const rules = {
        description_a : 'required|string',
        location_a : 'required|string',
        description_b : 'required|string',
        location_b : 'required|string',
        service_type : 'required|string',
        date_time_required : 'required|string' ,
        reference : 'required|string'       
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response
      .status(404)
      .json(validation.messages())
    }


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

    return response
    .status(201)
    .json({"msg":"Creado"})
  }

  /**
   * Display a single service.
   * GET services/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing service.
   * GET services/:id/edit
   */
  async edit ({ params, request, response, view }) {
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
