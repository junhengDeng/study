<template>
  <div class="content">
    <div class="content-left">
      <div v-for="(item, index) in options" :key="index">
        <div class="label" @click="select(item)">{{item.label}}</div>
      </div>
    </div>
    <div class="content-right" v-if="lists && lists.length">
      <CascaderItem :options="lists" :level="level + 1" @change="change" :value="value"></CascaderItem>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "CascaderItem", //递归的特别，要给当前的组件起名
  data() {
    return {
      currentSelected: null
    };
  },
  props: {
    level: {
      type: Number
    },
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    lists() {
      return this.value[this.level] && this.value[this.level].children
    }
  },
  methods: {
    change(item) {
      this.$emit("change", item)
    },
    select(item) {
      this.currentSelected = item;
      let cloneValue = cloneDeep(this.value)
      cloneValue[this.level] = item
      cloneValue.splice(this.level + 1);
      this.$emit("change", cloneValue);
    }
  }
};
</script>