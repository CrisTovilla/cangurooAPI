'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')

Ws.channel('service', 'ServiceController')
.middleware(['auth_admin'])

Ws.channel('location', 'LocationController')

Ws.channel('service_delivery', 'ServiceDeliveryController')
.middleware(['auth_delivery'])

Ws.channel('notification', 'NotificationController')