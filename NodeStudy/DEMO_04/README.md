### 数据库

数据库就是可快速访问的一种格式化数据集合

数据库目前分为两大类

+ 关系型数据库： 特点就是数据库之间的信息相互关联。 例如：MySQL、SQLServe、 oracle

+ 非关系型数据库：数据库之间的信息并不是相互关联的，只是简单存储。 例如：MogonDB


### 检索数据

# select查询语法

**基本语法**
```
SELECT column_name(s) FROM table_name
```
代表返回表格中`table_name`中叫`column_name`的某一栏数据、 这里复数`（s）`表示可以添加多个`column_name`

+ `select * from table_name`
代表返回所有的`table_name` 

> PS: `table_name` 其实可以写成 `table name`但是，一般用引号包裹，才能添加空格， 所以为了避免麻烦， 大家一般习惯使用下划线的语法


+ where

+ order
  
+ 注释： --