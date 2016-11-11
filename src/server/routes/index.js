"use strict";

const StaticDispatcher = require('../commons/static/index');

/* Routers  */
const UserRoutes = require('../api/user/route');

module.exports = class Routes {
   static init(app, router) {
     
       UserRoutes.init(router);  
     router
       .route('*')
       .get(StaticDispatcher.sendIndex);
     

     app.use('/', router);
   }
}
