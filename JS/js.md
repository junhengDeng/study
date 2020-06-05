# js

1. 遇到的js传值问题

```js
/* 
apply: {
	val: 1
}
*/
var p = this.apply
p = {			// p = {} 这里的时候，已经跟this.apply脱离关系了
    ...p,
    val: 2
}
this.apply.val  // 1
p.val // 2
```

```js
/*
apply: {
	val: 0
}
*/
var a = this.apply;		//	假设this.apply地址为 `1`,那么a的地址也为`1`
function set(that) {
  that.val = 2
}
this.apply = {			// 这是时候， this.apply地址为`2`了，a的地址还是为`1`
  ...this.apply,
  val: 3
}
set(a)					//	所以，这个时候修改的是 `1`中val, this.apply没有变
    

this.apply.val // 3
a.val // 2
```

