# LeetCode笔记详解

主要是记录一下leetcode解题过程一些解题想法和思路

## 宝石与石头 （类型： 简单）
 给定字符串J 代表石头中宝石的类型，和字符串 S代表你拥有的石头。 S 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。

J 中的字母不重复，J 和 S中的所有字符都是字母。字母区分大小写，因此"a"和"A"是不同类型的石头。

**示例：**
```
输入: J = "aA", S = "aAAbbbb"
输出: 3
```

**注意:**
- S 和 J 最多含有50个字母。
- J 中的字符不重复。
  
**答案**
```
var numJewelsInStones = function(J, S) {
    let SArr =  S.split("");
    let count = 0;
    for(let i = 0; i < SArr.length; i++) {
        if(J.indexOf(SArr[i]) > -1) count ++;
    }
    return count;
};
```

**解题思路：**
其实就是判断两边字符串某一个字符是否有有相等的，有相等count++。一直累加查找
我这边采取的是分割右边的字符串成数字，然后用遍历数组。每次拿右边`S[i]`去和匹配是否有满足相等的。

当然网友还有其他思路：
```
 var numJewelsInStones2 = function (J, S) {
    let jarr = J.split("");
    let sarr = S.split("");
    return sarr.filter((item) => jarr.includes(item)).length;
  };   
```
他是把两个字符串都分割成数组，然后再按照数组方法去操作查找匹配

## 数组异或操作(简单)
给你两个整数，n 和 start 
数组 nums 定义为：nums[i] = start + 2*i（下标从 0 开始）且 n == nums.length 
请返回 nums 中所有元素按位异或（XOR）后得到的结果

**示例 1：**
```
输入：n = 5, start = 0
输出：8
解释：数组 nums 为 [0, 2, 4, 6, 8]，其中 (0 ^ 2 ^ 4 ^ 6 ^ 8) = 8 。
     "^" 为按位异或 XOR 运算符。
```

**示例 2：**
```
输入：n = 4, start = 3
输出：8
解释：数组 nums 为 [3, 5, 7, 9]，其中 (3 ^ 5 ^ 7 ^ 9) = 8.
```

**提示:**
- 1 <= n <= 1000
- 0 <= start <= 1000
- n == nums.length

**答案**
```
var xorOperation = function(n, start) {
    let val = 0;
    for(let i = 0; i < n; i++) {
        val = val ^ (start + 2 * i)
    }
    return val;
};
```
**解题思路**
其实写代码解题没有花多少时间，主要读懂题目要求倒是花了一点时间。
其实就是可以理解相当于累加器的操作

## 左旋转字符串(简单)
字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

**示例1:**
```
输入: s = "abcdefg", k = 2
输出: "cdefgab"
```

**示例 2：**
```
输入: s = "lrloseumgh", k = 6
输出: "umghlrlose"
```

**限制：**
- 1 <= k < s.length <= 10000

**答案**
```
var reverseLeftWords = function(s, n) {
    let l = s.slice(0, n);
    let r = s.slice(n);
    let newS = r + l
    return newS;
};
```
**解题思路**
这里其实考的是对字符串截取的应用，比如`slice`、`substr`、`substring`三个语法的引用，当然应该还考察字符串合并`concat`我比较懒，直接上字符串拼接了。

当然还有简化代码结构的代码，相当于简化我的代码：
```
var reverseLeftWords = function(s, n) {
    return s.slice(n) + s.slice(0, n) ;
};
```

## 重新排列数组(简单)

给你一个数组 nums ，数组中有 2n 个元素，按 `[x1,x2,...,xn,y1,y2,...,yn]` 的格式排列。

请你将数组按 `[x1,y1,x2,y2,...,xn,yn]` 格式重新排列，返回重排后的数组。

**示例 1：**
```
输入：nums = [2,5,1,3,4,7], n = 3
输出：[2,3,5,4,1,7] 
解释：由于 x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 ，所以答案为 [2,3,5,4,1,7]
```
**示例 2：**
```
输入：nums = [1,2,3,4,4,3,2,1], n = 4
输出：[1,4,2,3,3,2,4,1]
```
**示例 3：**
```
输入：nums = [1,1,2,2], n = 2
输出：[1,2,1,2]
```

**提示：**
- `1 <= n <= 500`
- `nums.length == 2n`
- `1 <= nums[i] <= 10^3`

**答案**
```
var shuffle = function(nums, n) {
    let newArr = []
    for(let i = 0; i < n; i++) {
        newArr.push(nums[i], nums[n + i])
    }
    return newArr
};
```

