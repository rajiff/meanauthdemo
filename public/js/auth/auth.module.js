angular.module('appclient').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('signin', {
                url: "/signin",
                templateUrl: "/js/auth/template/signin.html",
                controller: "AuthCtrl"
            }).state('signout', {
                url: "/signout",
                templateUrl: "/js/auth/template/signout.html",
                controller: "AuthCtrl"
            }).state('signup', {
                url: "/signup",
                templateUrl: "/js/auth/template/signup.html",
                controller: "AuthCtrl"
            });
    }
]);