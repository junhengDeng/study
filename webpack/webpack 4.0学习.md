webpack 4.0学习

1.先进入文件夹, npm init -y

2.npm  i webpack webpack-cli --save-dev

3.在package.json 

```
"scripts": {
	...
	"dev": "webpack --mode development",
	"build": "webpack --mode production"
}
```

4.建立webpack.config.js

```
module.exports = {
  entry: {},  //入口起点，指示webpack应用使用哪个模块 支持String|Array|Object
  output: {}, //出口，告诉 webpack 在哪里输出它所创建的 bundles，以及命名文件default: './dist'
  module: {}, //loader插件，处理一些非javascript代码，转化为可用的代码
  plugins: [], //webpack相关插件
  resolve: {}, //用于帮助找到模块的绝对路径。一个模块可以作为另一个模块的依赖模块，然后被后者引用
  devServer: {},//通过node起一个本地服务器，webpack-dev-server完成一些代理，mock数据热加载等功能
  devtool: '',//此选项控制是否生成，以及如何生成 source map。主要用于开发和生产代码类型
  mode: '', //模式 
  optimization: {}//优化生成的文件，如合并commonsChunks等 
}
```

5.解析css需要在module            引入style-loader,css-loader

```
rules: [
    {
        test: /\.css/,
        use: [
            style-loader,
            css-loader
        ]
    }
]
```

6.解析html需要plugins 引入html-webpack-plugin 生成html

```
plugins: [
    new HtmlWebpackPlugin({
        title: '',	//HTML文档标题
        filename: ''
    })
]
```

https://github.com/jantimon/html-webpack-plugin#options

6.支持转义 ES6/ES7/JSX

https://juejin.im/post/5c947c3b6fb9a070f1257f7a#heading-12







概念

入口(entry): 

​	用法: entry: string|Array<string>

```
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  }
};
```

> *在 webpack < 4 的版本中，通常将 vendor 作为单独的入口起点添加到 entry 选项中，以将其编译为单独的文件（与* `CommonsChunkPlugin` *结合使用）。而在 webpack 4 中不鼓励这样做。而是使用* `optimization.splitChunks` *选项，将 vendor 和 app(应用程序) 模块分开，并为其创建一个单独的文件。***不要** *为 vendor 或其他不是执行起点创建 entry。*

输出(output): 

​	最低要求是，将它的值设置为一个对象，包括以下属性:

- ​	`filename`用于输出文件的文件名

  ​	多个入口起点

  ​	使用占位符来确保每个文件具有唯一的名称

  ```
  module.exports = {
    entry: {
      app: './src/app.js',
      search: './src/search.js'
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist'
    }
  };
  // 写入到硬盘：./dist/app.js, ./dist/search.js
  ```

  

​		path: path.resolve(__dirname, 'dist')  `path`是node.js核心模块

​		const path = require('path')

loader:

​	webpack只能够理解js和json文件,loader能处理其他文件,将其转换为有效模块

​	例如:

​		style css image svg 

​	rules属性:必须有两个属性,use,test

​	

```
rules: {
    test: /\.svg$/,
    use: ''
}
```

“嘿，webpack 编译器，当你碰到「在 `require()`/`import` 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先 **使用** `raw-loader` 转换一下。”

插件(plugin):

​	执行范围更广的任务,包括打包优化,资源管理,注入环境

> webpack **插件**是一个具有 [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法的 JavaScript 对象。`apply` 方法会被 webpack compiler 调用，并且 compiler 对象可在**整个**编译生命周期访问。
>
> ```javascript
> const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
> 
> class ConsoleLogOnBuildWebpackPlugin {
>   apply(compiler) {
>     compiler.hooks.run.tap(pluginName, compilation => {
>       console.log('webpack 构建过程开始！');
>     });
>   }
> }
> ```

```
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

模式(mode): 

​	development, production, none

| **选项**    | **描述**                                                     |
| ----------- | ------------------------------------------------------------ |
| development | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `development`。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`。 |
| production  | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `production`。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `TerserPlugin`。 |
| none        | 退出任何默认优化选项                                         |

配置(configuration)