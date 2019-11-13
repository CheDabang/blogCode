const fs = require('fs')
const local = require('./local.json')
const foods = require('./foods')
// Express 提供了一种更好的方式
// 专门用来包装路由的
const express = require('express')

// 1. 创建一个路由容器
const router = express.Router()

/**
 * 渲染首页
 */
router.get('/', function (req, res) {
  res.render('index', {
    title: '本地CURD页面Index',
    foods: local.foods
  })
})

/*
 * 渲染添加食物页面
 */
router.get('/new/', function (req, res) {
  res.render('new', {
    title: '本地CURD页面new',
    foods: local.foods
  })
})

/*
 * 渲染添加食物请求
 */
router.post('/new/', function (req, res) {
  // 1. 获取表单数据
  // 2. 处理
  //    将数据保存到 db.json 文件中用以持久化
  // 3. 发送响应
  foods.save(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
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
  //    根据 id 把学生信息查出来
  //    使用模板引擎渲染页面

  .findById(parseInt(req.query.id), function (err, student) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('edit.html', {
      student: student
    })
  })
})

/*
 * 处理编辑学生
 */
router.post('/students/edit', function (req, res) {
  // 1. 获取表单数据
  //    req.body
  // 2. 更新
  //    Student.updateById()
  // 3. 发送响应
  Student.updateById(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

/*
 * 处理删除学生
 */
router.get('/students/delete', function (req, res) {
  // 1. 获取要删除的 id
  // 2. 根据 id 执行删除操作
  // 3. 根据操作结果发送响应数据

  Student.deleteById(req.query.id, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

module.exports = router