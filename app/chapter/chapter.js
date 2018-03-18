'use strict';

angular.module('chapter', ['ngRoute'])


  // controller
  .controller('ChapterController', function ($scope, $rootScope, $location,$http) {
      
  
      console.log('init page')


      $rootScope.gotoPage = function (page,args) {
        var redirect = '/' + page;
        redirect += args? ('/'+args):'';
        $location.path(redirect);
      }

      $http({
        method: 'GET',
        url: './chapter/chapters.json',
        dataType: 'json',
        contentType: "application/json"
      }).then(function (response) {
        $scope.chapters = response.data;
        console.log($scope.chapters,'..')
      }, function (response) {
        // 请求失败执行代码
      });
  
      $scope.enter= function(index,eId){
        console.log("..emitting")
        if($scope.chapters[index].finishFlag){
          $scope.$broadcast('getRank',$scope.chapters[index].exerciseId)
        }else{
         $rootScope.gotoPage('missionList',eId)
      }
    }


    




    

  })