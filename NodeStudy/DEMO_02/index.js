const express = require('express')
const router = require('./router')
const app = express()

app.set('view engine', 'pug')
app.use('/public/', express.static('./public/'))  // 处理公共静态资源
app.use('/node_modules/', express.static('./node_modules/'))
// 把路由容器挂载到 app 服务中
app.use(router)
 
app.listen(2333, () => {
    console.log('running 2333...')
})