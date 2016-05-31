angular.module('appclient').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('index', {
                url: "/index",
                templateUrl: "js/dashboard/template/landing.html",
                controller: "LandingCtrl",
                onEnter: ['$state', 'authClient',
                    function($state, authClient) {
                        if (authClient.isMember()) {
                            $state.go('dashboard');
                        }
                    }
                ]
            }).state('dashboard', {
                url: "/dashboard",
                templateUrl: "js/dashboard/template/dashboard.html",
                controller: "DashboardCtrl",
                onEnter: ['$state', 'authClient',
                    function($state, authClient) {
                        if (!authClient.isMember()) {
                            $state.go('signin');
                        }
                    }
                ]
            });
    }
]);