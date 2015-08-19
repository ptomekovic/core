'use strict';

angular.module('ngHerokit',['ngSanitize', 'angular-meteor', 'ui.router', 'ct.ui.router.extras', 'ngAnimate', 'commangular'])
.constant('MODULE_VERSION', '0.0.5')
.constant("APPCONFIG", {
    "MODELS": {}
})
.run(['$rootScope', 'APPCONFIG',
    function($rootScope, APPCONFIG){

        $rootScope.APPCONFIG = APPCONFIG;
}])
;
