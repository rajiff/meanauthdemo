angular.module('appclient', ['ngMaterial', 'ui.router']);

angular.module('appclient').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
    }
]);

// angular.module('appclient').controller('AppClientCtrl', ['$state',
//     function($state) {

//     }
// ]);