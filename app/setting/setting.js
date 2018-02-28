'use strict';

angular.module('setting', ['ngRoute'])



// controller
.controller('SettingController', function($scope, $rootScope,$location) {
  $scope.credentials = {
     username : '',
     password : ''
};  
  $scope.login = function(credentials) {
    console.log('login', credentials);
    //此处验证用户密码是否成功
    $location.path('/chapter');
    // AuthService.login(credentials).then(function(user) {
    //     $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    //     $scope.$parent.setCurrentUser(user);
    // }, function() {
    //     $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    // });
  };
})