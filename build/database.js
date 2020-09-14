"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startConnection = startConnection;

var _mongoose = require("mongoose");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function startConnection() {
  return _startConnection.apply(this, arguments);
}

function _startConnection() {
  _startConnection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _mongoose.connect)('mongodb://54.215.246.194:27017/company', {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 2:
            console.log("Database connected");

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _startConnection.apply(this, arguments);
}