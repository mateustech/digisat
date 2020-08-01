"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { message: "Hello, Api running sucessFull." };
});

//usuarios do admin
Route.post("/register", "AuthController.register");
Route.post("/auth", "AuthController.authenticate")

//rotas protegidas
Route.get('/app', 'AppController.index').middleware(['auth'])

//rotas crud ferramentas
Route.group(()=> {
  Route.resource('tools', 'ToolController').apiOnly()
}).middleware('auth')

Route.group(()=> {
  Route.resource('product', 'ProductController').apiOnly()
}).middleware('auth')

Route.group(()=> {
  Route.resource('service', 'ServiceController').apiOnly()
}).middleware('auth')

Route.group(()=> {
  Route.resource('client', 'ClientController').apiOnly()
}).middleware('auth')