angular.module("ngHerokit").controller("ngHerokitShowController", ['$scope', '$timeout', '$log', 'HeroPage', '$meteor', '$Herokit', '$stateParams',
    function ($scope, $timeout, $log, HeroPage, $meteor, $Herokit, $stateParams) {
        'use strict';

        if (typeof $scope.controllerConfig == 'undefined')
            $scope.controllerConfig = $Herokit.getDefaultControllerConfig();

        if (typeof $scope.controllerConfig.states.item.pagetitle !== 'undefined') HeroPage.setTitle($scope.controllerConfig.states.item.pagetitle);

        if (Herokit.Helper.debug.isLog(5)) console.log("Check State Params for Object Id: ", $scope.controllerConfig.models.primary.item.stateParamId, ' = ',  $stateParams[$scope.controllerConfig.models.primary.item.stateParamId]);

        if (typeof $stateParams[$scope.controllerConfig.models.primary.item.stateParamId] !== 'undefined') var objectId = $stateParams[$scope.controllerConfig.models.primary.item.stateParamId];
        else throw new Herokit.Error("Object ID not found in state params");

        console.log ($scope.controllerConfig.models.primary.item.subscription, objectId);
        //TODO: Subscribe only if required data is not found, otherwise asume that there is an active subscription for the requested data
         $scope.$meteorSubscribe($scope.controllerConfig.models.primary.item.subscription, objectId).then(function(subscriptionHandle){

        if (Herokit.Helper.debug.isLog(5)) console.log("Subscription '"+$scope.controllerConfig.models.primary.item.subscription+"' is ready. Assigning to scope."+$scope.controllerConfig.models.primary.item.scopevar);

        $scope[$scope.controllerConfig.models.primary.item.scopevar] =
                $meteor.object($scope.controllerConfig.models.primary.collection, objectId,
                              false); //do not autoClientSave: changes in the client won't be automatically propagated back to the Meteor collection.

            if (typeof $scope.dataReadyCallback !== 'undefined') $scope.dataReadyCallback();    //call a callback when subscription is ready if defined
        });

        $scope.setPageTitle = function (newTitle) {
            HeroPage.setTitle(newTitle);
        };

}]);
