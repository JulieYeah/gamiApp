

  app.service('missionService', function ($http,$routeParams) {
   
    this.initMissionList=function() {
        console.log(".....")
        var missionListResponse = $http({
            method: 'GET',
            url: './mission/missions' + $routeParams.cid + '.json',
            dataType: 'json',
            contentType: "application/json"
          }).then(function (response) {
           
            var missions = response.data.missions;
            missions.forEach(element => {
              switch (element.typeId*1){
                case 0:
                element.type = '填空题'
                element.note = '在橫線中填入答案'
                break;
                case 1:
                element.type = '连线题'
                element.note = '將左右匹配的方塊串起來吧'
                break;
                case 2:
                element.type = '判断题'
                element.note = '大法官 請判斷真假'
                break;
                case 3:
                element.type = '排序題'
                element.note = '讓錯亂的順序回歸正常'
                break
                case 4 :
                element.type = '选择题'
                element.note = '駕駛飛船燃燒方塊吧'
                break
                case 5 :
                element.type = '归类题'
                element.note = '尋找方塊的歸屬 左？還是右？'
                break
                default:
                element.type = '其他'
                console.log(element);
              }
            });
            return response.data
            }, function (response) {
            // 请求失败执行代码
          });
          return missionListResponse
    }
    
  });