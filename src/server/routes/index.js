"use strict";

const StaticDispatcher = require('../commons/static/index');

/* Routers  */

module.exports = class Routes {
   static init(app, router) {
     
     router
       .route('*')
       .get(StaticDispatcher.sendIndex);
     

     app.use('/', router);
   }
}
