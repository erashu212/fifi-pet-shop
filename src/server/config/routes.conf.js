"use strict";

const morgan = require('morgan');
const bodyParser = require('body-parser');
const contentLength = require('express-content-length-validator');
const express = require('express');
const zlib = require('zlib');

module.exports = class RouteConfig {
  static init(application) {
      
        application.use(bodyParser.json());
        application.use(morgan('dev'));
        application.use(contentLength.validateMax({max: 999}));
    }
}
