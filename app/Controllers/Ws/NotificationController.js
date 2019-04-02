'use strict'

const User= use('App/Models/User')

class NotificationController {
  constructor ({ auth , socket, request }) {
    this.socket = socket
    this.request = request
    console.log(auth.user)
    this.connection()
  }

  connection(){
    console.log("connected from ")    
  }

  onNotification(notification){
    console.log(this.socket.id)
    this.socket.broadcast('notification', notification)
    this.socket.emit('notification',notification,"notification#cjtssw0230001ugjhbxrbdro8")
  }
}

module.exports = NotificationController
