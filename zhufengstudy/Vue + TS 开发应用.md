# Vue + TS 开发应用

使用vue-cli3创建项目，增加TypeScript

```text
 (*) Babel
 (*) TypeScript
 ( ) Progressive Web App (PWA) Support
 (*) Router
 (*) Vuex
 (*) CSS Pre-processors
 (*) Linter / Formatter
```

> 使用less和tslint即可

这里你会看到和普通生成js的项目有些不同

- 1.shims-tsx.d.ts，允许你以.tsx结尾的文件，在Vue项目中编写jsx代码
- 2.shims-vue.d.ts TypeScript识别.vue 文件

## [#](http://www.zhufengpeixun.cn/train/vue-info/vue+ts.html#%E4%B8%80-%E6%9B%B4%E6%96%B0ts%E8%B7%AF%E7%94%B1%E6%96%87%E4%BB%B6)一.更新ts路由文件

```javascript
import Vue from 'vue';
import Router from 'vue-router';
import Todo from './views/Todo.vue';
Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'todo',
      component: Todo, // 访问/ 的时候显示todo组件
    },
    {
      path: '/list', 
      name: 'list', // 访问/list时显示 列表组件
      component: () => import(/* webpackChunkName: "List" */ './views/List.vue'),
    },
  ],
});
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/vue+ts.html#%E4%BA%8C-%E5%9C%A8components%E4%B8%8B%E6%96%B0%E5%A2%9Etodo-vue)二.在components下新增Todo.vue

```javascript
<template>
  <div>
    <ul>
      <li v-for="(item,index) in lists" :key="index">
        <span v-if="currentIndex !== index">{{item.text}}</span>
        <input type="text" v-else />
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
// Component来注册组件
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Todo extends Vue {
  public currentIndex = -1;
  public lists = [ // 声明数据列表
    {
      text: "睡觉 呼呼~~~",
      complete: false
    },
    {
      text: "玩游戏 呼呼~~~",
      complete: false
    }
  ];
}
</script>
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/vue+ts.html#%E4%B8%89-jsx%E7%BC%96%E5%86%99todo-item%E7%BB%84%E4%BB%B6)三.JSX编写todo-item组件

### [#](http://www.zhufengpeixun.cn/train/vue-info/vue+ts.html#%E5%B1%9E%E6%80%A7%E4%BC%A0%E9%80%92-prop)属性传递(@Prop)

```javascript
import { Component, Prop, Vue } from 'vue-property-decorator';
interface Item {
  text: string;
  complete: boolean;
}
@Component
export default class TodoItem extends Vue {
  // 属性校验
  @Prop(Object) public item!: Item; // 循环的每一项
  @Prop(Number) public index!: number; // 当前循环的索引
  @Prop(Number) public currentIndex!: number; // 默认哪一项是当前编辑状态
  public render() { // 组件需要拥有render方法
    return <div>
      {this.index !== this.currentIndex ? <span>{this.item.text}</span> : <input />}
    </div>;
  }
}
```

```html
// 在Todo中引入TodoItem组件
<li v-for="(item,index) in lists" :key="index">
    <TodoItem :item="item" :index="index" :currentIndex="currentIndex"></TodoItem>
</li>
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/vue+ts.html#%E5%9B%9B-%E5%BC%95%E5%85%A5elementui)四.引入elementUI

```javascript
// 在main.js中引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/vue+ts.html#%E4%BA%94-%E4%BD%BF%E7%94%A8elementui)五.使用elementUI

