React

1. #### jsx

   1. 遇到<,就解析成HTML;遇到{，就解析成javascript

   2. 组件最外层都需要有个一个包裹，如果不想要可以用 `<Fragment>`标签，import{Fragment} form 'react'

   3. onclick={this.方法.bind(this)} 构造函数中绑定性能会高一些，特别是高级组件开发中，会有很大作用

      ```react
      constructor(props){
      	super(props)
      	this.方法 = this.方法,bind(this)
      }
      ```

      

2. #### ES6

   1. import ... from 
   2. class
   3. extends ：前面继承后面的
   4. bind

3. #### webpack

   1. `import`引入是webpack的功劳

4. #### 解构

   ```react
   import React, Component from 'react';
   
   class App extends Component{
       render() {
           return(
           	<div className="app" onClick={this.handle.bind(this)}>{this.state.name}</div>
           )
       }
       constructor(props){
           super(props)
           this.state = {
               name: ''
           }
       }
       handle() {
           
       }
   }
   ```

   

5. #### 坑

   1. react禁止直接操作state,后期的性能优化上会有很多麻烦

   2. jsx的注释是{/* 正确注释的写法 */}

   3. html里面的class要写成className,防止js中的class类名冲突

   4. 工作中需要用户渲染html标签，默认是不会生效的，可以使用`dangerouslySetInnerHTML`属性解决

      ```react
      <ul>
          {
              this.state.list.map((item,index)=>{
                  return (
                      <li 
                          key={index+item}
                          onClick={this.deleteItem.bind(this,index)}
                          dangerouslySetInnerHTML={{__html:item}}
                      >
                      </li>
                  )
              })
          }
      </ul> 
      ```

   5. `label`

      原label跳转for

      ```react
      <div>
          <label for="jspang">加入服务：</label>
          <input id="jspang" className="input" value={this.state.inputValue} onChange={this.inputChange.bind(this)} />
          <button onClick={this.addList.bind(this)}> 增加服务 </button>
      </div>
      ```

      要改成htmlfor

      ```react
      <div>
          <label htmlFor="jspang">加入服务：</label>
          <input id="jspang" className="input" value={this.state.inputValue} onChange={this.inputChange.bind(this)} />
          <button onClick={this.addList.bind(this)}> 增加服务 </button>
      </div>
      ```

      for 容易与js的 for循环混淆
      
   6. ref的坑

      1. 当你在父元素中添加子元素，然后立刻去获取父元素，发现新添加的子元素没添加上
         因为setState是异步操作，获取的时候，没有添加上
         解决setState提供了回调函数

      

6. #### 父子传递

   1. 不管是父传参数给子，还是子调用父的方法，都是通过属性的方式传参
   2. 单向数据流，不能直接修改传过来的值，只能用父传来的方法改

7. #### props

   1. ```react
      import PropTypes from 'prop-types' // 引入PropTypes
      ```

   2. ```react
      XiaojiejieItem.PropTypes = {
      	content:PropTypes.string.isRequired,
          deleteItem:PropTypes.func,
          index:PropTypes.number
      }
      ```

   3. ```react
      XiaojiejieItem.defaultProps = {
      	avname：'松岛枫'
      }
      ```

8. #### ref

   1. ```react
      <XiaojiejieItem ref={(input)=>this.input=input}
      ```

9. #### 生命周期

   1. `initialization`：初始化阶段

10. #### jquery

   1. react可以使用jquery, react只对root的div下手，其他的div没事

11. #### 面试

    1. 函数式编程的好处是什么？
       1. 函数式编程让我们的代码更清晰，每个功能都是一个函数
       2. 函数是变成为我们的代码测试代理了极大的方便，更容易实现前端自动化测试