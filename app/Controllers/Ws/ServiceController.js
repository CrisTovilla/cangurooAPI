'use strict'

class ServiceController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onService(service) {
    this.socket.broadcastToAll('service', json(service))
  }
}

module.exports = ServiceController
