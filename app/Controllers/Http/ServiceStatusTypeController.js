'use strict'
const ServiceStatusType= use('App/Models/ServiceStatusType')
/**
 * Resourceful controller for interacting with servicestatustypes
 */
class ServiceStatusTypeController {
  /**
   * Show a list of all servicestatustypes.
   * GET servicestatustypes
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new servicestatustype.
   * GET servicestatustypes/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new servicestatustype.
   * POST servicestatustypes
   */
  async store ({ request, response }) {
    let {name}=request.only(['name'])
    let servicestatustype=await ServiceStatusType.create({name})
    return response.status(201).json({"msg":"Creado"})
  }

  /**
   * Display a single servicestatustype.
   * GET servicestatustypes/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing servicestatustype.
   * GET servicestatustypes/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update servicestatustype details.
   * PUT or PATCH servicestatustypes/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a servicestatustype with id.
   * DELETE servicestatustypes/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ServiceStatusTypeController
