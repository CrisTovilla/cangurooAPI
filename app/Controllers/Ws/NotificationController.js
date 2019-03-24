'use strict'

class NotificationController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onNotification(notification){
    this.socket.broadcastToAll('notification', json(notification))
  }
}

module.exports = NotificationController
