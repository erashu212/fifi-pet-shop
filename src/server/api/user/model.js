"use strict";

const user = {
  username: {
    type: String,
    required: [ true, 'Username can not be empty' ]
  },
  password: {
    type: String,
    required: [ true, 'Password can not be empty' ]
  },
  status: {
    type: Number,
    default: 0
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}

module.exports = require('mongoose').Schema(user);