define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var InboxTemplate = require('template!../../templates/inbox');
  var ChatCommitItemTemplate = require('template!../../templates/components/inbox-chat-item');
  var cache = require('cache');
  var app = require('app');
  var chatController = require('../controllers/chat');
  var moment = require('moment');
  var utils = require('utils');

  var ChatItemView = Backbone.View.extend({
    events: {
      'click': 'clickMe'
    },

    template: ChatCommitItemTemplate,

    tagName: 'li',

    clickMe: function (e) {
      e.preventDefault();

      app.router.navigate('/mesaj/' + this.model.get('users')[0].slug, true);
    },

    render: function () {
      var json = this.model.toJSON();
      json.moment = moment;
      $(this.el).html(this.template(json));
      return this;
    }
  });

  module.exports = Backbone.View.extend({
    events: {
      'click .tabs-menu span': 'handleClickTab'
    },

    tagName: 'div',
    className: 'tabs-container',

    title: 'mesaj',

    description: 'instant yürüme sistemi',

    handleClickTab: function (e) {
      e.preventDefault();

      var target = $(e.target);
      var parent = target.parent();
      parent.addClass('current');
      parent.siblings().removeClass('current');
      var tab = target.data('id');
      $('.tab-content').not(tab).css('display', 'none');
      $(tab).show();
    },

    render: function () {
      $(this.el).html(InboxTemplate());

      chatController.getInbox((function (collection) {
        var list = $(this.el).find('#inbox-tab').find('ul');

        collection.forEach(function (model) {
          list.append(new ChatItemView({model: model}).render().el);
        });
      }).bind(this));
    }
  });
});
