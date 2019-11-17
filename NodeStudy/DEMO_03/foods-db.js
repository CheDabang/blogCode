const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/dabang', { useMongoClient: true })

const Schema = mongoose.Schema

let foodsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: '￥'
  }
})

// 直接导出模型构造函数
module.exports = mongoose.model('Foods', foodsSchema)
