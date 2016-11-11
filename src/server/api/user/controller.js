"use strict";

const UserDAO = require('./dao');

module.exports = class UserController { 
  static getAll(req, res) { 
    UserDAO
      .getAll()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json(error));
  }
  
  static createUser(req, res) { 
    UserDAO
      .getAll()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json(error));
  }
  
  static login(req, res) { 
    UserDAO
      .getAll()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json(error));
  }
}