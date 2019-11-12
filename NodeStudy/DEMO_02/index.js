const express = require('express')
const app = express()
 
app.get('/',  (req, res) =>{
  res.render('view/index.html')
})
 
app.listen(2333, () => {
    console.log('running 2333...')
})