<template>
  <div class="cascader" v-click-outside="close">
    <div class="title" @click="toggle">{{result}}</div>
    <div v-if="isVisable">
      <cascader-item :options="options" @change="change" :level="0" :value="value"></cascader-item>
    </div>
  </div>
</template>

<script>
import cascaderItem from "./CascaderItem.vue";
import clickOutside from "../directives/clickOutside.js";
import cloneDeep from "lodash/cloneDeep";

export default {
  components: {
    cascaderItem
  },
  directives: {
    clickOutside
  },
  computed: {
    result() {
      return this.value.map(item => item.label).join("/");
    }
  },
  data() {
    return {
      isVisable: false
    };
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    lazyload: {
      type: Function
    }
  },
  methods: {
    handle(id, children) {
      let cloneOptions = cloneDeep(this.options);
      let stack = [...cloneOptions];
      let index = 0;
      let current;
      while ((current = stack[index++])) {
        if (current.id !== id) {
          if (current.children) {
            stack = stack.concat(current.children);
          }
        } else {
          break;
        }
      }
      if (current) {
        current.children = children; // 动态的添加儿子节点
        this.$emit("update:options", cloneOptions);
      }
    },
    toggle() {
      this.isVisable = !this.isVisable;
    },
    close() {
      this.isVisable = false;
    },
    change(value) {
      let lastItem = value[value.length - 1];
      let id = lastItem.id;
      if (this.lazyload) {
        this.lazyload(id, (children) => this.handle(id, children));
      }
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="stylus">
.cascader {
  display: inline-block;
}

.content {
  display: flex;
}

.title {
  height: 30px;
  line-height: 30px;
  width: 150px;
  border: 1px solid #ccc;
}

.content-left {
  border: 1px solid #ccc;
  min-height: 150px;
  max-height: 150px;
  overflow: auto;
}

.label {
  width: 80px;
  padding-left: 10px;
}
</style>
