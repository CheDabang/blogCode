const fs = require('fs')
const Local = require('./Local.json')
const Foods = require('./foods')
// Express 提供了一种更好的方式
// 专门用来包装路由的
const express = require('express')

// 1. 创建一个路由容器
const router = express.Router()

// router.get('/', function (req, res) {
//   res.render('index', {
//     title: '本地CURD页面Index',
//     foods: Local.foods
//   })
  /*
 * 渲染学生列表页面
 */
router.get('/', function (req, res) {
  Foods.find(function (err, foods) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('index', {
          title: '本地CURD页面Index',
          foods: foods
    })
  })
})

router.get('/new/', function (req, res) {
  res.render('new', {
    title: '本地CURD页面new',
  })
})

router.post('/new/', function (req, res) {
  Foods.save(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/')
  })
})
module.exports = router