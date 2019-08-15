# Vue单元测试

## [#](http://www.zhufengpeixun.cn/train/vue-info/unit.html#%E4%B8%80-%E4%BB%80%E4%B9%88%E6%98%AF%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95)一.什么是单元测试

单元测试就是测试最小单元(一个方法，一个组件)

- 修改js模块功能，其它模块也受影响，很难快速定位bug
- 多人开发代码越来越难以维护,不方便迭代,代码无法重构

## [#](http://www.zhufengpeixun.cn/train/vue-info/unit.html#%E4%BA%8C-tdd-bdd)二.TDD & BDD

- Test-Driven Development, 测试驱动开发
  - 先编写测试用例代码，然后针对测试用例编写功能代码，使其能够通过
  - 很好的诠释了代码即文档
  - 清晰地了解软件的需求
- Behavior Driven Development，行为驱动开发
  - 系统业务专家、开发者、测试人员一起合作，分析软件的需求，然后将这些需求写成一个个的故事。开发者负责填充这些故事的内容
  - 保证程序实现效果与用户需求一致。

## [#](http://www.zhufengpeixun.cn/train/vue-info/unit.html#%E4%B8%89-jest-vue-test-utils)三.jest + Vue Test Utils

- jest 是facebook推出的一款测试框架,集成了 Mocha,chai,jsdom,sinon等功能。
- Vue Test Utils 是 Vue.js 官方的单元测试实用工具库。

## [#](http://www.zhufengpeixun.cn/train/vue-info/unit.html#%E5%9B%9B-%E6%B7%BB%E5%8A%A0%E8%A6%86%E7%9B%96%E7%8E%87)四.添加覆盖率

```javascript
{
    collectCoverage: true,
    collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],

}
```

## [#](http://www.zhufengpeixun.cn/train/vue-info/unit.html#%E4%BA%94-jest%E5%B8%B8%E8%A7%81%E6%B5%8B%E8%AF%95%E6%96%B9%E6%B3%95)五.jest常见测试方法

### [#](http://www.zhufengpeixun.cn/train/vue-info/unit.html#%E6%B5%8B%E8%AF%95%E5%93%AA%E4%BA%9B%E5%8A%9F%E8%83%BD)测试哪些功能

- 测试渲染的内容是否符合预期
- 测试事件执行后是否符合预期
- 测试事件是否能被调用
- 测试vue中自定义事件能否被触发

### [#](http://www.zhufengpeixun.cn/train/vue-info/unit.html#%E6%B5%8B%E8%AF%95mock%E6%96%B9%E6%B3%95)测试mock方法

- jest.fn (mock function)
- mock axios (mock ajax)
- jest.useFackTimers (mock timer)
- jest.runAllTimers
- jest.useRealTimers

## [#](http://www.zhufengpeixun.cn/train/vue-info/unit.html#%E5%85%AD-%E6%B5%8B%E8%AF%95%E7%BB%84%E4%BB%B6)六.测试组件

### [#](http://www.zhufengpeixun.cn/train/vue-info/unit.html#_1-%E6%B5%8B%E8%AF%95close%E4%BA%8B%E4%BB%B6%E6%98%AF%E5%90%A6%E7%94%9F%E6%95%88)1.测试close事件是否生效

```javascript
it('测试close事件能否生效', () => {
const wrapper = shallowMount(Cascader, {
    propsData: {
    isVisible: true,
    },
});
expect(wrapper.vm.isVisible).toBeTruthy;
wrapper.vm.close();
expect(wrapper.vm.isVisible).toBeFalsy;
});
```

### [#](http://www.zhufengpeixun.cn/train/vue-info/unit.html#_2-%E6%B5%8B%E8%AF%95lazyload%E6%96%B9%E6%B3%95%E6%98%AF%E5%90%A6%E6%AD%A3%E5%B8%B8%E8%A2%AB%E8%A7%A6%E5%8F%91)2.测试lazyLoad方法是否正常被触发

```javascript
it('测试 lazyLoad', () => {
const callback = jest.fn();
const wrapper = shallowMount(Cascader, {
    propsData: {
    lazyLoad: callback,
    },
});
wrapper.find('.trigger').trigger('click');
wrapper.find(CascaderItem).vm.$emit('change', [{ label: 'name' }]);
expect(callback).toBeCalled();
});
```

### [#](http://www.zhufengpeixun.cn/train/vue-info/unit.html#_3-%E6%B5%8B%E8%AF%95handle%E6%96%B9%E6%B3%95%E6%98%AF%E5%90%A6%E7%AC%A6%E5%90%88%E8%A7%84%E8%8C%83)3.测试handle方法是否符合规范

```javascript
it('测试handle方法', () => {
const wrapper = shallowMount(Cascader, {
    propsData: {
    options: [
        {
        id: 1,
        label: '北京',
        children: [{ id: 3, label: '广州' }],
        },
        {
        id: 2,
        label: '上海',
        },
    ],
    },
});
wrapper.vm.handle(1, []);
expect(wrapper.emitted()['update:options']).toBeTruthy;
wrapper.vm.handle(3, []);
expect(wrapper.emitted()['update:options']).toBeTruthy;
wrapper.vm.handle(5, []);
expect(wrapper.emitted()['update:options']).toBeFalsy;
});
```

### [#](http://www.zhufengpeixun.cn/train/vue-info/unit.html#_4-%E6%B5%8B%E8%AF%95%E9%A1%B5%E9%9D%A2%E6%98%BE%E7%A4%BA%E7%9A%84%E7%BB%93%E6%9E%9C)4.测试页面显示的结果

```javascript
it('computed', () => {
    const wrapper = shallowMount(Cascader, {
        propsData: {
        value: [{ label: '香蕉' }, { label: '苹果' }],
        },
    });
    expect(wrapper.vm.result).toBe('香蕉/苹果');
});
```