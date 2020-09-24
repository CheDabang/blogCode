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