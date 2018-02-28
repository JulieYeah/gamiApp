'use strict';

angular.module('user', ['ngRoute'])



// controller
.controller('UserController', function($scope, $rootScope,$location) {
  $scope.credentials = {
     username : '',
     password : ''
};  
  $scope.login = function(credentials) {
    
  };
})