angular.module('appclient').factory('authClient', ['$http', '$q', '$window',
    function($http, $q, $window) {
        var auth = {
            user: undefined
        };

        auth.saveUser = function(user) {
            //@TODO set a expiry time stamp user.sessionTime = Date.now() + 2 minutes??
            $window.localStorage['member-user'] = JSON.stringify(user);
        };

        auth.removeUser = function() {
            $window.localStorage.removeItem('member-user');
        };

        auth.getUser = function() {
            var u = $window.localStorage['member-user'];
            if (u !== undefined)
                u = JSON.parse(u);

            return u;
        };

        auth.getGuest = function() {
            var guest = {};
            return guest;
        };

        auth.isMember = function() {
            var user = auth.getUser();

            if (user === undefined) {
                return false;
            } else {
                //@TODO check expiry timestamp on user session object
                return true;
            }
        };

        auth.getCurrentUser = function() {
            if (auth.isMember()) {
                return auth.getUser();
            } else {
                return auth.getGuest();
            }
        };

        auth.signup = function(signupFormData) {
            //As a first step invalidate or destroy the local user object
            auth.removeUser();

            //Returning a promise object
            return $q(function(resolve, reject) {
                $http
                    .post('/signup', signupFormData)
                    .then(function(res) {
                            //success 
                            if (res.status >= 400) {
                                //can be unauthorized and hence error 
                                auth.removeUser(); //ensuring user is not saved locally
                                reject(res.data);
                            } else if (res.status >= 200 && res.status <= 299) {
                                //Successfully authenticated
                                auth.saveUser(res.data);
                                resolve(auth.getCurrentUser());
                            }
                        },
                        function(res) {
                            //error
                            //console.log("Sign-up returned with error status: ", res.status, ", Error: ", res.data);
                            reject(res.data);
                        }
                );
            });
        };

        auth.signin = function(signinFormData) {
            //Returning a promise object
            return $q(function(resolve, reject) {
                $http.post('/signin', signinFormData)
                    .then(function(res) {
                            //success 
                            if (res.status >= 400) {
                                //can be unauthorized and hence error 
                                auth.removeUser(); //ensuring user is not saved locally
                                reject(res.data);
                            } else if (res.status >= 200 && res.status <= 299) {
                                //Successfully authenticated
                                auth.saveUser(res.data);
                                resolve(auth.getCurrentUser());
                            }
                        },
                        function(res) {
                            //error
                            //console.log("Sign-in returned with error status: ", res.status, ", Error: ", res.data);
                            reject(res.data);
                        }
                );
            });
        };

        auth.signout = function() {
            //As a first step invalidate or destroy the local user object
            auth.removeUser();

            //Returning promise object
            return $q(function(resolve, reject) {
                $http
                    .get('/signout')
                    .then(function(res) {
                            //success 
                            resolve("Signed-out successfully..!");
                        },
                        function(res) {
                            //error
                            reject(res.data);
                        }
                );
            });

        };

        return auth;
    } //end of authclient factory
]);