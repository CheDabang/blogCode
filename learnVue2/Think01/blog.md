# [切图仔救赎]炒冷饭--在线手撸vue2响应式原理

## 前言
其实这个冷饭我不想炒，毕竟vue3马上都要出来。我还在这里炒冷饭，那就是搞事情呀。

但是作为切图仔搬砖汪，长期切图jq一把梭。重复繁琐的切图，让自己陷入了一个无限的围城。想出去切图这个围城看一看，但是又害怕因为切图时间久了，自己会的也只有切图了。

为了恰饭，帮助自己跳出切图仔的围城。也去看了vue相关文档，当时记忆深刻觉得不错。可是G胖这个时候发动小紫本和打折魔咒，不知不觉又沉迷于DOTA小本子上面了。关于vue响应式原理很快忘得一塌糊涂，只记得一个属性`Object.defindProperty`，然后就没有然后了......

为了避免自己后面再次忘记，所以这里炒一个冷饭加深记忆。

![炒vue2冷饭](https://user-gold-cdn.xitu.io/2019/5/28/16afeffa6b80199b?w=497&h=282&f=png&s=230042)

## 响应式vue

在讲解vue响应式的时候，让我们来一段Vue代码作为示例：
```
<div id="app">
  <div>主食: ${{ food }}</div>
  <div>饮料: ${{ drink }}</div>
  <div>菜单: ${{ menu }}</div>
</div>
<script>
  let vue = new Vue({
    el: '#app',
    data: {
      food: '煎饼果子',
      drink: '热豆浆'
    },
    computed: {
      menu() {
        return  this.food + this.drink
      }
    }
  })
</script>

```

例如当`food`和`drink`发生变化后，Vue会做两件事：

- 在页面上更新`food`和`drink`的值。

- 再次调用`menu`, 重新计算`food + drink`的值, 并在页面上面更新。
 
更新值+计算值其实做的事情很简单，几行代码的事情。但是问题是当`food`或者`drink`变化时，Vue是怎么知道谁变化，然后马上响应其行为去执行那"简单的几行代码"？

所以当jq一把梭的切图仔第一次看到Vue工作时，词穷的我当时第一反应就是`牛皮`。

![牛批](https://user-gold-cdn.xitu.io/2019/5/28/16aff18b55fc5d62?w=240&h=240&f=png&s=97630)

之所以发出感叹，是因为通常的JavaScript代码是实现不了这样的功能的。事实胜于雄辩，让我们直接代码来说明：
```
    let food = "煎饼果子"
    let drink = "热豆浆"
    let menu = null
    menu = food + drink
    food = '炸鸡汉堡'
    drink = '快乐水'
    console.log(menu) 
```
最终控制台打印结果：

```
煎饼果子热豆浆
```
如果是在Vue当中，如果`food`和`drink`变化了，Vue会跟着响应，从而在控制台输出我们想要的结果:
```
炸鸡汉堡快乐水
```

## 菜单响应

这里就出现第一个问题，当`food`或者`drink` 发生变化之后，`menu`并不会响应其变化。这个时候就需要我们来解决这个问题，满足`menu`响应的问题。

借鉴Vue一样，我们先把`menu`的计算方法。也写成一个函数，取名为`target`。然后每次数据`food`或者`drink`变化的时候调用`target`函数

```
    let food = "煎饼果子"
    let drink = "热豆浆"
    let menu = null
    food = '炸鸡汉堡'
    drink = '快乐水'
    let target = () => {
        menu = food + drink
    }
    food = '炸鸡汉堡2号'
    drink = '快乐水2号'
    target()
    console.log(menu) // 输出2号
```

### 浴室思考
前面一把梭直接调用的满足`menu`响应的问题，但是也间接留下一个新的疑惑点。这里针对一个菜单，就写了一个target。假设有多个菜单需要响应呢？

例如：
- `单人早餐 = 煎饼果子 + 热豆浆`  
- `豪华套餐： 煎饼果子加两鸡蛋 + 热豆浆 + 油条一根午餐` 
- ......

如果这个时候切换成：

- `单人午餐 = 炸鸡汉堡 + 快乐水`
- `豪华套餐： 双层炸鸡汉堡 + 快乐水 + 快乐薯条一包`
- ......

按照前面的逻辑, 估计得写N个target。这个时候响应式又是一个麻烦事情，可是有句话说的好。`梭哈一时爽，一直梭哈一直爽。`既然前面直接target一把梭完成，所以针对N个target方法，我直接一个for循环一把梭也能完成响应式问题。


![](https://user-gold-cdn.xitu.io/2019/5/29/16aff55d4790d613?w=100&h=100&f=png&s=19528)

### for循环一把梭

- 首先定义一个数组，每定义了一个target函数。就存储到数组当中。
```
let storge = [] // 用来存储target
function record (){  // 
  storge.push(target)
}
```
- 这个定义循环函数，每次`data`有变更。就调用这个函数，进行一把`for`循环.
```
function replay (){
  storge.forEach(run => run())
}
```
- 合并成完整的代码：
```
    let food = "煎饼果子"
    let drink = "热豆浆"
    let menu = null
    food = '炸鸡汉堡'
    drink = '快乐水'
    let target = () => {
        menu = food + drink
    }
    let storge = []; //用来存储更多的target
    function record(target) {
        storge.push(target)
    }    
    function replay() {
        storge.forEach(run => run())
    }
    record(target)
    replay()
    food = '炸鸡汉堡'
    drink = '快乐水'
    replay()
    console.log(menu)
```

最后控制台成功输出：
```
炸鸡汉堡快乐水
```

### Dep依赖类

前面一把梭实现功能，那么接下来就开始思考优化部分了。继续记录target这类的代码，这样有点怪怪的。所以为了后面方便管理，我们把代码进行简单的优化，封装成一个类：
```
    class Dep {
        constructor() {
            this.subs = []
        }
        // 收集依赖
        depend(sub) {
            if (sub && !this.subs.includes(sub)) {  // 做一个判断
                this.subs.push(sub)
            }
        }

        notify() {
            console.log("暗号：下雨啦，收衣服啦！")
            this.subs.forEach(sub => sub()) // 运行我们的target
        }
    }
```
就这样`target`函数存储在类的`subs`中，`record`也变成了`depend`，使用`notify`来代替`replay`

封装成类之后，每次当data数据更新的时候，就会发出一个暗号`下雨啦，收衣服啦！` 然后就开始遍历运行相应的`target`依赖了。

那么新的调用代码就更加清晰明了：
```
    let dep = new Dep()
    let food = "煎饼果子"
    let drink = "热豆浆"
    let menu = null
    let target = () => {
        menu = food + drink
    }
    dep.depend(target)
    target()
    console.log(menu)
    food = '炸鸡汉堡'
    drink = '快乐水'
    dep.notify()
    console.log(menu)
```
控制台输出：
```
煎饼果子热豆浆
暗号：'下雨啦，收衣服啦！'
炸鸡汉堡快乐水
```

## 观察者亮相

```
function watcher(myFun) {
  target = myFun
  dep.depend()
  target()
  target = null
}
watcher(() => {
  total = price * quantity
})
```

