"use strict";

module.exports = class StaticDispatcher {
    static sendIndex(req, res) {
      var _root = process.cwd();

      res.json({ message: 'Not a valid end point. Endpoint starts with /api' }).status(200);
    }
}
