# Vue优化

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#vue%E7%9A%84%E9%A2%84%E6%B8%B2%E6%9F%93%E6%8F%92%E4%BB%B6)vue的预渲染插件

```bash
npm install prerender-spa-plugin 
```

缺陷数据不够动态，可以使用ssr服务端渲染

```javascript
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const path = require('path');
module.exports = {
    configureWebpack: {
        plugins: [
            new PrerenderSPAPlugin({
                staticDir: path.join(__dirname, 'dist'),
                routes: [ '/', '/about',],
            })
        ]
    }
  }
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#app-skeleton)app-skeleton

配置webpack插件 vue-skeleton-webpack-plugin
单页骨架屏幕

```javascript
import Vue from 'vue';
import Skeleton from './Skeleton.vue';
export default new Vue({
    components: {
        Skeleton:Skeleton
    },
    template: `
        <Skeleton></Skeleton>    
    `
});
// 骨架屏
plugins: [
    new SkeletonWebpackPlugin({
        webpackConfig: {
            entry: {
                app: resolve('./src/entry-skeleton.js')
            }
        }
    })
]
```

带路由的骨架屏，编写skeleton.js文件

```javascript
import Vue from 'vue';
import Skeleton1 from './Skeleton1';
import Skeleton2 from './Skeleton2';

export default new Vue({
    components: {
        Skeleton1,
        Skeleton2
    },
    template: `
        <div>
            <skeleton1 id="skeleton1" style="display:none"/>
            <skeleton2 id="skeleton2" style="display:none"/>
        </div>
    `
});
```

```javascript
new SkeletonWebpackPlugin({
    webpackConfig: {
        entry: {
            app: path.join(__dirname, './src/skeleton.js'),
        },
    },
    router: {
        mode: 'history',
        routes: [
            {
                path: '/',
                skeletonId: 'skeleton1'
            },
            {
                path: '/about',
                skeletonId: 'skeleton2'
            },
        ]
    },
    minimize: true,
    quiet: true,
})
```

> 优化白屏效果

实现骨架屏插件

```javascript
class MyPlugin {
    apply(compiler) {
        compiler.plugin('compilation', (compilation) => {
            compilation.plugin(
                'html-webpack-plugin-before-html-processing',
                (data) => {
                    data.html = data.html.replace(`<div id="app"></div>`, `
                        <div id="app">
                            <div id="home" style="display:none">首页 骨架屏</div>
                            <div id="about" style="display:none">about页面骨架屏</div>
                        </div>
                        <script>
                            if(window.hash == '#/about' ||  location.pathname=='/about'){
                                document.getElementById('about').style.display="block"
                            }else{
                                document.getElementById('home').style.display="block"
                            }
                        </script>
                    `);
                    return data;
                }
            )
        });
    }
}
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#%E4%BB%80%E4%B9%88%E6%98%AF%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93)什么是服务端渲染?

概念：放在浏览器进行就是浏览器渲染,放在服务器进行就是服务器渲染。

- 客户端渲染不利于 SEO 搜索引擎优化
- 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
- SSR直接将HTML字符串传递给浏览器。大大加快了首屏加载时间。
- SSR占用更多的CPU和内存资源
- 一些常用的浏览器API可能无法正常使用
- 在vue中只支持beforeCreate和created两个生命周期

![ssr](C:\Users\ASUS\Desktop\学习文档\study\zhufengstudy\images\ssr.png)

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#%E4%BB%80%E4%B9%88%E6%98%AFnuxt)什么是nuxt

Nuxt.js是使用 Webpack 和 Node.js 进行封装的基于Vue的SSR框架

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#nuxt%E7%89%B9%E7%82%B9)nuxt特点

优点:
更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。首屏渲染速度快

缺点:
Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用 CPU 资源。需要考虑服务器负载，缓存策略

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#%E9%A1%B9%E7%9B%AE%E7%94%9F%E6%88%90)项目生成

```bash
npx create-nuxt-app nuxt-project
cd nuxt-project
yarn dev
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#%E9%A1%B9%E7%9B%AE%E7%9B%AE%E5%BD%95)项目目录

- assets 静态资源 会被webpack处理
- static 不会被webpack处理
- components 公共组件
- layout布局组件
- pages路由页面 可以生成对应的路由
- middleware 运行过程中发生的事
- store 存放vuex
- plugins 存放javascript插件的
- nuxt.config.js 存放nuxt配置文件
- 别名默认可以采用 ~ 或者 @符号

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#nuxt-config-js%E9%85%8D%E7%BD%AE)nuxt.config.js配置

- env 可以配置环境变量通过cross-env

  ```javascript
      env:{
          baseUrl:process.env.BASE_URL
      }
  ```

- cache:false // 提升组件缓存策略

- css 全局css样式

- head 配置头

- loading (需要等待$loading 挂载完成)

  ```javascript
      loading: { color: '#000',height:'10px' }
      mounted(){
          this.$nextTick(()=>{
              this.$nuxt.$loading.start()
          });
      }
  ```

- modules 存放第三方模块 @nuxtjs/axios 第三方模块

- plugins 配置插件

- transition动画效果

  ```javascript
      config.js
      transition: {
          name: 'layout',
          mode: 'out-in'
      },
      .layout-enter-active, .layout-leave-active {
          transition: opacity .5s
      }
      .layout-enter, .layout-leave-active {
          opacity: 0
      }
  ```

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#nuxt-link)nuxt-link

使用history.pushState跳转页面,不会触发页面整体重新渲染

- 路径参数

```javascript
   <nuxt-link to="/user/4/5">路径参数</nuxt-link>
```

- 查询字符串
- validate方法 必须返回是否访问这个页面，返回false执行404逻辑

```javascript
export default {
    validate({params}){
        return params.id != 4;
    }
}
```

- 动画效果

```javascript
.page-enter-active, .page-leave-active {
    transition: opacity .5s;
}
.page-enter, .page-leave-active {
    opacity: 0;
}
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#%E4%B8%AD%E9%97%B4%E4%BB%B6)中间件

如果经过服务端则在服务端执行

- 全局中间件
- layout 在layout中增加middleware
- 组件中间件 在组件中增加middleware

```javascript
export default function ({ store, redirect }) {
  if (!store.state.user) {
    return redirect('/login')
  }
}
router: {
    middleware: 'auth'
}
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#layout%E9%85%8D%E7%BD%AE)layout配置

- 自定义error页面 增加error.vue(配置错误layout)
- 自定义layout布局

增加错误页面，错误页需要配置layout

```javascript
export default {
    props:['error'],
    layout:'page'
}
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#%E6%95%B0%E6%8D%AE%E8%8E%B7%E5%8F%96)数据获取

- asyncData使用(仅在页面组件中使用)

```javascript
async asyncData ({ params }) { // 无this
    let { data } = await axios.get();
    return { title: data }
}
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#%E6%8F%92%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8)插件的使用

扩展原型上的方法plugins

```javascript
export default function({app},inject){
    inject('my',()=>{ // 在app上和this都注册这个方法
        console.log('my');
    })
}
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/ssr.html#%E8%BF%90%E8%A1%8C%E6%B5%81%E7%A8%8B)运行流程

nextServerinit 只在主模块中使用
nuxt.config.js 全局中间件
matching layout 不同布局的中间件
matching page & children 页面中间件
validate 返回false显示错误页面
asyncData 服务端渲染的页面数据请求
fetch 同步vuex数据

![nuxt](C:\Users\ASUS\Desktop\学习文档\study\zhufengstudy\images\nuxt.jpg)