**解题思路**

其实就相当于将一个2n的数组，先中间对半分成两个数组。然后依次按照左1右1左2右2...的格式合并成一个新的数组. 


## 拥有最多糖果的孩子(简单)

给你一个数组 candies 和一个整数 extraCandies ，其中 candies[i] 代表第 i 个孩子拥有的糖果数目。

对每一个孩子，检查是否存在一种方案，将额外的 extraCandies 个糖果分配给孩子们之后，此孩子有 最多 的糖果。注意，允许有多个孩子同时拥有 最多 的糖果数目。


**示例 1：**
```
输入：candies = [2,3,5,1,3], extraCandies = 3
输出：[true,true,true,false,true] 
解释：
孩子 1 有 2 个糖果，如果他得到所有额外的糖果（3个），那么他总共有 5 个糖果，他将成为拥有最多糖果的孩子。
孩子 2 有 3 个糖果，如果他得到至少 2 个额外糖果，那么他将成为拥有最多糖果的孩子。
孩子 3 有 5 个糖果，他已经是拥有最多糖果的孩子。
孩子 4 有 1 个糖果，即使他得到所有额外的糖果，他也只有 4 个糖果，无法成为拥有糖果最多的孩子。
孩子 5 有 3 个糖果，如果他得到至少 2 个额外糖果，那么他将成为拥有最多糖果的孩子。

```

**提示：**

- `2 <= candies.length <= 100`
- `1 <= candies[i] <= 100`
- `1 <= extraCandies <= 50`

**答案:**
```
var kidsWithCandies = function(candies, extraCandies) {
    let result = [];
    let max = 0;
    for(let i = 0; i < candies.length; i++) {
        if(candies[i] > max) max = candies[i]
    }
    for(let i = 0; i < candies.length; i++) {
        candies[i] + extraCandies >= max ? result[i] = true : result[i] = false
    }
    return result;
};
```

**解题思路**
这题重点第一步就是要找到当前拥有最多糖果额孩子，然后把他作为最大基准值。 之后就是循环与累加，满足单个或者多个拥有糖果最大的数目。
因此我这里用两个for循环，一个是用来找最大值，第二个就是遍历匹配然后满足就累加。
当然也有对更简要的代码，主要是对新的前端新的内置语法为条件去做的。
```
var kidsWithCandies = function(candies, extraCandies) {
    let maxNum = Math.max(...candies);
    return candies.map(num => num + extraCandies >= maxNum);
};
```
Math.max代替我第一个for循环，然后`map`函数代替我第二个for循环。

## 好数对的数目(简单)
给你一个整数数组 nums 。

如果一组数字 (i,j) 满足 nums[i] == nums[j] 且 i < j ，就可以认为这是一组 好数对 

返回好数对的数目。

**示例 1：**
```
输入：nums = [1,2,3,1,1,3]
输出：4
解释：有 4 组好数对，分别是 (0,3), (0,4), (3,4), (2,5) ，下标从 0 开始
```
**示例 2：**
```
输入：nums = [1,1,1,1]
输出：6
解释：数组中的每组数字都是好数对
```
**示例 3：**
```
输入：nums = [1,2,3]
输出：0
```

**提示：**

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

**答案:**
```
var numIdenticalPairs = function(nums) {
    let count = 0;
    for(let i = 0; i < nums.length; i++) {
        for(let j = i+1; j < nums.length; j++) {
            if(nums[i] === nums[j]) {
                count++;
            }
        }
    }
    return count;
};
```

**解题思路:**
我当时一看到这道题，就想到的是循环匹配，第一位和剩下的全匹配一遍。之后第二位匹配次数递减。
当然还有一种思路，就是所谓的**双游标**，然后将上文中的两个嵌套for循环变成一个for循环
```
var numIdenticalPairs = function(nums) {
    if (!nums.length) return 0
    let count = 0
    let j = 0
    for (let i = 0; i < nums.length; j++) {
        if (j === nums.length) i++, j = 0
        i < j && nums[j] === nums[i] && count++
    }
    return count
}

```

## LCP 01猜数字(简单)
小A 和 小B 在玩猜数字。小B 每次从 1, 2, 3 中随机选择一个，小A 每次也从 1, 2, 3 中选择一个猜。他们一共进行三次这个游戏，请返回 小A 猜对了几次？

输入的guess数组为 小A 每次的猜测，answer数组为 小B 每次的选择。guess和answer的长度都等于3。

