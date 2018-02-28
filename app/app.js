'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'login',
  'chapter',
  'setting',
  'user',
  'mission'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginController'
  }).
  when('/chapter', {
    templateUrl: 'chapter/chapter.html',
    controller: 'ChapterController'
  }).
  when('/setting', {
    templateUrl: 'setting/setting.html',
    controller: 'SettingController'
  }).
  when('/user', {
    templateUrl: 'user/user.html',
    controller: 'UserController'
  }).
  when('/mission', {
    templateUrl: 'mission/mission.html',
    controller: 'MissionController'
  })
  ;
}]);

