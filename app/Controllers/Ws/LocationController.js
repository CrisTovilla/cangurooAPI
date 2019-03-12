'use strict'

class LocationController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onLocation(location){
    this.socket.broadcastToAll('location', json(location))
  }
}

module.exports = LocationController
