// const fs = require('fs')
// const Local = require('./Local.json')
// const Foods = require('./foods-fs')

const Foods = require('./foods-db')
// Express 提供了一种更好的方式
// 专门用来包装路由的
const express = require('express')

// 1. 创建一个路由容器
const router = express.Router()

/**
 * 渲染首页
 */
router.get('/', (req, res) => {
  Foods.find(function (err, foods) {
    if (err) return res.status(500).send('Server error.')
    res.render('index', {
          title: 'MongoDB页面Index',
          foods: foods
    })
  })
})

/*
 * 渲染添加食物页面
 */
router.get('/new/', (req, res) => {
  res.render('new', {
    title: 'MongoDB页面new',
  })
})

/*
 * 渲染添加食物请求
 */
router.post('/new/', function (req, res) {
  new Foods(req.body).save((err) => {
    if (err) return res.status(500).send('Server error.')
    res.redirect('/')
  })
})


/*
 * 渲染编辑食物页面
 */
router.get('/edit', function (req, res) {
  // 1. 在客户端的列表页中处理链接问题（需要有 id 参数）
  // 2. 获取要编辑的食物 id
  // 
  // 3. 渲染编辑页面
  //    根据 id 把食物信息查出来
  //    使用模板引擎渲染页面

  Foods.findById(req.query.id, (err, food) => {
    if (err) return res.status(500).send('Server error.')
    res.render('edit', {
      food: food      
    })
  })
})

/*
 * 处理编辑食物
 */
router.post('/edit', function (req, res) {
  // 1. 获取表单数据
  //    req.body
  // 2. 更新
  //    Foods.updateById()
  // 3. 发送响应
  Foods.findByIdAndUpdate(req.body.id, req.body, (err) => {
    if (err) return res.status(500).send('Server error.')
    res.redirect('/')
  })
})

/*
 * 处理删除食物
 */
router.get('/delete', function (req, res) {
  // 1. 获取要删除的 id
  // 2. 根据 id 执行删除操作
  // 3. 根据操作结果发送响应数据
  Foods.findByIdAndRemove(req.query.id, (err) => {
    if (err) return res.status(500).send('Server error.')
    res.redirect('/')
  })
})

module.exports = router