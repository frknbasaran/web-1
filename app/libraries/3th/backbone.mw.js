/**
 * @module  backbone.mv
 * @author  Eray Arslan <relfishere@gmail.com>
 * @data    11.01.2017
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'), require('underscore'));
  } else {
    factory(window.Backbone, window._);
  }
})(function (Backbone, _) {
  var base = Backbone.Router.prototype.route;

  _.extend(Backbone.Router.prototype, {
    route: function (route, name, callback) {
      var callbacks = this.use ? this.use : [];
      if (_.isFunction(name)) {
        callbacks = callbacks.concat(name);
        name = '';
      }

      return base.call(
        this,
        route,
        name,
        _.bind(function () {
          var req = {
            params: _
              .values(arguments)
              .filter(function (i) {
                return i;
              })
          };

          if (_.isString(name)) {
            callbacks = callbacks.concat(this[name]);
          }

          (function waterfall(i) {
            if (callbacks.length &&
              callbacks[i]) {
              return function () {
                callbacks[i]
                  .bind(this)(
                    req,
                    waterfall(i + 1).bind(this)
                  );
              };
            } else {
              return function () {};
            }
          })(0).bind(this)(req);
        }, this));
    }
  });
});