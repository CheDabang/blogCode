const fs = require('fs')
const local = require('./local.json')
const foods = require('./foods')
// Express 提供了一种更好的方式
// 专门用来包装路由的
const express = require('express')

// 1. 创建一个路由容器
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index', {
    title: '本地CURD页面Index',
    foods: local.foods
  })
})

router.get('/new/', function (req, res) {
  res.render('new', {
    title: '本地CURD页面new',
    foods: local.foods
  })
})

router.post('/new/', function (req, res) {
  console.log(req.body)
  // res.render('new', {
  //   title: '本地CURD页面new',
  //   foods: local.foods
  // })
  foods.save(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/')
  })
})
module.exports = router