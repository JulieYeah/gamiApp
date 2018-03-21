'use strict';

angular.module('missionDone', ['ngRoute'])


  // controller
  .controller('MissionDoneController', function ($routeParams, $scope, $rootScope, $location, $http, msgBus) {
    $scope.finalResult=[]
    $rootScope.$on("missionFinish", function(event,data){ 
      // two case whether success or not
      console.log('onlistening...',data)
      $scope.finalResult.push(
        
          {key:'Points',value:data.score||0},
          {key:'Accuracy',value:Math.round(data.accu*100)+'%'},
          {key:'Mission Time',value:data.time},
          {key:'Stars Gained',value:data.coins}
      
      )
      $scope.finishFlag = true;
    });
    
  });