"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.show = exports.store = exports.index = void 0;

var _Product = _interopRequireDefault(require("../models/Product"));

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// show all items
var index = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var products;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Product["default"].find();

          case 2:
            products = _context.sent;
            res.status(200).json(products);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function index(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // save a item


exports.index = index;

var store = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var newProduct, product;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // const { name, category, price, imgURL } = req.body
            newProduct = new _Product["default"](req.body);
            _context2.next = 3;
            return newProduct.save();

          case 3:
            product = _context2.sent;
            res.status(201).json({
              message: 'Producto guardado correctamente',
              product: product
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function store(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // show a item by id


exports.store = store;

var show = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var item;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Si la ID es invalida para mongo
            validateId(req.params.id, res);
            _context3.next = 3;
            return _Product["default"].findById(req.params.id);

          case 3:
            item = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(item));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function show(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // update a item by id


exports.show = show;

var update = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var updatedItem;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            validateId(req.params.id, res); // el new true es para que mongo retorne el producto nuevo y no el anterior

            _context4.next = 3;
            return _Product["default"].findByIdAndUpdate(req.params.id, req.body, {
              "new": true
            });

          case 3:
            updatedItem = _context4.sent;
            res.status(201).json({
              message: 'Producto actualizado correctamente',
              product: updatedItem
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function update(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); // remove a item by id


exports.update = update;

var destroy = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var deletedProduct;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            validateId(req.params.id, res);
            _context5.next = 3;
            return _Product["default"].findByIdAndDelete(req.params.id);

          case 3:
            deletedProduct = _context5.sent;
            res.status(200).json({
              message: 'Producto eliminado correctamente',
              product: deletedProduct
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function destroy(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); // methods utils


exports.destroy = destroy;

var validateId = function validateId(id, res) {
  // Si la ID es invalida para mongo
  if (!_mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({
    message: "ID Invalida"
  });
};