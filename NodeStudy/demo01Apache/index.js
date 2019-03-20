// 1、加载模块
let http = require('http');
// let fs = require('fs');

// 创建服务器
let server = http.createServer();

server.on('request', function (request, response) {
  console.log('收到客户端的请求了，请求路径是：' + request.url)
  // response 对象有一个方法：write 可以用来给客户端发送响应数据
  // write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
  response.write('hello')
  response.write('nodejs')

  // 告诉客户端，我的话说完了，你可以呈递给用户了
  response.end()
  })
server.listen(2333, function () {
    console.log('启动成功，可以通过 http://127.0.0.1:2333/ 来访问')
});
