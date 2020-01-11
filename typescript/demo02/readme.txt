类型
1.any
2.number
    let age:number = 0
3.string
    let name:string = "dfsa"
5.boolean
    let flag:boolean = true
6.数组
    let arr:number[] = [1,2,3,4]
    let arr:Array<number> = [1,2]
7.元祖
    let x:[string, number]
    x = ['ds', 12]
8.enum
    enum Color{Red, Green, Blue};
    let c:Color = Color.Blue
    console.log(c)
9.null
10.undefined
11.never(null,undefined),代表从不会出现的值

number[]
Array<number>
any[]

变量声明
var [变量名] ：[类型] = 值
不设置类型，该变量可以是任意类型
var num = 2; //类型推断为number
num = '12'; //编译错误
前面类型推断为number,再次为变量设置字符串类型的值是，会报错

变量作用域

全局作用域、类作用域（class)、局部作用域(function)

var global_num = 12 //全局变量
class Numbers{
    num_val = 13    //实例变量  //必须new, 才能访问
    static sval = 10;   //静态变量          // 不用new,也可以用class属性访问到

    storeNum():void{
        var local_num = 14  //局部变量
    }
}
console.log("全局变量为: "+global_num)  
console.log(Numbers.sval)   // 静态变量
var obj = new Numbers(); 
console.log("实例变量: "+obj.num_val)


函数
function function_name( param1 [:datatype], param2 [:datatype] = default_value, ...restOfName:string[]):return_type{
    return value
}

函数返回值类型
参数类型
默认参数
剩余参数

内置构造函数Function()
var myFunction = new Function("a","b","return a * b")
var x = myFunction(3,4) //12

重载
function disp(n1:number,s1:string):void; 
function disp(s:string,n:number):void;


联合类型
Type1 | Type2 | Type3
var val:string|number


接口
interface

interface IPerson{
    firstName:string, 
    lastName:string, 
    sayHi: ()=>string       // ()=>string
}

var customer:IPerson = { 
    firstName:"Tom",
    lastName:"Hanks", 
    sayHi: ():string =>{return "Hi there"} 
} 

联合接口
interface RunOptions { 
    program:string; 
    commandline:string[]|string|(()=>string); 
}

接口和数组
接口中可以将数组的索引值和元素设置为不同类型，索引值可以是数字或字符串

interface nameList{
    [index:number]: string // 索引为数字，值为string
}

接口继承
interface Person{
    age:number
}
interface Musician extends Person{
    instrument: string
}

var drummer = <Musician>{}

多继承
interface Child extends IParent1,IParent2{}


类
class
class Car{
    // 字段
   engine:string; 
   
   // 构造函数
   constructor(engine:string) { 
      this.engine = engine 
   }  
   
   // 方法
   disp():void { 
      console.log("函数中显示发动机型号  :   "+this.engine) 
   } 
}

类的继承
class Shape{
    Area: number
    constructor(a:number) {
        this.Area = a
    }
}

class Circle extends Shape{
    disp():void {
        console.log("圆的面积:  "+this.Area)
    }
}
var obj = new Circle(223); 
obj.disp()
不支持多重继承

继承类的方法重写
class PrinterClass { 
   doPrint():void {
      console.log("父类的 doPrint() 方法。") 
   } 
} 
 
class StringPrinter extends PrinterClass { 
   doPrint():void { 
      super.doPrint() // 调用父类的函数
      console.log("子类的 doPrint()方法。")
   } 
}

static 关键字
class StaticMem  {
    static num:number;
    static disp():void{
        console.log(num)
    }
}
StaticMem.num = 12     // 初始化静态变量
StaticMem.disp()       // 调用静态方法
访问控制修饰符（class里面的属性，只能是new之后才能找到）
public（默认） : 公有，可以在任何地方被访问。 // 没加修饰符的默认是public
protected : 受保护，可以被其自身以及其子类和父类访问。 // 自身，继承的子类，父类
private : 私有，只能被其定义所在的类访问。 // 自身

类和接口
implements
interface ILoan{
    interest:number
}
class AgriLoan implements ILoan{
    interest: number
    rebate: number
    constructor(interest:number,rebate:number){

    }
}

对象
值可以为任何类型
作为参数传递给函数
var sites = { 
    site1:"Runoob", 
    site2:"Google",
}; 
var invokesites = function(obj: {site1: string, site2:string}) { 
    console.log("site1 :"+obj.site1) 
    console.log("site2 :"+obj.site2) 
} 
invokesites(sites)

命名空间
namespace export
namespace SomeNameSpaceName { 
   export interface ISomeInterfaceName {      }  
   export class SomeClassName {      }  
}
SomeNameSpaceName.SomeClassName;
引用另一个ts的 命名空间 要三斜杠 /// 引用
/// <reference path="">

嵌套命名空间
用`.`访问

模块引入
import 和 export 

声明文件
declare var jQuery: (selector: string) => any;
