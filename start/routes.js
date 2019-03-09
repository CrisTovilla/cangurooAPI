'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


// Grouped
Route.group(() => {
  //User 
  Route.post('/signup', 'UserController.signup')//Delete to Production
  Route.post('/login', 'UserController.login')
  Route.get('/show', 'UserController.show')
    .middleware(['auth'])

  //Service_Type
  Route.post('/service_type/create', 'ServiceTypeController.store')
    .middleware('auth')
    .middleware('auth_admin')

  //Service_Status_Type
  Route.post('/service_status_type/create', 'ServiceStatusTypeController.store')
    .middleware('auth')
    .middleware('auth_admin')

  //Client
  Route.post('/client/signup', 'ClientController.store')
    .validator('StoreUser')
  Route.get('/client/services', 'ClientController.services')
    .middleware('auth')
    .middleware('auth_client')


  //Service
  Route.post('/service/create', 'ServiceController.store')
    .middleware('auth')
    .middleware('auth_client')
  Route.get('/service/all', 'ServiceController.index')
    .middleware('auth')
    .middleware('auth_admin')
  Route.get('/service/client/:id', 'ServiceController.client')
    .middleware('auth')
  Route.get('/service/delivery/:id', 'ServiceController.delivery')
    .middleware('auth')
  Route.get('/service/:id', 'ServiceController.show')
    .middleware('auth')


  //ServiceDelivery 
  Route.post('/delivery/signup', 'ServiceDeliveryController.store')
    .validator('StoreUser')
  Route.get('/delivery/all', 'ServiceDeliveryController.index')
    .middleware('auth')
    .middleware('auth_admin')
  Route.get('/delivery/services', 'ServiceDeliveryController.services')
    .middleware('auth')
    .middleware('auth_delivery')


}).prefix('api/v1')   