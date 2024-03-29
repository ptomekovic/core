angular.module("ngHerokit").controller("ngHerokitListController", ['$scope', '$timeout', '$log', 'HeroPage', '$Herokit', '$meteor', '$mdDialog',
    function ($scope, $timeout, $log, HeroPage, $Herokit, $meteor, $mdDialog) {
        'use strict';

        if (typeof $scope.controllerConfig == 'undefined')
            $scope.controllerConfig = $Herokit.getDefaultControllerConfig();

        HeroPage.setTitle($scope.controllerConfig.states.list.pagetitle);

        if (typeof $scope.controllerConfig.models.primary.list.subscriptionoptions === 'undefined')
            $scope.controllerConfig.models.primary.list.subscriptionoptions = {};

        if (typeof $scope.controllerConfig.models.primary.list.doSubscribe === 'undefined') $scope.controllerConfig.models.primary.list.doSubscribe = true;
        if (typeof $scope.controllerConfig.models.primary.list.auto === 'undefined') $scope.controllerConfig.models.primary.list.auto = true;

        if (typeof $scope.afterSub === 'undefined')
            $scope.afterSub = function (subscriptionHandle) {
                $scope.controllerConfig.models.primary.list.subscriptionHandle = subscriptionHandle;

                $scope[$scope.controllerConfig.models.primary.list.scopevar] = $meteor.collection(function () {
                    return $scope.controllerConfig.models.primary.collection.find({});
                }, $scope.controllerConfig.models.primary.list.auto);

                if (typeof $scope.dataReadyCallback !== 'undefined') $scope.dataReadyCallback();    //call a callback when subscription is ready if defined
            };

        if (typeof $scope.controllerConfig.models.primary.list.autosubscribe === 'undefined' || $scope.controllerConfig.models.primary.list === true) {

            if ($scope.controllerConfig.models.primary.list.doSubscribe) {

                $meteor.autorun($scope, function () {
                    $scope.$meteorSubscribe($scope.controllerConfig.models.primary.list.subscription,
                        $scope.getReactively('controllerConfig.models.primary.list.subscriptionoptions', true))
                        .then($scope.afterSub);
                });
            }
            else {
                $scope[$scope.controllerConfig.models.primary.list.scopevar] = $meteor.collection(function () {
                    return $scope.controllerConfig.models.primary.collection.find({});
                }, $scope.controllerConfig.models.primary.list.auto);

                if (typeof $scope.dataReadyCallback !== 'undefined') $scope.dataReadyCallback();    //call a callback when subscription is ready if defined
            }
        }

        $scope.remove = function (item, name, event) {

            if (typeof name === 'undefined' || name === null) name = 'den Eintrag';
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('Eintrag löschen')
                .content('Wollen Sie wirklich ' + name + ' löschen?')
                .ariaLabel('Delete entry')
                .ok('Ja, bitte!')
                .cancel('Nein, abbrechen.')
                .targetEvent(event);

            $mdDialog.show(confirm).then(function () {
                $scope.controllerConfig.models.primary.collection.remove(item._id);
                $location.path($scope.controllerConfig.states.list.path);   //TODO use UIRoute instead of location path
            }, function () {
                //do nothing, simply close
            });


        };

        $scope.setPageTitle = function (newTitle) {
            HeroPage.setTitle(newTitle);
        };

    }]);

//Implement this into your controller
//$controller('ngHerokitListController', {$scope: $scope}); //Inherits the controller
