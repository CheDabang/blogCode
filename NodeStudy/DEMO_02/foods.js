/**
 * foods.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 *
 * 这里才是我们学习 Node 的精华部分：奥义之所在
 * 封装异步 API
 */
const fs = require('fs')
const dbPath = './local.json'

/**
 * 获取食物列表
 * @param  {Function} callback 回调函数
 */
exports.find = function (callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).foods)
  })
}

/**
 * 
 * @param  {Object}   food  食物对象
 * @param  {Function} callback 回调函数
 */
exports.save = function (food, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
      if (err) {
        return callback(err)
      }
      let foods = JSON.parse(data).foods
  
      // 添加 id ，唯一不重复
      food.id = foods[foods.length - 1].id + 1
  
      // 把用户传递的对象保存到数组中
      foods.push(food)
  
      // 把对象数据转换为字符串
      var fileData = JSON.stringify({
        foods: foods
      })
  
      // 把字符串保存到文件中
      fs.writeFile(dbPath, fileData, function (err) {
        if (err) {
          // 错误就是把错误对象传递给它
          return callback(err)
        }
        // 成功就没错，所以错误对象是 null
        callback(null)
      })
    })
  }
  /**
 * 根据 id 获取食物列表对象
 * @param  {Number}   id       食物id
 * @param  {Function} callback 回调函数
 */
exports.findById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let foods = JSON.parse(data).foods
    let ret = foods.find(function (item) {
      return item.id === parseInt(id)
    })
    callback(null, ret)
  })
}



/**
 * 更新食物
 */
exports.updateById = function (food, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let foods = JSON.parse(data).foods

    // 注意：这里记得把 id 统一转换为数字类型
    food.id = parseInt(food.id)

    // 你要修改谁，就需要把谁找出来
    // EcmaScript 6 中的一个数组方法：find
    // 需要接收一个函数作为参数
    // 当某个遍历项符合 item.id === food.id 条件的时候，find 会终止遍历，同时返回遍历项
    let obj = foods.find(function (item) {
      return item.id === food.id
    })

    // 这种方式你就写死了，有 100 个难道就写 100 次吗？
    // obj.name = food.name
    // obj.age = food.age
    // 遍历拷贝对象
    for (var key in food) {
      obj[key] = food[key]
    }

    // 把对象数据转换为字符串
    let fileData = JSON.stringify({
      foods: foods
    })

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        // 错误就是把错误对象传递给它
        return callback(err)
      }
      // 成功就没错，所以错误对象是 null
      callback(null)
    })
  })
}

/**
 * 删除食物
 */
exports.deleteById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let foods = JSON.parse(data).foods

    // findIndex 方法专门用来根据条件查找元素的下标
    let deleteId = foods.findIndex(function (item) {
      return item.id === parseInt(id)
    })

    // 根据下标从数组中删除对应的食物对象
    foods.splice(deleteId, 1)

    // 把对象数据转换为字符串
    let fileData = JSON.stringify({
      foods: foods
    })

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        // 错误就是把错误对象传递给它
        return callback(err)
      }
      // 成功就没错，所以错误对象是 null
      callback(null)
    })
  })
}