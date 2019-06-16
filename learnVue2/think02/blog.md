# [切图仔救赎]Vue2响应式--拦截Array原型

## 前言
在之前的博客当中，利用`Object.defindProperty`的特性，简单完成一个vue2响应式的小demo。该demo的data类型是Object，运行没有任何问题。但是如果换成Array类型就会有问题。
```
    let data = {
        food: '煎饼果子',
        drink: '热豆浆'
    }
```