'use strict';

angular.module('setting', ['ngRoute','ngMaterial', 'ngMessages'])



// controller
.controller('SettingController', function($scope, $rootScope,$location,$http) {
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
        console.log(e.target.result.slice(22,-1))
          $scope.prev_img = e.target.result;
      });
  };
  reader.readAsDataURL(photofile);
 
};
  $scope.upload = function() {

var token ='24.2cf10c092f183c1d612ea7eef79d6bf9.2592000.1526968574.282335-10992420';

$http({
  method: 'POST',
  url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token='+token,
  dataType: 'json',
  contentType: "application/x-www-form-urlencoded",
  crossDomain : true,
  data:{
    image : $scope.prev_img
  }
}).then(function (response) {
 console.log(response)
}, function (response) {
  // 请求失败执行代码
});
  };
  $scope.range = function(n) {
    return new Array(n);
};
$scope.submit = function(){
  console.log($scope.sheet)
}
})