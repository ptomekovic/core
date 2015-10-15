'use strict';

angular.module("ngHerokit").factory('$Herokit', ["$commangular", function ($commangular) {
    var title = Herokit.Config.APPCONFIG.DefaultAppTitle;
    var defaultControllerConfig = {
        models: {
            primary: {
                collection: undefined,
                list: {
                    subscription: undefined,
                    scopevar: undefined,
                    subscriptionoptions: {},
                    defaultobject: {}
                },
                item: {
                    subscription: undefined,
                    scopevar: undefined,
                    defaultobject: {},
                    stateParamId: 'itemId'
                }
            }
        },
        primaryPageActionName: 'saveBtn'
    };
    defaultControllerConfig.states = {
        list: {
            path: '',
            pagetitle: 'New'
        },
        new: {
            pagetitle: 'New'
        },
        edit: {
            pagetitle: 'Edit'
        }
    };

    return {
        title: function () {
            return Herokit.Config.APPCONFIG.DefaultAppTitle;
        },
        setTitle: function (newTitle) {
            title = newTitle
        },
        getDefaultControllerConfig: function () {
            return EJSON.clone(defaultControllerConfig);
        },
        isPromise: function (deferred) {
            return (typeof deferred !== 'undefined' &&
            angular.isObject(deferred) &&
            angular.isObject(deferred.$$state) &&
            deferred.then instanceof Function &&
            deferred["catch"] instanceof Function &&
            deferred["finally"] instanceof Function);
        }
    };
}]);
