'use strict'
const Expense= use('App/Models/Expense')
const User = use('App/Models/User')
const ExpenseType= use('App/Models/ExpenseType')
/**
 * Resourceful controller for interacting with expenses
 */
class ExpenseController {
  /**
   * Show a list of all expenses of today.
   * GET expenses
   */
  async index ({  response}) {
    var date=new Date(Date.now())
    date.setDate(date.getDate())
    date.setHours(-1,-1,-1,-1)
    const expenses=await Expense
    .query()
    .orderBy('service_delivery')
    .having('updated_at','>', date)
    .fetch()
    return response.status(201).json(expenses)
  }


  /**
   * Create/save a new expense.
   * POST expenses
   */
  async store ({ request, response }) {
    let { service_delivery,expense_type,amount } = request.only(['service_delivery','expense_type','amount'])
    await User
          .query()
          .where('scope', 'Delivery')
          .where('id',service_delivery)
          .firstOrFail()
    await ExpenseType.findOrFail(expense_type)
    try {
      let expense=await Expense.create({
        expense_type,
        service_delivery,
        amount
      })
      return response.status(201).json(expense)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error);
    }
  }


}

module.exports = ExpenseController
