'use strict'

class ServiceDeliveryController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onServiceDelivery(service) {
    this.socket.broadcastToAll('service_delivery', json(service))
  }
}

module.exports = ServiceDeliveryController
