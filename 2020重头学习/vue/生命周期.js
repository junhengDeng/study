var info = 'name';
var app = new Vue({
    el: '#root',
    template: `<div>{{info1}}</div>`,
    data: {
        text: 'aaa',
        info1: info
    },
    beforeCreate() {    console.log(this.$el, '1: beforeCreate')  },
    created() {         console.log(this.$el, '2: created')  },
    beforeMount() {     console.log(this.$el, '3: beforeMounted')  },
    mounted() {         console.log(this.$el, '4: mounted')  },
    beforeUpdate() {    console.log(this, '5: beforeUpdate')  },
    updated() {         console.log(this, '6: updated')  },
    activated() {       console.log(this, '7: activated')  },
    deactivated() {     console.log(this, '8: deactivated')  },
    beforeDestroy() {   console.log(this, '9: beforeDestroy')  },
    destroyed() {       console.log(this, '10: destroyed')  },
})

// 如果没有写$el，mounted将不会执行，

// 有数据更新的时候，beforeUpdate和updated将会执行

// 组件销毁的方法 app.$destroy(): 我们主动去销毁生成出来的实例
// 主动销毁的过程中，他会去帮我们接触所有的事件监听，以及我们所有的watch。不过我们一般不会用过


// 还有两个生命周期方法 avtivated and deactivated
// Vue里面有个原生组件，叫做keep-alive。那么这两个生命周期方法就与这个有关

// 如果没有keep-alive去包裹它，那么它是一直触发创建和销毁。
// 加了keep-alive，他就是一直存在内存中，创建和销毁的钩子不会被触发，我们只是控制了它的激活和停用。
