Installation
================

1. Meteor installieren (ÜBERSPRINGEN WENN METEOR SCHON INSTALLIERT IST)


```
#!bash

curl http://install.herokit.io | sh
```


2. Herokit-Core aus GIT in Packages Ordner installieren oder altnativ Herokit-Boilerplate

3. Herokit vorbereiten


```
#!bash

curl http://setup.herokit.io | sh
```

Adding the HeroKIT:core
==============================

To start a herokit project you need to add this package first.

hero add herokit:core


Die erste Herokit-App
====================

Das Haupt-App Template muss so heißen wie die gebootstrapte App.
Standard ist "herokitapp".
Der Name der App kann über Herokit.Config.ngAppName geändert werden.

Minimum-Beispiel:


```
#!html

<template name="herokitapp">
    <div id="herokitapp" ui-view ngStrictDi herokit-transition>
    </div>
</template>
```



Debug Log-Level
==========

- Level 0: Off
- Level 1: Application Level
- Level 2: Important logs
- Level 3: Logs on add-on package level
- Level 4: Logs on core level 
- Level 5: Extreme verbose e.g. core debugging


Dokumentation zu den eingesetzten Libraries
==========================================
- http://docs.meteor.com/#/full/
- http://angularjs.meteor.com/api
- https://github.com/aldeed/meteor-collection2
- http://commangular.org/docs/
- https://github.com/iron-meteor/iron-router
- http://angular-ui.github.io/ui-router/site/#/api/ui.router
- https://material.angularjs.org/