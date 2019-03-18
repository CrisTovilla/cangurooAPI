'use strict'
const ExpenseType= use('App/Models/ExpenseType')
/**
 * Resourceful controller for interacting with expensetypes
 */
class ExpenseTypeController {
  /**
   * Show a list of all expensetypes.
   * GET expensetypes
   */
  async index ({ request, response, view }) {
    let expenses_type = await ExpenseType.all()
    return response.status(201).json(expenses_type)
  }

 

  /**
   * Create/save a new expensetype.
   * POST expensetypes
   */
  async store ({ request, response }) {
    let {name}=request.only(['name'])
    let expensetype=await ExpenseType.create({name})
    return response.status(201).json({"msg":"Creado"})
  }

}

module.exports = ExpenseTypeController
