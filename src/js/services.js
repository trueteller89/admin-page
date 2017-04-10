'use strict';
angular.module('app.services', ['ngRoute'])
    .service('userService', function($http, $httpParamSerializerJQLike, localStorageService, $q, $location) {
        var API = "json/";
        var self = this;
        self.user = {
            token: null,
            email: null,
            accessRights: 'notlogged'
        };
        self.setUser = function(email, token, accessRights) {
            self.user = {
                token: token,
                email: email,
                accessRights: accessRights
            };
        };
        this.get = function() {
            return $http({
                method: 'GET',
                url: API + 'users.json'
            }).then(function(res) {
                return res.data;
            });
        };

        this.login = function(email, password, rememberme) {
            var def = $q.defer();

            $http({
                    method: 'GET',
                    url: API + 'users/login.json',
                    /*headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $httpParamSerializerJQLike({
                        "data": {
                            "User": {
                                "username": email,
                                "password": password
                            }
                        }
                      })*/
                })
                .success(function(res) {
                    console.log(res);
                    if (email == res.user && password == res.token) {
                        self.user = {
                            email: email,
                            token: password,
                            accessRights: 'federation'
                        };
                        if (rememberme) {
                            localStorageService.set('user', res.user);
                            localStorageService.set('token', res.token);
                            localStorageService.set('accessRights', 'federation');
                        }
                    }
                    def.resolve(res);
                })
                .error(function(err) {
                    console.log(err);

                    def.reject(err);
                });

            return def.promise;
        };

        this.edit = function(id, user) {
            return $http({
                method: 'PUT',
                url: API + 'users/' + id + '.json',
                data: user
            }).then(function(res) {
                return res.data;
            }, function(err) {
                growl.addErrorMessage('Error editing profile');
                return $q.reject();
            });
        };


        this.forgotPassword = function(username, domain) {
            return $http({
                method: 'POST',
                url: API + 'users/forgot.json',
                data: {
                    "domain": domain,
                    "User": {
                        "username": username
                    }
                }
            });
        };

        this.resetPassword = function(password, code) {
            //http request to tell that password was send to email
            return $http({
                method: 'POST',
                url: API + 'users/reset.json',
                data: {
                    "User": {
                        "newpassword": password,
                        "code": code
                    }
                }
            }).then(function(res) {
                return res.data;
            }, function(err) {
                alert.addErrorMessage(err.data.message);
                return $q.reject();
            });
        };
        this.getAccessRights = function() {
            let accessRights = self.user.accessRights;
            return accessRights;

        }
    })
    .service('httpRequestsService', ['$http', function($http) {
        return {
            getEvents: function() {
                return $http.get("json/events.json");
            },
            getSchools: function() {
                return $http.get("json/schools.json");
            },
            getDancers: function() {
                return $http.get("json/dancers.json");
            },
            getStaff: function() {
                return $http.get("json/staff.json");
            }
        };
    }])
    .service('dateService', [function() {
        var getFullYears = function(birthDate) {
            var todayDate, age, fullYears;
            todayDate = new Date();
            birthDate = new Date(birthDate);
            age = todayDate.getTime() - birthDate.getTime();
            fullYears = Math.floor(age / 31536000000);
            return fullYears;
        }
        return {
            getFullYears: getFullYears
        }

    }])
    .service('propertiesService', [function() {
        var self = this;
        return {
            getTitle: function() {
                return self.title;
            },
            setTitle: function(title) {
                self.title = title;
            }
        }

    }]);
