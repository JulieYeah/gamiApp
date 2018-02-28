'use strict';

angular.module('chapter', ['ngRoute'])


// controller
.controller('ChapterController', function($scope, $rootScope,$location) {
  $scope.chapters = [{
     name : '',
     subject : ''
}];  
$scope.gotoPage = function(page) {
    
  $location.path('/'+page);
}

})