**示例 1：**
```
输入：guess = [1,2,3], answer = [1,2,3]
输出：3
解释：小A 每次都猜对了。
```

**示例 2：**
```
输入：guess = [2,2,3], answer = [3,2,1]
输出：1
解释：小A 只猜对了第二次。
```

**限制：**
```
guess的长度 = 3
answer的长度 = 3
guess的元素取值为 {1, 2, 3} 之一。
answer的元素取值为 {1, 2, 3} 之一。
```
**答案:**
```
var game = function(guess, answer) {
    let count = 0;
    for(let i = 0; i < answer.length; i++) {
        if(answer[i] === guess[i]) count++;
    }
    return count;
};
```

**解题思路**
其实考的对于数组的遍历匹配处理，我这边默认想到的for循环去解决。
然后其实借鉴语法糖`filter`可以简化相关操作步骤：
```
var game = function(guess, answer) {
    return answer.filter((cur, i) => cur === guess[i]).length;
};
```

## 一堆数组的动态和(简单)
给你一个数组 nums 。数组「动态和」的计算公式为：runningSum[i] = sum(nums[0]…nums[i]) 。

请返回 nums 的动态和。

**示例 1：**

输入：nums = [1,2,3,4]
输出：[1,3,6,10]
解释：动态和计算过程为 [1, 1+2, 1+2+3, 1+2+3+4] 。

**示例 2：**

输入：nums = [1,1,1,1,1]
输出：[1,2,3,4,5]
解释：动态和计算过程为 [1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1] 。

**示例 3：**

输入：nums = [3,1,2,10,1]
输出：[3,4,6,16,17]
 

**提示：**

1 <= nums.length <= 1000
-10^6 <= nums[i] <= 10^6

**答案**
```
var runningSum = function(nums) {
   let newArr = [0];
    for (let i = 0; i < nums.length; i++) {
      newArr.push(newArr[i] + nums[i]);
    }
    newArr.shift();
    return newArr;
};

```
**解题思路**
原理其实就是创建一个数组长度为1的数组，之后每次遍历吧最新的值push到里面，最后再对数组进行相关处理。
当然后面还有一种思路：就是直接获得累计值之后，直接去替换原先的累加值
```
var runningSum = function(nums) {
    for (let i = 1; i < nums.length; i++) {
       nums[i] = nums[i - 1] + nums[i]
    }
    return nums;
};
```

## 区域和检索 - 数组不可变（简单）

给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。

**示例：**

给定 nums = [-2, 0, 3, -5, 2, -1]，求和函数为 sumRange()

sumRange(0, 2) -> 1
sumRange(2, 5) -> -1
sumRange(0, 5) -> -3

**说明:**

- 你可以假设数组不可变。
- 会多次调用 sumRange 方法。

**答案**
```
var NumArray = function(nums) {
    let dp = [0];
    for(let i = 0; i<nums.length; i++) {
        dp.push(dp[i]+nums[i]);
    }
    this.re = dp;
};

NumArray.prototype.sumRange = function(i, j) {
    let re = this.re;
    return re[j + 1]-re[i];
};

```

**解题思路**
这题最开始我想到是暴力循环遍历法，结果解答出来的时间总是非常慢。去看了别人解决思路，一下豁然开朗。
因此此题说明的第二点提到过，会多次调用sumRange方法。 所以暴力解题法会非常慢，因此这里的思路就累加，这样就得到0 -> N区间的范围值。

之后再用 `0 - j`范围值 - `0 - i` ， 通俗点就是取数值上整个大范围值 - 小范围值就可以得到想要的范围值， 不需要每次调用的时候，每次暴力求解。


## 1588. 所有奇数长度子数组的和
给你一个正整数数组 arr ，请你计算所有可能的奇数长度子数组的和。

子数组 定义为原数组中的一个连续子序列。

请你返回 arr 中 所有奇数长度子数组的和 。

**示例 1：**

输入：arr = [1,4,2,5,3]
输出：58
解释：所有奇数长度子数组和它们的和为：
[1] = 1
[4] = 4
[2] = 2
[5] = 5
[3] = 3
[1,4,2] = 7
[4,2,5] = 11
[2,5,3] = 10
[1,4,2,5,3] = 15
我们将所有值求和得到 1 + 4 + 2 + 5 + 3 + 7 + 11 + 10 + 15 = 58

**示例 2：**

输入：arr = [1,2]
输出：3
解释：总共只有 2 个长度为奇数的子数组，[1] 和 [2]。它们的和为 3 。

