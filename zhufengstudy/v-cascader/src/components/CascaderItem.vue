<template>
  <div class="content">
    <div class="content-left">
      <div v-for="(item, index) in options" :key="index">
        <div class="label" @click="select(item)">{{item.label}}</div>
      </div>
    </div>
    <div class="content-right" v-if="lists && lists.length">
      <cascader-item :options="lists" :value="value" :level="level + 1" @change="change"></cascader-item>
    </div>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "CascaderItem",
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number
    }
  },
  computed: {
    lists() {
      if (this.value[this.level] && this.value[this.level].id) {
        let o = this.options.find(
          item => item.id === this.value[this.level].id
        );
        return o.children;
      }
    }
  },
  data() {
    return {
      currentItem: null
    };
  },
  methods: {
    select(item) {
      this.currentItem = item;
      let cloneValue = cloneDeep(this.value);
      cloneValue[this.level] = item;
      cloneValue.splice(this.level + 1);
      this.$emit("change", cloneValue);
    },
    change(value) {
      this.$emit("change", value);
    }
  }
};
</script>

<style lang="stylus">
.label {
  width: 80px;
}
</style>