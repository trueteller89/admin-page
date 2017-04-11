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
        httpRequestsService.getSchools().then(function(res) {
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
        $scope.emptyStaff = {
            fullName: "",
            id: ""
        };
        httpRequestsService.getStaff().then(function(res) {
            $scope.data = res.data;
            angular.forEach($scope.data.staff, function(obj) {
                obj.date = new Date(obj.date);
                 obj.fullName=obj.name.firstName+" "+obj.name.lastName;
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
            if ($scope.emptyStaff.fullName) {
                let st = angular.copy($scope.emptyStaff);
                st.id = Math.max.apply(Math, $scope.data.staff.map(function(o) {
                    return o.id; })) + 1;
                $scope.data.staff.push(st);
                $scope.emptyStaff = {
                    fullName: "",
                    id: "",
                };
            }
        }
    }])
    .controller('dancersController', ["$scope", "propertiesService", "userService", 'httpRequestsService', "dateService", function($scope, propertiesService, userService, httpRequestsService, dateService) {
        var self = this;
        propertiesService.setTitle('Championship > Dancers');
        $scope.emptyDancer = {
            fullName: "",
            id: ""
        };
        httpRequestsService.getDancers().then(function(res) {
            $scope.data = res.data;
            angular.forEach($scope.data.dancers, function(obj) {
              obj.advances=[];
                obj.date = new Date(obj.date);
                obj.fullName=obj.name.firstName+" "+obj.name.lastName;
                angular.forEach(obj.discounts, function(el){obj.advances.push(el.congress+"-"+el.discount+"%")});
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
            if ($scope.emptyDancer.fullName) {
                let dancer = angular.copy($scope.emptyDancer);
                dancer.id = Math.max.apply(Math, $scope.data.dancers.map(function(o) {
                    return o.id; })) + 1;
                $scope.data.dancers.push(dancer);
                $scope.emptyDancer = {
                    fullName: "",
                    id: "",
                };
            }
        }
    }])
   ;
