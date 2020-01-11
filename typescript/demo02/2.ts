// var global_num = 12 //全局变量
// class Numbers{
//     num_val = 13    //实例变量  
//     static sval = 10;   //静态变量          

//     storeNum():void{
//         var local_num = 14  //局部变量
//     }
// }
// console.log("全局变量为: "+global_num)  
// console.log(Numbers.sval)   // 静态变量
// var obj = new Numbers(); 
// console.log("实例变量: "+obj.num_val)

// class PrinterClass {
//     doPrint(): void {
//         console.log("父类的 doPrint() 方法。")
//     }
// }

// class StringPrinter extends PrinterClass {
//     doPrint(): void {
//         super.doPrint() // 调用父类的函数
//         console.log("子类的 doPrint()方法。")
//     }
// }
// new StringPrinter().doPrint()

// class Abc {
//     public str1: string = "hello"
//     private str2: string = "world"
// }

// Abc.str1

/// <reference path = "1.ts" /> 
namespace R { 
    export class Circle implements IShape { 
        public draw() { 
            console.log("Circle is drawn"); 
        }  
    }
}