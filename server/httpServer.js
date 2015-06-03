var config = require('./config.js').info;
//常量
var ip = config.ip;
var port = config.port;
var host = ip + ':' + port;

//模块引入
var http = require('http');
var url = require('url');

//请求处理
var requestHandler = require('./requestHanders.js');

//http服务模块
var httpServer = function() {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        requestHandler.entry(pathname, request, response);
    }
    http.createServer(onRequest).listen(port, ip);
    console.log('Server started: '+ ip +':'+ port);
};

exports.run = httpServer;