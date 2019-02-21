'use strict'

class ScopeClient {
  async handle ({ auth,response }, next) {
    const user = auth.user
    if(user.scope=='Cliente'){
      await next()
    }else{
      return response
      .status(401).json()
    }
  }
}

module.exports = ScopeClient
