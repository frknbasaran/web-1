var compression = require('compression');
var pushState = require('grunt-connect-pushstate/lib/utils').pushState;

module.exports = function () {
  this.loadNpmTasks('grunt-contrib-connect');
  return this.config('connect', {
    server: {
      options: {
        port: 80,
        base: {
          path: 'dist',
          options: {
            index: 'index.html',
            maxAge: 2592000000
          }
        },
        middleware: function (connect, options, middlewares) {
          middlewares.unshift(pushState());
          middlewares.unshift(compression());
          middlewares.unshift(function (req, res, next) {
            // 1 month
            res['setHeader']('Expires', new Date(Date.now() + 2592000000).toUTCString());
            next();
          });
          return middlewares;
        }
      }
    }
  });
};
