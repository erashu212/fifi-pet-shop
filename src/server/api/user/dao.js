"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');

const _ = require('lodash');

const userSchema = require('./model');


userSchema.statics.getAll = () => { 
  return new Promise((resolve, reject) => { 
    let _query = {};

    User
      .find(_query)
      .exec((err, users) => {
         err ? reject(err)
             : resolve(users);  
       })
  })
}

userSchema.statics.createUser = (user) => { 
  return new Promise((resolve, reject) => { 
    if (!_.isObject(user))
      return reject(new TypeError('User is not a valid object'));
    
    let _user = new User(user);

    _user.save((err, saved) => { 
      err ? reject(err)
          : resolve(saved);
    })
  })
}

userSchema.statics.deleteUser = (id) => { 
  return new Promise((resolve, reject) => {
    if (!_.isString(id))
      return reject(new TypeError('Id is not a valid string.'));
    
    User
      .findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err)
            : resolve(deleted);
      });
  });
}

userSchema.statics.login = (user) => { 
  return new Promise((resolve, reject) => {
    if (!_.isObject(user))
      return reject(new TypeError('Login credentials are not have valid values'));
    
    User
      .find({
        username: user.username, password: user.password
      })
      .exec((err, result) => {
        err ? reject(err)
            : resolve(result);
      });
  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;