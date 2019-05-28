# [切图仔救赎]炒冷饭--在线手撸vue2响应式原理

## 背景
作为切图仔搬砖汪，长期切图jq一把梭。重复繁琐的切图，让自己陷入了一个无限的围城。想出去切图这个围城看一看，但是又害怕因为切图时间久了，自己会的也只有切图了。

所以为了恰饭，帮助自己跳出切图仔的围城。强行立了一个`flag`，也来啃一啃vue2的源码。（毕竟Vue3马上出了，再晚点可能冷饭都没得炒了。）所以简单flag的第一道菜：炒冷饭。

希望能够对于Vue2有一个简单的认识，迈出flag的第一步。

## 响应的Vue
当切图仔的我第一次看到Vue工作时，词穷的我当时第一反应就是`牛皮`。下面以这个简单的Vue应用程序为例：

```
<div id="app">
  <div>Price: ${{ price}}</div>
  <div>Total: ${{ price * quantity }}</div>
  <div>Taxes: ${{ totalPriceWithTax}}</div>
</div>
<script>
  let vue = new Vue({
    el: '#app',
    data: {
      price: 5.00,
      quantity: 2
    },
    computed: {
      totalPriceWithTax() {
        return  this.price * this.quantity * 1.03
      }
    }
  })
</script>

```
当data数据变化之后，vue会做出相应的变化：
+ 通知eta方法，食物和饮料变更，所以关于今天的菜单需要变化，然后返回新的值，
当price发生变化后，Vue会做三件事：

在页面上更新price的值。

重新计算price * quantity的值，并更新页面。

再次调用totalPriceWithTax，并更新页面。

不过这并不重要，重要的是当price变化时，Vue怎么知道该更新什么，以及它是如何跟踪所有内容的？

通常的JavaScript代码是实现不了这样的功能的。那么我们看下边的代码：
