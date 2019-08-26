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
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "CascaderItem",
  data() {
    return {
      currentItem: null
    };
  },
  computed: {
    lists() {
      if (this.value[this.level] && this.value[this.level].id) {
        return this.options.find(item => this.value[this.level].id === item.id)
          .children;
      }
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
    level: {
      type: Number
    }
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