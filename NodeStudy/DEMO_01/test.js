let http = require('http');
let server =  http.createServer().listen(6333,function (){
    console.log('启动成功，可以通过 http://127.0.0.1:6333/ 来访问')
});
server.on('request', function (req,res) {
    console.log(res,req);
    console.log('可以访问服务器了！')
    res.end('收到反馈了！')
})