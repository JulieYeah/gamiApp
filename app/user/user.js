'use strict';

angular.module('user', ['ngRoute'])



// controller
.controller('UserController', function($scope, $rootScope,$location) {
  var rolarBody= $('#rolarBody'),
  universe = $("#universe"),
  solarsys = $("#solar-system");

  $scope.user= {
    imageId:'0',
    name:'YEYAYA',
    nickname:'JulieYe',
    passMissions:'100',
    allMissions:'150',
    currentLevel:'2'
  }
  

var init = function() {
  //judge where the user are
  //get user basic info
  var level = $scope.user.currentLevel,position;
  switch(level){
    case '0':
    position= 'sun'
    break
    case '1':
    position= 'mercury'
    break
    case '2':
    position= 'venus'
    break
    case '3':
    position= 'earth'
    break
    case '4':
    position= 'mars'
    break
    case '5':
    position= 'jupiter'
    break
    case '6':
    position= 'saturn'
    break
    case '7':
    position= 'uranus'
    break
    case '8':
    position= 'neptune'
    break
  }
  rolarBody.removeClass('view-2D opening').addClass("view-3D").delay(3000).queue(function() {
    $(this).removeClass('hide-UI').addClass("set-speed");
    $(this).dequeue();
  });
  solarsys.removeClass().addClass(position)
};

setTimeout(function () {
  init()
}, 1000);

})