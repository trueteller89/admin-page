'use strict';
angular.module('app', [
        'ngRoute',
        'LocalStorageModule',
        'app.controllers',
        'app.services',
        'app.components',
        'app.directives',
        'ui.bootstrap',
        'ui.router',
        'smart-table'
    ])
    .config(['$locationProvider', '$routeProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $routeProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('404', {

                url: '/404',
                component: 'notfound'
            })
            .state('home', {

                url: '/home',
                component: 'home',
                templateUrl: 'build/tpl/home.html'
            })
            .state('admin', {
                url: '/admin',

                views: {
                    '': {
                        templateUrl: '/build/tpl/pages/admin.html',

                        controller: function($scope, $rootScope, userService, $location) {
                            var self = this;
                            self.init = function() {
                                if (userService.getAccessRights() == "notlogged") {
                                    $location.path('/');
                                } else { $location.path('/admin'); }
                            };
                            self.init();
                        },
                    },
                    'asideLeft@admin': {
                        templateUrl: '/build/tpl/blocks/aside-left.html',
                        controller: 'asideController',

                    },
                    'topsideHeader@admin': {
                        templateUrl: '/build/tpl/blocks/block-header.html',

                    }
                },
            })
            .state('events', {
                url: '/events',
                views: {
                    '': {
                        templateUrl: '/build/tpl/pages/events.html',
                        controller: 'eventsController',
                    },
                    'asideLeft@events': {
                        templateUrl: '/build/tpl/blocks/aside-left.html',
                        controller: 'asideController',

                    },
                    'topsideHeader@events': {
                        templateUrl: '/build/tpl/blocks/block-header.html',
                        controller: 'headerController',
                    }
                },
            })
            .state('schools', {
                url: '/schools',
                views: {
                    '': {
                        templateUrl: '/build/tpl/pages/schools.html',
                        controller: 'schoolsController',
                    },
                     'asideLeft@schools': {
                        templateUrl: '/build/tpl/blocks/aside-left.html',
                        controller: 'asideController',

                    },
                    'topsideHeader@schools': {
                        templateUrl: '/build/tpl/blocks/block-header.html',
                        controller: 'headerController',
                    }
                },
            })
            .state('staff', {
                url: '/staff',
                views: {
                    '': {
                        templateUrl: '/build/tpl/pages/staff.html',
                        controller: 'staffController',
                    },
                    'asideLeft@staff': {
                        templateUrl: '/build/tpl/blocks/aside-left.html',
                        controller: 'asideController',

                    },
                    'topsideHeader@staff': {
                        templateUrl: '/build/tpl/blocks/block-header.html',
                        controller: 'headerController',
                    }
                },
            })
            .state('dancers', {
                url: '/dancers',
                views: {
                    '': {
                        templateUrl: '/build/tpl/pages/dancers.html',
                        controller: 'dancersController',
                    },
                    'asideLeft@dancers': {
                        templateUrl: '/build/tpl/blocks/aside-left.html',
                        controller: 'asideController',

                    },
                    'topsideHeader@dancers': {
                        templateUrl: '/build/tpl/blocks/block-header.html',
                        controller: 'headerController',
                    }
                },
            })
            .state('invitations', {
                url: '/invitations/{{id}}',

                views: {
                    '': {
                        templateUrl: '/build/tpl/pages/invitations.html',
                        controller: 'invitationsController',
                    },
                    'asideLeft@invitations': {
                        templateUrl: '/build/tpl/blocks/aside-left.html',
                        controller: 'asideController',

                    },
                    'topsideHeader@invitations': {
                        templateUrl: '/build/tpl/blocks/block-header.html',
                        controller: 'headerController',
                    }
                },
            })
            .state('addSchool', {
                url: '/addschool',
                views: {
                    '': {
                        templateUrl: '/build/tpl/pages/addschool.html',
                        controller: 'addSchoolController',
                    },
                    'asideLeft@addSchool': {
                        templateUrl: '/build/tpl/blocks/aside-left.html',
                        controller: 'asideController',

                    },
                    'topsideHeader@addSchool': {
                        templateUrl: '/build/tpl/blocks/block-header.html',
                        controller: 'headerController',
                    }
                },
            })
            .state('addDancer', {
                url: '/adddancer',

                views: {
                    '': {
                        templateUrl: '/build/tpl/pages/adddancer.html',
                        controller: 'addDancerController',
                    },
                    'asideLeft@addDancer': {
                        templateUrl: '/build/tpl/blocks/aside-left.html',
                        controller: 'asideController',

                    },
                    'topsideHeader@addDancer': {
                        templateUrl: '/build/tpl/blocks/block-header.html',
                        controller: 'headerController',
                    }
                },
            })
            .state('default', {

                url: '/',
                template: ''
            });
    }]);
