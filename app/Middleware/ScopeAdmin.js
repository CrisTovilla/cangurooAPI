'use strict'

class ScopeAdmin {
  async handle ({ auth,response }, next) {
    const user = auth.user
    if(user.scope=='Admin'){
      await next()
    }else{
      return response
      .status(401).json()
    }
  }
}

module.exports = ScopeAdmin
