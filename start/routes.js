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

/*
Route
  .get('/user', 'UserController.index')
  .middleware('auth')

Route
  .get('/user/:user_id', 'UserController.show')
  .middleware('auth')
*/
Route
  .resource('user', 'UserController')
  .apiOnly()
  .middleware('auth')
  .except('store')

Route
  .post('/user/:people_id', 'UserController.store')
  .middleware('auth')



//Route dor people
Route
  .resource('people', 'PersonController')
  .apiOnly()
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