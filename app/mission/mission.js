'use strict';

angular.module('mission', ['ngRoute'])


// controller
.controller('MissionController', function($scope, $rootScope,$location) {
  $scope.chapters = [{
     name : '',
     subject : ''
}];  
$scope.gotoPage = function(page) {
    
  $location.path('/'+page);
}

})