angular.module("ngHerokit").controller("ngHerokitListController", ['$scope', '$timeout', '$log', 'HeroPage', '$Herokit', '$meteor',
    function ($scope, $timeout, $log, HeroPage, $Herokit, $meteor) {
        'use strict';

        if (typeof $scope.controllerConfig == 'undefined')
            $scope.controllerConfig = $Herokit.getDefaultControllerConfig();

        HeroPage.setTitle($scope.controllerConfig.states.list.pagetitle);

        if (typeof $scope.controllerConfig.models.primary.list.subscriptionoptions === 'undefined')
            $scope.controllerConfig.models.primary.list.subscriptionoptions={};

        if (typeof $scope.controllerConfig.models.primary.list.doSubscribe === 'undefined') $scope.controllerConfig.models.primary.list.doSubscribe=true;


        if (typeof $scope.controllerConfig.models.primary.list.autosubscribe=== 'undefined' || $scope.controllerConfig.models.primary.list===true)
        {

            if ($scope.controllerConfig.models.primary.list.doSubscribe)
            {
                $scope.$meteorSubscribe($scope.controllerConfig.models.primary.list.subscription,
                    $scope.controllerConfig.models.primary.list.subscriptionoptions)
                    .then(function(subscriptionHandle){
                    $scope.controllerConfig.models.primary.list.subscriptionHandle = subscriptionHandle;

                    $scope[$scope.controllerConfig.models.primary.list.scopevar] = $meteor.collection(function(){
                        return $scope.controllerConfig.models.primary.collection.find({});
                      });

                    if (typeof $scope.dataReadyCallback !== 'undefined') $scope.dataReadyCallback();    //call a callback when subscription is ready if defined
                });
            }
            else {
                $scope[$scope.controllerConfig.models.primary.list.scopevar] = $meteor.collection(function(){
                    return $scope.controllerConfig.models.primary.collection.find({});
                  });

                if (typeof $scope.dataReadyCallback !== 'undefined') $scope.dataReadyCallback();    //call a callback when subscription is ready if defined
            }
        }

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
              $scope.controllerConfig.models.primary.collection.remove(item._id);
            $location.path($scope.controllerConfig.states.list.path);   //TODO use UIRoute instead of location path
            }, function() {
              //do nothing, simply close
            });


        };

        $scope.setPageTitle = function (newTitle) {
            HeroPage.setTitle(newTitle);
        };

}]);

//Implement this into your controller
//$controller('ngHerokitListController', {$scope: $scope}); //Inherits the controller
