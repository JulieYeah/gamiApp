'use strict';

  // controller
 app.controller('LeaderboardController', function ($scope, $rootScope, $location,$http) {
      
  
      console.log('init page')
      $scope.show = false

      $scope.$on('getRank',function(event,data){
        console.log('..on')
        getRank(data)
      })

      function getRank(id){
        console.log('..init leaderboard')
        $scope.show = true;
        $http({
          method: 'GET',
          url: './chapter/ranks'+id+'.json',
          dataType: 'json',
          contentType: "application/json"
        }).then(function (response) {
          $scope.ranks = response.data;
          console.log($scope.ranks,'..')
        }, function (response) {
          // 请求失败执行代码
        });
      }
    

  })