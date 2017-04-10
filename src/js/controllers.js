'use strict';
angular.module('app.controllers', ['ngRoute', 'app.services'])

.controller('mainController', ["$scope", "$rootScope", function($scope, $rootScope) {}])
    .controller('clubController', ["$scope", "$rootScope", '$http', 'httpRequestsService', function($scope, $rootScope, $http, httpRequestsService) {
        $scope.club = {};
        httpRequestsService.getClub().then(function(res) {
            $scope.club = res.data;
        });
    }])
    .controller('eventsController', ["$scope", "$rootScope", '$http', '$filter', 'httpRequestsService', "propertiesService", function($scope, $rootScope, $http, $filter, httpRequestsService, propertiesService) {
        propertiesService.setTitle('Championship > Events');
        $scope.emptyEvent = {
            name: "",
            id: ""
        };
        httpRequestsService.getEvents().then(function(res) {
            $scope.data = res.data;
            angular.forEach($scope.data.members, function(obj) {
                obj.date = new Date(obj.date);
            })

            $scope.tableEvents = res.data.events;
        });
        $scope.getters = {
            id: function(value) {
                return value.id.length;
            }
        };
        $scope.remove = function(event) {
            let index = $scope.data.events.indexOf(event);
            if (index > -1) {
                $scope.data.events.splice(index, 1);
            }
        }
        $scope.addEvent = function() {
            if ($scope.emptyEvent.name) {
                let event = angular.copy($scope.emptyEvent);
                event.id = Math.max.apply(Math, $scope.data.events.map(function(o) {
                    return o.id; })) + 1;
                $scope.data.events.push(event);
                $scope.emptyEvent = {
                    name: "",
                    id: "",
                };
            }
        }
    }])
    .controller('schoolsController', ["$scope", "$rootScope", '$http', '$filter', 'httpRequestsService', "propertiesService", function($scope, $rootScope, $http, $filter, httpRequestsService, propertiesService) {
        propertiesService.setTitle('Championship > Schools');
        $scope.emptySchool = {
            name: "",
            id: ""
        };
        httpRequestsService.getEvents().then(function(res) {
            $scope.data = res.data;
            angular.forEach($scope.data.schools, function(obj) {
                obj.date = new Date(obj.date);
            })

            $scope.tableSchools = res.data.schools;
        });
        $scope.getters = {
            id: function(value) {
                return value.id.length;
            }
        };
        $scope.remove = function(school) {
            let index = $scope.data.schools.indexOf(school);
            if (index > -1) {
                $scope.data.schools.splice(index, 1);
            }
        }
        $scope.addSchool = function() {
            if ($scope.emptySchool.name) {
                let school = angular.copy($scope.emptySchool);
                school.id = Math.max.apply(Math, $scope.data.schools.map(function(o) {
                    return o.id; })) + 1;
                $scope.data.schools.push(school);
                $scope.emptySchool = {
                    name: "",
                    id: "",
                };
            }
        }
    }])
    .controller('asideController', ["$scope", "propertiesService", function($scope, propertiesService) {
        $scope.arrows = [true, true, true, true];
        $scope.changeCaret = function(num) {
            $scope.arrows[num] = ($scope.arrows[num] == true) ? false : true;
        }


    }])
    .controller('headerController', ["$scope", "propertiesService", function($scope, propertiesService) {
        $scope.title = propertiesService.getTitle();
    }])
    .controller('staffController', ["$scope", "propertiesService", "userService", "httpRequestsService", function($scope, propertiesService, userService, httpRequestsService) {
        var self = this;
        propertiesService.setTitle('Championship > Staff');
        $scope.emptyEvent = {
            name: "",
            id: ""
        };
        httpRequestsService.getEvents().then(function(res) {
            $scope.data = res.data;
            angular.forEach($scope.data.staff, function(obj) {
                obj.date = new Date(obj.date);
            })

            $scope.tableStaff = res.data.staff;
        });
        $scope.getters = {
            id: function(value) {
                return value.id.length;
            }
        };
        $scope.remove = function(st) {
            let index = $scope.data.staff.indexOf(st);
            if (index > -1) {
                $scope.data.staff.splice(index, 1);
            }
        }
        $scope.addStaff = function() {
            if ($scope.emptyStaff.name) {
                let st = angular.copy($scope.emptyStaff);
                st.id = Math.max.apply(Math, $scope.data.staff.map(function(o) {
                    return o.id; })) + 1;
                $scope.data.staff.push(st);
                $scope.emptyStaff = {
                    name: "",
                    id: "",
                };
            }
        }
    }])
    .controller('dancersController', ["$scope", "propertiesService", "userService", 'httpRequestsService', "dateService", function($scope, propertiesService, userService, httpRequestsService, dateService) {
        var self = this;
        propertiesService.setTitle('Championship > Dancers');
        $scope.emptyDancer = {
            name: "",
            id: ""
        };
        httpRequestsService.getDancers().then(function(res) {
            $scope.data = res.data;
            angular.forEach($scope.data.dancers, function(obj) {
                obj.date = new Date(obj.date);
            })

            $scope.tableDancers = res.data.dancers;
        });
        $scope.getters = {
            id: function(value) {
                return value.id.length;
            }
        };
        $scope.remove = function(dancer) {
            let index = $scope.data.dancers.indexOf(dancer);
            if (index > -1) {
                $scope.data.dancers.splice(index, 1);
            }
        }
        $scope.addDancer = function() {
            if ($scope.emptyDancer.name) {
                let dancer = angular.copy($scope.emptyDancer);
                dancer.id = Math.max.apply(Math, $scope.data.dancers.map(function(o) {
                    return o.id; })) + 1;
                $scope.data.dancers.push(dancer);
                $scope.emptyDancer = {
                    name: "",
                    id: "",
                };
            }
        }
    }])
    .controller('subscriptionsController', ["$scope", "propertiesService", "userService", 'httpRequestsService', function($scope, propertiesService, userService, httpRequestsService) {
        var self = this;
        propertiesService.setTitle('federation > manage subscriptions');
        self.modes = ["view", "edit"];
        $scope.subscriptionsMode = self.modes[0];
        $scope.subscriptions = [];
        httpRequestsService.getSubscriptions().then(function(res) {
            $scope.subscriptions = res.data.subscriptions;
            $scope.tableSubscriptions = res.data.subscriptions;
            $scope.columnNames = res.data.columnNames;
        });

        $scope.emptyMemSub = {
            "0": "",
            "1": "",
            "2": "",
            "3": "",
            "4": "",
            "5": ""
        };
        $scope.emptySub = {
            id: "",
            criteria: ""
        }
        $scope.saveProfile = function() {};
        $scope.saveSubscriptions = function() {};
        $scope.changeSubMode = function() {
            $scope.subscriptionsMode = ($scope.subscriptionsMode == self.modes[0]) ? self.modes[1] : self.modes[0];
        };
        $scope.addSubCriteria = function() {
            if ($scope.emptySub.criteria) {
                $scope.emptySub.id = Object.keys($scope.columnNames).length;
                angular.forEach($scope.subscriptions, function(value, key) {
                    value[$scope.emptySub.criteria] = null;
                });
                $scope.columnNames[$scope.emptySub.id] = $scope.emptySub.criteria;
                $scope.columnProps = Object.keys($scope.columnNames);
                $scope.emptySub = {
                    id: "",
                    criteria: ""
                };
            };
        };
        $scope.addSubName = function() {
            if ($scope.emptyMemSub[1]) {
                //Find the maximum id and set as the next id of sub
                $scope.emptyMemSub[0] = Math.max.apply(Math, $scope.subscriptions.map(function(o) {
                    return o[0]; })) + 1;
                $scope.subscriptions.push($scope.emptyMemSub);
                $scope.emptyMemSub = {
                    "0": "",
                    "1": "",
                    "2": "",
                    "3": "",
                    "4": "",
                    "5": ""
                };
            }
        };
        $scope.removeSub = function(obj) {
            console.log(obj);
            let index = $scope.subscriptions.indexOf(obj);
            $scope.subscriptions.splice(index, 1);
        };
        $scope.saveTable = function() {
            console.log("save changes!");
        }
    }])
    .controller('leaguesController', ["$scope", "$rootScope", '$http', '$filter', 'httpRequestsService', "propertiesService", function($scope, $rootScope, $http, $filter, httpRequestsService, propertiesService) {


        propertiesService.setTitle('Leagues');

        httpRequestsService.getLeagues().then(function(res) {
            $scope.data = res.data;
            console.log($scope.data);
            $scope.tableLeagues = res.data.leagues;
        });
        $scope.getters = {
            id: function(value) {
                return value.id.length;
            }
        }
    }]);
