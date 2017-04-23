'use strict';
/*global angular*/
(function () {
    angular
        .module('webApp', [
            'ngAnimate',
            'ui.router',
            'ui.bootstrap',
            'oc.lazyLoad',
            'ngResource',
            'ui.grid',
            'toastr',
            'cgBusy'
        ])
        .config(config);
    config.$inject = ['$httpProvider', '$provide', 'toastrConfig'];
    function config ($httpProvider, $provide, toastrConfig) {
        angular.extend(toastrConfig, {
            allowHtml: true,
            closeButton: true,
            closeHtml: '<button>x</button>',
            extendedTimeOut: 1000,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            maxOpened: 1,
            messageClass: 'toast-message',
            onHidden: null,
            onShown: null,
            onTap: null,
            progressBar: false,
            tapToDismiss: true,
            preventOpenDuplicates: true,
            templates: {
                toast: 'directives/toast/toast.html',
                progressbar: 'directives/progressbar/progressbar.html'
            },
            timeOut: 2000,
            titleClass: 'toast-title',
            toastClass: 'toast'
        });

        $provide.factory('httpInterceptor', ['$location', function ($location) {
            return {
                // optional method
                'response': function (response) {
                    return response;
                },
                'request': function (request) {
                    return request;
                },
            };
        }]);
        $httpProvider.interceptors.push('httpInterceptor');
    }
})();
