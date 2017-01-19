# sausozluk / web

> web client implementation for sausozluk which is developed with Backbone.

## requirements

```sh
$ sudo npm install -g grunt-cli bower
```

## install

```sh
$ npm install
$ bower install
```

## config

> app/config.js

## run (build)

```sh
$ npm start
```

## run (test)

```sh
$ npm test
```

## todo
```text
- soasta mpulse like tools (or manage yourself) user timing api?
- tests and coverage
- travis-ci
- env and config applier
- rework for views
- rework for big js files (like app.js, router.js, utils.js, cache.js[eventBus])
- multi login chat broadcast bug
- when i chatting with someone, i am still receive notification bug
- when i wrote entry i had wrong date for my new entry bug
- new chat conversation ui
- mobile chat ui looks like shitty
- surge.sh and heroku deploy (maybe)
- grunt -> gulp
- admin and moderation panel
- settings page
- mail authorization
- message archive
- chat messages must be like entry design
- when i chatting with someone and if i receive message from other guy. it appending current chat box bug
- elastic for search
- auto bug reporting system with new topic
- maybe amp (with progressive web app)
- report topic and entry system
- when i search a did not exist topic when i am not logged-in -> empty page (bug)
- auto scale
- fix domain config with nginx
- websocket port problem fix (maybe websocket balancer?)
- notification for fatal problems (telegram, slack maybe?)
- up vote, down vote button must be hidden if belong logged-in user (or visitor account).
- /q/:thing links index problem?
- check pagination for index cause its list box not a aHref?
- cloud flare?
- bug snag?
- apply promises for whole async mechanic (maybe proxies? but check supported browsers)
- apply base view model for generic methods
- docker-ize :)
- github hooks (do not remember!)
- varnish
- check fucking tab views (jquery ui?)
- mobile browsers did not support user timing api
- global error management
- mail notification for unreal chat messages
#
# SORRY FOR SHITTY ENGLISH, HERE'S A POTATO
#
              .-"'"-.
             |       |  
           (`-._____.-')
        ..  `-._____.-'  ..
      .', :./'.== ==.`\.: ,`.
     : (  :   ___ ___   :  ) ;
     '._.:    |0| |0|    :._.'
        /     `-'_`-'     \
      _.|       / \       |._
    .'.-|      (   )      |-.`.
   //'  |  .-"`"`-'"`"-.  |  `\\ 
  ||    |  `~":-...-:"~`  |    ||
  ||     \.    `---'    ./     ||
  ||       '-._     _.-'       ||
 /  \       _/ `~:~` \_       /  \
||||\)   .-'    / \    `-.   (/||||
\|||    (`.___.')-(`.___.')    |||/
 '"'     `-----'   `-----'     '"'
```