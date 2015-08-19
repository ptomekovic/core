'use strict';

// Click to navigate
// similar to <a href="#/partial"> but hash is not required,
// e.g. <div click-link="/partial">
angular.module("ngHerokit").directive('heroClick', ['$location',
    function ($location) {
        return {
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    scope.$apply(function () {
                        $location.path(attrs.heroClick);
                    });
                });
            }
        }
}]);

angular.module("ngHerokit").directive('herokitTransition', ['$state',
    function ($state) {
        return {
            link: function (scope, elm, attrs) {
                var enterClass = $state.current.animation;

                /*if (typeof enterClass != 'undefined' && enterClass!='') var aClasses = enterClass.split(' ');
                else return false;
                console.log(aClasses);
                for (var i=0;i<aClasses.length;i++) elm.addClass(aClasses[i]);*/
                elm.addClass(enterClass);

                scope.$on('$destroy', function () {
                    elm.removeClass(enterClass);
                    elm.addClass($state.current.animate);
                })
            }
        }
}]);

angular.module("ngHerokit").directive('heroValidate', [function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.heroValidate = function(modelValue, viewValue) {

        //get and check if schema exists
        if (typeof attrs.heroValidate == 'undefined' || attrs.heroValidate=='')
        {
            console.log('heroValidate validator misconfigured: Missing or empty Schema. Skipped Validation.');
            return true;    //ignore, because missing config
        }

        if (typeof Herokit.Data[attrs.heroValidate] == 'undefined')
        {
            console.log('heroValidate Schema Collection not found needed for validator. Skipped Validation.');
            return true;    //ignore, because missing schema
        }

        //get field data from ng-model
        var aModelData = attrs.ngModel.split('.');
        var sModel = aModelData[0];
        var sField = aModelData[1];
        if (typeof sModel == 'undefined' || typeof sField == 'undefined')
        {
            console.log('heroValidate Schema could not split ng-model to model and field. Skipped Validation.');
            return true;    //ignore, because missing schema
        }

        var objToCheck={};  //build the object manually to prevent checking of special NG/Meteor fields
        objToCheck[sField] = modelValue;

        if (Herokit.Data[attrs.heroValidate].simpleSchema().namedContext().validateOne(objToCheck, sField, {modifier: false})) return true;

        // it is invalid
        return false;
      };
    }
  }
}]);