```jsx
  public editingContent = ''; // 编辑的值
  public handleChange(value: string) { 
    this.editingContent = value;
  }
  protected render() {
    return <li>
      {this.index === this.currentIndex ?
        <div>
          <el-input value={this.editingContent} size='small' on-input={this.handleChange} style={{ width: '200px' }}></el-input>
          <el-button type='primary' size='small'  icon='el-icon-check'></el-button>
          <el-button type='danger' size='small' icon='el-icon-close'></el-button>
        </div>
        : <div>
          <span class='content'>{this.item.text}</span>
          <el-button type='default' size='small' icon='el-icon-edit'></el-button>
        </div>
      }
    </li >;
  } 
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/vue+ts.html#%E5%85%AD-%E7%BB%84%E4%BB%B6%E9%97%B4%E9%80%9A%E4%BF%A1-emit)六.组件间通信(@Emit)

### [#](http://www.zhufengpeixun.cn/train/vue-info/vue+ts.html#%E5%AE%9E%E7%8E%B0%E7%BC%96%E8%BE%91%E5%8A%9F%E8%83%BD)实现编辑功能

```javascript
<TodoItem
  v-for="(item,index) in lists"
  :key="index"
  :item="item"
  :index="index"
  :currentIndex="currentIndex"
  @edit="edit" // 像子组件传递edit事件
></TodoItem>
public edit(index: number) {
    this.currentIndex = index;
}
```

子组件触发父组件的方法

```javascript
public edit() {
    this.$emit('edit', this.index);
}
<el-button type='primary' size='small' icon='el-icon-edit' on-click={this.edit}></el-button>
```

可以使用装饰器

```javascript
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
@Emit('edit') // 如果发射的事件名和方法名相同，则可以省略
public edit() {
  return this.index; // 返回的结果或作为向上传递的内容
}
```

### [#](http://www.zhufengpeixun.cn/train/vue-info/vue+ts.html#%E5%AE%9E%E7%8E%B0%E4%BF%9D%E5%AD%98%E5%8A%9F%E8%83%BD)实现保存功能

```html
<TodoItem
   v-for="(item,index) in lists"
  :key="index"
  :item="item"
  :index="index"
  :currentIndex="currentIndex"
  @edit="edit"
  @save="save"
  @close="close"
></TodoItem>
```

将save方法传递给子组件

```javascript
public save({index,content}:{index:number,content:string}){
    this.lists[index].text = content;
    this.close();
}
public close() {
  this.currentIndex = -1;
}
```

子组件调用save方法

```javascript
@Emit()
public save() {
  return {
    index: this.index,
    content: this.editingContent
  }
}
<el-button type='primary' on-click={this.save} size='small' icon='el-icon-check'></el-button>
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/vue+ts.html#%E4%B8%83-%E6%95%B0%E6%8D%AE%E7%9A%84%E7%9B%91%E6%8E%A7-watch)七.数据的监控(@Watch)

这里我们可以监控索引的变化

```javascript
import { Component, Prop, Vu
e, Emit, Watch } from 'vue-property-decorator';
@Watch('currentIndex')
public changeIndex() { // 索引变化讲内容赋予给当前编辑的内容
    this.editingContent = this.item.text;
}
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/vue+ts.html#%E5%85%AB-%E5%B0%86%E6%95%B0%E6%8D%AE%E8%BF%81%E7%A7%BB%E8%87%B3vuex)八.将数据迁移至vuex

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    list: [
      {
        text: '睡觉 呼呼~~~',
        complete: false,
      },
      {
        text: '玩游戏 呼呼~~~',
        complete: false,
      },
    ],
  },
  mutations: {
    updateList(state, { index, content }) {
      state.lists[index].text = content;
    }
  },
});
```

### [#](http://www.zhufengpeixun.cn/train/vue-info/vue+ts.html#%E5%AE%89%E8%A3%85vuex-class)安装vuex-class

```text
npm i vuex-class 
```

```javascript
import { State, Mutation } from "vuex-class";
@State("lists") public lists!: Item[];
@Mutation("updateList") public updateList!: (obj: IChangeItem) => void;
public save(item: IChangeItem) {
    this.updateList(item); // 通过mutation更新状态
    this.close();
}
```

> 到此我们就对ts编写vue，就有了具体的掌握