# Node学习之模拟Apache功能

## 需要实现的功能

+ 列出文件列表

+ 能够读取静态文件

## 技术小结：

一、所用到node核心模块
+ http
+ fs
+ path

二、初步了解客户端与服务器传输的过程

三、了解Node功能

## 使用方法
进入根目录下,终端命令`node index.js`

## 背景

这里讲述一下救赎的原因

切图仔救赎-Node学习之初窥服务器

## 功能需求梳理

既然确定了今天的主题内容模拟Apache功能

[] 进入服务器端口之后，默认会出现一个页面，列出www下面文件列表

[] 对于错误路径或者找不到文件，返回404

[] 能够正常访问www下面静态文件

[] 能够正常问www下面子文件夹和文件，以及html之间挑战

## 知识点笔记

> 在Web领域，大多数的编程语言需要专门的Web服务器作为容器，如ASP、ASP.NET需要IIS作为服务器，PHP需要搭载Apache或Nginx环境等，JSP需要Tomcat服务器等。
> 
> 但对于Node而言，只需要几行代码即可构建服务器，无需额外的容器。

 Node提供了net、dgram、http、https这4个模块，分别用于处理TCP、UDP、HTTP、HTTPS，适用于服务器端和客户端。

但是说实话，一般前端来说，接触到的也就是http、https这两个协议。

简单一点来说，TCP、UDP属于传输层协议， http、https就是属于应用层协议。

我们前端类似Ajax就是走http协议，一知半解。这里主要的学习对象是Node，不敢扯太多。（毕竟自己打自己脸不是一回两回了）

## http模块

这个http模块，用起来贼鸡儿简单，require引入之后，调用`http.createServer`就可以了

### createServer()
```
var http = require('http');
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello Http Server');
    res.end();
}).listen(3000);
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
server.listen(3000);
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
server.listen(3000);
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