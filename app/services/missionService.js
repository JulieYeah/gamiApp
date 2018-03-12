

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
                break;
                case 1:
                element.type = '连线题'
                break;
                case 2:
                element.type = '判断题'
                break;
                case 3:
                element.type = '选择题'
                break
                case 4 :
                element.type = '问答题'
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