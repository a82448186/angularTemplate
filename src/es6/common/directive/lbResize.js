/**
 * Created by wadeforever on 2016/7/5.
 */
/*global angular*/
angular
    .module('webApp')
    .directive('resize', ['$window', function ($window) {
        return function (scope, element, attr) {
            var w = angular.element($window);
            scope.$watch(function () {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            }, function (newValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;

                scope.resizeWithOffset = function (h, n, offsetH) {
                    scope.$eval(attr.notifier);
                    newValue.h = newValue.h < 580 ? 580 : newValue.h;
                    return {
                        'height': ((newValue.h - h) * n - offsetH) + 'px'
                        // ,'width': (newValue.w - 100) + 'px'
                    };
                };
                scope.ybyResizeWithOffset = function (h, n, offsetH) {
                    scope.$eval(attr.notifier);
                    newValue.h = newValue.h < 580 ? 580 : newValue.h;
                    return {
                        'height': ((newValue.h - h) / 3 * n - offsetH) + 'px'
                        // ,'width': (newValue.w - 100) + 'px'
                    };
                };
                scope.resizeHeight = function (h, n) {
                    newValue.h = newValue.h < 580 ? 580 : newValue.h;
                    return {
                        'height': (newValue.h - h) * n + 'px'
                        // ,'width': (newValue.w - 100) + 'px'
                    };
                };
                scope.resizeMaxHeight = function (h, n) {
                    newValue.h = newValue.h < 580 ? 580 : newValue.h;
                    return {
                        'max-height': (newValue.h - h) * n + 'px'
                        // ,'width': (newValue.w - 100) + 'px'
                    };
                };

            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });
        };
    }]);
