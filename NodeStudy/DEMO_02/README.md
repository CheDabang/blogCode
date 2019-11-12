# DEMO_02介绍

讲的就是利用express，撸一个简单本地Json版本的CURD模型

# 路由设计

| 请求路径 |  method | 参数                     | 备注说明         | 
|:-------:|:-------:|:------------------------:|:---------------:|
| /       | GET     | 无                       | 渲染首页         |
| /new    | GET     | 无                       | 渲染添加食物页面  |
| /new    | POST    | name、type、price        | 处理添加食物请求  |
| /edit   | GET     | id                       | 渲染食物编辑页面  |
| /edit   | POST    | id、name、type、price     | 处理编辑食物请求   |
| /delete | POST    | id                       | 处理删除食物请求   |