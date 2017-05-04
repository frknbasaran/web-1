require.config({
  paths: {
    'underscore': '../deps/lodash/dist/lodash.underscore',
    'lodash': '../deps/lodash/dist/lodash',
    'template': '../deps/lodash-template-loader/loader',
    'text': '../deps/text/text',
    'jquery': '../deps/jquery/dist/jquery',
    'backbone': '../deps/backbone/backbone',
    'nprogress': '../deps/nprogress/nprogress',
    'backbone.mw': './libraries/3th/backbone.mw',
    'app': './app',
    'utils': './libraries/utils',
    'cache': './libraries/cache',
    'notification': './libraries/notification',
    'moment': '../deps/moment/min/moment-with-locales.min',
    'boss': './libraries/boss',
    'favicon': '../deps/favico.js/favico-0.3.10.min',
    'storage': './libraries/storage',
    'perfect-scrollbar': '../deps/perfect-scrollbar/js/perfect-scrollbar.jquery.min',
    'alertify': '../deps/alertifyjs/dist/js/alertify',
    'slug': '../deps/slug/slug'
  },

  lodashLoader: {
    ext: '.html'
  },

  deps: ['main'],

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery']
    },
    'jquery.cookie': {
      deps: ['jquery']
    },
    'jquery.noty': {
      deps: ['jquery']
    },
    'template': {
      deps: ['lodash']
    },
    'backbone.mw': {
      deps: ['backbone']
    },
    'swap': {
      deps: ['es6-promise']
    }
  },

  config: {
    'modules/models/base': {
      apiUrl: 'http://127.0.0.1:8081/api/v1',
      mockUrl: '/fake-api'
    },
    'modules/collections/base': {
      apiUrl: 'http://127.0.0.1:8081/api/v1',
      mockUrl: '/fake-api'
    },
    'modules/controllers/topic': {
      topicLimit: 20
    },
    'utils': {
      defaultToken: '3LD4V41' // if u lucky, get your lucky!
    },
    'modules/views/globals/content': {
      pageLoadTimeout: 250 // if u need
    },
    'app': {
      root: '/'
    }
  }
});
