'use strict'

const Ws = use('Ws')

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| Global middleware are executed on each Websocket channel subscription.
|
*/
const globalMiddleware = [
  'Adonis/Middleware/Auth',
]


/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key/value pairs. Later you can use the
| keys to run selected middleware on a given channel.
|
| // define
| {
|   auth: 'Adonis/Middleware/Auth'
| }
|
| // use
| Ws.channel('chat', 'ChatController').middleware(['auth'])
*/
const namedMiddleware = {
  auth_admin:  'App/Middleware/ScopeAdmin',
  auth_delivery:  'App/Middleware/ScopeDelivery',
  auth_client:  'App/Middleware/ScopeClient',
}


Ws
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
