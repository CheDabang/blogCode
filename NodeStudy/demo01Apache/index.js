// 1、加载模块
let http = require('http');
// let fs = require('fs');
// 用来获取机器信息的
var os = require('os');
var path = require('path');
// 获取当前机器的 CPU 信息
console.log(os.cpus())

// memory 内存
console.log(os.totalmem(), '内存')

// 获取某个路径下面的,文件扩展名
console.log(path.extname('f:/chedabang-demo/blogCodeGitHub/NodeStudy/demo01Apache/test.txt'))

// 创建服务器
let server = http.createServer();
// request 请求事件处理函数，需要接收两个参数：
//    Request 请求对象
//        请求对象可以用来获取客户端的一些请求信息，例如请求路径
//    Response 响应对象
//        响应对象可以用来给客户端发送响应消息
server.on('request', function (req, response) {
  // response 对象有一个方法：write 可以用来给客户端发送响应数据
  // write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
  console.log('收到请求了，请求路径是：' + req.url)
  console.log('请求我的客户端的地址是：', req.socket.remoteAddress, req.socket.remotePort)
  response.write('hello')
  response.write('nodejs')

  // 告诉客户端，我的话说完了，你可以呈递给用户了
  response.end()
})
server.listen(2333, function () {
  console.log('启动成功，可以通过 http://127.0.0.1:2333/ 来访问')
});