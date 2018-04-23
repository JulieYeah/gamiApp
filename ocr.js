var https = require('https');
var qs = require('querystring');

const param = qs.stringify({
    'grant_type': 'client_credentials',
    'client_id': 'E026W4GRq9jVvM3LhSup5oGf',
    'client_secret': '6rj7OxZtGUvep6o7o4U0GvzT2K6aMUNS'
});

https.get(
    {
        hostname: 'aip.baidubce.com',
        path: '/oauth/2.0/token?' + param,
        agent: false
    },
    function (res) {
        // 在标准输出中查看运行结果
        res.pipe(process.stdout);
    }
);

var AipOcrClient = require("baidu-aip-sdk").ocr;

// 设置APPID/AK/SK
var APP_ID = "10992420";
var API_KEY = "E026W4GRq9jVvM3LhSup5oGf";
var SECRET_KEY = "6rj7OxZtGUvep6o7o4U0GvzT2K6aMUNS";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

var fs = require('fs');

var image = fs.readFileSync("./app/static/img/input.png").toString("base64");

// 调用通用文字识别, 图片参数为本地图片
client.generalBasic(image).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});

// 如果有可选参数
var options = {};
options["language_type"] = "CHN_ENG";
options["detect_direction"] = "true";
options["detect_language"] = "true";
options["probability"] = "true";

// 带参数调用通用文字识别, 图片参数为本地图片
client.generalBasic(image, options).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});;