**示例 3：**

输入：arr = [10,11,12]
输出：66

**提示：**

- 1 <= arr.length <= 100
- 1 <= arr[i] <= 1000

**答案**
```
var sumOddLengthSubarrays = function(arr) {
    let count = 0;
   for (let i = 1; i <= arr.length; i += 2) { 
        for (let j = 0; j + i <= arr.length; j++) {
            count += arr.slice(j,j + i).reduce((acc, cur) => acc + cur)
        }
    }
    return count;
};
```

**解题思路**
其实最主要的坑是好好读题，要去理解这道数学题。 审题花了不少的功夫, 读懂题之后，找到规律之后for循环遍历就可以了。
其实就是针对这个长度的数组，一次递增截取某一端奇数范围的值，作为满足的条件，然后依次累加.

## 编号1. 两数之和 （简单）
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

 

**示例:**

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]


**解题思路1：**


```
var twoSum = function(nums, target) {
  const arr = [];
    for (let i = 0; i < nums.length; i++) {
      let firstVal = nums[i];
      let firstIndex = i;
      for (let j = i + 1; j < nums.length; j++) {
        let secondVal = nums[j];
        let secondIndex = j;
        if (firstVal + secondVal === target) {
          arr[0] = firstIndex;
          arr[1] = secondIndex;
          return arr;
        }
      }
    }
};

```
此题解法很粗暴，暴力递归匹配法。 就是性能消耗比较高

**解题思路2：**

```
var twoSum = function(nums, target) {
    const prevNums = {};                    
    for (let i = 0; i < nums.length; i++) { 
        const curNum = nums[i];               
        const targetNum = target - curNum;   
        const targetNumIndex = prevNums[targetNum]; 
        if (targetNumIndex !== undefined) {   
            return [targetNumIndex, i];
        } else {                              
            prevNums[curNum] = i;               
        }
    }
};
```

后面发现别人的一种解法， 利用对象的特性存储以前匹配检查的值和索引，避免的嵌套for循环匹配，从性能上来说方法2的性能要于前者。

## 编号7. 整数反转(简单)
给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

**示例 1:**

输入: 123
输出: 321

**示例 2:**

输入: -123
输出: -321

**示例 3:**

输入: 120
输出: 21

**注意:**

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

**解题思路1**
```
var reverse = function (x) {
    let xStr = x + "";
    let sign = Math.sign(x)
    reX = parseFloat(xStr.split("").reverse().join("")) * sign;
    if (reX > Math.pow(2, 31) - 1 || reX < Math.pow(2, 31) * -1) reX = 0
    return reX;
  };
```
比较粗暴的方法，直接转换成字符串，然后利用数组的reverse的方法，反转数组。之后在转换成数字。
其中`Math.sign`用来保留正负值，因为不保留正负值，例如`-123`, 最后反转字符串的时候会变成`321-`,从而导致后面`parseFloat`的时候，会变成`321`, 最后转换失败。

`Math.sign`类似前面判断正负值时候，从而留有正负值单位，正无视，负则后续添加上去。

**解题思路2**
```
var reverse = function(x) {
    let result = 0;
    while(x !== 0) {
        result = result * 10 + x % 10;
        x = (x / 10) | 0;
    }
    return (result | 0) === result ? result : 0;
};
```

这个一看就是数学大佬的视频，这边先膜拜一下。

这里我们拿数字12345，做一个基本的分解。
1. 将12345 % 10 得到5，之后将12345 / 10
2. 将1234 % 10 得到4，再将1234 / 10
3. 将123 % 10 得到3，再将123 / 10
4. 将12 % 10 得到2，再将12 / 10
5. 将1 % 10 得到1，再将1 / 10
   

- result * 10 + x % 10 取出末位 x % 10（负数结果还是负数，无需关心正负），拼接到 result 中。
- x / 10 去除末位，| 0 强制转换为32位有符号整数。
- 通过 | 0 取整，无论正负，只移除小数点部分（正数向下取整，负数向上取整）。
- result | 0 超过32位的整数转换结果不等于自身，可用作溢出判断。



## 编号9 回文数
判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

**示例 1:**

输入: 121
输出: true
示例 2:

**输入: -121**
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
示例 3:

**输入: 10**
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。

**进阶:**

你能不将整数转为字符串来解决这个问题吗？

