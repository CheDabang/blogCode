# 切图仔救赎-Node学习之初窥服务器

## 背景

这里讲述一下救赎的原因


## 准备工作

> 在Web领域，大多数的编程语言需要专门的Web服务器作为容器，如ASP、ASP.NET需要IIS作为服务器，PHP需要搭载Apache或Nginx环境等，JSP需要Tomcat服务器等。
> 
> 但对于Node而言，只需要几行代码即可构建服务器，无需额外的容器。

 Node提供了net、dgram、http、https这4个模块，分别用于处理TCP、UDP、HTTP、HTTPS，适用于服务器端和客户端。

但是说实话，一般前端来说，接触到的也就是http、https这两个协议。

简单一点来说，TCP、UDP属于传输层协议， http、https就是属于应用层协议。

我们前端类似Ajax就是走http协议，一知半解。这里主要的学习对象是Node，不敢扯太多。（毕竟自己打自己脸不是一回两回了）

所以这一回利于Node搭建一个简单http服务器，作为初窥服务器的第一站

  
### 功能需求梳理

既然确定了今天的主题内容模拟Apache功能

+ 进入服务器端口之后，默认会出现一个页面，列出www下面文件列表

+ 对于错误路径或者找不到文件，返回404

+ 能够正常访问www下面静态文件

+ 能够正常问www下面子文件夹和文件，以及html之间挑战

### 技术小结：

一、所用到node核心模块
 `http` + `fs` + `path`

二、初步了解客户端与服务器传输的过程

三、了解Node功能

###  使用方法
进入根目录下,终端命令`node index.js`


## http模块基本用法

这个http模块，用起来贼鸡儿简单，require引入之后，调用`http.createServer`就可以了

### createServer()
```
var http = require('http');
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello Http Server');
    res.end();
}).listen(2333);
```

当然也有人另外一种写法，调用`new Serve()`方法

### new Serve()

```
var http = require('http');
var server = new http.Server();
server.on('request', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello Http Server');
    res.end();
});
server.listen(2333);
```

而我就比较浪，两种结合方法结合着用。

### 快乐随意法
```
var http = require('http');
var server = http.createServer();
server.on('request', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello Http Server');
    res.end();
});
server.listen(2333);
```

### 随意组合使用的缘由

之所以，Node模块创建http，可以随意使用，完全是因为这个http封装的挺好玩的，几种情况都帮你考虑到了。

代码来源，Node的GitHub参库：

传送门：[文件①：http.js](https://github.com/nodejs/node/blob/master/lib/http.js)
```
function createServer(opts, requestListener) {
  return new Server(opts, requestListener);
}
```

传送门：[文件②：_http_serve.js](https://github.com/nodejs/node/blob/master/lib/_http_server.js)


```
function Server(options, requestListener) {
  if (!(this instanceof Server)) return new Server(options, requestListener);

  if (typeof options === 'function') {
    requestListener = options;
    options = {};
  } else if (options == null || typeof options === 'object') {
    options = { ...options };
  } else {
    throw new ERR_INVALID_ARG_TYPE('options', 'object', options);
  }

  this[kIncomingMessage] = options.IncomingMessage || IncomingMessage;
  this[kServerResponse] = options.ServerResponse || ServerResponse;

  net.Server.call(this, { allowHalfOpen: true });

  if (requestListener) {
    this.on('request', requestListener);
  }
  // ....后面代码省略
}
```

前面`http.js`将`createServe()`和`new Serve()`进行灵活统一处理，而`_http_serve.js`则是提前做发呆处理，防止有人处理的在调用方法Serve方法的时候，忘记`new`关键字了。

接下来，则是对于`argument`进一步处理，默认行为调用封装好的`event`去绑定事件，这点和我们平常DOM处理的时候，调用的一个API接口`addeventlistener`事件绑定大致相同。

感兴趣的也可以去github地址，查看node的`event.js`是如何编写。传送门地址：[event.js](https://github.com/nodejs/node/blob/master/lib/events.js)

## Node的request事件

上面的示例代码，都有提到`request`事件。所以接下来先来了解，这个`request`事件到底是什么？ 以及回调函数之后两个回调参数是如何回事?

通俗点来说：

+ `request` 就是浏览器以http协议访问服务器，然后服务器将浏览器相关信息储存下来，存储到request对象里面。

  - 例如`require.url`记录浏览器访问的url路径，`require.headers`记录HTTP请求头，主要记录了主机地址(host),用户代理(user-agent),以及文件类型(content-type),以及接受的文件类型(accept)等等

+ `response` 用来响应客户端做出的相关处理

  - `response.end` 此方法向服务器发出信号，表明已发送所有响应头和主体，该服务器应该视为此消息已完成。 必须在每个响应上调用此 response.end() 方法。
  
    response.end() 支持两种数据类型，一种是二进制，一种是字符串，例如我response.end("你好，Node!"), 页面就会出现乱码的`你好，Node！`。但是是乱码的，原有在于我们没有指定编码。

    一般是要进行`setHeader`设置的，下面就是一个简单的例子
    
    ```
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.end("你好, Node!")
    ```
    `Content-Type`，即是Internet Media Type，互联网媒体类型，也叫做MIME类型。在互联网中有成百上千中不同的数据类型，HTTP在传输数据对象时会为他们打上称为MIME的数据格式标签，用于区分数据类型。最初MIME是用于电子邮件系统的，后来HTTP也采用了这一方案。

    在HTTP协议消息头中，使用Content-Type来表示请求和响应中的媒体类型信息。它用来告诉服务端如何处理请求的数据，以及告诉客户端（一般是浏览器）如何解析响应的数据，比如显示图片，解析并展示html等等。

    比如我们常见的`text/html`一般就是指HTML文件了，而`video/avi`, 这指传输**我是一条酸菜鱼.Avi**,需要的格式
    
    简单的代码就可以看到服务器与以前写JavaScript差别了。以前写js直接就是上去梭，而服务端上面的很多操作步骤都要相应的规范起来，得提前声明一系列操作。

    ### 常用的Content-type类型
    + `text/html` 指htmml文件类型 `text/css` 指css文件 `text/plain`指txt文本文件
    + `image/jpeg` 指jpeg、jpg文件, `image/png` 指png文件
    + `video/mpeg4` 指MP4文件 `audio/mp3` 指MP3文件

    ### 常见http状态码
    
    > 这个问题在面试的过程，还出现的挺高的。敲笔记记一下。

    | 编码类型  | 类别 |   原因解释  |  举例编码 |
    | :-----:  |  :------:  | :----:  | :-----: |
    | 1XX   |  Informational（信息性状态码）   | 接受的请求正在处理 |  暂无 |      
    | 2XX |  Success（成功状态码）  |  请求正常处理完毕  |  200 |
    | 3XX |  Redirection（重定向状态码）| 需要进行附加操作以完成请求 | 301、302 |
    | 4XX |  Client Error（客户端错误状态码） | 服务器无法处理请求 | 404 |
    | 5XX | Server Error（服务器错误状态码）| 	服务器处理请求出错 | 500 |

当然还有更多API事件，这里感兴趣的同学可能要上Node 文档上面去查看了