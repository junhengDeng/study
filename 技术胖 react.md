# 技术胖 react

1. 目录

   1. read.me： 项目说明文件
   2. packjson.json： npm配置文件
   3. lock.json：锁定项目版本文件
   4. gitnore：git管理文件 node_modules可以在这里设置不上传
   5. node_modules：第三方
   6. public：公共文件
      1. ico 网站小图标
      2. mainfest.json 移动端的配置
   7. src：工程目录
      1. index.js 入口文件
         1. 可以引入css import './index.css'
         2. PWA serviceWorker 离线缓存

2. 写helloworld

   ```react
   // index.js
   
   import React from 'react'
   import ReactDom from 'react-dom'
   import App from './App'
   
   ReactDom.render(<App/>, document.getElementById('root'))
   
   ```

   ```react
   // App.js
   
   import React, {Component} from 'react'
   
   class App extends Component{
       render() {
           return (
           	<div></div>
           )
       }
   }
   ```

3. jsx

   1. javascript和xml的结合

   2. 虚拟dom, 遇到`<`为html ，遇到`{`为javascriptjs

   3. 不用jsx写,用react和js来写

      ```js
       var child1 = React.createElement('li', null, 'jspang')
       var child2 = React.createElement('li', null, 'jspang')
       var root = React.createElement('ul', {className:'my-list'}, child1, child2)
      ```

   4. 自定义组件，要大写开头， 小写的为原生

   5. javascript只要写一个{}

4. 简单的demo

   1. render 最外层需要一个标签包裹，也可以用Flagment标签包裹

   2. constructor

      1. super继承父元素的方法，Component的方法

         ```
         constructor(props) {
         	super(props)
         } 
         ```

      2. 数据

         ```react
         constructor(props) {
         	super(props)
         	this.state = {
                 inputValue: '',
         		list: []
         	}
         }
         ```

      3. jsx绑定数据

         ```react
         <input value={this.state.inputValue}/>
         ```

      4. jsx绑定方法

         ```jsx
         <input value={this.state.inputValue} onChange={this.inputChange.bind(this)}/>
         ```

         `绑定方法要将this加入，不然没有this`

      5. 改变数据

         ```react
         inputChange(e) {
         	this.setState({
         		inputValue: e.target.value
         	})
         }
         ```

      6. 循环 `要加key`
      
         ```react
         <ul>
         	{
                 this.list.map((it,idx)=>{
                     return <li key={idx+i}>{it}</li>
                 })
             }
         </ul>
         ```
      
      7. 操作数据的时候，注意不要操作到源数据，最好用setState来操作
      
      8. `htmlFor` `className`