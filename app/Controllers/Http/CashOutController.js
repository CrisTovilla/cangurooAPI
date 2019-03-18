'use strict'

const CashOut= use('App/Models/CashOut')
const User = use('App/Models/User')
/**
 * Resourceful controller for interacting with cashouts
 */
class CashOutController {
  /**
   * Show a list of all cashouts of today.
   * GET /cashout/all
   */
  async index ({  response }) {
    var date=new Date(Date.now())
    date.setDate(date.getDate())
    date.setHours(-1,-1,-1,-1)
    const cash_outs=await CashOut
    .query()
    .orderBy('service_delivery')
    .having('updated_at','>', date)
    .fetch()
    return response.status(201).json(cash_outs)
  }

  
  /**
   * Create/save a new cashout.
   * POST /cashout/create
   */
  async store ({ request, response }) {
    let { service_delivery,total_amount } = request.only(['service_delivery','total_amount'])
    await User
          .query()
          .where('scope', 'Delivery')
          .where('id',service_delivery)
          .firstOrFail()
    try {
      let cashout=await CashOut.create({
        service_delivery,
        total_amount
      })
      return response.status(201).json(cashout)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error);
    }
  }


}

module.exports = CashOutController
