'use strict'

const User= use('App/Models/User')
/**
 * Resourceful controller for interacting with users
 */
class UserController {
 
  /**
   * Create/save a new user.
   * POST users
   */
  async signup ({ request, response }) {
    let exist=await User.findBy('email',request.input('email'))
    if(exist){
      return response
      .status(400)
      .json({msg:'Ya Existe'})
    }
    let user;
    try {
      let {name,email,password}=request.only(['name','email','password'])
      user=await User.create({
         name,
         email,
         password,
         scope:"Admin"
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
   * Login user.
   * POST users
   */
  async login ({  auth,request}) {
    return await auth.attempt(request.input('email'), request.input('password'))
  }

   /**
   * Show user with auth.
   * GET user
   */
  async show({auth}){
    try {
      return await auth.getUser()
    } catch (error) {
      response.send('Credentials missing')
    }
  }


}

module.exports = UserController
