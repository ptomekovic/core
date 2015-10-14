angular.module("ngHerokit").controller("ngHerokitFormController", ['$scope', '$stateParams', '$controller', 'HeroPage', 'APPCONFIG', '$mdToast', '$rootScope',  '$Herokit', '$meteor', '$mdDialog', '$state',
    function ($scope, $stateParams, $controller, HeroPage, APPCONFIG,  $mdToast,  $rootScope, $Herokit, $meteor, $mdDialog, $state) {
        'use strict';

        $scope.controllerConfig = $Herokit.getDefaultControllerConfig();

        var itemCollection = $scope.controllerConfig.models.primary.collection;
        var itemConfig = $scope.controllerConfig.models.primary.item;
        var statesConfig = $scope.controllerConfig.states;
        if (typeof itemConfig.doSubscribe === 'undefined') itemConfig.doSubscribe=true;
        if (typeof itemConfig.auto === 'undefined') itemConfig.auto=true;

        $scope[itemConfig.scopevar] = itemConfig.defaultobject;

        /* Skip if its yet defined */
        if (typeof $scope.isNewItem === 'undefined') {
            /* case: is yet set */
            if (typeof $scope[itemConfig.stateParamId] !== 'undefined' && $scope[itemConfig.stateParamId] !== false) {
                if (typeof $scope.isNewItem === 'undefined') { $scope.isNewItem = false; }
            }
            else if (typeof $stateParams[itemConfig.stateParamId] != 'undefined' && $stateParams[itemConfig.stateParamId] != '') { /* case: set from stateparam */

                $scope.isNewItem = false;
                $scope[itemConfig.stateParamId] = $stateParams[itemConfig.stateParamId];
            }
            else { $scope.isNewItem = true; }   /* case: is new */
        }

        $scope.primaryPageActionName = $scope.controllerConfig.primaryPageActionName;

        if (!$scope.isNewItem) {

            if (itemConfig.doSubscribe)    //1==1 DIRTYFIX LK - MUSS IMMER GELADEN WERDEN, DA ES SONST MANCHMAL ZU PROBLEMEN KOMMT
            {
                if (typeof itemConfig.subscriptionoptions === 'undefined') itemConfig.subscriptionoptions=$scope[itemConfig.stateParamId];

                 $scope.$meteorSubscribe(itemConfig.subscription, itemConfig.subscriptionoptions).then(function(subscriptionHandle){
                    itemConfig.subscriptionHandle=subscriptionHandle;
                    $scope[itemConfig.scopevar] = $scope.$meteorObject(itemCollection,  {_id: $stateParams[itemConfig.stateParamId]}, itemConfig.auto);

                    if (typeof $scope.dataReadyCallback !== 'undefined') $scope.dataReadyCallback();    //call a callback when subscription is ready if defined

                });
            }
            else
            {
                $scope[itemConfig.scopevar] = $scope.$meteorObject(itemCollection, $stateParams[itemConfig.stateParamId]);
                if (typeof $scope.dataReadyCallback !== 'undefined') $scope.dataReadyCallback();
            }    //call a callback when subscription is ready if defined
            if (typeof statesConfig.edit.pagetitle!=='undefined') HeroPage.setTitle(statesConfig.edit.pagetitle);
        } else {
            $scope[itemConfig.stateParamId] = false;
            if (typeof statesConfig.new.pagetitle!=='undefined') HeroPage.setTitle(statesConfig.new.pagetitle);
        }

        $scope.saveItem = function (item, aftersaveCallback) {
            if ($scope.isNewItem) {

                if (typeof aftersaveCallback === 'undefined')  aftersaveCallback = function(error, result) {};

                itemCollection.insert(item, aftersaveCallback);

                //check if valid angular ui route object
                /*if (Match.test(statesConfig.list.path, {to: String, params: Match.Optional(Object), options: Match.Optional(Object)})) $state.go(statesConfig.list.path);
                else $state.go(statesConfig.list.path);*/

                //ctrl.$$runValidators(undefined, modelValue, viewValue, noop);
            }
        };

        $scope.remove = function (item, name, event) {

            if (typeof name === 'undefined' || name===null) name='den Eintrag';
            var confirm = $mdDialog.confirm()
              .parent(angular.element(document.body))
              .title('Eintrag löschen')
              .content('Wollen Sie wirklich '+name+' löschen?')
              .ariaLabel('Delete entry')
              .ok('Ja, bitte!')
              .cancel('Nein, abbrechen.')
              .targetEvent(event);

            $mdDialog.show(confirm).then(function() {
                itemCollection.remove(item._id);
                //check if valid angular ui route object
                if (Match.test(statesConfig.list.path, {to: String, params: Match.Optional(Object), options: Match.Optional(Object)})) $state.go(statesConfig.list.path);
                else $state.go(statesConfig.list.path);
            }, function() {
              //do nothing, simply close
            });

        };

        //Needed to use custom page title function from view template
        $scope.setPageTitle = function (newTitle) {
            HeroPage.setTitle(newTitle);
        };

        function NgMeteorClone(obj) {
            if (null == obj || "object" != typeof obj) return obj;
            var copy = obj.constructor();
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr) && !attr.match(/\$/g) && typeof obj.attr != 'function') copy[attr] = obj[attr];
            }
            return copy;
        }

        $scope.duplicate = function (olditem) {
            var newitem = NgMeteorClone(olditem);
            delete newitem._id;
            if (typeof afterduplicateCallback === 'undefined')  afterduplicateCallback = function(error, result) {};

            itemCollection.insert(newitem, afterduplicateCallback);

            //check if valid angular ui route object
                if (Match.test(statesConfig.list.path, {to: String, params: Match.Optional(Object), options: Match.Optional(Object)})) $state.go(statesConfig.list.path);
                else $state.go(statesConfig.list.path);
            $mdToast.show($mdToast.simple().content('Erfolgreich dupliziert.'));
        };

        /**
        * rollbackOnCancel
        *
        */
        $scope.rollbackOnCancel = function (e, cancelkeys) {
            if (typeof cancelkeys !== 'undefined')
            {
                if (Match.test(cancelkeys, Number)) cancelkeys=[cancelkeys];
                else if (Match.test(cancelkeys, [Number])) cancelkeys=cancelkeys;
                else throw new Herokit.Error("Invalid cancelkeys in rollbackOnCancel call");
            }
            else cancelkeys=[27];   //set default

            if (cancelkeys.indexOf(e.keyCode)!==-1) {
                $scope[angular.element(e.target.closest("form")).attr('name')].$rollbackViewValue();
                //$scope.userForm.userName.$rollbackViewValue();
            }
        };


}]);

//Implement this into your controller
//$controller('ngHerokitFormController', {$scope: $scope}); //Inherits the controller
