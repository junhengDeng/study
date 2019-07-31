# Node.js

1.require()

```
require.context(directory, useSubdirectories = false, regExp = /^\.\//)
```

这个方法有 3 个参数：

- 要搜索的文件夹目录
- 是否还应该搜索它的子目录，
- 以及一个匹配文件的正则表达式。

### context module API 

一个 context module 会导出一个（require）函数，此函数可以接收一个参数：request。

此导出函数有三个属性：`resolve`, `keys`, `id`。

- `resolve` 是一个函数，它返回 request 被解析后得到的模块 id。
- `keys` 也是一个函数，它返回一个数组，由所有可能被此 context module 处理的请求（译者注：参考下面第二段代码中的 key）组成。

如果想引入一个文件夹下面的所有文件，或者引入能匹配一个正则表达式的所有文件，这个功能就会很有帮助，例如：

```javascript
function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('../components/', true, /\.js$/));	//Moduls[]
var cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}
cache = {
    module1的相对路径: module1,
    ...
}

importAll(require.context('../components/', true, /\.js$/));
// 在构建时(build-time)，所有被 require 的模块都会被填充到 cache 对象中。
const req = requrie.context('...', false, /\.vue$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
console.log(requireAll(req)) // -> Modules[...]
console.log(req)	
/*
	function requireContext (req) {
        var id = webpackContextResolve(req)
        return __webpack_require__(id)
    }
*/
```

- `id` 是 context module 里面所包含的模块 id. 它可能在你使用 `module.hot.accept` 时会用到。

require.context() 返回一个函数,并且带有三个属性

```
const files = require.context(...)

let configRouters = []
files.keys().forEach(key => {
	configRouters = configRouters.concat(files(key).default)	//读取出文件中default
})

console.dif(files)
console.log('keys', files.keys())
console.log('id', files.id)
console.log('resolve', files.resolve(files.keys()[0]))	//返回文件的相对路径
console.log('module', files(files.keys()[0]) //返回文件的输出

```

2.npm install -s 和 npm install -d的区别

npm install -s   // npm install --save

npm install -d   // npm install --save-dev

Dependencies是“依赖，附属”的意思    ， dev指的是“开发”

dev会写在devDependencies, 安装的插件只用于开发环境，不可用于生产环境

save会写在Dependencies，需要发布在生产环境

