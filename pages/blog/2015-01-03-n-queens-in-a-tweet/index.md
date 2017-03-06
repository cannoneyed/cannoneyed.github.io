---
title: N queens in a tweet
date: 01/03/2015
description: "A lot of power in a little bit of space"
---


One of the most interesting sprints of the first two weeks at Hack Reactor involved the famous n-queens problem: given a chessboard of size n x n, how many ways can you arrange n queens on the boards such that no queen is threatened by another?

My partner [Zachary Lopez](https://github.com/zdlopez "github") and I created a few different algorithms to approach this problem, ultimately implementing a bitwise solution described [here](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.51.7113&rep=rep1&type=pdf "Backtracking Algorithms in MCPL using Bit Patterns and Recursion"). The bitwise algorithm represented a nearly twenty-fold increase in efficiency over our algorithm. Searching to eke out even more speed, we set up a system of web workers with [parallel.js](http://adambom.github.io/parallel.js/ "parallel.js") to split processing onto multiple cores of our machine, and, of course, minified our algorithm to fit into a tweet.



```javascript
function q(n){x=0,a=(1<<n)-1;
function i(l,c,r){if(c==a)x++;
var p=~(l|c|r)&a,b;
for(;p;p-=b){b=p&-p;i((l|b)<<1,c|b,(r|b)>>1)}}i();
return x}
```

*137 characters without newlines added for clarity*
