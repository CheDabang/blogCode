//  connect() 返回一个状态待定（pending）的连接, 
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
// 接着我们加上成功提醒和失败警告。
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('连接成功!')
});