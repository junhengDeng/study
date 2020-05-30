function clone(source) {
    let res = {};
    for (var i in source) {
        if (source.hasOwnProperty(i)) {
            if (typeof source[i] === 'object') {
                res[i] = clone(source[i])
            } else {
                res[i] = source[i]
            }
        }
    }
    return res
}

function cloneJSON(k) {
    return JSON.parse(JSON.stringify(k))
}

function cloneLoop(k) {
    const root = {}

    const loopList = [{
        parent: root,
        key: undefined,
        data: k
    }]

    while(loopList.length) {
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        let temp = parent;
        
        if (typeof key !== 'undefined') {
            temp = parent[key] = {}
        }

        for (let i in data) {
            if (data.hasOwnProperty(i)) {
                if (isObject(data[i])) {
                    loopList.push({
                        parent: temp,
                        key: i,
                        data: data[i]
                    })
                } else {
                    temp[i] = data[i]
                }
            }
        }
    }
    return root
}

function find(list, data) {
    let res = null;
    list.some(it => {
        if (it.source === data) {
            res = it
            return ture
        }
        return false
    })

    return res
}

function cloneForce(k) {
    const root = {}
    const uniqueList = [];

    const loopList = [{
        parent: root,
        key: undefined,
        data: k
    }]

    while (loopList.length) {
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        let temp = parent;
        if (typeof key !== 'undefined') {
            temp = parent[key] = {}
        }

        let uniqueData = find(uniqueList, data)
        if (uniqueData) {
            temp = uniqueData.target
            break;
        }
 
        uniqueList.push({
            source: data,
            target: temp
        })

        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                if (isObject(data[i])) {
                    loopList.push({
                        parent: temp,
                        key: i,
                        data: data[i]
                    })
                } else {
                    temp[i] = data[i]
                }
            }
        }
    }

    return root;
}


function createData(deep, breadth) {
    let temp = root = {};

    deep.map(() => {
        temp = temp['data'] = {}
        breadth.map((it, idx) => {
            temp[idx] = idx
        })
    })

    return root;
}

// 综合测试题

function Foo(){
    getName = function(){
	    console.log(1);
	}
    return this;
}
Foo.getName = function(){
   console.log(2)
}

Foo.prototype.getName = function(){
   console.log(3)
}

var getName = function(){ 
   console.log(4)
}
function getName(){
   console.log(5)
}

Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3


// 比较符优先问题
() 原括号最屌
. [] () 属性调用 函数调用
++ -- new typeof 一元运算符 new
* / + - + 乘除加减 拼接
<< <<< >> >>> 移位在中间
< <= > >= == != === !== 比较符从小到大 不全等到全等
&& || ?: 逻辑与 逻辑或 条件
= 赋值最垃圾




// Array

new Array()
new Array(size)
new Array(element0,....)
constructor
length
prototype

concat
join

push
pop
unshift
shift

reverse

slice(start, end)
splice(start, length, new)

sort() a<b  a>b

toString()
valueOf()
toSource()
toLocalString()

// Date
Date() 和 new Date() 两者输出是一样的，只是Date()少了很多方法

getFullYears()
getMonth()
getDate()   返回前面时间对象的几号
getDay()  返回周几
getHours()
getMintues()
getSeconds()
getMillseconds()
getTime()
getTimezoneOffset() 返回格林威治时间与前面时间对象的时差， 分钟为单位

getUTC...

timeObject.setTime()
timeObject.setFullsYear()
...

// Math
Math.max()
Math.min()
Math.ceil() 向上取整
Math.floor() 向下取整
Math.round() 四舍五入，取整数
Math.random() 0-1 随机数
Math.pow(x,y) x的y次幂

// String
var str = 'hello world'
constructor
length
prototype

str.concat() 拼接

str.charAt() 返回第几下标的字符串
str.charCodeAt() 返回第几下标字符串的unicode码

str.slice(start, end)  start, end可以负数 
str.substring(start, end)   start, end 不能为负数

str.match(sub/reg) 匹配多个或一个关键在g,返回一个时，返回数组，并返回index,input，没找到返回null
str.replace(sub.reg, replacevalue) 替换多个关键在于g  

str.indexOf(sub, fromIndex) 只检索字符串，从formIndex开始检索，fromIndex只能是0至length-1，只检测一个
str.lastIndexOf(sub, fromIndex) 从后检索，只检测一个
str.search(reg) 只检索正则，只检测一个

str.split(sub/reg, howmany) howmany,数组的长度


Math.ceil(x)
Math.floor(x)
Math.round(x)
Number.prototype.toFixed(num)
parseFloat(num)
parseInt(num)


// Array
concat

join

slice(start, end)
splice(start, length, newElement)

length

sort

push
pop
unshift
shift

reverse

// Boolean
Boolean()

// Date
new Date()
Date()

getDate()
getDay()
getFullYear()
getMonth()
getHours()
getMinutes()
getSeconds()
getMillSeconds()
getTime() Date.parse()
getTimezoneOffset()

getUTCFullYear()
....

setDate

getUTC

// Math
Math.ceil()
Math.floor()
Math.round()
Math.random()
Math.min()
Math.max()
Math.pow(x, y)

// Number
Number.prototype.toFixed(num) 0-20

// String
charAt()
charCodeAt()

concat()
split()

search()
indexOf()
lastIndexOf()

slice()
substring()
substr()

toUpperCase()
toLowerCase()

match()
replace()

// Function
decodeURI
decodeURIComponent
encodeURI
encodeURIComponent
escape()
unescape()
Number()
parseInt()
parseFloor()



// ES5
// Array
every
some
forEach
filter
indexOf
lastIndexOf
isArray
map
reduce
reduceRight

// Object
getPrototypeOf
create
getOwnPropertyNamme
defineProperty
getOwnPropertyDescriptor
defineProperties
keys
preventExtensions/ isExtensible
seal isSealed
freeze isFrozen

// Array
join
concat

reverse

slice
splice

push
pop
unshift
shift

length

sort

map
forEach
reduce
reduceRight
some
every
filter

indexOf
lastIndexOf

isArray

// Object
getOwnPropertyDescriptor
getOwnPropertyNames
defineProperty
defineProperties
preventExtensions
isPreventExtensible
seal
isSealed
freeze
isFrozen