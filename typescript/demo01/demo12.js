"use strict";
var XiaoJieJie2 = /** @class */ (function () {
    function XiaoJieJie2(sex, name, age) {
        this.sex = sex;
        this.name = name;
        this.age = age;
    }
    XiaoJieJie2.prototype.sayHello = function () {
        console.log('小哥哥好');
    };
    XiaoJieJie2.prototype.sayLove = function () {
        console.log('我爱你');
    };
    return XiaoJieJie2;
}());
var jiejie2 = new XiaoJieJie2('女', '热巴', 22);
console.log(jiejie2.sex);
console.log(jiejie2.name);
console.log(jiejie2.age);
jiejie2.sayHello();
jiejie2.sayLove();
var Man = /** @class */ (function () {
    function Man() {
        this.sex = '男';
    }
    return Man;
}());
var man = new Man();
man.sex = '女';
