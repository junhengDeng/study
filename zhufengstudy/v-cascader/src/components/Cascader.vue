<template>
  <div class="cascader" v-click-outside="close">
    <div class="title" @click="toggle">{{result}}</div>
    <div v-if="isVisable">
      <CascaderItem :options="options" :value="value" :level="0" @change="change"></CascaderItem>
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
      isVisable: false
    };
  },
  computed: {
    result() {
      return this.value.map(item => item.label).join("/");
    }
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
    toggle() {
      this.isVisable = !this.isVisable;
    },
    close() {
      this.isVisable = false;
    },
    change(value) {
      this.$emit("input", value);
      if (this.lazyload) {
        let id = value[value.length - 1].id;
        this.lazyload(id, (children) => this.handle(id, children));
      }
    },
    handle(id, children) {
      let cloneOptions = cloneDeep(this.options);
      let index = 0;
      let stack = [...cloneOptions];
      let current;
      while (current = stack[index++]) {
        if (current.id === id) {
          break;
        } else {
          if (current.children) {
            stack = stack.concat(current.children);
          }
        }
      }
      if (current) {
        current.children = children;
        this.$emit("update:options", cloneOptions);
      }
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
  border: 1px solid #ccc;
  height: 150px;
  overflow-y: auto;
}

.label {
  padding-left: 8px;
  width: 80px;
}
</style>