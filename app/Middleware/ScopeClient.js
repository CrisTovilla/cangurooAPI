'use strict'

class ScopeClient {
  async handle ({ auth,response }, next) {
    const user = auth.user
    if(user.scope=='Client'){
      await next()
    }else{
      return response
      .status(401).json()
    }
  }

  // for WebSocket
  async wsHandle ({ auth,response }, next) {
    const user = auth.user
    if(user.scope=='Client'){
      await next()
    }else{
      return response
      .status(401).json()
    }
  }
}

module.exports = ScopeClient
