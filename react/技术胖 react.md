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
      
   3. 父子组件传参
   
      1. this.props, 参数和方法都是这样传
      2. bind， 在constructor里面将bind加在里面，对优化好
   
   4. 面试
   
      1. 单向数据流：子组件只能使用，不能修改数据
      2. 只渲染了`root`div，其他的没有控制
      3. 函数式编程：代码清晰，自动化测试
   
   5. props报错
   
      1. 防止业务报错
   
      2. ```
         import PropTypes from 'prop-types'; //引入PropTypes
         
         XiaojiejieItem.propTypes = {
         	content: PropTypes.string,
         	index: PropTypes.Number,
         	deleteItem: PropTypes.func,
         	avname: PropTypes.string.isRequired
         }
         
         XiaojiejieItem.defaultProps = {
         	avname: '松岛枫'
         }
         ```
   
   6. 生命周期
   
      1. initialization :初始阶段
         1. constructor 不算生命周期函数，但是个人将其放在这个阶段
         2. props和state 定义属性和状态
      2. mounting: 挂载阶段
         1. componentWillMount: 在组件即将被挂载到页面的时刻执行（只执行一次）
         2. render: 页面state或props发生变化时执行
         3. componentDidMount: 组件挂在完成时执行（只执行一次）
      3. updation: 更新阶段
         1. state（比render先执行）
            1. shouldComponentUpdate(需要回传true或false)
               1. return true ，数据有变化，并且在render能执行,并且执行componentWillUpdate
               2. return false ，数据没变化，不向下执行
            2. componentWillUpdate
            3. render
            4. componentDidUpdate
         2. props
            1. componentWillReceiveProps（在dom中）
               1. 组件第一次存在于dom中，函数是不会被执行
               2. 如果已经存在于Dom中，函数才会被执行
            2. shouldComponentUpdate
               1. return true ，数据有变化，并且在render能执行,并且执行componentWillUpdate
               2. return false ，数据没变化，不向下执行
            3. componentWillUpdate
            4. render
            5. componentDidUpdate
      4. unmounting: 销毁阶段
         1. componentWillUnmount
   
   7. 性能问题
   
      1. 
   
         1. 在输入框输入的时候，render一直在执行，会有性能问题
   
         2. 需要在item里面的shouldComponentUpdate，return false
   
         3. 但是直接给false又不行，如果需要给item进行修改，就修改不了
   
         4. shouldComponentUpdate有两个参数，`nextProps` and `nextState`
   
            ```react
            // XiaojiejieItem.js
            
            shouldComponentUpdate(nextProps, nextState) {
            	//if(nextProps.content !== this.props.content) {
            	// 	return true
            	//} else {
            	//  return false;
            	//}
                return nextProps.content !== this.props.content
            }
            ```
   
         5. 还有一种PureComponent
   
            ​	PureComponent是个浅层比较，因此内部props或中的更改state将被忽略，所以添加itemList时PureComponent，添加Item,不会有渲染，但是可以通过替换数组，PureComponent才会渲染
   
         
   
   8. npm install的区别
   
      1. npm install xxx
         1. 添加到node_modules文件夹
         2. 但不会添加任何依赖，pakage.json不会用添加
      2. npm install -g xxx
         1. 添加到全局
         2. prefix
      3. npm install -save xxx
         1. 下载到node_modules文件夹
         2. 并下载了依赖
      4. npm install -save-dev xxx // devDependencies // dependencies
         1. dev开发环境依赖模块
         2. dep生产环境依赖模块
   
   9. 动画
   
      1. `react-transition-group`
      2. `CSSTransition``TransitionGroup`
   
   10. 
   
   11. 
   
   12. 
   
   13. 
   
       
   
       
   
       
   
       