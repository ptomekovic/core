angular.module("ngHerokit").controller('ngHerokitOnlineStatusController', function ngHerokitOnlineStatusController($scope, onlineStatus) {
    $scope.onlineStatus = onlineStatus;

    $scope.$watch('onlineStatus.isOnline()', function (online) {
        $scope.online_status_string = online ? 'online' : 'offline';
    });
});
