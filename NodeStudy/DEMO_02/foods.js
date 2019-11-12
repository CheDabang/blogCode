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
 * 添加保存学生
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