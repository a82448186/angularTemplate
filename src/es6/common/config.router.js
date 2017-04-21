'use strict';
/*global angular*/
(function () {
    angular
        .module('webApp')
        .run(runFn)
        .config(configFn);
    runFn.$inject = ['$rootScope', '$state', '$stateParams', 'i18nService'];
    function runFn ($rootScope, $state, $stateParams, i18nService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        i18nService.setCurrentLang('zh-cn');
    }
    configFn.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
    function configFn ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.defaults.headers.common['If-Modified-Since'] = '0';
        $stateProvider.state('main', {
            url: '/main',
            views: {
                'main': {
                    templateUrl: 'template/common/layout.html'
                }
            }
        });
        $urlRouterProvider.when('', '/main').otherwise('/main');
    }
})();
