### 关于MongoDB

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