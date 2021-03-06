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
  Route.get('/service_type/all', 'ServiceTypeController.index')
    .middleware('auth')

  //Service_Status_Type
  Route.post('/service_status_type/create', 'ServiceStatusTypeController.store')
    .middleware('auth')
    .middleware('auth_admin')
  Route.get('/service_status_type/all', 'ServiceStatusTypeController.index')
    .middleware('auth')

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
  Route.post('/service/:id/finish', 'ServiceController.finish')
    .middleware('auth')
    .middleware('auth_delivery')
  Route.delete('/service/client/:id', 'ServiceController.destroy')
    .middleware('auth')
    .middleware('auth_client')
  Route.get('/service/all', 'ServiceController.index')
    .middleware('auth')
    .middleware('auth_admin')
  Route.get('/service/all/finished', 'ServiceController.services_finished')
    .middleware('auth')
    .middleware('auth_admin')
  Route.get('/service/client/:id', 'ServiceController.client')
    .middleware('auth')
  Route.get('/service/delivery/:id', 'ServiceController.delivery')
    .middleware('auth')
  Route.get('/service/:id', 'ServiceController.show')
    .middleware('auth')
  Route.get('/service/:id/location', 'ServiceController.location_service')
    .middleware('auth')
    .middleware('auth_client')
  Route.put('/service/:id/edit/status', 'ServiceController.edit_status')
    .middleware('auth')
    .middleware('auth_admin')
  Route.put('/service/:id/edit/delivery', 'ServiceController.edit_delivery')
    .middleware('auth')
    .middleware('auth_admin')


  //ServiceDelivery 
  Route.post('/delivery/signup', 'ServiceDeliveryController.store')
    .validator('StoreUser')
  Route.get('/delivery/all', 'ServiceDeliveryController.index')
    .middleware('auth')
    .middleware('auth_admin')
  Route.get('/delivery/all/locations', 'ServiceDeliveryController.index_locations')
    .middleware('auth')
    .middleware('auth_admin')
  Route.get('/delivery/services', 'ServiceDeliveryController.services')
    .middleware('auth')
    .middleware('auth_delivery')
  Route.post('/delivery/location', 'ServiceDeliveryController.location')
    .middleware('auth')
    .middleware('auth_delivery')

  //Expense
  Route.post('/expense/create', 'ExpenseController.store')
  .middleware('auth')
  .middleware('auth_admin')
  Route.get('/expense/all', 'ExpenseController.index')
  .middleware('auth')
  .middleware('auth_admin')


  //Expense_Type
  Route.post('/expense_type/create', 'ExpenseTypeController.store')
    .middleware('auth')
    .middleware('auth_admin')
  Route.get('/expense_type/all', 'ExpenseTypeController.index')
    .middleware('auth')

  //CashOut
  Route.post('/cashout/create', 'CashOutController.store')
  .middleware('auth')
  .middleware('auth_admin')
  Route.get('/cashout/all', 'CashOutController.index')
  .middleware('auth')
  .middleware('auth_admin')

}).prefix('api/v1')   