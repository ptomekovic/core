'use strict';

/* Helper for setting Page titles

You could define controller at the <html> level.

 <html ng-app="app" ng-controller="titleController">
   <head>
     <title>{{ Page.title() }}</title>
 ...
You create service: Page and modify from controllers.

myModule.factory('Page', function() {
   var title = 'default';
   return {
     title: function() { return title; },
     setTitle: function(newTitle) { title = newTitle }
   };
});
Inject Page and Call 'Page.setTitle()' from controllers.
Here is the concrete example: http://plnkr.co/edit/0e7T6l
*/
angular.module("ngHerokit").factory('HeroPage', function () {
    var title = 'Default HeroKIT App Title';
    return {
        title: function () {
            return title;
        },
        setTitle: function (newTitle) {
            title = newTitle
        }
    };
});
