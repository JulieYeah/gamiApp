'use strict';

angular.module('mission', ['ngRoute'])


// controller
.controller('MissionController', function($routeParams,$scope, $rootScope,$location) {

$scope.gotoPage = function(page) {
    
  $location.path('/'+page);
}

$http({
  method: 'GET',
  url: './mission/mission/missions'+$routeParams.cid+'.json',
  dataType: 'json',
  contentType: "application/json"
}).then(function (response) {
  $scope.missionList = response.data;
  console.log($scope.chapters,'..')
}, function (response) {
  // 请求失败执行代码
});

})