const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.use('/public/', express.static('./public/'))  // 处理公共静态资源
app.get('/',  (req, res) =>{
  // res.render('view/index.html')
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
 
app.listen(2333, () => {
    console.log('running 2333...')
})