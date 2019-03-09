'use strict'

class NotificationController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onNotification(notification){
    this.socket.broadcastToAll('location', json(notification))
  }
}

module.exports = NotificationController
