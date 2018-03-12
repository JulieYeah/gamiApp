'use strict';

angular.module('missionDone', ['ngRoute'])


  // controller
  .controller('MissionDoneController', function ($routeParams, $scope, $rootScope, $location, $http, msgBus) {

    $rootScope.$on("missionFinish", function(event,data){ 
      // two case whether success or not
      console.log('onlistening...',data)
      $scope.finishFlag = true;
    });

    $scope.finalResult =[
      {
        key:'Points',
        value:'99'
      },
      {
        key:'Accuracy',
        value:'50%'
      },
      {
        key:'Mission Time',
        value:'07:00'
      },
      {
        key:'Stars Gained',
        value:'9'
      },
      {
        key:'Other',
        value:'...'
      },


    ]
    


  });