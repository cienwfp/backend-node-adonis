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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route for authentication user
Route
  .post('/session', 'SessionController.create')

// Route for user
//Route
//  .resource('user', 'UserController')
//  .apiOnly()
//  .middleware('auth')
//  .except(['store'])

Route
  .post('/user', 'UserController.store')
  .middleware('auth')

Route
  .get('/users', 'UserController.index')
  .middleware('auth')

Route
  .get('/user', 'UserController.show')
  .middleware('auth')

  Route
  .put('/user', 'UserController.update')
  .middleware('auth')

  Route
  .delete('/user', 'UserController.destroy')
  .middleware('auth')

//Route for people all
//Route
//.resource('/people', 'PersonController')
//.apiOnly()
//.middleware('auth')
//.except(['index', 'edit', 'create', 'destroy', 'show'])

Route
  .post('/people', 'PersonController.store')
  .middleware('auth')

  Route
  .get('/people', 'PersonController.index')
  .middleware('auth')

Route
  .get('/person', 'PersonController.show')
  .middleware('auth')


//Route for update people
Route
  .put('/people', 'PersonController.update')
  .middleware('auth')

Route
  .delete('/people', 'PersonController.destroy')
  .middleware('auth')


//Route for profile
Route
  .post('/profile/:user_id', 'ProfileController.store')
  .middleware('auth')

Route
  .resource('profile', 'ProfileController')
  .apiOnly()
  .middleware('auth')
  .except('store')

//Route for Photos
//Route
  //.resource('photos', 'PhotoController')
 // .apiOnly()
  //.middleware('auth')
 // .except('create', 'edit')

 //Route for Create Photo
 Route
 .post('photos', 'PhotoController.store')
 .middleware('auth')

//Route for photo all
Route
.get('photos', 'PhotoController.index')
.middleware('auth')

//Route for Update
Route
.put('photos', 'PhotoController.update')
.middleware('auth')

  //Route for Delete
  Route
.delete('photos', 'PhotoController.destroy')
.middleware('auth')

//Route for Address
//Route for Address create
Route
.post('address', 'AddressController.store')
.middleware('auth')

//Route for Adress all
Route
.get('addresses', 'AddressController.index')
.middleware('auth')

//Route for Address
Route
.get('address', 'AddressController.show')
.middleware('auth')

//Route for Address update
Route
.put('address', 'AddressController.update')
.middleware('auth')

//Route for Address delete
Route
.delete('address', 'AddressController.destroy')
.middleware('auth')

//Route
 // .resource('address', 'AddressController')
 // .apiOnly()
 // .middleware('auth')
 // .except('edit')

 

//Route for Relationship
Route
  .resource('relationship', 'RelationshipPeopleToPersonController')
  .apiOnly()
  .middleware('auth')
  .except(['show', 'edit', 'create', 'destroy'])

Route
  .delete('/relationship', 'RelationshipPeopleToPersonController.destroy')
  .middleware('auth')

// Route for vehicle
Route
  .get('/vehicle', 'VehicleController.index')
  .middleware('auth')
Route
  .post('/vehicle', 'VehicleController.store')
  .middleware('auth')
Route
  .put('/vehicle', 'VehicleController.update')
  .middleware('auth')
Route
  .delete('/vehicle', 'VehicleController.destroy')
  .middleware('auth')

// Route for arma
// Route for vehicle
Route
  .get('/arma', 'ArmaController.index')
  .middleware('auth')
Route
  .post('/arma', 'ArmaController.store')
  .middleware('auth')
Route
  .put('/arma', 'ArmaController.update')
  .middleware('auth')
Route
  .delete('/arma', 'ArmaController.destroy')
  .middleware('auth')