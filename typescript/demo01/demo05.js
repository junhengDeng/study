"use strict";
// 函数声明法
function add(n1, n2) { return n1 + n2; }
console.log(add(1, 2));
// 函数表达式法
// 将函数赋值给一个变量，变量名就是函数名。
// 定义之后，必须调用函数
// 匿名函数
var add1 = function (n1, n2) { return n1 + n2; };
console.log(add1(1, 2));
// 箭头函数
// typescript 完全支持es6
var add3 = function (n1, n2) { return n1 + n2; };
console.log(add3(1, 2));
