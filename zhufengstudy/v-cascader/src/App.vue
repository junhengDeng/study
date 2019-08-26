<template>
  <div>
    <Cascader :options.sync="options" v-model="value" :lazyload="lazyload"></Cascader>
  </div>
</template>

<script>
import cityLists from './data.json'
import Cascader from "./components/Cascader.vue";
const fetchData = pid => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cityLists.filter(item => item.pid == pid))
    }, 100)
  })
}
export default {
  components: { Cascader },
  data() {
    return {
      value: [],
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
      ]
    };
  },
  async created() {
    this.options = await(fetchData(0))
  },
  methods: {
    async lazyload(id, callback) {
      let children = await fetchData(id);
      callback(children)
    }
  }
};
</script>