**解题思路**
这道题还特意加了一个进阶，让你不要用转字符串取巧的方式去做，而是尝试数学分解。 还好看过之前`数学反转`解题思路， 稍微修改一下就OK了:
```
var isPalindrome = function(x) {
    let num = x;
    if(x < 0) return false;
    if(x === 0) return true;
    let result = 0;
    while(num > 0) {
        result = result * 10 + num % 10
        num = parseInt(num / 10)
    }
    return result === x ? true : false;
};
```

## 编号13. 罗马数字转整数
罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。

字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。

 

**示例 1:**

输入: "III"
输出: 3

**示例 2:**

输入: "IV"
输出: 4

**示例 3:**

输入: "IX"
输出: 9

**示例 4:**

输入: "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.

**示例 5:**

输入: "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.
 

**提示：**

> 题目所给测试用例皆符合罗马数字书写规则，不会出现跨位等情况。
> IC 和 IM 这样的例子并不符合题目要求，49 应该写作 XLIX，999 应该写作 CMXCIX 。
> 关于罗马数字的详尽书写规则，可以参考 罗马数字 - Mathematics 。

**解题思路**
```
var romanToInt = function(s) {
    let sArr = s.split("");
    let result = 0;
    let numObj = {"I":1, "V":5, "X":10, "L":50, "C":100, "D":500, "M":1000}
    for(let i = 0; i < sArr.length; i++) {
        let num = numObj[sArr[i]];
        if(i !== sArr.length - 1 && num < numObj[sArr[i + 1]]) num = num * -1;
        result += num;
    }
    return result;
};
```
这题主要大致思路就是拆解字符串，然后根据字符串匹配去换算值. 

## 编号14. 最长公共前缀
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

**示例 1:**

输入: ["flower","flow","flight"]
输出: "fl"

**示例 2:**

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
说明:

**所有输入只包含小写字母 a-z 。**

**解题思路**
```
  var longestCommonPrefix = function (strs) {
    if (strs.length < 1) return "";
    let str = "";
    for (let i = 0; i < strs[0].length; i++) {
      let match = strs[0].slice(i, i + 1);
      let bool = strs.every((str) => {
        if(i > str.length ) return false;
        return str.slice(i, i + 1) === match;
      });
      if (bool) {
        str += match;
      } else {
        break;
      }
    }
    return str
  };
```
这题的思路，其实就是拿数组的第一个值作为样本值。之后利用数组`every`方法拿每一个元素和样本字母去匹配。
我之前以为觉得需要找出最长的字符串或者最短的字符串，后面发现根本不需要找。直接随便取数组一个，只要后面循环遍历，一旦某个值索引超出长度，直接返回`false`,后面就不需要再循环遍历匹配了，直接结束。

还有一个坑： 题目提示的时候，说`所有输入只包含小写字母 a-z`. 我就把某些情况忽略了，结果提交测试的时候发现，`[]`,`[""]`这些条件还会加入测试.加一些过滤条件即可.

## 编号20. 有效的括号
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。
- 注意空字符串可被认为是有效字符串。

**示例 1:**

输入: "()"
输出: true

**示例 2:**

输入: "()[]{}"
输出: true

**示例 3:**

输入: "(]"
输出: false

**示例 4:**

输入: "([)]"
输出: false

**示例 5:**

输入: "{[]}"
输出: true

**解题思路**

```
var isValid = function(s) {
    if(s.length % 2 !== 0) return false;
    const arry = new Map([
      ["}", "{"],
      ["]", "["],
      [")", "("],
    ]);
    var stk = [];
    s.split("").every((ch) => {
      if (arry.has(ch)) {
        if (!stk.length || stk[stk.length - 1] !== arry.get(ch)) {  // 处理类似"{[}]"相关情况
          if(!stk.length) {  // 处理"){"这种情况
              stk.push(ch)
          }
          return false;
        }
        stk.pop();
        return true;
      } else {
        stk.push(ch);
        return true;
      }
    });
    return !stk.length;
};
```
这题当初我做了好久，做了几次都挂了。 后面参考官方案例，结果官方案例也是错的，后面在官方案例的基础上几番折腾测试成功.
大致思路如下:
- 第一步过滤数量为单数的括号单位
- 然后利用map方法的创建可以快速查找的二维数组，以结尾符作为Key，开始符作为value.
- 创建一个空数组，当遍历匹配的时候，当发现是开头值value，则push到stk这个数组中，匹配到是结尾符key值得时候。则与stk数组的进行匹配抵消。之后一轮结束之后就对于剩下情况进行判断了
- 之后中间的if则是相关各种环节的判断。