'use strict';

angular.module('setting', ['ngRoute','ngMaterial', 'ngMessages'])



// controller
.controller('SettingController', function($scope, $rootScope,$location) {
  $scope.sheet = {
     //json format
     title:'',
     starNum:'',
     feetNum:'',
     time:'',
     missionNum:''
};  
$scope.file_changed = function(element) {


  var photofile = element.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
      $scope.$apply(function() {
        console.log(e.target.result)
          $scope.prev_img = e.target.result;
      });
  };
  reader.readAsDataURL(photofile);
 
};
  $scope.upload = function() {

  };
  $scope.range = function(n) {
    return new Array(n);
};
$scope.submit = function(){
  console.log($scope.sheet)
}
})