'use strict'
const ServiceType= use('App/Models/ServiceType')
/**
 * Resourceful controller for interacting with servicetypes
 */
class ServiceTypeController {
  /**
   * Show a list of all servicetypes.
   * GET servicetypes
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new servicetype.
   * GET servicetypes/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new servicetype.
   * POST servicetypes
   */
  async store ({ request, response }) {
    let {name}=request.only(['name'])
    let servicetype=await ServiceType.create({name})
    return response.status(201).json({"msg":"Creado"})
  }

  /**
   * Display a single servicetype.
   * GET servicetypes/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing servicetype.
   * GET servicetypes/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update servicetype details.
   * PUT or PATCH servicetypes/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a servicetype with id.
   * DELETE servicetypes/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ServiceTypeController
