// let jspang = {name:'技术胖'，website:'jspang.com', age:18, saySomething:function() {console.log('为了前端技术')}}
// console.log(jspang.name)
// jspang.saySometing()

//引用类型 array string date regExp 

// let arr1:number[ ] //声明一个数值类型的数组
// let arr2:Array<string> //声明一个字符串类型的数组

// 字面量赋值法
// let arr1:number[] = []
// let arr2:number[] = [1,2,3,4,5]
// let arr3:Array<string> = ['jspang','技术胖']
// let arr4:Array<boolean> = [true,false,false]
// 只能存储同一类型的数组元素

// 构造函数赋值法
let arr1:number[] = new Array()
let arr2:number[] = new Array(1,2,3,4,5)
let arr3:Array<string> = new Array('jspang','技术胖')
let arr4:Array<boolean> = new Array(true,false,false)


// 元祖使用很少，不建议使用
let x:[string,number] 
x = ['hello',10]
// x = [10,'hello'] //错误
