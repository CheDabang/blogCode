

const fs = require('fs')
const local = require('./local.json')
// Express 提供了一种更好的方式
// 专门用来包装路由的
const express = require('express')

// 1. 创建一个路由容器
const router = express.Router()

router.get('/', function (req, res) {
    res.render('index', {
        title: '切图仔救赎-Node学习之express做一个本地CURD',
        foods: local.foods
      })
  })
module.exports = router