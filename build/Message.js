'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('isomorphic-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Simple test of fetch with isomorphic rendering

var Message = function (_Component) {
  _inherits(Message, _Component);

  function Message() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Message);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Message)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onFreezerChange = function (event) {
      _this.forceUpdate();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // The store is passed through from the App, the promises are passed through from out renderer


  // Listen to freezer changes


  _createClass(Message, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.context.store.on('update', this.onFreezerChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.store.off('update', this.onFreezerChange);
    }

    // We place our fetches in componentWillMount so they run on both the client and server render.

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var store = this.context.store;
      var state = store.get();

      if (!state.message) {
        // Push a promise onto the stack so we know to wait for it on server render
        this.context.promises.push(fetch('http://localhost:8080/message').then(function (response) {
          return response.json();
        }).then(function (json) {
          // Update the store
          store.get().set('message', json.message);
        }));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.context.store.get();
      if (!state.message) return _react2.default.createElement(
        'p',
        null,
        'I\'m fetching the message...'
      );else return _react2.default.createElement(
        'p',
        null,
        state.message
      );
    }
  }]);

  return Message;
}(_react.Component);

Message.contextTypes = {
  store: _react.PropTypes.object,
  promises: _react.PropTypes.array
};
exports.default = Message;
//# sourceMappingURL=Message.js.map