1. #### App

   - onLaunch：小程序初始化完成时，调用（全局一次）
   - onShow：小程序从后台切换到前台或者初始化完
   - onHide：小程序从前台切入到后台
   - onError：小程序脚本错误，或者api调用错误时
   - onPageNotFound：小程序打开的页面不存在时
   - globalData
   - getApp()

2. #### Page

   - data：页面的初始数据
   - onLoad：监听页面的加载
   - onShow：监听页面的显示
   - onReady：监听页面初次渲染完成
   - onHide：监听页面的隐藏
   - onUnload：监听页面的卸载
   - onForceReLaunch：监听页面的重启，重启按钮
   - onPullDownRefresh：监听用户下拉动作
   - onReachButton：上拉触底时间的处理函数
   - onShareAppMessage：用户点击右上角转发
   - onPageScroll：页面滚动触发事件
   - onTabItemTap：当前是tab页时，点击tab时触发
   - onURLQueryChange：监听页面URL query改变
   - 其他
   - setData()

3. #### 页面栈

   | 路由方式   | 页面栈表现（出栈就卸载，入栈就加载，显示） |
   | ---------- | ------------------------------------------ |
   | 初始化     | 新页面入栈                                 |
   | 打开新页面 | 新页面入栈                                 |
   | 页面重定向 | 当前页面出栈，新页面入栈                   |
   | 页面返回   | 页面出栈                                   |
   | tab切换    | 页面全部出栈，只留下初始的tab页面          |
   | 重加载     | 页面全部出栈，只留下新的页面               |

   getCurrentPages()

   | 路由方式   | 触发时机                                                     | 路由前页面触发事件 | 路由后页面触发事件 |
   | ---------- | ------------------------------------------------------------ | ------------------ | ------------------ |
   | 初始化     | 智能小程序打开的第一个页面                                   |                    | onLoad, onShow     |
   | 打开新页面 | 调用 API [swan.navigateTo](https://smartprogram.baidu.com/docs/develop/api/show/tab_swan-navigateTo/) 或使用组件 [``](http://smartprogram.baidu.com/docs/develop/component/nav/) | onHide             | onLoad, onShow     |
   | 页面重定向 | 调用 API [swan.redirectTo](https://smartprogram.baidu.com/docs/develop/api/show/tab_swan-redirectTo/) 或使用组件 [``](http://smartprogram.baidu.com/docs/develop/component/nav/) | onUnload           | onLoad, onShow     |
   | 页面返回   | 调用 API [swan.navigateBack](https://smartprogram.baidu.com/docs/develop/api/show/tab_swan-navigateBack/) 或使用组件 [``](http://smartprogram.baidu.com/docs/develop/component/nav/)或用户按左上角返回按钮 | onUnload           | onShow             |
   | Tab 切换   | 调用 API [swan.switchTab](https://smartprogram.baidu.com/docs/develop/api/show/tab_swan-switchTab/) 或使用组件 [``](http://smartprogram.baidu.com/docs/develop/component/nav/) 或用户切换 Tab |                    | 各种情况参考以下表 |
   | 重新启动   | 调用 API [swan.reLaunch](https://smartprogram.baidu.com/docs/develop/api/show/tab_swan-reLaunch/) 或使用组件 [``](http://smartprogram.baidu.com/docs/develop/component/nav/) | onUnload           | onLoad, onShow     |

    Tab 切换对应的生命周期（以 A、B 页面为 Tabbar 页面，C 是从 A 页面打开的页面，D 页面是从 C 页面打开的页面为例）： 

   | 当前页面        | 路由后页面    | 触发的生命周期                                     |
   | --------------- | ------------- | -------------------------------------------------- |
   | A               | A             | Nothing happend                                    |
   | A               | B             | A.onHide(), B.onLoad(), B.onShow()                 |
   | A               | B（再次打开） | A.onHide(), B.onShow()                             |
   | C               | A             | C.onUnload(), A.onShow()                           |
   | C               | B             | C.onUnload(), B.onLoad(), B.onShow()               |
   | D               | B             | D.onUnload(), C.onUnload(), B.onLoad(), B.onShow() |
   | D（从转发进入） | A             | D.onUnload(), A.onLoad(), A.onShow()               |
   | D（从转发进入） | B             | D.onUnload(), B.onLoad(), B.onShow()               |

   **注意**：

   - navigateTo、redirectTo 只能打开非 tabBar 页面；
   - switchTab 只能打开 tabBar 页面；
   - reLaunch 可以打开任意页面；
   - 页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar；
   - 调用页面路由带的参数可以在目标页面的 onLoad 中获取。

4. #### AOP机制

   1. 生命周期时候还能再拦截一次
      - App.after
      - Page.after
      - swan.after

5. #### 数据绑定 {{}}

6. #### 循环 s-for

7. #### 条件 s-if s-elif s-else

8. #### 模板 template 模板之间不可嵌套

9. #### 事件处理 bind和catch，bind不阻止冒泡，catch阻止冒泡

10. #### 引用 import和include, include除模板整个引入

11. #### SJS export default输出，import-sjs引入

12. #### filter 过滤

13. #### css rpx

14. #### Component

    1. usingComponents
    2. component: true
    3. slot
    4. externalClasses定义外部样式，addGlobalClass引用文件的css
    5. component构造器
    6. 组件间通信
       1. bindmyevent
       2. dispatch(冒泡的方式，层层传递)
       3. triggerEvent与父组件通信
    7. 组件的生命周期
       - created,实例刚创建
       - attached，data刚初始化
       - ready，  页面被挂载上
       - detached   退出
    8. behaviors 合并
       1. 类似mixins
       2. behavior需要使用Behavior()构造器定义
    9. observers 监听

15. 