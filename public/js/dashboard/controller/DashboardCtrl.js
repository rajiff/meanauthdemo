angular.module('appclient').controller('DashboardCtrl', ['$scope', '$state', 'authClient',
    function($scope, $state, authClient) {
        $scope.title = "Dashboard";

        $scope.signout = function() {
            authClient.signout()
                .then(function() {
                    $state.go("index"); //go to whichever is the default state
                }, function(err) {;
                    $scope.error = err;
                });
        };

        $scope.user = authClient.getCurrentUser();
        console.log("user: ", $scope.user);
    }
]);