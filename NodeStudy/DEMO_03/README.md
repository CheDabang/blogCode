### 关于MongoDB

### 启动方式
> npm i
nodemon index.js or node index.js

#### 基本shell指令

连接MongoDB 
> `mongo`

输入`db`，显示你当前正在使用的数据库：
> `db`

此操作将返回默认数据库`test`， 要切换数据库，使用`use <db>`，如下例所示：
> `use <database>`
  
列出所有可用的数据库
> `show dbs`

你可以切换到一个不存在的数据库。当你第一次向数据库存储数据，如通过创建一个集合，MongoDB将自动创建数据库。例如，当我直接使用一个存在的数据库`myFoods`的时候, 然后往`foodList`集合插入数据`煎饼果子`的时候，就会自动创建`myFoods`和`foodList`.

> `use myFoods`
`db.foodList.insert( { food: '煎饼果子' } )`

+ `myFoods` 数据库名称
+ `foodList` 集合的名称
一系列操作比较骚气

#### mongoose基本指令

 `connect`表示本地指定数据库
 
> `mongoose.connect('mongodb://localhost/dabang')`

`mongoose.Schema`
Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成。

```
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
```
这里就意味我弄了一个食物列表`Schema`, 之后丢到一个`model`里面. 

```
const Foods = mongoose.model('Foods', foodsSchema)
```
之后我就可以通过Foods来进行操作这个foodsSchema

##### 简单的操作

+ 增加食物数据 `Foods(food).save((err) => {..do something})`

+ 查询食物列表 `Schema` `Foods.find((err, foodsList) => {...do something})`

+ 根据ID查询指定食物 `Foods.findById(id, (err, food) => {...do something})`

+ 根据ID修改指定食物 `Foods.findByIdAndUpdate(id, food, (err) => {...do something})`

+ 根据ID删除指定食物 `Foods.findByIdAndRemove(id, (err) => {...do something}`