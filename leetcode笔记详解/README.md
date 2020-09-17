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

## 拥有最多糖果的孩子
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

**答案**
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