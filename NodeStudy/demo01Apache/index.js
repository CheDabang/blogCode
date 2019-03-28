// 1、加载模块
let http = require('http');
// let fs = require('fs');

// 创建服务器
let server = http.createServer();

server.on('request', function () {
  console.log('收到客户端的请求了')
})

server.listen(2333, function () {
  console.log('启动成功，可以通过 http://127.0.0.1:2333/ 来访问')
});