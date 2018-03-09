'use strict';

angular.module('chapter', ['ngRoute'])


  // controller
  .controller('ChapterController', function ($scope, $rootScope, $location,$http) {
      
    $scope.gotoPage = function (page,args) {

      $location.path('/' + page+'/'+args);
      if(args){
        console.log('clicked',args);
      }
    }
  
      console.log('init page')

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


    

  })