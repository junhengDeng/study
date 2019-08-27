// webpack环境下
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context('./components', false, /Base[A-Z]\W+\.(vue|js)$/)

requireComponent.keys().map(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(camelCase(fileName.split('/').pop().replace(/.\w+$/, '')))

  Vue.component(componentName, componentConfig.default || componentConfig)
})