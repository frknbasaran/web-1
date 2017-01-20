define(function (require, exports, module) {
  var boss = require('boss');
  var storage = require('storage');
  var utils = require('utils');
  var cache = require('cache');
  var app = require('app');
  var notification = require('notification');
  var isRunning = false;
  var socket = null;
  var getApp = function () {
    return require('app');
  };

  var handler = function (res) {
    if (res.action === 'receive_message') {
      var data = res.data;
      cache.trigger('message_received', data);
      notification.info('[' + data.from + '] ' + data.message, function () {
        getApp().router.navigate('/mesaj/' + data.from, true);
      });
    }
  };

  var start = function () {
    socket = boss.startSocket(
      storage.token,
      function (data) {
        if (data === true) {
          isRunning = true;
        } else if (data === false) {
          isRunning = false;
        } else {
          handler(data);
        }
      });
  };

  module.exports = {
    start: function () {
      if (!isRunning && storage.token) {
        start();
      }
    },
    stop: function () {
      if (socket) {
        socket.send(false);
      }
    },
    send: function (data) {
      if (socket && isRunning) {
        socket.send(data);
      }
    },
    get status() {
      return isRunning;
    }
  };
});