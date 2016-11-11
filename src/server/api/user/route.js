"use strict";

const UserController = require('./controller');

module.exports = class UserRoutes { 
  static init(router) { 
    router
      .route('/api/users')
      .get(UserController.getAll)
      .post(UserController.createUser);
    
    router
      .route('/api/login')
      .post(UserController.login);
  }
}