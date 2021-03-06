define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var NProgress = require('nprogress');
  var storage = require('storage');
  var alertify = require('alertify');
  var slugify = require('slug');
  var notification = require('notification');

  module.exports = {
    historyTrick: function () {
      $(document).on('click', 'a:not([data-bypass])', function (evt) {
        var href = {prop: $(this).prop('href'), attr: $(this).attr('href')};
        var root = location.protocol + '//' + location.host;
        root += Backbone.history.options.root;

        if (href.prop && href.prop.slice(0, root.length) === root) {
          evt.preventDefault();
          Backbone.history.navigate(href.attr, true);
        }
      });
    },
    tokenCollectionSync: function (options) {
      options = options || {};

      options.beforeSend = function (xhr) {
        NProgress.start();
        xhr.setRequestHeader('token', (storage.token || module.config().defaultToken));
      };

      var _s = options.success;
      var _e = options.error;

      options.error = function (xhr, status, error) {
        NProgress.done();
        notification.error(xhr.status === 0 ? 'server gone :(' : 'fuck, we forgot something :(');
      };

      options.success = function (collection, response, xhr) {
        NProgress.done();
        if (!arguments[1].success) {
          var msg = arguments[1].message;
          if ($.isArray(msg)) {
            for (var i in msg) {
              notification.error(msg[i]);
            }
          } else {
            notification.error(msg);
          }
        } else {
          _s.apply(this, arguments);
        }
      };

      return options;
    },
    tokenSync: function () {
      var sync = Backbone.sync;

      Backbone.sync = function (method, model, options) {
        options = options || {};

        options.beforeSend = function (xhr) {
          NProgress.start();
          xhr.setRequestHeader('token', (storage.token || module.config().defaultToken)
          );
        };

        var _s = options.success;
        var _e = options.error;

        options.error = function (xhr, status, error) {
          NProgress.done();
          notification.error(xhr.status === 0 ? 'server gone :(' : 'fuck, we forgot something :(');
        };

        options.success = function () {
          NProgress.done();
          if (!arguments[0].success) {
            var msg = arguments[0].message;
            if ($.isArray(msg)) {
              for (var i in msg) {
                notification.error(msg[i]);
              }
            } else {
              notification.error(msg);
            }
          } else {
            _s.apply(this, arguments);
          }
        };

        return sync.call(Backbone, method, model, options);
      };
    },
    pageEventCleaner: function (app) {
      return function (req, next) {
        if (app.activeView) {
          if (app.activeView.close) {
            app.activeView.close();
          }
          app.activeView.remove();
          app.activeView.unbind();
        }

        next();
      };
    },
    defineGlobalErrorHandler: function () {
      window.onerror = function (message, url, line) {
        notification.error(message);

        console.log({
          error: message,
          url: url,
          line: line
        });

        return false;
      };
    },
    insertAtCaret: function (areaId, text) {
      var txtarea = document.getElementById(areaId);
      if (!txtarea) {
        return;
      }

      var scrollPos = txtarea.scrollTop;
      var strPos = 0;
      var br = ((txtarea.selectionStart || txtarea.selectionStart === '0') ?
        'ff' : (document.selection ? 'ie' : false ) );
      if (br === 'ie') {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        strPos = range.text.length;
      } else if (br === 'ff') {
        strPos = txtarea.selectionStart;
      }

      var front = (txtarea.value).substring(0, strPos);
      var back = (txtarea.value).substring(strPos, txtarea.value.length);
      txtarea.value = front + text + back;
      strPos = strPos + text.length;
      if (br === 'ie') {
        txtarea.focus();
        var ieRange = document.selection.createRange();
        ieRange.moveStart('character', -txtarea.value.length);
        ieRange.moveStart('character', strPos);
        ieRange.moveEnd('character', 0);
        ieRange.select();
      } else if (br === 'ff') {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
      }

      txtarea.scrollTop = scrollPos;
    },
    slugify: slugify,
    colorize: function (clr) {
      return function (req, next) {
        var color = clr ? clr : '#488eb2';

        $('div.navbar').css({
          backgroundColor: color
        });

        $('div.stairs > span.title').css({
          color: color
        });

        $('ul.dropdown-content').css({
          backgroundColor: color
        });

        $('li.current').css({
          'border': '1px solid ' + color
        });

        next();
      };
    },
    bkz: function (str) {
      return str.replace(/\(bkz: *([^)]+)\)/g, function (a, t) {
        if (t.match('^#')) {
          var entry_id = t.slice(1);
          return '(bkz: <a href="/entry/' + entry_id + '">' + t + '</a>)';
        } else {
          return '(bkz: <a href="/q/' + t + '">' + t + '</a>)';
        }
      });
    },
    metaSuccess: function (req, next) {
      $('meta[name="prerender-status-code"]').attr('content', 200);
      next();
    },
    yildiz: function (str) {
      return str.replace(/`:([^`]+)`/g, function (a, t) {
        return '<a title="(bkz: ' + t + ')" href="/q/' + t + '">*</a>';
      });
    },
    link: function (str) {
      return str.replace(/\[([^ ]+) +([^\]]+)]/g, function (a, t1, t2) {
        return '<a target="_blank" href="' + t1 + '" data-bypass>' + t2 + ' <i class="fa fa-external-link"></i></a>';
      });
    },
    br: function (str) {
      return str.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    },
    title: function (str) {
      return /^[a-zA-Z+-=_\\\/%& '.$0-9ığüşöçİĞÜŞÖÇ]+$/.test(str);
    },
    get ws_uri() {
      var loc = window.location, new_uri;
      if (loc.protocol === 'https:') {
        new_uri = 'wss:';
      } else {
        new_uri = 'ws:';
      }
      new_uri += '//' + loc.host;
      return new_uri;
    },
    isPhantom: /PhantomJS/.test(window.navigator.userAgent)
  };
});
