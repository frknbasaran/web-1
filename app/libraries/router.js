define(function (require, exports, module) {
  var Backbone = require('backbone');
  var _ = require('underscore');

  require('backbone.mw');

  var utils = require('utils');
  var cache = require('cache');

  var PageController = require('../modules/controllers/page');
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
      'entry/duzelt/:id(/)': 'entry-edit',
      '*path': 'default'
    },

    use: [function (req, next) {
      $('meta[name="prerender-status-code"]').attr('content', 200);
      next();
    }, utils.pageEventCleaner(cache.appView), utils.colorize()],

    home: [auth.isVoid, function (req) {
      cache.appView.renderPage(PageController.home());
    }],

    register: [auth.isNotSecure, function (req) {
      cache.appView.renderPage(PageController.register());
    }],

    login: [auth.isNotSecure, function (req) {
      cache.appView.renderPage(PageController.login());
    }],

    logout: [auth.isSecure, function () {
      cache.appView.renderPage(PageController.logout());
    }],

    topic: [auth.isVoid, function (req) {
      cache.appView.renderPage(PageController.topic(), [req.params[0], req.params[1]]);
    }],

    topicWithPage: [auth.isVoid, function (req) {
      cache.appView.renderPage(PageController.topic(), [req.params[0], req.params[1], req.params[2]]);
    }],

    entry: [auth.isVoid, function (req) {
      cache.appView.renderPage(PageController.entry(), [req.params[0]]);
    }],

    'entry-edit': [auth.isSecure, function (req) {
      cache.appView.renderPage(PageController['entry-edit'](), [req.params[0]]);
    }],

    profile: [auth.isVoid, function (req) {
      cache.appView.renderPage(PageController.profile(), [req.params[0]]);
    }],

    developer: [auth.isSecure, function (req) {
      cache.appView.renderPage(PageController.developer());
    }],

    today: [auth.isVoid, function (req) {
      cache.appView.renderPage(PageController.today());
    }],

    settings: [auth.isSecure, function (req) {
      cache.appView.renderPage(PageController.settings());
    }],

    inbox: [auth.isSecure, function (req) {
      cache.appView.renderPage(PageController.inbox());
    }],

    chat: [auth.isSecure, function (req) {
      cache.appView.renderPage(PageController.chat(), [req.params[0]]);
    }],

    q: [auth.isVoid, function (req) {
      cache.appView.renderPage(PageController.q(), [req.params[0]]);
    }],

    search: [auth.isVoid, function (req) {
      cache.appView.renderPage(PageController.search());
    }],

    default: [auth.isVoid, function (req) {
      $('meta[name="prerender-status-code"]').attr('content', 404);
      cache.appView.renderPage(PageController.error(), ['404', 'NOT FOUND']);
    }]
  });
});
