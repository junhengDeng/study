# vue

1.模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 `Math` 和 `Date` 。你不应该在模板表达式中试图访问用户定义的全局变量。

2.模板中,可以执行javascript,有个限制就是，每个绑定都只能包含**单个表达式**，

3.v-if指令将根据表达式来插入和移除元素

4.动态属性

v-bind:[attributeName]
 v-on:[eventName]

> 动态参数表达式有一些语法约束，因为某些字符，例如空格和引号，放在 HTML 特性名里是无效的。同样，在 DOM 中使用模板时你需要回避大写键名。

```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>	
```

5.

> 模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护

最好用计算属性

6.

> 我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

> 我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 **A**，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 **A** 。如果没有缓存，我们将不可避免的多次执行 **A** 的 getter！如果你不希望有缓存，请用方法来替代。

7.

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

8.

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 `display: flex`。

9.

vue渲染元素,默认是"就地更新""策略.

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 `key` 属性即可：

10. `v-if` vs `v-show`



> `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
>
> `v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
>
> 相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
>
> 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

11.v-for 

> 在遍历对象时，会按 `Object.keys()` 的结果遍历，但是**不能**保证它的结果在不同的 JavaScript 引擎下都一致。

12.数组更新

[数组更新]: https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B	"数组更新"



1. 变异方法

   - `push()`
   - `pop()`
   - `shift()`
   - `unshift()`
   - `splice()`
   - `sort()`
   - `reverse()`

2. 替换数组

   总是返回新数组

3. vm.$set

13.对象更新

[对象更新]: https://cn.vuejs.org/v2/guide/list.html#%E5%AF%B9%E8%B1%A1%E5%8F%98%E6%9B%B4%E6%A3%80%E6%B5%8B%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9	"对象更新"



1. vm.$set

2. 赋予新对象,Object.assign({}, oldObject), 扩展函数或_.extend() //lodash方法

   注意是,Object.assign()第一个参数是空对象,这样才会赋予新对象

14.v-for接受整数 v-for="n in 10"

15.事件修饰符

- `.stop`
- `.prevent`
- `.capture` 冒泡和捕获,当事件传递,capture是捕获监听器
- `.self`
- `.once`
- `.passive`

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

```

```

![img](https://upload-images.jianshu.io/upload_images/15214039-026701e2148ad998.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/916/format/webp)

输出1234	

新增修饰符

- `.once` 触发一次
- `.passive`

```html
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

> 不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你*不*想阻止事件的默认行为。

- `.keyup`

系统修饰符

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

- `.exact`同时按下

鼠标修饰符

- `.left`
- `.right`
- `.middle`

16.v-model是个语法糖

```html + js
<div id="app">
    <customer-input v-model="msg"></customer-input>
    <customer-input :value="msg" @input="msg = $event"></customer-input>
</div>

Vue.component('customer-input', {
	props: ["value"],
	template: `<input :value="value" @input="$emit('input', $event.target.value)"/>`
})
new Vue({
	el: '#app',
    data: {
        msg: ''
    }
})
```

17.ul ol table select 这些元素对于可以出现在其内部的元素是由严格限制的，所以要用 is

```html
<table>
	<tr is="blog-post-row"></tr>
</table>
```

需要注意的是**如果我们从以下来源使用模板的话，这条限制是不存在的** 

需要注意的是**如果我们从以下来源使用模板的话，这条限制是不存在的**：

- 字符串 (例如：`template: '...'`)

- [单文件组件 (`.vue`)](https://cn.vuejs.org/v2/guide/single-file-components.html)

- ```
  <script type="text/x-template">
  ```

  

18.slot

```html + js
<alert-box>Something bad happened</alert-box>

Vue.component('alert-box', {
	template: `<div class="demo-alert-box">
        <strong>Warning</strong>
        <slot></slot>
</div>`
})

```

19.组件名最好是小写加一个连字符

kabeb-case	Vue.component('my-component-name', {...})

20.

Vue.component是全局注册

var ComponentA = {/.../}

new Vue({

​	el: '#app',

​	components: {

​		'component-a': ComponentA

​	}

})

import ComponentA from './CompenentA.vue'

components: {

​	ComponentA                // 是   ComponentA: CompnentA

}

21.![1564031204956](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\1564031204956.png)

说明一点，import、require是由webpack,babel来操作文件的

22. HTML中的特姓名是大小写不敏感，所以浏览器会将所有大写字符解释为小写字节，所以最好用短横线分割命名     

    如果使用字符串模板，就不会有这个限制

    在prop写 postTitle 在html中要写 post-title

23.

```html
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<!-- 这是一个表达式而不是字符串 -->
<blog-post is-published></blog-post>
```

```html + js
post: {
    id: 1,
    title: 'My dfs'
}

// 如果要传post所有的属性
<blog-post v-bind="post"></blog-post>
// 等价于
<blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>
```

> 注意那些 prop 会在一个组件实例创建**之前**进行验证，所以实例的属性 (如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的。 

24. instanceof 

    Object instanceof constructor

25. 非prop特性

作者不总能遇见组件会被用于什么场景，所以当prop没定义的时候，标签又写了特性，那么这个特性会自动添加到子组件的根元素上（根元素指的是最根的标签）

26.

在这种情况下，我们定义了两个不同的 `class` 的值：

- `form-control`，这是在组件的模板内设置好的
- `date-picker-theme-dark`，这是从组件的父级传入的

对于绝大多数特性来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以如果传入 `type="text"` 就会替换掉 `type="date"` 并把它破坏！庆幸的是，`class` 和 `style` 特性会稍微智能一些，即两边的值会被合并起来，从而得到最终的值：`form-control date-picker-theme-dark`。

27.有了 `inheritAttrs: false` 和 `$attrs`，你就可以手动决定这些特性会被赋予哪个元素。在撰写[基础组件](https://cn.vuejs.org/v2/style-guide/#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E5%90%8D-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)的时候是常会用到的： 

`inheritAttrs`不让根标签继承属性， `$attrs` 获取属性

注意 `inheritAttrs: false` 选项**不会**影响 `style` 和 `class` 的绑定。 

28.`v-on:myEvent`将会变成`v-on:myevent`--导致myEvent不可能被监听到，因此推荐你使用短连线

29.刚刚测试出一个东西，vue的keep-alive时，来回切换，created不会触发，但是，watch的immediate会触发，$route的监听，会触发两次