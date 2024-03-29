'use strict';

/* Adds leading zeroes with
  {{myValue | numberFixedLen:2}}
*/
angular.module("ngHerokit").filter('numberFixedLen', [
    function() {
        return function (n, len) {
                var num = parseInt(n, 10);
                len = parseInt(len, 10);
                if (isNaN(num) || isNaN(len)) {
                    return n;
                }
                num = ''+num;
                while (num.length < len) {
                    num = '0'+num;
                }
                return num;
            };
}]);
