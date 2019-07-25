import Vue from 'vue';
import upperFirst from 'lodash/upperFirst'; //首字母大写
import camelCase from 'lodash/camelCase'; //驼峰命名

const requireComponent = require.context('./component', false, /Base[A-Z]\w.\.(js|vue)$/)
// require.context(目录,是否查找子目录,正则) \w 所有字母和数字,下划线[a-zA-Z0-9]

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName) // 获取了该文件的配置

  const componentName = upperFirst(
    camelCase(
      fileName.split('/').pop().replace(/\.\w$/, '')
    )
  )
  //  全局注册
  Vue.component(componentName, componentConfig.default || componentConfig)
})

/*
1.先用 require.context() 获取一个对象
2.对象的keys循环获取fileName
3.require.context()对象.fileName, 就可以获取该文件的配置
*/