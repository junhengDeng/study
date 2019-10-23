<template>
  <div>
    <div>{{value}}</div>
    <cascader :options.asyc="options" v-model="value" :lazyload="lazyload"></cascader>
  </div>
</template>

<script>
import cascader from "./components/Cascader.vue";
import cityLists from "./data.json";
const fetchData = pid => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cityLists.filter(item => pid == item.pid))
    }, 100)
  })
}
export default {
  components: {
    cascader
  },
  data() {
    return {
      options: [
        {
          label: "肉类",
          children: [
            {
              label: "猪肉",
              children: [
                {
                  label: "五花肉"
                },
                {
                  label: "里脊肉"
                }
              ]
            },
            {
              label: "鸡肉",
              children: [
                {
                  label: "鸡腿"
                },
                {
                  label: "鸡翅"
                }
              ]
            }
          ]
        },
        {
          label: "蔬菜",
          children: [
            {
              label: "叶菜类",
              children: [
                {
                  label: "大白菜"
                },
                {
                  label: "小白菜"
                }
              ]
            },
            {
              label: "根茎类",
              children: [
                {
                  label: "萝卜"
                },
                {
                  label: "土豆"
                }
              ]
            }
          ]
        }
      ],
      value: []
    };
  },
  async created() {
    this.options = await fetchData(0)
  },
  methods: {
    async lazyload(id, callback) {
      let children = await fetchData(id);
      callback(children)
    }
  }
};
</script>
