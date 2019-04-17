// 1、加载模块
let http = require('http');
let fs = require('fs');
let path = require('path')
// 创建服务器
let server = http.createServer();
// request 请求事件处理函数，需要接收两个参数：
//    Request 请求对象
//        请求对象可以用来获取客户端的一些请求信息，例如请求路径
//    Response 响应对象
//        响应对象可以用来给客户端发送响应消息
server.on('request', function (request, response) {
  // http.createServer(function (request, response) {
  // response 对象有一个方法：write 可以用来给客户端发送响应数据
  // write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待


  // response.end()

  // 在服务端默认发送的数据，其实是 utf8 编码的内容
  // 但是浏览器不知道你是 utf8 编码的内容
  // 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
  // 中文操作系统默认是 gbk
  // 解决方法就是正确的告诉浏览器我给你发送的内容是什么编码的
  // 在 http 协议中，Content-Type 就是用来告知对方我给你发送的数据内容是什么类型
  // response.setHeader('Content-Type', 'text/plain; charset=utf-8')
  // response.end('hello 世界')
  // -----------------
  let url = request.url;
  // if (url === '/plain') {
  //   // text/plain 就是普通文本
  //   response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  //   response.end('hello 世界！');
  // } else if (url === '/html') {
  //   // 如果你发送的是html格式的字符串，则也要告诉浏览器我给你发送的text/html格式的文档
  //   response.setHeader('Content-Type', 'text/html; charset=utf-8');
  //   response.end('<p>hello html <a href = "">点我</a></p>')
  // }

  // 新的一章
  /*
  if (url === '/') {
    // 像之前这种模式，就太麻烦了
    //  response.setHeader('Content-Type', 'text/html; charset=utf-8');
    //   response.end('<p>hello html <a href = "">点我</a></p>')
    // 我们要发送的还是在文件中的内容
    fs.readFile('./resource/index.html', function (err, data) {
      if (err) {
        response.setHeader('Content-Type', 'text/plain; charset=utf-8')
        response.end('文件读取失败，请稍后重试！')
      } else {
        // data 默认是二进制数据，可以通过 .toString 转为咱们能识别的字符串
        // response.end() 支持两种数据类型，一种是二进制，一种是字符串
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.end(data)
      }
    })
  } else if (url === '/fish') {
    // url：统一资源定位符
    // 一个 url 最终其实是要对应到一个资源的
    fs.readFile('./resource/fish.jpg', function (err, data) {
      if (err) {
        response.setHeader('Content-Type', 'text/plain; charset=utf-8')
        response.end('文件读取失败，请稍后重试！')
      } else {
        // data 默认是二进制数据，可以通过 .toString 转为咱们能识别的字符串
        // response.end() 支持两种数据类型，一种是二进制，一种是字符串
        // 图片就不需要指定编码了，因为我们常说的编码一般指的是：字符编码
        response.setHeader('Content-Type', 'image/jpeg')
        response.end(data)
      }
    })
  }
  */
   // 里需要换成自己电脑所在的文档路径
  let wwwDir = 'f:/chedabang-demo/blogCodeGitHub/NodeStudy/demo01Apache/www'

  // 新的一章，利用node fs模块读取文件列表
  // if (url === '/') {
  // fs.readFile('./index.html', function (err, data) {
  //   if (err) {
  //     return response.end('404 Not Found')
  //   }
  //   fs.readdir(wwwDir, function (err, files) {
  //     console.log(111111111111)
  //     if (err) {
  //       return response.end('Can not find www dir.')
  //     }
  //     // 2.1 生成需要替换的内容
  //     let content = ''
  //     console.log(files);
  //     files.forEach(function (item) {
  //       // 在 EcmaScript 6 的 ` 字符串中，可以使用 ${} 来引用变量
  //       content += `<li><a href="./resource/${item}">${item}</a></li>`
  //     })

  //     // 2.3 替换
  //     data = data.toString()
  //     console.log(content);
  //     data = data.replace('<li></li>', content)

  //     // 3. 发送解析替换过后的响应数据
  //     response.end(data)
  //   })
  // })
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
      // data = data.toString()
      templateStr = templateStr.toString().replace('<li></li>', content);
      // templateStr = templateStr.replace('<li></li>', content)
      // data = data.replace('<li></li>', content)

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
