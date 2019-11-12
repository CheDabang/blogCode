const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
console.log(bodyParser)
const app = express()

app.set('view engine', 'pug')
app.use('/public/', express.static('./public/'))  // 处理公共静态资源
app.use('/node_modules/', express.static('./node_modules/'))

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// 把路由容器挂载到 app 服务中
app.use(router)
 
app.listen(2333, () => {
    console.log('running 2333...')
})