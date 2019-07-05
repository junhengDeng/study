# ES6

### 一.import

import 命令在javasript引擎静态解析中,先于模块内的其他模块先执行

所以下面的例子会报错

```js
if (judge) {
    import module from 'module.js'
}
```

import 和 export只能在代码顶层,不能在代码块中.

require是运行时加载模块,import命令无法取代require的动态加载功能

const module = require('module.js')

ES6用import()解决

```js
import(path).then((module) => {
	//...
})
```

1.按需加载(事件后加载)

2.条件加载(if)

3.动态路径(path)

4.

```js
Promise.all([
    import('module1.js'),
    //...
]).then([module1,...]=> {})

async function main() {
	const module = await import('module.js')
	const {export1, export2} = await import('module.js')
	const [module1, module2, module3] = await Promise.all([
        import('module1.js), 
        import('module2.js), 
        import('module3.js), 
	])
}
```

### 二.reduce

```js
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
arr.reduce(callback(计数器, 当前值[, 索引[, 原数组]])[, 需要注入的计数器])
```

`callback`
执行数组中每个值的函数，包含四个参数：
`accumulator`
累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）。

`currentValue`
数组中正在处理的元素。
`currentIndex`可选
数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则为1。
`array`可选
调用reduce()的数组
`initialValue`可选
作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

> 里面一定要return

### 三.concat

concat会返回新数组

### 四.Proxy