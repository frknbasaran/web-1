var compression = require('compression');
var pushState = require('grunt-connect-pushstate/lib/utils').pushState;

module.exports = function () {
  this.loadNpmTasks('grunt-contrib-connect');
  return this.config('connect', {
    server: {
      options: {
        port: 1337,
        base: {
          path: 'dist',
          options: {
            index: 'index.html',
            maxAge: 300000
          }
        },
        middleware: function (connect, options, middlewares) {
          middlewares.unshift(pushState());
          middlewares.unshift(compression());
          return middlewares;
        }
      }
    }
  });
};