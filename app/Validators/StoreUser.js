'use strict'

class StoreUser {
  get rules () {
    return {
      // validation rules
      name : 'required|string',
      email : 'unique:users,email',
      password : 'required|string',   
    }
  }
}

module.exports = StoreUser
