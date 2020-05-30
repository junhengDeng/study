var root = new Vue({
    // el: '#root',
    template: `<div>
        welcome to vue
        <div>{{num}}</div>
    </div>`,
    data: {
        num: 1,
        obj: {}
    },
    props: {}
})

root.$mount('#root')

console.log(root.$data) // {num: 1}

var timer = setInterval(() => {
    root.num ++
    if (root.num > 10) {
        clearInterval(timer)
        timer = null;
    }
}, 500)
console.log(root.obj === root.$data.obj)

console.log(root.$props)
console.log(root.$options)
console.log(root.options === root)
console.log(root)
console.log(root === root.$root)