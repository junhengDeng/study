<template>
  <div class="cascader" v-click-outside="close">
    <div class="title" @click="toggle">{{result}}</div>
    <div v-if="isVisable">
      <cascader-item :options="options" :value="value" :level="0" @change="change"></cascader-item>
    </div>
  </div>
</template>

<script>
import clickOutside from "../directives/clickOutside.js";
import CascaderItem from "./CascaderItem.vue";
import cloneDeep from "lodash/cloneDeep";
export default {
  components: {
    CascaderItem
  },
  directives: {
    clickOutside
  },
  data() {
    return {
      currentItem: null,
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
  computed: {
    result() {
      return this.value.map(item => item.label).join("/");
    }
  },
  methods: {
    handle(id, children) {
      let cloneOptions = cloneDeep(this.options);
      let current;
      let index = 0;
      let stack = [...cloneOptions];
      while ((current = stack[index++])) {
        if (current.id != id) {
          if (current.children) {
            stack = stack.concat(current.children);
          }
        } else {
          break;
        }
      }
      if (current) {
        current.children = children;
        this.$emit("update:options", cloneOptions);
        return { current, cloneOptions };
      }
    },
    toggle() {
      this.isVisable = !this.isVisable;
    },
    close() {
      this.isVisable = false;
    },
    change(value) {
      let id = value[value.length - 1].id;
      if (this.lazyload) {
        this.lazyload(id, children => this.handle(id, children));
      }
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="stylus">
.title {
  width: 150px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
}

.content {
  display: flex;
}

.content-left {
  padding-left: 8px;
  border: 1px solid #ccc;
  height: 150px;
  overflow: auto;
}
</style>