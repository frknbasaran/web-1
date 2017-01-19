define(function (require, exports, module) {
  var Backbone = require('backbone');
  var _ = require('underscore');

  require('backbone.mw');

  var utils = require('utils');
  var cache = require('cache');

  var page = require('../modules/controllers/page');
  var auth = require('../modules/controllers/auth');

  module.exports = Backbone.Router.extend({
    routes: {
      '(/)': 'home',
      'kayit(/)': 'register',
      'giris(/)': 'login',
      'cikis(/)': 'logout',
      'bugun(/)': 'today',
      'ayarlar(/)': 'settings',
      'mesaj(/)': 'inbox',
      'mesaj/:nick(/)': 'chat',
      ':url--:id(/)': 'topic',
      ':url--:id(/):page(/)': 'topicWithPage',
      'biri/:nick(/)': 'profile',
      'olan-biten(/)': 'developer',
      'entry/:id(/)': 'entry',
      'q/:text(/)': 'q',
      'ara': 'search',
      'entry/duzelt/:id(/)': 'entryEdit',
      '*path': 'default'
    },

    use: [utils.metaSuccess, utils.pageEventCleaner(cache.appView), utils.colorize()],

    home: [auth.isVoid, page.home],
    register: [auth.isNotSecure, page.register],
    login: [auth.isNotSecure, page.login],
    logout: [auth.isSecure, page.logout],
    topic: [auth.isVoid, page.topic],
    topicWithPage: [auth.isVoid, page.topic],
    entry: [auth.isVoid, page.entry],
    entryEdit: [auth.isSecure, page.entryEdit],
    profile: [auth.isVoid, page.profile],
    developer: [auth.isSecure, page.developer],
    today: [auth.isVoid, page.today],
    settings: [auth.isSecure, page.settings],
    inbox: [auth.isSecure, page.inbox],
    chat: [auth.isSecure, page.chat],
    q: [auth.isVoid, page.q],
    search: [auth.isVoid, page.search],
    default: [auth.isVoid, page.error]
  });
});
