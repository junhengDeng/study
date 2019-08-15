<template>
  <div class="cascader" v-click-outside="close">
    <div class="title" @click="toggle">{{result}}</div>
    <div v-if="isVisible">
      <cascader-item :options="options" :value="value" :level="0" @change="change"></cascader-item>
    </div>
  </div>
</template>

<script>
import clickOutside from "../directives/clickOutside.js";
import CascaderItem from "./CascaderItem.vue";
export default {
  components: {
    CascaderItem
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  directives: {
    clickOutside
  },
  data() {
    return {
      isVisible: false
    };
  },
  computed: {
    result() {
      return this.value.map(item => item.label).join("/")
       
    }
  },
  methods: {
    change(value) {
      this.$emit("input", value);
    },
    close() {
      this.isVisible = false;
    },
    toggle() {
      this.isVisible = !this.isVisible;
    }
  }
};
</script>

<style>
.cascader {
  display: inline-block;
}

.title {
  width: 200px;
  height: 30px;
  border: 1px solid #ccc;
  line-height: 30px;
}
.content {
  display: flex;
}
.content-left {
  border: 1px solid #ccc;
  min-height: 150px;
}
.label {
  width: 80px;
  padding-left: 5px;
}
.label:hover {
  background: #999;
  cursor: pointer;
}
</style>