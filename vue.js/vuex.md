# Vuex

```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  state: {
      count: 0,
      todos: [
        { id: 1, text: '...', done: true },
      	{ id: 2, text: '...', done: false }
      ]
  },
  getters: {
  	doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    checkout ({ commit, state }, products) {
       // 把当前购物车的物品备份起来
       const savedCartItems = [...state.cart.added]
       // 发出结账请求，然后乐观地清空购物车
       commit(types.CHECKOUT_REQUEST)
       // 购物 API 接受一个成功回调和一个失败回调
       shop.buyProducts(
         products,
         // 成功操作
         () => commit(types.CHECKOUT_SUCCESS),
         // 失败操作
         () => commit(types.CHECKOUT_FAILURE, savedCartItems)
       )
    }
  },
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```



## State: 数据源

1. update:只能通过action和mutations修改

2. get:  ①this.$store.state.count                 ② mapState

   #### mapState的引入

   import {mapState} from 'vuex'

   #### mapState有多种写法

   1.

   ```
   computed: mapState({
   	count: state => state.count,
   	countAlias: 'count',
   	countPlus(state) {
   		return state.count ++
   	}
   })
   ```

   2.

   ```
   computed: mapState(['count'])
   ```

   3.

   ```
   computed: {
   	localComputed() {/******/}
       ...mapState({})
   }
   ```

   4.

   ```
   computed: {
       ...mapState([])
   }
   ```

## Getter:计算属性

1. 参数为state,getters

2. get: ① this.store.getters.doneTodos ②`mapGetters`

3. get时,可以接受传参

   ```
   store.getters.getTodoById(2)
   
   getters: {
     // ...
     getTodoById: (state) => (id) => {
       return state.todos.find(todo => todo.id === id)
     }
   }
   ```

## Mutation:方法

1. 参数为state,Payload(提交载荷,可以为参数,也可以为对象)

2. 不受限制(可以异步,可以同步)

3. get: 

   ①this.store.commit('increment'[,参数(可以为参数,也可以为对象)]) 

   ②this.store.commit({ type:'increment', amount:10 })

   ③

   ```s
   methods:{
   	...mapMutations([
           'increment'
   	]),
   	...mapMutations({
           add: 'increment'
   	})
   }
   ```

   

## Action: 异步

1. 参数为,context(与store实例具有相同的方法),也可以用参数解构,Payload(提交载荷,可以为参数,也可以为对象)
2. 异步的
3. get:
   1. this.store.dispatch('increment'[,参数(可以为参数,也可以为对象)])
   2. this.store.dispatch({type:'increment',amount: 10})