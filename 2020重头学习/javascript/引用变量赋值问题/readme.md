关于引用变量赋值问题
 * 2个引用变量指向同一个变量，通过一个变量修改对象内部数据，另一个变量看到的是修改之后的数据
 * 2个引用变量指向同一个变量，让其中一个引用变量指向另一个对象，另一个引用变量依然指向前一个对象

var obj1 = {name:'Tom'}
var obj2 = obj1
obj2.name = 12
console.log(obj1.name) // 12

function fn (obj) {
    obj.name = 'A'
}
fn(obj1)
console.log(obj2.name) // 'A'

-------------------------------------

var a = {age:12}
var b = a
a = {name: 'BOB', age: 13}
b.age = 14
console.log(b.age, a.name, a.age)  // 14, BOB, 13

function fn2 (obj) {
    obj = {age: 15}
}
fn2(a)
console.log(a.age) // 13

------------------------------------
在js调用函数时传递变量参数时，是值传递还是引用传递
 * 理解1：都是值（基本/地址值）传递
 * 理解2：可能是值传递，也可能是引用传递（地址值）


var a = 3
function fn (a) {
    a = a + 1
}

fn(a)

console.log(a)   // 3

function fn2 (obj) {
    console.log(obj.name)
}
var obj = {name: 'Tom'}
fn2(obj) // Tom