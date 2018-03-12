'use strict';

angular.module('missionDetail', ['ngRoute'])


  // controller
  .controller('MissionDetailController', function ($routeParams, $scope, $rootScope, $location, $http, missionService,msgBus) {

    var currentMission,currentQuestion=0;
    // mission的顺序
    $scope.sequenceIndex = 0;
    // defulat finishing flag
    $scope.flagFinish=false;
    // choice symbol
    $scope.choiceChar = ['A','B','C','D','F','G']
    // init the number of answerbox 

    $scope.missionList = $rootScope.missionInfo.missions;
    initAnswerBox()

    function initAnswerBox() {
      currentMission = $scope.missionList;
      var answerlength = currentMission[$scope.sequenceIndex].content.length;
      var userAnswer = new Array(answerlength)
      
      for (var i in userAnswer){
        userAnswer[i].push('')
      }
      console.log(userAnswer)
      $scope.userAnswer = userAnswer;
    
    }
    // interaction to form the input number panel
    $scope.getNumber = function (num) {
      return new Array(num);
    }

    // every click on the number panel will triger filling in the coresponsible inputbox
    $scope.selectNum = function(num){

      $scope.userAnswer[currentQuestion] = $scope.userAnswer[currentQuestion]||''
      $scope.userAnswer[currentQuestion] +=num;
      
    }
    // next mission
    var matchNum = 0;
    $scope.nextMission = function(){
      
      if(currentMission.length-1 == $scope.sequenceIndex){
        missionFinish()
        $scope.sequenceIndex = -1;
      }else{
        $scope.sequenceIndex ++;
      }
      let cMission = currentMission[$scope.sequenceIndex];
      //dispatch next mission type
      if(cMission.typeId=='1'){ //for matching
        matchNum = cMission.content.length;
        setTimeout(function(){
          creatline($(".demo"));
        },3000);
      }
      // save the answer

      //clear the answer
      $scope.userAnswer = []
    }

    // input answer
    $scope.nextFocus = function(){
      currentQuestion++;
    }

    //$scope.userAnswer = ['11','','']
    // 想做一个出题目的时候 挨个出的 动画效果
    $scope.test = function () {
      var input;
      var cursor;
      var hiddenInput;
      var content = [];
      var lastContent = "", targetContent = "";
      var inputLock = false;
      var autoWriteTimer;

      var isMobile, isIE;

    }
// all missions pass or time due
    function missionFinish(){
      // time to calculate the accuracy and pop over the window
      $scope.finishFlag = true;
      // timeConsume point
      $rootScope.$emit('missionFinish',$rootScope.missionInfo.exerciseId)

      console.log('..sending')
    }

    // ==============================================matching-logic start

    

function creatline(box){//===========createfun

//其中主要逻辑：
// 1. 鼠标事件捕捉，同时作为画线的起点，同时选中
// 2. 全局鼠标移动事件，画一段不完整的，可以不画
// 3. 点击选中另一侧的，获得终点坐标
// 4. 按这个画线

	//canvas 追加2d画布			
	var context = canvas.getContext('2d');  //canvas追加2d画图
	function backstrockline(){//绘制
		 backcanvas.clearRect(0,0,box.find(".show").width(),box.find(".show").height());
		 backcanvas.save();  
		 backcanvas.beginPath();  
		 backcanvas.lineWidth = linewidth; 
		 backcanvas.moveTo(mid_startx,mid_starty);  
		 backcanvas.lineTo(mid_endx,mid_endy); 		 		 
		 backcanvas.strokeStyle = linestyle;  	
		 backcanvas.stroke();  
		 backcanvas.restore(); 
	};
	
	//重置
	box.find(".resetCanvasBtn").click(function(){
		clearline();
	});	 
	//回退
	box.find(".goBackBtn").click(function(){
		goBack();
	}); 
	function goBack(){	
		var linenlastIndex=ms.join("").substr(0,ms.length-1).lastIndexOf("0");
		if(linenlastIndex==0){
			clearline();			
		}else{
			mx = mx.slice(0,linenlastIndex);  //记录值
			my = my.slice(0,linenlastIndex);  //坐标
			ms =ms.slice(0,linenlastIndex);  
		    context.clearRect(0,0,box.find(".show").width(),box.find(".show").height());
		    context.save();  
		    context.beginPath();  
		    context.lineWidth = linewidth;  
		    for (var i=0;i<ms.length;i++) {  
				  lastX = mx[i]; 
				  lastY = my[i];  
				  if (ms[i] == 0) {  
					 context.moveTo(lastX,lastY);  
				  } else {  
					 context.lineTo(lastX,lastY); 
				  }  
		    }     
		    context.strokeStyle = linestyle;  	
		    context.stroke();  
		    context.restore();
		    var pairindex=pairl.length-1;
			box.find(".showleft").children("span").each(function(index, element) {	
				if($(this).attr("pair")==pairl[pairindex]){			
					$(this).removeClass("addstyle");
					$(this).attr("sel","0");
					$(this).attr("check","0");
					$(this).removeAttr("pair");
				};													
			});
			box.find(".showleft").attr('first',0);
			box.find(".showright").children("span").each(function(index, element) {
				if($(this).attr("pair")==pairl[pairindex]){	
					$(this).removeClass("addstyle");
					$(this).attr("sel","0"); 
					$(this).attr("check","0"); 
					$(this).removeAttr("pair");
				};   		
			});
			box.find(".showright").attr('first',0);
			pair-=1;
			pairl=pairl.slice(0,pairindex);
			pairr=pairr.slice(0,pairindex);
		};				    		 	     		       
	};
	//end	
};//==============fune

  });