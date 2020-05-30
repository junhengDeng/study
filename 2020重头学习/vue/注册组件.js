var component = {
    inheritAttrs: false,
    props: ['name', 'age'],
    template: `<div>
    {{$attrs.name}}
    {{$attrs.age}}
    {{name}}
    {{age}}
    </div>`
}

// 全局
// Vue.component('CompOne', component)
// 这样写的话，直接调用就可以了

// 局部
new Vue({
    el: '#root',
    components: {
        CompOne: component
    },
    template: `<comp-one :name='"tom"' :age='"12"' ></comp-one>`
})