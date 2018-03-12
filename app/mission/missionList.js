'use strict';

angular.module('missionList', ['ngRoute'])


  // controller
  .controller('MissionListController', function ($routeParams, $scope, $rootScope, $location, $http,missionService) {

  
    var missionList;
    missionService.initMissionList().then(function(data){
      $scope.missionList=data.missions;
      $rootScope.missionInfo = data;
    })
    

    function initMission(){
      var currentMission = missionList;
      console.log(currentMission)

    }

   

  });