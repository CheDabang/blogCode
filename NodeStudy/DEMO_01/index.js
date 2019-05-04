// 1、加载模块
let http = require('http');
let fs = require('fs');
let path = require('path')
// 创建服务器
let server = http.createServer();
/**
 * request 请求事件处理函数，需要接收两个参数：
 *   1、Request 请求对象
 *        请求对象可以用来获取客户端的一些请求信息，例如请求路径
 *   2、Response 响应对象
 *         响应对象可以用来给客户端发送响应消息
 */


server.on('request', function (request, response) {
  /**
   * response 对象有一个方法：write 可以用来给客户端发送响应数据
   * write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待 response.end()
   * 在服务端默认发送的数据，其实是 utf8 编码的内容,但是浏览器不知道你是 utf8 编码的内容浏览器。
   * 在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析，中文操作系统默认是 gbk。所以一般不加编码返回来就是乱码了
   * 解决方法就是正确的告诉浏览器我给你发送的内容是什么编码的, 在 http 协议中，Content-Type 就是用来告知对方我给你发送的数据内容是什么类型
   * response.setHeader('Content-Type', 'text/plain; charset=utf-8')
   */
 
  let url = request.url;

  // 利用_dirname返回你执行的js文件的绝对路径
  console.log(__dirname + '/www')
  // let wwwDir = 'f:/chedabang-demo/blogCodeGitHub/NodeStudy/demo01Apache/www'
  let wwwDir = __dirname + '/www'
  let urlPath = path.join(wwwDir, url);
  console.log(urlPath, 'urlPath', url)
  fs.stat(urlPath, function (err, stats) {
    if (err) {
      return response.end('404 Not Found.')
    }
    if (stats.isFile()) {
      fs.readFile(urlPath, function (err, data) {
        if (err) {
          return response.end('404 Not Found.')
        }
        response.end(data)
      })
    } else if (stats.isDirectory()) {
      let templateStr = fs.readFileSync('./template.html').toString()
      let files = fs.readdirSync(urlPath)
      let content = '';
      files.forEach(function (item) {
        // 在 EcmaScript 6 的 ` 字符串中，可以使用 ${} 来引用变量
        if (url === '/') {
          content += `<li><a href="./${item}">${item}</a></li>` 
        } else {
          content += `<li><a href=".${url}/${item}">${item}</a></li>` 
        }
      })

      // 2.3 替换
      templateStr = templateStr.toString().replace('<li></li>', content);
      response.end(templateStr)
      // 告诉客户端，我的话说完了，你可以呈递给用户了
    }
  })
  // }
}).listen(2333, function () {
    console.log('启动成功，可以通过 http://127.0.0.1:2333/ 来访问')
  });
// server.listen(2333, function () {
//   console.log('启动成功，可以通过 http://127.0.0.1:2333/ 来访问')
// });
