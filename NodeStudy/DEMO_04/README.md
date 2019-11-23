### 数据库

数据库就是可快速访问的一种格式化数据集合

数据库目前分为两大类

+ 关系型数据库： 特点就是数据库之间的信息相互关联。 例如：MySQL、SQLServe、 oracle

+ 非关系型数据库：数据库之间的信息并不是相互关联的，只是简单存储。 例如：MogonDB


### SQL检索数据

#### select查询语法

**基本语法**
```
SELECT column_name(s) FROM table_name
```
代表返回表格中`table_name`中叫`column_name`的某一栏数据、 这里复数`（s）`表示可以添加多个`column_name`

+ `select * from table_name`
代表返回所有的`table_name` 

> PS: `table_name` 其实可以写成 `table name`但是，一般用引号包裹，才能添加空格， 所以为了避免麻烦， 大家一般习惯使用下划线的语法

+ `where`
作用筛选功能, 支持常用的数学符号
> `>`
> `<`
> `=`
> `>=`
> `<=`
> `!=`
> `<>`

还可以配合以下`and`、`or` 连接多个条件筛选。但是需要注意执行顺序
`and`优先级比`or`高， 所以一般添加这两个语句, 涉及到多个的时候建议用括号区别优先级。想数学运算符一样

`not`则是用来取反的操作

+ `in`针对某一列多个值进行筛选 

普通版本： `where state value1 or state value2 or state value3` 
in版本`where state in (value1, value2, value3)`

+ `between`拥有连接某个范围值赛选
  
普通版本：`where state >= 1000 and state <= 3000 `
`between`版本： `where state btween 1000 and 3000`

+ `like`搜索匹配字段中的指定内容
  
例：`where name like '%w%' or name like 'a%' or name like '%z'`
意思就是从`name`一栏中，找到包含字母`w`或者`a`开头的名字或者 `z`结尾的名字

例： `where name like '_a' or name like ___z`
意思就是从`name`一栏中, 找到第二个字母为`a`或者第四个字母为`a`的名字。 `_`一个下划线代表一个任意字符串


