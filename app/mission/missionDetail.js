'use strict';

angular.module('missionDetail', ['ngRoute'])


  // controller
  .controller('MissionDetailController', function ($routeParams, $scope, $rootScope, $location, $http, missionService, msgBus, $interval) {

    var currentMission, currentQuestion = 0, currentfinalAnswer, finalAnswer = [],timeLeft;
    // mission的顺序,完成情况
    $scope.sequenceIndex = 0; $scope.percentage = 0;
    // defulat finishing flag
    $scope.flagFinish = false;
    // choice symbol
    $scope.choiceChar = ['A', 'B', 'C', 'D', 'F', 'G']
    // init the number of answerbox 

    //init answers:
    $scope.mcAnswer = -1;
    //init mcMatch
    $scope.mcMatch = -1;
    //init input
    $scope.mcInput = -1;
    $scope.classAnswer = [];

    $scope.missionList = $rootScope.missionInfo.missions;
    initAnswerBox()
    initTimer()

    function initTimer() {
      //check the initial mission types
    let initMission = $scope.missionList[0]
    if (initMission.typeId == '1') { //for matching
      setTimeout(function () {
        creatline($("#match"));
      }, 500);
    } else if (initMission.typeId == '4') {
      setTimeout(function () {
        initMultiChocie()
      }, 500);

    }

      var countTimes = 0, timeLength = $rootScope.missionInfo.timeLength
      var timerID = $interval(updateTime, 1000,timeLength+1);
      //updateTime();

      function updateTime() {
        var cd = timeLength * 1 - countTimes;
        timeLeft = cd;
        $scope.time = zeroPadding(Math.floor(cd / 3600), 2) + ':' + zeroPadding(Math.floor(cd % 3600 / 60), 2) + ':' + zeroPadding((cd % 3600 % 60), 2);
        countTimes++;
        if (timeLeft == 0) {
          $interval.cancel(timerID)
          missionFinish()

        }
      };

      function zeroPadding(num, digit) {
        var zero = '';
        for (var i = 0; i < digit; i++) {
          zero += '0';
        }
        return (zero + num).slice(-digit);
      }
    }
    //init Input
    function initAnswerBox() {
      currentMission = $scope.missionList;
      var answerlength = currentMission[$scope.sequenceIndex].content.length;
      var userAnswer = new Array(answerlength)

      for (var i in userAnswer) {
        userAnswer[i].push('')
      }

      $scope.userAnswer = userAnswer;
      

    }
    // interaction to form the input number panel
    $scope.getNumber = function (num) {
      return new Array(num);
    }

    // every click on the number panel will triger filling in the coresponsible inputbox
    $scope.selectNum = function (num) {

      $scope.userAnswer[currentQuestion] = $scope.userAnswer[currentQuestion] || ''
      $scope.userAnswer[currentQuestion] += num;
      currentfinalAnswer = $scope.userAnswer

    }
    // next mission
    var matchNum = 0, countAnswer = []
    
    $scope.nextMission = function () {

      // save the answer
      if (currentMission[$scope.sequenceIndex].typeId == 5) {
        currentfinalAnswer = $scope.classAnswer;
      }

      finalAnswer[$scope.sequenceIndex] = currentfinalAnswer;
      console.log(finalAnswer, 'answer..')

      if (currentMission.length - 1 == $scope.sequenceIndex) {
        missionFinish()
        $scope.sequenceIndex = -1;
      } else {
        $scope.percentage = Math.floor(($scope.sequenceIndex+1) * 100 / currentMission.length)
        $scope.sequenceIndex++;
        let cMission = currentMission[$scope.sequenceIndex];
        //dispatch next mission type
        if (cMission.typeId == '1') { //for matching
          matchNum = cMission.content.length;
          setTimeout(function () {
            creatline($("#match"));
          }, 500);
        } else if (cMission.typeId == '4') {
          setTimeout(function () {
            initMultiChocie()
          }, 500);

        } else {

        }
        //clear the answer
        $scope.userAnswer = []
        currentfinalAnswer = []

      }


      if (document.getElementById("multiC")) {
        document.getElementById("multiC").remove();
        // window.removeEventListener('mousedown',fire)
        $("body").off()
      }

    }

    // input answer
    $scope.nextFocus = function () {
      if (currentQuestion < currentMission[$scope.sequenceIndex].content.length - 1) {
        currentQuestion++;
        $scope.mcInput++;

      } else {
        currentQuestion = 0;
        $scope.mcInput = -1;
      }

    }


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
    //finally answer
    // about put in Order
    $scope.inOrder = ''; $scope.orderChecked = []
    $scope.putOrder = function (index) {
      if (!$scope.orderChecked[index]) {
        $scope.inOrder += currentMission[$scope.sequenceIndex].content[index];
        $scope.orderChecked[index] = true;
        currentfinalAnswer = [$scope.inOrder];
      } else {
        //chosen
      }

    }

    $scope.clearOrder = function () {
      $scope.inOrder = ''
      var orderChecked = $scope.orderChecked
      for (var i in orderChecked) {
        orderChecked[i] = false;
      }
      $scope.orderChecked = orderChecked
    }

    // all missions pass or time due
    var correctness = [];
    function missionFinish() {
      var finalScore = {}, qnumber = 0, mvalue = [], scoreSum = 0;

      for (let i = 0; i < currentMission.length; i++) {
        correctness[i] = 0, mvalue[i] = currentMission[i].value * 1;

        for (let j = 0; j < currentMission[i].answer.length; j++) {
          qnumber++;
          if (finalAnswer[i]&&(currentMission[i].answer[j] == finalAnswer[i][j])) {
            correctness[i]++;
          }else{
            correctness[i]=0;
          }
        }
      }
      for (let i = 0; i < mvalue.length; scoreSum += mvalue[i] * correctness[i], i++)
        //accuracy
        finalScore.accu = correctness.reduce((a, b) => a + b, 0) / qnumber;
      finalScore.score = scoreSum;
      finalScore.id = $rootScope.missionInfo.exerciseId;
      finalScore.time = $rootScope.missionInfo.timeLength - timeLeft;
      finalScore.coins = $rootScope.missionInfo.coins;
     // finalScore.time = zeroPadding(Math.floor(timel / 3600), 2) + ':' + zeroPadding(Math.floor(timel % 3600 / 60), 2) + ':' + zeroPadding((timel % 3600 % 60), 2);
      // time to calculate the accuracy and pop over the window
      $scope.finishFlag = true;
      // timeConsume point
      $rootScope.$emit('missionFinish', finalScore)

      console.log('..sending')
    }

    // ==============================================matching-logic start



    function creatline(box) {
      //===========createfun

      //其中主要逻辑：
      // 1. 鼠标事件捕捉，同时作为画线的起点，同时选中
      // 2. 全局鼠标移动事件，画一段不完整的，可以不画
      // 3. 点击选中另一侧的，获得终点坐标
      // 4. 按这个画线
      //canvas 赋值
      var canvas = document.getElementById('canvas1');  //获取canvas  实际连线标签
      canvas.width = box.find(".show").width();//canvas宽度等于div容器宽度
      canvas.height = box.find(".show").height();
      // //canvas 追加2d画布			
      var context = canvas.getContext('2d');  //canvas追加2d画图
      var backcanvas2 = document.getElementById('canvas2');
      var lastX, lastY;//存放遍历坐标
      //init attr

      for (let i = 0; i < currentMission[$scope.sequenceIndex].content.length; i++) {
        let el = document.getElementById('leftItem' + i);

        initmatch(el)

      }
      for (let i = 0; i < currentMission[$scope.sequenceIndex].answer.length; i++) {
        var el2 = document.getElementById('rightItem' + i);
        initmatch(el2)
      }

      function initmatch(el) {
        el.dataset.group = "gpl";
        el.dataset.left = el.offsetLeft;
        el.dataset.top = el.offsetTop + el.offsetHeight / 2;
        el.dataset.sel = '0';
        el.dataset.check = '0';

      }

      //连线数据
      var groupstate = false;//按下事件状态，标记按下后的移动，抬起参考
      var pair = [];//配对属性
      var linewidth = 2, linestyle = "#e8f7f8";//连线绘制--线宽，线色
      //提示线数据
      var mid_startx, mid_starty, mid_endx, mid_endy, active;//存储虚拟连线起始坐标
      var all_start = [], all_end = [];
      $scope.drawLine = function (index) {
        groupstate = true;
        let lid = 'leftItem' + index
        var $this = document.getElementById(lid)
        active = index;
        $scope.mcMatch = active;
        // $scope.apply()
        mid_startx = $this.dataset.left*1+$this.clientWidth*1;
        mid_starty = $this.dataset.top;
        all_start[index] = [mid_startx, mid_starty]
        event.preventDefault();
      }
      //end	
      $scope.drawLineend = function (ans, index) {
        pair[active] = index;
        currentfinalAnswer[active] = ans;
        console.log(pair)
        var $thisR = $('#rightItem' + index)
        lastX = $thisR.attr('data-left');
        lastY = $thisR.attr('data-top');
        all_start[active].push(lastX)
        all_start[active].push(lastY)
        context.clearRect(0, 0, box.find(".show").width(), box.find(".show").height());//整个画布清除
        context.save();
        for (let i = 0; i < currentMission[$scope.sequenceIndex].content.length; i++) {
          all_start[i] = all_start[i] || [0, 0, 0, 0]
          context.beginPath();
          context.lineWidth = linewidth;
          context.moveTo(all_start[i][0], all_start[i][1]);
          //context.moveTo(mid_startx,mid_starty)
          context.lineTo(all_start[i][2], all_start[i][3]);
          context.strokeStyle = linestyle;
          context.stroke();
        }

        context.restore();
        $scope.mcMatch = -1;

      }

      $scope.clearline = function () {//清除
        context.clearRect(0, 0, box.find(".show").width(), box.find(".show").height());
        pair = [];
        all_start = []
        box.find(".showleft").children("span").each(function (index, element) {
          $(this).removeClass("addstyle");
          $(this).attr("data-sel", "0");
          $(this).attr("data-check", "0");
        });
        box.find(".showleft").attr('data-first', 0);
        box.find(".showright").attr('data-first', 0);
      };


    };//==============fune


    // init 

    function initMultiChocie() {
      var multiC = document.getElementById('multiC')
      var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { view: multiC, antialias: false, transparent: true, resolution: 1 });
      renderer.view.style.position = 'absolute';
      renderer.view.style.left = '0';
      renderer.view.style.top = '0';
      document.body.appendChild(renderer.view);

      // create the root of the scene graph
      var stage = new PIXI.Container();

      // create a texture from an image path
      var texture = PIXI.Texture.fromImage('./img/assets/spaceship.png');
      var carrotTex = PIXI.Texture.fromImage('./img/assets/bullet.png');
      var shipFrame = PIXI.Texture.fromImage('./img/assets/ship_frame.png');
      var tabs = [], tabs_num = [];
      for (var i = 0; i < currentMission[$scope.sequenceIndex].choices.length; i++) {
        tabs[i] = PIXI.Texture.fromImage('./img/slotbg.png');
        tabs_num[i] = new PIXI.Sprite(tabs[i])
        var rect = document.getElementById('tabs' + i).getBoundingClientRect();
        tabs_num[i].position.x = rect.left;
        tabs_num[i].position.y = rect.top;
        stage.addChild(tabs_num[i])
        tabs_num[i].alpha = 0;
      }


      // create a new Sprite using the texture
      var bunny = new PIXI.Sprite(texture);
      var shipFrameSprite = new PIXI.Sprite(shipFrame);

      // center the sprite's anchor point
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;

      // move the sprite to the center of the screen
      bunny.position.x = renderer.view.width / 2;
      bunny.position.y = renderer.view.height - 60;
      shipFrameSprite.position.x = renderer.view.width / 2 - 200;
      shipFrameSprite.position.y = renderer.view.height - 150;



      stage.addChild(bunny);
      stage.addChild(shipFrameSprite);

      stage.interactive = true;

      // window.addEventListener("mousedown", fire)
      $("body").on('mousedown', fire)

      function fire() {
        console.log('listening shooting..')
        shoot(bunny.rotation, {
          x: (bunny.position.x + Math.cos(bunny.rotation) * 30) * 0.97,
          y: bunny.position.y + Math.sin(bunny.rotation) * 30
        });
      }



      function setup() {

        //set text

        //Create the text sprite


        //Set the game state
        state = play;

        //Start the game loop 
        renderer.ticker.add(delta => gameLoop(delta));
      }


      var bullets = [];
      var bulletSpeed = 5;

      function shoot(rotation, startPosition) {
        var bullet = new PIXI.Sprite(carrotTex);
        bullet.position.x = startPosition.x;
        bullet.position.y = startPosition.y;
        bullet.rotation = rotation;
        stage.addChild(bullet);
        bullets.push(bullet);
      }

      function rotateToPoint(mx, my, px, py) {
        var self = this;
        var dist_Y = my - py;
        var dist_X = mx - px;
        var angle = Math.atan2(dist_Y, dist_X);
        var degrees = angle * 180 / Math.PI;
        return angle;
      }



      // start animating
      var currentAnswer = [];
      var finalAnswer = [];
      animate();
      function animate() {
        requestAnimationFrame(animate);

        // just for fun, let's rotate mr rabbit a little
        bunny.rotation = rotateToPoint(renderer.plugins.interaction.mouse.global.x, renderer.plugins.interaction.mouse.global.y, bunny.position.x, bunny.position.y);

        for (var b = bullets.length - 1; b >= 0; b--) {
          bullets[b].position.x += Math.cos(bullets[b].rotation) * bulletSpeed;
          bullets[b].position.y += Math.sin(bullets[b].rotation) * bulletSpeed;

          for (let i = 0; i < tabs_num.length; i++) {
            // check collation
            if (hitTestRectangle(bullets[b], tabs_num[i])) {
              $scope.mcAnswer = i;
              console.log('hiiiiiiit')
              // var el= document.getElementById('tabs'+i)
              // el.getElementsByTagName('i')[0].className+=el.getElementsByTagName('i')[0].className.indexOf('Blazing')>0?'':' Blazing';
              // console.log($('#tabs0').sibilings())
              // set bullet invisible  when hit the answer box
              bullets[b].visible = false;
              $scope.$apply()
              currentfinalAnswer = [$('#tabs' + i + ' i').text()]
            }
          }


        }
        //stage.removeChild(bullets)


        // render the container
        renderer.render(stage);
      }


      // detect collation 
      function hitTestRectangle(r1, r2) {

        //Define the variables we'll need to calculate
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

        //hit will determine whether there's a collision
        hit = false;

        //Find the center points of each sprite
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;

        //Find the half-widths and half-heights of each sprite
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;

        //Calculate the distance vector between the sprites
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;

        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {

          //A collision might be occuring. Check for a collision on the y axis
          if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
          } else {

            //There's no collision on the y axis
            hit = false;
          }
        } else {

          //There's no collision on the x axis
          hit = false;
        }

        //`hit` will be either `true` or `false`
        return hit;
      };
    }

  });