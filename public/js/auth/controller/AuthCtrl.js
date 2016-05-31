angular.module('appclient').controller('AuthCtrl', ['$scope', '$state', 'authClient',
    function($scope, $state, authClient) {
        $scope.title = "Auth";

        $scope.signin = function() {
            authClient.signin($scope.user).then(function(user) {
                $state.go("dashboard", {
                    userid: user.email
                });
            }, function(err) {
                $scope.error = err.error;
            });
        };

        $scope.getCurrentUser = authClient.getCurrentUser;

    }
]);