<template>
  <div>
    <!-- <div>{{options}}</div> -->
    <cascader :options.sync="options" v-model="value" :lazyload="lazyload"></cascader>
  </div>
</template>

<script>
import Cascader from "./components/Cascader.vue";
import cityOptions from "./data.json";
const fetchOptions = pid => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cityOptions.filter(item => pid == item.pid));
    }, 100);
  });
};
export default {
  components: {
    Cascader
  },
  data() {
    return {
      value: [],
      options: []
    };
  },
  async created() {
    this.options = await fetchOptions(0);
  },
  methods: {
    async lazyload(id, callback) {
      let children = await fetchOptions(id);
      callback(children);
    }
  }
};
</script>