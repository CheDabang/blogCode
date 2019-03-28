// 1、加载模块
let http = require('http');
// let fs = require('fs');
// 用来获取机器信息的
var os = require('os');
var path = require('path');
// 获取当前机器的 CPU 信息
// console.log(os.cpus())

// memory 内存
// console.log(os.totalmem(), '内存')

// 获取某个路径下面的,文件扩展名
// console.log(path.extname('f:/chedabang-demo/blogCodeGitHub/NodeStudy/demo01Apache/test.txt'))

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
  // response.write('hello')
  // response.write('nodejs')

  // 告诉客户端，我的话说完了，你可以呈递给用户了
  // response.end()

   // 在服务端默认发送的数据，其实是 utf8 编码的内容
  // 但是浏览器不知道你是 utf8 编码的内容
  // 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
  // 中文操作系统默认是 gbk
  // 解决方法就是正确的告诉浏览器我给你发送的内容是什么编码的
  // 在 http 协议中，Content-Type 就是用来告知对方我给你发送的数据内容是什么类型
  // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  // res.end('hello 世界')
  var url = req.url;
  if (url === '/plain') {
    // text/plain 就是普通文本
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.end('hello 世界！');
  } else if (url === '/html') {
    // 如果你发送的是html格式的字符串，则也要告诉浏览器我给你发送的text/html格式的文档
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end('<p>hello html <a href = "">点我</a></p>')
  }

})
server.listen(2333, function () {
  console.log('启动成功，可以通过 http://127.0.0.1:2333/ 来访问')
});