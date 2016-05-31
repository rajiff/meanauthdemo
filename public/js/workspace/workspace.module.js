angular.module('appclient').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('workspace', {
                url: "/workspace",
                templateUrl: "workspace/template/workspace.html",
                controller: "WorkspaceCtrl"
            });
    }
]);