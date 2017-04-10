'use strict';
angular.module('app.components', ['ngRoute', 'app.services'])
.component('login', {
  templateUrl: '/build/tpl/components/login.html',
  controller: function($scope, $rootScope, localStorageService, userService, $location, $window) {
    var self = this;
    $scope.active = 1;
    $scope.show = false;
    self.rememberme = true;
    $rootScope.$on('login:show', function(ev, args) {
      $scope.active = 1;
      $scope.show = true;
    });

    self.init = function() {

      if (localStorageService.get('user') && localStorageService.get('token')) {
                    //check that user and token are valid!
                    //function check
                    //then
                    userService.setUser(localStorageService.get('user'), localStorageService.get('token'), "federation");
                    $scope.active = 2;
                    $location.path('/admin');
                    //$window.location.href = '/admin';
                  }
                };
                self.init();
            // LOGIN
            self.login = function(frm) {
              if (frm.$valid) {
                var self = this;
                userService.login(self.user.email, self.user.password, self.rememberme).then(function(data) {
                  console.log(data);
                  if (self.user.email == data.user && self.user.password == data.token) {
                    $scope.active = 2;
                    $scope.show = false;
                            /*if (rememberme) {
                                localStorageService.set('user', data.user);
                                localStorageService.set('token', data.token);
                              }*/
                              $location.path('/admin');
                            }

                          }, function(err) {
                            alert('Wrong credentials!');
                          });
              }
            };

            // REGISTER
            self.user = {
              first: null,
              last: null,
              email: null,
              password: null
                    //timezone: jstz.determine().name()
                  };

            // RESET
            self.resetPassword = self.verifyPassword = "";
            self.sendReset = function(frm) {
              userService.resetPassword(self.resetPassword, $scope.resetCode).then(function(res) {
                $scope.active = 1;
                    //localStorageService.set('token', res.token);
                    //localStorageService.set('user', res.user.User);

                  });

            };

            self.close = function() {
              $scope.show = false;

            };
          }
        })
.component('adminPage', {

        })
.component('home', {
  templateUrl: '/build/tpl/home.html',

  controller: function($scope, $rootScope, localStorageService, userService, $location, $window) {}
});
